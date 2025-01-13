/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBannerData, getFaqData, getSubMenuData } from './common';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { IContentProps } from 'ui-component/course-fees-page/overview-content/ContentSection';
import { ICourseListProps } from 'ui-component/course-fees-page/course-list';
import { ICourseFeesPageProps, IPageParamsProps, Stream } from 'types';

export const getCollegeOverview = async (collegeName: string, stream: string) => {
  const data: IContentProps = {
    hasError: false,
    contentData: []
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeCourseFeesDescription}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.contentData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeCourseFilterCourseList = async (collegeName: string, limit: number, stream: string) => {
  const data: any = {
    hasError: false,
    courseFilterData: {
      coursesShort: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeCourseFilterCourseList}/${collegeName}/${limit}`);

    if (res.ok) {
      const response = await res.json();
      data.courseFilterData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeCourseList = async (collegeName: string, stream: string) => {
  const data: ICourseListProps = {
    hasError: false,
    courseListData: {
      courseYear: '',
      overallCourses: 0,
      courseList: [],
      coursesShort: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeCourseFeesCourseList}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.courseListData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// course and fees page data
export const getCourseFeesData = async ({
  params,
  domain
}: {
  params: IPageParamsProps;
  domain: string;
}): Promise<ICourseFeesPageProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const pageName = 'course-fees ';
  const degreeShort = 2;

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const faqDataResponse = await getFaqData(params.name, pageName, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const courseOverviewResponse = await getCollegeOverview(params.name, stream);
  const filterResponse = await getCollegeCourseFilterCourseList(params.name, degreeShort, stream);
  const courseListResponse = await getCollegeCourseList(params.name, stream);

  const data: ICourseFeesPageProps = {
    subMenu: subMenuDataResponse,
    faqData: faqDataResponse,
    bannerData: bannerDataResponse,
    contentData: courseOverviewResponse,
    courseFilterData: filterResponse,
    courseListData: courseListResponse
  };
  return data;
};
