'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';

import OverviewCard from '../../common/cards/overview';

import OverviewContent, { IOverviewProps } from './OverviewContent';
import { OverviewConst } from './constant';

import MainCard from 'ui-component/MainCard';
import ErrorComponent from 'ui-component/error';

const Overview: React.FC<IOverviewProps> = ({ overviewData, hasError }) => {
  return (
    <Box>
      {hasError ? (
        <ErrorComponent />
      ) : (
        overviewData &&
        overviewData.length > 0 && (
          <MainCard
            title={
              <Typography className="subHeadText">
                {overviewData[0].shortName} {OverviewConst.OVERVIEW}
              </Typography>
            }
            secondary=""
            data-test-id="overview-overall-content"
          >
            {/* {data send to overviewCard it is in common folder} */}
            <OverviewCard data={<OverviewContent overviewData={overviewData} />} contentHeight="168px"></OverviewCard>
          </MainCard>
        )
      )}
    </Box>
  );
};

export default Overview;
