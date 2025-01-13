'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import { Box } from '@mui/system';
import { AccordionSummary, Typography } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import parse from 'html-react-parser';
import { useParams, usePathname } from 'next/navigation';

import RatingStars from '../review-percentage/RatingStars';
import { ReadMoreOrLess } from '../../../../constants';

import { StudentReviewTitle } from './constants';
import studentReviewStyles from './studentReviewStyles.module.css';

import { IErrorProps, IInnerPageParams } from 'types';
import { convertISOToCustomFormat } from 'utils';
import ErrorComponent from 'ui-component/error';
import { CapitalizedString } from 'utils';
interface StudentReview {
  userId: number;
  userName: string;
  reviewId: number;
  collegeId: number;
  title: string;
  infrastructureDesc: string;
  infrastructureRating: number;
  placementDesc: string;
  placementRating: number;
  academicDesc: string;
  academicRating: number;
  medianSalaryDesc: string;
  medianSalaryRating: number;
  campusDesc: string;
  campusRating: number;
  anything_else: string;
  overallRating: number;
  addedDate: string;
  status: number;
}

export interface ICollegeReviewsData {
  shortName: string;
  collegeReviews: StudentReview[];
}

export interface ICollegeReviewsDataProps extends IErrorProps {
  collegeReviews: ICollegeReviewsData;
}

const StudentReviews: React.FC<ICollegeReviewsDataProps> = ({ collegeReviews, hasError }) => {
  const [expanded, setExpanded] = useState<number | false>(false);
  const [activePage, setActivePage] = useState<string>('');
  const searchParams = useParams<IInnerPageParams>();
  const asPath = usePathname();
  const ins = searchParams?.ins;
  const name = searchParams?.name;
  const segments = asPath?.split('/');

  useEffect(() => {
    const activePageName = segments?.[segments.length - 1];
    activePageName && setActivePage(activePageName);
  }, [segments]);

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Box className="emptyCard">
        {hasError ? (
          <ErrorComponent />
        ) : (
          collegeReviews.collegeReviews.length > 0 && (
            <Box data-test-id={`${activePage}-students-reviews`}>
              <Box className="cardHead" display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography className="cg_InnerTitleTxt">
                  {collegeReviews.shortName} {StudentReviewTitle.SUBHEAD_TITLE}
                </Typography>
                {activePage !== 'review' && (
                  <Link
                    className=" linkTxt"
                    href={`/${ins}/${name}/review`}
                    data-test-id={`${activePage}-students-reviews-readmore`}
                  >
                    {ReadMoreOrLess.READ_MORE}
                  </Link>
                )}
              </Box>

              <Box className="ReviewSecBody">
                {collegeReviews.collegeReviews.map((review) => (
                  <Box
                    key={review.userId}
                    className={studentReviewStyles.accordionWarp}
                    data-test-id={`${activePage}-students-reviews-rewiewsec-${review.userId}`}
                  >
                    <Accordion expanded={expanded === review.userId} onChange={handleChange(review.userId)}>
                      <AccordionSummary
                        expandIcon={expanded === review.userId ? <RemoveIcon /> : <AddIcon />}
                        sx={{
                          background: expanded === review.userId ? '#DFE1E633' : '#fff'
                        }}
                        aria-controls={`${review.userId}-content`}
                        id={`${review.userId}-header`}
                      >
                        <Box className={studentReviewStyles.accordionInnerHead}>
                          <Box className={studentReviewStyles.userImgBx}>
                            <Image
                              className={studentReviewStyles.userImage}
                              src="/assets/images/user.png"
                              width={60}
                              height={60}
                              alt=""
                            />
                          </Box>
                          <Box>
                            <Typography className={studentReviewStyles.reviewUserName}>
                              {review.userName && CapitalizedString(review.userName)}
                            </Typography>
                            <Box>{`Posted On ${convertISOToCustomFormat(review.addedDate)}`}</Box>
                            {review.status === 1 && (
                              <Box className={studentReviewStyles.veifiedProfile}>
                                <VerifiedIcon sx={{ fontSize: '16px', marginRight: '5px' }} />
                                {StudentReviewTitle.VERIFIED_PROFILE}
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box>
                          <Box className={studentReviewStyles.inerBx}>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                              <Typography className={studentReviewStyles.reviewCommentsTitle}>
                                {StudentReviewTitle.COLLEGE_INFRASTRUCTURE}
                              </Typography>
                              <Box className={studentReviewStyles.noneSelection}>
                                <RatingStars starsValue={review.infrastructureRating} />
                              </Box>
                            </Box>
                            <Typography className={studentReviewStyles.reviewComments}>
                              {parse(review.infrastructureDesc)}
                            </Typography>
                          </Box>

                          <Box className={studentReviewStyles.inerBx}>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                              <Typography className={studentReviewStyles.reviewCommentsTitle}>
                                {StudentReviewTitle.PLACEMENT}
                              </Typography>
                              <Box className={studentReviewStyles.noneSelection}>
                                <RatingStars starsValue={review.placementRating} />
                              </Box>
                            </Box>
                            <Typography className={studentReviewStyles.reviewComments}>
                              {parse(review.placementDesc)}
                            </Typography>
                          </Box>

                          <Box className={studentReviewStyles.inerBx}>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                              <Typography className={studentReviewStyles.reviewCommentsTitle}>
                                {StudentReviewTitle.ACADEMIC}
                              </Typography>
                              <Box className={studentReviewStyles.noneSelection}>
                                <RatingStars starsValue={review.academicRating} />
                              </Box>
                            </Box>
                            <Typography className={studentReviewStyles.reviewComments}>
                              {parse(review.academicDesc)}
                            </Typography>
                          </Box>

                          <Box className={studentReviewStyles.inerBx}>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                              <Typography className={studentReviewStyles.reviewCommentsTitle}>
                                {StudentReviewTitle.MEDIAN_SALARY}
                              </Typography>
                              <Box className={studentReviewStyles.noneSelection}>
                                <RatingStars starsValue={review.medianSalaryRating} />
                              </Box>
                            </Box>
                            <Typography className={studentReviewStyles.reviewComments}>
                              {parse(review.medianSalaryDesc)}
                            </Typography>
                          </Box>

                          <Box className={studentReviewStyles.inerBx}>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                              <Typography className={studentReviewStyles.reviewCommentsTitle}>
                                {StudentReviewTitle.CAMPUS}
                              </Typography>
                              <Box className={studentReviewStyles.noneSelection}>
                                <RatingStars starsValue={review.campusRating} />
                              </Box>
                            </Box>
                            <Typography className={studentReviewStyles.reviewComments}>
                              {parse(review.campusDesc)}
                            </Typography>
                          </Box>
                          <Box className={studentReviewStyles.inerBx}>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                              <Typography className={studentReviewStyles.reviewCommentsTitle}>
                                {StudentReviewTitle.OTHER_REVIEW}
                              </Typography>
                              <Box className={studentReviewStyles.noneSelection}>
                                <RatingStars starsValue={review.overallRating} />
                              </Box>
                            </Box>
                            <Typography className={studentReviewStyles.reviewComments}>
                              {parse(review.anything_else)}
                            </Typography>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                ))}
              </Box>
            </Box>
          )
        )}
      </Box>
    </div>
  );
};

export default StudentReviews;
