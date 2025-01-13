import { List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import styled from '@mui/system/styled';
import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));

export const Footersec = styled(Box)(({ theme }) => ({
  display: 'block',
  background: '#091E44',
  padding: '60px 0px 0px',
  [theme.breakpoints.down('md')]: {
    padding: '30px 0px 0px'
  }
}));

export const Footerstrip = styled(Box)(({ theme }) => ({
  display: 'block',
  background: '#071B3F',
  padding: '25px 0px',
  [theme.breakpoints.down('lg')]: {
    padding: '30px 0px 85px'
  }
}));

export const FooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1264px',
  margin: 'auto',
  padding: '0px 10px'
}));

export const FooterListTitle = styled(Box)(({ theme }) => ({
  color: '#FFF',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '24px',
  textTransform: 'uppercase',
  marginBottom: '12px',
  textDecoration: 'none',
  [theme.breakpoints.down('md')]: {
    fontSize: '15px',
    marginBottom: '0px'
  }
}));

export const FooterList = styled(List)(({ theme }) => ({
  padding: '10px 0px',
  [theme.breakpoints.down('md')]: {
    padding: '3px 0px'
  }
}));

export const FooterListItem = styled(ListItem)(({ theme }) => ({
  padding: '0px 0px',
  marginBottom: '6px',
  width: 'auto',
  [theme.breakpoints.down('md')]: {
    margin: '0px !important',
    padding: '3px 0px'
  }
}));

export const FooterLinks = styled(Link)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.60)',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '24px',
  textDecoration: 'none !important',
  textTransform: 'capitalize',
  '&:hover': {
    color: '#17D3A1'
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    marginBottom: '0px',
    marginTop: '0px',
    paddingRight: '10px'
  }
}));
