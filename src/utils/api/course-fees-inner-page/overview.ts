import { getBannerData, getOtherCourseData, getSubMenuData } from '../common';

import { ICourseFeesOverviewParams } from 'app/(guest)/[ins]/[name]/course-fees/[courseName]/overview/page';
import { API_BASE_URL } from 'config';
import { ICourseFeesOverview, Stream } from 'types';
import { Api } from 'types/enums';
// import { IOverviewProps } from 'ui-component/college-overview-page/overview-section/OverviewContent';
import { ICourseOverviewDetailsProps } from 'ui-component/course-fees-inner-page/overview/course-details';
import { IAdmittedSeatProps } from 'ui-component/free-tool/kyc-medical/admitted-seat-matrix';
import { IAllotedSeatProps } from 'ui-component/free-tool/kyc-medical/alloted-seat-matrix';
import { IAllottedAdmitBarProps } from 'ui-component/free-tool/kyc-medical/allotted-admitted-bar-chart';
import { IIntakeProps } from 'ui-component/medical/course-fees-inner-page/overview/course-intake';
import { IClosingRankDataProps } from 'ui-component/medical/course-fees-inner-page/overview/cutoff-clossingRank';
import { ISeatDataProps } from 'ui-component/medical/course-fees-inner-page/overview/cutoff-seatallocation';

///*API to get inner course fees inner overview data  */
export const getInnerCourseOverviewData = async (collegeName: string, courseName: string, stream: string) => {
  const data: ICourseOverviewDetailsProps = {
    hasError: false,
    courseDetailsData: []
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeFeesInnerOverview}/${collegeName}/${courseName}`);

    if (res.ok) {
      const response = await res.json();
      data.courseDetailsData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

//*API to get inner course fees  rankwise data in overview   */
export const getSeatAllocationOverviewData = async (collegeName: string, courseName: string, stream: string) => {
  const data: ISeatDataProps = {
    hasError: false,
    seatAllocationData: {
      year: 0,
      seatAllocationData: {
        categories: [],
        series: []
      }
    }
  };
  try {
    const res = await fetch(
      `${API_BASE_URL}/${stream}/${Api.collegeFeesSeatAllocationOverview}/${collegeName}/${courseName}`
    );

    if (res.ok) {
      const response = await res.json();
      data.seatAllocationData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

///*API to get inner course fees  rankwise data in overview   */
export const getClosingRankOverviewData = async (collegeName: string, courseName: string, stream: string) => {
  const data: IClosingRankDataProps = {
    hasError: false,
    closingRankData: {
      closingRank: [],
      year: 0
    }
  };
  try {
    const res = await fetch(
      `${API_BASE_URL}/${stream}/${Api.collegeFeesCutoffClosingRankOverview}/${collegeName}/${courseName}`
    );

    if (res.ok) {
      const response = await res.json();
      data.closingRankData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// Api for get coures intake
export const getCourseIntakeOverviewData = async (collegeName: string, courseName: string, stream: string) => {
  const data: IIntakeProps = {
    hasError: false,
    courseIntakedata: {
      intake: 0,
      recognizedStatus: ''
    }
  };
  try {
    const res = await fetch(
      `${API_BASE_URL}/${stream}/${Api.collegeCourseIntakeOverview}/${collegeName}/${courseName}`
    );

    if (res.ok) {
      const response = await res.json();
      data.courseIntakedata = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// Course alloted seat matrix
export const getCourseAllotedSeatMatrix = async (collegeName: string, courseName: string, stream: string) => {
  const data: IAllotedSeatProps = {
    hasError: false,
    allotedSeatData: {
      labels: [],
      series: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.courseAllotedSeatMat}/${collegeName}/${courseName}`);

    if (res.ok) {
      const response = await res.json();
      data.allotedSeatData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};
// course admitted rank wise seat
export const getCourseRankAdmittedSeat = async (collegeName: string, courseName: string, stream: string) => {
  const data: IAllottedAdmitBarProps = {
    hasError: false,
    allocationYear: 0,
    previousYear: {
      series: [],
      rounds: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.courseRankAdmittedSeat}/${collegeName}/${courseName}`);

    if (res.ok) {
      const response = await res.json();

      data.allocationYear = response.allocationYear;
      data.previousYear = response.previousYear;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};
// course admitted seat matrix
export const getCourseAdmittedSeatMatrix = async (collegeName: string, courseName: string, stream: string) => {
  const data: IAdmittedSeatProps = {
    hasError: false,
    admittedSeatData: {
      labels: [],
      series: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.courseAdmittedSeatMat}/${collegeName}/${courseName}`);

    if (res.ok) {
      const response = await res.json();

      data.admittedSeatData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};
// course and fees page data
export const getCourseFeesOverviewData = async ({
  params,
  domain
}: {
  params: ICourseFeesOverviewParams;
  domain: string;
}): Promise<ICourseFeesOverview> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const otherCourseDataResponse = await getOtherCourseData(params.name, params.courseName, stream);
  const innerOverviewDataResponse = await getInnerCourseOverviewData(params.name, params.courseName, stream);
  const seatAllocationResponse = await getSeatAllocationOverviewData(params.name, params.courseName, stream);
  const closingRankResponse = await getClosingRankOverviewData(params.name, params.courseName, stream);
  const courseIntakeResponse = await getCourseIntakeOverviewData(params.name, params.courseName, stream);
  const courseAllotedSeatMatrix = await getCourseAllotedSeatMatrix(params.name, params.courseName, stream);
  const courseRankAdmittedSeat = await getCourseRankAdmittedSeat(params.name, params.courseName, stream);
  const courseAdmittedSeatMatrix = await getCourseAdmittedSeatMatrix(params.name, params.courseName, stream);
  const data: ICourseFeesOverview = {
    subMenu: subMenuDataResponse,
    bannerData: bannerDataResponse,
    otherCourseData: otherCourseDataResponse,
    courseDetailsData: innerOverviewDataResponse,
    seatAllocationData: seatAllocationResponse,
    closingRankData: closingRankResponse,
    courseIntake: courseIntakeResponse,
    courseAllotedSeatMat: courseAllotedSeatMatrix,
    courseAdmittedSeat: courseRankAdmittedSeat,
    courseAdmittedSeatMat: courseAdmittedSeatMatrix
  };
  return data;
};
