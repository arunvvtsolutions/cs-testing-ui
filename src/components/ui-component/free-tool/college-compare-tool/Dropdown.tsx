import * as React from 'react';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Autocomplete, TextField } from '@mui/material';

import styles from './CollegeCompareTool.module.css';
import { CollegeCompareToolTitles } from './constant';

import { ICompareNameProps, IcompareToolProps } from './index';
export interface ICollegeNameProps extends IcompareToolProps {
  selectedColleges: string[];
}

const DropDown: React.FC<ICollegeNameProps> = ({ comparedToolData, onChange, selectedColleges }) => {
  const [shortName, setShortName] = useState('');

  const handleChange = (value: string) => {
    setShortName(value);
    onChange && onChange(value);
  };
  return (
    <FormControl className={styles.dropDownCard}>
      <Autocomplete
        className={`dashBoardListText ${styles.collegeNameSelect}`}
        onChange={(event, value) => value?.shortName && handleChange(value?.shortUrl)}
        options={comparedToolData}
        noOptionsText={CollegeCompareToolTitles.NO_OPTIONS}
        getOptionDisabled={(option: ICompareNameProps) =>
          selectedColleges.some((college) => college === option.shortUrl) ||
          (shortName === option.shortUrl && selectedColleges.length === 0)
        }
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" fullWidth placeholder={CollegeCompareToolTitles.PLACEHOLDER} />
        )}
      />
    </FormControl>
  );
};

export default DropDown;
