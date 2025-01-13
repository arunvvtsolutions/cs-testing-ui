/* eslint-disable prettier/prettier */
import styled from '@mui/system/styled';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
  maxWidth: '375px',
  width: '100%',
  marginLeft: 'auto',
  [theme.breakpoints.down('lg')]: {
    margin: 'auto',
    maxWidth: '100%',
  },
}));

export const Filter = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '9px 326px 9px 0px',
  alignItems: 'center',
  borderBottom: '1px solid #DFE1E6',
  position: 'relative',
  marginBottom: '20px',
}));

export const FilterText = styled(Typography)(({ theme }) => ({
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '140%',
}));

export const FilterContentbx = styled(Typography)(({ theme }) => ({
  display: 'flex',
  padding: '9px 326px 9px 0px',
  alignItems: 'center',
  borderBottom: '1px solid #DFE1E6',
  position: 'relative',
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const FilterBox = styled(Box)(({ theme }) => ({
  alignItems: 'center',
}));

export const FilterContent = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  padding: '6px 8px',
  width: 'auto',
  whiteSpace: 'nowrap',
  alignItems: 'center',
  height: 'auto',
  flexWrap: 'nowrap',
  borderRadius: '2px',
  border: '1px solid #DFE1E6',
  background: 'rgba(223, 225, 230, 0.20)',
  margin: '0px 6px 8px 0px ',
  position: 'relative',
}));

export const CloseBtn = styled(Box)(({ theme }) => ({
  width: '12px',
  height: '12px',
  color: '#202124',
  marginRight: '4px',
}));

export const ScrollContent = styled(Box)(({ theme }) => ({
  maxHeight: '283px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '2px',
  },
  '&::-webkit-scrollbar-track': {
    display: 'flex',
    width: '2px',
    paddingBottom: '0px',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: '0',
    borderradius: '8px',
    background: 'rgba(223, 225, 230, 0.50)',
  },
  '&::-webkit-scrollbar-track ': {
    backgroundColor: '#f1f1f1',
    width: '2px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ccc',
    borderradius: '8px',
    width: '2px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#EEE',
  },
}));

export const ScrollFilterContent = styled(Box)(({ theme }) => ({
  overflowY: 'auto',
  maxHeight: '80vh',
  '&::-webkit-scrollbar': {
    width: '0px',
  },
  '&::-webkit-scrollbar-track': {
    display: 'flex',
    width: '0',
  },
  '&::-webkit-scrollbar-track ': {
    width: '0',
  },
  '&::-webkit-scrollbar-thumb': {
    width: '0',
  },
}));

export const FilterTitle = styled(Typography)(({ theme }) => ({
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '140%',
}));
