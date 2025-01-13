/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useMemo, FC, ReactNode } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, AppBar, Box, CssBaseline, Toolbar, useMediaQuery, Tooltip } from '@mui/material';
// project imports
const Header = dynamic(() => import('./Header'));
const MobileMenu = dynamic(() => import('./Header/MobileTabMenu'));
const Footer = dynamic(() => import('./Footer'));
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import useConfig from 'hooks/useConfig';
import { BASE_URL } from 'config';
import useAuth from 'hooks/useAuth';

// assets

interface Props {
  children: ReactNode;
}

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout: FC<Props> = ({ children }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const asPath = usePathname();
  const segments = asPath?.split('/');
  const activePageName = segments?.[segments.length - 1];

  // const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));

  const { container } = useConfig();

  const header = useMemo(
    () => (
      <Toolbar sx={{ p: '10px' }}>
        <Header />
      </Toolbar>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const footer = useMemo(() => <Footer />, []);

  const mobileMenu = useMemo(() => <MobileMenu />, []);

  return (
    <>
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        {((activePageName && activePageName != 'course-fees') || !activePageName) && (
          <Tooltip title="NEET Chatbot">
            <Link href={`${BASE_URL}/${user?.chatbotAgent ? 'chat-bot' : 'agent-dashboard'}`} className="logoMiniBox">
              <Image
                src="/assets/images/chatbot-logo.svg"
                alt=""
                layout="fill"
                style={{ borderRadius: '60px' }}
                className="logoMiniStyle"
              />
            </Link>
          </Tooltip>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
          {/* mobile menu */}
          {matchDownLg && mobileMenu}

          <Box
            sx={{
              padding: {
                xs: '80px 0px 0px',
                sm: '80px 0px 0px',
                md: '78px 0px 0px',
                lg: '78px 0px 0px'
              },
              margin: { xs: '0px', sm: '0px', md: '0px', lg: '0px' },
              boxSizing: 'border-box',
              background: '#fff !important',
              width: '100%'
            }}
          >
            <Container maxWidth={container ? 'lg' : false} {...(!container && { sx: { px: { xs: 0 } } })}>
              {children}
            </Container>
          </Box>
          {/* footer */}
          {footer}
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
