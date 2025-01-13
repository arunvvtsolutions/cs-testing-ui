import { Box } from '@mui/material';
import React from 'react';

import ExamsAndCutoffsComponent from 'ui-component/college-overview-page/exams-and-cutoffs';
import { IExamsAndCutoffsProps } from 'ui-component/college-overview-page/exams-and-cutoffs/index';

const ExamsAndCutoffSection: React.FC<IExamsAndCutoffsProps> = ({ examData }) => {
  return (
    <Box data-test-id="cutoff-exam-cutoffs">
      <ExamsAndCutoffsComponent examData={examData} />
    </Box>
  );
};

export default ExamsAndCutoffSection;
