import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import { reduxHooks } from 'hooks';

import './index.scss';

const ChalixHeader = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { formatMessage } = useIntl();
  const platformSettings = reduxHooks.usePlatformSettingsData();
  const config = getConfig();

  // Get platform name from config or fallback
  const platformName = config.SITE_NAME || platformSettings?.siteName || 'PHẦN MỀM HỌC TẬP THÔNG MINH DÀNH CHO CÔNG CHỨC, VIÊN CHỨC';
  
  // Get user display name with fallback
  const userDisplayName = authenticatedUser?.name || authenticatedUser?.username || 'User';

  // Icons as inline SVGs (you might want to replace these with proper icon components)
  const HomeIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  );

  const ListIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
    </svg>
  );

  const StudyIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
    </svg>
  );

  const ProfileIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  );

  const UserIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 3.5L9 7V9C9 10.1 9.9 11 11 11V22H13V11C14.1 11 15 10.1 15 9Z"/>
    </svg>
  );

  const NotificationIcon = () => (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="white">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
    </svg>
  );

  const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  );

  return (
    <div className="chalix-header">
      {/* Top Blue Section */}
      <div className="chalix-header-top">
        <div className="chalix-header-container">
          <div className="chalix-header-title">
            <h1>{platformName}</h1>
          </div>
          <div className="chalix-header-user-section">
            <span className="user-name">{userDisplayName}</span>
            <div className="user-avatar">
              <UserIcon />
            </div>
            <div className="notification-icon">
              <NotificationIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom White Section with Navigation */}
      <div className="chalix-header-bottom">
        <div className="chalix-header-container">
          <nav className="chalix-nav">
            <div className="nav-item active">
              <HomeIcon />
              <span>Trang chủ</span>
            </div>
            <div className="nav-item">
              <ListIcon />
              <span>Danh mục</span>
            </div>
            <div className="nav-item">
              <StudyIcon />
              <span>Học tập</span>
            </div>
            <div className="nav-item">
              <ProfileIcon />
              <span>Cá nhân hóa</span>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="chalix-search-bar">
            <input 
              type="text" 
              placeholder="Nhập từ khóa tìm kiếm"
              className="search-input"
            />
            <button className="search-button">
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChalixHeader;
