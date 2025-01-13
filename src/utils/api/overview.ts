import { getBannerData, getFaqData, getOtherCollegeData, getSubMenuData } from './common';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { IAdmissionProps } from 'ui-component/college-overview-page/admission/Admission';
import { IBlogProps } from 'ui-component/college-overview-page/blogs/Blogs';
import { ICollegeFeesProps } from 'ui-component/college-overview-page/course-fees';
import { IExamsAndCutoffsProps } from 'ui-component/college-overview-page/exams-and-cutoffs';
import { IGalleryImageProps } from 'ui-component/college-overview-page/gallery';
import { IHighlightsProps } from 'ui-component/college-overview-page/highlights';
import { IOverviewProps } from 'ui-component/college-overview-page/overview-section/OverviewContent';
import { IFacilitiesProps } from 'ui-component/college-overview-page/placement-facility/Facility';
import { IPlacementsProps } from 'ui-component/college-overview-page/placements-and-salary';
import { IReviewDataProps } from 'ui-component/college-overview-page/review-percentage';
import { ICollegeReviewsDataProps } from 'ui-component/college-overview-page/students-reviews';
import { IOverviewPageProps, IPageParamsProps, Stream } from 'types';

/*API to get description  */
export const getDescriptionData = async (collegeName: string, stream: string) => {
  const data: IOverviewProps = {
    hasError: false,
    overviewData: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeDescription}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.overviewData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get reviews  */
export const getCollegeReviews = async (collegeName: string, stream: string) => {
  const data: ICollegeReviewsDataProps = {
    hasError: false,
    collegeReviews: {
      shortName: '',
      collegeReviews: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeReviews}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.collegeReviews = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get blogs  */
export const getBlogData = async (collegeName: string, stream: string) => {
  const data: IBlogProps = {
    hasError: false,
    blogData: { shortName: '', latestBlogs: [] }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeLatestBlogs}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.blogData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get admission data  */
export const getAdmissionData = async (collegeName: string, stream: string) => {
  const data: IAdmissionProps = {
    hasError: false,
    admissionData: []
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeAdmission}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.admissionData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get admission data  */
export const getHighlightsData = async (collegeName: string, stream: string) => {
  const data: IHighlightsProps = {
    hasError: false,
    highlightData: {
      stream: ''
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeHighlights}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.highlightData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get gallery data  */
export const getGalleryImgData = async (collegeName: string, stream: string) => {
  const data: IGalleryImageProps = {
    hasError: false,
    galleryImages: {
      shortName: '',
      gallery: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeGallery}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.galleryImages = response;
    }
    // data.galleryImages = GalleryMock;
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get overallRatings data  */
export const getOverAllRatingsData = async (collegeName: string, stream: string) => {
  const data: IReviewDataProps = {
    hasError: false,
    reviewData: {
      shortName: '',
      overallRating: 0,
      fourToFiveStar: 0,
      threeToFourStar: 0,
      twoToThreeStar: 0,
      oneToTwoStar: 0,
      verifiedReviews: 0,
      stream: ''
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeOverAllRating}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.reviewData = response;
    }
  } catch (error) {
    data.hasError = true;
  }

  return data;
};

/*API to get examsandcutoff data  */
export const getExamsAndCutoffsData = async (collegeName: string, stream: string) => {
  const data: IExamsAndCutoffsProps = {
    hasError: false,
    examData: { shortName: '', examMode: [] }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeExamsAndCutoffs}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.examData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get exams data  */
export const getCourseAndFeesData = async (collegeName: string, stream: string) => {
  const data: ICollegeFeesProps = {
    hasError: false,
    courseFeesData: {
      shortName: '',
      ugCourse: '',
      ugCount: 0,
      ugFees: '',
      pgCourse: '',
      pgCount: 0,
      pgFees: ''
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeCourseAndFees}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.courseFeesData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get facilities data  */
export const getFacilitiesData = async (collegeName: string, stream: string) => {
  const data: IFacilitiesProps = {
    hasError: false,
    facilitiesData: {
      shortName: '',
      facilities: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeFacilities}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.facilitiesData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get placement data  */
export const getPlacementsData = async (collegeName: string, stream: string) => {
  const data: IPlacementsProps = {
    hasError: false,
    placementData: {
      shortName: '',
      medianSalary: 0,
      collegePlacements: '',
      maxPackage: ''
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegePlacements}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.placementData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// get overview page data

export const getOverviewData = async ({
  params,
  domain
}: {
  params: IPageParamsProps;
  domain: string;
}): Promise<IOverviewPageProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const pageName = 'overview';

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const faqDataResponse = await getFaqData(params.name, pageName, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const overviewDataResponse = await getDescriptionData(params.name, stream);
  const reviewsResponse = await getCollegeReviews(params.name, stream);
  const blogDataResponse = await getBlogData(params.name, stream);
  const admissionDataResponse = await getAdmissionData(params.name, stream);
  const placementDataResponse = await getPlacementsData(params.name, stream);
  const highlightDataResponse = await getHighlightsData(params.name, stream);
  const courseFeesDataResponse = await getCourseAndFeesData(params.name, stream);
  const galleryImageDataResponse = await getGalleryImgData(params.name, stream);
  const examCutoffDataResponse = await getExamsAndCutoffsData(params.name, stream);
  const facilitiesDataResponse = await getFacilitiesData(params.name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(params.name, stream);
  const reviewDataResponse = await getOverAllRatingsData(params.name, stream);

  const data: IOverviewPageProps = {
    subMenu: subMenuDataResponse,
    collegeReviews: reviewsResponse,
    faqData: faqDataResponse,
    bannerData: bannerDataResponse,
    overviewData: overviewDataResponse,
    blogData: blogDataResponse,
    highlightData: highlightDataResponse,
    placementData: placementDataResponse,
    admissionData: admissionDataResponse,
    galleryImages: galleryImageDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    examData: examCutoffDataResponse,
    courseFeesData: courseFeesDataResponse,
    facilitiesData: facilitiesDataResponse,
    reviewData: reviewDataResponse
  };
  return data;
};
