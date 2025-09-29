import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { DataTable, Card, Badge, Button, Form } from '@openedx/paragon';
import { PlayCircle, CheckCircle, AccessTime } from '@openedx/paragon/icons';
import messages from '../messages';

const CourseNameCell = ({ row }) => (
  <div>
    <div className="fw-medium">{row.original.course_name}</div>
    <small className="text-muted">{row.original.course_org}</small>
  </div>
);

CourseNameCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      course_name: PropTypes.string,
      course_org: PropTypes.string,
    }),
  }).isRequired,
};

const StatusCell = ({ row }) => {
  const getStatusBadge = (progress) => {
    if (progress >= 100) {
      return <Badge variant="success"><CheckCircle className="me-1" size="sm" />Hoàn thành</Badge>;
    } else if (progress > 0) {
      return <Badge variant="info"><PlayCircle className="me-1" size="sm" />Đang học</Badge>;
    } else {
      return <Badge variant="secondary"><AccessTime className="me-1" size="sm" />Chưa bắt đầu</Badge>;
    }
  };

  return getStatusBadge(row.original.progress_percentage);
};

StatusCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      progress_percentage: PropTypes.number,
    }),
  }).isRequired,
};

const ProgressCell = ({ row }) => (
  <div className="d-flex align-items-center">
    <div className="progress me-2" style={{ width: '100px', height: '6px' }}>
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${row.original.progress_percentage}%` }}
        aria-valuenow={row.original.progress_percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
    <small>{Math.round(row.original.progress_percentage)}%</small>
  </div>
);

ProgressCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      progress_percentage: PropTypes.number,
    }),
  }).isRequired,
};

const TimeSpentCell = ({ row }) => {
  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} phút`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return <span>{formatDuration(row.original.time_spent || 0)}</span>;
};

TimeSpentCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      time_spent: PropTypes.number,
    }),
  }).isRequired,
};

const GradeCell = ({ row }) => (
  <span className={`fw-medium ${
    row.original.grade >= 80 ? 'text-success' :
    row.original.grade >= 60 ? 'text-warning' :
    'text-danger'
  }`}>
    {row.original.grade ? `${row.original.grade}%` : '--'}
  </span>
);

GradeCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      grade: PropTypes.number,
    }),
  }).isRequired,
};

const LastAccessedCell = ({ row }) => (
  <small className="text-muted">
    {row.original.last_accessed ?
      new Date(row.original.last_accessed).toLocaleDateString('vi-VN') :
      'Chưa truy cập'
    }
  </small>
);

LastAccessedCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      last_accessed: PropTypes.string,
    }),
  }).isRequired,
};

const ActionsCell = ({ row }) => (
  <div className="d-flex gap-2">
    <Button
      variant="outline-primary"
      size="sm"
      onClick={() => {
        // Navigate to course
        window.open(`/course/${row.original.course_id}`, '_blank');
      }}
    >
      Xem khóa học
    </Button>
    <Button
      variant="primary"
      size="sm"
      onClick={() => {
        // Navigate to course units view
        const currentUrl = window.location.pathname + window.location.search;
        const separator = currentUrl.includes('?') ? '&' : '?';
        const newUrl = `${currentUrl}${separator}course_id=${row.original.course_id}`;
        window.history.pushState({}, '', newUrl);
        window.location.reload();
      }}
    >
      Xem lớp học
    </Button>
  </div>
);

ActionsCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      course_id: PropTypes.string,
    }),
  }).isRequired,
};

