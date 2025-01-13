/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CourseAndFeeComponent from 'ui-component/course-fees-page';
import SubHeader from 'ui-component/subheader';
import { getInnerPageData } from 'utils/api/common';
import { IPageParamsProps, Stream } from 'types';
import { getCourseFeesData } from 'utils/api/course-fees';

export const generateMetadata = async ({ params }: { params: IPageParamsProps }): Promise<Metadata> => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const PAGE_PARAM = 'course-fees';
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const metaDataResponse = await getInnerPageData(params.name, PAGE_PARAM, stream);
  return {
    title: metaDataResponse.meta.title,
    description: metaDataResponse.meta.description,
    keywords: metaDataResponse.meta.keywords
  };
};

const CourseAndFeesPage = async ({ params }: { params: IPageParamsProps }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const data = await getCourseFeesData({ params, domain });

  const isInvalidInstitution = params.ins !== 'college' && params.ins !== 'university';

  const hasNoBannerData =
    !data ||
    !data.bannerData ||
    !data.bannerData.bannerData ||
    (!data.bannerData.bannerData.name && !data.bannerData.hasError);

  if (isInvalidInstitution || hasNoBannerData) notFound();
  return (
    <>
      <Box>
        <SubHeader {...data.subMenu} />
        <Box className="containerWrapper">
          <CourseAndFeeComponent data={data} />
        </Box>
      </Box>
    </>
  );
};

export default CourseAndFeesPage;
