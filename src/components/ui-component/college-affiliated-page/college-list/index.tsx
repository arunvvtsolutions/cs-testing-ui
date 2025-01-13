import { Box } from '@mui/material';
import React from 'react';

import { IErrorProps } from 'types';
import { ICollege } from 'types/college';
import ListingPageCardsComponent from 'ui-component/listing-page/college-card';
import ErrorComponent from 'ui-component/error';

export interface ICollegeProps extends IErrorProps {
  collegeData: ICollege[];
}

const CollegeList: React.FC<ICollegeProps> = ({ collegeData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <>
          {collegeData.length > 0 && (
            <Box data-test-id="college-list">
              <ListingPageCardsComponent collegeData={collegeData} hideCompare />
            </Box>
          )}
        </>
      )}
    </>
  );
};
export default CollegeList;
