/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
// import { MiniTxt } from "./styles";

const TopSortBy = () => {
  const [sort, setSort] = useState('Sort By');
  const [selectedOption, setSelectedOption] = useState('NIRF RANK');

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    setSort(event.target.value);
  };
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <h4 style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>{sort}</h4>
        <FormControl sx={{ marginRight: '10px' }}>
          <InputLabel>{sort}</InputLabel>
          <Select value={selectedOption} onChange={handleOptionChange}>
            <MenuItem value="nirf rank">NIRF RANK</MenuItem>
            <MenuItem value="acres">ACRES</MenuItem>
            <MenuItem value="fees">FEES</MenuItem>
            <MenuItem value="median salary">MEDIAN SALARY</MenuItem>
            <MenuItem value="placement">PLACEMENT</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default TopSortBy;
