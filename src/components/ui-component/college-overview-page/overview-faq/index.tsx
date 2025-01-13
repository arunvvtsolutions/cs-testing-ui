import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';

import FAQItem, { IFAQsProps } from './FAQItem';
import { OverviewFaq } from './constant';
import styles from './Faq.module.css';

import ErrorComponent from 'ui-component/error';

const FAQSection: React.FC<IFAQsProps> = ({ faqData, hasError, shortName }) => {
  const [activePage, setActivePage] = useState<string>('');
  const asPath = usePathname();

  const segments = asPath?.split('/');

  useEffect(() => {
    const activePageName = segments?.[segments.length - 1];
    activePageName && setActivePage(activePageName);
  }, [segments]);
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Box className="emptyCard" data-test-id={`${activePage}-faq`}>
          {faqData?.faq && faqData.faq.length > 0 && (
            <Box className={styles.overviewMain}>
              <Box className="cardHead">
                <Typography className="cg_InnerTitleTxt">
                  {shortName} {OverviewFaq.OVERVIEW_FAQ}
                </Typography>
              </Box>
              <Box className={styles.innerOverview}>
                {/* {import this FAQs component and Pass the data} */}
                <FAQItem faq={faqData?.faq} />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default FAQSection;
