import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { Toolbar } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import GroupIcon from '@mui/icons-material/GroupOutlined';
import RateReviewIcon from '@mui/icons-material/RateReviewOutlined';
import QuizIcon from '@mui/icons-material/QuizOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';

import styles from './styles.module.css';

const drawerWidth = 302;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

export default function DashbordLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className={styles.dashbordAppbar}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: '#636369',
              marginRight: 5,
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            Dashbord Header will be here
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} style={{ zIndex: '9999' }}>
        <Divider />

        <Box className={open ? styles.topContentBox : styles.topContentBoxactive}>
          {open ? (
            <>
              <Link href="\" className="logo_Box">
                <Image src="/assets/images/logo.webp" alt="alt" width={100} height={100} />
              </Link>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </>
          ) : (
            <>
              <Link href="\" className="logo_Boxsmall">
                <Image src="/assets/images/logomini.webp" alt="alt" width={100} height={100} />
              </Link>
              <IconButton aria-label="open drawer" onClick={handleDrawerOpen} edge="start">
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Box>

        {open ? <h3 className={styles.dashTitle}>Main Menu</h3> : ' '}

        <List className={styles.dashbordUnoderList}>
          <ListItem className={styles.dashbordList}>
            <Link href="#" className={styles.dashbordLinks}>
              <DashboardIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <InboxIcon />
              </DashboardIcon>

              <ListItemText sx={{ opacity: open ? 1 : 0 }}>Dashboard</ListItemText>
            </Link>
          </ListItem>

          <ListItem className={styles.dashbordList} style={{ padding: '0px !important' }}>
            <Accordion
              className={styles.siderbarAccordiun}
              onChange={handleChange('panel1')}
              expanded={expanded === 'panel1' && open}
            >
              <AccordionSummary
                style={{ minHeight: '0px' }}
                expandIcon={<ExpandMoreIcon sx={{ display: open ? 'block' : 'none' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Link href="#" className={`${styles.dashbordLinks} ${styles.p0}`} style={{ padding: '0px !important' }}>
                  <ListAltIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      marginLeft: open ? '0px' : '10px'
                    }}
                  >
                    <InboxIcon />
                  </ListAltIcon>
                  <ListItemText sx={{ display: open ? 'block' : 'none' }}>Predictor</ListItemText>
                </Link>
              </AccordionSummary>
              <AccordionDetails>
                <Box className={styles.accordiunContent}>
                  <List className={`${styles.p0}`}>
                    <ListItem>
                      <Link href="#" className={`${styles.dashbordLinks} ${styles.p0} ${styles.accordiunInnerLink}`}>
                        <ListItemText sx={{ opacity: open ? 1 : 0 }}>JEE Predictor</ListItemText>
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link href="#" className={`${styles.dashbordLinks} ${styles.p0} ${styles.accordiunInnerLink}`}>
                        <ListItemText sx={{ opacity: open ? 1 : 0 }}>NEET Predictor</ListItemText>
                      </Link>
                    </ListItem>
                  </List>
                </Box>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        </List>

        <Divider />

        <List className={styles.dashbordUnoderList}>
          <ListItem className={styles.dashbordList}>
            <Link href="#" className={styles.dashbordLinks}>
              <FormatListBulletedIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <InboxIcon />
              </FormatListBulletedIcon>

              <ListItemText sx={{ opacity: open ? 1 : 0 }}>Short Listed College</ListItemText>
            </Link>
          </ListItem>

          <ListItem className={styles.dashbordList}>
            <Link href="#" className={styles.dashbordLinks}>
              <CompareArrowsIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <InboxIcon />
              </CompareArrowsIcon>

              <ListItemText sx={{ opacity: open ? 1 : 0 }}>Compare History</ListItemText>
            </Link>
          </ListItem>

          <ListItem className={styles.dashbordList}>
            <Link href="#" className={styles.dashbordLinks}>
              <GroupIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <InboxIcon />
              </GroupIcon>

              <ListItemText sx={{ opacity: open ? 1 : 0 }}>Connect To Mentor</ListItemText>
            </Link>
          </ListItem>

          <ListItem className={styles.dashbordList}>
            <Link href="#" className={styles.dashbordLinks}>
              <RateReviewIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <InboxIcon />
              </RateReviewIcon>

              <ListItemText sx={{ opacity: open ? 1 : 0 }}>Reviews</ListItemText>
            </Link>
          </ListItem>

          <ListItem className={styles.dashbordList}>
            <Link href="#" className={styles.dashbordLinks}>
              <QuizIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <InboxIcon />
              </QuizIcon>

              <ListItemText sx={{ opacity: open ? 1 : 0 }}>Question & Answer</ListItemText>
            </Link>
          </ListItem>
        </List>

        <Divider />

        <List className={styles.dashbordUnoderList}>
          <ListItem className={styles.dashbordList}>
            <Link href="#" className={styles.dashbordLinks}>
              <AccountCircleIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <InboxIcon />
              </AccountCircleIcon>

              <ListItemText sx={{ opacity: open ? 1 : 0 }}>My Account</ListItemText>
            </Link>
          </ListItem>

          <ListItem className={styles.dashbordList}>
            <Link href="#" className={styles.dashbordLinks}>
              <LogoutIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <InboxIcon />
              </LogoutIcon>

              <ListItemText sx={{ opacity: open ? 1 : 0 }}>Logout</ListItemText>
            </Link>
          </ListItem>
        </List>
      </Drawer>

      {/* siderbar_Drawer_ends_here */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {/* all the Dashbord main content will be here below */}
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
          velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
          scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
          lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam
          dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus
          sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod
          lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in.
          In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod
          elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere
          sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
        {/* all the Dashbord main content will be here below */}
      </Box>
    </Box>
  );
}
