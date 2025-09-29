import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Row,
  Col,
  Card,
  ProgressBar,
} from '@openedx/paragon';
import { Book, Award, CheckCircle, TrendingUp } from '@openedx/paragon/icons';
import PropTypes from 'prop-types';
import messages from '../messages';

const LearningOverview = ({ data }) => {
  const { formatMessage } = useIntl();

  if (!data) {
    return <div>Loading overview...</div>;
  }

  const {
    summary = {},
    courseProgress = [],
    learningStreak = 0,
    studyTimeToday = 0,
    weeklyGoals = {},
  } = data;

  const statsCards = [
    {
      title: formatMessage(messages.totalCourses),
      value: summary.totalCourses || 0,
      icon: Book,
      color: 'primary',
      bgColor: '#e3f2fd',
    },
    {
      title: formatMessage(messages.completedCourses),
      value: summary.completedCourses || 0,
      icon: CheckCircle,
      color: 'success',
      bgColor: '#e8f5e8',
    },
    {
      title: formatMessage(messages.inProgressCourses),
      value: summary.inProgressCourses || 0,
      icon: TrendingUp,
      color: 'warning',
      bgColor: '#fff3cd',
    },
    {
      title: formatMessage(messages.certificates),
      value: summary.certificatesEarned || 0,
      icon: Award,
      color: 'info',
      bgColor: '#d1ecf1',
    },
  ];

  return (
    <div className="learning-overview">
      {/* Stats Cards Row */}
      <Row className="mb-4">
        {statsCards.map((stat, index) => (
          <Col key={`${stat.title}-${index}`} md={3} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex align-items-center">
                <div
                  className="rounded-circle p-3 me-3"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <stat.icon
                    size="24"
                    className={`text-${stat.color}`}
                  />
                </div>
                <div>
                  <h3 className="mb-0 fw-bold">{stat.value}</h3>
                  <small className="text-muted">{stat.title}</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Learning Progress Section */}
      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Tiến độ học tập</h5>
            </Card.Header>
            <Card.Body>
              {courseProgress.length > 0 ? (
                <div>
                  {courseProgress.slice(0, 5).map((course) => (
                    <div key={course.courseId} className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-medium">{course.courseName}</span>
                        <small className="text-muted">
                          {Math.round(course.progressPercentage)}%
                        </small>
                      </div>
                      <ProgressBar
                        now={course.progressPercentage}
                        variant={
                          course.progressPercentage >= 80 ? 'success' :
                          course.progressPercentage >= 50 ? 'info' :
                          'warning'
                        }
                        style={{ height: '8px' }}
                      />
                      <div className="d-flex justify-content-between mt-1">
                        <small className="text-muted">
                          Thời gian học: {course.timeSpent || 0} phút
                        </small>
                        <small className="text-muted">
                          Cập nhật: {new Date(course.lastAccessed).toLocaleDateString('vi-VN')}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">Chưa có khóa học nào được ghi nhận.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Daily Stats */}
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body className="text-center">
              <h3 className="text-primary mb-1">{learningStreak}</h3>
              <p className="mb-0 text-muted">Ngày học liên tục</p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="text-center">
              <h3 className="text-success mb-1">{Math.round(studyTimeToday / 60)}</h3>
              <p className="mb-0 text-muted">Phút học hôm nay</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Weekly Goals */}
      {weeklyGoals && Object.keys(weeklyGoals).length > 0 && (
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Mục tiêu tuần này</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Thời gian học</span>
                        <span>
                          {weeklyGoals.studyMinutes || 0}/
                          {weeklyGoals.targetStudyMinutes || 300} phút
                        </span>
                      </div>
                      <ProgressBar
                        now={
                          ((weeklyGoals.studyMinutes || 0) /
                            (weeklyGoals.targetStudyMinutes || 300)) *
                          100
                        }
                        variant="info"
                        className="mt-1"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Bài tập hoàn thành</span>
                        <span>
                          {weeklyGoals.completedAssignments || 0}/
                          {weeklyGoals.targetAssignments || 5}
                        </span>
                      </div>
                      <ProgressBar
                        now={
                          ((weeklyGoals.completedAssignments || 0) /
                            (weeklyGoals.targetAssignments || 5)) *
                          100
                        }
                        variant="success"
                        className="mt-1"
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

LearningOverview.propTypes = {
  data: PropTypes.shape({
    summary: PropTypes.shape({
      totalCourses: PropTypes.number,
      completedCourses: PropTypes.number,
      inProgressCourses: PropTypes.number,
      certificatesEarned: PropTypes.number,
    }),
    courseProgress: PropTypes.arrayOf(
      PropTypes.shape({
        courseId: PropTypes.string,
        courseName: PropTypes.string,
        progressPercentage: PropTypes.number,
        timeSpent: PropTypes.number,
        lastAccessed: PropTypes.string,
      })
    ),
    learningStreak: PropTypes.number,
    studyTimeToday: PropTypes.number,
    weeklyGoals: PropTypes.shape({
      studyMinutes: PropTypes.number,
      targetStudyMinutes: PropTypes.number,
      completedAssignments: PropTypes.number,
      targetAssignments: PropTypes.number,
    }),
  }),
};

LearningOverview.defaultProps = {
  data: null,
};

export default LearningOverview;
