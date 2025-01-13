// Import Box from MUI
'use client';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { useParams } from 'next/navigation';

import { PlacementFacilityDetails } from '../placement-facility/constants';
import { ViewAll } from '../../../../constants';

import Facility, { IFacilitiesProps } from './Facility';
import overviewFacility from './Facility.module.css';

import MainCard from 'ui-component/MainCard';
import OverviewCard from 'ui-component/common/cards/overview';
import ErrorComponent from 'ui-component/error';
import { IInnerPageParams } from 'types';

const PlacementFacility: React.FC<IFacilitiesProps> = ({ facilitiesData, hasError }) => {
  const params = useParams<IInnerPageParams>();
  const ins = params?.ins;
  const name = params?.name;

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        facilitiesData &&
        facilitiesData.facilities?.[0]?.image && (
          <MainCard
            title={
              <Typography className="subHeadText">
                {facilitiesData.shortName} {PlacementFacilityDetails.TITLE}
              </Typography>
            }
            data-test-id="overview-facilities"
            secondary={
              <Link
                className={overviewFacility.linkTxt}
                href={`/${ins}/${name}/amenities`}
                as={`/${ins}/${name}/amenities`}
                data-test-id="overview-facilities-viewall"
              >
                {ViewAll.VIEW_ALL}
              </Link>
            }
          >
            <OverviewCard data={<Facility facilitiesData={facilitiesData} />} contentHeight="278px" />
          </MainCard>
        )
      )}
    </>
  );
};
export default PlacementFacility;
