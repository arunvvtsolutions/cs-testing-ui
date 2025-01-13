import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

import { STUDENT_STRENGTH } from './constants';

import LineChartCard from 'ui-component/common/chart-card/line-chart-card';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
import BarChartCard from 'ui-component/common/chart-card/bar-chart';

export interface TotalStrengthProps {
  shortName?: string;
  years: string[];
  data: number[];
}

export interface TotalStudentsProps {
  name: string;
  years: string[];
  data: number[];
}

export interface StrengthDataProps extends IErrorProps {
  totalStrength: TotalStrengthProps;
  noOfStudents: TotalStudentsProps[];
}

const StudentStrengthPage = ({ totalStrength, noOfStudents, hasError }: StrengthDataProps) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const colors = ['#11519C', '#4083C3', '#68ABE1', '#9DD2F5'];
  const [strengthDataState, setStrengthData] = useState<TotalStrengthProps>({
    years: [],
    data: []
  });

  useEffect(() => {
    setStrengthData(totalStrength);
  }, [totalStrength]);

  useEffect(() => {
    if (isMd) {
      const years = totalStrength.years.map((year) => {
        return year.replace(STUDENT_STRENGTH.YEARS, STUDENT_STRENGTH.Y);
      });

      setStrengthData({
        data: totalStrength.data,
        years: years
      });
    } else {
      setStrengthData(totalStrength);
    }
  }, [isMd, totalStrength, strengthDataState.data]);

  return (
    <Box className="emptyCard">
      {hasError ? (
        <ErrorComponent />
      ) : (
        <>
          <Box
            className="cardHead"
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            data-test-id="student-strength-total-students"
          >
            <Typography className="cg_InnerTitleTxt">
              {STUDENT_STRENGTH.NO_OF_STUDENTS_AT_IIT}
              {totalStrength.shortName}
            </Typography>
          </Box>
          <Box>
            {strengthDataState.years.length > 0 && (
              <BarChartCard
                data={{
                  year: strengthDataState.years,
                  series: [
                    {
                      data: strengthDataState.data,
                      name: STUDENT_STRENGTH.TOTAL_STUDENTS
                    }
                  ]
                }}
                title={STUDENT_STRENGTH.NO_OF_STUDENTS}
                distributed
                tooltipLabel
                barWidth={50}
                updatedColors={colors}
                dataLabelsShow={isMd ? true : false}
              />
            )}

            <Grid container>
              {noOfStudents &&
                noOfStudents.length > 0 &&
                noOfStudents.map((total, index) => {
                  return (
                    <Grid item xs={12} md={6} key={index} data-test-id={`total-students-total-${index}`}>
                      <LineChartCard
                        data={{
                          categories: total.years,
                          series: [
                            {
                              data: total.data,
                              name: STUDENT_STRENGTH.TOTAL_STUDENTS
                            }
                          ]
                        }}
                        title={STUDENT_STRENGTH.NO_OF_STUDENTS_TITLE + total.name}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default StudentStrengthPage;
