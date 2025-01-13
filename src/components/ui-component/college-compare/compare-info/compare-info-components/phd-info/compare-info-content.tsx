/* eslint-disable prettier/prettier */
import { Box } from '@mui/system';
import React, { FC } from 'react';
import { Typography } from '@mui/material';

import infoStyles from '../../compareInfoStyles.module.css';
import {CompareInfoConstant} from '../../constants';
export interface IPhdResultProps {
  pursuing: string;
  graduated: string;
}

interface IPhdResultDataProps {
  phdResult: IPhdResultProps[];
}

const CompareInfoContent: FC<IPhdResultDataProps> = ({ phdResult }) => {
  return (
    <>
      <Box className={infoStyles.InfoCard}>
        <Box className={infoStyles.cardRow}>
          {phdResult.map((result, index) => {
            return (
              <Box className={infoStyles.cardColumn} key={index}>
                <Box className={infoStyles.cardColumnBlock}>
                  <Typography variant="h5" className={infoStyles.cardColumnH5}>
                    {result.pursuing  || 'N/A'}
                  </Typography>
                  <Typography variant="body1" className={infoStyles.cardColumnPara}>
                    {CompareInfoConstant.PURSUING}
                  </Typography>
                </Box>

                <Box className={infoStyles.cardColumnBlock}>
                  <Typography variant="h5" className={infoStyles.cardColumnH5}>
                    {result.graduated  || 'N/A'}
                  </Typography>
                  <Typography variant="body1" className={infoStyles.cardColumnPara}>
                    {CompareInfoConstant.GRADUATED}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default CompareInfoContent;
