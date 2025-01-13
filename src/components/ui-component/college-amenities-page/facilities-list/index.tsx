import React from 'react';
import { Box } from '@mui/material';

import FacilitiesItem from './FacilitiesItem';
import { FacilitiesContent } from './constant';

import OverviewCard from 'ui-component/common/cards/overview';
import MainCard from 'ui-component/MainCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

type IFacilities = {
  infraCount?: string;
  id?: number;
  altName: string;
  name?: string;
  image?: string;
  addedDate?: string;
};

export interface IFacilityData {
  shortName: string;
  facilities: IFacilities[];
}

export interface IFacilityProps extends IErrorProps {
  facilitiesData: IFacilityData;
}

const FacilitiesList: React.FC<IFacilityProps> = ({ facilitiesData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        facilitiesData.facilities.length > 0 && (
          <Box data-test-id="amenities-faclities-list">
            <MainCard title={FacilitiesContent.FACILITIES}>
              <OverviewCard data={<FacilitiesItem facilitiesData={facilitiesData} />} contentHeight="550px" />
            </MainCard>
          </Box>
        )
      )}
    </>
  );
};
export default FacilitiesList;
