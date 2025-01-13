import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import { ListItem } from '@mui/material';

import { DropMenuWrap, MainLinks } from '../styles';
import { Streams, LandingConst } from '../../../../../constants';
const EngineeringLinklist = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleClick = () => {
    setShowDropdown(true);
  };

  const handleClose = () => {
    setShowDropdown(false);
  };

  return (
    <ListItem
      onMouseEnter={handleClick}
      onMouseLeave={handleClose}
      className="navRight"
      sx={{ display: 'none' }}
      disablePadding
    >
      <MainLinks
        prefetch={false}
        href="/engineering/top/10/iit/colleges-in-india"
        id="exams-colleges-menu-button"
        onClick={handleClick}
        sx={{ color: showDropdown ? '#0B6049' : '202124' }}
      >
        {Streams.EXAMS}
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
            <Link href="/engineering-exams" prefetch={false}>
              {LandingConst.ENGINEERING_EXAMS}
            </Link>
          </MenuItem>
        </DropMenuWrap>
      )}
    </ListItem>
  );
};
export default EngineeringLinklist;
