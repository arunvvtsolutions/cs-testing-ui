import React from 'react';
import { Skeleton } from '@mui/material';

import {
  BodyBoxTag,
  CardBody,
  CardTop,
  CollegeNameBox,
  CollegesListingCard,
  LineDivider,
  SubBox,
  SubBoxTag,
  TypographyTag
} from './styles';

const SkeletonCard = () => {
  // You can adjust the number of skeletons based on your UI
  const skeletonCount = 5;

  return (
    <>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <CollegesListingCard
          key={index}
          data-test-id={`listing-page-card-skeleton-${index}`}
          sx={{ maxWidth: '750px', border: 'none' }}
        >
          <CardTop>
            <SubBox>
              <Skeleton variant="circular" width={48} height={48} animation="pulse" />
            </SubBox>
            <CollegeNameBox>
              <Skeleton variant="text" width={200} height={24} animation="pulse" />
              <SubBoxTag>
                <TypographyTag>
                  <Skeleton variant="text" width={100} height={16} animation="pulse" />
                </TypographyTag>
                <TypographyTag>
                  <Skeleton variant="text" width={80} height={16} animation="pulse" />
                </TypographyTag>
              </SubBoxTag>
            </CollegeNameBox>
            <Skeleton variant="rectangular" width={40} height={40} sx={{ marginLeft: 'auto' }} animation="pulse" />
          </CardTop>
          <LineDivider />
          <CardBody>
            <BodyBoxTag>
              <Skeleton variant="rectangular" width={480} height={40} animation="pulse" />
            </BodyBoxTag>
            <Skeleton variant="text" width={160} height={40} sx={{ marginLeft: 'auto' }} animation="pulse" />
          </CardBody>
        </CollegesListingCard>
      ))}
    </>
  );
};

export default SkeletonCard;
