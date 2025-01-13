import React from 'react';

import InnerCourseDetails from 'ui-component/course-fees-inner-page/overview/course-details';

export interface ICourseProps {
  courseName?: string;
  year?: string;
  duration?: string;
  totalFees?: string;
  intake?: string;
  level?: string;
  startedYear?: number;
  stream: string;
}
export interface ICourseDetailsProps {
  courseDetails: ICourseProps[];
}

const CourseDetails: React.FC<ICourseDetailsProps> = ({ courseDetails }) => {
  return <InnerCourseDetails courseDetailsData={courseDetails} />;
};

export default CourseDetails;
