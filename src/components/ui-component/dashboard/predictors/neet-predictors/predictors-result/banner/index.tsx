import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React, { FC } from 'react';

import styles from './banner.module.css';
import { ResultBannerContent } from './constant';

import NeetPredictorBannerCard from 'ui-component/common/neet-predictor-banner';

interface IBannerDataProps {
  neetRank: number;
}
const ResultBanner: FC<IBannerDataProps> = ({ neetRank }) => {
  return (
    <NeetPredictorBannerCard margin="0px" width="694px">
      <Grid container>
        <Grid item xs={12} lg={8} className={styles.headingWrapper}>
          <Typography className={styles.heading}>
            {ResultBannerContent.TITLE}
            {neetRank}
            {ResultBannerContent.NEET_RANK}
          </Typography>
          <Typography className={styles.description}>
            {ResultBannerContent.DECS_ONE}
            {neetRank}
            {ResultBannerContent.DECS_TWO}
            <span className={styles.rank}>{ResultBannerContent.OVERALL_RANK}</span>
          </Typography>
        </Grid>
        <Grid item xs={12} lg={4} className={styles.imageWrapper}>
          <Image
            src={'/assets/images/Students-discussion-together.webp'}
            alt="students-discussion"
            width={222}
            height={222}
          />
        </Grid>
      </Grid>
    </NeetPredictorBannerCard>
  );
};

export default ResultBanner;
