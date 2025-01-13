import { getBannerData, getFaqData, getOtherCollegeData, getSubMenuData } from './common';

import { API_BASE_URL } from 'config';
import { IPageParamsProps, IPlacementPageProps, Stream } from 'types';
import { Api } from 'types/enums';
import { IGraduartionContentProps } from 'ui-component/college-placements-page/graduation-graph';
import { ISalaryContentProps } from 'ui-component/college-placements-page/median-salary-section';
import { IContentProps } from 'ui-component/college-placements-page/overview-content/ContentSection';
import { IPercentContentProps } from 'ui-component/college-placements-page/percentage-year-graph';
import { ICompaniesProps } from 'ui-component/college-placements-page/top-recruiters/RecruiterItem';
import { IYoutubeProps } from 'ui-component/college-placements-page/youtube-shorts';

/*API to get description  */
export const getPlacementDescriptionData = async (collegeName: string, stream: string) => {
  const data: IContentProps = {
    hasError: false,
    contentData: []
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegePlacementDescription}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.contentData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get topcomapanies  */
export const getTopCompaniesData = async (collegeName: string, stream: string) => {
  const data: ICompaniesProps = {
    hasError: false,
    topCompaniesData: {
      shortName: '',
      topRecruiters: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegePlacementTopRecruiters}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.topCompaniesData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get graduations  */
export const getGraduationData = async (collegeName: string, stream: string) => {
  const data: IGraduartionContentProps = {
    hasError: false,
    graduationData: []
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegePlacementGraduations}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.graduationData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

//
/*API to get graduations  */
export const getPercentData = async (collegeName: string, stream: string) => {
  const data: IPercentContentProps = {
    hasError: false,
    percentData: {
      shortName: '',
      placementPerc: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegePlacementPercentage}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.percentData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get medianSalary  */
export const getMedianSalaryData = async (collegeName: string, stream: string) => {
  const data: ISalaryContentProps = {
    hasError: false,
    salaryData: {
      shortName: '',
      medianSalary: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegePlacementMedianSalary}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.salaryData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get youtubeShorts  */
export const getYoutubeShortsData = async (collegeName: string, stream: string) => {
  const data: IYoutubeProps = {
    hasError: false,
    youtubeData: []
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegePlacementYoutubeShorts}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.youtubeData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getPlacementPageData = async ({
  params,
  domain
}: {
  params: IPageParamsProps;
  domain: string;
}): Promise<IPlacementPageProps> => {
  const { name } = params;

  const pageName = 'placement';
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const faqDataResponse = await getFaqData(name, pageName, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(name, stream);
  const contentDataResponse = await getPlacementDescriptionData(name, stream);
  const topCompaniesDataResponse = await getTopCompaniesData(name, stream);
  const graduationDataResponse = await getGraduationData(name, stream);
  const percentDataResponse = await getPercentData(name, stream);
  const medianSalaryDataResponse = await getMedianSalaryData(name, stream);
  const youtubeShortsDataResponse = await getYoutubeShortsData(name, stream);

  const data: IPlacementPageProps = {
    subMenu: subMenuDataResponse,
    faqData: faqDataResponse,
    bannerData: bannerDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    contentData: contentDataResponse,
    topCompaniesData: topCompaniesDataResponse,
    graduationData: graduationDataResponse,
    percentData: percentDataResponse,
    salaryData: medianSalaryDataResponse,
    youtubeData: youtubeShortsDataResponse
  };
  return data;
};
