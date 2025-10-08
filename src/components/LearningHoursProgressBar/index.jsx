import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, ProgressBar } from '@openedx/paragon';
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

  // Status badge removed — keep messages for pendingApprovalHours rendering below
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

          {/* Status badge removed as per design decision */}

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
