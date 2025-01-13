/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import SubHeader from 'ui-component/subheader';
// student placement component mockupdate passed from below
import QuestionComponents from 'ui-component/college-question-page';
import { getQuestionData } from 'utils/api/questions';
import { getInnerPageData } from 'utils/api/common';
import { Stream } from 'types';
interface IQuestionParams {
  name: string;
  ins: string;
}
export const generateMetadata = async ({ params }: { params: IQuestionParams }): Promise<Metadata> => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const PAGE_PARAM = 'questions';
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const metaDataResponse = await getInnerPageData(params.name, PAGE_PARAM, stream);
  return {
    title: metaDataResponse.meta.title,
    description: metaDataResponse.meta.description,
    keywords: metaDataResponse.meta.keywords
  };
};
const Questions = async ({ params }: { params: IQuestionParams }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';

  const data = await getQuestionData({ params, domain });

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
        <QuestionComponents data={data} />
      </Box>
    </Box>
  );
};

export default Questions;