const CourseDetails = ({ data }) => {
  const { formatMessage } = useIntl();
  const [filteredCourses, setFilteredCourses] = useState(data?.course_progress || []);
  const [filterStatus, setFilterStatus] = useState('all');

  if (!data || !data.course_progress) {
    return <div>Loading course details...</div>;
  }

  const { course_progress = [] } = data;

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    if (status === 'all') {
      setFilteredCourses(course_progress);
    } else if (status === 'completed') {
      setFilteredCourses(course_progress.filter(course => course.progress_percentage >= 100));
    } else if (status === 'in_progress') {
      setFilteredCourses(course_progress.filter(course =>
        course.progress_percentage > 0 && course.progress_percentage < 100
      ));
    } else if (status === 'not_started') {
      setFilteredCourses(course_progress.filter(course => course.progress_percentage === 0));
    }
  };

  const columns = [
    {
      Header: 'Tên khóa học',
      accessor: 'course_name',
      Cell: CourseNameCell,
    },
    {
      Header: 'Trạng thái',
      accessor: 'progress_percentage',
      Cell: StatusCell,
    },
    {
      Header: 'Tiến độ',
      accessor: 'progress_percentage',
      Cell: ProgressCell,
    },
    {
      Header: 'Thời gian học',
      accessor: 'time_spent',
      Cell: TimeSpentCell,
    },
    {
      Header: 'Điểm số',
      accessor: 'grade',
      Cell: GradeCell,
    },
    {
      Header: 'Lần truy cập cuối',
      accessor: 'last_accessed',
      Cell: LastAccessedCell,
    },
    {
      Header: 'Hành động',
      accessor: 'course_id',
      Cell: ActionsCell,
    },
  ];

  return (
    <div className="course-details">
      {/* Filter Controls */}
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Chi tiết khóa học ({filteredCourses.length})</h5>
            <div className="btn-group" role="group">
              <Button
                variant={filterStatus === 'all' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => handleFilterChange('all')}
              >
                Tất cả
              </Button>
              <Button
                variant={filterStatus === 'in_progress' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => handleFilterChange('in_progress')}
              >
                Đang học
              </Button>
              <Button
                variant={filterStatus === 'completed' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => handleFilterChange('completed')}
              >
                Hoàn thành
              </Button>
              <Button
                variant={filterStatus === 'not_started' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => handleFilterChange('not_started')}
              >
                Chưa bắt đầu
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Course Table */}
      <Card>
        <Card.Body>
          {filteredCourses.length > 0 ? (
            <DataTable
              data={filteredCourses}
              columns={columns}
              initialState={{
                pageSize: 10,
                sortBy: [{ id: 'last_accessed', desc: true }],
              }}
              isPaginated
              isFilterable
              isSortable
              itemCount={filteredCourses.length}
              pageCount={Math.ceil(filteredCourses.length / 10)}
            />
          ) : (
            <div className="text-center py-4">
              <p className="text-muted">Không có khóa học nào phù hợp với bộ lọc.</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Course Statistics Summary */}
      <Card className="mt-4">
        <Card.Body>
          <h6 className="mb-3">Thống kê tổng quan</h6>
          <div className="row">
            <div className="col-md-3 text-center">
              <h4 className="text-primary mb-1">{course_progress.length}</h4>
              <small className="text-muted">Tổng khóa học</small>
            </div>
            <div className="col-md-3 text-center">
              <h4 className="text-success mb-1">
                {course_progress.filter(c => c.progress_percentage >= 100).length}
              </h4>
              <small className="text-muted">Đã hoàn thành</small>
            </div>
            <div className="col-md-3 text-center">
              <h4 className="text-info mb-1">
                {course_progress.filter(c => c.progress_percentage > 0 && c.progress_percentage < 100).length}
              </h4>
              <small className="text-muted">Đang học</small>
            </div>
            <div className="col-md-3 text-center">
              <h4 className="text-warning mb-1">
                {Math.round(course_progress.reduce((acc, c) => acc + (c.time_spent || 0), 0) / 60)}
              </h4>
              <small className="text-muted">Tổng giờ học</small>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

CourseDetails.propTypes = {
  data: PropTypes.shape({
    course_progress: PropTypes.arrayOf(PropTypes.shape({
      course_name: PropTypes.string,
      course_org: PropTypes.string,
      progress_percentage: PropTypes.number,
      time_spent: PropTypes.number,
      grade: PropTypes.number,
      last_accessed: PropTypes.string,
      course_id: PropTypes.string,
    })),
  }),
};

export default CourseDetails;
