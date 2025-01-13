import { getBannerData, getFaqData, getOtherCollegeData, getSubMenuData } from './common';

import { API_BASE_URL } from 'config';
import { IFacultyPageProps, IPageParamsProps, Stream } from 'types';
import { Api } from 'types/enums';
import { IFacultyDataProps } from 'ui-component/college-faculty-page/faculty-details';
import { IProfessorProps } from 'ui-component/college-faculty-page/professors-list';

// get description data
export const getDescriptionData = async (collegeName: string, stream: string) => {
  const data: IFacultyDataProps = {
    hasError: false,
    facultyData: {
      totalFaculty: 0,
      totalPhdFaculty: 0,
      femaleFaculty: 0,
      studentRatio: '',
      facultyDescription: ''
    }
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeFacultyDescription}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.facultyData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// get professors list
export const getProfessorsList = async (collegeName: string, stream: string) => {
  const data: IProfessorProps = {
    hasError: false,
    listData: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeFacultyProfessors}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.listData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// get faculty page data

export const getFacultyData = async ({
  params,
  domain
}: {
  params: IPageParamsProps;
  domain: string;
}): Promise<IFacultyPageProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const pageName = 'faculty';

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const faqDataResponse = await getFaqData(params.name, pageName, stream);
  const facultyDataResponse = await getDescriptionData(params.name, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const ProfessorsDataResponse = await getProfessorsList(params.name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(params.name, stream);

  const data: IFacultyPageProps = {
    subMenu: subMenuDataResponse,
    bannerData: bannerDataResponse,
    facultyData: facultyDataResponse,
    listData: ProfessorsDataResponse,
    faqData: faqDataResponse,
    otherCollegeData: otherCollegeDataResponse
  };
  return data;
};
