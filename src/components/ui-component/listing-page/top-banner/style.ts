import styled from '@mui/system/styled';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';

interface ToggleButtonProps {
  showfulltext: boolean;
  scrolling?: boolean;
}

export const BannerSection = styled(Box)(({ theme }) => ({
  background: '#FFf',
  [theme.breakpoints.down('md')]: {
    padding: '0px',
    marginBottom: '20px'
  }
}));

export const BannerContainer = styled(Box)<ToggleButtonProps>(({ theme, showfulltext }) => ({
  maxWidth: '1264px',
  padding: '30px',
  background: '#F5F5F7',
  borderRadius: '32px',
  maxHeight: showfulltext ? '458px' : 'auto',
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    padding: '11px 10px 21px',
    borderRadius: '16px'
  }
}));

export const BannerHeading = styled(Typography)(({ theme }) => ({
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '42px',
  letterSpacing: '-0.5px',
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: '48px',
  [theme.breakpoints.down('md')]: {
    fontSize: '28px',
    lineHeight: '36px'
  },
  [theme.breakpoints.between('md', 'lg')]: {
    fontSize: '34px',
    lineHeight: '40px'
  }
}));

export const ImageGrid = styled(Grid)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

export const HeadingGrid = styled(Grid)(({ theme }) => ({
  marginTop: '32px',
  [theme.breakpoints.down('md')]: {
    marginTop: '0'
  }
}));

export const ContentGrid = styled(Grid)<ToggleButtonProps>(({ theme, showfulltext }) => ({
  padding: showfulltext ? '0px 24px 30px 24px' : '30px 24px 0px 24px',
  borderRadius: '8px',
  background: '#FFF',
  boxShadow: '4px 0px 16px 0px rgba(0, 0, 0, 0.04)',
  marginTop: '-73px',
  width: '95%',
  marginLeft: 'auto',
  marginRight: 'auto',
  opacity: '0.99',
  justifyContent: 'flex-end',
  position: 'relative',
  zIndex: '500',
  [theme.breakpoints.down('md')]: {
    marginTop: '21px',
    padding: showfulltext ? '0px 17px 18px 17px' : '18px 17px',
    justifyContent: 'center'
  }
}));

export const ButtonText = styled(Typography)(() => ({
  color: '#119D78',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '140%',
  position: 'relative'
}));

export const ToggleButton = styled(Button)<ToggleButtonProps>(({ showfulltext, theme }) => ({
  height: showfulltext ? '40px' : '0px',
  background: showfulltext ? '#fff' : 'transparent',
  boxShadow: showfulltext ? '0px 10px 35px #CCC' : 'none',
  padding: '10px 24px',
  borderRadius: showfulltext ? '8px' : '0px',
  '&:hover': {
    backgroundColor: showfulltext ? '#fff' : 'transparent',
    boxShadow: showfulltext ? '0px 10px 35px #CCC' : 'none'
  },
  [theme.breakpoints.down('md')]: {
    bottom: showfulltext ? 'auto' : '-10px',
    top: showfulltext ? '0px' : 'auto',
    marginBottom: '10px',
    width: showfulltext ? '48px' : 'auto',
    height: showfulltext ? '48px' : 'auto',
    padding: showfulltext ? '0px' : '10px 24px',
    minWidth: showfulltext ? '0px' : '64px',
    borderRadius: showfulltext ? '12px' : '0px'
  }
}));

export const ButtonBox = styled(Box)<ToggleButtonProps>(({ showfulltext, theme, scrolling }) => ({
  transform: showfulltext ? 'translateY(-50%)' : 'none',
  zIndex: showfulltext ? 9999 : 0,
  position: showfulltext ? 'sticky' : 'static',
  bottom: '0px',
  top: 'auto',
  minHeight: showfulltext ? '0px' : '50%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  opacity: showfulltext ? '1' : '0.90',
  background: showfulltext ? 'none' : '#FFF',
  [theme.breakpoints.down('md')]: {
    transform: showfulltext ? 'translateY(-10%)' : 'none',
    justifyContent: showfulltext ? 'end' : 'center',
    minHeight: showfulltext ? '0px' : 'auto',
    bottom: scrolling ? '0' : '50px',
    transition: '.3s'
  }
}));

export const ImageBox = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
}));

export const ContentBox = styled(Box)(() => ({
  position: 'relative',
  width: '100%'
}));

export const FlotContent = styled(Box)<ToggleButtonProps>(({ showfulltext, theme }) => ({
  height: showfulltext ? 'auto' : '120px',
  // overflow: showfulltext ? 'auto' : 'hidden',
  overflowY: showfulltext ? 'auto' : 'hidden',
  margin: 'auto',
  paddingTop: showfulltext ? '20px' : '0px',
  color: '#202124 !important',
  fontFamily: 'inherit',
  fontSize: '14px !important',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '19.6px',
  '&::-webkit-scrollbar': {
    width: '1px',
    height: '1px'
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#ccc'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#ccc'
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: '0px',
    paddingTop: showfulltext ? '10px' : '0px'
  }
}));

export const IconImage = styled(Image)<ToggleButtonProps>(({ showfulltext }) => ({
  justifyContent: 'center',
  position: 'absolute',
  transition: 'transform 0.3s ease',
  transform: showfulltext ? 'rotate(180deg)' : 'none'
}));

export const EntireBox = styled(Box)<ToggleButtonProps>(({ showfulltext, theme }) => ({
  marginBottom: '60px'
}));

export const TagButton = styled(Box)<ToggleButtonProps>(({ showfulltext, theme }) => ({
  transform: showfulltext ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: '0.3s ease-out',
  display: 'inline-block',
  marginLeft: '5px',
  [theme.breakpoints.down('md')]: {
    marginLeft: '0px'
  }
}));
