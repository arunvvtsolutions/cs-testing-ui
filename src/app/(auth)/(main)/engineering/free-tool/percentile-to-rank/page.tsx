import React from 'react';
import { Box } from '@mui/material';

import PercentileToRankBanner from 'ui-component/free-tool/percentile-to-rank';
const PercentileToRankPage = async () => {
  return (
    <Box className="containerWrapper">
      <PercentileToRankBanner />
    </Box>
  );
};
export default PercentileToRankPage;
