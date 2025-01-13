import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

import { CutoffContent } from './constant';

import FAQItem from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import ErrorComponent from 'ui-component/error';

const CutoffFaq: React.FC<IFAQsProps> = ({ faqData, shortName, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        faqData?.faq &&
        faqData.faq?.length > 0 && (
          <Box className="emptyCard" data-test-id="cutoff-faq">
            <Box className="cardHead">
              <Typography className="cg_InnerTitleTxt">
                {shortName} {CutoffContent.TITLE}
              </Typography>
            </Box>
            <FAQItem faq={faqData?.faq} />
          </Box>
        )
      )}
    </>
  );
};

export default CutoffFaq;
