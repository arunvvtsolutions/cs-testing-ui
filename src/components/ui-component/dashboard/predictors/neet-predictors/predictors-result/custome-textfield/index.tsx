import React from 'react';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';

import styles from '../style.module.css';

const CusotomeDropDown = ({ handleChange }: { handleChange: (selectedValue: string) => void }) => {
  return (
    <FormControl fullWidth size="medium">
      <TextField
        onChange={(e) => handleChange(e.target.value)}
        size="small"
        className={styles.customplaceholder}
        placeholder="Search Your College"
        sx={{
          '.MuiOutlinedInput-root': {
            padding: '4.5px !important'
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              border: '0.5px solid #D4E0E8'
            }
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ ml: '14px' }}>
              <Image src="/assets/images/icons/search.svg" width={20} height={20} alt="Search-icon" />
            </InputAdornment>
          )
        }}
      />
    </FormControl>
  );
};

export default CusotomeDropDown;
