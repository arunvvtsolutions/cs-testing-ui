/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import Layout from 'layout';
import { ICourseFeesProps } from 'ui-component/course-fees-page';
import { getFaqData, getBannerData, getInnerPageData, getSubMenuData } from 'utils/api/common';
import { getCollegeOverview, getCollegeCourseFilterCourseList, getCollegeCourseList } from 'utils/api/course-fees';
import { Stream } from 'types';

const CourseAndFeesPage = ({ data }: ICourseFeesProps) => {
  return (
    <>
      {/* <Page
        title={data.metaData.meta.title}
        meta={
          <>
            <meta name="description" content={data.metaData.meta.description} />
            <meta name="keywords" content={data.metaData.meta.keywords} />
          </>
        }
      >
        <Box>
          <SubHeader {...data.subMenu} />
          <ContainerWrapper>
            <CourseAndFeeComponent data={data} />
          </ContainerWrapper>
        </Box>
      </Page> */}
    </>
  );
};

CourseAndFeesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

//API Intergration for serverside redering
export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { ins, name } = params;
  const pageName = 'course-fees';
  const degreeShort = 2;
  const PAGE_PARAM = 'course-fees';

  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const faqDataResponse = await getFaqData(name, pageName, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const courseOverviewResponse = await getCollegeOverview(name, stream);
  const filterResponse = await getCollegeCourseFilterCourseList(name, degreeShort, stream);
  const courseListResponse = await getCollegeCourseList(name, stream);
  const metaDataResponse = await getInnerPageData(name, PAGE_PARAM, stream);

  //Protect Routes
  if (
    (ins !== 'college' && ins !== 'university') ||
    (!bannerDataResponse.bannerData.name && !bannerDataResponse.hasError)
  ) {
    return {
      notFound: true
    };
  }

  const data: unknown = {
    subMenu: subMenuDataResponse,
    faqData: faqDataResponse,
    bannerData: bannerDataResponse,
    contentData: courseOverviewResponse,
    courseFilterData: filterResponse,
    courseListData: courseListResponse,
    metaData: metaDataResponse
  };
  return {
    props: {
      data
    }
  };
};

export default CourseAndFeesPage;
