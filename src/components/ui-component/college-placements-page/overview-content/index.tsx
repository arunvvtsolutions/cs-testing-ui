import { Typography, Box } from '@mui/material';

import { PlacementTitles } from './constant';
import ContentSection, { IContentProps } from './ContentSection';

import OverviewCard from 'ui-component/common/cards/overview';
import MainCard from 'ui-component/MainCard';
import ErrorComponent from 'ui-component/error';

const PlacementOverview: React.FC<IContentProps> = ({ contentData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        contentData &&
        contentData.length > 0 && (
          <Box className="emptyCard" data-test-id="placement-overview">
            <Box className="cardHead">
              <Typography className="cg_InnerTitleTxt">
                {contentData[0].shortName} {PlacementTitles.GRADUATION_PLACEMENTS}
              </Typography>
            </Box>
            <MainCard>
              {/* {data send to overviewCard it is in common folder} */}
              <OverviewCard data={<ContentSection contentData={contentData} />} contentHeight="50px" />
            </MainCard>
          </Box>
        )
      )}
    </>
  );
};
export default PlacementOverview;
