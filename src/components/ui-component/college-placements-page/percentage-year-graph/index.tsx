import { Grid, Typography, Box } from '@mui/material';
import { FC } from 'react';

import ArrowImage from '../percentageStatusIcon';
import styles from '../collegePlacement.module.css';

import { PercentageYears } from './constants';

import LineChartCard from 'ui-component/common/chart-card/line-chart-card';
import { ContainerWrapper } from 'ui-component/home/banner-page/styles';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

interface IPercentItemsProps {
  name: string;
  years: string[];
  placementData: number[];
  percentage: number;
  status: string;
}

interface IPercentDataProps {
  shortName: string;
  placementPerc: IPercentItemsProps[];
}
export interface IPercentContentProps extends IErrorProps {
  percentData: IPercentDataProps;
}

const PercentageYearGraph: FC<IPercentContentProps> = ({ percentData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <ContainerWrapper>
          <Box className="emptyCard" data-test-id="placement-placement-year-graph">
            <Box className="cardHead">
              <Typography className="cg_InnerTitleTxt">{`${PercentageYears.PLACEMENT_PERCENT_TITLES} ${percentData.shortName} ${PercentageYears.STUDENTS}`}</Typography>
            </Box>
            <Grid container spacing={2}>
              {percentData.placementPerc.length > 0 &&
                percentData.placementPerc.map((pData, index) => {
                  return (
                    <Grid item xs={12} md={6} key={index} data-test-id={`placement-year-graph-${index}`}>
                      <LineChartCard
                        data={{
                          categories: pData.years,
                          series: [{ data: pData.placementData, name: PercentageYears.PERCENTAGE }]
                        }}
                        title={PercentageYears.PERCENTAGE + pData.name}
                        subTitle={PercentageYears.PLACEMENT_PERCENT_SUB_TITLE + pData.status}
                        dataStatus={
                          <Typography
                            className={
                              pData.status === 'It Is A Decrease Of'
                                ? styles.dataStatusDown
                                : pData.status === 'It Is An Increase Of'
                                  ? styles.dataStatusUp
                                  : styles.dataStatusNormal
                            }
                          >
                            {`${pData.percentage ? pData.percentage : 0} %`}

                            <ArrowImage status={pData.status} />
                          </Typography>
                        }
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </ContainerWrapper>
      )}
    </>
  );
};

export default PercentageYearGraph;
