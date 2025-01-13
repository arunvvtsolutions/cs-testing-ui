'use client';
import { FC } from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';

import GallerySection, { ICollegeImageProps } from './gallery-section';

import OtherColleges, { IOtherCollegeProps } from 'ui-component/college-overview-page/overview-sidebar';
import MainBanner, { IBannerProps } from 'ui-component/college-overview-page/banner';
import { ISubMenuProps } from 'ui-component/subheader';

export interface IPicturePageProps {
  data: {
    bannerData: IBannerProps;
    otherCollegeData: IOtherCollegeProps;
    collegeImagesData: ICollegeImageProps;
    subMenu: ISubMenuProps;
  };
}

const PictureComponent: FC<IPicturePageProps> = ({ data }) => {
  // const router = useRouter();
  // const { college, collegename } = router.query;
  const theme = useTheme();
  const matchDownlg = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <>
      <MainBanner {...data.bannerData} />
      <Grid container spacing={2}>
        <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
          <Box
            sx={{
              paddingRight: {
                xl: '30px',
                lg: '0px',
                md: '0px',
                sm: '0px',
                xs: '0px'
              }
            }}
          >
            <GallerySection {...data.collegeImagesData} />
            {matchDownlg && <OtherColleges {...data.otherCollegeData} />}
          </Box>
        </Grid>
        <Grid
          item
          xl={4}
          lg={4}
          md={12}
          sx={{
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }
          }}
        >
          <Box className="stickySidebar">
            <OtherColleges {...data.otherCollegeData} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PictureComponent;
