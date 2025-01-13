import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import capitalize from 'lodash/capitalize';

import styles from './courseDetails.module.css';
import { CourseDetailsContent } from './constant';

import MainCard from 'ui-component/MainCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
import { converYaxis } from 'utils';
interface ICourseInfoData {
  id: number;
  course: string;
  duration: string;
  totalFees: string;
  level: string;
}

export interface ICourseDetailsProps extends IErrorProps {
  courseInfoData: ICourseInfoData[];
}

const CourseDetails: React.FC<ICourseDetailsProps> = ({ courseInfoData, hasError }) => {
  return (
    <Box>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Box data-test-id="course-fees-inner-fee-structure-course-details">
          {courseInfoData &&
            courseInfoData.map((courseData) => (
              <MainCard
                key={courseData.id}
                data-test-id={`course-fees-inner-fee-structure-course-details-${courseData.id}`}
              >
                <Box className={styles.headingWraper} sx={{ maxWidth: '817px' }}>
                  <Typography className={`subHeadText ${styles.heading}`}>{capitalize(courseData.course)}</Typography>
                  <Typography className={styles.courseDuration}>{courseData.duration}</Typography>
                </Box>
                <Divider className={styles.divider} />
                <Box className={styles.detailsWraper}>
                  {courseData.duration && (
                    <Box className={styles.detailsItem}>
                      <Typography className={`subHeadText ${styles.detailsValue}`}>{courseData.duration}</Typography>
                      <Typography className={styles.courseDetails}>{CourseDetailsContent.DURATION}</Typography>
                    </Box>
                  )}

                  {courseData.totalFees && (
                    <Box className={styles.detailsItem}>
                      <Typography className={`subHeadText ${styles.detailsValue}`}>
                        {courseData.totalFees
                          ? isNaN(Number(courseData.totalFees.replaceAll(',', '')))
                            ? courseData.totalFees
                            : converYaxis(courseData.totalFees.replaceAll(',', ''))
                          : '-'}
                      </Typography>
                      <Typography className={styles.courseDetails}>{CourseDetailsContent.TOTAL_FEES}</Typography>
                    </Box>
                  )}
                  {courseData.level && (
                    <Box className={styles.detailsItem}>
                      <Typography className={`subHeadText ${styles.detailsValue}`}>{courseData.level}</Typography>
                      <Typography className={styles.courseDetails}>{CourseDetailsContent.LEVEL}</Typography>
                    </Box>
                  )}
                </Box>
              </MainCard>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default CourseDetails;
