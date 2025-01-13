import React from 'react';
import { Box } from '@mui/material';

import StateWiseCard from 'ui-component/dashboard/chatbot-agent/state-wise-card';
import SlideBanner from 'ui-component/dashboard/chatbot-agent/slide-banner/SlideBanner';
import { StateWiseTiles } from 'ui-component/dashboard/chatbot-agent/constant';
import { getBannerList } from 'utils/api/chatbot-agent';
import AgentHeader from 'ui-component/common/minimal-header';

const StateWise = async () => {
  const bannerData = await getBannerList();

  return (
    <>
      <Box
        width="100%"
        bgcolor="#EEF2F6"
        sx={{
          flexGrow: 1,
          padding: {
            xs: '80px 0px 0px',
            sm: '80px 0px 0px',
            md: '78px 0px 0px',
            lg: '78px 0px 0px'
          },
          margin: { xs: '0px', sm: '0px', md: '0px', lg: '0px' },
          boxSizing: 'border-box',
          background: '#fff !important',
          width: '100%'
        }}
      >
        <AgentHeader maxWidth="960px">
          <Box sx={{ maxWidth: '950px', margin: 'auto' }}>
            <SlideBanner {...bannerData} />
            <StateWiseCard title={StateWiseTiles.ALL_INDIA_QUOTA} />
            <StateWiseCard title={StateWiseTiles.STATE_WISE_QUOTA} />
          </Box>
        </AgentHeader>
      </Box>
    </>
  );
};

export default StateWise;
