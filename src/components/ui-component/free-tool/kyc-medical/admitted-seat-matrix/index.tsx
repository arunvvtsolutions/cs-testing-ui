'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';

import styles from '../kycModal.module.css';

import { AdmittedSeatMatrixConstant } from './constant';

import FreeToolCard from 'ui-component/common/cards/freetool-card/FreeToolCard';
import PieChartCard from 'ui-component/common/chart-card/pie-chart';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
export interface IAdmittedSeatProps extends IErrorProps {
  admittedSeatData: {
    labels: string[];
    series: number[];
  };
  courseOverviewPage?: boolean;
}

const AdmittedSeatMatrix: React.FC<IAdmittedSeatProps> = ({
  admittedSeatData,
  hasError,
  courseOverviewPage = false
}) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        admittedSeatData?.series?.length > 0 && (
          <Box data-test-id="admitted-seat-matrix-piechart">
            <Typography className={courseOverviewPage ? styles.chartTitle : 'dashBoard_h5'}>
              {AdmittedSeatMatrixConstant.TITLE}
            </Typography>
            <FreeToolCard>
              <PieChartCard data={admittedSeatData} title="" backGroundColor="transparent" />
            </FreeToolCard>
          </Box>
        )
      )}
    </>
  );
};
export default AdmittedSeatMatrix;
