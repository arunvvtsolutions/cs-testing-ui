'use client';
import React, { useState, ChangeEvent, FC } from 'react';
import { TextField, InputAdornment, IconButton, List, ListItem, FormControl, Typography } from '@mui/material';
import Search from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import dynamic from 'next/dynamic';

const Link = dynamic(() => import('next/link'));

import { BannerPageContants } from './constant';

import { Stream, SubStream } from 'types';
import { ENGINEERING_BASE_URL, MEDICAL_BASE_URL } from 'config';
import { replaceSpecialChar } from 'utils';
export interface SearchCollegeData {
  id: number;
  name: string;
  url: string;
  shortName: string;
  shortUrl: string;
  logo: string;
  university: number;
  insType: string;
  type: string;
  year: number;
  state: string;
  city: string;
}

export interface ISearchDataProps {
  searchData: SearchCollegeData[];
  handleDrawerClose?: () => void;
}

const SearchBar: FC<ISearchDataProps> = ({ searchData, handleDrawerClose }) => {
  const DropdownSearchbar = {
    background: ' #fff',
    position: 'absolute',
    left: '0px',
    top: '52px',
    width: '100%',
    boxShadow: '0px 10px 25px #ccc',
    borderRadius: '0px 0px 8px 8px',
    overflowY: 'auto',
    padding: '0px 5px',
    maxHeight: { xs: '350px !important', sm: '190px', md: '200px' },
    zIndex: '500',
    scrollbarWidth: 'thin',
    scrollbarColor: '#ccc #eee',
    '&::-webkit-scrollbar': {
      width: '3px',
      backgroundColor: '#f1f1f1'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '3px'
    }
  };

  const CustomLInkStyle = {
    fontSize: '14px',
    color: '#202124'
  };

  const [filterData, setFilterData] = useState<SearchCollegeData[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputValue = e.target.value.toLowerCase();
    setSearchText(inputValue);
    setShowDropdown(inputValue !== '');

    const filteredData = searchData.filter(
      (e) =>
        replaceSpecialChar(e.name)?.includes(replaceSpecialChar(searchText)) ||
        replaceSpecialChar(e.city)?.includes(replaceSpecialChar(searchText)) ||
        replaceSpecialChar(e.state)?.includes(replaceSpecialChar(searchText)) ||
        replaceSpecialChar(e.shortName)?.includes(replaceSpecialChar(searchText))
    );
    setFilterData(filteredData);
  };

  const handleOptionSelect = (option: string) => {
    setSearchText(option);
    setShowDropdown(false);
  };

  return (
    <>
      <Box sx={{ width: '100%', position: 'relative' }}>
        <FormControl sx={{ width: '100%' }}>
          <TextField
            sx={{ width: '100%' }}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton sx={{ padding: '0px', color: '#000' }} aria-label="search colleges">
                    <Search />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </FormControl>
        {showDropdown && (
          <List sx={DropdownSearchbar}>
            {filterData.length > 0 ? (
              filterData?.map((e, index) => (
                <ListItem key={index} onClick={() => handleOptionSelect(e.name)}>
                  <Link
                    style={CustomLInkStyle}
                    onClick={handleDrawerClose}
                    href={`${
                      e?.type?.toLowerCase()?.includes(Stream.ENGINEERING) ||
                      e?.type?.toLowerCase()?.includes(SubStream.ARCHITECTURE)
                        ? ENGINEERING_BASE_URL
                        : MEDICAL_BASE_URL
                    }/${e.insType}/${e.shortUrl}/overview`}
                    prefetch={false}
                  >
                    {e.name}
                  </Link>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Typography>{BannerPageContants.NO_COLLEGES}</Typography>
              </ListItem>
            )}
          </List>
        )}
      </Box>
    </>
  );
};

export default SearchBar;
