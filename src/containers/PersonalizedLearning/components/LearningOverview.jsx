import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Row, Col, Card, ProgressBar } from '@openedx/paragon';
import { Book, Award, CheckCircle, TrendingUp } from '@openedx/paragon/icons';
import messages from '../messages';

const LearningOverview = ({ data }) => {
  const { formatMessage } = useIntl();

  if (!data) {
    return <div>Loading overview...</div>;
  }

  const {
    summary = {},
    course_progress = [],
    learning_streak = 0,
    study_time_today = 0,
    weekly_goals = {}
  } = data;

  const statsCards = [
    {
      title: formatMessage(messages.totalCourses),
      value: summary.total_courses || 0,
      icon: Book,
      color: 'primary',
      bgColor: '#e3f2fd'
    },
    {
      title: formatMessage(messages.completedCourses),
      value: summary.completed_courses || 0,
      icon: CheckCircle,
      color: 'success',
      bgColor: '#e8f5e8'
    },
    {
      title: formatMessage(messages.inProgressCourses),
      value: summary.in_progress_courses || 0,
      icon: TrendingUp,
      color: 'warning',
      bgColor: '#fff3cd'
    },
    {
      title: formatMessage(messages.certificates),
      value: summary.certificates_earned || 0,
      icon: Award,
      color: 'info',
      bgColor: '#d1ecf1'
    }
  ];

  return (
    <div className="learning-overview">
      {/* Stats Cards Row */}
      <Row className="mb-4">
        {statsCards.map((stat, index) => (
          <Col key={index} md={3} className="mb-3">
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
              {course_progress.length > 0 ? (
                <div>
                  {course_progress.slice(0, 5).map((course, index) => (
                    <div key={course.course_id} className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-medium">{course.course_name}</span>
                        <small className="text-muted">
                          {Math.round(course.progress_percentage)}%
                        </small>
                      </div>
                      <ProgressBar 
                        now={course.progress_percentage} 
                        variant={course.progress_percentage >= 80 ? 'success' : 
                                course.progress_percentage >= 50 ? 'info' : 'warning'}
                        style={{ height: '8px' }}
                      />
                      <div className="d-flex justify-content-between mt-1">
                        <small className="text-muted">
                          Thời gian học: {course.time_spent || 0} phút
                        </small>
                        <small className="text-muted">
                          Cập nhật: {new Date(course.last_accessed).toLocaleDateString('vi-VN')}
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
              <h3 className="text-primary mb-1">{learning_streak}</h3>
              <p className="mb-0 text-muted">Ngày học liên tục</p>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body className="text-center">
              <h3 className="text-success mb-1">{Math.round(study_time_today / 60)}</h3>
              <p className="mb-0 text-muted">Phút học hôm nay</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Weekly Goals */}
      {weekly_goals && Object.keys(weekly_goals).length > 0 && (
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
                        <span>{weekly_goals.study_minutes || 0}/{weekly_goals.target_study_minutes || 300} phút</span>
                      </div>
                      <ProgressBar 
                        now={(weekly_goals.study_minutes || 0) / (weekly_goals.target_study_minutes || 300) * 100} 
                        variant="info"
                        className="mt-1"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Bài tập hoàn thành</span>
                        <span>{weekly_goals.completed_assignments || 0}/{weekly_goals.target_assignments || 5}</span>
                      </div>
                      <ProgressBar 
                        now={(weekly_goals.completed_assignments || 0) / (weekly_goals.target_assignments || 5) * 100} 
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

export default LearningOverview;
