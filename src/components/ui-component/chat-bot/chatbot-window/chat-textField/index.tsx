import { Box, Button } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';

import styles from '../style.module.css';

import CustomeTextarea from './textArea';

const ChatTextField = ({
  value,
  loading = false,
  setValue,
  handleAddNewQuestion
}: {
  value: string;
  loading: boolean;
  setValue: (value: string) => void;
  handleAddNewQuestion: () => void;
}) => {
  return (
    <Box
      position="relative"
      className={styles.textAreaBox}
      sx={{ paddingRight: { xs: '35px', lg: '16px !important' } }}
    >
      <CustomeTextarea value={value} setValue={setValue} handleEnterBtn={handleAddNewQuestion} />
      <Button
        variant="contained"
        className={`${styles.sendIcn} ${!value.trim() || loading ? styles.disable : ''}`}
        onClick={() => handleAddNewQuestion()}
        sx={{
          backgroundColor: '#148768 !important',
          ml: 2,
          color: '#FFF',
          '&.hover': { backgroundColor: '#148768 !important' }
        }}
      >
        <SendIcon />
      </Button>
    </Box>
  );
};

export default ChatTextField;
