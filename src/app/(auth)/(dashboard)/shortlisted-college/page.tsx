import { Box } from '@mui/material';
import React from 'react';

import ShortlistedColleges from 'ui-component/dashboard/shortlisted-colleges';

const ShortlistedCollege = () => {
  return (
    <Box className="dashBoard_Container">
      <ShortlistedColleges />
    </Box>
  );
};

export default ShortlistedCollege;
