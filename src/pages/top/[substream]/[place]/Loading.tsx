import { Box, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import React from 'react';

import { ContainerWrapper } from 'ui-component/home/banner-page/styles';
import SkeletonCard from 'ui-component/listing-page/college-card/LoadingCard';
import SkeletonFilter from 'ui-component/listing-page/filter/LoadingFiter';
import TopBannerSkeleton from 'ui-component/listing-page/top-banner/LoadingBanner';

const Loading = () => {
  const theme = useTheme();
  const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <Box>
      <ContainerWrapper>
        {matchDownLg && (
          <Box
            sx={{
              position: 'sticky',
              top: '80px',
              background: '#fff',
              zIndex: '800'
            }}
          ></Box>
        )}
        <TopBannerSkeleton />
        <Grid container spacing={2}>
          <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
            <Box
              sx={{
                paddingRight: {
                  xl: '30px',
                  lg: '0px',
                  md: '0px',
                  sm: '0px',
                  xs: '0px'
                }
              }}
            >
              <SkeletonCard />
            </Box>
          </Grid>
          <Grid
            item
            xl={4}
            sx={{
              display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }
            }}
          >
            <Box className="stickySidebar">
              <SkeletonFilter />
              <SkeletonFilter />
              <SkeletonFilter />
              <SkeletonFilter />
              <SkeletonFilter />
            </Box>
          </Grid>
        </Grid>
      </ContainerWrapper>
    </Box>
  );
};
export default Loading;
