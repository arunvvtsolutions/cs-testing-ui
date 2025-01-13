import { Grid, Skeleton } from '@mui/material';
import React from 'react';

const FilterSkelton = () => {
  return (
    <Grid container spacing={3} width="100%" ml={0}>
      <Grid item md={8} xs={6} sx={{ paddingLeft: '0px !important' }}>
        <Skeleton variant="rounded" animation="wave" width="100%" height={50} sx={{ backgroundColor: '#FFFF' }} />
      </Grid>
      <Grid item md={4} xs={6}>
        <Skeleton variant="rounded" animation="wave" width="100%" height={50} sx={{ backgroundColor: '#FFFF' }} />
      </Grid>
    </Grid>
  );
};

export default FilterSkelton;
