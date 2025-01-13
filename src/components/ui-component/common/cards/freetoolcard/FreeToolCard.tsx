import React from 'react';
import { Box } from '@mui/material';

import styles from './freeToolCard.module.css';

const FreeToolCard = ({ children }: { children: React.ReactNode }) => {
  return <Box className={`${styles.FreeToolCard}`}>{children}</Box>;
};

export default FreeToolCard;
