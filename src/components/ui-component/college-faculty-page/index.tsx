'use client';
import { FC } from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';

import FacultyDetails, { IFacultyDataProps } from './faculty-details';
import ProfessorsList, { IProfessorProps } from './professors-list';
import FacultyFaq from './collge-faculty-faq';

import OtherColleges, { IOtherCollegeProps } from 'ui-component/college-overview-page/overview-sidebar';
import MainBanner, { IBannerProps } from 'ui-component/college-overview-page/banner';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
// import { IMetaProps } from 'types';
import { ISubMenuProps } from 'ui-component/subheader';

export interface IFacultyProps {
  data: {
    bannerData: IBannerProps;
    facultyData: IFacultyDataProps;
    listData: IProfessorProps;
    faqData: IFAQsProps;
    otherCollegeData: IOtherCollegeProps;
    subMenu: ISubMenuProps;
  };
}

const FacultyComponent: FC<IFacultyProps> = ({ data }) => {
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
            <FacultyDetails {...data.facultyData} />
            <ProfessorsList {...data.listData} />
            <FacultyFaq {...data.faqData} />
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

export default FacultyComponent;
