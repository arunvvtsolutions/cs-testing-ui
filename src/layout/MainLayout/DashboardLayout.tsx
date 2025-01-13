/* eslint-disable import/order */
'use client';
import { useEffect, useMemo, FC, ReactNode } from 'react';

// material-ui
import { styled, useTheme, Theme } from '@mui/material/styles';
import { Container, AppBar, Box, CssBaseline, Toolbar, useMediaQuery, Tooltip } from '@mui/material';

// project imports

import Sidebar from './Sidebar';

import useConfig from 'hooks/useConfig';
import { LAYOUT_CONST } from 'constant';
import { drawerWidth } from 'store/constant';
import { openDrawer } from 'store/slices/menu';
import { useDispatch, useSelector } from 'store';
import DashbordNavbar from './Header/dashboardNav';
import Link from 'next/link';
import Image from 'next/image';
import { BASE_URL } from 'config';

// assets

interface MainStyleProps {
  theme: Theme;
  open: boolean;
  layout: string;
}

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, layout }: MainStyleProps) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    ...(!open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter + 200
      }),
      [theme.breakpoints.up('md')]: {
        marginLeft: layout === LAYOUT_CONST.VERTICAL_LAYOUT ? -(drawerWidth - 72) : '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88
      }
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter + 200
      }),
      marginLeft: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? '20px' : 0,
      marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.up('md')]: {
        marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88
      }
    }),
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
      marginRight: '0px',
      padding: '0',
      marginTop: 88,
      ...(!open && {
        width: `calc(100% - ${drawerWidth}px)`
      })
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      marginRight: '0px',
      padding: '0',
      marginTop: 88,
      ...(!open && {
        width: `calc(100% - ${drawerWidth}px)`
      })
    }
  })
);

interface Props {
  children: ReactNode;
}

// ==============================|| MAIN LAYOUT ||============================== //

const DashboardLayout: FC<Props> = ({ children }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);
  const { drawerType, container, layout, onChangeLayout } = useConfig();

  useEffect(() => {
    if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
      dispatch(openDrawer(true));
    } else {
      dispatch(openDrawer(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerType]);

  useEffect(() => {
    if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
      dispatch(openDrawer(true));
    }
    onChangeLayout(LAYOUT_CONST.VERTICAL_LAYOUT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (matchDownMd) {
      dispatch(openDrawer(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  const condition = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd;

  const header = useMemo(
    () => (
      <Toolbar sx={{ p: condition ? '10px' : '16px' }}>
        <DashbordNavbar />
      </Toolbar>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [layout, matchDownMd]
  );

  return (
    <Box sx={{ display: 'flex', position: 'relative', minHeight: '100vh' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ bgcolor: theme.palette.background.default }}
      >
        {header}
      </AppBar>

      {/* horizontal menu-list bar */}

      {/* drawer */}
      <Sidebar />

      {/* main content */}
      <Main theme={theme} open={drawerOpen} layout={layout} sx={{ padding: 0 }}>
        <Container maxWidth={container ? 'lg' : false} {...(!container && { sx: { px: { xs: 0 } } })}>
          {/* breadcrumb */}
          {children}
        </Container>
      </Main>

      {/* Image in bottom right corner */}
      <Tooltip title="NEET Chatbot">
        <Link href={`${BASE_URL}/chat-bot`} className="logoMiniBox">
          <Image
            src="/assets/images/chatbot-logo.svg"
            alt=""
            layout="fill"
            style={{ borderRadius: '60px' }}
            className="logoMiniStyle"
          />
        </Link>
      </Tooltip>
    </Box>
  );
};

export default DashboardLayout;
