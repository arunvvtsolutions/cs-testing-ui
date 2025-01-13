import { Box } from '@mui/system';
import styled from '@mui/system/styled';
import { List, ListItem } from '@mui/material';
import Link from 'next/link';
import { BottomNavigationAction } from '@mui/material';

interface ScrollProps {
  scrolling: boolean;
}

export const MobileMenuWarp = styled(Box)<ScrollProps>(({ theme, scrolling }) => ({
  padding: '0px 10px',
  background: '#fff',
  zIndex: '9999',
  position: 'fixed',
  bottom: scrolling ? '0' : '-100px',
  left: '0px',
  width: '100%',
  boxShadow: '0px 10px 25px #000',
  transition: '0.3s'
}));

export const TabStrip = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px',
  color: '#11519C !important',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '28px',
  textTransform: 'capitalize',
  position: 'sticky',
  top: '0px',
  zIndex: '500',
  background: '#fff',
  marginBottom: '10px',
  borderBottom: '0.5px solid rgba(32, 33, 36, 0.20)'
}));

export const TabBody = styled(Box)(({ theme }) => ({
  padding: '0px 10px 65px',
  background: '#fff',
  height: '100vh',
  overflowY: 'auto'
}));
export const DrawerContent = styled(Box)(({ theme }) => ({
  maxHeight: '100vh !important'
}));

export const CustomBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  padding: '0px !important',
  color: '#000',
  '&.Mui-selected': {
    color: '#11519C'
  },
  span: {
    visibility: 'visible',
    fontSize: '10px'
  }
}));

//   mobile tab menu customized here
type MobileListTitleProps = {
  expanded: boolean;
};

export const MobileListTitle = styled(Box)<MobileListTitleProps>(({ theme, expanded }) => ({
  color: expanded ? '#000' : 'rgba(32, 33, 36, 0.70)',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '24px',
  marginBottom: '12px',
  textDecoration: 'none',
  textTransform: 'uppercase',
  [theme.breakpoints.down('md')]: {
    fontSize: '15px',
    marginBottom: '0px'
  }
}));

export const MobileListWarp = styled(List)(({ theme }) => ({
  padding: '10px 0px',
  [theme.breakpoints.down('md')]: {
    padding: '3px 0px'
  }
}));

export const MobileListItem = styled(ListItem)(({ theme }) => ({
  padding: '0px 0px',
  marginBottom: '6px',
  width: 'auto',
  [theme.breakpoints.down('md')]: {
    margin: '0px !important',
    padding: '3px 0px'
  }
}));

export const MobileLinks = styled(Link)(({ theme }) => ({
  color: ' rgba(32, 33, 36, 0.70)',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '20px',
  textDecoration: 'none !important',
  textTransform: 'capitalize',
  '&:hover': {
    color: '#0B6049'
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    marginBottom: '0px',
    marginTop: '0px',
    paddingRight: '10px'
  }
}));
