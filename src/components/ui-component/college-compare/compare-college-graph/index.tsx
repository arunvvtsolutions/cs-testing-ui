import React, { FC } from 'react';
import { Box, Stack } from '@mui/material';

import styles from './styles.module.css';

import LineChartCard from 'ui-component/common/chart-card/line-chart-card';
import { ChartType } from 'ui-component/common/chart-card/bar-chart/MedicalChart';

interface IComparedCollegeData {
  title: string;
  comparedData: ChartType;
}

export interface IComparedCollegeProps {
  comparedCollegeData: IComparedCollegeData;
}

const CompareCollegeGraph: FC<IComparedCollegeProps> = ({ comparedCollegeData }) => {
  const { comparedData, title } = comparedCollegeData;
  const lineColor = [
    'rgb(26, 115, 232)',
    'rgb(246, 130, 40)',
    'rgb(245, 63, 147)',
    'rgb(98, 12, 242)',
    'rgb(53, 162, 173)'
  ];
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
      width="100%"
      className={styles.mainStack}
      data-test-id={`${title}-compare-college-line-graph`}
    >
      <Box className={styles.graphBox}>
        <LineChartCard
          disableTooltiple
          title=""
          data={comparedData}
          lineColor={lineColor.slice(0, comparedData.series.length)}
          bgColor="#f5f5f50a"
          data-test-id={`${title}-compare-college-graph`}
        />
      </Box>
    </Stack>
  );
};

export default CompareCollegeGraph;
