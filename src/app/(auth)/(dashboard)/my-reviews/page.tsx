import { Box } from '@mui/material';
import React from 'react';

import ReviewsPage from 'ui-component/dashboard/review-page';

const MyReviews = () => {
  return (
    <Box className="dashBoard_Container">
      <ReviewsPage />
    </Box>
  );
};

export default MyReviews;
