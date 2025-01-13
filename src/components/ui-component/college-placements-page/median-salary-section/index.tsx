import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';

import ArrowImage from '../percentageStatusIcon';
import styles from '../collegePlacement.module.css';

import { PLACEMENT_CONTENT } from './constants';

import LineChartCard from 'ui-component/common/chart-card/line-chart-card';
import { ContainerWrapper } from 'ui-component/home/banner-page/styles';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

interface IMedianSalaryData {
  name: string;
  years: string[];
  salary: number[];
  percentage: number;
  status: string;
}

interface ISalaryDataProps {
  shortName: string;
  medianSalary: IMedianSalaryData[];
}
export interface ISalaryContentProps extends IErrorProps {
  salaryData: ISalaryDataProps;
}

const MedianSalarySection: FC<ISalaryContentProps> = ({ salaryData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        salaryData.medianSalary.length > 0 && (
          <ContainerWrapper>
            <Box className="emptyCard" data-test-id="placement-median-salary">
              <Box className="cardHead">
                <Typography className="cg_InnerTitleTxt">{`${PLACEMENT_CONTENT.MEDIAN_SALARY_IIT} ${salaryData.shortName} ${PLACEMENT_CONTENT.STUDENTS}`}</Typography>
              </Box>
              <Grid container spacing={2}>
                {salaryData &&
                  salaryData.medianSalary.map((salary, index) => {
                    return (
                      <Grid item xs={12} md={6} key={index} data-test-id={`median-salary-salaryData-${index}`}>
                        <LineChartCard
                          data={{
                            categories: salary.years,
                            series: [
                              {
                                data: salary.salary,
                                name: PLACEMENT_CONTENT.MEDIAN_SALARY_TITLE
                              }
                            ]
                          }}
                          title={PLACEMENT_CONTENT.MEDIAN_SALARY + salary.name}
                          subTitle={PLACEMENT_CONTENT.MEDIAN_SALARY_SUB_TITLE + salary.status}
                          dataStatus={
                            <Typography
                              className={
                                salary.status === 'It Is A Decrease Of'
                                  ? styles.dataStatusDown
                                  : salary.status === 'It Is An Increase Of'
                                    ? styles.dataStatusUp
                                    : styles.dataStatusNormal
                              }
                            >
                              {`${salary.percentage ? salary.percentage : 0} %`}
                              <ArrowImage status={salary.status} />
                            </Typography>
                          }
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </Box>
          </ContainerWrapper>
        )
      )}
    </>
  );
};

export default MedianSalarySection;
