import React, { useState, ChangeEvent, useEffect, useCallback } from 'react';
import { InputAdornment, IconButton, FormControl } from '@mui/material';
import Search from '@mui/icons-material/Search';
import { Box } from '@mui/system';

import { ListingTextField } from './styles';

// import { SearchMockData } from 'ui-component/home/banner-page/SearchMockData';
// import { ICollege } from 'types/college';
// import { filterSearch } from 'utils';

// interface DropdownSearchbarStyles {
//   [key: string]: string | Record<string, string>;
// }

interface SearchDropDownProps {
  searchText: string;
  setSearchText: (data: string) => void;
}

const ListingSearch: React.FC<SearchDropDownProps> = ({ searchText, setSearchText }) => {
  // const DropdownSearchbar: DropdownSearchbarStyles = {
  //   background: ' #fff',
  //   position: 'absolute',
  //   left: '0px',
  //   top: '52px',
  //   width: '100%',
  //   maxWidth: '100%',
  //   boxShadow: '0px 10px 25px #ccc',
  //   borderRadius: '4px',
  //   border: '1px solid #DFE1E6',
  //   overflowY: 'auto',
  //   padding: '0px 5px',
  //   maxHeight: { xs: '350px !important', sm: '190px', md: '200px' },
  //   zIndex: '500',
  //   scrollbarWidth: 'thin',
  //   scrollbarColor: '#ccc #eee',
  //   '&::-webkit-scrollbar': {
  //     width: '3px',
  //     backgroundColor: '#f1f1f1'
  //   },
  //   '&::-webkit-scrollbar-thumb': {
  //     backgroundColor: '#888',
  //     borderRadius: '3px'
  //   }
  // };
  // const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setInputValue(inputValue);
    // setShowDropdown(inputValue !== '');
  };

  // const handleOptionSelect = (option: string) => {
  //   setInputValue(option);
  //   // setShowDropdown(false);
  // };

  const setSearchTextCallback = useCallback(() => {
    setSearchText(inputValue);
  }, [setSearchText, inputValue]);

  useEffect(() => {
    setSearchTextCallback();
  }, [setSearchTextCallback]);

  // this is for the closing button which is in the parent
  useEffect(() => {
    if (!searchText) {
      setInputValue('');
      // setShowDropdown(false);
    }
  }, [searchText]);

  return (
    <Box data-test-id="listing-page-search">
      <Box sx={{ width: '100%', position: 'relative' }}>
        <FormControl sx={{ width: '100%', maxWidth: '100%' }}>
          <ListingTextField
            value={inputValue}
            sx={{
              width: '100%',
              '& input::placeholder': {
                color: '#000 !important'
              }
            }}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Search Your College"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton sx={{ padding: '0px', color: '#000' }} aria-label="search colleges">
                    <Search />
                  </IconButton>
                </InputAdornment>
              )
            }}
            data-test-id="listing-page-search-input"
          />
        </FormControl>
        {/* {showDropdown && count !== 0 && (
          <List sx={DropdownSearchbar}>
            {collegeData
              ?.filter((college) => filterSearch(college, searchText))
              ?.map((e, index) => (
                <ListItem key={index} onClick={() => handleOptionSelect(e.name)} sx={{ cursor: 'pointer' }}>
                  {e.name}
                </ListItem>
              ))}
          </List>
        )} */}
      </Box>
    </Box>
  );
};

export default ListingSearch;
