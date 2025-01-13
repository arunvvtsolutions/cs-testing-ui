import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

import { FacultyFaqTitle } from './constant';

import FAQItem from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import ErrorComponent from 'ui-component/error';

const FacultyFaq: React.FC<IFAQsProps> = ({ faqData, shortName, hasError }) => {
  return (
    <>
      <Box className="emptyCard">
        {hasError ? (
          <ErrorComponent />
        ) : (
          <>
            {faqData?.faq && faqData.faq.length > 0 && (
              <>
                <Box className="cardHead" data-test-id="faculty-faq">
                  <Typography className="cg_InnerTitleTxt">
                    {shortName} {FacultyFaqTitle.FACULTY_FAQ}
                  </Typography>
                </Box>
                <FAQItem faq={faqData?.faq} />
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};
export default FacultyFaq;
