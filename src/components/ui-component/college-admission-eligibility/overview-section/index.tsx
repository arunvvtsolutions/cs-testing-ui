import React from 'react';
import { Box, Typography } from '@mui/material';

import ContentSection, { IContentProps } from './ContentSection';
import { AdmissionTitle } from './constant';

import OverviewCard from 'ui-component/common/cards/overview';
import MainCard from 'ui-component/MainCard';
import ErrorComponent from 'ui-component/error';

const OverviewSection: React.FC<IContentProps> = ({ contentData, hasError }) => {
  return (
    <>
      <Box className="emptyCard">
        {hasError ? (
          <ErrorComponent />
        ) : (
          contentData &&
          contentData.length > 0 && (
            <>
              <Box data-test-id="admission-eligibility-overview">
                <Typography className="cg_InnerTitleTxt">
                  {contentData[0].shortName} {AdmissionTitle.ADMISSIONS}
                </Typography>
                <MainCard>
                  <OverviewCard data={<ContentSection contentData={contentData} />} contentHeight="80px" />
                </MainCard>
              </Box>
            </>
          )
        )}
      </Box>
    </>
  );
};
export default OverviewSection;
