import { getBannerData, getOtherCourseData, getSubMenuData } from '../common';

import { IFeesStructureParamProps } from 'app/(guest)/[ins]/[name]/course-fees/[courseName]/fees-structure/page';
import { API_BASE_URL } from 'config';
import { IinnerFeeStructureProps, Stream } from 'types';
import { Api } from 'types/enums';
import { ICourseDetailsProps } from 'ui-component/course-fees-inner-page/fees-structure/course-details';

/*API to get description  */
export const getCourseFeeStructureData = async (collegeName: string, courseName: string, stream: string) => {
  const data: ICourseDetailsProps = {
    hasError: false,
    courseInfoData: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeCourseFeeStructure}/${collegeName}/${courseName}`);

    if (res.ok) {
      const response = await res.json();
      data.courseInfoData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// course fee inner page fee structure

export const getInnerFeeStructureData = async ({
  params,
  domain
}: {
  params: IFeesStructureParamProps;
  domain: string;
}): Promise<IinnerFeeStructureProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const feesDataResponse = await getCourseFeeStructureData(params.name, params.courseName, stream);
  const otherCourseDataResponse = await getOtherCourseData(params.name, params.courseName, stream);

  const data: IinnerFeeStructureProps = {
    subMenu: subMenuDataResponse,
    bannerData: bannerDataResponse,
    courseInfoData: feesDataResponse,
    otherCourseList: otherCourseDataResponse
  };
  return data;
};
