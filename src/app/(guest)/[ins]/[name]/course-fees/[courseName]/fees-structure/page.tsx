/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { Metadata } from 'next';
// all course fee datas passed below
import { notFound } from 'next/navigation';

import SubHeader from 'ui-component/subheader';
import FeesStructureInnerComponent from 'ui-component/course-fees-inner-page/fees-structure';
import { IPageParamsProps, Stream } from 'types';
import { getInnerPageData } from 'utils/api/common';
import { getInnerFeeStructureData } from 'utils/api/course-fees-inner-page/fee-structure';

export interface IFeesStructureParamProps {
  ins: string;
  name: string;
  courseName: string;
}
export const generateMetadata = async ({ params }: { params: IPageParamsProps }): Promise<Metadata> => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const PAGE_PARAM = 'fees-structure';
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const metaDataResponse = await getInnerPageData(params.name, PAGE_PARAM, stream);
  return {
    title: metaDataResponse.meta.title,
    description: metaDataResponse.meta.description,
    keywords: metaDataResponse.meta.keywords
  };
};

const FeesStructureInnerPage = async ({ params }: { params: IFeesStructureParamProps }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';

  const data = await getInnerFeeStructureData({ params, domain });

  const isInvalidInstitution = params.ins !== 'college' && params.ins !== 'university';

  const hasNoBannerData =
    !data ||
    !data.bannerData ||
    !data.bannerData.bannerData ||
    (!data.bannerData.bannerData.name && !data.bannerData.hasError);

  if (isInvalidInstitution || hasNoBannerData) notFound();

  return (
    <Box>
      <SubHeader {...data.subMenu} />
      <Box className="containerWrapper">
        <FeesStructureInnerComponent data={data} />
      </Box>
    </Box>
  );
};

export default FeesStructureInnerPage;
