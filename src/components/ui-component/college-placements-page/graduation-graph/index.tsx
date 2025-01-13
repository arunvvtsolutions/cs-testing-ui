import React, { FC } from 'react';
import { Grid, Typography, Box } from '@mui/material';

import ArrowImage from '../percentageStatusIcon';
import styles from '../collegePlacement.module.css';

import { GraduationGraphContent } from './constant';

import LineChartCard from 'ui-component/common/chart-card/line-chart-card';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

interface IGraduationDataProps {
  name: string;
  years: string[];
  graduationData: number[];
  percentage: number;
  status: string;
}

export interface IGraduartionContentProps extends IErrorProps {
  graduationData: IGraduationDataProps[];
}

const PercentageComparison: FC<IGraduartionContentProps> = ({ graduationData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Box className="emptyCard" data-test-id="placement-graduation-graph">
          <Box className="cardHead">
            <Typography className="cg_InnerTitleTxt">{GraduationGraphContent.GRADUATION_PERCENT_COMPARISON}</Typography>
          </Box>
          <Grid container spacing={2}>
            {graduationData &&
              graduationData.map((data, index) => {
                return (
                  <Grid item xs={12} md={6} key={index} data-test-id={`graduation-graph-graduationData-${index}`}>
                    <LineChartCard
                      data={{
                        categories: data.years,
                        series: [
                          {
                            data: data.graduationData,
                            name: GraduationGraphContent.PERCENTAGE
                          }
                        ]
                      }}
                      title={GraduationGraphContent.GRADUATION_PERCENT + data.name}
                      subTitle={GraduationGraphContent.GRADUATION_PERCENT_SUB_TITLE + data.status}
                      dataStatus={
                        <Typography
                          className={
                            data.status === 'It Is A Decrease Of'
                              ? styles.dataStatusDown
                              : data.status === 'It Is An Increase Of'
                                ? styles.dataStatusUp
                                : styles.dataStatusNormal
                          }
                        >
                          {`${data.percentage ? data.percentage : 0} %`}
                          <ArrowImage status={data.status} />
                        </Typography>
                      }
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      )}
    </>
  );
};
export default PercentageComparison;
