import { Box, Button } from '@mui/material';
import React from 'react';

import styles from './signUp.module.css';
import { SignUpContent } from './constant';

const ContinueBtn = () => {
  return (
    <Box>
      <Button className={styles.continueBtn} type="submit">
        {SignUpContent.CONTINUE_BTN}
      </Button>
    </Box>
  );
};

export default ContinueBtn;
