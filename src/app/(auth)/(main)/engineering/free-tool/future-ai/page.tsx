/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { Metadata } from 'next';

import { getInnerPageData } from 'utils/api/common';
import { IPageParamsProps, Stream } from 'types';
import FutureAiComponents from 'ui-component/free-tool/future-ai-tool';
import { getFreeAiToolData } from 'utils/api/future-ai';

export const generateMetadata = async ({ params }: { params: IPageParamsProps }): Promise<Metadata> => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const PAGE_PARAM = 'future-ai';
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const metaDataResponse = await getInnerPageData(params.name, PAGE_PARAM, stream);
  return {
    title: metaDataResponse.meta.title,
    description: metaDataResponse.meta.description,
    keywords: metaDataResponse.meta.keywords
  };
};

const FutureAiPage = async ({ params }: { params: IPageParamsProps }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const data = await getFreeAiToolData({ params, domain });
  return (
    <Box>
      <Box className="containerWrapper">
        <FutureAiComponents comparedToolData={data.comparedToolData} />
      </Box>
    </Box>
  );
};

export default FutureAiPage;
