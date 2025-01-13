import styled from '@mui/system/styled';
import { Box, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

const Link = dynamic(() => import('next/link'));

export const Section = styled(Box)(({ theme }) => ({
  padding: '60px 0px',
  background: '#FFf',
  [theme.breakpoints.down('sm')]: {
    padding: '30px 0px'
  }
}));

export const Container = styled(Box)(() => ({
  maxWidth: '1264px',
  padding: '0px 10px',
  display: 'block',
  backGround: '#FFF',
  margin: 'auto'
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: 'rgba(32, 33, 36, 0.70)',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '24px',
  maxWidth: '468px'
}));

export const MainBox = styled(Grid)(({ theme }) => ({
  flexShrink: '0',
  padding: '0 21px 0 0',
  [theme.breakpoints.down('md')]: {
    padding: '0 0 30px 0'
  }
}));

export const InnerMainBox = styled(Grid)(({ theme }) => ({
  padding: '30px',
  backgroundColor: 'rgba(17, 81, 156, 0.05)',
  minHeight: '300px',
  borderRadius: ' 8px',
  [theme.breakpoints.down('lg')]: {
    padding: '16px',
    height: '100%',
    minHeight: '0px'
  },
  [theme.breakpoints.down('md')]: {
    minHeight: '0px !important'
  },
  [theme.breakpoints.down('xl')]: {
    minHeight: '450px'
  }
}));

export const SubInnerHeading = styled(Box)(({ theme }) => ({
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '14px'
  }
}));

export const InnerHeading1 = styled(Typography)(({ theme }) => ({
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '26px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '39px',
  [theme.breakpoints.down('md')]: {
    fontSize: '24px'
  }
}));

export const InnerDescription1 = styled(Typography)(({ theme }) => ({
  color: 'rgba(32, 33, 36, 0.70)',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
  maxWidth: '548px',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const InnerHeading2 = styled(Typography)(({ theme }) => ({
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '26px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '39px',
  [theme.breakpoints.down('md')]: {
    fontSize: '24px'
  }
}));

export const InnerDescription2 = styled(Typography)(({ theme }) => ({
  color: ' rgba(32, 33, 36, 0.70)',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '24px',
  maxWidth: '496px',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const MainLink = styled(Link)(() => ({
  color: '#1452A4',
  fontFamily: 'inherit',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '400',
  textDecoration: 'none'
}));

export const LinkBox = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
}));

export const InsideLinkBox = styled(Box)(() => ({
  borderRadius: '4px',
  border: '1px solid #fff',
  background: '#fff',
  padding: '10px 13px',
  margin: '0px 12px 12px 0px'
}));
