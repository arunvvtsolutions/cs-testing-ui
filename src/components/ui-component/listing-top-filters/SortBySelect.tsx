import React, { useState } from 'react';
import { Select, SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent
import { Box } from '@mui/system';

import { SortTxt, ListingFormControl, ListingMenuItem } from './styles';

interface SortOption {
  id: number;
  name: string;
  value: string;
}
interface SortBySelectProps {
  sortHandler: (ket: string) => void;
}

const SortBySelect: React.FC<SortBySelectProps> = ({ sortHandler }) => {
  const sortOptions: SortOption[] = [
    { id: 1, name: 'NIRF RANK', value: 'nirfRank' },
    { id: 2, name: 'CAMPUS', value: 'campusArea' },
    { id: 3, name: 'FEES', value: 'fees' },
    { id: 4, name: 'MEDIAN SALARY', value: 'medianSalary' },
    { id: 5, name: 'PLACEMENT', value: 'placements' }
  ];

  const [selectedOption, setSelectedOption] = useState<string>(sortOptions[0].value);

  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
    sortHandler(event.target.value);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }} data-test-id="listing-page-sortby">
        <SortTxt>Sort By</SortTxt>
        <ListingFormControl fullWidth>
          <Select value={selectedOption} onChange={handleOptionChange}>
            {sortOptions.map((sort, index) => (
              <ListingMenuItem key={sort.id} value={sort.value} data-test-id={`listing-page-sortby-${index}`}>
                {sort.name}
              </ListingMenuItem>
            ))}
          </Select>
        </ListingFormControl>
      </Box>
    </div>
  );
};

export default SortBySelect;
