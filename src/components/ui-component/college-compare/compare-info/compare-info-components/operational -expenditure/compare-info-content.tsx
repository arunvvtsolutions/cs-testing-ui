/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Box } from '@mui/system';
import React, { FC } from 'react';
import { Typography } from '@mui/material';

import infoStyles from '../../compareInfoStyles.module.css';
import { CompareInfoConstant } from '../../constants';
import { converYaxis } from 'utils';

export interface IOperationalExpenditure {
  total: number;
  salaries: number;
  academicInfrastructure: number;
  seminar: number;
}

interface IOperationalExpenditureProps {
  operationalExpenditure: IOperationalExpenditure[];
}
const CompareInfoContent: FC<IOperationalExpenditureProps> = ({
  operationalExpenditure,
}) => {
  return (
    <>
      <Box className={infoStyles.InfoCard}>
        <Box className={infoStyles.cardRow}>
          {operationalExpenditure.map((expenditure, index) => {
            return (
              <Box className={infoStyles.cardColumn} key={index}>
                <Box className={infoStyles.cardColumnBlock}>
                  <Typography variant="h5" className={infoStyles.cardColumnH5}>
                    {converYaxis(expenditure.total) || 'N/A'}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={infoStyles.cardColumnPara}
                  >
                    {CompareInfoConstant.TOTAL}
                  </Typography>
                </Box>

                <Box className={infoStyles.cardColumnBlock}>
                  <Typography variant="h5" className={infoStyles.cardColumnH5}>
                    {converYaxis(expenditure.salaries) || 'N/A'}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={infoStyles.cardColumnPara}
                  >
                    {CompareInfoConstant.SALARIES}
                  </Typography>
                </Box>

                <Box className={infoStyles.cardColumnBlock}>
                  <Typography variant="h5" className={infoStyles.cardColumnH5}>
                    {converYaxis(expenditure.academicInfrastructure) || 'N/A'}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={infoStyles.cardColumnPara}
                  >
                    {CompareInfoConstant.MAINTENCE_ACADEMIC}
                  </Typography>
                </Box>

                <Box className={infoStyles.cardColumnBlock}>
                  <Typography variant="h5" className={infoStyles.cardColumnH5}>
                    {converYaxis(expenditure.seminar) || 'N/A'}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={infoStyles.cardColumnPara}
                  >
                    {CompareInfoConstant.SEMINARS_CONFERENCES_WORKSHOP}
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
