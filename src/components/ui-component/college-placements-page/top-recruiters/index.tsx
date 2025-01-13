import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import RecruiterItem, { ICompaniesProps } from './RecruiterItem';
import { TopRecruitersContent } from './constant';

import OverviewCard from 'ui-component/common/cards/overview';
import MainCard from 'ui-component/MainCard';
import ErrorComponent from 'ui-component/error';

const TopRecruiters: React.FC<ICompaniesProps> = ({ topCompaniesData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        topCompaniesData.topRecruiters.length > 0 && (
          <>
            <Box data-test-id="placement-top-recruiters">
              <Box className="cardHead">
                <Typography className="cg_InnerTitleTxt">
                  {`${TopRecruitersContent.TOP_RECRUITERS_TITLE} ${topCompaniesData.shortName} ${TopRecruitersContent.TOP_RECRUITERS_PLACEMENT}`}
                </Typography>
              </Box>
              <MainCard title="" secondary="">
                {/* {data send to overviewCard it is in common folder} */}
                <OverviewCard data={<RecruiterItem topCompaniesData={topCompaniesData} />} contentHeight="175px" />
              </MainCard>
            </Box>
          </>
        )
      )}
    </>
  );
};

export default TopRecruiters;
