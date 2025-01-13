import React from 'react';
import Link from 'next/link';
import { Typography, Box } from '@mui/material';

import styles from './Blogs.module.css';

import { formatISODateAsDaysAgo } from 'utils';
import { IErrorProps } from 'types';

export interface ILatestBlogProps {
  title?: string;
  description?: string;
  url: string;
  addedDate: string;
}

interface IBlogData {
  shortName: string;
  latestBlogs: ILatestBlogProps[];
}

export interface IBlogProps extends IErrorProps {
  blogData: IBlogData;
}

const Blog: React.FC<IBlogProps> = ({ blogData }) => {
  return (
    <>
      {blogData.latestBlogs &&
        blogData.latestBlogs.map((blog, index) => (
          <Box className={styles.blogBox} key={index} data-test-id={`overview-blogs-${blog.title}`}>
            <Link className={styles.blogLink} href={blog.url}>
              {blog.title}
            </Link>
            <Typography className={styles.blogDate}>{formatISODateAsDaysAgo(blog.addedDate)}</Typography>
          </Box>
        ))}
    </>
  );
};

export default Blog;
