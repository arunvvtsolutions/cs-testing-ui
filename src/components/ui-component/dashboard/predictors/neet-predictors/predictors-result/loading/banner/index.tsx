import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

import styles from '../../style.module.css';

const BannerLoading = () => {
  return (
    <Box className={styles.bannerWrapper} sx={{ maxWidth: '810px', margin: '0px', width: '100%' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="start">
        <Grid item xs={12} lg={8}>
          <Skeleton height={80} />
          <Skeleton />
        </Grid>
        <Grid item xs={12} lg={4} display="flex" justifyContent="start" alignItems="flex-start">
          <Skeleton width={222} height={222} sx={{ marginTop: '-30px' }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BannerLoading;
