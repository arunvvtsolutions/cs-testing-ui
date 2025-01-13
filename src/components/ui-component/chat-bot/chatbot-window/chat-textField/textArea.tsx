import * as React from 'react';
import { TextField, useMediaQuery } from '@mui/material';

import { CHATBOT_CONSTANTS } from '../constant';

interface ITextAreaProps {
  value: string;
  setValue: (value: string) => void;
  handleEnterBtn?: () => void;
}

const CustomeTextarea = ({ value, setValue, handleEnterBtn }: ITextAreaProps) => {
  const isLgDown = useMediaQuery('(max-width:1400px)');
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setValue(value + '\n');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleEnterBtn && value.trim() && handleEnterBtn();
    }
  };
  return (
    <TextField
      fullWidth
      multiline
      maxRows={7}
      autoFocus={!isLgDown}
      placeholder={CHATBOT_CONSTANTS.TEXTAREA_PLACEHOLDER}
      value={value}
      sx={{
        '& .MuiOutlinedInput-root': {
          background: 'transparent !important',
          border: 'none',
          '&.Mui-focused fieldset': {
            border: 'none'
          }
        },
        '& fieldset': {
          border: 'none',
          background: 'transparent !important'
        },
        '& .MuiInputBase-input': {
          background: 'transparent !important',
          '&::-webkit-scrollbar': {
            width: '1px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'transparent',
            borderRadius: '4px'
          }
        }
      }}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default CustomeTextarea;
