import React from 'react';

import StudentReviews, { ICollegeReviewsDataProps } from 'ui-component/college-overview-page/students-reviews';
import ErrorComponent from 'ui-component/error';

const ReviewSection: React.FC<ICollegeReviewsDataProps> = ({ collegeReviews, hasError }) => {
  return <>{hasError ? <ErrorComponent /> : <StudentReviews collegeReviews={collegeReviews} />}</>;
};
export default ReviewSection;
