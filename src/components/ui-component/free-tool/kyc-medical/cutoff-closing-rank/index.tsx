'use client';
import React from 'react';
import Grid from '@mui/material/Grid';
import { Box, List, ListItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import styles from './cutOffClosing.module.css';
import { CutoffClosingRankTitlle } from './constant';

import FreeToolListCard from 'ui-component/common/cards/freetool-card/FreeToolListCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

interface IClosingRankDatas {
  closingRank: number;
  round: string;
}

interface IClosingRankDatasProps {
  year: number;
  cutoffClosingRankData: IClosingRankDatas[];
}

export interface IClosingCutoffRankData extends IErrorProps {
  closingRankData: IClosingRankDatasProps;
  closingRankTitles?: string;
}

const CutoffClosingRank: React.FC<IClosingCutoffRankData> = ({ closingRankData, hasError, closingRankTitles }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        closingRankData.cutoffClosingRankData?.some((rank) => rank.closingRank && rank.round) && (
          <Box>
            <Typography variant="h3" className="dashBoard_h5">
              {closingRankTitles
                ? `${closingRankData.year} ${closingRankTitles}`
                : `${closingRankData.year}  ${CutoffClosingRankTitlle.TITLE}`}
            </Typography>
            {isLargeScreen ? (
              <FreeToolListCard>
                <List>
                  {closingRankData.cutoffClosingRankData?.map((rankData, index) => (
                    <ListItem key={index} className={styles.cardContent}>
                      <Typography className={styles.cardTitle}>{rankData.closingRank}</Typography>
                      <Typography className={styles.cardTitleSub}>{rankData.round}</Typography>
                    </ListItem>
                  ))}
                </List>
              </FreeToolListCard>
            ) : (
              <>
                <Grid container spacing={2}>
                  {closingRankData.cutoffClosingRankData?.map((rankData, index) => (
                    <Grid item xs={4} key={index}>
                      <Box className={styles.cardContent}>
                        <Typography className={styles.cardTitle}>{rankData.closingRank}</Typography>
                        <Typography className={styles.cardTitleSub}>{rankData.round}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        )
      )}
    </>
  );
};

export default CutoffClosingRank;
