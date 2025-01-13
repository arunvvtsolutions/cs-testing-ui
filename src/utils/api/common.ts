import axios from 'axios';

import { API_BASE_URL } from 'config';
import { IMetaProps } from 'types';
import { ICollegeData, ICourse, IPageData } from 'types/college';
import { Api } from 'types/enums';
import { IBannerProps } from 'ui-component/college-overview-page/banner';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { IOtherCollegeProps } from 'ui-component/college-overview-page/overview-sidebar';
import { IOtherCourseListProps } from 'ui-component/course-fees-inner-page/courses-sidebar';
import { ISubMenuProps } from 'ui-component/subheader';
import axiosServices from 'utils/axios';

/*API to get Banner  */
export const getBannerData = async (collegeName: string, stream: string) => {
  const data: IBannerProps = {
    hasError: false,
    bannerData: {
      logo: ''
    }
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeBanner}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.bannerData = response.length > 0 ? response[0] : {};
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get FaqData  */
export const getFaqData = async (collegeName: string, pageName: string, stream: string) => {
  const data: IFAQsProps = {
    hasError: false,
    faqData: { faq: [] },
    shortName: ''
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeFaq}/${collegeName}/${pageName}`);

    if (res.ok) {
      const response = await res.json();

      if (data.faqData && data.faqData.faq) data.faqData.faq = response.faq;
      data.shortName = response.shortName;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get othercollege data  */
export const getOtherCollegeData = async (collegeName: string, stream: string) => {
  const data: IOtherCollegeProps = {
    hasError: false,
    otherCollegeData: { otherColleges: [] }
  };

  try {
    const category = await getCategoryData(collegeName, stream);
    const res = await fetch(
      `${API_BASE_URL}/${stream}/${Api.collegeOtherColleges}/${collegeName}/${stream}/${category.name}`
    );

    if (res.ok) {
      const response = await res.json();
      data.otherCollegeData.otherColleges = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

///*API to get category data  */
export const getCategoryData = async (collegeName: string, stream: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeCategory}/${collegeName}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

///*API to get inner page data  */
export const getInnerPageData = async (collegeName: string, pageName: string, stream: string) => {
  const data: IMetaProps = {
    hasError: false,
    meta: {
      description: '',
      keywords: '',
      title: ''
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeInnerPageData}/${collegeName}/${pageName}`);

    if (res.ok) {
      const response = await res.json();

      data.meta = response.length > 0 ? response[0] : {};
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};
//API for course inner page - other courses

export const getOtherCourseData = async (collegeName: string, courseName: string, stream: string) => {
  const data: IOtherCourseListProps = {
    hasError: false,
    otherCourseData: []
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeOtherCourse}/${collegeName}/${courseName}`);

    if (res.ok) {
      const response = await res.json();
      data.otherCourseData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// To Get Top collges by type and category
export const getTopCollegesData = async (type: number, category: string, top: number, stream: string) => {
  interface ITopcolleges {
    hasError: boolean;
    topColleges: ICollegeData;
  }
  const data: ITopcolleges = {
    hasError: false,
    topColleges: {
      collegeData: [],
      courses: [],
      pageData: {
        title: '',
        description: '',
        keywords: '',
        url: '',
        contents: '',
        collegeTypeId: 0
      }
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.topColleges}/${top}/${category}/${type}`);

    if (res.ok) {
      const response = await res.json();
      data.topColleges.collegeData = response.collegeData;
      data.topColleges.courses = response.courses;
      data.topColleges.pageData = response.pageData.length > 0 ? response.pageData[0] : {};
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};
// SUBMENU_API_BELOW

// get all colleges data under purticular place
export const getTopCollegesList = async (place: string, stream: string, subStream: string) => {
  interface ITopcolleges {
    hasError: boolean;
    topColleges: ICollegeData;
  }
  const data: ITopcolleges = {
    hasError: false,
    topColleges: {
      collegeData: [],
      courses: [],
      pageData: {
        title: '',
        description: '',
        keywords: '',
        url: '',
        contents: '',
        collegeTypeId: 0
      }
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.topColleges}/${subStream}/${place}`);

    if (res.ok) {
      const response = await res.json();
      data.topColleges.collegeData = response.collegeData;
      data.topColleges.courses = response.courses;
      data.topColleges.pageData = response.pageData.length > 0 ? response.pageData[0] : {};
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// get categories based college list
export const getCatgryTopCollegesList = async (
  category: string,
  stream: string,
  subStream: string,
  place = 'india'
) => {
  interface ITopcolleges {
    hasError: boolean;
    topColleges: ICollegeData;
  }
  const data: ITopcolleges = {
    hasError: false,
    topColleges: {
      collegeData: [],
      courses: [],
      pageData: {
        title: '',
        description: '',
        keywords: '',
        url: '',
        contents: '',
        collegeTypeId: 0
      }
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.topCollegesList}/${category}/${subStream}/${place}`);

    if (res.ok) {
      const response = await res.json();
      data.topColleges.collegeData = response.collegeData;
      data.topColleges.courses = response.courses;
      data.topColleges.pageData = response.pageData.length > 0 ? response.pageData[0] : {};
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// get colleges based on courses
export const getCourseTopCollegesList = async (course: string, stream: string, subStream: string, place: string) => {
  interface ITopcolleges {
    hasError: boolean;
    topColleges: ICollegeData;
  }
  const data: ITopcolleges = {
    hasError: false,
    topColleges: {
      collegeData: [],
      courses: [],
      pageData: {
        title: '',
        description: '',
        keywords: '',
        url: '',
        contents: '',
        collegeTypeId: 0
      }
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.topCourseColleges}/${course}/${subStream}/${place}`);

    if (res.ok) {
      const response = await res.json();
      data.topColleges.collegeData = response.collegeData;
      data.topColleges.courses = response.courses;
      data.topColleges.pageData = response.pageData.length > 0 ? response.pageData[0] : {};
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// get all top collges data
export const getAllTopCollegesData = async (stream: string) => {
  interface ITopcolleges {
    hasError: boolean;
    topColleges: ICollegeData;
  }

  const data: ITopcolleges = {
    hasError: false,
    topColleges: {
      collegeData: [],
      courses: [],
      pageData: {
        title: '',
        description: '',
        keywords: '',
        url: '',
        contents: '',
        collegeTypeId: 0
      }
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.topColleges}/${stream}/${stream}`);

    if (res.ok) {
      const response = await res.json();
      data.topColleges.collegeData = response.collegeData;
      data.topColleges.courses = response.courses;
      data.topColleges.pageData = response.pageData.length > 0 ? response.pageData[0] : {};
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getSubMenuData = async (collegeName: string, stream: string) => {
  const data: ISubMenuProps = {
    hasError: false,
    subMenu: []
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeSubmenu}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.subMenu = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getTopCourses = async (stream: string, courses: number[], type: string) => {
  let data: ICourse[] = [];

  const res = await axios.post(`${API_BASE_URL}/${stream}/${Api.topCoures}`, {
    courseIds: courses,
    type
  });

  data = res.data;

  return data;
};

export const getTopCollegesPageData = async (place: string, stream: string, subStream: string) => {
  let data: IPageData = {
    title: '',
    url: '',
    description: '',
    keywords: '',
    contents: '',
    collegeTypeId: 0
  };
  try {
    const res = await fetch(
      `/api/pagedata/colleges-pagedata-api?place=${place}&substream=${subStream}&stream=${stream}`
    );

    if (res.ok) {
      const result = await res.json();
      data = result[0];
    }
  } catch (error) {
    console.log(error);
  }
  return data;
};

export const getTopTenCollegesPageData = async (
  categoty: string | string[],
  substream: string | string[],
  stream: string
) => {
  try {
    let data: IPageData = {
      title: '',
      url: '',
      description: '',
      keywords: '',
      contents: '',
      collegeTypeId: 0
    };
    const res = await fetch(
      `/api/topcollegesPagedata-api?categoty=${categoty}&substream=${substream}&stream=${stream}`
    );

    if (res.ok) {
      const result = await res.json();
      data = Array.isArray(result?.pageData) ? result?.pageData[0] : result?.pageData;
      return data;
    }
  } catch (error) {}
};

export const getTopCollegesCoursePageData = async (course: string | string[], stream: string, subStream: string) => {
  let data: IPageData = {
    title: '',
    url: '',
    description: '',
    keywords: '',
    contents: '',
    collegeTypeId: 0
  };
  try {
    const res = await fetch(
      `/api/pagedata/course-pagedata-api?course=${course}&substream=${subStream}&stream=${stream}`
    );

    if (res.ok) {
      const result = await res.json();
      data = result[0];
    }
  } catch (error) {}
  return data;
};

export const getTopCollegesCategoryPageData = async (
  category: string,
  place: string,
  stream: string,
  subStream: string
) => {
  let data: IPageData = {
    title: '',
    url: '',
    description: '',
    keywords: '',
    contents: '',
    collegeTypeId: 0
  };
  try {
    const res = await fetch(
      `/api/pagedata/category-pagedata-api?category=${category}&substream=${subStream}&place=${place}&stream=${stream}`
    );

    if (res.ok) {
      const result = await res.json();
      data = result[0];
    }
  } catch (error) {}
  return data;
};

export const getUserData = async () => {
  try {
    const responds = await axiosServices.get(`${API_BASE_URL}/${Api.userData}`);

    return responds.data;
  } catch (error) {
    throw error;
  }
};

export const verifyMobileNumber = async (currentMob: string, newNumber: string) => {
  try {
    const result = await axiosServices.get(`${API_BASE_URL}/${Api.verifyMobileNumber}/${newNumber}/${currentMob}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};
