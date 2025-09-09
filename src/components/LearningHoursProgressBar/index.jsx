import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, ProgressBar } from '@openedx/paragon';
import { WarningFilled, CheckCircle, Info } from '@openedx/paragon/icons';
import messages from './messages';
import './index.scss';

const LearningHoursProgressBar = ({ 
  completedHours,
  requiredHours,
  completionPercentage,
  status,
  pendingApprovalHours
}) => {
  const { formatMessage } = useIntl();

  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          text: formatMessage(messages.pendingApproval),
          color: 'warning',
          icon: WarningFilled,
          bgColor: '#fff3cd',
          textColor: '#856404'
        };
      case 'approved':
        return {
          text: formatMessage(messages.approved),
          color: 'success',
          icon: CheckCircle,
          bgColor: '#d4edda',
          textColor: '#155724'
        };
      case 'rejected':
        return {
          text: formatMessage(messages.rejected),
          color: 'danger',
          icon: WarningFilled,
          bgColor: '#f8d7da',
          textColor: '#721c24'
        };
      case 'in_progress':
      default:
        return {
          text: formatMessage(messages.inProgress),
          color: 'info',
          icon: Info,
          bgColor: '#d1ecf1',
          textColor: '#0c5460'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const progressVariant = completionPercentage >= 100 ? 'success' : 
                         completionPercentage >= 80 ? 'info' : 
                         completionPercentage >= 50 ? 'warning' : 'danger';

  return (
    <Card className="learning-hours-progress border rounded">
      <Card.Body>
        <div className="learning-hours-content">
          {/* Header Stats */}
          <div className="learning-hours-stats">
            <div className="stat-item">
              <span className="stat-label">
                {formatMessage(messages.studiedHours)}:
              </span>
              <span className="stat-value fw-medium ms-1">
                {completedHours}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">
                {formatMessage(messages.totalRequiredHours)}:
              </span>
              <span className="stat-value fw-medium ms-1">
                {requiredHours}h
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <ProgressBar 
              now={Math.min(completionPercentage, 100)}
              variant={progressVariant}
              style={{ height: '6px' }}
              className="learning-progress-bar"
            />
          </div>

          {/* Status Badge */}
          <div className="status-section">
            <div 
              className="status-badge d-inline-flex align-items-center px-3 py-1 rounded"
              style={{ 
                backgroundColor: statusConfig.bgColor,
                color: statusConfig.textColor,
                border: `1px solid ${statusConfig.textColor}20`
              }}
            >
              <statusConfig.icon 
                size="16" 
                className="me-1"
                style={{ color: statusConfig.textColor }}
              />
              <span className="status-text fw-medium">
                {statusConfig.text}
              </span>
            </div>
          </div>

          {/* Additional Info */}
          {pendingApprovalHours > 0 && (
            <div className="additional-info mt-2">
              <small className="text-muted">
                {formatMessage(messages.pendingApprovalHours, { 
                  hours: pendingApprovalHours 
                })}
              </small>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

LearningHoursProgressBar.propTypes = {
  completedHours: PropTypes.number.isRequired,
  requiredHours: PropTypes.number.isRequired,
  completionPercentage: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['pending', 'approved', 'rejected', 'in_progress']).isRequired,
  pendingApprovalHours: PropTypes.number
};

LearningHoursProgressBar.defaultProps = {
  pendingApprovalHours: 0
};

export default LearningHoursProgressBar;
