'use client';
import React, { useEffect, useState } from 'react';
import { Box, useTheme, useMediaQuery, Typography, Button } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ReadMoreOrLess } from '../../../../constants/index';
import { ICourseShortProps } from '../course-fees-filter';

import styles from './CourseList.module.css';
import { CoursesListContent } from './constant';

import { IErrorProps, IInnerPageParams } from 'types';
import ErrorComponent from 'ui-component/error';
import { CapitalizedString, converYaxis } from 'utils';

interface ICourseList {
  levelOfCourse?: string;
  duration?: string;
  degreeShort?: string;
  courseId?: string;
  fees?: string;
  seats?: number;
  courseYear?: string;
  name: string;
  courseLongUrl: string;
  courseShortUrl: string;
  collegeName?: string;
  collegeLongUrl: string;
  collegeShortUrl: string;
  degreeId: number;
}

export interface ICourseListProps extends IErrorProps {
  courseListData: {
    courseYear: string;
    overallCourses: number;
    courseList: ICourseList[];
    coursesShort?: ICourseShortProps[];
  };
  selectedCourse?: string;
}

const CoursesList: React.FC<ICourseListProps> = ({ courseListData, hasError, selectedCourse }) => {
  const params = useParams<IInnerPageParams>();
  const ins = params?.ins;
  const name = params?.name;
  const [visibleCards, setVisibleCards] = useState<number>(10);
  const [courseList, setCourseList] = useState<ICourseList[]>([]);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  //function to set a vissible cards
  const handleLoadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 10);
  };

  useEffect(() => {
    setVisibleCards(10);
  }, [selectedCourse]);

  useEffect(() => {
    setCourseList(courseListData.courseList);
  }, [courseListData.courseList]);

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Box className="emptyCard" data-test-id="course-fees-course-list">
          <Box>
            <Typography className="cg_InnerTitleTxt">
              {`${CoursesListContent.TOTAL_COURSE_COUNT} ${courseListData.courseList.length}`}
              {CoursesListContent.YEAR} {courseListData.courseYear}
            </Typography>
          </Box>
          <Box className={styles.coursesListwrapper}>
            {courseList &&
              courseList.slice(0, visibleCards).map((course, index) => (
                <Box
                  key={index}
                  className={styles.courseDetailCard}
                  data-test-id={`course-fees-course-list-${course.courseId}`}
                >
                  <Box className={styles.headingSection}>
                    <Box className={styles.headingBox}>
                      <Link
                        href={`/${ins}/${name}/course-fees/${course.courseShortUrl}/overview`}
                        className={`subHeadText ${styles.courseName}`}
                        data-test-id={`course-fees-course-list-${course.courseShortUrl}`}
                      >
                        {CapitalizedString(course.name)}
                      </Link>
                      {isMdDown && (
                        <Link
                          href={`/${ins}/${name}/course-fees/${course.courseShortUrl}/overview`}
                          className={styles.linkBox}
                          data-test-id={`course-fees-mobile-course-list-readmore`}
                          aria-label={`Navigate to ${course.name} overview`}
                        >
                          <ChevronRightIcon className={styles.icon} />
                        </Link>
                      )}
                    </Box>
                    <Box className={styles.affiliatedBox}>
                      <Typography className={styles.affiliatedText}>
                        {CoursesListContent.AFFILIATED_BY} :
                        <Link
                          href={`/${ins}/${name}/overview`}
                          className={`linkTxt ${styles.affiliatedLink}`}
                          data-test-id={`course-fees-course-list-affiliated`}
                        >
                          {course.collegeName}
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={styles.courseDetailsRow}>
                    <Box className={styles.courseDetailBox}>
                      <Box className={styles.courseDetailCol}>
                        <Box>
                          <Typography className={styles.courseValue}>
                            {course.duration ? course.duration : '-'}
                          </Typography>
                          <Typography className={styles.courseKey}>{CoursesListContent.DURATION}</Typography>
                        </Box>
                      </Box>
                      <Box className={styles.courseDetailCol}>
                        <Box>
                          <Typography className={styles.courseValue}>
                            {course.fees
                              ? isNaN(Number(course.fees.replaceAll(',', '')))
                                ? course.fees
                                : converYaxis(course.fees.replaceAll(',', ''))
                              : '-'}
                          </Typography>
                          <Typography className={styles.courseKey}>{CoursesListContent.TOTAL_FEES}</Typography>
                        </Box>
                      </Box>
                      <Box className={styles.courseDetailCol}>
                        <Box>
                          <Typography className={styles.courseValue}>{course.seats ? course.seats : '-'}</Typography>
                          <Typography className={styles.courseKey}>{CoursesListContent.SEATS}</Typography>
                        </Box>
                      </Box>
                      <Box className={styles.courseDetailCol}>
                        <Box>
                          <Typography className={styles.courseValue}>
                            {course.levelOfCourse ? course.levelOfCourse : '-'}
                          </Typography>
                          <Typography className={styles.courseKey}>{CoursesListContent.LEVEL_OF_COURSE}</Typography>
                        </Box>
                      </Box>
                    </Box>
                    {!isMdDown && (
                      <Box className={styles.readMoreLinkBox}>
                        <Link
                          href={`/${ins}/${name}/course-fees/${course.courseShortUrl}/overview`}
                          className="linkTxt"
                          data-test-id={`course-fees-course-list-readmore`}
                        >
                          <Box className={styles.linkBox}>
                            {ReadMoreOrLess.READ_MORE}
                            <ChevronRightIcon />
                          </Box>
                        </Link>
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
          </Box>
          {visibleCards < courseList.length && (
            <Button
              className={styles.loadMoreButton}
              onClick={handleLoadMore}
              data-test-id={`course-fees-mobile-course-list-loadmore`}
            >
              <Typography className={styles.loadMoreText}>{CoursesListContent.LOAD_MORE}</Typography>
            </Button>
          )}
        </Box>
      )}
    </>
  );
};

export default CoursesList;
