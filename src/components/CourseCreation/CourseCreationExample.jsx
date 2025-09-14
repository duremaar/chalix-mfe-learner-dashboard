import React, { useState } from 'react';
import { Button } from '@openedx/paragon';
import { CourseCreationModal } from './index';

/**
 * Example usage component for CourseCreationModal
 * This demonstrates the proper way to use the modal component
 */
const CourseCreationExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCourseCreated = (courseData) => {
    console.log('Course created:', courseData);
    // Handle successful course creation
    // You can redirect to the course or show a success message
  };

  return (
    <div>
      {/* Button to trigger modal */}
      <Button
        variant="primary"
        onClick={handleOpenModal}
        className="mb-3"
      >
        Create New Course
      </Button>

      {/* Course Creation Modal */}
      <CourseCreationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCourseCreated={handleCourseCreated}
      />

      {/* Your other content here */}
      <div>
        <p>Click the button above to open the course creation modal.</p>
        <p>The modal will appear as an overlay on top of this content.</p>
      </div>
    </div>
  );
};

export default CourseCreationExample;