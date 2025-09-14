import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  createNewCourse: {
    id: 'learner.dashboard.course.creation.modal.title',
    defaultMessage: 'Create New Course',
    description: 'Title for the course creation modal',
  },
  courseTitle: {
    id: 'learner.dashboard.course.creation.title.label',
    defaultMessage: 'Course Title',
    description: 'Label for course title field',
  },
  courseTitlePlaceholder: {
    id: 'learner.dashboard.course.creation.title.placeholder',
    defaultMessage: 'Enter course title...',
    description: 'Placeholder for course title input',
  },
  organization: {
    id: 'learner.dashboard.course.creation.org.label',
    defaultMessage: 'Organization',
    description: 'Label for organization field',
  },
  courseNumber: {
    id: 'learner.dashboard.course.creation.number.label',
    defaultMessage: 'Course Number',
    description: 'Label for course number field',
  },
  courseNumberPlaceholder: {
    id: 'learner.dashboard.course.creation.number.placeholder',
    defaultMessage: 'Auto-generated if empty',
    description: 'Placeholder for course number input',
  },
  courseRun: {
    id: 'learner.dashboard.course.creation.run.label',
    defaultMessage: 'Course Run',
    description: 'Label for course run field',
  },
  courseDescription: {
    id: 'learner.dashboard.course.creation.description.label',
    defaultMessage: 'Course Description',
    description: 'Label for course description field',
  },
  courseDescriptionPlaceholder: {
    id: 'learner.dashboard.course.creation.description.placeholder',
    defaultMessage: 'Enter a brief description of the course...',
    description: 'Placeholder for course description textarea',
  },
  programTemplate: {
    id: 'learner.dashboard.course.creation.template.label',
    defaultMessage: 'Program Template',
    description: 'Label for program template selection',
  },
  noProgramTemplate: {
    id: 'learner.dashboard.course.creation.template.none',
    defaultMessage: 'No template (empty course)',
    description: 'Option for no program template',
  },
  selectedProgramPreview: {
    id: 'learner.dashboard.course.creation.template.preview.title',
    defaultMessage: 'Selected Program Preview',
    description: 'Title for program template preview section',
  },
  topicsWillBeCreated: {
    id: 'learner.dashboard.course.creation.template.topics.info',
    defaultMessage: 'The following course units will be created automatically',
    description: 'Info text about automatic topic creation',
  },
  loadingPrograms: {
    id: 'learner.dashboard.course.creation.template.loading',
    defaultMessage: 'Loading program templates...',
    description: 'Loading text for program templates',
  },
  cancel: {
    id: 'learner.dashboard.course.creation.button.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button text',
  },
  createCourse: {
    id: 'learner.dashboard.course.creation.button.create',
    defaultMessage: 'Create Course',
    description: 'Create course button text',
  },
  titleRequired: {
    id: 'learner.dashboard.course.creation.error.title.required',
    defaultMessage: 'Course title is required',
    description: 'Error message when title is missing',
  },
  courseCreated: {
    id: 'learner.dashboard.course.creation.success.created',
    defaultMessage: 'Course created successfully!',
    description: 'Success message when course is created',
  },
  unitsCreated: {
    id: 'learner.dashboard.course.creation.success.units',
    defaultMessage: '{count} course units created from program topics',
    description: 'Success message about units created from program topics',
  },
  duplicateCourse: {
    id: 'learner.dashboard.course.creation.error.duplicate',
    defaultMessage: 'A course with this organization, number, and run already exists. Please use different values.',
    description: 'Error message for duplicate course',
  },
  noPermission: {
    id: 'learner.dashboard.course.creation.error.permission',
    defaultMessage: 'You do not have permission to create courses.',
    description: 'Error message for lack of permissions',
  },
  creationFailed: {
    id: 'learner.dashboard.course.creation.error.failed',
    defaultMessage: 'Course creation failed. Please try again.',
    description: 'Generic error message for creation failure',
  },
});

export default messages;