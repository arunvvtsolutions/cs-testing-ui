import React from 'react';
import { Autocomplete, FormControl, TextField } from '@mui/material';

import styles from '../style.module.css';
import { PREDICTOR_RESULT } from '../constant';

import { IErrorProps } from 'types';

export interface IQuotaProps extends IErrorProps {
  quotaData: IQuotaDataProps[];
}
export interface IQuotaDataProps {
  quotaId?: number;
  quotaName: string;
}

const QuotaSelector = ({
  quotaData,
  handleChange,
  selectedValue
}: {
  quotaData: IQuotaDataProps[];
  handleChange: (selectedValue: IQuotaDataProps) => void;
  selectedValue: IQuotaDataProps;
}) => {
  return (
    <FormControl fullWidth size="medium">
      <Autocomplete
        id="college"
        clearIcon={false}
        value={selectedValue}
        options={quotaData}
        getOptionLabel={(option) => option.quotaName}
        noOptionsText={PREDICTOR_RESULT.NO_QUOTA_FOUND}
        sx={{
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '0.5px solid #D4E0E8'
          },
          '& .MuiInputBase-input': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '85%',
            width: '100%'
          }
        }}
        onChange={(e, value) => value && handleChange(value)}
        data-test-id="dashboard-neet-predictor-quota"
        renderInput={(params) => (
          <TextField
            className={styles.customplaceholder}
            placeholder="Search Your College"
            {...params}
            sx={{
              fieldset: {
                border: '0.5px solid #D4E0E8',
                padding: '0'
              },
              '.MuiOutlinedInput-root': {
                padding: '6.5px !important'
              },
              '.MuiChip-root': {
                marginRight: '15px'
              }
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default QuotaSelector;
