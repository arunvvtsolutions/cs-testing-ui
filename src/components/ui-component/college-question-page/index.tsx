'use client';
import { FC } from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';

import QuestionReplay from './question-replay';

import OtherColleges, { IOtherCollegeProps } from 'ui-component/college-overview-page/overview-sidebar';
import MainBanner, { IBannerProps } from 'ui-component/college-overview-page/banner';
import { IQuestionProps } from 'ui-component/college-question-page/question-replay-accordion';
import { ISubMenuProps } from 'ui-component/subheader';

export interface IQuestionDataProps {
  data: {
    bannerData: IBannerProps;
    otherCollegeData: IOtherCollegeProps;
    // replayData: IQuestionProps;
    profileData: IQuestionProps;
    subMenu: ISubMenuProps;
  };
}

export interface IQuestion {
  question: string;
  collegeUrl?: string | string[];
  studentId: number;
}

const QuestionComponents: FC<IQuestionDataProps> = ({ data }) => {
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
            <QuestionReplay {...data.profileData} />
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

export default QuestionComponents;
