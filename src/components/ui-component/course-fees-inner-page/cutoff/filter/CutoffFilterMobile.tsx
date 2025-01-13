import React, { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

import { TabStrip } from '../../../../../layout/MainLayout/Header/MobileTabMenu/styles';

import CutoffsFilterDesktop from './CutoffFilterDesktop';
import { IFilterProps } from './CutoffFilterDesktop';
import { FilterContent } from './constant';

import feesFilter from 'ui-component/course-fees-page/course-fees-filter/CourseFeeFilter.module.css';
import CourseDetailsDesktop from 'ui-component/course-fees-inner-page/course-info-sidebar/CourseDetails';
const CutoffsFilterMobile: React.FC<IFilterProps> = ({ filteredData, filterState, setState, subMenu }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };
  return (
    <Box data-test-id="course-fees-inner-cutoff-filter-mobile">
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
          {FilterContent.FILTER}
          <CloseIcon onClick={handleCloseDrawer} />
        </TabStrip>

        <Box sx={{ padding: '20px 10px 10px' }}>
          <Box className={feesFilter.MobFilterContent}>
            <CourseDetailsDesktop subMenu={subMenu} />
            <CutoffsFilterDesktop filterState={filterState} setState={setState} filteredData={filteredData} />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CutoffsFilterMobile;
