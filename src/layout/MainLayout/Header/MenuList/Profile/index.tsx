import { Avatar, Box, Button, Chip, Stack, Typography, useTheme } from '@mui/material';
import { capitalize } from 'lodash';
import dynamic from 'next/dynamic';
import React from 'react';

import { AuthenticationConstants } from '../../../../../constants';

import { API_BASE_URL } from 'config';
import { LAYOUT_CONST, USERMENUDATA } from 'constant';
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import { Api } from 'types/enums';
import BasicMenu from 'ui-component/common/basic-menu';
const Link = dynamic(() => import('next/link'));

const signInBtn = {
  background: {
    xs: 'transparent',
    sm: 'transparent',
    lg: '#091E44 !important'
  },
  boxShadow: 'none',
  minWidth: { xs: 'auto', sm: 'auto', lg: '90px' },
  padding: { xs: '0', sm: '0', lg: '7px 12px' },
  color: { xs: '#000', sm: '#000', lg: '#fff' },
  marginRight: '10px'
};

const signUpBtn = {
  background: {
    xs: 'transparent',
    sm: 'transparent',
    lg: '#DFE1E6 !important'
  },
  color: '#000',
  boxShadow: 'none',
  minWidth: { xs: 'auto', sm: 'auto', lg: '90px' },
  padding: { xs: '0', sm: '0', lg: '7px 12px' }
};

const Profile = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { onChangeLayout } = useConfig();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
  };

  const handlCloseMenu = (menuName: string) => {
    menuName === AuthenticationConstants.LOGOUT && logout();
    menuName === AuthenticationConstants.DASHBOARD && onChangeLayout(LAYOUT_CONST.VERTICAL_LAYOUT);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ marginLeft: 'auto' }}>
      {!isLoggedIn ? (
        <Stack spacing={1} direction="row">
          <Link href="/sign-in" prefetch={false}>
            <Button variant="contained" sx={signInBtn} className="hoverNoneMobile">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up" prefetch={false}>
            <Button variant="contained" sx={signUpBtn} className="hoverNoneMobile">
              Sign Up
            </Button>
          </Link>
        </Stack>
      ) : (
        <Stack
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
          component="button"
          onClick={(e) => handleClickMenu(e)}
          border="none"
          bgcolor="#FFF"
          sx={{ cursor: 'pointer' }}
        >
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

              '& .MuiChip-label': {
                lineHeight: 0
              }
            }}
            icon={
              <Avatar
                src={`${API_BASE_URL}/${Api.profileImage}/${user?.image}`}
                sx={{
                  ...theme.typography.mediumAvatar,
                  margin: '0px!important',
                  cursor: 'pointer'
                }}
                color="inherit"
                alt="user-images"
              >
                {user?.name && capitalize(user.name[0])}
              </Avatar>
            }
            label={
              <Typography className="user_profile_name" textAlign="center">
                {user && capitalize(user.name)}
              </Typography>
            }
            variant="outlined"
            aria-label="user-account"
            color="primary"
          />
          <BasicMenu anchorEl={anchorEl} menuData={USERMENUDATA} handleClose={handlCloseMenu} />
        </Stack>
      )}

      {/* <Submenu /> */}
    </Box>
  );
};

export default Profile;
