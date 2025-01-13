/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import SubHeader from 'ui-component/subheader';
// student placement component mockupdate passed from below
import CutoffComponent from 'ui-component/college-cutoff-page';
import { getInnerPageData } from 'utils/api/common';
import { IPageParamsProps, Stream } from 'types';
import { getCutOffData } from 'utils/api/cutoff';

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

const CutOffPage = async ({ params }: { params: IPageParamsProps }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const data = await getCutOffData({ params, domain });
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
        <CutoffComponent data={data} />
      </Box>
    </Box>
  );
};

export default CutOffPage;
