import React from 'react';
import PropTypes from 'prop-types';

import { Pagination } from '@openedx/paragon';
import {
  ActiveCourseFilters,
} from 'containers/CourseFilterControls';
import ChalixCourseCard from 'containers/CourseCard/components/ChalixCourseCard';

import { useIsCollapsed } from './hooks';
import './ChalixCourseList.scss';

export const ChalixCourseList = ({ courseListData }) => {
  const {
    filterOptions, setPageNumber, numPages, showFilters, visibleList,
  } = courseListData;
  const isCollapsed = useIsCollapsed();
  
  return (
    <>
      {showFilters && (
        <div id="course-list-active-filters-container">
          <ActiveCourseFilters {...filterOptions} />
        </div>
      )}
      <div className="chalix-course-list-container">
        <div className="chalix-course-grid">
          {visibleList.map(({ cardId }) => (
            <ChalixCourseCard key={cardId} cardId={cardId} />
          ))}
        </div>
        {numPages > 1 && (
          <Pagination
            variant={isCollapsed ? 'reduced' : 'secondary'}
            paginationLabel="Course List"
            className="mx-auto mb-2"
            pageCount={numPages}
            onPageSelect={setPageNumber}
          />
        )}
      </div>
    </>
  );
};

export const courseListDataShape = PropTypes.shape({
  showFilters: PropTypes.bool.isRequired,
  visibleList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  filterOptions: PropTypes.shape().isRequired,
  numPages: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
});

ChalixCourseList.propTypes = {
  courseListData: courseListDataShape,
};

export default ChalixCourseList;
