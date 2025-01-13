import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';

import GoogleIcon from '../../../../public/assets/images/icons/google.svg';

import styles from './signUp.module.css';

interface IBtnContentProps {
  btnContent: string;
}
const GoogleSignInBtn: React.FC<IBtnContentProps> = ({ btnContent }) => {
  return (
    <Box>
      <Button className={styles.gooleSignInBtn}>
        <Image src={GoogleIcon} alt="google" width={24} height={24} />
        <Typography className={styles.btnText}>{btnContent}</Typography>
      </Button>
    </Box>
  );
};
export default GoogleSignInBtn;
