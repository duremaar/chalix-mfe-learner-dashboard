import React from 'react';
import { Image } from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';

const ChalixLogo = () => {
  const config = getConfig();

  return (
    <Image
      src={config.LOGO_URL || '/static/chalix_theme/images/logo.svg'}
      alt={config.SITE_NAME || 'Chalix'}
      height="40"
      className="chalix-logo"
    />
  );
};

export default ChalixLogo;
