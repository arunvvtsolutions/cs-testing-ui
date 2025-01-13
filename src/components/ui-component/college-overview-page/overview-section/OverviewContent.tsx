import React from 'react';
import parser from 'html-react-parser';
import { Box, Typography } from '@mui/material';

import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface IOverviewDataProps {
  shortName: string;
  collegeId: string;
  description: string;
}
export interface IOverviewProps extends IErrorProps {
  overviewData: IOverviewDataProps[];
}

const OverviewContent: React.FC<IOverviewProps> = ({ overviewData, hasError }) => {
  return (
    <>
      {overviewData && (
        <Box>
          {hasError ? (
            <ErrorComponent />
          ) : (
            <Box className="cgDynamicText" data-test-id="overview-content">
              <Typography>{parser(overviewData[0].description)}</Typography>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default OverviewContent;
