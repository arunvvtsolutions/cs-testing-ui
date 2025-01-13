import { Box, Typography } from '@mui/material';
import React from 'react';

import kycStyles from '../kycModal.module.css';
import styles from '../kycModal.module.css';

import { AllocationBarChartTitles } from './constant';

import BarChartCard from 'ui-component/common/chart-card/bar-chart';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
export interface IAllocationBarProps extends IErrorProps {
  year: number;
  seatAllocationData: {
    series: {
      name: string;
      data: number[];
    }[];
    categories: string[];
  };
  courseOverviewPage?: boolean;
}

const AllocationBarChart: React.FC<IAllocationBarProps> = ({
  seatAllocationData,
  hasError,
  year,
  courseOverviewPage = false
}) => {
  const barColors = ['#1862C5', '#1452A4'];

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        seatAllocationData?.categories &&
        seatAllocationData?.categories?.length > 0 && (
          <Box>
            <Typography
              className={courseOverviewPage ? styles.chartTitle : 'dashBoard_h5'}
              data-test-id="allotted-bar-chart-title-from-kyc"
            >
              {year} {AllocationBarChartTitles.ROUND_WISE_SEATS_ALLOCATION}
            </Typography>
            <Box className={kycStyles.barBlocks}>
              <BarChartCard
                title=""
                data={{
                  series: seatAllocationData.series,
                  year: seatAllocationData.categories
                }}
                updatedColors={barColors}
                chartBgColor="rgba(245, 245, 245, 0.50);"
              />
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default AllocationBarChart;
