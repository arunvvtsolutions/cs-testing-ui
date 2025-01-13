import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Box } from '@mui/system';

import { NodataConst } from './constant';

// Create a custom theme
const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: '8px',
          margin: 'auto',
          width: '100%',
          BoxShadow: 'none',
          minHeight: '400px',
          padding: '20px',
          backgroundColor: '#fff'
        }
      }
    }
  }
});

const NoDataCard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardContent>
          <Box className="noDataImgbx">
            <Image src="/assets/images/icons/nodata.webp" alt="" width={300} height={300} />
            <Typography variant="h6" className="noDataTitle">
              {NodataConst.NO_DATA}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default NoDataCard;
