'use client';
import React from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';

import ReviewSection from './review-section';
import ReviewFaq from './review-faq';

import MainBanner from 'ui-component/college-overview-page/banner';
import OtherColleges from 'ui-component/college-overview-page/overview-sidebar';
import { IBannerProps } from 'ui-component/college-overview-page/banner';
import { IOtherCollegeProps } from 'ui-component/college-overview-page/overview-sidebar';
import ReviewPercentage, { IReviewDataProps } from 'ui-component/college-overview-page/review-percentage';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { ICollegeReviewsDataProps } from 'ui-component/college-overview-page/students-reviews';
import { ISubMenuProps } from 'ui-component/subheader';
export interface ICollegeReviewPage {
  data: {
    faqData: IFAQsProps;
    bannerData: IBannerProps;
    reviewData: IReviewDataProps;
    otherCollegeData: IOtherCollegeProps;
    collegeReviews: ICollegeReviewsDataProps;
    subMenu: ISubMenuProps;
  };
}
const ReviewComponents: React.FC<ICollegeReviewPage> = ({ data }) => {
  const theme = useTheme();
  // const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownlg = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <div>
      <MainBanner {...data.bannerData} />
      <Grid container spacing={2}>
        <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
          <Box
            sx={{
              paddingRight: {
                xl: '30px',
                lg: '0px',
                md: '0px',
                sm: '0px',
                xs: '0px'
              }
            }}
          >
            <ReviewPercentage {...data.reviewData} />
            {/* commet here for while */}
            <ReviewSection {...data.collegeReviews} />

            <ReviewFaq {...data.faqData} />

            {matchDownlg && <OtherColleges {...data.otherCollegeData} />}
          </Box>
        </Grid>
        <Grid
          item
          xl={4}
          lg={4}
          md={12}
          sx={{
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }
          }}
        >
          <Box className="stickySidebar">
            <OtherColleges {...data.otherCollegeData} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReviewComponents;
