import React from 'react';
import { useTheme } from '@mui/system';
import { Box, useMediaQuery } from '@mui/material';

import CutoffsFilterDesktop, { IFilterProps } from './CutoffFilterDesktop';
import CutoffsFilterMobile from './CutoffFilterMobile';

const CutoffsFilter: React.FC<IFilterProps> = ({ filteredData, filterState, setState, subMenu }) => {
  const theme = useTheme();
  const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box data-test-id="course-fees-inner-cutoff-filter">
      {matchDownLg ? (
        <CutoffsFilterMobile
          filterState={filterState}
          setState={setState}
          filteredData={filteredData}
          subMenu={subMenu}
        />
      ) : (
        <CutoffsFilterDesktop filterState={filterState} setState={setState} filteredData={filteredData} />
      )}
    </Box>
  );
};

export default CutoffsFilter;
