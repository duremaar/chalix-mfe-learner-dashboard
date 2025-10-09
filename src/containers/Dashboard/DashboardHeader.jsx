import React from 'react';
import { Button, Icon } from '@openedx/paragon';
import { Person, Notifications } from '@openedx/paragon/icons';
import { AppContext } from '@edx/frontend-platform/react';
import './DashboardHeader.scss';

export const DashboardHeader = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const userName = authenticatedUser?.name || authenticatedUser?.username || 'User';

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">
            PHẦN MỀM HỌC TẬP THÔNG MINH DÀNH CHO CÔNG CHỨC, VIÊN CHỨC
          </h1>
        </div>
        <div className="header-right">
          <span className="user-name">{userName}</span>
          <Button
            variant="light"
            className="user-profile-btn"
            iconBefore={() => <Icon src={Person} />}
            size="sm"
          />
          <Button
            variant="light"
            className="notification-btn"
            iconBefore={() => <Icon src={Notifications} />}
            size="sm"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;