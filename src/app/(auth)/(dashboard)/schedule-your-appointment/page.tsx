import { Box } from '@mui/material';
import React from 'react';

// import data from 'ui-component/dashboard/connect-to-mentor/schedule-appointment/scheduleData.json';
import ScheduleYourAppointment from 'ui-component/dashboard/connect-to-mentor/schedule-appointment';
import { getAvailableTime } from 'utils/api/connect-to-mentor';
const ScheduleYourAppointmentPage = async () => {
  const data = await getAvailableTime();
  return (
    <Box className="dashBoard_Container">
      <ScheduleYourAppointment {...data} />
    </Box>
  );
};

export default ScheduleYourAppointmentPage;
