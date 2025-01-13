/* eslint-disable prettier/prettier */
import { Box } from '@mui/system';
import React, { FC } from 'react';
import { Typography } from '@mui/material';

import infoStyles from '../../compareInfoStyles.module.css';
import {CompareInfoConstant} from '../../constants';
export interface IIprDataProps {
  publised: string;
  grantedIpr: string;
}
export interface IIprProps {
  iprData: IIprDataProps[];
}

const CompareInfoContent: FC<IIprProps> = ({ iprData }) => {
  return (
    <>
      <Box className={infoStyles.InfoCard}>
        <Box className={infoStyles.cardRow}>
          {iprData.map((ipr, index) => {
            return (
              <Box className={infoStyles.cardColumn} key={index}>
                <Box className={infoStyles.cardColumnBlock}>
                  <Typography variant="h5" className={infoStyles.cardColumnH5}>
                    {ipr.publised  || 'N/A'}
                  </Typography>
                  <Typography variant="body1" className={infoStyles.cardColumnPara}>
                    {CompareInfoConstant.PATENS_PUBLISHED}
                  </Typography>
                </Box>

                <Box className={infoStyles.cardColumnBlock}>
                  <Typography variant="h5" className={infoStyles.cardColumnH5}>
                    {ipr.grantedIpr  || 'N/A'}
                  </Typography>
                  <Typography variant="body1" className={infoStyles.cardColumnPara}>
                    {CompareInfoConstant.PATENS_GRANTED}
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
