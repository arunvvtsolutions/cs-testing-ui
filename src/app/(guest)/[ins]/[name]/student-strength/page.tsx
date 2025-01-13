/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SubHeader from 'ui-component/subheader';
import StudentStrengthComponent from 'ui-component/college-student-strength-page';
// student placement component mockupdate passed from below
import { IPageParamsProps, Stream } from 'types';
import { getInnerPageData } from 'utils/api/common';
import { getStudentStrengthData } from 'utils/api/student-strength';
export const generateMetadata = async ({ params }: { params: IPageParamsProps }): Promise<Metadata> => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const PAGE_PARAM = 'student-strength';
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const metaDataResponse = await getInnerPageData(params.name, PAGE_PARAM, stream);
  return {
    title: metaDataResponse.meta.title,
    description: metaDataResponse.meta.description,
    keywords: metaDataResponse.meta.keywords
  };
};

const StudentStrengthPage = async ({ params }: { params: IPageParamsProps }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';

  const data = await getStudentStrengthData({ params, domain });

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
        <StudentStrengthComponent data={data} />
      </Box>
    </Box>
  );
};

export default StudentStrengthPage;
