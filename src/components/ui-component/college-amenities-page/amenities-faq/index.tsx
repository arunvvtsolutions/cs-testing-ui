import React from 'react';
import { Box, Typography } from '@mui/material';

import { AmenitiesTitles } from './constant';

import FAQItem from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import ErrorComponent from 'ui-component/error';

const AmenitiesFaq: React.FC<IFAQsProps> = ({ faqData, hasError, shortName }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        faqData?.faq &&
        faqData.faq.length > 0 && (
          <Box className="emptyCard" data-test-id="amenities-faq">
            <Box className="cardHead">
              <Typography className="cg_InnerTitleTxt">
                {shortName} {AmenitiesTitles.AMENITIES_FAQS}
              </Typography>
            </Box>
            <FAQItem faq={faqData?.faq} />
          </Box>
        )
      )}
    </>
  );
};
export default AmenitiesFaq;
