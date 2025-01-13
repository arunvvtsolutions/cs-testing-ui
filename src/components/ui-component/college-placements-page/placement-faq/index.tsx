import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

import { PlacementTitles } from './constant';

import FAQItem from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { ContainerWarp } from 'ui-component/home/explore-by-stream/styles';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import ErrorComponent from 'ui-component/error';

const PlacementFaq: React.FC<IFAQsProps> = ({ faqData, shortName, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <>
          {faqData?.faq && faqData?.faq?.length > 0 && (
            <ContainerWarp>
              <Box className="emptyCard" data-test-id="placement-faq">
                <Box className="cardHead">
                  <Typography className="cg_InnerTitleTxt">
                    {shortName} {PlacementTitles.PLACEMENT_FAQS}
                  </Typography>
                </Box>
                <FAQItem faq={faqData?.faq} />
              </Box>
            </ContainerWarp>
          )}
        </>
      )}
    </>
  );
};
export default PlacementFaq;
