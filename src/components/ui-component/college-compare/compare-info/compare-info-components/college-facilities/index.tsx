/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CompareInfoConstant } from '../../constants';

import infoStyles from '../../compareInfoStyles.module.css';
import Image from 'next/image';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
export interface IFacultyProps {
  boysHostel: boolean;
  girlsHostel: boolean;
  library: boolean;
}

export interface IFacultyDataProps extends IErrorProps {
  facultyData: IFacultyProps[];
}
const CollegeFacilites: FC<IFacultyDataProps> = ({ facultyData, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [facultyDataState, setFacultyDataStateData] = useState<IFacultyProps[]>(
    [...facultyData]
  );
  useEffect(() => {
    if (isMdDown) {
      setFacultyDataStateData([...facultyData.slice(0, 2)]);
    } else setFacultyDataStateData([...facultyData]);
  }, [isMdDown, facultyData]);
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        facultyDataState.length > 0 && (
          <Box className={infoStyles.clgInfoCard}>
            <Box className={infoStyles.CompareInfoHead}>
              <Typography variant="h3">
                {CompareInfoConstant.CLG_FACILITIES}
              </Typography>
            </Box>
            <Box className={infoStyles.InfoCard}>
              <Box className={infoStyles.cardRow}>
                {facultyDataState.map((faculty, index) => {
                  return (
                    <Box className={infoStyles.cardColumn} key={index}>
                      <Box className={infoStyles.cardColumnBlock}>
                        <Box className={infoStyles.cardColumnBox}>
                          <Box className={infoStyles.tickIcn}>
                            {faculty.boysHostel ? (
                              <Image
                                src="/assets/images/icons/tick.svg"
                                alt="check"
                                width={40}
                                height={40}
                              />
                            ) : (
                              <Image
                                src="/assets/images/icons/cross.svg"
                                alt="check"
                                width={40}
                                height={40}
                              />
                            )}
                          </Box>

                          <Typography
                            variant="body1"
                            className={infoStyles.cardColumnPara}
                            textAlign={'center'}
                          >
                            {CompareInfoConstant.BOYS_HOSTEL}
                          </Typography>
                        </Box>
                      </Box>

                      <Box className={infoStyles.cardColumnBlock}>
                        <Box className={infoStyles.cardColumnBox}>
                          <Box className={infoStyles.tickIcn}>
                            {faculty.girlsHostel ? (
                              <Image
                                src="/assets/images/icons/tick.svg"
                                alt="check"
                                width={40}
                                height={40}
                              />
                            ) : (
                              <Image
                                src="/assets/images/icons/cross.svg"
                                alt="check"
                                width={40}
                                height={40}
                              />
                            )}
                          </Box>

                          <Typography
                            variant="body1"
                            className={infoStyles.cardColumnPara}
                            textAlign={'center'}
                          >
                            {CompareInfoConstant.GIRLS_HOSTEL}
                          </Typography>
                        </Box>
                      </Box>

                      <Box className={infoStyles.cardColumnBlock}>
                        <Box className={infoStyles.cardColumnBox}>
                          <Box className={infoStyles.tickIcn}>
                            {faculty.library ? (
                              <Image
                                src="/assets/images/icons/tick.svg"
                                alt="check"
                                width={40}
                                height={40}
                              />
                            ) : (
                              <Image
                                src="/assets/images/icons/cross.svg"
                                alt="check"
                                width={40}
                                height={40}
                              />
                            )}
                          </Box>

                          <Typography
                            variant="body1"
                            className={infoStyles.cardColumnPara}
                            textAlign={'center'}
                          >
                            {CompareInfoConstant.LIBRARY}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default CollegeFacilites;
