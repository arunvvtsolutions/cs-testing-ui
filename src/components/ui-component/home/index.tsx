'use client';
import React, { FC } from 'react';
import { Grid } from '@mui/material';
import dynamic from 'next/dynamic';

import BannerLayout from './banner-page';
// const BannerLayout = dynamic(() => import('./banner-page'));
const ExploreByStream = dynamic(() => import('./explore-by-stream'));
const RankingsAndExams = dynamic(() => import('./rankings-and-exams'));
const WatchOut = dynamic(() => import('./watch-out'));
const ExploreCareer = dynamic(() => import('./explore-career/ExploreCareers'));
// import Blogs from './Blogs';
import { SearchCollegeData } from './banner-page/Searchbar';

import { IErrorProps } from 'types';

export interface ISearchDataProps extends IErrorProps {
  searchData: SearchCollegeData[];
}

const LandingPage: FC<ISearchDataProps> = ({ searchData }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <BannerLayout searchData={searchData} />
      </Grid>
      <Grid item xs={12}>
        <ExploreByStream />
      </Grid>
      <Grid item xs={12}>
        <ExploreCareer />
      </Grid>
      <Grid item xs={12}>
        <RankingsAndExams />
      </Grid>
      <Grid item xs={12}>
        <WatchOut />
      </Grid>
      {/* blog section hidden cause of mockup datas */}
      {/* <Grid item xs={12}>
        <Blogs />
      </Grid> */}
      {/* blog section hidden cause of mockup datas */}
    </Grid>
  );
};

export default LandingPage;
