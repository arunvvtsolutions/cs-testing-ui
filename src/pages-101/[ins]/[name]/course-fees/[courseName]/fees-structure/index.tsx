/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';

import Page from 'components/ui-component/Page';
import { ContainerWrapper } from 'ui-component/home/banner-page/styles';
import Layout from 'layout';
// all course fee datas passed below
import SubHeader from 'ui-component/subheader';
import FeesStructureInnerComponent, {
  IFeesStructureInnerProps
} from 'ui-component/course-fees-inner-page/fees-structure';
import { getCourseFeeStructureData } from 'utils/api/course-fees-inner-page/fee-structure';
import { getBannerData, getOtherCourseData, getSubMenuData } from 'utils/api/common';
import { Stream } from 'types';

const FeesStructureInnerPage = ({ data }: IFeesStructureInnerProps) => {
  return (
    <>
      <Page title="">
        <Box>
          <SubHeader {...data.subMenu} />
          <ContainerWrapper>
            <FeesStructureInnerComponent data={data} />
          </ContainerWrapper>
        </Box>
      </Page>
    </>
  );
};

FeesStructureInnerPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
//API Intergration for serverside redering
export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { name, courseName } = params;

  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const feesDataResponse = await getCourseFeeStructureData(name, courseName, stream);
  const otherCourseDataResponse = await getOtherCourseData(name, courseName, stream);

  const data: unknown = {
    subMenu: subMenuDataResponse,
    bannerData: bannerDataResponse,
    courseInfoData: feesDataResponse,
    otherCourseList: otherCourseDataResponse
  };
  return {
    props: {
      data
    }
  };
};

export default FeesStructureInnerPage;
