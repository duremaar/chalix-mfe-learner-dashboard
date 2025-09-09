import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  personalizedLearningTitle: {
    id: 'personalized.learning.title',
    defaultMessage: 'Học tập cá nhân hóa',
    description: 'Title for personalized learning page',
  },
  overviewTab: {
    id: 'personalized.learning.tab.overview',
    defaultMessage: 'Tổng Quan',
    description: 'Overview tab title',
  },
  courseDetailsTab: {
    id: 'personalized.learning.tab.courseDetails',
    defaultMessage: 'Chi Tiết Khóa Học',
    description: 'Course details tab title',
  },
  courseUnitsList: {
    id: 'personalized.learning.tab.courseUnitsList',
    defaultMessage: 'Danh Sách Lớp Học',
    description: 'Course units list tab title',
  },
  emotionRecognitionTab: {
    id: 'personalized.learning.tab.emotion',
    defaultMessage: 'Nhận Diện Cảm Xúc',
    description: 'Emotion recognition tab title',
  },
  errorTitle: {
    id: 'personalized.learning.error.title',
    defaultMessage: 'Lỗi tải dữ liệu',
    description: 'Error title when loading fails',
  },
  errorMessage: {
    id: 'personalized.learning.error.message',
    defaultMessage: 'Không thể tải dữ liệu học tập. Vui lòng thử lại sau.',
    description: 'Error message when loading fails',
  },
  totalCourses: {
    id: 'personalized.learning.stats.totalCourses',
    defaultMessage: 'Tổng số khóa học',
    description: 'Total courses label',
  },
  completedCourses: {
    id: 'personalized.learning.stats.completedCourses',
    defaultMessage: 'Khóa học hoàn thành',
    description: 'Completed courses label',
  },
  inProgressCourses: {
    id: 'personalized.learning.stats.inProgressCourses',
    defaultMessage: 'Đang học',
    description: 'In progress courses label',
  },
  totalTests: {
    id: 'personalized.learning.stats.totalTests',
    defaultMessage: 'Tổng số bài kiểm tra',
    description: 'Total tests label',
  },
  passedTests: {
    id: 'personalized.learning.stats.passedTests',
    defaultMessage: 'Bài kiểm tra đạt',
    description: 'Passed tests label',
  },
  certificates: {
    id: 'personalized.learning.stats.certificates',
    defaultMessage: 'Chứng chỉ',
    description: 'Certificates label',
  },
  currentCourses: {
    id: 'personalized.learning.sidebar.currentCourses',
    defaultMessage: 'Khóa học hiện tại',
    description: 'Current courses sidebar title',
  },
  recommendations: {
    id: 'personalized.learning.sidebar.recommendations',
    defaultMessage: 'Gợi ý khóa học',
    description: 'Course recommendations sidebar title',
  },
  completedCoursesTitle: {
    id: 'personalized.learning.sidebar.completed',
    defaultMessage: 'Khóa học đã hoàn thành',
    description: 'Completed courses sidebar title',
  },
  
  // Course Details tab messages
  courseProgress: {
    id: 'personalized.learning.courseDetails.progress',
    defaultMessage: 'Tiến độ',
    description: 'Course progress column header',
  },
  courseName: {
    id: 'personalized.learning.courseDetails.name',
    defaultMessage: 'Tên khóa học',
    description: 'Course name column header',
  },
  courseTimeSpent: {
    id: 'personalized.learning.courseDetails.timeSpent',
    defaultMessage: 'Thời gian học',
    description: 'Time spent column header',
  },
  courseGrade: {
    id: 'personalized.learning.courseDetails.grade',
    defaultMessage: 'Điểm',
    description: 'Grade column header',
  },
  
  // Emotion Recognition messages
  emotionDistribution: {
    id: 'personalized.learning.emotion.distribution',
    defaultMessage: 'Phân bố cảm xúc',
    description: 'Emotion distribution chart title',
  },
  stressLevel: {
    id: 'personalized.learning.emotion.stressLevel',
    defaultMessage: 'Mức độ căng thẳng',
    description: 'Stress level indicator',
  },
  moodTrend: {
    id: 'personalized.learning.emotion.moodTrend',
    defaultMessage: 'Xu hướng tâm trạng',
    description: 'Mood trend chart title',
  },
  aiRecommendations: {
    id: 'personalized.learning.emotion.aiRecommendations',
    defaultMessage: 'Gợi ý từ AI',
    description: 'AI recommendations section title',
  },
  
  // Course Units messages
  courseUnitsList: {
    id: 'personalized.learning.courseUnits.list',
    defaultMessage: 'Danh sách lớp học',
    description: 'Course units list title',
  },
  searchCourses: {
    id: 'personalized.learning.courseUnits.search',
    defaultMessage: 'Tìm kiếm khóa học',
    description: 'Search courses placeholder',
  },
  viewDetails: {
    id: 'personalized.learning.courseUnits.viewDetails',
    defaultMessage: 'Xem chi tiết',
    description: 'View details button text',
  },
  courseStatus: {
    id: 'personalized.learning.courseUnits.status',
    defaultMessage: 'Trạng thái',
    description: 'Course status label',
  },
  startDate: {
    id: 'personalized.learning.courseUnits.startDate',
    defaultMessage: 'Ngày bắt đầu',
    description: 'Start date label',
  },
  enrollmentCount: {
    id: 'personalized.learning.courseUnits.enrollmentCount',
    defaultMessage: 'Số học viên',
    description: 'Enrollment count label',
  },
  completionRate: {
    id: 'personalized.learning.courseUnits.completionRate',
    defaultMessage: 'Tỷ lệ hoàn thành',
    description: 'Completion rate label',
  },
});

export default messages;
