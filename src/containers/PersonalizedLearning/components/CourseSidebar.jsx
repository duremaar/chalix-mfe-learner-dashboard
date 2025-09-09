import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, Badge, Button, ProgressBar } from '@openedx/paragon';
import { PlayCircle, CheckCircle, Star, ArrowRight } from '@openedx/paragon/icons';
import messages from '../messages';

const CourseSidebar = ({ data }) => {
  const { formatMessage } = useIntl();

  if (!data) {
    return <div>Loading sidebar...</div>;
  }

  const {
    current_courses = [],
    recommended_courses = [],
    completed_courses = [],
    achievements = []
  } = data;

  const CourseCard = ({ course, type = 'current' }) => (
    <Card className="mb-3 shadow-sm">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="mb-1 fw-medium" style={{ fontSize: '14px' }}>
            {course.course_name}
          </h6>
          {type === 'current' && (
            <Badge variant="info" className="ms-2">
              <PlayCircle size="12" className="me-1" />
              Đang học
            </Badge>
          )}
          {type === 'completed' && (
            <Badge variant="success" className="ms-2">
              <CheckCircle size="12" className="me-1" />
              Hoàn thành
            </Badge>
          )}
          {type === 'recommended' && (
            <Badge variant="warning" className="ms-2">
              <Star size="12" className="me-1" />
              Gợi ý
            </Badge>
          )}
        </div>
        
        <p className="small text-muted mb-2" style={{ fontSize: '12px' }}>
          {course.course_org}
        </p>

        {(type === 'current' || type === 'recommended') && course.progress_percentage !== undefined && (
          <div className="mb-2">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <small className="text-muted">Tiến độ</small>
              <small className="fw-medium">{Math.round(course.progress_percentage)}%</small>
            </div>
            <ProgressBar 
              now={course.progress_percentage} 
              variant={course.progress_percentage >= 80 ? 'success' : 
                      course.progress_percentage >= 50 ? 'info' : 'warning'}
              style={{ height: '6px' }}
            />
          </div>
        )}

        {type === 'completed' && course.completion_date && (
          <small className="text-muted">
            Hoàn thành: {new Date(course.completion_date).toLocaleDateString('vi-VN')}
          </small>
        )}

        {type === 'recommended' && course.match_score && (
          <div className="mb-2">
            <small className="text-success">
              Phù hợp: {Math.round(course.match_score)}%
            </small>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className="text-muted">
            {course.time_spent ? `${Math.round(course.time_spent / 60)}h học` : 'Chưa bắt đầu'}
          </small>
          <Button 
            variant="outline-primary" 
            size="sm"
            style={{ fontSize: '12px', padding: '4px 8px' }}
            onClick={() => {
              if (type === 'recommended') {
                window.open(`/courses/${course.course_id}/about`, '_blank');
              } else {
                window.open(`/course/${course.course_id}`, '_blank');
              }
            }}
          >
            {type === 'recommended' ? 'Xem' : 'Học'}
            <ArrowRight size="12" className="ms-1" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div className="course-sidebar">
      {/* Current Courses */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white py-2">
          <h6 className="mb-0">
            <PlayCircle size="16" className="me-2" />
            {formatMessage(messages.currentCourses)} ({current_courses.length})
          </h6>
        </Card.Header>
        <Card.Body className="p-0">
          {current_courses.length > 0 ? (
            <div className="p-3">
              {current_courses.slice(0, 3).map((course, index) => (
                <CourseCard key={course.course_id || index} course={course} type="current" />
              ))}
              {current_courses.length > 3 && (
                <Button variant="link" size="sm" className="p-0">
                  Xem tất cả ({current_courses.length}) khóa học
                </Button>
              )}
            </div>
          ) : (
            <div className="p-3 text-center">
              <p className="text-muted small mb-0">Chưa có khóa học nào đang học</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Recommended Courses */}
      <Card className="mb-4">
        <Card.Header className="bg-warning text-white py-2">
          <h6 className="mb-0">
            <Star size="16" className="me-2" />
            {formatMessage(messages.recommendations)} ({recommended_courses.length})
          </h6>
        </Card.Header>
        <Card.Body className="p-0">
          {recommended_courses.length > 0 ? (
            <div className="p-3">
              {recommended_courses.slice(0, 2).map((course, index) => (
                <CourseCard key={course.course_id || index} course={course} type="recommended" />
              ))}
              {recommended_courses.length > 2 && (
                <Button variant="link" size="sm" className="p-0">
                  Xem thêm gợi ý ({recommended_courses.length})
                </Button>
              )}
            </div>
          ) : (
            <div className="p-3 text-center">
              <p className="text-muted small mb-0">Chưa có gợi ý khóa học</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Recent Achievements */}
      {achievements && achievements.length > 0 && (
        <Card className="mb-4">
          <Card.Header className="bg-success text-white py-2">
            <h6 className="mb-0">
              <CheckCircle size="16" className="me-2" />
              Thành tích gần đây
            </h6>
          </Card.Header>
          <Card.Body className="p-3">
            {achievements.slice(0, 3).map((achievement, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <div className="me-2" style={{ fontSize: '20px' }}>
                  {achievement.icon || '🏆'}
                </div>
                <div>
                  <div className="fw-medium small">{achievement.title}</div>
                  <small className="text-muted">
                    {new Date(achievement.earned_date).toLocaleDateString('vi-VN')}
                  </small>
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      )}

      {/* Completed Courses */}
      <Card>
        <Card.Header className="bg-success text-white py-2">
          <h6 className="mb-0">
            <CheckCircle size="16" className="me-2" />
            {formatMessage(messages.completedCoursesTitle)} ({completed_courses.length})
          </h6>
        </Card.Header>
        <Card.Body className="p-0">
          {completed_courses.length > 0 ? (
            <div className="p-3">
              {completed_courses.slice(0, 2).map((course, index) => (
                <CourseCard key={course.course_id || index} course={course} type="completed" />
              ))}
              {completed_courses.length > 2 && (
                <Button variant="link" size="sm" className="p-0">
                  Xem tất cả ({completed_courses.length}) khóa đã hoàn thành
                </Button>
              )}
            </div>
          ) : (
            <div className="p-3 text-center">
              <p className="text-muted small mb-0">Chưa hoàn thành khóa học nào</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CourseSidebar;
