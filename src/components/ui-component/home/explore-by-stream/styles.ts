import styled from '@mui/system/styled';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

const Link = dynamic(() => import('next/link'));
const Image = dynamic(() => import('next/image'));
export const MainBox = styled(Box)(({ theme }) => ({
  padding: '60px 0px',
  background: '#FFF',
  [theme.breakpoints.down('sm')]: {
    padding: '30px 0px'
  }
}));

export const CostomboxWraper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '0px -10px ',
  paddingTop: '10px',
  [theme.breakpoints.down('sm')]: {
    margin: '0'
  }
}));

export const CostomboxWrapCols = styled(Link)(({ theme }) => ({
  maxWidth: '20%',
  flexBasis: '20%',
  display: 'block',
  padding: '0px 10px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    flexBasis: '100%',
    borderRadius: '4px',
    marginBottom: '12px',
    border: '1px solid #DFE1E6',
    padding: '0'
  },
  [theme.breakpoints.between('sm', 'md')]: {
    maxWidth: '50%',
    flexBasis: '50%',
    marginBottom: '12px'
  },
  [theme.breakpoints.between('md', 'lg')]: {
    maxWidth: '25%',
    flexBasis: '25%',
    marginBottom: '12px'
  }
}));

export const ContainerWarp = styled(Box)(({ theme }) => ({
  maxWidth: '1264px',
  margin: 'auto',
  width: '100%',
  padding: ' 0px 10px!important',
  [theme.breakpoints.down('sm')]: {
    padding: '0px 10px'
  }
}));

export const TextLink = styled(Link)(({ theme }) => ({
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '30px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px'
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '16px',
    fontWeight: '500',
    paddingTop: '6px',
    lineHeight: '30px'
  }
}));

export const Collegestyle = styled(Typography)(({ theme }) => ({
  color: '#636466',
  fontFamily: 'inherit',
  fontSize: '12px !important',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '18px',
  [theme.breakpoints.between('sm', 'md')]: {
    paddingBottom: '6px'
  }
}));

export const HiddenBox = styled(Box)(() => ({
  display: 'flex',
  width: '30px',
  height: '30px',
  marginRight: '13px',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: '0',
  borderRadius: '16px',
  marginLeft: 'auto',
  marginBottom: 'auto',
  marginTop: 'auto',
  background: '#FBFBFB',
  '&:hover': {
    background: 'rgba(17, 81, 156, 0.3)'
  }
}));

export const SubBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  boxShadow: ' 4px 0px 40px 2px rgba(0, 0, 0, 0.05)',
  padding: '10px',
  borderRadius: '8px',
  [theme.breakpoints.down('sm')]: {
    borderRadius: '4px',
    padding: '0'
  }
}));

export const TextBox = styled(Box)(({ theme }) => ({
  marginLeft: '10px',
  marginTop: '3px',
  [theme.breakpoints.down('sm')]: {
    padding: '6px 0px'
  }
}));

export const Imagebox = styled(Box)(({ theme }) => ({
  marginRight: '15px',
  background: '#FBFBFB',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '53px',
  height: '58px',
  [theme.breakpoints.down('sm')]: {
    width: '44px',
    height: '44px',
    margin: '6px 7px'
  }
}));

export const CourseIcon = styled(Image)(({ theme }) => ({
  width: '40px',
  height: '40px',
  [theme.breakpoints.down('sm')]: {
    width: '24px',
    height: '24px'
  }
}));
