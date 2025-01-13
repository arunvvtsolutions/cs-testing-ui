import { Box, Typography, styled } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import dynamic from 'next/dynamic';

const Link = dynamic(() => import('next/link'));

interface CardsProps {
  scroll?: boolean;
}

export const ContainerWrapper = styled(Box)(() => ({
  maxWidth: '1264px !important',
  padding: '0 10px',
  width: '100%',
  margin: '0px auto'
}));
export const ExploreSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#091E440D ',
  padding: '60px 0px',
  display: 'block',
  [theme.breakpoints.down('md')]: {
    padding: '30px 0px'
  }
}));

export const ExplorePara = styled(Typography)(({ theme }) => ({
  color: 'rgba(32, 33, 36, 0.70)',
  fontFamily: 'inherit',
  fontSize: '16px',
  letterSpacing: '0.5px',
  fontStyle: 'normal',
  fontWeight: '400',
  maxWidth: '468px',
  [theme.breakpoints.down('md')]: {
    Maxwidth: '90%'
  }
}));

export const Cards = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '8px',
  border: '1px solid #DFE1E6',
  minHeight: '425px',
  position: 'relative',
  padding: '30px',
  marginBottom: '0px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '500px',
    margin: 'auto'
  }
}));
export const CardTitle = styled(Typography)<CardsProps>(({ scroll, theme }) => ({
  display: scroll ? 'none' : 'block',
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: ' 33px',
  letterSpacing: '0.25px',
  textAlign: 'left',
  // padding:"30px 30px 0 30px",
  lineHeight: '36px',
  fontWeight: '500',
  marginBottom: '15px',
  [theme.breakpoints.down('md')]: {
    fontSize: '26px',
    lineHeight: '28px'
  }
}));

export const ButtonStyles = {
  textTransform: 'capitalize',
  display: 'flex',
  flexWrap: 'nowrap',
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)'
};

export const Buttons = styled(Button)<CardsProps>(({ scroll }) => ({
  textTransform: 'capitalize',
  display: 'flex',
  flexWrap: 'nowrap',
  position: 'absolute',
  bottom: scroll ? '52px' : ' 20px',
  left: scroll ? 'unset' : '50%',
  right: scroll ? '0px' : 'unset',
  transform: scroll ? 'translateX(-20px)' : 'translateX(-50%)',
  border: '1px solid #DFE1E6 ',
  margin: 'auto',
  borderRadius: '33px',
  padding: '13px',
  whiteSpace: 'nowrap',
  transition: '0.3s',
  minWidth: 'auto'
}));

export const ButtonBox = styled(Typography)<CardsProps>(({ scroll }) => ({
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontWeight: '400',
  marginRight: '10px',
  display: scroll ? 'none' : 'block'
}));

export const CardBox = styled(Box)<CardsProps>(({ scroll }) => ({
  overflowY: scroll ? 'scroll' : 'hidden',
  height: 250,
  '&::-webkit-scrollbar': {
    width: '4px'
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#0B6049'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#0B6049'
  }
}));

export const OrderList = styled(List)<CardsProps>(({ scroll }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: scroll ? 'column' : 'row',
  flexWrap: scroll ? 'nowrap' : 'wrap'
}));

export const LinkBox = styled(Link)(() => ({
  color: '#1452A4',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '32px',
  padding: '5px 3px',
  textDecoration: 'none',
  fontFamily: 'inherit'
}));
export const LinkItemsBox = styled(ListItem)(() => ({
  flexBasis: '50%',
  maxWidth: '50%',
  display: 'block'
}));
