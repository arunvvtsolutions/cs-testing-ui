/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';

import { IPageParamsProps } from 'types';
import CollegeIqComponent from 'ui-component/free-tool/college-iq';
import { getCollegeIqData } from 'utils/api/college-iq';

const CollegeIqToolPage = async ({ params }: { params: IPageParamsProps }) => {
  const data = await getCollegeIqData();

  return (
    <Box>
      <Box className="containerWrapper">
        <CollegeIqComponent data={data} />
      </Box>
    </Box>
  );
};

export default CollegeIqToolPage;
