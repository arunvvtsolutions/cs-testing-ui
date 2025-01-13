'use client';
import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dynamic from 'next/dynamic';

import { HerominiTxt } from '../banner-page/styles';

import { ExploreSection, ContainerWrapper } from './styles';
const TopCollege = dynamic(() => import('./TopCollege'));
const TopCourses = dynamic(() => import('./TopCourses'));
const TopPlaces = dynamic(() => import('./TopPlaces'));
import { ExploerPage } from './constant';

const ExploreCarrier: React.FC = () => {
  return (
    <ExploreSection>
      <ContainerWrapper>
        <Box sx={{ marginBottom: { xs: '20px', sm: '30px', md: '40px' } }}>
          <Typography variant="h2" className="h2_tag">
            {ExploerPage.EXPLORE_TITLE}
          </Typography>
          <HerominiTxt style={{ maxWidth: '500px' }}>{ExploerPage.EXPLORE_DESC}</HerominiTxt>
        </Box>
      </ContainerWrapper>

      <ContainerWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <TopCollege />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <TopPlaces />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <TopCourses />
          </Grid>
        </Grid>
      </ContainerWrapper>
    </ExploreSection>
  );
};
export default ExploreCarrier;
