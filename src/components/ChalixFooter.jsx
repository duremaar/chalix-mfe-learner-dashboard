import React from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Nav,
} from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import './ChalixFooter.scss';

const ChalixFooter = () => {
  const intl = useIntl();
  const config = getConfig();

  return (
    <footer className="chalix-footer">
      <Container>
        <Row className="py-5">
          {/* Logo and Description Column */}
          <Col lg={4} md={6} className="mb-4">
            <div className="chalix-footer-brand mb-3">
              <Image
                src={config.LOGO_TRADEMARK_URL || config.LOGO_URL || '/static/chalix_theme/images/logo-white.svg'}
                alt={config.SITE_NAME || 'Chalix'}
                height="35"
                className="mb-3"
              />
              <p className="chalix-footer-description">
                Nền tảng học tập trực tuyến hàng đầu Việt Nam, 
                cung cấp các khóa học chất lượng cao với công nghệ hiện đại.
              </p>
            </div>
            <div className="chalix-social-links">
              <a href="#" className="chalix-social-link me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="chalix-social-link me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="chalix-social-link me-3">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="chalix-social-link">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </Col>

          {/* Quick Links Column */}
          <Col lg={2} md={6} sm={6} className="mb-4">
            <h5 className="chalix-footer-title">Liên kết nhanh</h5>
            <Nav className="chalix-footer-nav flex-column">
              <Nav.Link href="/courses" className="chalix-footer-link">
                Khóa học
              </Nav.Link>
              <Nav.Link href="/programs" className="chalix-footer-link">
                Chương trình
              </Nav.Link>
              <Nav.Link href="/instructors" className="chalix-footer-link">
                Giảng viên
              </Nav.Link>
              <Nav.Link href="/blog" className="chalix-footer-link">
                Blog
              </Nav.Link>
            </Nav>
          </Col>

          {/* Support Column */}
          <Col lg={2} md={6} sm={6} className="mb-4">
            <h5 className="chalix-footer-title">Hỗ trợ</h5>
            <Nav className="chalix-footer-nav flex-column">
              <Nav.Link href="/help" className="chalix-footer-link">
                Trợ giúp
              </Nav.Link>
              <Nav.Link href="/contact" className="chalix-footer-link">
                Liên hệ
              </Nav.Link>
              <Nav.Link href="/faq" className="chalix-footer-link">
                FAQ
              </Nav.Link>
              <Nav.Link href="/support" className="chalix-footer-link">
                Hỗ trợ kỹ thuật
              </Nav.Link>
            </Nav>
          </Col>

          {/* Legal Column */}
          <Col lg={2} md={6} sm={6} className="mb-4">
            <h5 className="chalix-footer-title">Pháp lý</h5>
            <Nav className="chalix-footer-nav flex-column">
              <Nav.Link href="/privacy" className="chalix-footer-link">
                Chính sách bảo mật
              </Nav.Link>
              <Nav.Link href="/terms" className="chalix-footer-link">
                Điều khoản sử dụng
              </Nav.Link>
              <Nav.Link href="/cookies" className="chalix-footer-link">
                Chính sách cookie
              </Nav.Link>
              <Nav.Link href="/accessibility" className="chalix-footer-link">
                Khả năng tiếp cận
              </Nav.Link>
            </Nav>
          </Col>

          {/* Contact Column */}
          <Col lg={2} md={6} sm={6} className="mb-4">
            <h5 className="chalix-footer-title">Liên hệ</h5>
            <div className="chalix-contact-info">
              <p className="chalix-contact-item">
                <i className="fas fa-envelope me-2"></i>
                info@chalix.edu.vn
              </p>
              <p className="chalix-contact-item">
                <i className="fas fa-phone me-2"></i>
                (+84) 123 456 789
              </p>
              <p className="chalix-contact-item">
                <i className="fas fa-map-marker-alt me-2"></i>
                123 Đường ABC, Quận 1, TP.HCM
              </p>
            </div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <div className="chalix-footer-bottom">
          <Row className="align-items-center">
            <Col md={6}>
              <p className="chalix-copyright mb-0">
                © 2024 Chalix Education Platform. Tất cả quyền được bảo lưu.
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <p className="chalix-version mb-0">
                Phiên bản 2.0 | Được phát triển bởi Alimento Team
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default ChalixFooter;
