import { post, get } from './utils';
import urls from './urls';

/**
 * Course Creation API Service

 * This service handles course creation using the OpenEDX CMS course creation logic,
 * including support for program topics conversion to course units.
 */

/**
 * Create a new OpenEDX course with optional program template
 * @param {Object} courseData - Course creation data
 * @param {string} courseData.title - Course title (required)
 * @param {string} courseData.org - Organization code (defaults to 'chalix')
 * @param {string} courseData.number - Course number (auto-generated if not provided)
 * @param {string} courseData.run - Course run (defaults to current year)
 * @param {string} courseData.short_description - Course description (optional)
 * @param {string} courseData.course_type - Course type (optional)
 * @param {number} courseData.template_program_id - Template program ID for topic conversion (optional)
 * @returns {Promise} Course creation response
 */
export const createCourse = (courseData) => post(
  urls.createCourse(),
  courseData,
);

/**
 * Get list of user's accessible courses
 * @returns {Promise} List of courses
 */
export const getCourseList = () => get(urls.listCourses());

/**
 * Get detailed information about a specific course
 * @param {string} courseKey - The course key (e.g., 'course-v1:org+number+run')
 * @returns {Promise} Course details
 */
export const getCourseDetail = (courseKey) => get(urls.courseDetail(courseKey));

/**
 * Update an existing course
 * @param {Object} updateData - Course update data
 * @param {string} updateData.course_key - Course key (required)
 * @param {string} updateData.title - New course title
 * @param {string} updateData.short_description - New course description
 * @param {string} updateData.start_date - Course start date (ISO string, optional)
 * @param {string} updateData.end_date - Course end date (ISO string, optional)
 * @returns {Promise} Updated course data
 */
export const updateCourse = (updateData) => post(
  urls.updateCourse(),
  updateData,
);

/**
 * Get list of available program templates
 * @param {boolean} forceFresh - Force fresh data by bypassing cache
 * @returns {Promise} List of programs that can be used as templates
 */
export const getProgramTemplates = (forceFresh = false) => {
  const url = urls.listPrograms();
  if (forceFresh) {
    // Add timestamp to bypass browser cache
    const cacheBuster = `_t=${Date.now()}`;
    const separator = url.includes('?') ? '&' : '?';
    return get(`${url}${separator}${cacheBuster}`);
  }
  return get(url);
};

/**
 * Get detailed information about a specific program template
 * @param {number} programId - Program ID
 * @param {boolean} forceFresh - Force fresh data by bypassing cache
 * @returns {Promise} Program details with topics
 */
export const getProgramDetail = (programId, forceFresh = false) => {
  const url = urls.programDetail(programId);
  if (forceFresh) {
    // Add timestamp to bypass browser cache
    const cacheBuster = `_t=${Date.now()}`;
    const separator = url.includes('?') ? '&' : '?';
    return get(`${url}${separator}${cacheBuster}`);
  }
  return get(url);
};

/**
 * Create a new program template
 * @param {Object} programData - Program creation data
 * @param {string} programData.title - Program title (required)
 * @param {string} programData.icon - Program icon (optional, defaults to 'seed-of-life')
 * @param {boolean} programData.update_topics - Whether topics can be updated (optional)
 * @param {Array<string|Object>} programData.topics - Array of topic titles or objects (optional)
 * @returns {Promise} Created program data
 */
export const createProgram = (programData) => post(
  urls.createProgram(),
  programData,
);

/**
 * Update an existing program template
 * @param {Object} updateData - Program update data (must include id)
 * @returns {Promise} Updated program data
 */
export const updateProgram = (updateData) => post(
  urls.updateProgram(),
  updateData,
);

export default {
  createCourse,
  getCourseList,
  getCourseDetail,
  updateCourse,
  getProgramTemplates,
  getProgramDetail,
  createProgram,
  updateProgram,
};
