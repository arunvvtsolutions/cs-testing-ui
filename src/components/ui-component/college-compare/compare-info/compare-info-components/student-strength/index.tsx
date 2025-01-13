/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CompareInfoConstant } from '../../constants';

import infoStyles from '../../compareInfoStyles.module.css';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface IStudentStrengthProps {
  totalStudents: string;
  boys: string;
  girls: string;
  withinstate: string;
  outsideState: string;
  outsideCountry: string;
  economicBackward: string;
  sociallyChallenged: string;
}

export interface IStrengthDataProps extends IErrorProps {
  studentStrengthData: IStudentStrengthProps[];
}

const StudentStrength: FC<IStrengthDataProps> = ({
  studentStrengthData,
  hasError,
}) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [studentStrengthDataState, setstudentStrengthDataStateData] = useState<
    IStudentStrengthProps[]
  >([...studentStrengthData]);
  useEffect(() => {
    if (isMdDown) {
      setstudentStrengthDataStateData([...studentStrengthData.slice(0, 2)]);
    } else setstudentStrengthDataStateData([...studentStrengthData]);
  }, [isMdDown, studentStrengthData]);

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <>
          <Box className={infoStyles.clgInfoCard}>
            <Box className={infoStyles.CompareInfoHead}>
              <Typography variant="h3">
                {CompareInfoConstant.STUDENT_STRENGTH}
              </Typography>
            </Box>
            <Box className={infoStyles.InfoCard}>
              <Box className={infoStyles.cardRow}>
                {studentStrengthDataState.map((studentStrength, index) => (
                  <Box className={infoStyles.cardColumn} key={index}>
                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {studentStrength.totalStudents || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.TTL_STUDENTS}
                      </Typography>
                    </Box>

                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {studentStrength.boys || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.BOYS}
                      </Typography>
                    </Box>

                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {studentStrength.girls || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.GIRLS}
                      </Typography>
                    </Box>

                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {studentStrength.withinstate || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.WITHIN_STATE}
                      </Typography>
                    </Box>

                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {studentStrength.outsideState || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.OUTSIDESTATE}
                      </Typography>
                    </Box>

                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {studentStrength.outsideCountry || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.OUTSIDECOUNTRY}
                      </Typography>
                    </Box>

                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {studentStrength.economicBackward || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.ECO_BACKWARD}
                      </Typography>
                    </Box>

                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {studentStrength.sociallyChallenged || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.SOCIAL_CHALLENGED}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default StudentStrength;
