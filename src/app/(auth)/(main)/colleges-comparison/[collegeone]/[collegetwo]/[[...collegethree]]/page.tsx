/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { headers } from 'next/headers';
// import { notFound } from 'next/navigation';

import CompareInfoComponets from 'ui-component/college-compare';
import { getCollegeCompareInfoData } from 'utils/api/compare-college';

const CompareInfoPage = async ({
  params
}: {
  params: { collegeone: string; collegetwo: string; collegethree: string[] };
}) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const data = await getCollegeCompareInfoData({ params, domain });

  return (
    <Box>
      <Box className="containerWrapper">
        <CompareInfoComponets data={data?.data} />
      </Box>
    </Box>
  );
};

export default CompareInfoPage;
