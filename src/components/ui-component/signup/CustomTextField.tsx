import React, { ChangeEvent } from 'react';
import { FormControl, TextField } from '@mui/material';

import styles from './signUp.module.css';
import { SignUpContent } from './constant';

// Props for the TextField component
interface IPlaceHolderProps {
  placeHolderData: string;
  value: string | number;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  type?: 'text' | 'number';
  id: string;
  helperText: boolean | string | undefined;
}

const CustomTextField: React.FC<IPlaceHolderProps> = ({
  placeHolderData,
  value,
  name,
  handleChange,
  error,
  helperText,
  id,
  type = 'text'
}) => {
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Use a regular expression to allow only numeric characters (0-9)
    const numericValue = value.replace(/[^0-9]/g, '');
    // Create an event object with 'target' property and call the 'handleChange' function
    const eventObject = {
      target: {
        id,
        name,
        value: name === 'mobile' ? numericValue : value
      }
    } as ChangeEvent<HTMLInputElement>;

    handleChange(eventObject);
  };
  return (
    <FormControl fullWidth error={Boolean(error)} className={styles.formControl}>
      <TextField
        placeholder={placeHolderData}
        className={styles.customplaceholder}
        type={type}
        InputProps={{
          classes: {
            input: styles['custom-input'],
            notchedOutline: styles['custom-fieldset']
          }
        }}
        value={value}
        onChange={handleInputChange}
        onKeyDown={(e) =>
          name === SignUpContent.MOBILE_NO_KEY && exceptThisSymbols.includes(e.key) && e.preventDefault()
        }
        name={name}
        error={error}
        helperText={helperText}
        id={id}
      />
    </FormControl>
  );
};

export default CustomTextField;
