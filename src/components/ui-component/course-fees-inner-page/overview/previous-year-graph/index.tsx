import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import { PreviousYearGraphTitles } from './constant';

import ApprovedChart from 'ui-component/common/chart-card/bar-chart';

interface IGraphProps {
  years: string[];
  data: number[];
}
export interface IPreviousYearProps {
  previousYearData: IGraphProps;
}

const PreviousYearGraph: React.FC<IPreviousYearProps> = ({ previousYearData }) => {
  const theme = useTheme();
  const isMatchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const barColors = ['#1A73E8', '#8CBEFF', '#58A0FF', '#318AFF', '#1A73E8'];

  return (
    <Box className="emptyCard" data-test-id="course-fees-inner-overview-previous-year">
      <ApprovedChart
        title={PreviousYearGraphTitles.PREVIOUS_YEAR_ENROLLMENTS}
        titleSx={{
          fontWeight: '500 !important',
          fontSize: '20px !important'
        }}
        data={{
          year: previousYearData.years,
          series: [{ name: PreviousYearGraphTitles.ENROLMENTS, data: previousYearData.data }]
        }}
        updatedColors={barColors}
        legendShow={false}
        chartBgColor="#FBFBFB"
        dataLabelsShow={isMatchDownMd ? true : false}
        distributed
      />
    </Box>
  );
};

export default PreviousYearGraph;
