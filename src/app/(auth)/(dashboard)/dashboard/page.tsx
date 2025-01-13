/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box } from '@mui/material';

import DashBoardComponent from 'ui-component/dashboard/dashboard-page';

const DashBoardPage = () => {
  return (
    <Box className="dashBoard_Container">
      <DashBoardComponent />
    </Box>
  );
};

export default DashBoardPage;
