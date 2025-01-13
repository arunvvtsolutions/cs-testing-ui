import React from 'react';
import { Box } from '@mui/material';

import PercentileToScoreBanner from 'ui-component/free-tool/percentile-to-score';
const PercentileToScorePage = async () => {
  return (
    <Box className="containerWrapper">
      <PercentileToScoreBanner />
    </Box>
  );
};
export default PercentileToScorePage;
