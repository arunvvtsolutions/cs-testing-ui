import React from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';

import { ApprovedIntakeTitles } from './constant';

import ApprovedChart from 'ui-component/common/chart-card/bar-chart';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

interface IApprovedDataProps {
  name: string;
  years: string[];
  data: number[];
}

export interface IApprovedIntakeProps extends IErrorProps {
  approvedIntakeData: IApprovedDataProps[];
}

const ApprovedIntakeChart: React.FC<IApprovedIntakeProps> = ({ approvedIntakeData, hasError }) => {
  const theme = useTheme();
  const isMatchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const barColors = ['#68ABE1', '#4083C3', '#11519C'];

  return (
    <Box className="emptyCard" data-test-id="student-strength-approved-intake">
      {hasError ? (
        <ErrorComponent />
      ) : (
        <>
          <Grid container spacing={3}>
            {approvedIntakeData.map(
              (barChart, index) =>
                barChart.data.some((data) => data) && (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    data-test-id={`approved-intake-barChart-${index}`}
                  >
                    <ApprovedChart
                      title={`${ApprovedIntakeTitles.APPROVED_INTAKE}  ${barChart.name}`}
                      data={{
                        year: barChart.years,
                        series: [{ name: ApprovedIntakeTitles.APPROVED, data: barChart.data }]
                      }}
                      updatedColors={barColors}
                      legendShow={false}
                      barWidth={53}
                      dataLabelsShow={isMatchDownMd ? true : false}
                      distributed
                    />
                  </Grid>
                )
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ApprovedIntakeChart;
