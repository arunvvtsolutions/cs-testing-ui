'use client';
import { AppBar, Box, Container, CssBaseline, Toolbar, useTheme } from '@mui/material';
import React from 'react';

import DashbordNavbar from 'layout/MainLayout/Header/dashboardNav';
import useConfig from 'hooks/useConfig';
const MinimalHeader = ({ children, maxWidth = '1264px' }: { children: React.ReactNode; maxWidth?: string }) => {
  const { container } = useConfig();
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', position: 'relative', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Toolbar sx={{ p: '16px', maxWidth: maxWidth, width: '100%' }}>
          <DashbordNavbar mainLogo />
        </Toolbar>
      </AppBar>
      <Container maxWidth={container ? 'lg' : false} {...(!container && { sx: { px: { xs: 0 } } })}>
        {children}
      </Container>
    </Box>
  );
};

export default MinimalHeader;
