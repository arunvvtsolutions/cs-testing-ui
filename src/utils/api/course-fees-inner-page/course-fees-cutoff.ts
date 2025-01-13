/* eslint-disable @typescript-eslint/no-explicit-any */
/*API to get contactDetails*/

import { getBannerData, getSubMenuData } from '../common';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { ICutoffResultsProps } from 'ui-component/college-cutoff-page/cutoff-results';
import { ICutOffInnerPageProps, Stream } from 'types';
import { IInnerCutOffParamProps } from 'app/(guest)/[ins]/[name]/course-fees/[courseName]/cutoff/page';

export const getFilterData = async (collegeName: string, courseName: string, stream: string) => {
  const data: any = {
    hasError: false,
    filteredData: {
      caste: [],
      gender: [],
      quota: []
    },
    filterState: {
      caste: [],
      gender: [],
      quota: []
    }
  };

  try {
    const casteRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.collegeCourseAndFeesCutoffCaste}/${collegeName}/${courseName}`
    );
    const quotaRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.collegeCourseAndFeesCutoffQuota}/${collegeName}/${courseName}`
    );
    const genderRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.collegeCourseAndFeesCutoffGender}/${collegeName}/${courseName}`
    );

    if (casteRes.ok) {
      const casteResponse = await casteRes.json();
      data.filteredData.caste = casteResponse;
    }
    if (quotaRes.ok) {
      const quotaResponse = await quotaRes.json();
      data.filteredData.quota = quotaResponse;
    }
    if (genderRes.ok) {
      const genderResponse = await genderRes.json();
      data.filteredData.gender = genderResponse;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCutoffData = async (collegeName: string, courseName: string, stream: string) => {
  const data: ICutoffResultsProps = {
    hasError: false,
    cutoffResultsData: {
      years: [],
      results: []
    }
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeCourseAndFeesCutoff}/${collegeName}/${courseName}`);

    if (res.ok) {
      const response = await res.json();
      data.cutoffResultsData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// get cutoffinner page data

export const getCutOffInnerData = async ({
  params,
  domain
}: {
  params: IInnerCutOffParamProps;
  domain: string;
}): Promise<ICutOffInnerPageProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const cutoffResultsDataResponse = await getCutoffData(params.name, params.courseName, stream);
  const filterdataResponse = await getFilterData(params.name, params.courseName, stream);

  const data: ICutOffInnerPageProps = {
    subMenu: subMenuDataResponse,
    bannerData: bannerDataResponse,
    cutoffResultsData: cutoffResultsDataResponse,
    filteredData: filterdataResponse
  };
  return data;
};
