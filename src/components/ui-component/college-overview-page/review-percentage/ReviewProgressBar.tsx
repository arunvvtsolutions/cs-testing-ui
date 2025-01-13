import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// import { Ratetxt, ProgressBxWarp, LeftColText, RightColText } from "./styles";
import { Typography } from '@mui/material';

import reviewPercentageClasses from './reviewPercentageStyles.module.css';
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#0B6049' : '#0B6049'
  }
}));

interface ProgressValue {
  value: number;
  noStars: string;
}

const ReviewProgressBar: React.FC<ProgressValue> = ({ value, noStars }) => {
  return (
    <Box className={reviewPercentageClasses.progressBxWarp} data-test-id="rewing-percentage-progress-bar">
      <Box className={reviewPercentageClasses.leftColText}>
        <Typography mr={2} className={reviewPercentageClasses.ratetxt}>
          {'>'}
          {noStars} Star
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <BorderLinearProgress variant="determinate" value={value} />
      </Box>

      <Box className={reviewPercentageClasses.rightColText}>
        <Typography className={reviewPercentageClasses.ratetxt}>{value}%</Typography>
      </Box>
    </Box>
  );
};

export default ReviewProgressBar;
