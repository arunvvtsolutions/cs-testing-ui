import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';

import { CollegeCourseFeesDetails } from './constant';
import overviewCourseFees from './CourseFees.module.css';

import { converYaxis } from 'utils';
import { useDispatch } from 'store';
import { getSelectedCourse } from 'store/slices/course-fees';
import { IInnerPageParams } from 'types';

interface ICourseFeeCardProps {
  Course: string;
  courseCount: number;
  courseFees: string;
}

const CourseFeeCard: React.FC<ICourseFeeCardProps> = ({ Course, courseCount, courseFees }) => {
  const params = useParams<IInnerPageParams>();
  const router = useRouter();
  const ins = params?.ins;
  const name = params?.name;

  const dispatch = useDispatch();

  const handleCourseNavigate = () => {
    dispatch(getSelectedCourse(Course));
    router.push(`/${ins}/${name}/course-fees`);
  };

  return (
    <Box className={overviewCourseFees.courseGrid} data-test-id="overview-course-fees-card">
      <Box className={overviewCourseFees.courseGridCols}>
        <Typography className={overviewCourseFees.courseGridText}>{Course ? Course : '-'}</Typography>
        <Typography className={overviewCourseFees.courseGridSubText}>
          {courseCount} {CollegeCourseFeesDetails.COURSETITLE}
        </Typography>
      </Box>
      <Box className={overviewCourseFees.courseGridCols}>
        <Typography className={overviewCourseFees.courseGridText}>
          {courseFees && courseFees !== '0'
            ? isNaN(Number(courseFees.replaceAll(',', '')))
              ? courseFees
              : converYaxis(courseFees.replaceAll(',', ''))
            : 'NA'}
        </Typography>
        <Typography className={overviewCourseFees.courseGridSubText}>{CollegeCourseFeesDetails.ANNUALFEE}</Typography>
      </Box>
      <Box className={overviewCourseFees.courseGridCols}>
        <Button
          onClick={handleCourseNavigate}
          className={overviewCourseFees.viewLink}
          data-test-id="overview-course-fees-card-view"
        >
          {CollegeCourseFeesDetails.VIEWBTNTXT}
        </Button>
      </Box>
    </Box>
  );
};

export default CourseFeeCard;
