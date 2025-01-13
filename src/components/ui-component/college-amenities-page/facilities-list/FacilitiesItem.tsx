import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import styles from './facilitiesList.module.css';

import { IFacilityProps } from './index';

const FacilitiesItem: React.FC<IFacilityProps> = ({ facilitiesData }) => {
  return (
    <>
      {facilitiesData &&
        facilitiesData.facilities.map((facilityData) => (
          <Box
            className={styles.facilitiesWrapper}
            key={facilityData.id}
            data-test-id={`facilities-${facilityData.id}`}
          >
            <Box className={styles.facilitiesItems}>
              <Box className={styles.itemWraper}>
                <Image
                  src={`/assets/images/infrastructure/${facilityData.image}`}
                  alt={facilityData.altName}
                  width={20}
                  height={20}
                  data-test-id={`facilityData-${facilityData.image}`}
                />
                <Typography className={styles.facilitiesName}>{facilityData.name}</Typography>
              </Box>
              <Box>
                <Typography className={styles.collegeId}>{facilityData.infraCount}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
    </>
  );
};

export default FacilitiesItem;
