import { Box } from '@mui/material';
import React from 'react';

import GetyourCollegeComponent from 'ui-component/free-tool/kyc-medical/get-your-medical-college';
import { getMedicalCollegeData } from 'utils/api/get-your-college';

const GetYourCollegePage = async () => {
  const data = await getMedicalCollegeData();

  return (
    <Box className="dashBoard_Container">
      <GetyourCollegeComponent medicalCollegeData={data} />
    </Box>
  );
};

export default GetYourCollegePage;
