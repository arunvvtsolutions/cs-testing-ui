import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import styles from '../DetailsModalstyles.module.css';

interface IPredictorBasicInfoCardProps {
  CardTitleTxt: string;
  CardMInTxt: string;
}
const PredictorBasicInfoCard: FC<IPredictorBasicInfoCardProps> = ({ CardTitleTxt, CardMInTxt }) => {
  return (
    <Box className={styles.basicInfoCards}>
      <Box className={styles.basicInfoCardsWrap}>
        <Typography variant="h3" className={styles.CardTitleTxt}>
          {CardTitleTxt}
        </Typography>
        <Typography variant="h5" className={styles.CardMInTxt}>
          {CardMInTxt}
        </Typography>
      </Box>
    </Box>
  );
};

export default PredictorBasicInfoCard;
