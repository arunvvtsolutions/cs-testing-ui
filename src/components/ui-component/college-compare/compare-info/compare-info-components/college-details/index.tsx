/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CompareInfoConstant } from '../../constants';
import infoStyles from '../../compareInfoStyles.module.css';
import ErrorComponent from 'ui-component/error';
import { IErrorProps } from 'types';
export interface ICollegeDetailsProps {
  ownership: string;
  estdYear: number;
  campus: string;
  Intake: string;
  totalFaculty: string;
}

export interface IDetailsDataProps extends IErrorProps {
  collegeDetailsData: ICollegeDetailsProps[];
}
const CollegeDetails: FC<IDetailsDataProps> = ({
  collegeDetailsData,
  hasError,
}) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [collegeDetailsState, setCollegeDetailsStateData] = useState<
    ICollegeDetailsProps[]
  >([...collegeDetailsData]);

  useEffect(() => {
    if (isMdDown) {
      setCollegeDetailsStateData([...collegeDetailsData.slice(0, 2)]);
    } else setCollegeDetailsStateData([...collegeDetailsData]);
  }, [isMdDown, collegeDetailsData]);
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        collegeDetailsState.length > 0 &&
        <Box className={infoStyles.clgInfoCard}>
          <Box className={infoStyles.CompareInfoHead}>
            <Typography variant="h3">
              {CompareInfoConstant.CLG_DETAILS}
            </Typography>
          </Box>
          <Box className={infoStyles.InfoCard}>
            <Box className={infoStyles.cardRow}>
              {collegeDetailsState.map((details, index) => {
                return (
                  <Box className={infoStyles.cardColumn} key={index}>
                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {details.estdYear || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.ESTD_YEAR}
                      </Typography>
                    </Box>
                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {details.ownership || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.OWNER_SHIP}
                      </Typography>
                    </Box>
                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {details.campus || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.CAMPUS_SIZE}
                      </Typography>
                    </Box>
                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {details.Intake || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.TOTAL_STD_INTAKE}
                      </Typography>
                    </Box>
                    <Box className={infoStyles.cardColumnBlock}>
                      <Typography
                        variant="h5"
                        className={infoStyles.cardColumnH5}
                      >
                        {details.totalFaculty || 'N/A'}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={infoStyles.cardColumnPara}
                      >
                        {CompareInfoConstant.TOTAL_FACULTY}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CollegeDetails;
