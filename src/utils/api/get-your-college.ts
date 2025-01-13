import { API_BASE_URL } from 'config';
import { IMedCollegeProps, Stream } from 'types';
import { Api } from 'types/enums';
import { IIqBannerProps } from 'ui-component/free-tool/college-iq/banner';
import { IAdmittedSeatProps } from 'ui-component/free-tool/kyc-medical/admitted-seat-matrix';
import { IAllotedSeatProps } from 'ui-component/free-tool/kyc-medical/alloted-seat-matrix';
import { IAllottedAdmitBarProps } from 'ui-component/free-tool/kyc-medical/allotted-admitted-bar-chart';
import { IClosingCutoffRankData } from 'ui-component/free-tool/kyc-medical/cutoff-closing-rank';
import { IResultInfoProps } from 'ui-component/free-tool/kyc-medical/result-page-information';
import { IAllocationBarProps } from 'ui-component/free-tool/kyc-medical/seats-allocation-bar-chart';

export const getMedicalCollegeData = async () => {
  const data: IIqBannerProps = {
    hasError: false,
    collegeData: [],
    selectedCollege: 0
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${Api.medicalCollegeList}`);

    if (res.ok) {
      const response = await res.json();
      data.collegeData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

const getCollegeInfo = async (collegeId: number) => {
  const data: IResultInfoProps = {
    hasError: false,
    infoData: {
      collegeName: '',
      campusArea: '',
      establishedYear: '',
      ownership: '',
      hospitalBeds: '',
      hospitalType: '',
      seats: '',
      recognition: ''
    }
  };
  try {
    const res = await fetch(`/${Api.medicalCollegeInfoApi}/${collegeId}`);

    if (res.ok) {
      data.infoData = await res.json();
    } else data.hasError = true;
  } catch (error) {
    data.hasError = true;
  }

  return data;
};

const getClosingRankData = async (collegeId: number) => {
  const data: IClosingCutoffRankData = {
    hasError: false,
    closingRankData: {
      year: 0,
      cutoffClosingRankData: []
    }
  };
  try {
    const res = await fetch(`/${Api.medicalCollegeClosingRankApi}/${collegeId}`);

    if (res.ok) {
      data.closingRankData = await res.json();
    } else data.hasError = true;
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

const getAllottedSeatData = async (collegeId: number) => {
  const data: IAllotedSeatProps = {
    hasError: false,
    allotedSeatData: {
      labels: [],
      series: []
    }
  };
  try {
    const res = await fetch(`/${Api.medicalCollegeAllottedListApi}/${collegeId}`);

    if (res.ok) {
      data.allotedSeatData = await res.json();
    } else data.hasError = true;
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

const getAdmittedSeatData = async (collegeId: number) => {
  const data: IAdmittedSeatProps = {
    hasError: false,
    admittedSeatData: {
      labels: [],
      series: []
    }
  };
  try {
    const res = await fetch(`/${Api.medicalCollegeAdmittedListApi}/${collegeId}`);

    if (res.ok) {
      data.admittedSeatData = await res.json();
    } else data.hasError = true;
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getSeatAllocationData = async (collegeId: number) => {
  let data: IAllocationBarProps = {
    hasError: false,
    year: 0,
    seatAllocationData: {
      series: [],
      categories: []
    }
  };
  try {
    const res = await fetch(`${Api.medicalCollegeSeatAllocationApi}/${collegeId}`);

    if (res.ok) {
      data = await res.json();
    } else data.hasError = true;
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getSeatAdmittedData = async (collegeId: number) => {
  let data: IAllottedAdmitBarProps = {
    allocationYear: 0,
    previousYear: {
      series: [],
      rounds: []
    }
  };
  try {
    const res = await fetch(`${Api.medicalCollegeAdmittedAllottedApi}/${collegeId}`);

    if (res.ok) {
      data = await res.json();
    } else data.hasError = true;
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getMedicalCollegeDetails = async (collegeId: number) => {
  const data: IMedCollegeProps = {
    collegeInfo: {
      infoData: {
        collegeName: '',
        campusArea: '',
        establishedYear: '',
        ownership: '',
        hospitalBeds: '',
        hospitalType: '',
        seats: '',
        recognition: ''
      }
    },
    closingRankData: {
      closingRankData: {
        year: 0,
        cutoffClosingRankData: []
      }
    },
    allotedSeatData: {
      allotedSeatData: {
        labels: [],
        series: []
      }
    },
    admittedSeatData: {
      admittedSeatData: {
        labels: [],
        series: []
      }
    },
    seatAllocationData: {
      year: 0,
      seatAllocationData: {
        series: [],
        categories: []
      }
    },
    seatAdmittedData: {
      allocationYear: 0,
      previousYear: {
        series: [],
        rounds: []
      }
    }
  };
  const [collegeInfo, closingRankData, allotedSeatData, admittedData, seatAllocationData, seatAdmittedData] =
    await Promise.all([
      getCollegeInfo(collegeId),
      getClosingRankData(collegeId),
      getAllottedSeatData(collegeId),
      getAdmittedSeatData(collegeId),
      getSeatAllocationData(collegeId),
      getSeatAdmittedData(collegeId)
    ]);

  data.collegeInfo = collegeInfo;
  data.closingRankData = closingRankData;
  data.allotedSeatData = allotedSeatData;
  data.admittedSeatData = admittedData;
  data.seatAllocationData = seatAllocationData;
  data.seatAdmittedData = seatAdmittedData;

  return data;
};

export const getScoreToRank = async (value: string | number, stream: string) => {
  try {
    let res;
    if (stream === Stream.ENGINEERING) {
      res = await fetch(`${API_BASE_URL}/${Api.engScoreToRank}/${value}`);
      if (res.ok) {
        return await res.json();
      }
    } else {
      res = await fetch(`${API_BASE_URL}/${Api.medScoreToRank}/${value}`);
      if (res.ok) {
        return await res.text();
      }
    }
  } catch (error) {
    throw error;
  }
};
