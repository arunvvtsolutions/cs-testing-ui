'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material';

import OverviewContent from './overview-content';
import CoursesList, { ICourseListProps } from './course-list';
import CourseFaq from './coursefee-faq';
import CourseFeesFilter, { ICourseProps } from './course-fees-filter';
import { IContentProps } from './overview-content/ContentSection';

import MainBanner, { IBannerProps } from 'ui-component/college-overview-page/banner';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { ISubMenuProps } from 'ui-component/subheader';
import { useDispatch, useSelector } from 'store';
import { getSelectedCourse } from 'store/slices/course-fees';

export interface ICourseFeesProps {
  data: {
    faqData: IFAQsProps;
    bannerData: IBannerProps;
    contentData: IContentProps;
    courseFilterData: ICourseProps;
    courseListData: ICourseListProps;
    subMenu: ISubMenuProps;
  };
}

const CourseFeeComponents: React.FC<ICourseFeesProps> = ({ data }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [filterCourseList, setFilterCourse] = useState<ICourseListProps>({
    courseListData: {
      courseList: [],
      courseYear: '',
      overallCourses: 0,
      coursesShort: []
    },
    hasError: false
  });
  const theme = useTheme();
  const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();

  const { selectedCourseId } = useSelector((state) => state.courseFees);

  // for selecting the course id from the overview page
  useEffect(() => {
    if (selectedCourseId) {
      const { coursesShort } = data.courseListData.courseListData;
      const selectedData = coursesShort?.find((course) => course.name.includes(selectedCourseId));
      setSelectedCourse(String(selectedData?.id));
    }
  }, [data.courseListData.courseListData, selectedCourseId]);
  useEffect(() => {
    return () => {
      dispatch(getSelectedCourse(''));
    };
  }, [dispatch]);
  useEffect(() => {
    const resultList = data.courseListData.courseListData.courseList.filter((data) => {
      if (selectedCourse && data.degreeId) {
        return data.degreeId?.toString() === selectedCourse.toString();
      } else {
        return data;
      }
    });

    setFilterCourse({
      hasError: data.courseListData.hasError,
      courseListData: {
        courseList: resultList,
        courseYear: data.courseListData.courseListData.courseYear,
        overallCourses: data.courseListData.courseListData.overallCourses,
        coursesShort: data.courseListData.courseListData.coursesShort
      }
    });
  }, [
    data.courseListData.courseListData.courseList,
    data.courseListData.courseListData.coursesShort,
    data.courseListData.courseListData.courseYear,
    data.courseListData.courseListData.overallCourses,
    data.courseListData.hasError,
    selectedCourse
  ]);

  return (
    <>
      <MainBanner {...data.bannerData} />

      <Grid container spacing={2}>
        <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
          <Box
            sx={{
              paddingRight: {
                xl: '30px',
                lg: '0px',
                md: '0px',
                sm: '0px',
                xs: '0px'
              }
            }}
          >
            <OverviewContent {...data.contentData} />
            <CoursesList {...filterCourseList} selectedCourse={selectedCourse} />
            <CourseFaq {...data.faqData} />
            {/* mobile course fee filter below */}
            {matchDownLg && (
              <CourseFeesFilter
                {...data.courseFilterData}
                selectedDegree={data.courseListData.courseListData.coursesShort}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
              />
            )}
          </Box>
        </Grid>
        <Grid
          item
          xl={4}
          lg={4}
          md={12}
          sx={{
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }
          }}
        >
          <Box className="stickySidebar">
            <CourseFeesFilter
              {...data.courseFilterData}
              selectedDegree={data.courseListData.courseListData.coursesShort}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CourseFeeComponents;
