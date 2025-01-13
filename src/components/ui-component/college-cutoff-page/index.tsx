/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { FC, useState } from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';

import CutoffFaq from './cutoff-faq';
import CutoffOverview from './overview-section';
import CutOffForm, { ICutOffFormProps } from './cutoff-form';
import CutoffResultSection from './cutoff-results';

import OtherColleges, { IOtherCollegeProps } from 'ui-component/college-overview-page/overview-sidebar';
import MainBanner, { IBannerProps } from 'ui-component/college-overview-page/banner';
import { IExamsAndCutoffsProps } from 'ui-component/college-overview-page/exams-and-cutoffs';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { IContentProps } from 'ui-component/college-placements-page/overview-content/ContentSection';
import { ISubMenuProps } from 'ui-component/subheader';
export interface ICutoffPageProps {
  data: {
    faqData: IFAQsProps;
    bannerData: IBannerProps;
    otherCollegeData: IOtherCollegeProps;
    examData: IExamsAndCutoffsProps;
    contentData: IContentProps;
    cutoffFormData: ICutOffFormProps;
    subMenu: ISubMenuProps;
  };
}
const CutoffComponent: FC<ICutoffPageProps> = ({ data }) => {
  const theme = useTheme();
  const matchDownlg = useMediaQuery(theme.breakpoints.down('lg'));
  const [cutoffResultsData, setCutoffResultsData] = useState<any>(undefined);
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
            <CutoffOverview {...data.contentData} />
            <CutOffForm {...data.cutoffFormData} setResultsData={setCutoffResultsData} />
            {cutoffResultsData && <CutoffResultSection cutoffResultsData={cutoffResultsData} />}
            {/* need to enable once the url is ready */}
            {/* <ExamsAndCutoffs {...data.examData} /> */}
            <CutoffFaq {...data.faqData} />
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
export default CutoffComponent;
