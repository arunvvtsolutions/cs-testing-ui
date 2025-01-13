import { Box, Typography } from '@mui/material';
import React from 'react';

import { ICutoffsFilter } from '../filter/CutoffFilterDesktop';

import { CutoffResultTitle } from './constant';

import CutoffResultSection, { ICutoffResultsProps } from 'ui-component/college-cutoff-page/cutoff-results';
interface InnerCutoffTableProps extends ICutoffResultsProps {
  filterState: ICutoffsFilter;
}

const InnerCutoffTable: React.FC<InnerCutoffTableProps> = ({ cutoffResultsData, filterState, hasError }) => {
  return (
    <>
      <Box className="emptyCard" data-test-id="course-fees-inner-cutoff-table">
        {cutoffResultsData && cutoffResultsData.results.length > 0 && (
          <>
            <Box className="cardHead">
              <Typography className="cg_InnerTitleTxt">
                {CutoffResultTitle.FOR_GENDER_NEUTRAL} {filterState.caste} | {filterState.gender} | {filterState.quota}
              </Typography>
            </Box>
            <CutoffResultSection cutoffResultsData={cutoffResultsData} />
          </>
        )}
      </Box>
    </>
  );
};
export default InnerCutoffTable;
