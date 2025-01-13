import React from 'react';
import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';

import overviewFacility from './Facility.module.css';

import { IErrorProps } from 'types';
// Define the interface for the JSON data
type IFacilityDataProps = {
  collegeId: number;
  id: number;
  altName: string;
  name: string;
  image: string;
  addedDate: string;
};

export interface IFacilitiesProps extends IErrorProps {
  facilitiesData: {
    shortName: string;
    facilities: IFacilityDataProps[];
  };
}

const Facility: React.FC<IFacilitiesProps> = ({ facilitiesData }) => {
  return (
    <Box sx={{ flexGrow: 1 }} data-test-id="overview-facilities-data">
      <Grid container spacing={2}>
        {facilitiesData.facilities.map((e) => (
          <Grid item xs={4} sm={4} md={3} lg={2} key={e.id} data-test-id={`overview-facilities-${e.id}`}>
            <Box className={overviewFacility.iconWrap}>
              <Box className={overviewFacility.imgBox}>
                <Image
                  className={overviewFacility.insideImg}
                  width={100}
                  height={100}
                  src={`/assets/images/infrastructure/${e.image}`}
                  alt={e.altName}
                  data-test-id={`overview-facilities-${e.image}`}
                />
              </Box>
              <Typography className={overviewFacility.placementGridTxt}>{e.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Facility;
