import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import styles from '../cutoff-clossingRank/cutoff.module.css';

import { SeatAllocationContent } from './constant';

import DefaultBarChart, { ChartType } from 'ui-component/common/chart-card/bar-chart/MedicalChart';
import { toolTip } from 'utils/apex-chart';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

interface ISeatAllocationProps {
  year: number;
  seatAllocationData: ChartType;
}

export interface ISeatDataProps extends IErrorProps {
  seatAllocationData: ISeatAllocationProps;
}

const SeatAllocation: React.FC<ISeatDataProps> = ({ seatAllocationData, hasError }) => {
  const [chartData, setChartData] = useState<ChartType>(seatAllocationData.seatAllocationData);
  const barColors = ['#1A73E8', '#8CBEFF'];

  useEffect(() => {
    seatAllocationData.seatAllocationData.series.length > 0 &&
      seatAllocationData.seatAllocationData.series[0].data.length > 0 &&
      setChartData({
        categories: seatAllocationData.seatAllocationData.categories,
        series: seatAllocationData.seatAllocationData.series.filter((series) => series.data.length > 0)
      });
  }, [seatAllocationData.seatAllocationData]);

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        chartData.series.length > 0 &&
        chartData.categories.length > 0 && (
          <DefaultBarChart
            title={
              <Box className={styles.closingRankHeaderBox}>
                <Typography className={styles.courseName}>
                  {seatAllocationData.year}
                  {SeatAllocationContent.ROUNDWISE_TITLE}
                </Typography>
              </Box>
            }
            data={chartData}
            barWidth="35px"
            dataLabelsShow={true}
            legendShow
            updatedColors={barColors}
            toolTip={toolTip}
          />
        )
      )}
    </>
  );
};

export default SeatAllocation;
