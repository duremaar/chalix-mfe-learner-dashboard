import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@openedx/paragon';
import { reduxHooks } from 'hooks';
import CourseCardBanners from '../CourseCardBanners';
import CourseCardImage from '../CourseCardImage';
import CourseCardMenu from '../CourseCardMenu';
import CourseCardActions from '../CourseCardActions';
import CourseCardDetails from '../CourseCardDetails';
import CourseCardTitle from '../CourseCardTitle';
import './index.scss';

export const ChalixCourseCard = ({ cardId }) => {
  const { courseRun } = reduxHooks.useCardCourseRunData(cardId);
  const { enrollmentData } = reduxHooks.useCardEnrollmentData(cardId);
  const { courseNumber } = reduxHooks.useCardCourseData(cardId);
  
  // Calculate progress data (simplified - in real implementation, this would come from API)
  const progressData = {
    percentage: Math.round(Math.random() * 100), // Mock data - replace with real progress API
    completedUnits: Math.floor(Math.random() * 15) + 1,
    totalUnits: Math.floor(Math.random() * 10) + 15,
  };

  // Check if user is instructor (simplified - in real implementation, this would come from API)
  const isInstructor = enrollmentData?.mode === 'instructor' || enrollmentData?.role === 'instructor';

  return (
    <div className="chalix-course-card" data-testid="ChalixCourseCard">
      <Card className="chalix-course-container">
        <div className="chalix-course-image-container">
          <CourseCardImage cardId={cardId} orientation="vertical" className="chalix-course-image" />
          {isInstructor && (
            <div className="chalix-instructor-tag">
              <span className="chalix-instructor-label">Giảng dạy</span>
            </div>
          )}
        </div>
        
        <Card.Body className="chalix-course-content">
          <div className="chalix-course-title">
            <CourseCardTitle cardId={cardId} />
          </div>
          
          <div className="chalix-course-details">
            <CourseCardDetails cardId={cardId} />
          </div>
          
          <div className="chalix-progress-section">
            <div className="chalix-progress-bar-container">
              <div className="chalix-progress-bar-track">
                <div 
                  className="chalix-progress-bar-fill"
                  style={{ width: `${progressData.percentage}%` }}
                  aria-label={`Progress: ${progressData.percentage}%`}
                />
              </div>
            </div>
          </div>
          
          <Card.Footer className="chalix-course-actions">
            <CourseCardActions cardId={cardId} />
          </Card.Footer>
        </Card.Body>
        
        <CourseCardBanners cardId={cardId} />
      </Card>
    </div>
  );
};

ChalixCourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default ChalixCourseCard;
