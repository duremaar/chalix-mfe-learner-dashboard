import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DashboardBreadcrumb.scss';

export const DashboardBreadcrumb = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Search submitted:', searchQuery);
  };

  return (
    <div className="dashboard-breadcrumb-container">
      {/* Navigation Section - exactly like CMS */}
      <div className="header-nav">
        <div className="nav-items">
          <div className="nav-links">
            <Link to="/" className="nav-item nav-home">
              <svg className="nav-icon" width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18V22H18V18H26V12H20L16 6L12 12H6V18H12ZM2 22H10V16H4V10H10L16 2L22 10H26V16H20V22H28V24H2V22Z" fill="#394047"/>
              </svg>
              Trang chủ
            </Link>
            
            <Link to="/courses" className="nav-item nav-category">
              <svg className="nav-icon" width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10H8V14H4V10ZM10 10H14V14H10V10ZM16 10H20V14H16V10ZM22 10H26V14H22V10ZM4 16H8V20H4V16ZM10 16H14V20H10V16ZM16 16H20V20H16V16ZM22 16H26V20H22V16Z" fill="#394047"/>
              </svg>
              Danh mục
            </Link>
            
            <Link to="/dashboard" className="nav-item nav-learning">
              <svg className="nav-icon" width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 7L12.5 10.5H9L15 3L21 10.5H17.5L15 7ZM21 12V19.5C21 20.88 19.88 22 18.5 22H11.5C10.12 22 9 20.88 9 19.5V12H21Z" fill="#394047"/>
              </svg>
              Học tập
            </Link>
            
            <Link to="/personalization" className="nav-item nav-personalization">
              <svg className="nav-icon" width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15C17.2091 15 19 13.2091 19 11C19 8.79086 17.2091 7 15 7C12.7909 7 11 8.79086 11 11C11 13.2091 12.7909 15 15 15ZM15 17C12.33 17 7 18.34 7 21V23H23V21C23 18.34 17.67 17 15 17Z" fill="#394047"/>
              </svg>
              Cá nhân hóa
            </Link>
          </div>

          {/* Search Bar - positioned like CMS */}
          <div className="search-bar">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Nhập từ khóa tìm kiếm"
                className="search-input"
              />
              <button type="submit" className="search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="rgba(73, 69, 79, 0.8)"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBreadcrumb;