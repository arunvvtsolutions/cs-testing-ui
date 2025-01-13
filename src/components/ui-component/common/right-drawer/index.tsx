import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import { Divider, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { styled } from '@mui/material/styles';

import { useDispatch, useSelector } from 'store';
import { openFilterDrawer } from 'store/slices/menu';

interface Props {
  children: React.ReactNode;
  window?: () => Window;
  drawerContent: React.ReactNode;
  title: string;
  fullWidth?: number;
  titlePadding?: string;
  titleWeight?: number;
  chatDrawer?: boolean;
  titleColor?: string;
  drawerVarient?: 'temporary' | 'persistent' | 'permanent';
  anchorValue?: 'top' | 'right' | 'bottom' | 'left';
}

let drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }),
  position: 'relative'
}));

const CustomeDrawer = ({
  children,
  window,
  drawerContent,
  title,
  fullWidth,
  titlePadding,
  titleWeight,
  chatDrawer,
  anchorValue,
  drawerVarient,
  titleColor
}: Props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.menu.filterDrawer);
  const container = window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    dispatch(openFilterDrawer(!isOpen));
  };

  drawerWidth = fullWidth || 300;

  const drawer = (
    <div style={{ height: '90vh', overflowY: 'auto' }}>
      <Box
        width="100%"
        sx={{
          position: 'sticky',
          display: 'flex',
          justifyContent: chatDrawer ? 'flex-start' : 'space-between',
          alignItems: 'center',
          padding: titlePadding || '16px 20px',
          borderRadius: '16px 16px 0px 0px'
        }}
      >
        {isOpen && chatDrawer && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              display: { lg: 'none  ' }
            }}
          >
            <NavigateBeforeIcon sx={{ color: 'rgba(22, 22, 24, 1)' }} />
          </IconButton>
        )}
        <Typography
          sx={{
            color: titleColor,
            fontSize: { xs: '16px', lg: '20px' },
            fontWeight: titleWeight || 500,
            lineHeight: '24px',
            textAlign: 'left'
          }}
        >
          {title}
        </Typography>
        {isOpen && !chatDrawer && (
          <IconButton onClick={handleDrawerToggle}>
            <Close />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ display: { lg: 'none' } }} />
      {drawerContent}
    </div>
  );
  return (
    <Box
      sx={{
        display: 'flex',
        width: { xs: '100%', lg: `calc(100% - ${drawerWidth}px)` }
      }}
    >
      <CssBaseline />
      <Box aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          anchor={anchorValue || 'bottom'}
          open={isOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              backgroundColor: {
                xs: chatDrawer ? '#FFF' : '#F5F6F8',
                md: '#FFF'
              },
              boxSizing: 'border-box',
              maxWidth: { xs: '100%', sm: chatDrawer ? '100%' : '843px' },
              width: { xs: '100%', sm: chatDrawer ? '100%' : '90%' },
              margin: 'auto',
              height: { xs: '100vh', sm: !chatDrawer ? '89vh' : '100vh' },
              borderRadius: {
                xs: '0',
                sm: !chatDrawer ? '16px 16px 0px 0px' : '0'
              }
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant={drawerVarient || 'permanent'}
          anchor={anchorValue || 'right'}
          sx={{
            display: { xs: 'none', md: 'none', lg: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '100%',
              maxWidth: drawerWidth,
              top: 0,
              border: 'none',
              paddingTop: { xs: 0, lg: '90px' },
              zIndex: 1200,
              maxHeight: '100vh',
              overflowY: 'auto'
            }
          }}
          open={isOpen}
        >
          <>
            {chatDrawer && (
              <Box
                position="absolute"
                marginRight={drawerWidth - 10}
                sx={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  border: '1px solid rgba(30, 30, 30, 0.15)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: '170px',
                  left: '-15px',
                  cursor: 'pointer'
                }}
              >
                <IconButton onClick={() => dispatch(openFilterDrawer(false))}>
                  <CodeRoundedIcon sx={{ width: '16px', height: '16px' }} />
                </IconButton>
              </Box>
            )}
            {drawer}
          </>
        </Drawer>
      </Box>
      <Main open={isOpen}>{children}</Main>
    </Box>
  );
};

export default CustomeDrawer;
