import React from 'react';
import { Box } from '@mui/material';

import ScoreToRankBanner from 'ui-component/free-tool/score-to-rank';
import { Stream } from 'types';
const ScoreToRankPage = async () => {
  return (
    <Box className="containerWrapper">
      <ScoreToRankBanner stream={Stream.MEDICAL} />
    </Box>
  );
};
export default ScoreToRankPage;
