import { getBannerData, getFaqData, getOtherCollegeData, getSubMenuData } from './common';
import { getOverAllRatingsData } from './overview';

import { API_BASE_URL } from 'config';
import { IReviewPageProps, Stream } from 'types';
import { Api } from 'types/enums';
import { ICollegeReviewsDataProps } from 'ui-component/college-overview-page/students-reviews';
import { IReviews } from 'ui-component/college-review-page/add-review-popup';

// collegeReviewData api
export const getCollegeReviewsData = async (collegeName: string, stream: string) => {
  const data: ICollegeReviewsDataProps = {
    hasError: false,
    collegeReviews: {
      shortName: '',
      collegeReviews: []
    }
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeReviewStudentReviews}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.collegeReviews = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// Add review popup post api
export const postAddReviewData = async (data: IReviews) => {
  try {
    const res = await fetch(`/api/review-api`, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (res.ok) {
      return { status: 1 };
    } else return { status: 0 };
  } catch (error) {
    return { status: 0 };
  }
};

export const getReviewPageData = async ({
  params,
  domain
}: {
  params: { name: string; ins: string };
  domain: string;
}): Promise<IReviewPageProps> => {
  const pageName = 'review';
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const faqDataResponse = await getFaqData(params.name, pageName, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(params.name, stream);
  const collegeReviewsResponse = await getCollegeReviewsData(params.name, stream);
  const reviewDataResponse = await getOverAllRatingsData(params.name, stream);

  const data: IReviewPageProps = {
    subMenu: subMenuDataResponse,
    faqData: faqDataResponse,
    bannerData: bannerDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    collegeReviews: collegeReviewsResponse,
    reviewData: reviewDataResponse
  };
  return data;
};
