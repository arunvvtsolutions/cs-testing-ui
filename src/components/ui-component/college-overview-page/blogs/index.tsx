'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';

import OverviewCard from '../../common/cards/overview';

import Blog, { IBlogProps } from './Blogs';
import { BlogContent } from './constants';

import MainCard from 'ui-component/MainCard';
import ErrorComponent from 'ui-component/error';

const InnerCollegeBlog: React.FC<IBlogProps> = ({ blogData, hasError }) => {
  return (
    // hidden for while
    <Box sx={{ display: 'none' }}>
      {hasError ? (
        <ErrorComponent />
      ) : (
        blogData.latestBlogs &&
        blogData.latestBlogs.length > 0 && (
          <Box data-test-id="overview-blogs">
            <Box className="cardHead">
              <Typography className="cg_InnerTitleTxt">
                {BlogContent.BLOG_TITLE} {blogData.shortName}
              </Typography>
            </Box>
            <MainCard title="" secondary="">
              {/* {data send to overviewCard it is in common folder} */}
              <OverviewCard data={<Blog blogData={blogData} />} contentHeight="100px" />
            </MainCard>
          </Box>
        )
      )}
    </Box>
  );
};

export default InnerCollegeBlog;
