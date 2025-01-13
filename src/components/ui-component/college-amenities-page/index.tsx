'use client';
import React from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';

import CampusOverview, { ICampusProps } from './campus-overview';
import FacilitiesList, { IFacilityProps } from './facilities-list';
import AmenitiesDescription, { IDescDataProps } from './amenities-description';
import AmenitiesFaq from './amenities-faq';

import MainBanner, { IBannerProps } from 'ui-component/college-overview-page/banner';
import OtherColleges, { IOtherCollegeProps } from 'ui-component/college-overview-page/overview-sidebar';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { ISubMenuProps } from 'ui-component/subheader';

export interface IAmenitiesPageProps {
  data: {
    faqData: IFAQsProps;
    bannerData: IBannerProps;
    campusData: ICampusProps;
    facilitiesData: IFacilityProps;
    descData: IDescDataProps;
    otherCollegeData: IOtherCollegeProps;
    subMenu: ISubMenuProps;
  };
}

const AmenitiesComponent: React.FC<IAmenitiesPageProps> = ({ data }) => {
  const theme = useTheme();
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
            <CampusOverview {...data.campusData} />
            <FacilitiesList {...data.facilitiesData} />
            <AmenitiesDescription {...data.descData} />
            <AmenitiesFaq {...data.faqData} />
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

export default AmenitiesComponent;
