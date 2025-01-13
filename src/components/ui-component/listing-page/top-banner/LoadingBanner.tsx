import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

import {
  BannerContainer,
  BannerSection,
  ToggleButton,
  BannerHeading,
  ImageGrid,
  HeadingGrid,
  ImageBox,
  EntireBox,
  ContentGrid,
  ContentBox,
  FlotContent,
  ButtonBox,
  ButtonText
} from './style';

const TopBannerSkeleton = () => {
  return (
    <BannerSection data-test-id="listing-page-top-banner-skeleton">
      <EntireBox showfulltext={false}>
        <BannerContainer showfulltext={false}>
          <Grid container>
            <HeadingGrid item container xs={12} lg={7} md={7}>
              <Box>
                <BannerHeading>
                  <Skeleton variant="text" width={350} height={60} animation="pulse" />
                </BannerHeading>
              </Box>
            </HeadingGrid>
            <ImageGrid item container xs={12} lg={5} md={5}>
              <ImageBox>
                <Skeleton variant="rectangular" width={300} height={200} animation="pulse" />
              </ImageBox>
            </ImageGrid>
          </Grid>
          <ContentGrid container showfulltext={false} border={'none'}>
            <ContentBox>
              <FlotContent showfulltext={false}>
                <Skeleton variant="text" width={1000} height={20} animation="pulse" />
                <Skeleton variant="text" width={800} height={20} animation="pulse" />
                <Skeleton variant="text" width={600} height={20} animation="pulse" />
                {/* Add more skeletons as needed */}
              </FlotContent>
              <ButtonBox showfulltext={false}>
                <ToggleButton showfulltext={false} data-test-id="listing-page-top-banner-readmore">
                  <ButtonText>
                    <Skeleton variant="text" width={80} height={20} />
                    <span>{/* <IconImage src={Arrow} alt="" showfulltext={false} /> */}</span>
                  </ButtonText>
                </ToggleButton>
              </ButtonBox>
            </ContentBox>
          </ContentGrid>
        </BannerContainer>
      </EntireBox>
    </BannerSection>
  );
};

export default TopBannerSkeleton;
