import React, { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

import { TabStrip } from '../../../../layout/MainLayout/Header/MobileTabMenu/styles';

import CourseDetails from './CourseDetails';
import { CourseContent } from './constant';

import feesFilter from 'ui-component/course-fees-page/course-fees-filter/CourseFeeFilter.module.css';
import { ISubMenuProps } from 'ui-component/subheader';
const CourseDetailsMobile: React.FC<ISubMenuProps> = ({ subMenu }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };
  return (
    <>
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
          {CourseContent.FILTER}
          <CloseIcon onClick={handleCloseDrawer} />
        </TabStrip>

        <Box sx={{ paddingTop: '20px' }}>
          <Box className={feesFilter.MobFilterContent}>
            <CourseDetails subMenu={subMenu}></CourseDetails>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default CourseDetailsMobile;
