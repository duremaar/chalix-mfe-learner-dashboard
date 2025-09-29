import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Card,
  Badge,
  Button,
  ProgressBar,
} from '@openedx/paragon';
import {
  PlayCircle,
  CheckCircle,
  Star,
  ArrowRight,
} from '@openedx/paragon/icons';
import messages from '../messages';

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
            variant={
              course.progress_percentage >= 80 ? 'success' :
              course.progress_percentage >= 50 ? 'info' :
              'warning'
            }
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

CourseCard.propTypes = {
  course: PropTypes.shape({
    course_name: PropTypes.string,
    course_org: PropTypes.string,
    progress_percentage: PropTypes.number,
    completion_date: PropTypes.string,
    match_score: PropTypes.number,
    time_spent: PropTypes.number,
    course_id: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['current', 'completed', 'recommended']).isRequired,
};

const CourseSidebar = ({ data }) => {

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
          {currentCourses.length > 0 ? (
            <div className="p-3">
              {currentCourses.slice(0, 3).map((course, index) => (
                <CourseCard key={course.course_id || index} course={course} type="current" />
              ))}
              {currentCourses.length > 3 && (
                <Button variant="link" size="sm" className="p-0">
                  Xem tất cả ({currentCourses.length}) khóa học
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
          {recommendedCourses.length > 0 ? (
            <div className="p-3">
              {recommendedCourses.slice(0, 2).map((course, index) => (
                <CourseCard key={course.course_id || index} course={course} type="recommended" />
              ))}
              {recommendedCourses.length > 2 && (
                <Button variant="link" size="sm" className="p-0">
                  Xem thêm gợi ý ({recommendedCourses.length})
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
              <div key={`${achievement.title}-${achievement.earned_date}-${index}`} className="d-flex align-items-center mb-2">
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
          {completedCourses.length > 0 ? (
            <div className="p-3">
              {completedCourses.slice(0, 2).map((course, index) => (
                <CourseCard key={course.course_id || index} course={course} type="completed" />
              ))}
              {completedCourses.length > 2 && (
                <Button variant="link" size="sm" className="p-0">
                  Xem tất cả ({completedCourses.length}) khóa đã hoàn thành
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

CourseSidebar.propTypes = {
  data: PropTypes.shape({
    currentCourses: PropTypes.arrayOf(PropTypes.shape({
      course_name: PropTypes.string,
      course_org: PropTypes.string,
      progress_percentage: PropTypes.number,
      time_spent: PropTypes.number,
      course_id: PropTypes.string,
    })),
    recommendedCourses: PropTypes.arrayOf(PropTypes.shape({
      course_name: PropTypes.string,
      course_org: PropTypes.string,
      progress_percentage: PropTypes.number,
      match_score: PropTypes.number,
      time_spent: PropTypes.number,
      course_id: PropTypes.string,
    })),
    completedCourses: PropTypes.arrayOf(PropTypes.shape({
      course_name: PropTypes.string,
      course_org: PropTypes.string,
      completion_date: PropTypes.string,
      time_spent: PropTypes.number,
      course_id: PropTypes.string,
    })),
    achievements: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.string,
      earned_date: PropTypes.string,
    })),
  }),
};

export default CourseSidebar;
