'use client';
import { FC } from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';

import OverviewSection from './overview-section';
import ApprovedIntakeChart, { IApprovedIntakeProps } from './approved-intake';
import StudentStrengthFaq from './student-strength-faq';
import CategoryWiseChart, { ICategoriesProps } from './students-categorywise-section';
import TotalStrengthChart, { StrengthDataProps } from './total-students-section';
import DiversityInclusionChart, { IDiversityDataProps } from './diversity-inclusion';

import MainBanner, { IBannerProps } from 'ui-component/college-overview-page/banner';
import { IContentProps } from 'ui-component/college-placements-page/overview-content/ContentSection';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import OtherColleges, { IOtherCollegeProps } from 'ui-component/college-overview-page/overview-sidebar';
import { ISubMenuProps } from 'ui-component/subheader';

export interface IStudentStrengthProps {
  data: {
    contentData: IContentProps;
    faqData: IFAQsProps;
    categoryData: ICategoriesProps;
    approvedIntakeData: IApprovedIntakeProps;
    strengthData: StrengthDataProps;
    diversityData: IDiversityDataProps;
    bannerData: IBannerProps;
    otherCollegeData: IOtherCollegeProps;
    subMenu: ISubMenuProps;
  };
}

const StudentStrengthComponent: FC<IStudentStrengthProps> = ({ data }) => {
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
            <OverviewSection {...data.contentData} />
            <CategoryWiseChart {...data.categoryData} />
            <ApprovedIntakeChart {...data.approvedIntakeData} />
            <TotalStrengthChart {...data.strengthData} />
            <DiversityInclusionChart {...data.diversityData} />
            <StudentStrengthFaq {...data.faqData} />
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

export default StudentStrengthComponent;
