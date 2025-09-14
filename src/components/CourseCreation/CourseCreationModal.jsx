import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Alert,
  Spinner,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@openedx/paragon';
import { CheckCircle, AlertCircle } from '@openedx/paragon/icons';

import { useIntl } from '@edx/frontend-platform/i18n';
import { logError } from '@edx/frontend-platform/logging';
import lmsApi from '../../../data/services/lms/api';
import messages from './messages';

// Import modal styles
import './CourseCreationModal.scss';

/**
 * CourseCreationModal Component
 * 
 * Provides a modal interface for creating new OpenEDX courses with optional
 * program template integration for automatic unit creation from program topics.
 */
const CourseCreationModal = ({
  isOpen,
  onClose,
  onCourseCreated,
}) => {
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    org: 'chalix',
    number: '',
    run: new Date().getFullYear().toString(),
    short_description: '',
    course_type: '',
    template_program_id: '',
  });
  
  // Program templates
  const [programTemplates, setProgramTemplates] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  useEffect(() => {
    if (isOpen) {
      loadProgramTemplates();
      // Reset form when opening
      setFormData({
        title: '',
        org: 'chalix',
        number: '',
        run: new Date().getFullYear().toString(),
        short_description: '',
        course_type: '',
        template_program_id: '',
      });
      setError(null);
      setSuccess(null);
      setSelectedProgram(null);
    }
  }, [isOpen]);
  
  const loadProgramTemplates = async () => {
    setIsLoadingPrograms(true);
    try {
      const response = await lmsApi.getProgramTemplates();
      setProgramTemplates(response.programs || []);
    } catch (err) {
      logError('Failed to load program templates:', err);
      // Don't show error for programs loading - it's optional
    } finally {
      setIsLoadingPrograms(false);
    }
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (error) setError(null);
  };
  
  const handleProgramChange = async (event) => {
    const programId = event.target.value;
    setFormData(prev => ({
      ...prev,
      template_program_id: programId,
    }));
    
    if (programId) {
      try {
        const programDetail = await lmsApi.getProgramDetail(programId);
        setSelectedProgram(programDetail);
      } catch (err) {
        logError('Failed to load program details:', err);
        setSelectedProgram(null);
      }
    } else {
      setSelectedProgram(null);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Basic validation
    if (!formData.title.trim()) {
      setError(intl.formatMessage(messages.titleRequired));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await lmsApi.createCourse(formData);
      
      setSuccess({
        message: intl.formatMessage(messages.courseCreated),
        course: response,
      });
      
      // Call parent callback
      if (onCourseCreated) {
        onCourseCreated(response);
      }
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (err) {
      logError('Course creation failed:', err);
      
      if (err.response?.status === 400 && err.response.data?.error_code === 'DUPLICATE_COURSE') {
        setError(intl.formatMessage(messages.duplicateCourse));
      } else if (err.response?.status === 403) {
        setError(intl.formatMessage(messages.noPermission));
      } else {
        setError(err.response?.data?.error || intl.formatMessage(messages.creationFailed));
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };
  
  // Don't render anything if not open
  if (!isOpen) {
    return null;
  }
  
  const modalContent = (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      hasCloseButton={!isLoading}
      renderDefaultCloseButton={true}
      closeButtonVariant="tertiary"
      bodyClassName="p-4"
      dialogClassName="modal-course-creation"
      backdrop="static"
      keyboard={!isLoading}
    >
      <ModalHeader>
        <h3>{intl.formatMessage(messages.createNewCourse)}</h3>
      </ModalHeader>
      
      <ModalBody>
        {error && (
          <Alert variant=\"danger\" icon={AlertCircle}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert variant=\"success\" icon={CheckCircle}>
            <div>
              <div className=\"font-weight-bold\">{success.message}</div>
              {success.course.units_created > 0 && (
                <div className=\"mt-2\">
                  {intl.formatMessage(messages.unitsCreated, {
                    count: success.course.units_created,
                  })}
                </div>
              )}
            </div>
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor=\"course-title\">{intl.formatMessage(messages.courseTitle)} *</label>
            <Input
              id=\"course-title\"
              name=\"title\"
              type=\"text\"
              value={formData.title}
              onChange={handleInputChange}
              placeholder={intl.formatMessage(messages.courseTitlePlaceholder)}
              disabled={isLoading || success}
              required
            />
          </FormGroup>
          
          <div className=\"row\">
            <div className=\"col-md-4\">
              <FormGroup>
                <label htmlFor=\"course-org\">{intl.formatMessage(messages.organization)}</label>
                <Input
                  id=\"course-org\"
                  name=\"org\"
                  type=\"text\"
                  value={formData.org}
                  onChange={handleInputChange}
                  disabled={isLoading || success}
                />
              </FormGroup>
            </div>
            <div className=\"col-md-4\">
              <FormGroup>
                <label htmlFor=\"course-number\">{intl.formatMessage(messages.courseNumber)}</label>
                <Input
                  id=\"course-number\"
                  name=\"number\"
                  type=\"text\"
                  value={formData.number}
                  onChange={handleInputChange}
                  placeholder={intl.formatMessage(messages.courseNumberPlaceholder)}
                  disabled={isLoading || success}
                />
              </FormGroup>
            </div>
            <div className=\"col-md-4\">
              <FormGroup>
                <label htmlFor=\"course-run\">{intl.formatMessage(messages.courseRun)}</label>
                <Input
                  id=\"course-run\"
                  name=\"run\"
                  type=\"text\"
                  value={formData.run}
                  onChange={handleInputChange}
                  disabled={isLoading || success}
                />
              </FormGroup>
            </div>
          </div>
          
          <FormGroup>
            <label htmlFor=\"course-description\">{intl.formatMessage(messages.courseDescription)}</label>
            <Input
              id=\"course-description\"
              name=\"short_description\"
              as=\"textarea\"
              rows={3}
              value={formData.short_description}
              onChange={handleInputChange}
              placeholder={intl.formatMessage(messages.courseDescriptionPlaceholder)}
              disabled={isLoading || success}
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor=\"program-template\">{intl.formatMessage(messages.programTemplate)}</label>
            <Input
              id=\"program-template\"
              name=\"template_program_id\"
              as=\"select\"
              value={formData.template_program_id}
              onChange={handleProgramChange}
              disabled={isLoading || success || isLoadingPrograms}
            >
              <option value=\"\">{intl.formatMessage(messages.noProgramTemplate)}</option>
              {programTemplates.map(program => (
                <option key={program.id} value={program.id}>
                  {program.title} ({program.topics_count || 0} topics)
                </option>
              ))}
            </Input>
            {isLoadingPrograms && (
              <div className=\"mt-2\">
                <Spinner animation=\"border\" size=\"sm\" /> {intl.formatMessage(messages.loadingPrograms)}
              </div>
            )}
          </FormGroup>
          
          {selectedProgram && (
            <Card className=\"mb-3\">
              <CardHeader>
                <h6>{intl.formatMessage(messages.selectedProgramPreview)}</h6>
              </CardHeader>
              <CardBody>
                <div className=\"font-weight-bold\">{selectedProgram.title}</div>
                {selectedProgram.topics && selectedProgram.topics.length > 0 && (
                  <div className=\"mt-2\">
                    <small className=\"text-muted\">
                      {intl.formatMessage(messages.topicsWillBeCreated)}:
                    </small>
                    <ul className=\"mt-1 mb-0\">
                      {selectedProgram.topics.map(topic => (
                        <li key={topic.id} className=\"small\">
                          {topic.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardBody>
            </Card>
          )}
        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Button
          variant=\"outline-primary\"
          onClick={handleClose}
          disabled={isLoading}
        >
          {intl.formatMessage(messages.cancel)}
        </Button>
        <Button
          variant=\"primary\"
          onClick={handleSubmit}
          disabled={isLoading || success || !formData.title.trim()}
        >
          {isLoading && <Spinner animation=\"border\" size=\"sm\" className=\"mr-2\" />}
          {intl.formatMessage(messages.createCourse)}
        </Button>
      </ModalFooter>
    </Modal>
  );
  
  // Use portal to render modal at document body level
  return createPortal(modalContent, document.body);
};

CourseCreationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCourseCreated: PropTypes.func,
};

CourseCreationModal.defaultProps = {
  onCourseCreated: null,
};

export default CourseCreationModal;