/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { Box } from '@mui/system';
import React, { FC } from 'react';
import { Typography } from '@mui/material';

import infoStyles from '../../compareInfoStyles.module.css';
import {CompareInfoConstant} from '../../constants';
import { converYaxis } from 'utils';

export interface ICapitalExpenditureData {
  total: number;
  library: number;
  newEquipments: number;
  workshops: number;
  creationofCapitalAssets: number;
}
export interface ICapitalExpenditureResult {
  capitalExpenditure: ICapitalExpenditureData[];
}
const CompareInfoContent: FC<ICapitalExpenditureResult> = ({ capitalExpenditure }) => {
  return (
    <>
      <Box className={infoStyles.InfoCard}>
        <Box className={infoStyles.cardRow}>
          {capitalExpenditure.map((expenditure, index) => {
            return (
              <Box className={infoStyles.cardColumn} key={index}>
                <Box className={infoStyles.cardColumnBlock}>
                  <Typography variant="h5" className={infoStyles.cardColumnH5}>
                    {converYaxis(expenditure.total)  || 'N/A'}
                  </Typography>
                  <Typography variant="body1" className={infoStyles.cardColumnPara}>
                    {CompareInfoConstant.TOTAL}
                  </Typography>
                </Box>

                <Box className={infoStyles.cardColumnBlock}>
                  <Typography variant="h5" className={infoStyles.cardColumnH5}>
                    {converYaxis(expenditure.library) || 'N/A'}
                  </Typography>
                  <Typography variant="body1" className={infoStyles.cardColumnPara}>
                    {CompareInfoConstant.LIBRARY}
                  </Typography>
                </Box>

                <Box className={infoStyles.cardColumnBlock}>
                  <Typography variant="h5" className={infoStyles.cardColumnH5}>
                    {converYaxis(expenditure.newEquipments) || 'N/A'}
                  </Typography>
                  <Typography variant="body1" className={infoStyles.cardColumnPara}>
                    {CompareInfoConstant.NEW_EQUIQMENT}
                  </Typography>
                </Box>

                <Box className={infoStyles.cardColumnBlock}>
                  <Typography variant="h5" className={infoStyles.cardColumnH5}>
                    {converYaxis(expenditure.workshops) || 'N/A'}
                  </Typography>
                  <Typography variant="body1" className={infoStyles.cardColumnPara}>
                    {CompareInfoConstant.ENG_WORKSHOP}
                  </Typography>
                </Box>

                <Box className={infoStyles.cardColumnBlock}>
                  <Typography variant="h5" className={infoStyles.cardColumnH5}>
                    {converYaxis(expenditure.creationofCapitalAssets) || 'N/A'}
                  </Typography>
                  <Typography variant="body1" className={infoStyles.cardColumnPara}>
                   {CompareInfoConstant.CREATION_CAPTIAL_ASSETS}
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
