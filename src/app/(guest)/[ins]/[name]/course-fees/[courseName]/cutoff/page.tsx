/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box } from '@mui/material';
import { Metadata } from 'next';
// all course fee datas passed below
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import SubHeader from 'ui-component/subheader';
import CutoffInnerComponent from 'ui-component/course-fees-inner-page/cutoff';
import { IPageParamsProps, Stream } from 'types';
import { getInnerPageData } from 'utils/api/common';
import { getCutOffInnerData } from 'utils/api/course-fees-inner-page/course-fees-cutoff';

export interface IInnerCutOffParamProps {
  ins: string;
  name: string;
  courseName: string;
}
export const generateMetadata = async ({ params }: { params: IPageParamsProps }): Promise<Metadata> => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const PAGE_PARAM = 'cutoff';
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const metaDataResponse = await getInnerPageData(params.name, PAGE_PARAM, stream);
  return {
    title: metaDataResponse.meta.title,
    description: metaDataResponse.meta.description,
    keywords: metaDataResponse.meta.keywords
  };
};
const CutoffInnerPage = async ({ params }: { params: IInnerCutOffParamProps }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const data = await getCutOffInnerData({ params, domain });
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
        <CutoffInnerComponent data={data} />
      </Box>
    </Box>
  );
};

export default CutoffInnerPage;
