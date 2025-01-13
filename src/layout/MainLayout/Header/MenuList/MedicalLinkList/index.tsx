import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import { ListItem } from '@mui/material';

import { DropMenuWrap, MainLinks } from '../styles';
import { Streams, LandingConst } from '../../../../../constants';

import { MEDICAL_BASE_URL } from 'config';
const EngineeringLinklist = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleClick = () => {
    setShowDropdown(true);
  };

  const handleClose = () => {
    setShowDropdown(false);
  };

  return (
    <ListItem onMouseEnter={handleClick} onMouseLeave={handleClose} className="navRight" disablePadding>
      <MainLinks
        prefetch={false}
        href={`${MEDICAL_BASE_URL}/top/medical/colleges-in-india`}
        id="medical-colleges-menu-button"
        onClick={handleClick}
        sx={{ color: showDropdown ? '#0B6049' : '202124' }}
      >
        {Streams.MEDICAL}
        <KeyboardArrowDownIcon
          sx={{
            color: showDropdown ? '#0B6049' : '202124',
            fontSize: '20px',
            marginLeft: '3px',
            transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: '0.3s'
          }}
        />
      </MainLinks>
      {showDropdown && (
        <DropMenuWrap id="medical-colleges-menu" role="menu">
          <MenuItem onClick={handleClose} disableRipple role="menuitem">
            <Link href={`${MEDICAL_BASE_URL}/top/10/government/medical/colleges-in-india`} prefetch={false}>
              {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple role="menuitem">
            <Link href={`${MEDICAL_BASE_URL}/top/10/private/medical/colleges-in-india`} prefetch={false}>
              {LandingConst.TOP_10_PRIVATE_COLLEGES}
            </Link>
          </MenuItem>
        </DropMenuWrap>
      )}
    </ListItem>
  );
};
export default EngineeringLinklist;
