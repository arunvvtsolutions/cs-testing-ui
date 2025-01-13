/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';

import Page from 'components/ui-component/Page';
import { ContainerWrapper } from 'ui-component/home/banner-page/styles';
import Layout from 'layout';
// all course fee datas passed below
import SubHeader from 'ui-component/subheader';
import OverviewInnerComponent, { IOverviewInnerPageProps } from 'ui-component/course-fees-inner-page/overview';
import { getBannerData, getOtherCourseData, getSubMenuData } from 'utils/api/common';
import {
  getClosingRankOverviewData,
  getCourseIntakeOverviewData,
  getInnerCourseOverviewData,
  getSeatAllocationOverviewData
} from 'utils/api/course-fees-inner-page/overview';
import { Stream } from 'types';

const OverviewInnerPage = ({ data }: IOverviewInnerPageProps) => {
  return (
    <>
      <Page title="">
        <Box>
          <SubHeader {...data.subMenu} />
          <ContainerWrapper>
            <OverviewInnerComponent data={data} />
          </ContainerWrapper>
        </Box>
      </Page>
    </>
  );
};

OverviewInnerPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

//API Intergration for serverside redering
export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { name, courseName } = params;

  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const otherCourseDataResponse = await getOtherCourseData(name, courseName, stream);
  const innerOverviewDataResponse = await getInnerCourseOverviewData(name, courseName, stream);
  const seatAllocationResponse = await getSeatAllocationOverviewData(name, courseName, stream);
  const closingRankResponse = await getClosingRankOverviewData(name, courseName, stream);
  const courseIntakeResponse = await getCourseIntakeOverviewData(name, courseName, stream);

  const data: unknown = {
    subMenu: subMenuDataResponse,
    bannerData: bannerDataResponse,
    otherCourseData: otherCourseDataResponse,
    courseDetailsData: innerOverviewDataResponse,
    seatAllocationData: seatAllocationResponse,
    closingRankData: closingRankResponse,
    courseIntake: courseIntakeResponse
  };
  return {
    props: {
      data
    }
  };
};

export default OverviewInnerPage;
