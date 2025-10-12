import React, { useState } from 'react';
import { Nav } from '@openedx/paragon';

import { reduxHooks } from 'hooks';
import { RequestKeys } from 'data/constants/requests';
import SelectSessionModal from 'containers/SelectSessionModal';
import CoursesPanel from 'containers/CoursesPanel';
import PersonalizedLearning from 'containers/PersonalizedLearning';
import LearningHoursProgressBar from 'components/LearningHoursProgressBar';
import { useLearningHours } from 'data/hooks/useLearningHours';
import DashboardModalSlot from 'plugin-slots/DashboardModalSlot';

import LoadingView from './LoadingView';
import DashboardLayout from './DashboardLayout';
import DashboardHeader from './DashboardHeader';
import DashboardBreadcrumb from './DashboardBreadcrumb';
import hooks from './hooks';
import './index.scss';

export const Dashboard = () => {
  hooks.useInitializeDashboard();
  const { pageTitle } = hooks.useDashboardMessages();
  const hasCourses = reduxHooks.useHasCourses();
  const initIsPending = reduxHooks.useRequestIsPending(RequestKeys.initialize);
  const showSelectSessionModal = reduxHooks.useShowSelectSessionModal();
  const [activeTab, setActiveTab] = useState('ai-suggested');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  
  // Use learning hours hook
  const { 
    learningHours, 
    loading: hoursLoading 
  } = useLearningHours();

  // Check URL parameters for course ID
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course_id');
    if (courseId) {
      setSelectedCourseId(courseId);
      setActiveTab('personalized');
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personalized':
        return <PersonalizedLearning courseId={selectedCourseId} />;
      case 'ai-suggested':
      case 'internal':
      case 'elective':
      case 'required':
      case 'teaching':
      default:
        return (
          <DashboardLayout>
            <CoursesPanel activeCategory={activeTab} />
          </DashboardLayout>
        );
    }
  };

  return (
    <div id="dashboard-container" className="dashboard-main-container">
      <h1 className="sr-only">{pageTitle}</h1>
      
      {/* Header */}
      <DashboardHeader />
      
      {/* Breadcrumb Navigation */}
      <DashboardBreadcrumb />
      


      <div className="dashboard-body">
        {!initIsPending && (
          <>
            <DashboardModalSlot />
            {(hasCourses && showSelectSessionModal) && <SelectSessionModal />}
          </>
        )}
        
        {/* Course Category Tabs */}
        {!initIsPending && (
          <div className="course-category-navigation">
            <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab} className="course-tabs">
              <Nav.Item>
                <Nav.Link eventKey="ai-suggested" className={activeTab === 'ai-suggested' ? 'active-tab' : ''}>
                  Khóa học do AI gợi ý
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="internal" className={activeTab === 'internal' ? 'active-tab' : ''}>
                  Khóa học nội bộ cơ quan
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="elective" className={activeTab === 'elective' ? 'active-tab' : ''}>
                  Khóa học của CC,VC Bộ
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="required" className={activeTab === 'required' ? 'active-tab' : ''}>
                  Khóa học bắt buộc
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="teaching" className={activeTab === 'teaching' ? 'active-tab' : ''}>
                  Giảng dạy
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        )}
        
        {/* Learning Hours Progress - Moved inside dashboard-body */}
        {!initIsPending && learningHours && !hoursLoading && (
          <div className="in-body-progress-container">
            <div className="progress-content">
              <div className="progress-stats">
                <span className="progress-label">Số giờ đã học: {learningHours.completed_hours || 0}</span>
                <span className="progress-total">Tổng số giờ phải hoàn thành: {learningHours.required_hours || 40}h</span>
              </div>
              <div className="progress-bar-wrapper">
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${learningHours.completion_percentage || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div id="dashboard-content" className="dashboard-content" data-testid="dashboard-content">
          {initIsPending
            ? (<LoadingView />)
            : renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
