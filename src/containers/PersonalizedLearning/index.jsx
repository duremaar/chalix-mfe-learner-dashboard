import React, { useEffect, useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import {
  Container,
  Row,
  Col,
  Card,
  Tab,
  Tabs,
} from '@openedx/paragon';
import PropTypes from 'prop-types';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import LearningOverview from './components/LearningOverview';
import CourseDetails from './components/CourseDetails';
import CourseUnits from './components/CourseUnits';
import EmotionRecognition from './components/EmotionRecognition';
import CourseSidebar from './components/CourseSidebar';
import LearningHoursProgressBar from '../../components/LearningHoursProgressBar';
import { useLearningHours } from '../../data/hooks/useLearningHours';
import messages from './messages';
import './index.scss';

const PersonalizedLearning = ({ courseId = null }) => {
  const { formatMessage } = useIntl();
  const { authenticatedUser } = React.useContext(AppContext);
  const [learningData, setLearningData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  // Use learning hours hook
  const {
    learningHours,
    loading: hoursLoading,
  } = useLearningHours();

  useEffect(() => {
    const fetchLearningAnalytics = async () => {
      try {
        const client = getAuthenticatedHttpClient();
        const baseUrl = getConfig().LMS_BASE_URL;
        // Fetch learning analytics data
        const response = await client.get(`${baseUrl}/api/learning_analytics/v1/dashboard/`);
        setLearningData(response.data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch learning analytics:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (authenticatedUser) {
      fetchLearningAnalytics();
    }
  }, [authenticatedUser]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">{formatMessage(messages.errorTitle)}</h4>
          <p>{formatMessage(messages.errorMessage)}</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="personalized-learning">
      <Container fluid className="py-4">
        {/* Learning Hours Progress Bar */}
        {learningHours && !hoursLoading && (
          <Row className="mb-4">
            <Col>
              <LearningHoursProgressBar
                completedHours={learningHours.completed_hours}
                requiredHours={learningHours.required_hours}
                completionPercentage={learningHours.completion_percentage}
                status={learningHours.status}
                pendingApprovalHours={learningHours.pending_approval_hours}
              />
            </Col>
          </Row>
        )}

        <Row>
          <Col lg={9}>
            <Card className="mb-4">
              <Card.Header className="bg-white border-bottom">
                <h2 className="mb-0 text-primary">
                  {formatMessage(messages.personalizedLearningTitle)}
                </h2>
              </Card.Header>
              <Card.Body>
                <Tabs
                  activeKey={activeTab}
                  onSelect={setActiveTab}
                  className="mb-4"
                >
                  <Tab
                    eventKey="overview"
                    title={formatMessage(messages.overviewTab)}
                  >
                    <LearningOverview data={learningData} />
                  </Tab>
                  <Tab
                    eventKey="courseDetails"
                    title={
                      courseId
                        ? formatMessage(messages.courseUnitsList)
                        : formatMessage(messages.courseDetailsTab)
                    }
                  >
                    {courseId ? (
                      <CourseUnits courseId={courseId} />
                    ) : (
                      <CourseDetails data={learningData} />
                    )}
                  </Tab>
                  <Tab
                    eventKey="emotion"
                    title={formatMessage(messages.emotionRecognitionTab)}
                  >
                    <EmotionRecognition data={learningData} />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3}>
            <CourseSidebar data={learningData} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

PersonalizedLearning.propTypes = {
  courseId: PropTypes.string,
};

PersonalizedLearning.defaultProps = {
  courseId: null,
};

export default PersonalizedLearning;
