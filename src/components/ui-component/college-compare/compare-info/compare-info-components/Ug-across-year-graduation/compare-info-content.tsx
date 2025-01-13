import { Box } from '@mui/system';
import React, { FC } from 'react';
import { Typography } from '@mui/material';

import infoStyles from '../../compareInfoStyles.module.css';

export interface IUgGraduationDataProps {
  graduatepercent: string;
  year: string;
}

export interface IUgGraduationProps {
  data: IUgGraduationDataProps[];
}

export interface IUgGraduationResultDataProps {
  graduationData: IUgGraduationProps[];
}

const CompareInfoContent: FC<IUgGraduationResultDataProps> = ({ graduationData }) => {
  return (
    <>
      <Box className={infoStyles.InfoCard}>
        <Box className={infoStyles.cardRow}>
          {graduationData.map((data, index) => {
            return (
              <Box className={infoStyles.cardColumn} key={index}>
                {data.data.map((ugData, i) => {
                  return (
                    <Box className={infoStyles.cardColumnBlock} key={ugData.graduatepercent + i + index}>
                      <Typography variant="h5" className={infoStyles.cardColumnH5}>
                        {ugData.graduatepercent || 'N/A'}
                      </Typography>
                      <Typography variant="body1" className={infoStyles.cardColumnPara}>
                        {ugData.year || 'N/A'}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default CompareInfoContent;
