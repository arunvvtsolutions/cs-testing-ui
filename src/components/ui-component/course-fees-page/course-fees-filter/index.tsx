/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { useTheme } from '@mui/system';
import { Box, useMediaQuery } from '@mui/material';

import CourseFees from './CourseFeesFilter';
import CourseFeesMobile from './CourseFeesMobile';

import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface ICourseShortProps {
  id: number;
  name: string;
  collegeId: number;
  collegeType: number;
}

export interface ICourseShort {
  coursesShort: ICourseShortProps[];
}

export interface ICourseProps extends IErrorProps {
  courseFilterData: ICourseShort;
  setSelectedCourse: (data: string) => void;
  selectedCourse: string;
  selectedDegree?: any[];
}
const CourseFeesFilter: React.FC<ICourseProps> = ({
  courseFilterData,
  hasError,
  setSelectedCourse,
  selectedCourse,
  selectedDegree
}) => {
  const theme = useTheme();
  const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Box data-test-id="course-fees-filter">
          {selectedDegree &&
            selectedDegree.length > 0 &&
            (matchDownLg ? (
              <CourseFeesMobile
                courseFilterData={courseFilterData}
                setSelectedCourse={setSelectedCourse}
                selectedCourse={selectedCourse}
              />
            ) : (
              <CourseFees
                courseData={selectedDegree}
                setSelectedCourse={setSelectedCourse}
                selectedCourse={selectedCourse}
              ></CourseFees>
            ))}
        </Box>
      )}
    </>
  );
};

export default CourseFeesFilter;
