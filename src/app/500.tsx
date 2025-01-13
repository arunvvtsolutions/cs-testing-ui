import { ReactElement } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

// assets

const imageBackground = '/assets/images/maintenance/img-error-bg.svg';
const imageDarkBackground = '/assets/images/maintenance/img-error-bg-dark.svg';
const imageBlue = '/assets/images/maintenance/img-error-blue.svg';
const imageText = '/assets/images/maintenance/img-error-text.svg';
const imagePurple = '/assets/images/maintenance/img-error-purple.svg';

// styles
const CardMediaWrapper = styled('div')({
  maxWidth: 720,
  margin: '0 auto',
  position: 'relative'
});

const ErrorWrapper = styled('div')({
  maxWidth: 350,
  margin: '0 auto',
  textAlign: 'center'
});

const ErrorCard = styled(Card)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const CardMediaBlock = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '3s bounce ease-in-out infinite'
});

const CardMediaBlue = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '15s wings ease-in-out infinite'
});

const CardMediaPurple = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '12s wings ease-in-out infinite'
});

// ==============================|| ERROR PAGE ||============================== //

const Error = () => {
  const theme = useTheme();

  return (
    <h1>hello</h1>
  );
};

Error.getLayout = function getLayout(page: ReactElement) {
  return <h2>error</h2>;
};

export default Error;
