'use client';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

import OverallRating from './OverallRating';
import { ReviewTitles } from './constants';
import ReviewProgressBar from './ReviewProgressBar';
import reviewPercentageClasses from './reviewPercentageStyles.module.css';

import MainCard from 'ui-component/MainCard';
import AddReview from 'ui-component/college-review-page/add-review-popup';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
import useAuth from 'hooks/useAuth';

interface IReviewProps {
  shortName: string;
  overallRating: number;
  fourToFiveStar: number;
  threeToFourStar: number;
  twoToThreeStar: number;
  oneToTwoStar: number;
  verifiedReviews: number;
  stream: string;
}

export interface IReviewDataProps extends IErrorProps {
  reviewData: IReviewProps;
}

const ReviewPercentage: React.FC<IReviewDataProps> = ({ reviewData, hasError }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>('');
  const asPath = usePathname();
  const router = useRouter();

  const segments = asPath?.split('/');

  useEffect(() => {
    const activePageName = segments?.[segments.length - 1];
    activePageName && setActivePage(activePageName);
  }, [segments]);
  const handleOpen = () => {
    if (user?.id) setOpen(true);
    else router.push('/sign-in');
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <MainCard
          title={
            <Typography className="subHeadText">
              {reviewData?.shortName} {ReviewTitles.SUBHEAD_TITLE}
            </Typography>
          }
          secondary={
            <Button className="linkTxt" onClick={handleOpen}>
              {ReviewTitles.ADD_REVIEW}
            </Button>
          }
          data-test-id={`${activePage}-review-percentage`}
        >
          <Box className={reviewPercentageClasses.reviewSecBody}>
            {/* overall rating percentage rating review will be below  */}
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item lg={5} md={12} xs={12}>
                  <Box className="noneSelection">
                    <OverallRating
                      overAllStarValue={Math.round(reviewData?.overallRating)}
                      verifiedReviews={reviewData?.verifiedReviews}
                    />
                  </Box>
                </Grid>
                <Grid item lg={7} md={12} xs={12}>
                  {/* over all percentage progressive below */}
                  <Box className={reviewPercentageClasses?.reviewRightCol}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <ReviewProgressBar value={reviewData?.fourToFiveStar} noStars={ReviewTitles.FOUR_TO_FIVE} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ReviewProgressBar value={reviewData?.threeToFourStar} noStars={ReviewTitles.THREE_TO_FOUR} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ReviewProgressBar value={reviewData?.twoToThreeStar} noStars={ReviewTitles.TWO_TO_THREE} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ReviewProgressBar value={reviewData?.oneToTwoStar} noStars={ReviewTitles.ONE_TO_TWO} />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>

              <Typography className={reviewPercentageClasses.hinttext2}>
                {ReviewTitles.DESCRIPTION} {reviewData?.verifiedReviews} {ReviewTitles.REVIEWS_ARE_VERIFIED}
              </Typography>
            </Box>
          </Box>
        </MainCard>
      )}
      {/* MODAL_FOR_ADD_REVIEW_BELOW */}
      <AddReview open={open} handleClose={handleClose} setOpen={setOpen} stream={reviewData.stream} />
    </>
  );
};

export default ReviewPercentage;
