'use client';
import { FC } from 'react';
import { Grid, Box, useTheme, useMediaQuery } from '@mui/material';

import OtherCoursesSidebar, { IOtherCourseListProps } from '../courses-sidebar';
import CourseInfoSidebar from '../course-info-sidebar';

import CourseDetails, { ICourseDetailsProps } from './course-details';

import MainBanner, { IBannerProps } from 'ui-component/college-overview-page/banner';
import { ISubMenuProps } from 'ui-component/subheader';

export interface IFeesStructureInnerProps {
  // data: IBannerProps & ICourseDetailsProps & IOtherCourseListProps;
  data: {
    bannerData: IBannerProps;
    courseInfoData: ICourseDetailsProps;
    otherCourseList: IOtherCourseListProps;
    subMenu: ISubMenuProps;
  };
}

const FeesStructureInnerComponent: FC<IFeesStructureInnerProps> = ({ data }) => {
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
            <CourseDetails {...data.courseInfoData} />
            {matchDownlg && <CourseInfoSidebar {...data.subMenu} />}
            {matchDownlg && <OtherCoursesSidebar {...data.otherCourseList} />}
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
            <CourseInfoSidebar {...data.subMenu} />
            <OtherCoursesSidebar {...data.otherCourseList} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default FeesStructureInnerComponent;
