/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import SubHeader from 'ui-component/subheader';
import AmenitiesComponent from 'ui-component/college-amenities-page';
import { getInnerPageData } from 'utils/api/common';
import { getAmenitiesData } from 'utils/api/amenities';
import { IPageParamsProps, Stream } from 'types';

export const generateMetadata = async ({ params }: { params: IPageParamsProps }): Promise<Metadata> => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const PAGE_PARAM = 'overview';
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const metaDataResponse = await getInnerPageData(params.name, PAGE_PARAM, stream);
  return {
    title: metaDataResponse.meta.title,
    description: metaDataResponse.meta.description,
    keywords: metaDataResponse.meta.keywords
  };
};

const AmenitiesPage = async ({ params }: { params: IPageParamsProps }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const data = await getAmenitiesData({ params, domain });
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
        <AmenitiesComponent data={data} />
      </Box>
    </Box>
  );
};

export default AmenitiesPage;
