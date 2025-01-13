import { Box } from '@mui/material';
import React from 'react';

import RelatedComparedCollege from 'ui-component/dashboard/compare-history-page';

const CompareHistory = async () => {
  return (
    <Box className="dashBoard_Container">
      <RelatedComparedCollege />
    </Box>
  );
};

export default CompareHistory;
