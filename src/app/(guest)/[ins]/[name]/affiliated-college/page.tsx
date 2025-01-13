/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import SubHeader from 'ui-component/subheader';
import AffiliatedComponent from 'ui-component/college-affiliated-page';
import { getAffiliatedCollegeData } from 'utils/api/affiliatedCollege';

export const metadata: Metadata = {
  title: 'Affiliated colleges | Collegesuggest',
  description:
    'Learn More About Education In India And Abroad By Viewing Information On Examinations, Colleges, Courses, And Certificates. Checkout In Our College Suggest Website',
  keywords:
    'collegesuggest, Career counseling, affiliated colleges, admission guidance, entrance exam preparation, career advice, college selection, rank predictor, college predictor,  education, colleges, universities, institutes, career, engineering, mba, medical, mbbs, courses, fees, placements, cutoff, faculty, review, technical education, higher education, education career experts, admissions, results, events, scholarships'
};

const AffliatedColleges = async ({ params }: { params: { ins: string; name: string } }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const data = await getAffiliatedCollegeData({ params, domain });

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
        <AffiliatedComponent data={data} />
      </Box>
    </Box>
  );
};

export default AffliatedColleges;
