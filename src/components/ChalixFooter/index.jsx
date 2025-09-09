import React from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import { reduxHooks } from 'hooks';
import './index.scss';

const ChalixFooter = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const platformSettings = reduxHooks.usePlatformSettingsData();
  const config = getConfig();

  // Get current year
  const currentYear = new Date().getFullYear();
  
  // Get platform/site name for copyright
  const siteName = config.SITE_NAME || platformSettings?.siteName || 'Chalix';
  
  // Get responsible person or admin name, fallback to authenticated user or default
  const responsiblePerson = platformSettings?.adminName || 
                           authenticatedUser?.name || 
                           authenticatedUser?.username || 
                           'Administrator';

  return (
    <div className="chalix-footer">
      <div className="chalix-footer-container">
        <div className="footer-content">
          <p>Chịu trách nhiệm nội dung bởi {responsiblePerson}</p>
          <p>Copyright © {currentYear} {siteName}</p>
        </div>
      </div>
    </div>
  );
};

export default ChalixFooter;
