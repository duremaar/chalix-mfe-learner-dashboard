import React from 'react';
import PropTypes from 'prop-types';
import { reduxHooks } from 'hooks';
import { getConfig } from '@edx/frontend-platform';

export const DebugCourseCard = ({ cardId }) => {
  const courseData = reduxHooks.useCardCourseData(cardId);
  const courseRunData = reduxHooks.useCardCourseRunData(cardId);
  const enrollmentData = reduxHooks.useCardEnrollmentData(cardId);
  const config = getConfig();

  // Log to console for debugging
  console.log('DebugCourseCard - Card ID:', cardId);
  console.log('DebugCourseCard - Course Data:', courseData);
  console.log('DebugCourseCard - Course Run Data:', courseRunData);
  console.log('DebugCourseCard - Enrollment Data:', enrollmentData);
  console.log('DebugCourseCard - Config:', config);
  console.log('DebugCourseCard - Banner Image Source:', courseData?.bannerImgSrc);
  console.log('DebugCourseCard - Home URL:', courseRunData?.homeUrl);
  console.log('DebugCourseCard - Image test URL:', '/static/images/ai_cth.png');

  return (
    <div style={{ 
      border: '2px solid red', 
      padding: '10px', 
      margin: '10px 0',
      backgroundColor: '#ffeeee',
      fontSize: '12px',
      fontFamily: 'monospace'
    }}>
      <h4>DEBUG INFO for Card {cardId}</h4>
      <div><strong>Home URL:</strong> {courseRunData?.homeUrl || 'MISSING!'}</div>
      <div><strong>Banner Image:</strong> {courseData?.bannerImgSrc || 'MISSING!'}</div>
      <div><strong>Course Name:</strong> {courseData?.courseName || 'MISSING!'}</div>
      <div><strong>Is Enrolled:</strong> {String(enrollmentData?.isEnrolled)}</div>
      <div><strong>Has Access:</strong> {String(enrollmentData?.hasAccess)}</div>
      <div><strong>Course ID:</strong> {courseRunData?.courseId || 'MISSING!'}</div>
      <div><strong>Site Name:</strong> {config?.SITE_NAME || 'MISSING!'}</div>
      
      <div style={{ marginTop: '10px' }}>
        <strong>Test Image Load:</strong>
        <br />
        <img 
          src="/static/images/ai_cth.png" 
          alt="Test fallback image"
          style={{ width: '100px', height: '60px', border: '1px solid black' }}
          onError={(e) => {
            console.error('Fallback image failed to load!');
            e.target.style.backgroundColor = 'red';
            e.target.alt = 'FALLBACK IMAGE FAILED';
          }}
          onLoad={() => {
            console.log('Fallback image loaded successfully!');
          }}
        />
      </div>
    </div>
  );
};

DebugCourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default DebugCourseCard;