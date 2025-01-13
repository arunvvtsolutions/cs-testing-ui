import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import { ListItem } from '@mui/material';

import { DropMenuWrap, MainLinks } from '../styles';
import { Streams, LandingConst } from '../../../../../constants';

import { ENGINEERING_BASE_URL } from 'config';

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
        href={`${ENGINEERING_BASE_URL}/top/architecture/colleges-in-india`}
        color="primary"
        id="architecture-colleges-menu-button"
        sx={{ color: showDropdown ? '#0B6049' : '202124' }}
      >
        {Streams.ARCHITECTURE}
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
        <DropMenuWrap id="engineering-colleges-menu" role="menu">
          <MenuItem onClick={handleClose} disableRipple role="menuitem">
            <Link href={`${ENGINEERING_BASE_URL}/top/10/iit/architecture/colleges-in-india`} prefetch={false}>
              {LandingConst.TOP_10_IIT_COLLEGES}
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple role="menuitem">
            <Link href={`${ENGINEERING_BASE_URL}/top/10/nit/architecture/colleges-in-india`} prefetch={false}>
              {LandingConst.TOP_10_NIT_COLLEGES}
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple role="menuitem">
            <Link href={`${ENGINEERING_BASE_URL}/top/10/government/architecture/colleges-in-india`} prefetch={false}>
              {LandingConst.TOP_10_GOVERNMENT_COLLEGES}
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple role="menuitem">
            <Link href={`${ENGINEERING_BASE_URL}/top/10/private/architecture/colleges-in-india`} prefetch={false}>
              {LandingConst.TOP_10_PRIVATE_COLLEGES}
            </Link>
          </MenuItem>
        </DropMenuWrap>
      )}
    </ListItem>
  );
};
export default EngineeringLinklist;
