import React, { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

import { TabStrip } from '../../../../layout/MainLayout/Header/MobileTabMenu/styles';

import feesFilter from './CourseFeeFilter.module.css';
import CourseFees from './CourseFeesFilter';

import { ICourseProps } from '.';

const CourseFeesMobile: React.FC<ICourseProps> = ({
  courseFilterData,
  selectedCourse,
  setSelectedCourse,
  hasError
}) => {
  const [open, setOpen] = useState(false);
  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };
  return (
    <Box data-test-id="course-fees-mobile-filter">
      <Box className={feesFilter.FilterIcnBx}>
        <FilterAltIcon style={{ color: '#11519C' }} onClick={handleOpenDrawer} />
      </Box>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={handleCloseDrawer}
        style={{
          zIndex: '99999',
          borderRadius: '10px',
          padding: '10px',
          paddingBottom: '56px'
        }}
      >
        <TabStrip>
          Filter
          <CloseIcon onClick={handleCloseDrawer} />
        </TabStrip>

        <Box sx={{ paddingTop: '20px' }}>
          <Box className={feesFilter.MobFilterContent}>
            <CourseFees
              courseData={courseFilterData.coursesShort}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
            ></CourseFees>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CourseFeesMobile;
