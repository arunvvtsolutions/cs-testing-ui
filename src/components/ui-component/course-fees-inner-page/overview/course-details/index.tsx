import { Box, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import capitalize from 'lodash/capitalize';

import IndividualCourseIntake from '../individual-course-intake';
import PreviousYearGraph from '../previous-year-graph';

import { CourseDetailsTitle } from './constant';
import classes from './CourseDetails.module.css';

import { Stream } from 'types';
import styles from 'ui-component/college-amenities-page/campus-overview/CampusOverview.module.css';
import MainCard from 'ui-component/MainCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
import { converYaxis } from 'utils';
interface IOverviewProps {
  engineering?: string;
  courseName?: string;
  year?: string;
  duration?: string;
  totalFees?: string;
  intake?: string;
  enrolments?: string;
  level?: string;
  startedYear?: number;
  intakeGraph?: { years: []; data: [] };
  enrolementGraph?: { years: []; data: [] }[];
  stream: string;
}
export interface ICourseOverviewDetailsProps extends IErrorProps {
  courseDetailsData: IOverviewProps[];
}
const InnerCourseDetails: React.FC<ICourseOverviewDetailsProps> = ({ courseDetailsData, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        courseDetailsData &&
        courseDetailsData?.map((course, index) => {
          return (
            <Box key={index} data-test-id={`course-fees-inner-overview-course-details-${index}`}>
              <MainCard>
                <Box className={classes.courseMainCard}>
                  <Box>
                    <Typography className={classes.courseName}>
                      {course.stream === Stream.ENGINEERING
                        ? capitalize(course.engineering)
                        : capitalize(course.courseName)}
                    </Typography>
                    <Typography className={styles.courseText}>
                      {course.stream === Stream.ENGINEERING ? course.duration : course.year}
                    </Typography>
                  </Box>
                  {!isMdDown && <Divider className={classes.courseDivider} />}
                  <Box className={classes.courseSection}>
                    <Box className={styles.campusBox}>
                      <Typography className={styles.campusValue}>{course.duration ? course.duration : '-'} </Typography>

                      <Typography className={styles.campusText}>{CourseDetailsTitle.DURATION}</Typography>
                    </Box>
                    <Box className={styles.campusBox}>
                      <Typography className={styles.campusValue}>
                        {course.totalFees
                          ? isNaN(Number(course.totalFees.replaceAll(',', '')))
                            ? course.totalFees
                            : converYaxis(course.totalFees.replaceAll(',', ''))
                          : '-'}
                      </Typography>

                      <Typography className={styles.campusText}>{CourseDetailsTitle.TOTAL_FEES}</Typography>
                    </Box>
                    <Box className={styles.campusBox}>
                      <Typography className={styles.campusValue}>{course.intake ? course.intake : '-'}</Typography>

                      <Typography className={styles.campusText}>{CourseDetailsTitle.INTAKE}</Typography>
                    </Box>
                    {course.stream === Stream.ENGINEERING && (
                      <Box className={styles.campusBox}>
                        <Typography className={styles.campusValue}>
                          {course.enrolments ? course.enrolments : '-'}
                        </Typography>

                        <Typography className={styles.campusText}>{CourseDetailsTitle.ENROLMENTS}</Typography>
                      </Box>
                    )}

                    {course.stream === Stream.MEDICAL && (
                      <Box className={styles.campusBox}>
                        <Typography className={styles.campusValue}>
                          {course.startedYear ? course.startedYear : '-'}
                        </Typography>

                        <Typography className={styles.campusText}>{CourseDetailsTitle.STARTED_YEAR}</Typography>
                      </Box>
                    )}

                    <Box className={styles.campusBox}>
                      <Typography className={styles.campusValue}>{course.level ? course.level : '-'}</Typography>

                      <Typography className={styles.campusText}>{CourseDetailsTitle.LEVEL}</Typography>
                    </Box>
                  </Box>
                </Box>
              </MainCard>
              <Box sx={{ flexGrow: 1 }} className={styles.graphBox}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box>
                      {course?.intakeGraph?.years && <IndividualCourseIntake courseIntakeData={course.intakeGraph} />}
                    </Box>
                  </Grid>
                  {course?.enrolementGraph && course?.enrolementGraph?.[0].data?.length > 0 && (
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box>
                        {course.enrolementGraph &&
                          course.enrolementGraph?.length > 0 &&
                          course.enrolementGraph.map((enrollmentData, enrollmentIndex) => (
                            <PreviousYearGraph key={enrollmentIndex} previousYearData={enrollmentData} />
                          ))}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Box>
          );
        })
      )}
    </>
  );
};
export default InnerCourseDetails;
