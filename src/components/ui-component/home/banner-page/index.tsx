'use client';
import { Box } from '@mui/system';
import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { BannerWrapper, ContainerWrapper } from './styles';
import { HerominiTxt, ImgWrapper } from './styles';
import { SearchCollegeData } from './Searchbar';
import style from './style.module.css';
import { BannerPageContants } from './constant';
const SearchBar = dynamic(() => import('./Searchbar'));

const BannerLayout = ({ searchData }: { searchData: SearchCollegeData[] }) => {
  return (
    <>
      <BannerWrapper>
        <ContainerWrapper>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12} lg={6}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="h1" className="herominiTxt">
                  {BannerPageContants.COLLEGE_DECISION}
                </Typography>

                <HerominiTxt variant="body1">{BannerPageContants.BANNER_DESCRIPITION}</HerominiTxt>

                <SearchBar searchData={searchData} />

                {/* hidden for while  */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '20px'
                  }}
                >
                  <HerominiTxt
                    sx={{
                      color: '#202124B2  !important',
                      marginBottom: '0px !important',
                      fontWeight: '400',
                      fontSize: { xs: '14px', sm: '14px', lg: '14px' },
                      letterSpacing: '0.40px'
                    }}
                  >
                    {BannerPageContants.SEARCH}
                  </HerominiTxt>
                  {/* <CustomLink href="#">Click here</CustomLink> */}
                </Box>
                {/* hidden for while  */}
              </Box>
            </Grid>
            <Grid item sm={12} xs={12} lg={6}>
              <Box sx={{ paddingLeft: { xs: '0px', sm: '0px', lg: '60px' } }}>
                <Box className="image_warp_banner">
                  <ImgWrapper style={{ position: 'relative', background: 'transparent' }}>
                    <Image
                      src="/assets/images/heroimg.webp"
                      className={style.imgWrap}
                      fill
                      alt="placement"
                      loading="eager"
                      priority={true}
                      quality={70}
                    />
                  </ImgWrapper>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ContainerWrapper>
      </BannerWrapper>
    </>
  );
};

export default BannerLayout;
