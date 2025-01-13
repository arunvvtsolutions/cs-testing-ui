/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CompareInfoConstant } from '../../constants';

import infoStyles from '../../compareInfoStyles.module.css';
import { converYaxis } from 'utils';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
export interface IUgInfoProps {
  filledSeats: string;
  totalGraduates: string;
  totalPlaced: string;
  salary: number;
}

export interface IUgInfoDataProps extends IErrorProps {
  ugInfo: IUgInfoProps[];
}
const UgInfo: FC<IUgInfoDataProps> = ({ ugInfo, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [ugInfoState, setUgInfo] = useState<IUgInfoProps[]>([...ugInfo]);
  useEffect(() => {
    if (isMdDown) {
      setUgInfo([...ugInfo.slice(0, 2)]);
    } else setUgInfo([...ugInfo]);
  }, [isMdDown, ugInfo]);
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        ugInfoState.some((ugData) => ugData.filledSeats || ugData.salary || ugData.totalGraduates || ugData.totalPlaced) && 
          <Box className={infoStyles.clgInfoCard}>
            <Box className={infoStyles.CompareInfoHead}>
              <Typography variant="h3">{CompareInfoConstant.UG}</Typography>
            </Box>
            <Box className={infoStyles.InfoCard}>
              <Box className={infoStyles.cardRow}>
                {ugInfoState.map((ugInfo, index) => {
                  return (
                    <Box className={infoStyles.cardColumn} key={index}>
                      <Box className={infoStyles.cardColumnBlock}>
                        <Typography
                          variant="h5"
                          className={infoStyles.cardColumnH5}
                        >
                          {ugInfo.filledSeats  || 'N/A'}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={infoStyles.cardColumnPara}
                        >
                          {CompareInfoConstant.FILLED_SEATS}
                        </Typography>
                      </Box>

                      <Box className={infoStyles.cardColumnBlock}>
                        <Typography
                          variant="h5"
                          className={infoStyles.cardColumnH5}
                        >
                          {ugInfo.totalGraduates   || 'N/A'}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={infoStyles.cardColumnPara}
                        >
                          {CompareInfoConstant.NO_STD_GRADUATED}
                        </Typography>
                      </Box>

                      <Box className={infoStyles.cardColumnBlock}>
                        <Typography
                          variant="h5"
                          className={infoStyles.cardColumnH5}
                        >
                          {ugInfo.totalPlaced  || 'N/A'}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={infoStyles.cardColumnPara}
                        >
                          {CompareInfoConstant.NO_STD_PLACED}
                        </Typography>
                      </Box>

                      <Box className={infoStyles.cardColumnBlock}>
                        <Typography
                          variant="h5"
                          className={infoStyles.cardColumnH5}
                        >
                          {converYaxis(ugInfo.salary)   || 'N/A'}
                        </Typography>
                        <Typography
                          variant="body1"
                          className={infoStyles.cardColumnPara}
                        >
                          {CompareInfoConstant.UG_SALARY}
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

export default UgInfo;
