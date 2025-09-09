import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  studiedHours: {
    id: 'learningHours.studiedHours',
    defaultMessage: 'Số giờ đã học',
    description: 'Label for completed study hours'
  },
  totalRequiredHours: {
    id: 'learningHours.totalRequiredHours', 
    defaultMessage: 'Tổng số giờ phải hoàn thành',
    description: 'Label for total required study hours'
  },
  pendingApproval: {
    id: 'learningHours.status.pendingApproval',
    defaultMessage: 'Đang chờ phê duyệt',
    description: 'Status text for pending approval'
  },
  approved: {
    id: 'learningHours.status.approved',
    defaultMessage: 'Đã phê duyệt',
    description: 'Status text for approved'
  },
  rejected: {
    id: 'learningHours.status.rejected',
    defaultMessage: 'Từ chối',
    description: 'Status text for rejected'
  },
  inProgress: {
    id: 'learningHours.status.inProgress',
    defaultMessage: 'Đang thực hiện',
    description: 'Status text for in progress'
  },
  pendingApprovalHours: {
    id: 'learningHours.pendingApprovalHours',
    defaultMessage: 'Có {hours} giờ đang chờ phê duyệt',
    description: 'Text showing hours pending approval'
  }
});

export default messages;
