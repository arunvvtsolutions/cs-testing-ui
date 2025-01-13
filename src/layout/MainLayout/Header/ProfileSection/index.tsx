/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  // Box,
  // Card,
  // CardContent,
  Chip,
  ListItem,
  MenuItem,
  Typography,
  useMediaQuery
  // ClickAwayListener,
  // Divider,
  // Grid,
  // InputAdornment,
  // List,
  // ListItemButton,
  // ListItemIcon,
  // ListItemText,
  // OutlinedInput,
  // Paper,
  // Popper,
  // Stack,
  // Switch,
  // Typography
} from '@mui/material';
import { capitalize } from 'lodash';
import { ChevronLeft, Menu } from '@mui/icons-material';
import Link from 'next/link';

import { DropMenuWrap, MainLinks } from '../MenuList/styles';
import { AuthenticationConstants } from '../../../../constants';

import { openDrawer } from 'store/slices/menu';
import { useDispatch, useSelector } from 'store';
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import { LAYOUT_CONST } from 'constant';

const ProfileSection = ({ hideMenuIcon }: { hideMenuIcon?: boolean }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different components and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef<any>(null);

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);
  const { user, logout } = useAuth();
  const { layout } = useConfig();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleClick = () => {
    setShowDropdown(true);
  };

  const handleClose = (menuName?: string) => {
    setShowDropdown(false);
    menuName === AuthenticationConstants.LOGOUT && logout();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: hideMenuIcon ? 'end' : 'space-between',
          width: '100%',
          alignItems: 'center'
        }}
      >
        {((layout === LAYOUT_CONST.VERTICAL_LAYOUT && drawerOpen) ||
          (layout === LAYOUT_CONST.VERTICAL_LAYOUT && matchDownMd && !drawerOpen)) &&
          !hideMenuIcon && (
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                overflow: 'hidden',
                borderRadius: '25px',
                transition: 'all .2s ease-in-out',
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#FFF',
                color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : '#000',
                '&:hover': {
                  background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : '#e6e8ec',
                  color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : '#606975'
                }
              }}
              onClick={() => dispatch(openDrawer(!drawerOpen))}
              color="inherit"
            >
              {/* <IconMenu2 stroke={1.5} size="20px" /> */}
              {drawerOpen ? <ChevronLeft /> : <Menu />}
            </Avatar>
          )}
        {hideMenuIcon ? (
          <ListItem
            onMouseEnter={handleClick}
            onMouseLeave={() => handleClose()}
            className="navRight"
            disablePadding
            sx={{ width: 'auto' }}
          >
            <MainLinks
              prefetch={false}
              href={``}
              id="engineering-colleges-menu-button"
              onClick={handleClick}
              sx={{ color: showDropdown ? '#0B6049' : '202124' }}
            >
              <Avatar src={user?.image}></Avatar>
            </MainLinks>

            {showDropdown && (
              <DropMenuWrap id="engineering-colleges-menu" role="menu">
                <MenuItem onClick={() => handleClose(AuthenticationConstants.LOGOUT)} disableRipple role="menuitem">
                  <Link href={'/'} prefetch={false}>
                    {AuthenticationConstants.LOGOUT}
                  </Link>
                </MenuItem>
              </DropMenuWrap>
            )}
          </ListItem>
        ) : (
          <Chip
            sx={{
              height: '45px',
              alignItems: 'center',
              borderRadius: '27px',
              transition: 'all .2s ease-in-out',
              justifyContent: 'center',
              marginLeft: 'auto',
              JustifyContent: 'flex-end',
              borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#fff !important',
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#fff !important',
              '&[aria-controls="menu-list-grow"], &:hover': {
                borderColor: '#fff !important',
                background: '#fff !important',
                color: theme.palette.primary.light,
                '& svg': {
                  stroke: theme.palette.primary.light
                }
              },
              '& .MuiChip-label': {
                lineHeight: 0
              }
            }}
            icon={
              <Avatar
                src={user?.image}
                sx={{
                  ...theme.typography.mediumAvatar,
                  margin: '0px!important',
                  cursor: 'pointer'
                }}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                color="inherit"
                alt="user-images"
              >
                {user && user.name && capitalize(user.name[0] || '')}
              </Avatar>
            }
            label={
              <Typography className="user_profile_name" textAlign="center">
                {user && capitalize(user.name || '')}
              </Typography>
            }
            variant="outlined"
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            aria-label="user-account"
            onClick={handleToggle}
            color="primary"
          />
        )}
      </Box>
    </>
  );
};

export default ProfileSection;
