import { getBannerData, getFaqData, getOtherCollegeData, getSubMenuData } from './common';

import { API_BASE_URL } from 'config';
import { IAdmissionEligibilityProps, Stream } from 'types';
import { Api } from 'types/enums';
import { IContentProps } from 'ui-component/college-admission-eligibility/overview-section/ContentSection';
import { IAdmissionProps } from 'ui-component/college-overview-page/admission/Admission';

// college_admission_eligibility_discription
export const getDescriptionData = async (collegeName: string, stream: string) => {
  const data: IContentProps = {
    hasError: false,
    contentData: []
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeDescriptions}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.contentData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// college_admission_eligibility_admissionData

export const getAdmissionData = async (collegeName: string, stream: string) => {
  const data: IAdmissionProps = {
    hasError: false,
    admissionData: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeAdmissionEligibility}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.admissionData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// get admission and eligibility page data

export const getAdmissionEligibilityData = async ({
  params,
  domain
}: {
  params: { name: string; ins: string };
  domain: string;
}): Promise<IAdmissionEligibilityProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const pageName = 'admission-eligibility';

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(params.name, stream);
  const contentDataResponse = await getDescriptionData(params.name, stream);
  const admissionDataResponse = await getAdmissionData(params.name, stream);
  const faqDataResponse = await getFaqData(params.name, pageName, stream);

  const data: IAdmissionEligibilityProps = {
    subMenu: subMenuDataResponse,
    bannerData: bannerDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    admissionData: admissionDataResponse,
    contentData: contentDataResponse,
    faqData: faqDataResponse
  };
  return data;
};
