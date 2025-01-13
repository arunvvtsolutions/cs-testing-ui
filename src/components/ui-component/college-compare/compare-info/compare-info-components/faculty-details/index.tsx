/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { CompareInfoConstant } from '../../constants';

import infoStyles from '../../compareInfoStyles.module.css';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
import { CompareInfoTitles } from '../constant';
export interface IfacultyDetailsProps {
  totalFaculty: string;
  phdFacultyCount: string;
  studentRatio: string;
}

export interface IfacultyDataDetails extends IErrorProps {
  facultyDetails: IfacultyDetailsProps[];
}

const FacultyDetailsInfo: FC<IfacultyDataDetails> = ({
  facultyDetails,
  hasError,
}) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [facultyDataState, setFacultyData] = useState<IfacultyDetailsProps[]>([
    ...facultyDetails,
  ]);

  useEffect(() => {
    if (isMdDown) {
      setFacultyData([...facultyDetails.slice(0, 2)]);
    } else setFacultyData([...facultyDetails]);
  }, [isMdDown, facultyDetails]);
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        facultyDataState.length > 0 && (
          <Box className={infoStyles.clgInfoCard}>
            <Box className={infoStyles.CompareInfoHead}>
              <Typography variant="h3">
                {CompareInfoTitles.FACULTY_DETAILS}
              </Typography>
            </Box>
            <Box className={infoStyles.InfoCard}>
              <Box className={infoStyles.cardRow}>
                {facultyDataState.map((facultyDetails, index) => (
                  <Box className={infoStyles.cardColumn} key={index}>
                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {facultyDetails.totalFaculty || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.TOTAL_FACULTY_COUNT}
                      </Typography>
                    </Box>

                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {facultyDetails.phdFacultyCount || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.PHD_HOLDERS}
                      </Typography>
                    </Box>

                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {facultyDetails.studentRatio || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.FACULTY_STUDENT_RATIO}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default FacultyDetailsInfo;
