import { Autocomplete, Box, TextField } from '@mui/material';
import React from 'react';

export interface IDropDownProps {
  id?: number | string;
  label?: string | string;
  dependId?: number;
}

interface ICustomDropdownProps {
  placeholder: string;
  id: string;
  value: IDropDownProps | undefined | null;
  handleChange: (newValue: IDropDownProps | null) => void;
  dropDownData: IDropDownProps[];
}

const CustomDropdown: React.FC<ICustomDropdownProps> = ({ placeholder, id, value, handleChange, dropDownData }) => {
  return (
    <Box>
      <Autocomplete
        id={id}
        value={{ id: value?.id ?? 0, label: value?.label ?? '' }}
        options={dropDownData}
        data-test-id="neet-predictor-form-dropdown"
        onChange={(e, newValue) => handleChange(newValue)}
        fullWidth
        renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
      />
    </Box>
  );
};

export default CustomDropdown;
