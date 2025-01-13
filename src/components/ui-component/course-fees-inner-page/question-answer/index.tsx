'use client';
import { FC } from 'react';
import { Grid, Box, useTheme, useMediaQuery } from '@mui/material';

import CourseDetailsDesktop from '../course-info-sidebar/CourseDetails';
import OtherCoursesSidebar, { IOtherCourseListProps } from '../courses-sidebar';
import CourseInfoSidebar from '../course-info-sidebar';

import InnerQuestionReplay from './question-replay';

import MainBanner, { IBannerProps } from 'ui-component/college-overview-page/banner';
import { IQuestionProps } from 'ui-component/college-question-page/question-replay-accordion';
import { ISubMenuProps } from 'ui-component/subheader';

export interface IQAndAInnerProps {
  data: {
    subMenu: ISubMenuProps;
    bannerData: IBannerProps;
    otherCourseData: IOtherCourseListProps;
    // replayData: IQuestionProps;
    profileData: IQuestionProps;
  };
}

const QuestionAnswerInnerComponent: FC<IQAndAInnerProps> = ({ data }) => {
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
            <InnerQuestionReplay {...data.profileData} />

            {matchDownlg && <CourseInfoSidebar {...data.subMenu} />}
            {matchDownlg && <OtherCoursesSidebar {...data.otherCourseData} />}
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
            <CourseDetailsDesktop {...data.subMenu} />
            <OtherCoursesSidebar {...data.otherCourseData} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default QuestionAnswerInnerComponent;
