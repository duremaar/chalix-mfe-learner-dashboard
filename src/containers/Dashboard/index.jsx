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
import hooks from './hooks';
import './index.scss';

export const Dashboard = () => {
  hooks.useInitializeDashboard();
  const { pageTitle } = hooks.useDashboardMessages();
  const hasCourses = reduxHooks.useHasCourses();
  const initIsPending = reduxHooks.useRequestIsPending(RequestKeys.initialize);
  const showSelectSessionModal = reduxHooks.useShowSelectSessionModal();
  const [activeTab, setActiveTab] = useState('courses');
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
      case 'courses':
      default:
        return (
          <>
            {/* Learning Hours Progress Bar for Courses Tab */}
            {learningHours && !hoursLoading && (
              <div className="mb-3">
                <LearningHoursProgressBar
                  completedHours={learningHours.completed_hours}
                  requiredHours={learningHours.required_hours}
                  completionPercentage={learningHours.completion_percentage}
                  status={learningHours.status}
                  pendingApprovalHours={learningHours.pending_approval_hours}
                />
              </div>
            )}
            <DashboardLayout>
              <CoursesPanel />
            </DashboardLayout>
          </>
        );
    }
  };

  return (
    <div id="dashboard-container" className="d-flex flex-column p-2 pt-0">
      <h1 className="sr-only">{pageTitle}</h1>
      {!initIsPending && (
        <>
          <DashboardModalSlot />
          {(hasCourses && showSelectSessionModal) && <SelectSessionModal />}
        </>
      )}
      
      {/* Navigation Tabs */}
      {!initIsPending && (
        <div className="dashboard-navigation mb-3">
          <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
            <Nav.Item>
              <Nav.Link eventKey="courses">Khóa học của tôi</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="personalized">Học tập cá nhân hóa</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      )}
      
      <div id="dashboard-content" data-testid="dashboard-content">
        {initIsPending
          ? (<LoadingView />)
          : renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
