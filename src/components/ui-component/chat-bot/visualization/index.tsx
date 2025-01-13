import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CodeIcon from '@mui/icons-material/Code';
import { Typography, useMediaQuery } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { VisualizationContents } from './constant';
import styles from './visualization.module.css';

import { useDispatch, useSelector } from 'store';
import { openChatDrawer, openVisualizationDrawer } from 'store/slices/menu';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start'
}));

export default function VisualizationRightDrawer({
  children,
  drawerContent,
  drawerWidth = 450
}: {
  children: React.ReactNode;
  drawerContent: React.ReactNode;
  drawerWidth?: number | string;
}) {
  const dispatch = useDispatch();
  const ChatDrawer = useSelector((state) => state.menu.chatDrawer);
  const [visualizationWidth, setVisualizationWidth] = React.useState<number | string>(drawerWidth);
  const isMobile = useMediaQuery('(max-width:1400px)');
  const visualizationDrawer = useSelector((state) => state.menu.visualizationDrawer);
  const [visualizationOpen, setVisualizationOpen] = React.useState(false);
  const targetRef = React.useRef<HTMLDivElement>(null);
  const handleDrawerClose = () => {
    dispatch(openVisualizationDrawer(!visualizationDrawer));
  };

  React.useEffect(() => {
    if (isMobile) {
      dispatch(openVisualizationDrawer(false));
      setVisualizationWidth('90%');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (visualizationDrawer !== visualizationOpen && isMobile) {
      setVisualizationOpen(!visualizationOpen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualizationDrawer]);

  const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open'
  })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: isMobile ? '0px' : -visualizationWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginRight: 0
    }),
    position: 'relative'
  }));

  return (
    <Box display={'flex'} flexDirection={isMobile ? 'column' : 'row'}>
      <Main open={visualizationDrawer} ref={targetRef}>
        {/* VISUALIZATION BUTTON BELOW */}
        <Box
          className={visualizationDrawer ? `${styles.visualizationBtn}` : `${styles.visualizationBtn} ${styles.active}`}
        >
          {!visualizationDrawer && <span>{VisualizationContents.TITLE}</span>}
          <Box className={styles.visualizationBtnIcn}>
            <IconButton onClick={handleDrawerClose}>
              <CodeIcon />
            </IconButton>
          </Box>
        </Box>
        {/* SIDEBAR BUTTON BELOW */}
        <Box className={ChatDrawer ? `${styles.sidebarBtn}` : `${styles.sidebarBtn} ${styles.active}`}>
          <Box className={styles.visualizationBtnIcn}>
            <IconButton onClick={() => dispatch(openChatDrawer(!ChatDrawer))}>
              <CodeIcon />
            </IconButton>
          </Box>
          {!ChatDrawer && <span>{VisualizationContents.SIDEBAR}</span>}
        </Box>
        {!isMobile && (
          <DrawerHeader
            className={styles.chatHeadingWrapper}
            sx={{
              position: 'sticky',
              top: '0px',
              zIndex: 88,
              background: '#eef2f6'
            }}
          >
            <Typography className={styles.chatHeading}>{VisualizationContents.CS_CHAT}</Typography>
          </DrawerHeader>
        )}
        {children}
      </Main>
      <Drawer
        sx={{
          width: '100%',
          maxWidth: '400px !Important',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: visualizationWidth
          }
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="right"
        open={isMobile ? visualizationOpen : visualizationDrawer}
        onClose={() => (isMobile ? setVisualizationOpen(false) : dispatch(openVisualizationDrawer(false)))}
      >
        <DrawerHeader>
          {isMobile && (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon className={styles.mobileCloseIcon} />
            </IconButton>
          )}
          <Typography className={styles.title}>{VisualizationContents.TITLE}</Typography>
        </DrawerHeader>
        <Divider />

        <Box className={styles.scrollContent} sx={{ overflowY: 'scroll', height: 'auto' }} key={'sidebar-content'}>
          {drawerContent}
        </Box>
      </Drawer>
    </Box>
  );
}
