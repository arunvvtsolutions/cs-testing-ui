import React from 'react';
import { Grid, Stack } from '@mui/material';

import CardSkelton from './card-skelton';
import BannerLoading from './banner';
import FilterSkelton from './filter-skelton';

const Loading = () => {
  return (
    <Grid
      container
      spacing={2}
      width="100%"
      justifyContent="center"
      sx={{ padding: { xs: 0, sm: 3 }, marginLeft: '0px' }}
    >
      <Grid item xs={12} display="flex" justifyContent="center" sx={{ paddingLeft: '0px !important' }}>
        <BannerLoading />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="column" spacing={2} width="100%" maxWidth="700px" className="dashBoard_Container">
          <FilterSkelton />
          <CardSkelton />
          <CardSkelton />
          <CardSkelton />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Loading;
