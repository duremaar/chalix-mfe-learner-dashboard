import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@openedx/paragon';
import { reduxHooks } from 'hooks';
import track from 'tracking';
import CourseCardBanners from '../CourseCardBanners';
import CourseCardImage from '../CourseCardImage';
import CourseCardMenu from '../CourseCardMenu';
import CourseCardActions from '../CourseCardActions';
import CourseCardDetails from '../CourseCardDetails';
import CourseCardTitle from '../CourseCardTitle';
import './index.scss';

export const ChalixCourseCard = ({ cardId }) => {
  const { courseRun, homeUrl, resumeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const { enrollmentData, hasStarted } = reduxHooks.useCardEnrollmentData(cardId);
  const { courseNumber } = reduxHooks.useCardCourseData(cardId);
  const execEdTrackingParam = reduxHooks.useCardExecEdTrackingParam(cardId);
  
  // Calculate progress data (simplified - in real implementation, this would come from API)
  const progressData = {
    percentage: Math.round(Math.random() * 100), // Mock data - replace with real progress API
    completedUnits: Math.floor(Math.random() * 15) + 1,
    totalUnits: Math.floor(Math.random() * 10) + 15,
  };

  // Check if user is instructor (simplified - in real implementation, this would come from API)
  const isInstructor = enrollmentData?.mode === 'instructor' || enrollmentData?.role === 'instructor';

  // Determine the course URL based on enrollment status
  const courseUrl = hasStarted ? (resumeUrl + execEdTrackingParam) : (homeUrl + execEdTrackingParam);

  // Handle click on the entire card
  const handleCardClick = reduxHooks.useTrackCourseEvent(
    track.course.enterCourseClicked,
    cardId,
    courseUrl,
  );

  const handleCardKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(e);
    }
  };

  return (
    <div 
      className="chalix-course-card" 
      data-testid="ChalixCourseCard"
      onClick={(e) => {
        // Don't trigger if clicking on a button or link
        if (e.target.closest('button') || e.target.closest('a[href]')) {
          return;
        }
        handleCardClick(e);
      }}
      onKeyDown={handleCardKeyDown}
      tabIndex="0"
      role="button"
      aria-label={`Open course: ${courseRun?.name || 'Course'}`}
      style={{ cursor: 'pointer' }}
    >
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
