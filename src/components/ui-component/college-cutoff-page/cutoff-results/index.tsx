import { Box, useMediaQuery } from '@mui/material';
import React from 'react';

import CutoffResultTableMobile from './CutoffResult.mobile';
import CutoffResultTable from './CutoffResultTable';

import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

interface IClosingRankProps {
  year: number;
  rank: string;
  quotaName: string;
  casteName: string;
  genderName: string;
}

export interface ICutoffsDataProps {
  id: number;
  round: number;
  course: string;
  closingRank: IClosingRankProps[];
}

export interface ICutoffResultsProps extends IErrorProps {
  cutoffResultsData: {
    years: number[];
    results: ICutoffsDataProps[];
  };
}

const CutoffResultSection: React.FC<ICutoffResultsProps> = ({ cutoffResultsData, hasError }) => {
  // Create a custom theme with breakpoints
  const isMdDown = useMediaQuery('(max-width: 768px)');

  return (
    <Box className="emptyCard">
      {hasError ? (
        <ErrorComponent />
      ) : isMdDown ? (
        <CutoffResultTableMobile cutoffResultsData={cutoffResultsData} />
      ) : (
        <CutoffResultTable cutoffResultsData={cutoffResultsData} />
      )}
    </Box>
  );
};

export default CutoffResultSection;
