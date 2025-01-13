import { Box } from '@mui/material';
import React from 'react';

import infoStyles from './compareInfoStyles.module.css';

import DefaultBarChart from 'ui-component/common/chart-card/bar-chart/MedicalChart';

const CompareInfoGraph = () => {
  return (
    <>
      <Box className={infoStyles.graphBox}>
        <DefaultBarChart
          data={{
            categories: ['2020', '2021', '2022', '2023'],
            series: [{ data: [1, 2, 3, 4], name: '2021' }]
          }}
          title
        />
      </Box>
    </>
  );
};

export default CompareInfoGraph;
