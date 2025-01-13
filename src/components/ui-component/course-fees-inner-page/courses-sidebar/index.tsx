import React, { FC } from 'react';
import Link from 'next/link';
import { Box, Grid, useMediaQuery, useTheme, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useParams } from 'next/navigation';

import sidebarStyle from './coursesSidebar.module.css';
import { OtherCoursesTitle } from './constants';

import { IErrorProps, IInnerPageParams } from 'types';
import ErrorComponent from 'ui-component/error';
import { CapitalizedString } from 'utils';

export interface ICourseItemProps {
  courseId: number;
  courseName: string;
  courseShortURL: string;
  courseLongURL: string;
}

export interface IOtherCourseListProps extends IErrorProps {
  otherCourseData: ICourseItemProps[];
}

const OtherCoursesSidebar: FC<IOtherCourseListProps> = ({ otherCourseData, hasError }) => {
  const theme = useTheme();
  const matchDownlg = useMediaQuery(theme.breakpoints.down('lg'));
  const params = useParams<IInnerPageParams>();
  const ins = params?.ins;
  const name = params?.name;
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        otherCourseData.length > 0 && (
          <Box className={sidebarStyle.mainBox} data-test-id="course-fees-inner-courses-sidebar">
            <Box className={sidebarStyle.subMainBox}>
              <Box className={sidebarStyle.headingBox}>
                <Typography className={sidebarStyle.heading}>{OtherCoursesTitle.OTHER_COURSES}</Typography>
              </Box>
              <Box className={sidebarStyle.fullContentBox}>
                {otherCourseData &&
                  otherCourseData.map((data) => (
                    <Grid
                      container
                      key={data.courseId}
                      className={sidebarStyle.contentBox}
                      data-test-id={`course-fees-inner-courses-sidebar-${data.courseId}`}
                    >
                      <Grid item xs={11} md={8}>
                        <Box className={sidebarStyle.collegeNameBox}>
                          <Link
                            href={`/${ins}/${name}/course-fees/${data.courseShortURL}/overview`}
                            className={sidebarStyle.courseName}
                            aria-label={`Navigate to ${data.courseName} Overview`}
                            data-test-id={`course-fees-inner-courses-sidebar-link-${data.courseName}`}
                          >
                            {CapitalizedString(data.courseName)}
                          </Link>
                        </Box>
                      </Grid>
                      <Grid item xs={1} md={4} className={sidebarStyle.buttonBox}>
                        {matchDownlg ? (
                          <Box className={sidebarStyle.iconBox}>
                            <Link
                              href={`/${ins}/${name}/course-fees/${data.courseShortURL}/overview`}
                              style={{ justifyContent: 'center', display: 'flex' }}
                              aria-label={`View ${data.courseName} Overview`}
                              data-test-id={`course-fees-inner-courses-sidebar-${data.courseName}-view`}
                            >
                              <KeyboardArrowRightIcon
                                className={sidebarStyle.icon}
                                aria-label={`View ${data.courseName} Overview`}
                              />
                            </Link>
                          </Box>
                        ) : (
                          <Link
                            href={`/${ins}/${name}/course-fees/${data.courseShortURL}/overview`}
                            className={sidebarStyle.viewLink}
                            aria-label={`View ${data.courseName} Overview`}
                            data-test-id={`course-fees-inner-courses-sidebar-${data.courseName}-view`}
                          >
                            {OtherCoursesTitle.VIEW_LINK}
                          </Link>
                        )}
                      </Grid>
                    </Grid>
                  ))}
              </Box>
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default OtherCoursesSidebar;
