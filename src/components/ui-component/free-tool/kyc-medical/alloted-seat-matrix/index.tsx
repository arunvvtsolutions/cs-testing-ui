import { Box, Typography } from '@mui/material';
import React from 'react';

import styles from '../kycModal.module.css';

import { AllotedSeatMatrixConstant } from './constant';

import FreeToolCard from 'ui-component/common/cards/freetool-card/FreeToolCard';
import PieChartCard from 'ui-component/common/chart-card/pie-chart';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
export interface IAllotedSeatProps extends IErrorProps {
  allotedSeatData: {
    labels: string[];
    series: number[];
  };
  courseOverviewPage?: boolean;
}

const AllotedSeatMatrix: React.FC<IAllotedSeatProps> = ({ allotedSeatData, hasError, courseOverviewPage = false }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        allotedSeatData?.series?.length > 0 && (
          <Box data-test-id="alloted-seat-matrix-piechart">
            <Typography className={courseOverviewPage ? styles.chartTitle : 'dashBoard_h5'}>
              {AllotedSeatMatrixConstant.TITLE}
            </Typography>
            <FreeToolCard>
              <PieChartCard data={allotedSeatData} title="" backGroundColor="transparent" />
            </FreeToolCard>
          </Box>
        )
      )}
    </>
  );
};
export default AllotedSeatMatrix;
