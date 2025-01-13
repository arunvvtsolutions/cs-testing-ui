'use client';
import { Box, Typography } from '@mui/material';

import ContentSection, { IContentProps } from './ContentSection';
import { CourseAndFees } from './constant';

import OverviewCard from 'ui-component/common/cards/overview';
import MainCard from 'ui-component/MainCard';
import ErrorComponent from 'ui-component/error';

const OverviewContent: React.FC<IContentProps> = ({ contentData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        contentData &&
        contentData.length > 0 && (
          <Box className="emptyCard" data-test-id="course-fees-overview-content">
            <Typography className="cg_InnerTitleTxt">
              {contentData[0]?.shortName} {CourseAndFees.COURSE_AND_FEES}
            </Typography>
            <MainCard>
              <Box>
                {/* {data send to overviewCard it is in common folder} */}
                <OverviewCard data={<ContentSection contentData={contentData} />} contentHeight="120px" />
              </Box>
            </MainCard>
          </Box>
        )
      )}
    </>
  );
};
export default OverviewContent;
