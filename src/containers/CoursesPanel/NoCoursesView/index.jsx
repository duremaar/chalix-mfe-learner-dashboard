import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Image } from '@openedx/paragon';
import { Search } from '@openedx/paragon/icons';
import { baseAppUrl } from 'data/services/lms/urls';

import emptyCourseSVG from 'assets/empty-course.svg';
import { reduxHooks } from 'hooks';

import messages from './messages';
import './index.scss';

export const NoCoursesView = () => {
  const { formatMessage } = useIntl();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  return (
    <div className="chalix-no-courses-view">
      <div className="empty-state-content">
        <div className="empty-state-image">
          <Image src={emptyCourseSVG} alt={formatMessage(messages.bannerAlt)} />
        </div>
        <div className="empty-state-text">
          <h3 className="empty-state-title">
            {formatMessage(messages.lookingForChallengePrompt)}
          </h3>
          <p className="empty-state-description">
            {formatMessage(messages.exploreCoursesPrompt)}
          </p>
        </div>
        <div className="empty-state-action">
          <Button
            variant="primary"
            as="a"
            href={baseAppUrl(courseSearchUrl)}
            iconBefore={Search}
            className="explore-courses-btn"
          >
            {formatMessage(messages.exploreCoursesButton)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoCoursesView;
