import React from 'react';
import { Box, Typography, Avatar, Skeleton } from '@mui/material';

const VisualizationSkeleton = () => {
  return (
    <Box p={1}>
      <Box sx={{ display: 'flex', alignItems: 'center', paddingY: 1 }}>
        <Avatar src="/assets/images/logomini.webp" sx={{ width: 30, height: 30, marginRight: 1 }} />
        <Typography variant="body1">
          <Skeleton width={150} variant="rounded" />
        </Typography>
      </Box>
      <Box sx={{ background: '#f5f5f580', borderRadius: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={250} />
        <Box sx={{ paddingX: 1, paddingTop: 1 }}>
          <Skeleton sx={{ width: '80%' }} />
          <Skeleton sx={{ width: '60%' }} />
          <Skeleton sx={{ width: '70%' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default VisualizationSkeleton;
