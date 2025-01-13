import { FC } from 'react';
import { Grid, Box } from '@mui/material';

import CollegeList from './college-list';

import MainBanner from 'ui-component/college-overview-page/banner';
import { IBannerProps } from 'ui-component/college-overview-page/banner';
import { ICollegeProps } from 'ui-component/college-affiliated-page/college-list';
import { ISubMenuProps } from 'ui-component/subheader';

export interface IAffiliatedProps {
  data: {
    bannerData: IBannerProps;
    collegeData: ICollegeProps;
    subMenu: ISubMenuProps;
  };
}

const AffiliatedComponent: FC<IAffiliatedProps> = ({ data }) => {
  return (
    <>
      <MainBanner {...data.bannerData} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
            <CollegeList {...data.collegeData} {...data.subMenu} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AffiliatedComponent;
