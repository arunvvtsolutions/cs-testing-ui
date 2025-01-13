import React from 'react';
import { Grid, Box } from '@mui/material';

import ContactDetails, { IContactProps } from './contact-details';
import NearBySection, { INearByProps } from './nearby-section';
import MapSection, { IMapProps } from './map-section';

import MainBanner, { IBannerProps } from 'ui-component/college-overview-page/banner';
import { ISubMenuProps } from 'ui-component/subheader';

export interface ICollegecontactPageprops {
  data: {
    bannerData: IBannerProps;
    contactData: IContactProps;
    nearByData: INearByProps;
    mapData: IMapProps;
    subMenu: ISubMenuProps;
  };
}

const ContactComponent: React.FC<ICollegecontactPageprops> = ({ data }) => {
  return (
    <div>
      <MainBanner {...data.bannerData} />
      <Grid container spacing={2}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
            <ContactDetails {...data.contactData} />
            <NearBySection {...data.nearByData} />
            <MapSection {...data.mapData} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactComponent;
