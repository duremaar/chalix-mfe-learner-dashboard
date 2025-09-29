import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

import { Badge } from '@openedx/paragon';

import track from 'tracking';
import { reduxHooks } from 'hooks';
import verifiedRibbon from 'assets/verified-ribbon.png';
import useActionDisabledState from './hooks';

import messages from '../messages';

const { courseImageClicked } = track.course;

export const CourseCardImage = ({ cardId, orientation }) => {
  const { formatMessage } = useIntl();
  const { bannerImgSrc } = reduxHooks.useCardCourseData(cardId);
  const { homeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const { isVerified } = reduxHooks.useCardEnrollmentData(cardId);
  const { disableCourseTitle } = useActionDisabledState(cardId);
  const { handleImageClicked } = reduxHooks.useTrackCourseEvent(courseImageClicked, cardId, homeUrl);
  
  const config = getConfig();
  const [imageError, setImageError] = useState(false);
  
  // If bannerImgSrc is an asset-v1 URL, use fallback directly to avoid 404s
  const shouldUseFallback = !bannerImgSrc || bannerImgSrc.includes('asset-v1') || imageError;
  
  // Use the full URL for fallback since we know it works at https://itg-acst.edu.vn/static/images/ai_cth.png
  const fallbackImageUrl = config.LMS_BASE_URL ? 
    `${config.LMS_BASE_URL}/static/images/ai_cth.png` : 
    '/static/images/ai_cth.png';
  
  const imageSrc = shouldUseFallback ? fallbackImageUrl : bannerImgSrc;
  
  // Debug logging for image issues
  if (shouldUseFallback && process.env.NODE_ENV === 'production') {
    console.log('CourseCardImage: Using fallback image', {
      cardId,
      bannerImgSrc,
      imageSrc: fallbackImageUrl,
      reason: !bannerImgSrc ? 'no banner' : bannerImgSrc.includes('asset-v1') ? 'asset-v1 URL' : 'image error'
    });
  }
  
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
    }
  };
  
  const wrapperClassName = `pgn__card-wrapper-image-cap d-inline-block overflow-visible ${orientation}`;
  const image = (
    <>
      <img
        // w-100 is necessary for images on Safari, otherwise stretches full height of the image
        // https://stackoverflow.com/a/44250830
        className="pgn__card-image-cap w-100 show"
        src={imageSrc}
        alt={shouldUseFallback ? `${config.SITE_NAME || 'Chalix'} Logo` : formatMessage(messages.bannerAlt)}
        onError={handleImageError}
      />
      {
        isVerified && (
          <span
            className="course-card-verify-ribbon-container"
            title={formatMessage(messages.verifiedHoverDescription)}
          >
            <Badge as="div" variant="success" className="w-100">
              {formatMessage(messages.verifiedBanner)}
            </Badge>
            <img src={verifiedRibbon} alt={formatMessage(messages.verifiedBannerRibbonAlt)} />
          </span>
        )
      }
    </>
  );
  return disableCourseTitle
    ? (<div className={wrapperClassName}>{image}</div>)
    : (
      <a
        className={wrapperClassName}
        href={homeUrl}
        onClick={handleImageClicked}
        tabIndex="-1"
      >
        {image}
      </a>
    );
};
CourseCardImage.propTypes = {
  cardId: PropTypes.string.isRequired,
  orientation: PropTypes.string.isRequired,
};

CourseCardImage.defaultProps = {};

export default CourseCardImage;
