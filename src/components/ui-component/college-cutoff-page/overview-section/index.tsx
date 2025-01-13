import { Box, Typography } from '@mui/material';

import { CutoffTitles } from './constant';

import ContentSection, { IContentProps } from 'ui-component/college-placements-page/overview-content/ContentSection';
import OverviewCard from 'ui-component/common/cards/overview';
import MainCard from 'ui-component/MainCard';
import ErrorComponent from 'ui-component/error';

const CutoffOverview: React.FC<IContentProps> = ({ contentData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        contentData &&
        contentData.length > 0 && (
          <Box className="emptyCard" data-test-id="cutoff-overview">
            <Typography className="cg_InnerTitleTxt">
              {contentData[0]?.shortName} {CutoffTitles.CUT_OFF}
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
export default CutoffOverview;
