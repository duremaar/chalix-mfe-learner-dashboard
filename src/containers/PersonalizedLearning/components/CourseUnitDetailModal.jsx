import React from 'react';
import {
  StandardModal,
  ModalDialog,
  Button,
  Icon,
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
} from '@openedx/paragon';
import { Close } from '@openedx/paragon/icons';

const CourseUnitDetailModal = ({ 
  isOpen, 
  onClose, 
  courseUnit 
}) => {
  if (!courseUnit) return null;

  // Sample timeline data - in real implementation, this would come from courseUnit
  const timelineData = [
    { 
      label: 'BẮT ĐẦU HỌC TẬP', 
      date: '21/10',
      status: 'completed',
      isFirst: true 
    },
    { 
      label: 'KIỂM TRA GIỮA KỲ', 
      date: '05/11',
      status: 'completed' 
    },
    { 
      label: 'KIỂM TRA CUỐI KỲ', 
      date: '24/11',
      status: 'current' 
    },
    { 
      label: 'KẾT THÚC KHÓA HỌC', 
      date: '28/11',
      status: 'upcoming',
      isLast: true 
    },
  ];

  return (
    <StandardModal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      hasCloseButton={false}
    >
      <ModalDialog>
        <div className="course-unit-detail-modal">
          {/* Header */}
          <div className="modal-header bg-primary text-white p-3 d-flex justify-content-between align-items-center">
            <h4 className="mb-0 text-white">THÔNG TIN CHI TIẾT KHÓA HỌC</h4>
            <Button
              variant="inverse-primary"
              size="sm"
              onClick={onClose}
              className="text-white"
            >
              <Icon src={Close} />
            </Button>
          </div>

          {/* Content */}
          <div className="modal-content p-4">
            <Container fluid>
              <Row className="mb-4">
                <Col md={6}>
                  <div className="course-info">
                    <div className="mb-3">
                      <strong>Khóa học:</strong> {courseUnit?.title || 'Lập trình Nodejs từ zero tới master dành cho người mới bắt đầu'}
                    </div>
                    <div className="mb-3">
                      <strong>Ngày bắt đầu:</strong> {courseUnit?.startDate || '20/10/2025'}
                    </div>
                    <div className="mb-3">
                      <strong>Kết quả kiểm tra:</strong> {courseUnit?.testScore || '68/100'}
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="course-stats">
                    <div className="mb-3">
                      <strong>Số lượng tương tác:</strong> {courseUnit?.interactions || '20'}
                    </div>
                    <div className="mb-3">
                      <strong>Đánh giá môn học:</strong>{' '}
                      <span className={`badge ${courseUnit?.evaluation === 'ĐẠT' ? 'bg-success' : 'bg-warning'}`}>
                        {courseUnit?.evaluation || 'ĐẠT'}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Timeline Section */}
              <Row className="mb-4">
                <Col xs={12}>
                  <div className="timeline-section">
                    <h6 className="mb-3">Biểu đồ thời gian học tập</h6>
                    
                    {/* Timeline Container */}
                    <div className="timeline-container position-relative">
                      {/* Timeline Line */}
                      <div className="timeline-line position-absolute" style={{
                        top: '50%',
                        left: '0',
                        right: '0',
                        height: '3px',
                        background: 'linear-gradient(to right, #28a745 0%, #28a745 50%, #6c757d 50%, #6c757d 100%)',
                        zIndex: 1
                      }}></div>

                      {/* Timeline Items */}
                      <div className="d-flex justify-content-between position-relative" style={{ zIndex: 2 }}>
                        {timelineData.map((item, index) => (
                          <div key={index} className="timeline-item text-center">
                            {/* Circle */}
                            <div 
                              className={`timeline-circle mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center ${
                                item.status === 'completed' ? 'bg-success' : 
                                item.status === 'current' ? 'bg-primary' : 'bg-secondary'
                              }`}
                              style={{
                                width: '16px',
                                height: '16px',
                                border: '3px solid white',
                                boxShadow: '0 0 0 2px #dee2e6'
                              }}
                            ></div>
                            
                            {/* Label */}
                            <div className="timeline-label">
                              <small className="text-primary fw-bold d-block mb-1">
                                {item.label}
                              </small>
                              <small className="text-muted">
                                {item.date}
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Progress Bar */}
              <Row>
                <Col xs={12}>
                  <div className="course-progress">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">Tiến độ học tập</span>
                      <span className="text-primary fw-bold">68%</span>
                    </div>
                    <ProgressBar
                      now={courseUnit?.progress || 68}
                      variant="success"
                      style={{ height: '8px' }}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </ModalDialog>

      <style jsx>{`
        .course-unit-detail-modal .modal-header {
          border-radius: 8px 8px 0 0;
          background-color: #4A90E2 !important;
          border-bottom: none;
        }
        
        .course-unit-detail-modal .modal-content {
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border: none;
        }
        
        .timeline-container {
          padding: 30px 0;
          margin: 20px 0;
        }
        
        .timeline-item {
          flex: 1;
          max-width: 200px;
        }
        
        .timeline-label {
          max-width: 120px;
          margin: 0 auto;
        }
        
        .timeline-label small {
          font-size: 0.75rem;
          line-height: 1.2;
          word-break: break-word;
        }
        
        .timeline-circle {
          position: relative;
        }
        
        .course-info strong,
        .course-stats strong {
          color: #495057;
          font-weight: 600;
          font-size: 0.95rem;
        }
        
        .badge {
          font-size: 0.8rem;
          padding: 0.35em 0.65em;
          font-weight: 600;
        }
        
        .bg-success {
          background-color: #28a745 !important;
        }
        
        .bg-warning {
          background-color: #ffc107 !important;
          color: #212529 !important;
        }
        
        .modal-content {
          background-color: #ffffff;
        }
        
        .modal-backdrop {
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        .course-info div,
        .course-stats div {
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }
        
        .course-progress .text-muted {
          font-size: 0.9rem;
        }
        
        .course-progress .text-primary {
          font-size: 1rem;
          font-weight: 700;
        }
        
        @media (max-width: 768px) {
          .timeline-label small {
            font-size: 0.65rem;
          }
          
          .timeline-item {
            max-width: 100px;
          }
          
          .timeline-label {
            max-width: 80px;
          }
          
          .course-info div,
          .course-stats div {
            margin-bottom: 0.8rem;
          }
          
          .modal-header h4 {
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 576px) {
          .timeline-container {
            padding: 15px 0;
          }
          
          .timeline-item {
            max-width: 70px;
          }
          
          .timeline-label {
            max-width: 60px;
          }
          
          .timeline-label small {
            font-size: 0.6rem;
          }
        }
      `}</style>
    </StandardModal>
  );
};

export default CourseUnitDetailModal;
