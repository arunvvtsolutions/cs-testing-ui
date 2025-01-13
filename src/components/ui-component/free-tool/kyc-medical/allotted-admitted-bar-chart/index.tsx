import { Box, Typography } from '@mui/material';
import React from 'react';

import kycStyles from '../kycModal.module.css';
import styles from '../kycModal.module.css';

import { AdmittedBarChartTitle } from './constant';

import BarChartCard from 'ui-component/common/chart-card/bar-chart';
import ErrorComponent from 'ui-component/error';
import { IErrorProps } from 'types';
export interface IAllottedAdmitBarProps extends IErrorProps {
  allocationYear: number;
  previousYear: {
    series: {
      name: string;
      data: number[];
    }[];
    rounds: string[];
  };
  courseOverviewPage?: boolean;
}

const AdmittedBarChart: React.FC<IAllottedAdmitBarProps> = ({
  previousYear,
  hasError,
  allocationYear,
  courseOverviewPage = false
}) => {
  const barColors = ['#1862C5', '#1452A4'];
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        previousYear?.rounds &&
        previousYear?.rounds?.length > 0 && (
          <Box>
            <Typography
              className={courseOverviewPage ? styles.chartTitle : 'dashBoard_h5'}
              data-test-id="admitted-bar-chart-title-from-kyc"
            >
              {allocationYear} {AdmittedBarChartTitle.ROUND_WISE_ALLOTTED}
            </Typography>
            <Box className={kycStyles.barBlocks}>
              <BarChartCard
                title=""
                data={{
                  series: previousYear.series,
                  year: previousYear.rounds
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

export default AdmittedBarChart;
