/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SubHeader from 'ui-component/subheader';
// student placement component mockupdate passed from below
import PictureComponent from 'ui-component/college-pictures-page';
import { getInnerPageData } from 'utils/api/common';
import { Stream } from 'types';
import { getPicturePageData } from 'utils/api/picture';
interface IPictureParams {
  name: string;
  ins: string;
}

export const generateMetadata = async ({ params }: { params: IPictureParams }): Promise<Metadata> => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const PAGE_PARAM = 'pictures';
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const metaDataResponse = await getInnerPageData(params.name, PAGE_PARAM, stream);
  return {
    title: metaDataResponse.meta.title,
    description: metaDataResponse.meta.description,
    keywords: metaDataResponse.meta.keywords
  };
};

const PicturePage = async ({ params }: { params: IPictureParams }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';

  const data = await getPicturePageData({ params, domain });

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
        <PictureComponent data={data} />
      </Box>
    </Box>
  );
};

export default PicturePage;
