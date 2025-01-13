import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';

interface IMenuProps {
  menuName: string;
  link: string;
}

const BasicMenu = ({
  menuData,
  anchorEl,
  handleClose
}: {
  menuData: IMenuProps[];
  anchorEl: null | HTMLElement;
  handleClose: (menu: string) => void;
}) => {
  const open = Boolean(anchorEl);

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {menuData.map((menu, index) => (
          <MenuItem onClick={() => handleClose(menu.menuName)} key={index} style={{ padding: ' 0px' }}>
            <Link style={{ width: '100%', padding: '8px 15px' }} href={`${menu.link}`}>
              {menu.menuName}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default BasicMenu;
