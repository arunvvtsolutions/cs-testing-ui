import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

import styles from './cutoffResults.module.css';

import { ICutoffResultsProps } from './index';

import MainCard from 'ui-component/MainCard';

const CutoffResultTableMobile: React.FC<ICutoffResultsProps> = ({ cutoffResultsData }) => {
  return (
    <Box data-test-id="cutoff-results-mobile">
      {cutoffResultsData &&
        cutoffResultsData.results.map((rData) => (
          <MainCard key={rData.id} data-test-id={`results-mobile-rData-${rData.id}`}>
            <Typography className={styles.roundValue}>{rData.round}</Typography>
            <Box className={styles.mobileHeadingWraper}>
              <Typography className={`subHeadText ${styles.mobileTitle}`}>{rData.course}</Typography>
            </Box>
            <Divider />
            <Box className={styles.resultWraper}>
              {rData.closingRank &&
                rData.closingRank.map((yeardata, index) => (
                  <Box key={index} data-test-id={`results-mobile-yeardata-${rData.id}`}>
                    <Typography className={styles.resultKey}>{yeardata.rank}</Typography>
                    <Typography className={styles.resultValue}>{yeardata.year}</Typography>
                  </Box>
                ))}
            </Box>
          </MainCard>
        ))}
    </Box>
  );
};
export default CutoffResultTableMobile;
