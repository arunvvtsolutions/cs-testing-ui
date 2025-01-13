import React from 'react';
import { Box } from '@mui/material';

import InnerCollegeAdmission from 'ui-component/college-overview-page/admission';
import { IAdmissionProps } from 'ui-component/college-overview-page/admission/Admission';
import ErrorComponent from 'ui-component/error';

const AdmissionRequirementsComponent: React.FC<IAdmissionProps> = ({ admissionData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <>
          {admissionData && admissionData.length > 0 && (
            <Box data-test-id="admission-eligibility-requirments">
              <InnerCollegeAdmission admissionData={admissionData} />
            </Box>
          )}
        </>
      )}
    </>
  );
};
export default AdmissionRequirementsComponent;
