import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { ICollegeIqPageProps, Stream } from 'types';
import { IIqBannerProps } from 'ui-component/free-tool/college-iq/banner';
import { ICollegeInsType } from 'ui-component/free-tool/college-iq';
import { IBasicInfoResultProps, IGraphDataProps } from 'ui-component/free-tool/college-iq/result-information';

// API to get collegeData
export const getCollegeData = async (stream: string) => {
  const data: IIqBannerProps = {
    hasError: false,
    collegeData: [],
    selectedCollege: 0
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${Api.collegeList}/${stream}`);

    if (res.ok) {
      const response = await res.json();
      data.collegeData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// get college-iq page data

export const getCollegeIqData = async (): Promise<ICollegeIqPageProps> => {
  const stream = Stream.ENGINEERING;
  const collegeDataResponse = await getCollegeData(stream);

  const data: ICollegeIqPageProps = {
    collegeData: collegeDataResponse
  };
  return data;
};

export const getCollegeInsType = async (collegeShortName: string | undefined) => {
  let data: ICollegeInsType = {
    insType: '',
    shortUrl: ''
  };
  try {
    const insResponse = await fetch(`${Api.collegeIns}?selectedCollege=${collegeShortName}`);

    if (insResponse.ok) {
      const response = await insResponse.json();
      data = response[0];
    }
  } catch (error) {}

  return data;
};

export const getCutoffData = async (selectedCollege: string | number, selectedCourse: string | number) => {
  let data: IGraphDataProps = {
    title: '',
    categories: [],
    series: []
  };
  try {
    const res = await fetch(`${Api.courseCutoff}?selectedCollege=${selectedCollege}&selectedCourse=${selectedCourse}`);

    if (res.ok) {
      const response = await res.json();
      data = response.cutoffData;
    }
  } catch (error) {}

  return data;
};

export const getCollegeDetails = async (collegeId: string | number) => {
  const initialChartValue = {
    categories: [],
    series: [],
    title: ''
  };
  const data: IBasicInfoResultProps = {
    resultGraphData: {
      placementData: initialChartValue,
      salaryPackageData: initialChartValue,
      graduationRateData: initialChartValue,
      cutoffData: initialChartValue,
      expenditureData: initialChartValue
    },
    resultData: {
      collegeName: '',
      nirfRank: 0,
      nirfScore: 0,
      campusArea: 0,
      establishedYear: 0,
      Ownership: ''
    },
    courseList: []
  };
  try {
    const res = await fetch(`${Api.collegeDetails}?selectedCollege=${collegeId}`);

    if (res.ok) {
      const result = await res.json();

      const updataExpenditureData = {
        ...result.resultGraphData.expenditureData?.operationalExpenditure,
        title: 'Expenditure'
      };
      updataExpenditureData.series.push(result.resultGraphData.expenditureData?.academicExpenditure?.series[0]);
      data.resultData = result.resultData;
      data.courseList = result.courseList;
      data.resultGraphData = {
        ...result.resultGraphData,
        expenditureData: updataExpenditureData
      };
    }
  } catch (error) {}

  return data;
};
