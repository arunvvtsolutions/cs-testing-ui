import { getBannerData, getFaqData, getOtherCollegeData, getSubMenuData } from './common';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { ICampusProps } from 'ui-component/college-amenities-page/campus-overview/index';
import { IFacilityProps } from 'ui-component/college-amenities-page/facilities-list/index';
import { IDescDataProps } from 'ui-component/college-amenities-page/amenities-description/index';
import { IAmenitiesPageProps, IPageParamsProps, Stream } from 'types';

// API to get campusOverview
export const getCampusOverviewData = async (collegeName: string, stream: string) => {
  const data: ICampusProps = {
    hasError: false,
    campusData: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.campusOverview}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.campusData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// API to get facilitiesList
export const getFacilitiesListData = async (collegeName: string, stream: string) => {
  const data: IFacilityProps = {
    hasError: false,
    facilitiesData: {
      shortName: '',
      facilities: []
    }
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.facilityList}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.facilitiesData = response;
    }
  } catch (error) {
    data.hasError = true;
  }

  return data;
};

// API to get amenitiesDescription
export const getAmenitiesDescriptionData = async (collegeName: string, stream: string) => {
  const data: IDescDataProps = {
    hasError: false,
    descData: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.amenitiesdesc}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.descData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// get amenities page data

export const getAmenitiesData = async ({
  params,
  domain
}: {
  params: IPageParamsProps;
  domain: string;
}): Promise<IAmenitiesPageProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const pageName = 'amenities';

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const faqDataResponse = await getFaqData(params.name, pageName, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const campusOverviewDataResponse = await getCampusOverviewData(params.name, stream);
  const facilitiesListDataResponse = await getFacilitiesListData(params.name, stream);
  const amenitiesDescDataResponse = await getAmenitiesDescriptionData(params.name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(params.name, stream);

  const data: IAmenitiesPageProps = {
    faqData: faqDataResponse,
    bannerData: bannerDataResponse,
    campusData: campusOverviewDataResponse,
    facilitiesData: facilitiesListDataResponse,
    descData: amenitiesDescDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    subMenu: subMenuDataResponse
  };
  return data;
};
