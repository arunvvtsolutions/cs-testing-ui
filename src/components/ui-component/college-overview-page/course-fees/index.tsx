'use client';
import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'next/navigation';

import { ViewAll } from '../../../../constants';

import CourseFeeCard from './CourseFeeCard';
import { CollegeCourseFeesDetails } from './constant';
import overviewCourseFees from './CourseFees.module.css';

import MainCard from 'ui-component/MainCard';
import { IErrorProps, IInnerPageParams } from 'types';
import ErrorComponent from 'ui-component/error';

export interface ICollegeFeesProps extends IErrorProps {
  courseFeesData: {
    shortName: string;
    ugCourse: string;
    ugCount: number;
    ugFees: string;
    pgCourse: string;
    pgCount: number;
    pgFees: string;
  };
}
const CollegeCourseFees: React.FC<ICollegeFeesProps> = ({ courseFeesData, hasError }) => {
  const params = useParams<IInnerPageParams>();
  const ins = params?.ins;
  const name = params?.name;
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <MainCard data-test-id="overview-course-fees">
          <Box>
            <Box className={overviewCourseFees.courseFeesHead}>
              <Typography className="subHeadText">
                {courseFeesData.shortName} {CollegeCourseFeesDetails.TITLE}
              </Typography>
              <Link
                className={overviewCourseFees.linkTxt}
                href={`/${ins}/${name}/course-fees`}
                as={`/${ins}/${name}/course-fees`}
                data-test-id="overview-course-fees-viewall"
              >
                {ViewAll.VIEW_ALL}
              </Link>
            </Box>
            <Grid container spacing={2}>
              {courseFeesData.ugCourse !== '' && (
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <CourseFeeCard
                    Course={courseFeesData.ugCourse}
                    courseCount={courseFeesData.ugCount}
                    courseFees={courseFeesData.ugFees}
                  />
                </Grid>
              )}

              {courseFeesData.pgCourse !== '' && (
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <CourseFeeCard
                    Course={courseFeesData.pgCourse}
                    courseCount={courseFeesData.pgCount}
                    courseFees={courseFeesData.pgFees}
                  />
                </Grid>
              )}
            </Grid>
            <Link
              href={`/${ins}/${name}/course-fees`}
              as={`/${ins}/${name}/course-fees`}
              className={overviewCourseFees.mobileViewAllBtn}
              data-test-id="overview-course-fees-mobile-viewall"
            >
              {ViewAll.VIEW_ALL}
              <ArrowForwardIosIcon className={overviewCourseFees.arrowForwardIcon} />
            </Link>
          </Box>
        </MainCard>
      )}
    </>
  );
};

export default CollegeCourseFees;
