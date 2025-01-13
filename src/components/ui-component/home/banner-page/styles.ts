import { TabList, TabPanel } from '@mui/lab';
import { Tab, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from '@mui/system/styled';
import dynamic from 'next/dynamic';

const Link = dynamic(() => import('next/link'));

export const BannerWrapper = styled(Box)(({ theme }) => ({
  padding: '135px 0px 60px',
  backgroundColor: '#E6E8EC',
  [theme.breakpoints.down('lg')]: {
    padding: '290px 0px 60px'
  },
  [theme.breakpoints.down('md')]: {
    padding: '100px 0px 30px'
  }
}));

export const ContainerWrapper = styled(Box)(() => ({
  maxWidth: '1264px!important',
  margin: 'auto',
  padding: '0px 10px!important'
}));

export const ImgWrapper = styled(Box)(() => ({
  width: '100%',
  paddingTop: '80%',
  positionl: 'relative !important',
  display: 'block'
}));

export const HeroTitleTxt = styled(Typography)(({ theme }) => ({
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '59px',
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: '70px',
  marginBottom: '16px',
  letterSpacing: '-0.5px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '32px',
    lineHeight: '40px'
  }
}));

export const HerominiTxt = styled(Typography)(() => ({
  color: 'rgba(32, 33, 36, 0.7)',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  marginBottom: '20px',
  letterSpacing: '0.25px',
  lineHeight: '22px'
}));

export const linkconTxt = styled(Typography)(() => ({
  color: '#119D78',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: 'normal'
}));

export const CustomLink = styled(Link)(({ theme }) => ({
  color: '#000',
  fontFamily: 'inherit',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: 'normal',
  marginLeft: '10px',
  fontSize: '16px',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px'
  }
}));

// custome tab

export const CustomTabList = styled(TabList)(({ theme }) => ({
  background: 'rgba(245, 245, 245, 0.70)',
  marginBottom: '15px',
  borderBottom: '0px ',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .MuiTabs-scroller': {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'flex-start',
      borderBottom: '0px !important'
    }
  }
}));

export const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  color: '#202124b3',
  fontFamily: 'inherit !important',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  display: 'flex',
  padding: '10px 24px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  // maxHeight: '36px',
  minHeight: 0,
  borderRadius: '3px  ',
  letterSpacing: '0.4px',
  '&.Mui-selected': {
    color: '#202124',
    background: '#FFF',
    boxShadow: '0px 3px 8px 0px #0000001f, 0px 3px 1px 0px #0000000a',
    borderBottom: '0px !important'
  }
}));

export const CustomTabPanel = styled(TabPanel)(({ theme }) => ({
  background: '#f5f5f5b3'
}));
