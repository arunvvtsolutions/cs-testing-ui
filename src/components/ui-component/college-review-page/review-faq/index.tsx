import React from 'react';
import { Typography, Box } from '@mui/material';

import { FaqContent } from './constant';

import FAQComponent from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import ErrorComponent from 'ui-component/error';

const ReviewFaq: React.FC<IFAQsProps> = ({ faqData, hasError, shortName }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        faqData?.faq &&
        faqData.faq.length > 0 && (
          <Box className="emptyCard" data-test-id="review-faq">
            <Box className="cardHead">
              <Typography className="cg_InnerTitleTxt">
                {shortName} {FaqContent.TITLE}
              </Typography>
            </Box>
            <FAQComponent faq={faqData?.faq} />
          </Box>
        )
      )}
    </>
  );
};

export default ReviewFaq;
