/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBannerData, getFaqData, getOtherCollegeData, getSubMenuData } from './common';

import { API_BASE_URL } from 'config';
import { ICutOffPageProps, IPageParamsProps, Stream } from 'types';
import { Api } from 'types/enums';
import { ICutOffFormProps } from 'ui-component/college-cutoff-page/cutoff-form';
import { IExamsAndCutoffsProps } from 'ui-component/college-overview-page/exams-and-cutoffs';
import { IContentProps } from 'ui-component/college-placements-page/overview-content/ContentSection';
/*API to get cutoff-contentdata  */
export const getContentData = async (collegeName: string, stream: string) => {
  const data: IContentProps = {
    hasError: false,
    contentData: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeCutoffDescriptions}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.contentData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get examsandcutoff   */
export const getExamsAndCutoffsData = async (collegeName: string, stream: string) => {
  const data: IExamsAndCutoffsProps = {
    hasError: false,
    examData: { shortName: '', examMode: [] }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeCutoffExams}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.examData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get cutoffForm   */
export const getCutoffFormData = async (collegeName: string, stream: string) => {
  const data: ICutOffFormProps = {
    hasError: false,
    cutoffFormData: {
      caste: [],
      course: [],
      gender: [],
      quota: [],
      stream: ''
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeCutoffForm}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.cutoffFormData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get cutoffResutData   */
export const getResultFormData = async (
  collegeName: any,
  courseId: number,
  casteId: number,
  genderId: number,
  quotaId: number,
  stream: string
) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/${stream}/${Api.collegeCutofResult}/${collegeName}/${courseId}/${casteId}/${genderId}/${quotaId}`
    );

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// get cutoff page data
export const getCutOffData = async ({
  params,
  domain
}: {
  params: IPageParamsProps;
  domain: string;
}): Promise<ICutOffPageProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const pageName = 'cutoff';

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const faqDataResponse = await getFaqData(params.name, pageName, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(params.name, stream);
  const contentDataResponse = await getContentData(params.name, stream);
  const examDataResponse = await getExamsAndCutoffsData(params.name, stream);
  const cutoffFormDataResponse = await getCutoffFormData(params.name, stream);

  const data: ICutOffPageProps = {
    subMenu: subMenuDataResponse,
    faqData: faqDataResponse,
    bannerData: bannerDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    contentData: contentDataResponse,
    examData: examDataResponse,
    cutoffFormData: cutoffFormDataResponse
  };
  return data;
};
