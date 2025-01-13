'use client';
import { FC } from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';

import PlacementOverview from './overview-content';
import PlacementFaq from './placement-faq';
import { IContentProps } from './overview-content/ContentSection';
import TopRecruiters from './top-recruiters';
import { ICompaniesProps } from './top-recruiters/RecruiterItem';
import PercentageComparison, { IGraduartionContentProps } from './graduation-graph';
import PercentageYearGraph, { IPercentContentProps } from './percentage-year-graph';
import MedianSalarySection, { ISalaryContentProps } from './median-salary-section';
import YoutubeShorts, { IYoutubeProps } from './youtube-shorts';

import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import MainBanner, { IBannerProps } from 'ui-component/college-overview-page/banner';
import OtherColleges, { IOtherCollegeProps } from 'ui-component/college-overview-page/overview-sidebar';
import { ISubMenuProps } from 'ui-component/subheader';

export interface IPlacementPageProps {
  data: {
    faqData: IFAQsProps;
    bannerData: IBannerProps;
    otherCollegeData: IOtherCollegeProps;
    contentData: IContentProps;
    topCompaniesData: ICompaniesProps;
    graduationData: IGraduartionContentProps;
    percentData: IPercentContentProps;
    salaryData: ISalaryContentProps;
    youtubeData: IYoutubeProps;
    subMenu: ISubMenuProps;
  };
}

const PlacementComponent: FC<IPlacementPageProps> = ({ data }) => {
  const theme = useTheme();
  const matchDownlg = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <>
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
            <PlacementOverview {...data.contentData} />
            <YoutubeShorts {...data.youtubeData} />
            <PercentageComparison {...data.graduationData} />
            <PercentageYearGraph {...data.percentData} />
            <MedianSalarySection {...data.salaryData} />
            <TopRecruiters {...data.topCompaniesData} />
            <PlacementFaq {...data.faqData} />
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
    </>
  );
};

export default PlacementComponent;
