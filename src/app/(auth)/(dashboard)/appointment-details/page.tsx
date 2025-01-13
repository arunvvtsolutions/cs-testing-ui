import { Box } from '@mui/material';
import React from 'react';

import AppointmentDetails from 'ui-component/dashboard/connect-to-mentor/mentor-appointment-details';
const AppointmentDetailsPage = () => {
  return (
    <Box className="dashBoard_Container">
      <AppointmentDetails />
    </Box>
  );
};

export default AppointmentDetailsPage;
