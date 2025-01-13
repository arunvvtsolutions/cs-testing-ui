import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';

import NeetPredictorForm from './NeetPredictorForm';
import styles from './form.module.css';
import { NeetPredictorFormContent } from './constant';

import { INeetPredictorFormProps } from '.';
const NeetPredictorBanner: React.FC<INeetPredictorFormProps> = ({ stateList, indiaCategoryList }) => {
  return (
    <Box>
      <Grid container className={styles.BannerWrapper}>
        <Grid item xs={12} lg={9}>
          <Box className={styles.headingWrapper}>
            <Typography className={styles.bannerHeading}>{NeetPredictorFormContent.HEADING}</Typography>
          </Box>
          <ul>
            <li className={styles.bannerList}>{NeetPredictorFormContent.LIST_ONE}</li>
            <li className={styles.bannerList}>{NeetPredictorFormContent.LIST_TWO}</li>
          </ul>
        </Grid>
        <Grid item xs={12} lg={3} className={styles.imageWrapper}>
          <Image
            src={'/assets/images/neet-predictor/banner_illustration.webp'}
            alt="neetPredictor"
            width={184}
            height={184}
          />
        </Grid>
      </Grid>
      <Box className={styles.formWrapper}>
        <NeetPredictorForm stateList={stateList} indiaCategoryList={indiaCategoryList} />
      </Box>
    </Box>
  );
};

export default NeetPredictorBanner;
