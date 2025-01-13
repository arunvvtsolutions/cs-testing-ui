import { Box } from '@mui/system';
import styled from '@mui/system/styled';
import Link from 'next/link';

export const DropMenuWrap = styled(Box)(({ theme }) => ({
  padding: '10px',
  boxShadow: '0px 10px 25px #7979793b',
  position: 'absolute',
  background: '#fff',
  top: '33px',
  borderRadius: '0px 0px 6px 6px',
  transition: '0.3s',
  '& li': {
    width: '100%',
    padding: '0px 0px '
  },
  '& li a': {
    width: '100%',
    padding: '10px 15px'
  }
}));

export const MainLinks = styled(Link)(({ theme }) => ({
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '28px',
  textAlign: 'center',
  padding: ' 6px 8px',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    color: '#0B6049'
  }
}));
