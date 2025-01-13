import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

import { AdmissionAndEligibility } from './constant';

import FAQItem from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { ContainerWarp } from 'ui-component/home/explore-by-stream/styles';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import ErrorComponent from 'ui-component/error';

const AdmissionEligibilityFaqComponent: React.FC<IFAQsProps> = ({ faqData, shortName, hasError }) => {
  return (
    <>
      <div>
        {hasError ? (
          <ErrorComponent />
        ) : (
          faqData?.faq &&
          faqData?.faq?.length > 0 && (
            <ContainerWarp>
              <Box className="emptyCard" data-test-id="admission-eligibility-faq">
                <Box className="cardHead">
                  <Typography className="cg_InnerTitleTxt">
                    {`${shortName} ${AdmissionAndEligibility.ADMISSION_ELIGIBILITY}`}
                  </Typography>
                </Box>
                <FAQItem faq={faqData?.faq} />
              </Box>
            </ContainerWarp>
          )
        )}
      </div>
    </>
  );
};
export default AdmissionEligibilityFaqComponent;
