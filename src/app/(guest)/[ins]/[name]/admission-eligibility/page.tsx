/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import SubHeader from 'ui-component/subheader';
import AdmissionEligibilityComponent from 'ui-component/college-admission-eligibility';
import { getAdmissionEligibilityData } from 'utils/api/admission-eligibility';
import { Stream } from 'types';
import { getInnerPageData } from 'utils/api/common';

export const generateMetadata = async ({ params }: { params: { name: string; ins: string } }): Promise<Metadata> => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const PAGE_PARAM = 'admission';
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const metaDataResponse = await getInnerPageData(params.name, PAGE_PARAM, stream);
  return {
    title: metaDataResponse.meta.title,
    description: metaDataResponse.meta.description,
    keywords: metaDataResponse.meta.keywords
  };
};

const AdmissionEligibilityPage = async ({ params }: { params: { ins: string; name: string } }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const data = await getAdmissionEligibilityData({ params, domain });

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
        <AdmissionEligibilityComponent data={data} />
      </Box>
    </Box>
  );
};

export default AdmissionEligibilityPage;
