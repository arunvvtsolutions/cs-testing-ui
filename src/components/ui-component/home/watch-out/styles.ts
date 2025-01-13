import styled from '@mui/system/styled';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import dynamic from 'next/dynamic';

const Link = dynamic(() => import('next/link'));

export const Titlepara = styled(Typography)(({ theme }) => ({
  color: 'rgba(32, 33, 36, 0.70)',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px'
  }
}));

export const WatchNextTxt = styled(Typography)(({ theme }) => ({
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px'
  }
}));

export const LinkTitle = styled(Typography)(({ theme }) => ({
  color: '#202124',
  textAlign: 'left',
  fontFamily: 'inherit',
  fontSize: '14px',
  marginBottom: '10px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
  marginBotton: '3px',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px'
  }
}));

export const MiniLinkTxt = styled(Typography)(({ theme }) => ({
  color: 'rgba(32, 33, 36, 0.70)',
  fontFamily: 'inherit',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  textAlign: 'left'
}));

export const FrameBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  paddingTop: '56%',
  overflow: 'hidden',
  borderRadius: '0px',
  [theme.breakpoints.down('md')]: {
    borderRadius: '8px'
  }
}));
export const SelectedFrameBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  overflow: 'hidden',
  borderRadius: '0px',
  [theme.breakpoints.down('md')]: {
    borderRadius: '8px'
  }
}));
export const Secwrapper = styled(Box)(({ theme }) => ({
  padding: '60px 0px',
  background: '#FBFBFB',
  [theme.breakpoints.down('md')]: {
    padding: '30px 0px',
    maxWidth: '650px',
    margin: 'auto'
  }
}));

export const ContentWarpper = styled(Box)(({ theme }) => ({
  marginBottom: '45px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    marginBottom: '30px'
  }
}));

export const CoverBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px',
  borderBottom: '1px solid #DFE1E6'
}));

export const ContainerWarpper = styled(Typography)(({ theme }) => ({
  width: '100%',
  maxWidth: '1264px',
  margin: 'auto',
  padding: '0px 10px',
  display: 'block'
}));

export const iframeStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0px',
  left: '0px',
  objectFit: 'cover',
  border: '0 !important'
}));

export const MiniLink = styled(Link)(({ theme }) => ({
  color: '#1452A4',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '140%',
  textDecoration: 'none',
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    borderRadius: '8px',
    fontSize: '14px'
  }
}));

export const ScrollContent = styled(Box)(({ theme }) => ({
  padding: 0,
  listStyle: 'none',
  height: '290px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.1em'
  },
  '&::-webkit-scrollbar-track': {},
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#0B6049'
  },
  [theme.breakpoints.down('md')]: {
    height: '300px'
  }
}));
