'use client';
import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

import { CourseAndFeesTitles } from './constant';

import FAQItem from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import ErrorComponent from 'ui-component/error';

const CourseFaq: React.FC<IFAQsProps> = ({ faqData, hasError, shortName }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        faqData?.faq &&
        faqData.faq.length > 0 && (
          <Box className="emptyCard" data-test-id="course-fees-faq">
            <Box className="cardHead">
              <Typography className="cg_InnerTitleTxt">
                {shortName}
                {CourseAndFeesTitles.COURSE_FEES_FAQ}
              </Typography>
            </Box>
            <Box>
              <FAQItem faq={faqData?.faq} />
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default CourseFaq;
