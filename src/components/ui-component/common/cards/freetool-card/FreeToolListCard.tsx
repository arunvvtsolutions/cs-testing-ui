/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box } from '@mui/material';

import styles from './freeToolCard.module.css';
const FreeToolListCard = ({ children }: { children: any }) => {
  return <Box className={`${styles.FreeToolCard} ${styles.ListCard}`}>{children}</Box>;
};

export default FreeToolListCard;
