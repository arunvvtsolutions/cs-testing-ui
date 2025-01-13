import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

import styles from './predictorbanner.module.css';

interface NeetPredictorBannerCardProps {
  children: ReactNode;
  width: string;
  margin: string;
}
const NeetPredictorBannerCard: React.FC<NeetPredictorBannerCardProps> = ({ children, width, margin }) => {
  return (
    <Box className={styles.bannerWrapper} sx={{ maxWidth: width, margin: margin }}>
      {children}
    </Box>
  );
};

export default NeetPredictorBannerCard;
