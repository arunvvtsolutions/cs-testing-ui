import React from 'react';
import { useTheme } from '@mui/system';
import { Box, useMediaQuery } from '@mui/material';

import CourseDetailsMobile from './CourseDetailsMobile';
import CourseDetailsDesktop from './CourseDetails';

import { ISubMenuProps } from 'ui-component/subheader';

const CourseInfoSidebar: React.FC<ISubMenuProps> = ({ subMenu }) => {
  const theme = useTheme();
  const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <Box data-test-id="course-fees-inner-sidebar">
      {matchDownLg ? <CourseDetailsMobile subMenu={subMenu} /> : <CourseDetailsDesktop subMenu={subMenu} />}
    </Box>
  );
};

export default CourseInfoSidebar;
