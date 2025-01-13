'use client';
import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import { Box } from '@mui/system';
import { AccordionSummary, Typography } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import parse from 'html-react-parser';
import { usePathname } from 'next/navigation';

import { StudentReviewTitle } from './constant';

import styles from 'ui-component/college-overview-page/students-reviews/studentReviewStyles.module.css';
import RatingStars from 'ui-component/college-overview-page/review-percentage/RatingStars';
import { IErrorProps } from 'types';
import { convertISOToCustomFormat } from 'utils';
import ErrorComponent from 'ui-component/error';
import { getStudentReviews } from 'utils/api/student-dashboard';
import useAuth from 'hooks/useAuth';

interface StudentReview {
  userId: number;
  userName: string;
  reviewId: number;
  shortName: string;
  infrastructureDesc: string;
  infrastructureRating: number;
  placementDesc: string;
  placementRating: number;
  academicDesc: string;
  academicRating: number;
  valueForMoneyDesc: string;
  valueForMoneyRating: number;
  campusDesc: string;
  campusRating: number;
  otherDesc: string;
  overallRating: number;
  addedDate: string;
  status: number;
}

export interface ICollegeReviewsDataProps extends IErrorProps {
  collegeReviews: StudentReview[];
}

const ReviewsPage = () => {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState<number | false>(false);
  const [activePage, setActivePage] = useState<string>('');
  const [studentReviews, setStudentReviews] = useState<ICollegeReviewsDataProps>({
    collegeReviews: [],
    hasError: false
  });
  const asPath = usePathname();

  useEffect(() => {
    const segments = asPath?.split('/');

    if (segments?.length) {
      const activePageName = segments[segments.length - 1];
      setActivePage(activePageName);
    }
  }, [asPath]);

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const getData = async () => {
      if (user?.id) {
        const review = await getStudentReviews(user.id);
        setStudentReviews(review);
      }
    };
    getData();
  }, [user?.id]);

  return (
    <Box className={styles.dashboardmainSection}>
      <Box className="emptyCard">
        {studentReviews.hasError ? (
          <ErrorComponent />
        ) : studentReviews.collegeReviews.length > 0 ? (
          <Box data-test-id={`${activePage}-students-reviews`} className={styles.reviewsSection}>
            <Box className="cardHead" display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography className="dashBoard_h6" data-test-id={`review-title-for-${user?.id}`}>
                {StudentReviewTitle.SUBHEAD_TITLE}
              </Typography>
            </Box>

            <Box className="ReviewSecBody">
              {studentReviews.collegeReviews.map((review, index) => (
                <Box key={index} className={styles.dashboardAccordianWarp}>
                  <Accordion
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                    data-test-id={`${activePage}-students-reviews-rewiewsec-${user?.id}-${index}`}
                  >
                    <AccordionSummary
                      expandIcon={expanded === index ? <RemoveIcon /> : <AddIcon />}
                      sx={{
                        background: '#fff'
                      }}
                      aria-controls={`${index}-content`}
                    >
                      <Box className={styles.accordionInnerHead}>
                        <Box className={styles.userImgBx}>
                          <Image
                            className={styles.userImage}
                            src="/assets/images/user.png"
                            width={60}
                            height={60}
                            alt="verify"
                            data-test-id={`${index}-student-review-for-${user?.id}`}
                          />
                        </Box>
                        <Box>
                          <Typography className={styles.reviewUserName}>{review.userName}</Typography>
                          <Box>{`Posted On ${convertISOToCustomFormat(review.addedDate)}`}</Box>
                          {expanded === index &&
                            (review.status ? (
                              <Box className={styles.veifiedProfile}>
                                <VerifiedIcon sx={{ fontSize: '16px', marginRight: '5px' }} />
                                {StudentReviewTitle.VERIFIED_REVIEW}
                              </Box>
                            ) : (
                              <></>
                            ))}
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        <Box className={styles.clgBx}>
                          <Typography
                            color="#1452A4"
                            fontWeight="500"
                            data-test-id={`infra-structure-review-for-${user?.id}`}
                          >
                            {review.shortName}
                          </Typography>
                        </Box>
                        <Box className={styles.inerBx}>
                          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography
                              className={styles.reviewCommentsTitle}
                              data-test-id={`infra-structure-review-for-${user?.id}`}
                            >
                              {StudentReviewTitle.COLLEGE_INFRASTRUCTURE}
                            </Typography>
                            <Box className={styles.noneSelection}>
                              <RatingStars
                                starsValue={review.infrastructureRating}
                                data-test-id={`infra-structure-review-rating-for-${user?.id}`}
                              />
                            </Box>
                          </Box>
                          <Typography className={styles.reviewComments}>{parse(review.infrastructureDesc)}</Typography>
                        </Box>
                        <Box className={styles.inerBx}>
                          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography
                              className={styles.reviewCommentsTitle}
                              data-test-id={`academic-review-for-${user?.id}`}
                            >
                              {StudentReviewTitle.ACADEMIC}
                            </Typography>
                            <Box className={styles.noneSelection}>
                              <RatingStars
                                starsValue={review.academicRating}
                                data-test-id={`academic-rating-for-${user?.id}`}
                              />
                            </Box>
                          </Box>
                          <Typography className={styles.reviewComments}>{parse(review.academicDesc)}</Typography>
                        </Box>

                        <Box className={styles.inerBx}>
                          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography
                              className={styles.reviewCommentsTitle}
                              data-test-id={`placement-review-for-${user?.id}`}
                            >
                              {StudentReviewTitle.PLACEMENT}
                            </Typography>
                            <Box className={styles.noneSelection}>
                              <RatingStars
                                starsValue={review.placementRating}
                                data-test-id={`placement-rating-for-${user?.id}`}
                              />
                            </Box>
                          </Box>
                          <Typography className={styles.reviewComments}>{parse(review.placementDesc)}</Typography>
                        </Box>

                        <Box className={styles.inerBx}>
                          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography
                              className={styles.reviewCommentsTitle}
                              data-test-id={`value-for-money-review-for-${user?.id}`}
                            >
                              {StudentReviewTitle.VALUE_FOR_MONEY}
                            </Typography>
                            <Box className={styles.noneSelection}>
                              <RatingStars
                                starsValue={review.valueForMoneyRating}
                                data-test-id={`value-for-money-rating-for-${user?.id}`}
                              />
                            </Box>
                          </Box>
                          <Typography className={styles.reviewComments}>{parse(review.valueForMoneyDesc)}</Typography>
                        </Box>

                        <Box className={styles.dashboardinerBx}>
                          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography
                              className={styles.reviewCommentsTitle}
                              data-test-id={`campus-review-for-${user?.id}`}
                            >
                              {StudentReviewTitle.CAMPUS}
                            </Typography>
                            <Box className={styles.noneSelection}>
                              <RatingStars
                                starsValue={review.campusRating}
                                data-test-id={`campus-rating-for-${user?.id}`}
                              />
                            </Box>
                          </Box>
                          <Typography className={styles.reviewComments}>{parse(review.campusDesc)}</Typography>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="400px">
            <Typography textAlign="center" fontSize="23px" fontWeight="600">
              {StudentReviewTitle.NOREVIEWS}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ReviewsPage;
