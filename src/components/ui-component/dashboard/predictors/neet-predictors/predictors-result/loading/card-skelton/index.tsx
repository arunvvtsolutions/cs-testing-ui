import React from 'react';
import { Box, Divider, Skeleton, Stack } from '@mui/material';

import styles from '../../style.module.css';

const CardSkelton = () => {
  return (
    <Stack direction="column" spacing={2} className={styles.collegeCard} width="100%">
      <Box>
        <Skeleton width="80%" />
        <Box className={styles.subTxtBox}>
          <Skeleton width="40%" />
          <Box display="flex" flexDirection="row" className={styles.feesStructureBox}>
            <Skeleton width="40%" />
          </Box>
        </Box>
      </Box>
      <Divider className={styles.divider} />
      <Box className={styles.bottomBox}>
        <Skeleton variant="circular" width={75} height={40} className={`${styles.chip} `} sx={{ paddingX: 5 }} />
        <Skeleton
          variant="circular"
          width={75}
          height={40}
          className={`${styles.chip} ${styles.feesStructureChip}`}
          sx={{ border: 'none !important' }}
        />
        <Skeleton
          variant="circular"
          width={75}
          height={40}
          className={`${styles.chip}`}
          sx={{ border: 'none !important', ml: 2 }}
        />
      </Box>
    </Stack>
  );
};

export default CardSkelton;
