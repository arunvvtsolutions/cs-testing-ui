import { FormControl, MenuItem, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from '@mui/system/styled';

export const ContainerWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '1264px!important',
  margin: 'auto',
  padding: '0px 10px!important',
  [theme.breakpoints.down('md')]: {
    padding: ' 0px'
  }
}));

export const CountBx = styled(Box)(() => ({
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '140%',
  padding: '10px',
  textAlign: 'center',
  borderRadius: '4px',
  border: '1px solid #F4F5F7',
  background: '#F4F5F7',
  maxWidth: '143px',
  marginRight: '20px',
  whiteSpace: 'nowrap'
}));

export const SortTxt = styled(Typography)(({ theme }) => ({
  color: '#202124B2',
  fontFamily: 'inherit',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '140%',
  marginRight: '10px',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    marginRight: '8px'
  }
}));

export const TopFilterSec = styled(Box)(({ theme }) => ({
  padding: '20px 0px',
  marginBottom: '40px',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    padding: '10px 0px',
    marginBottom: '10px'
  }
}));

export const ListingFormControl = styled(FormControl)(() => ({
  marginRight: '10px',
  color: '#000'
}));

export const ListingMenuItem = styled(MenuItem)(() => ({
  cursor: 'pointer',
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '140%'
}));

export const ListingTextField = styled(TextField)(() => ({
  cursor: 'pointer',
  color: '#202124',
  fontFamily: 'inherit',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '140%'
}));

export const ListingSearchWarp = styled(TextField)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
}));

//mobile_top_filters_styling_is_below

export const MobTopFiltrWarp = styled(Box)(({ theme }) => ({
  padding: '10px 0px',
  width: '100%',
  borderTop: '1px solid #F5F5F7',
  borderBottom: '1px solid #F5F5F7',
  display: 'flex',
  background: '#fff',
  [theme.breakpoints.down('md')]: {
    padding: '10px 10px'
  }
}));

export const IconBx = styled(Box)(() => ({
  borderRadius: '4px',
  border: '1px solid #DFE1E6',
  background: 'rgba(223, 225, 230, 0.20)',
  padding: '10px 5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
interface FlotBxProps {
  filterOpen?: boolean;
}

export const FlotBx = styled(Box)<FlotBxProps>(({ filterOpen }) => ({
  position: 'absolute',
  top: '50%',
  right: '0px',
  background: '#fff',
  width: '100%',
  transform: 'translateY(-50%)',
  padding: '20px 30px 20px 10px',
  transition: '0.3s',
  display: filterOpen ? 'block' : 'none'
}));

export const Clsicn = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  right: '20px',
  width: '100%',
  transform: 'translate(-50%)'
}));
