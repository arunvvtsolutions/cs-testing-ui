import { Grid, Typography, Box } from '@mui/material';
import React from 'react';

import styles from '../cutoff-clossingRank/cutoff.module.css';

import { ClossingRankContent } from './constant';

import MainCard from 'ui-component/MainCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
interface IClosingRank {
  round: string;
  value: number;
}
export interface IClosingRankProps {
  closingRank: IClosingRank[];
  year: number;
}
export interface IClosingRankDataProps extends IErrorProps {
  closingRankData: IClosingRankProps;
}
const CutoffClossingRank: React.FC<IClosingRankDataProps> = ({ closingRankData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        closingRankData?.closingRank.length > 0 && (
          <MainCard>
            <Box className={styles.closingRankHeaderBox}>
              <Typography className={styles.courseName}>
                {closingRankData.year} {ClossingRankContent.CLOSINGRANK_TITLE}
              </Typography>
            </Box>
            <Grid className={styles.closingRankGrid}>
              {closingRankData?.closingRank.map((rank, index) => {
                return (
                  <Box className={styles.closingRankBox} key={index}>
                    <Typography className={styles.closingRankCountText}>{rank.value}</Typography>
                    <Typography className={styles.closingRankSubTitle}>{rank.round}</Typography>
                  </Box>
                );
              })}
            </Grid>
          </MainCard>
        )
      )}
    </>
  );
};
export default CutoffClossingRank;
