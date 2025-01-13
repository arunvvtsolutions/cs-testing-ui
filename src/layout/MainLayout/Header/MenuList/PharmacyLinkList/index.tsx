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
        href={`${MEDICAL_BASE_URL}/top/pharmacy/colleges-in-india`}
        onClick={handleClick}
        id="pharmacy-colleges-menu-button"
        sx={{ color: showDropdown ? '#0B6049' : '202124' }}
      >
        {Streams.PHARMACY}
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
        <DropMenuWrap id="Pharmacy-colleges-menu" role="menu">
          <MenuItem onClick={handleClose} disableRipple role="menuitem">
            <Link href={`${MEDICAL_BASE_URL}/top/10/government/pharmacy/colleges-in-india`} prefetch={false}>
              {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple role="menuitem">
            <Link href={`${MEDICAL_BASE_URL}/top/10/private/pharmacy/colleges-in-india`} prefetch={false}>
              {LandingConst.TOP_10_PRIVATE_COLLEGES}
            </Link>
          </MenuItem>
          {/* <MenuItem onClick={handleClose} disableRipple role="menuitem">
            <Link href={`${BASE_URL}/pharmacy/top/10/deemed/colleges-in-india`}>
              {LandingConst.Top_10_DEEMED_COLLEGES_IN_INDIA}
            </Link>
          </MenuItem> */}
        </DropMenuWrap>
      )}
    </ListItem>
  );
};
export default EngineeringLinklist;
