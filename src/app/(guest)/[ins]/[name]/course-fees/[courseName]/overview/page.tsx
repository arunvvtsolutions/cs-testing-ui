/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import OverviewInnerComponent from 'ui-component/course-fees-inner-page/overview';
import { getCourseFeesOverviewData } from 'utils/api/course-fees-inner-page/overview';
import SubHeader from 'ui-component/subheader';

export interface ICourseFeesOverviewParams {
  ins: string;
  name: string;
  courseName: string;
}

const OverviewInnerPage = async ({ params }: { params: ICourseFeesOverviewParams }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const data = await getCourseFeesOverviewData({ params, domain });

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
        <OverviewInnerComponent data={data} />
      </Box>
    </Box>
  );
};

export default OverviewInnerPage;
