'use client';
import { FC } from 'react';
import { Grid, Box, useTheme, useMediaQuery } from '@mui/material';

import OtherCoursesSidebar, { IOtherCourseListProps } from '../courses-sidebar';
import CourseInfoSidebar from '../course-info-sidebar';

import InnerCourseDetails, { ICourseOverviewDetailsProps } from './course-details';

import MainBanner, { IBannerProps } from 'ui-component/college-overview-page/banner';
import { ISubMenuProps } from 'ui-component/subheader';
import CutoffClossingRank, {
  IClosingRankDataProps
} from 'ui-component/medical/course-fees-inner-page/overview/cutoff-clossingRank';
import { ISeatDataProps } from 'ui-component/medical/course-fees-inner-page/overview/cutoff-seatallocation';
import CourseIntake, { IIntakeProps } from 'ui-component/medical/course-fees-inner-page/overview/course-intake';
import { Stream } from 'types';
import AllotedSeatMatrix, { IAllotedSeatProps } from 'ui-component/free-tool/kyc-medical/alloted-seat-matrix';
import AdmittedSeatMatrix, { IAdmittedSeatProps } from 'ui-component/free-tool/kyc-medical/admitted-seat-matrix';
import AllocationBarChart from 'ui-component/free-tool/kyc-medical/seats-allocation-bar-chart';
import AdmittedBarChart, {
  IAllottedAdmitBarProps
} from 'ui-component/free-tool/kyc-medical/allotted-admitted-bar-chart';
// import kycStyles from 'ui-component/free-tool/kyc-medical/kycModal.module.css';
// import seatAllocationData from 'ui-component/free-tool/kyc-medical/seats-allocation-bar-chart/seatAllocationData.json';
// import CutoffClosingRank from 'ui-component/free-tool/kyc-medical/cutoff-closing-rank';
// import CutoffClosingRankData from 'ui-component/free-tool/kyc-medical/cutoff-closing-rank/ClosingRankMockupData.json';
export interface IOverviewInnerPageProps {
  data: {
    subMenu: ISubMenuProps;
    bannerData: IBannerProps;
    otherCourseData: IOtherCourseListProps;
    courseDetailsData: ICourseOverviewDetailsProps;
    seatAllocationData: ISeatDataProps;
    closingRankData: IClosingRankDataProps;
    courseIntake: IIntakeProps;
    courseAllotedSeatMat: IAllotedSeatProps;
    courseAdmittedSeat: IAllottedAdmitBarProps;
    courseAdmittedSeatMat: IAdmittedSeatProps;
  };
}

const OverviewInnerComponent: FC<IOverviewInnerPageProps> = ({ data }) => {
  const theme = useTheme();
  const matchDownlg = useMediaQuery(theme.breakpoints.down('lg'));

  const { courseDetailsData } = data.courseDetailsData;

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
            {courseDetailsData.length && courseDetailsData?.[0].stream?.includes(Stream.MEDICAL) ? (
              <CourseIntake {...data.courseIntake} />
            ) : (
              <></>
            )}
            <InnerCourseDetails {...data.courseDetailsData} />

            {window.location.host.includes(Stream.MEDICAL) && (
              <>
                <Grid container spacing={2}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <CutoffClossingRank {...data.closingRankData} />
                  </Grid>
                  {/* <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    <SeatAllocation {...data.seatAllocationData} />
                  </Grid> */}
                </Grid>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <AllotedSeatMatrix {...data.courseAllotedSeatMat} courseOverviewPage />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AllocationBarChart
                        seatAllocationData={data.seatAllocationData.seatAllocationData.seatAllocationData}
                        year={data.seatAllocationData.seatAllocationData.year}
                        courseOverviewPage
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <AdmittedSeatMatrix {...data.courseAdmittedSeatMat} courseOverviewPage />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AdmittedBarChart {...data.courseAdmittedSeat} courseOverviewPage />
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}

            {/* medical inner pages components below */}

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
            <CourseInfoSidebar {...data.subMenu} />
            <OtherCoursesSidebar {...data.otherCourseData} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default OverviewInnerComponent;
