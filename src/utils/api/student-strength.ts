import { getBannerData, getFaqData, getOtherCollegeData, getSubMenuData } from './common';

import { API_BASE_URL } from 'config';
import { IPageParamsProps, IStudentStrengthProps, Stream } from 'types';
import { Api } from 'types/enums';
import { IContentProps } from 'ui-component/college-placements-page/overview-content/ContentSection';
import { IApprovedIntakeProps } from 'ui-component/college-student-strength-page/approved-intake';
import { IDiversityDataProps } from 'ui-component/college-student-strength-page/diversity-inclusion';
import { ICategoriesProps } from 'ui-component/college-student-strength-page/students-categorywise-section';
import { StrengthDataProps } from 'ui-component/college-student-strength-page/total-students-section';

/*API to get description  */
export const getDescriptionData = async (collegeName: string, stream: string) => {
  const data: IContentProps = {
    hasError: false,
    contentData: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeStudentStrengthDesc}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.contentData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get admission categorywise  */
export const getAdmissionCategory = async (collegeName: string, stream: string) => {
  const data: ICategoriesProps = {
    hasError: false,
    categoryData: {
      categories: [],
      series: [],
      shortName: ''
    }
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeStudentsAdmissionCategories}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.categoryData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get admission intakes  */
export const getAdmissionIntake = async (collegeName: string, stream: string) => {
  const data: IApprovedIntakeProps = {
    hasError: false,
    approvedIntakeData: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeStudentsAdmissionIntake}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.approvedIntakeData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get admission intakes  */
export const getAdmissionStudentsStregth = async (collegeName: string, stream: string) => {
  const data: StrengthDataProps = {
    hasError: false,
    noOfStudents: [],
    totalStrength: {
      shortName: '',
      years: [],
      data: []
    }
  };

  try {
    const res1 = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeTotalStudents}/${collegeName}`);
    const res2 = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeStudentsStrength}/${collegeName}`);

    if (res1.ok) {
      const response = await res1.json();
      data.totalStrength = response;
    }
    if (res2.ok) {
      const response = await res2.json();
      data.noOfStudents = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

/*API to get admission intakes  */
export const getAdmissionDeversity = async (collegeName: string, stream: string) => {
  const data: IDiversityDataProps = {
    hasError: false,
    diversityData: {
      shortName: '',
      diversity: {
        labels: [],
        series: []
      },
      previousYear: {
        year: [],
        series: []
      }
    },
    strengthData: {
      strength: {
        labels: [],
        series: []
      },
      previousYear: {
        year: [],
        series: []
      }
    }
  };

  try {
    const res1 = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeStudentDiversity}/${collegeName}`);
    const res2 = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeStudentDivesityStrength}/${collegeName}`);

    if (res1.ok) {
      const response = await res1.json();
      data.diversityData = response;
    }
    if (res2.ok) {
      const response = await res2.json();

      data.strengthData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// student strength page

export const getStudentStrengthData = async ({
  params,
  domain
}: {
  params: IPageParamsProps;
  domain: string;
}): Promise<IStudentStrengthProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const pageName = 'student-strength';
  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const descriptionDataResponse = await getDescriptionData(params.name, stream);
  const faqDataResponse = await getFaqData(params.name, pageName, stream);
  const categoryDataResponse = await getAdmissionCategory(params.name, stream);
  const approvedIntakeDataResponse = await getAdmissionIntake(params.name, stream);
  const strengthDataResponse = await getAdmissionStudentsStregth(params.name, stream);
  const diversityDataResponse = await getAdmissionDeversity(params.name, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(params.name, stream);

  const data: IStudentStrengthProps = {
    subMenu: subMenuDataResponse,
    contentData: descriptionDataResponse,
    faqData: faqDataResponse,
    categoryData: categoryDataResponse,
    approvedIntakeData: approvedIntakeDataResponse,
    strengthData: strengthDataResponse,
    diversityData: diversityDataResponse,
    bannerData: bannerDataResponse,
    otherCollegeData: otherCollegeDataResponse
  };
  return data;
};
