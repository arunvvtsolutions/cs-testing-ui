import React from 'react';
import { Box } from '@mui/material';

import { CourseIntakeContent } from './constant';

import CourseIntakeChart from 'ui-component/common/chart-card/bar-chart';
import { IErrorProps } from 'types';

interface ICourseIntake {
  years: string[];
  data: number[];
}
export interface ICourseIntakeProps extends IErrorProps {
  courseIntakeData: ICourseIntake;
}

const IndividualCourseIntake: React.FC<ICourseIntakeProps> = ({ courseIntakeData }) => {
  const barColors = ['#1A73E8'];
  return (
    <Box data-test-id="course-fees-inner-overview-individual-intake">
      <CourseIntakeChart
        titleSx={{
          fontWeight: '500 !important',
          fontSize: '20px !important'
        }}
        data={{
          year: courseIntakeData?.years,
          series: [
            {
              name: CourseIntakeContent.TOOLTIP_HEADING,
              data: courseIntakeData?.data
            }
          ]
        }}
        chartBgColor="#FBFBFB"
        title={CourseIntakeContent.TITLE}
        updatedColors={barColors}
      />
    </Box>
  );
};

export default IndividualCourseIntake;
