import { Typography, Card } from '@mui/material';
import { Box } from '@mui/system';
import styled from '@mui/system/styled';
import Image from 'next/image';
import { Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { FormControlLabel } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';
import Link from 'next/link';

export const CollegesListingCard = styled(Card)(({ theme }) => ({
  width: '100%',
  // maxWidth: "750px",
  borderRadius: '8px',
  border: '1px solid #DFE1E6',
  padding: '16px',
  background: '#FFF',
  boxShadow: '16px 0px 64px 4px rgba(0, 0, 0, 0.04)',
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    padding: '12px 6px'
  }
}));
export const CardTop = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: '19px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '10px'
  }
}));
export const CardBody = styled(Box)(({ theme }) => ({
  marginTop: '17px',
  display: 'flex',
  flexWrap: 'wrap'
}));
export const CollegeDetailsLink = styled(Link)(() => ({
  borderRadius: '33px',
  background: '#F5F5F7',
  display: 'inline-flex',
  padding: ' 10px 12px',
  justifyContent: 'center',
  alignItems: ' center',
  alignContent: 'center',
  textDecoration: 'none',
  marginRight: '12px',
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '13px',
  fontWeight: ' 400',
  lineheight: '18.2px',
  textTransform: 'capitalize',
  whiteSpace: 'nowrap',
  '&:hover': {
    color: '#1452A4',
    backgroundColor: 'none'
  }
}));
export const CollegeName = styled(Link)(({ theme }) => ({
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '18px',
  letterSpacing: '0px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '28px',
  textTransform: 'capitalize',
  textDecoration: 'none',
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
    lineHeight: '22px',
    marginBottom: '10px',
    display: 'block'
  }
}));
export const CollegeCardDetails = styled(Typography)(() => ({
  color: '#626262',
  fontFamily: 'inherit',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '18px',
  textTransform: 'capitalize',
  marginRight: '10px'
}));
export const SpecialTag = styled(Box)(() => ({
  color: '#11519C',
  fontFamily: 'inherit',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '18px',
  textTransform: 'capitalize',
  textDecoration: 'none',
  display: 'block !important',
  marginLeft: '4px'
}));
export const CollegeNameBox = styled(Box)(({ theme }) => ({
  marginLeft: '16px',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
    lineHeight: '22px'
  }
}));
export const CollegeIcon = styled(Image)(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'center'
}));
export const TypographyTag = styled(Typography)(() => ({
  display: 'flex',
  fontSize: '12px',
  lineHeight: '18px',
  fontWeight: '400',
  marginRight: '8px'
}));
export const SubBoxTag = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap'
  }
}));
export const BoxTag = styled(Box)(({ theme }) => ({
  marginLeft: 'auto',
  [theme.breakpoints.down('sm')]: {
    marginTop: 'auto'
  }
}));
export const BodyBoxTag = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  // marginRight: "30px",
  [theme.breakpoints.down('sm')]: {
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      display: 'block',
      paddingBottom: '10px',
      borderBottom: ' 1px solid #E7E7E7;'
    }
  }
}));

export const FormItems = styled(FormControlLabel)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '13px',
  fontWeight: '400',
  marginLeft: 'auto',
  '&.MuiFormControlLabel-label': {
    color: 'rgba(32, 33, 36, 0.80)'
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '10px',
    marginBottom: '0px',
    marginLeft: '0px'
  }
}));
export const CustomBookmarkIcon = styled(BookmarkIcon)`
  color: #091e44;
`;
export const IconForCheckBox = styled(CheckIcon)(({ theme }) => ({
  fontSize: '18px',
  border: '1px solid #DFE1E6',
  width: '24px',
  height: '24px',
  backgroundColor: '#F5F5F7',
  fill: 'black'
}));
export const LoadButton = styled(Button)(({ theme }) => ({
  borderRadius: '4px',
  background: '#F5F5F7',
  display: 'block',
  margin: '0 auto',
  marginTop: '5px',
  padding: '13px 32px ',
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '22.4px',
  [theme.breakpoints.down('md')]: {
    marginTop: '20px'
  }
}));
export const MainBox = styled(Box)(({ theme }) => ({
  maxWidth: '100%',
  marginBottom: '40px'
}));
export const SubBox = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px'
}));
export const LineDivider = styled(Divider)(() => ({
  color: '#E7E7E7'
}));
