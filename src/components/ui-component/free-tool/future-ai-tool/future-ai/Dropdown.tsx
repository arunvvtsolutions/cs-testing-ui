import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import { Autocomplete, TextField } from '@mui/material';

import styles from './FutureAiTool.module.css';

import { IDropDownDataProps } from 'types';

interface IFormikDataProps {
  collegeId: number;
  courseId: number;
  seatId: number;
}

export interface ICollegeNameProps {
  comparedToolData: IDropDownDataProps[];
  onChange: (data: IDropDownDataProps) => void;
  placeholder: string;
  handleFormik: ({ collegeId, courseId, seatId }: IFormikDataProps) => void;
  type: string;
  values: IFormikDataProps;
  selectedValue: IDropDownDataProps;
}

const DropDown: React.FC<ICollegeNameProps> = ({ comparedToolData, onChange, placeholder, selectedValue }) => {
  return (
    <FormControl className={styles.dropDownCard}>
      <Autocomplete
        disablePortal
        options={comparedToolData}
        fullWidth
        value={selectedValue}
        onChange={(e, newValue) => newValue?.id && onChange(newValue)}
        disableClearable
        renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
      />
    </FormControl>
  );
};

export default DropDown;
