/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import infoStyles from '../../compareInfoStyles.module.css';
import { CollegeRankingConstants } from './constant';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface ICollegeRankingProps {
  nirfRank: number;
  nirfScore: string;
}

export interface IRankingDataProps extends IErrorProps {
  rankingData: ICollegeRankingProps[];
}
const CollegeRanking: FC<IRankingDataProps> = ({ rankingData, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [rankingDataState, setRankingData] = useState<ICollegeRankingProps[]>([
    ...rankingData,
  ]);

  useEffect(() => {
    if (isMdDown) {
      setRankingData([...rankingData.slice(0, 2)]);
    } else setRankingData([...rankingData]);
  }, [isMdDown, rankingData]);
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        rankingDataState.length > 0 &&
          <Box className={infoStyles.clgInfoCard}>
            <Box className={infoStyles.CompareInfoHead}>
              <Typography variant="h3">
                {CollegeRankingConstants.TITLE}
              </Typography>
            </Box>
            <Box className={infoStyles.InfoCard}>
              <Box className={infoStyles.cardRow}>
                {rankingDataState.map((e, index) => {
                  return (
                    <>
                      <Box className={infoStyles.cardColumn} key={index}>
                        <Box className={infoStyles.cardColumnBlock}>
                          <Typography
                            variant="h5"
                            className={infoStyles.cardColumnH5}
                          >
                            {e.nirfRank || 'N/A'}
                          </Typography>
                          <Typography
                            variant="body1"
                            className={infoStyles.cardColumnPara}
                          >
                            {CollegeRankingConstants.RANKED_BY_NIRF}
                          </Typography>
                        </Box>

                        <Box className={infoStyles.cardColumnBlock}>
                          <Typography
                            variant="h5"
                            className={infoStyles.cardColumnH5}
                          >
                            {e.nirfScore || 'N/A'}
                          </Typography>
                          <Typography
                            variant="body1"
                            className={infoStyles.cardColumnPara}
                          >
                            {CollegeRankingConstants.NIRF_SCORE}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  );
                })}
              </Box>
            </Box>
          </Box>
        
      )}
    </>
  );
};

export default CollegeRanking;
