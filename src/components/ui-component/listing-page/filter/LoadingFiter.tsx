import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Skeleton } from '@mui/material';

import { ScrollContent, Wrapper, FilterTitle } from './styles';

const SkeletonFilter = () => {
  return (
    <>
      <Wrapper data-test-id="listing-page-filter-accordion-skeleton">
        <Accordion
          expanded={false}
          style={{
            marginBottom: '15px'
          }}
        >
          <AccordionSummary
            expandIcon={<Skeleton variant="circular" width={24} height={24} animation="pulse" />}
            aria-controls={`skeleton-bh-content`}
            id={`skeleton-bh-header`}
            sx={{
              background: 'rgba(223, 225, 230, 0.20)'
            }}
          >
            <FilterTitle>
              <Skeleton variant="text" width={150} height={24} animation="pulse" />
            </FilterTitle>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              border: '1px solid #DFE1E6',
              background: ' #FFF',
              boxShadow: '16px 0px 64px 0px rgba(0, 0, 0, 0.04)'
            }}
          >
            <ScrollContent>
              <Skeleton variant="text" width={100} height={20} animation="pulse" />
              <Skeleton variant="text" width={100} height={20} animation="pulse" />
              <Skeleton variant="text" width={100} height={20} animation="pulse" />
            </ScrollContent>
          </AccordionDetails>
        </Accordion>
      </Wrapper>
    </>
  );
};

export default SkeletonFilter;
