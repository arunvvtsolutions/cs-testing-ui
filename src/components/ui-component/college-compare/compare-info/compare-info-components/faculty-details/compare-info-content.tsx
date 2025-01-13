import { Box } from '@mui/system';
import React from 'react';
import { Typography } from '@mui/material';

import infoStyles from '../../compareInfoStyles.module.css';

const CompareInfoContent = () => {
  return (
    <>
      <Box className={infoStyles.InfoCard}>
        <Box className={infoStyles.cardRow}>
          <Box className={infoStyles.cardColumn}>
            <Box className={infoStyles.cardColumnBlock}>
              <Typography variant="h5" className={infoStyles.cardColumnH5}>
                90.24
              </Typography>
              <Typography variant="body1" className={infoStyles.cardColumnPara}>
                2021
              </Typography>
            </Box>

            <Box className={infoStyles.cardColumnBlock}>
              <Typography variant="h5" className={infoStyles.cardColumnH5}>
                90.24
              </Typography>
              <Typography variant="body1" className={infoStyles.cardColumnPara}>
                2021
              </Typography>
            </Box>

            <Box className={infoStyles.cardColumnBlock}>
              <Typography variant="h5" className={infoStyles.cardColumnH5}>
                90.24
              </Typography>
              <Typography variant="body1" className={infoStyles.cardColumnPara}>
                2021
              </Typography>
            </Box>
          </Box>

          <Box className={infoStyles.cardColumn}>
            <Box className={infoStyles.cardColumnBlock}>
              <Typography variant="h5" className={infoStyles.cardColumnH5}>
                90.24
              </Typography>
              <Typography variant="body1" className={infoStyles.cardColumnPara}>
                2021
              </Typography>
            </Box>

            <Box className={infoStyles.cardColumnBlock}>
              <Typography variant="h5" className={infoStyles.cardColumnH5}>
                90.24
              </Typography>
              <Typography variant="body1" className={infoStyles.cardColumnPara}>
                Boys Hostel
              </Typography>
            </Box>

            <Box className={infoStyles.cardColumnBlock}>
              <Typography variant="h5" className={infoStyles.cardColumnH5}>
                90.24
              </Typography>
              <Typography variant="body1" className={infoStyles.cardColumnPara}>
                2021
              </Typography>
            </Box>
          </Box>

          <Box className={infoStyles.cardColumn}>
            <Box className={infoStyles.cardColumnBlock}>
              <Typography variant="h5" className={infoStyles.cardColumnH5}>
                90.24
              </Typography>
              <Typography variant="body1" className={infoStyles.cardColumnPara}>
                2021
              </Typography>
            </Box>

            <Box className={infoStyles.cardColumnBlock}>
              <Typography variant="h5" className={infoStyles.cardColumnH5}>
                90.24
              </Typography>
              <Typography variant="body1" className={infoStyles.cardColumnPara}>
                2021
              </Typography>
            </Box>

            <Box className={infoStyles.cardColumnBlock}>
              <Typography variant="h5" className={infoStyles.cardColumnH5}>
                90.24
              </Typography>
              <Typography variant="body1" className={infoStyles.cardColumnPara}>
                2021
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CompareInfoContent;
