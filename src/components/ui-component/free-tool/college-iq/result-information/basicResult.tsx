import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import styles from './styles.module.css';
import { BasicInfoContent } from './constant';

import { IResultProps } from '.';

const BasicResult = ({ resultData }: { resultData: IResultProps }) => {
  return (
    <Box className={styles.mainBox} data-test-id="freetool-cutoff">
      <Stack
        direction="row"
        className={styles.criteriaStack}
        sx={{ borderBottom: '0.5px solid #3c3c4326' }}
        data-test-id={`freetool-cutoff-${resultData.nirfRank}`}
      >
        <Typography className={styles.criteriaResult}>{resultData.nirfRank}</Typography>
        <Typography className={styles.criteriaTitle}>{BasicInfoContent.NIRFRANK}</Typography>
      </Stack>
      <Stack
        direction="row"
        className={styles.criteriaStack}
        sx={{ borderBottom: '0.5px solid #3c3c4326' }}
        data-test-id={`freetool-cutoff-${resultData.nirfScore}`}
      >
        <Typography className={styles.criteriaResult}>{resultData.nirfScore}</Typography>
        <Typography>{BasicInfoContent.NIRFSCORE}</Typography>
      </Stack>
      <Stack
        direction="row"
        className={styles.criteriaStack}
        sx={{ borderBottom: '0.5px solid #3c3c4326' }}
        data-test-id={`freetool-cutoff-${resultData.campusArea}`}
      >
        <Typography className={styles.criteriaResult}>{resultData.campusArea}</Typography>
        <Typography>{BasicInfoContent.CAMPUSAREA}</Typography>
      </Stack>
      <Stack
        direction="row"
        className={styles.criteriaStack}
        sx={{ borderBottom: '0.5px solid #3c3c4326' }}
        data-test-id={`freetool-cutoff-${resultData.establishedYear}`}
      >
        <Typography className={styles.criteriaResult}>{resultData.establishedYear}</Typography>
        <Typography>{BasicInfoContent.ESTABLISHEDYEAR}</Typography>
      </Stack>
      <Stack direction="row" className={styles.criteriaStack} data-test-id={`freetool-cutoff-${resultData.Ownership}`}>
        <Typography className={styles.criteriaResult}>{resultData.Ownership}</Typography>
        <Typography>{BasicInfoContent.OWNERSHIP}</Typography>
      </Stack>
    </Box>
  );
};

export default BasicResult;
