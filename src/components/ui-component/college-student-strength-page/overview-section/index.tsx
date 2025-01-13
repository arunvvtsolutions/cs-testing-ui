import { Box, Typography } from '@mui/material';

import OverviewCard from '../../common/cards/overview'; // Import OverviewCard

import { OverViewTitle } from './constant';

import ContentSection, { IContentProps } from 'ui-component/college-placements-page/overview-content/ContentSection';
import MainCard from 'ui-component/MainCard';
import ErrorComponent from 'ui-component/error';

const OverviewSection: React.FC<IContentProps> = ({ contentData, hasError }) => {
  return (
    <Box className="emptyCard">
      {hasError ? (
        <ErrorComponent />
      ) : (
        contentData &&
        contentData.length > 0 && (
          <>
            <Box data-test-id="student-strength-overview">
              <Box className="cardHead">
                <Typography className="cg_InnerTitleTxt">
                  {contentData[0]?.shortName} {OverViewTitle.STUDENT_STRENGTH}
                </Typography>
              </Box>
              {/* {data send to overviewCard it is in common folder} */}
              <MainCard>
                <OverviewCard data={<ContentSection contentData={contentData} />} contentHeight="50px" />
              </MainCard>
            </Box>
          </>
        )
      )}
    </Box>
  );
};

export default OverviewSection;
