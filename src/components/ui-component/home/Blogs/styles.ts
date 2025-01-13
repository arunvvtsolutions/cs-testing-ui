import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';

const Link = dynamic(() => import('next/link'));
const Image = dynamic(() => import('next/image'));

export const Section = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFF',
  padding: '60px 0px',
  display: 'block',
  [theme.breakpoints.down('md')]: {
    padding: '30px 0px'
  }
}));
export const Container = styled(Box)(() => ({
  width: '100%',
  maxWidth: '1264px',
  margin: 'auto',
  padding: '0px 10px'
}));

export const Cards = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '4px',
  backgroundColor: ' #FFF',
  boxShadow: ' 6px 0px 64px 2px rgba(0, 0, 0, 0.05)',
  overflow: 'hidden'
}));

export const CardImage = styled(Box)(() => ({
  width: '100%',
  position: 'relative',
  paddingTop: '56%',
  display: 'block'
}));

export const BlogTitle = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  fontFamily: 'inherit',
  fontSize: '33px',
  fontWeight: '600',
  lineHeight: '50px',
  userSelect: 'none',
  [theme.breakpoints.down('md')]: {
    fontSize: '28px',
    marginBottom: '20px'
  }
}));
export const SwiperBox = styled(Box)(() => ({
  width: '100%',
  margin: 'auto',
  display: 'block',
  position: 'relative'
}));
export const CardTitles = styled(Box)(() => ({
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontWeight: '400',
  height: '67px',
  display: '-webkit-box',
  WebkitLineClamp: '3',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  marginBottom: '30px'
}));
export const CardBox = styled(Box)(() => ({
  padding: '16px'
}));
export const BlogImage = styled(Image)(() => ({
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}));
export const ArrowImage = styled(Link)(() => ({
  padding: '11px',
  backgroundColor: 'rgba(17, 81, 156, 0.05)',
  borderRadius: '25px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: '0.3s',
  '& .css-i4bv87-MuiSvgIcon-root': {
    verticalAlign: 'middle',
    display: 'inline-block',
    transition: '0.3s'
  },
  '&:hover': {
    transform: 'scale(0.95)',

    '& .css-i4bv87-MuiSvgIcon-root': {
      transform: 'rotate(360deg)'
    }
  }
}));

export const InnerCardBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  justifyContent: 'space-between'
}));

export const DateTxt = styled(Typography)(() => ({
  color: 'rgba(32, 33, 36, 0.70)',
  fontFamily: 'inherit',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal'
}));
