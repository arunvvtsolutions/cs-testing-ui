'use client';
import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import OverviewCard from '../../common/cards/overview';

import Admission, { IAdmissionProps } from './Admission';
import { AdmissionTitles } from './constant';

import MainCard from 'ui-component/MainCard';
import ErrorComponent from 'ui-component/error';

const InnerCollegeAdmission: React.FC<IAdmissionProps> = ({ admissionData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        admissionData &&
        admissionData.length !== 0 && (
          <Box data-test-id="overview-admission">
            <Box className="cardHead">
              <Typography className="cg_InnerTitleTxt">
                {admissionData[0]?.shortName} {AdmissionTitles.ADMISSION}
              </Typography>
            </Box>
            <MainCard>
              {/* {data send to overviewCard it is in common folder} */}
              <OverviewCard data={<Admission admissionData={admissionData} />} contentHeight="300px" />
            </MainCard>
          </Box>
        )
      )}
    </>
  );
};

export default InnerCollegeAdmission;
