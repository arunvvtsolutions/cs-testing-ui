import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';

import styles from './Recruiters.module.css';

import { IErrorProps } from 'types';

interface ITopRecruitersProps {
  id: number;
  title: string;
  image: string;
}

interface ITopCompaniesDataProps {
  shortName: string;
  topRecruiters: ITopRecruitersProps[];
}

export interface ICompaniesProps extends IErrorProps {
  topCompaniesData: ITopCompaniesDataProps;
}

const RecruiterItem: React.FC<ICompaniesProps> = ({ topCompaniesData }) => {
  return (
    <Grid container gap={2}>
      {topCompaniesData.topRecruiters.map((item: ITopRecruitersProps, index: number) => {
        return (
          <Box className={styles.imageContainter} key={index} data-test-id={`top-recruiters-${index}`}>
            <Box className={styles.imageWrapper}>
              <Image src={`/assets/images/recruiter/${item.image}`} alt={item.title} layout="fill" />
            </Box>
            <Typography className={styles.itemTitle}>{item.title}</Typography>
          </Box>
        );
      })}
    </Grid>
  );
};

export default RecruiterItem;
