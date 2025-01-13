/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
// material-ui
import { Box } from '@mui/material';

// project imports
import SubHeader from 'ui-component/subheader';
// student review component mockupdate passed from below
import OverViewComponent from 'ui-component/college-overview-page';
import { getInnerPageData } from 'utils/api/common';
import { getOverviewData } from 'utils/api/overview';
import { IPageParamsProps, Stream } from 'types';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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

const OverViewPage = async ({ params }: { params: IPageParamsProps }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';

  const data = await getOverviewData({ params, domain });

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
        <OverViewComponent data={data} />
      </Box>
    </Box>
  );
};

export default OverViewPage;
