import { Box } from '@mui/system';
import React from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import Grid from '@mui/material/Grid';
import Link from 'next/link';

import styles from '../DetailsModalstyles.module.css';
import { DetailModalTitles } from '../constant';

export interface IPrectorBannerProps {
  id: number;
  collegeName: string;
  city: string;
  state: string;
  image: string;
}

interface IPrectorBannerDataProps {
  bannerData: IPrectorBannerProps;
}
const PredictorModalBanner = ({ bannerData }: IPrectorBannerDataProps) => {
  return (
    <Box className={styles.bannerContent}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <Box className={styles.leftColContent}>
              {bannerData.image && (
                <Box className={styles.logoBx}>
                  <Image src={`/assets/images/cs/${bannerData.image}`} width={100} height={100} alt="" />
                </Box>
              )}

              <Box className={styles.contentBlock}>
                <Typography variant="h3">{bannerData.collegeName}</Typography>
                <Typography variant="h5">
                  {bannerData.city && `${bannerData.city},`} {bannerData.state}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12} display="none">
            <Link href={`/assets/brocherpdf/modal1.pdf`} download className={styles.brocherBtn}>
              <CloudDownloadOutlinedIcon />
              {DetailModalTitles.BROCHURE}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PredictorModalBanner;
