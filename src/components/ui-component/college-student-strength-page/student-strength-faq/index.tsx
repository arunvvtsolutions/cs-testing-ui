import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

import { StudentStrengthTitles } from './constant';

import FAQItem from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { ContainerWarp } from 'ui-component/home/explore-by-stream/styles';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import ErrorComponent from 'ui-component/error';

const StudentStrengthFaq: React.FC<IFAQsProps> = ({ faqData, shortName, hasError }) => {
  return (
    <>
      <ContainerWarp>
        <Box className="emptyCard" data-test-id="student-strength-faq">
          {hasError ? (
            <ErrorComponent />
          ) : (
            <>
              {faqData?.faq && faqData.faq.length > 0 && (
                <>
                  <Box className="cardHead">
                    <Typography className="cg_InnerTitleTxt">
                      {shortName} {StudentStrengthTitles.STUDENT_STRENGTH_FAQ}
                    </Typography>
                  </Box>
                  <FAQItem faq={faqData?.faq} />
                </>
              )}
            </>
          )}
        </Box>
      </ContainerWarp>
    </>
  );
};
export default StudentStrengthFaq;
