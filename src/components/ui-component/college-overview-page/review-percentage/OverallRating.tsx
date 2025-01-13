import React from 'react';
// import { HintTxt, Num, TopBox, ReviewLeftCol } from "./styles";
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

import { ReviewTitles } from './constants';
import RatingStars from './RatingStars';
import reviewPercentageClasses from './reviewPercentageStyles.module.css';

interface overAllStarValue {
  overAllStarValue: number;
  verifiedReviews: number;
}

const OverallRating: React.FC<overAllStarValue> = ({ overAllStarValue, verifiedReviews }) => {
  return (
    <Box className={reviewPercentageClasses.reviewLeftCol} data-test-id="review-percentage-overall-rating">
      <Box className={reviewPercentageClasses.topBox}>
        <Typography className={reviewPercentageClasses.num}>{overAllStarValue}</Typography>
        <Typography className={reviewPercentageClasses.hintTxt}>{ReviewTitles.OVERALL_PLACEMENT_RATING}</Typography>
      </Box>
      <Box sx={{ marginBottom: '10px' }}>
        <RatingStars starsValue={overAllStarValue} />
      </Box>
      <Typography className={reviewPercentageClasses.hintTxt}>
        {ReviewTitles.BASED_ON} {verifiedReviews} {ReviewTitles.VERIFIED_REVIEWS}
      </Typography>
    </Box>
  );
};

export default OverallRating;
