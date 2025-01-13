/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// eslint-disable-next-line import/order
import { Box } from '@mui/material';

// all course fee datas passed below
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import SubHeader from 'ui-component/subheader';
import QuestionAnswerInnerComponent from 'ui-component/course-fees-inner-page/question-answer';
import { getCourseFeesQnA } from 'utils/api/course-fees-inner-page/question-answer';

export interface IQnAParamsProps {
  ins: string;
  name: string;
  courseName: string;
}

const QuestionAnswerInnerPage = async ({ params }: { params: IQnAParamsProps }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const data = await getCourseFeesQnA({ params, domain });

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
        <QuestionAnswerInnerComponent data={data} />
      </Box>
    </Box>
  );
};

export default QuestionAnswerInnerPage;
