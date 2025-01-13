/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { Metadata } from 'next';

import { getInnerPageData } from 'utils/api/common';
import { IPageParamsProps, Stream } from 'types';
// import { getFreeAiToolData } from 'utils/api/future-ai';
import CollegeCompareTool from 'ui-component/free-tool/college-compare-tool';
import { getCollegeCompareListData } from 'utils/api/college-compare-list';

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

const CollegeComparePage = async () => {
  const data = await getCollegeCompareListData();
  return (
    <Box>
      <Box className="containerWrapper">
        <CollegeCompareTool comparedToolData={data.comparedToolData} />
      </Box>
    </Box>
  );
};

export default CollegeComparePage;
