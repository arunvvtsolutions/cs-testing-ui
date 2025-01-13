import { API_BASE_URL } from 'config';
import { IPredictorCollegeProps } from 'types';
import { Api } from 'types/enums';
import { IAdmittedSeatProps } from 'ui-component/free-tool/kyc-medical/admitted-seat-matrix';
import { IAllotedSeatProps } from 'ui-component/free-tool/kyc-medical/alloted-seat-matrix';
import { IAllottedAdmitBarProps } from 'ui-component/free-tool/kyc-medical/allotted-admitted-bar-chart';
import { IClosingCutoffRankData } from 'ui-component/free-tool/kyc-medical/cutoff-closing-rank';
import { IResultInfoProps } from 'ui-component/free-tool/kyc-medical/result-page-information';
import { IAllocationBarProps } from 'ui-component/free-tool/kyc-medical/seats-allocation-bar-chart';

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
    const res = await fetch(`${API_BASE_URL}/${Api.basicInfoApi}/${collegeId}`);

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
    const res = await fetch(`${API_BASE_URL}/${Api.getClosingRankApi}/${collegeId}`);

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
//State Level Admitted
const getStateAdmittedSeatData = async (collegeId: number) => {
  const data: IAdmittedSeatProps = {
    hasError: false,
    admittedSeatData: {
      labels: [],
      series: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${Api.getStateAdmittedSeatApi}/${collegeId}`);

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

export const getStateSeatAdmittedData = async (collegeId: number) => {
  let data: IAllottedAdmitBarProps = {
    allocationYear: 0,
    previousYear: {
      series: [],
      rounds: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${Api.getStateSeatAdmittedApi}/${collegeId}`);

    if (res.ok) {
      data = await res.json();
    } else data.hasError = true;
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

//Statewise Closing Rank Data
export const getStateClosingRankData = async (collegeId: number) => {
  const data: IClosingCutoffRankData = {
    hasError: false,
    closingRankData: {
      year: 0,
      cutoffClosingRankData: []
    }
  };
  try {
    const res = await fetch(`${API_BASE_URL}/${Api.stateCutOffClosingRankApi}/${collegeId}`);

    if (res.ok) {
      data.closingRankData = await res.json();
    } else data.hasError = true;
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getPredictorCollegeDetails = async (collegeId: number) => {
  const data: IPredictorCollegeProps = {
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
    stateClosingRankData: {
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
  const [
    collegeInfo,
    closingRankData,
    allotedSeatData,
    admittedData,
    seatAllocationData,
    seatAdmittedData,
    stateClosingRankData
  ] = await Promise.all([
    getCollegeInfo(collegeId),
    getClosingRankData(collegeId),
    getAllottedSeatData(collegeId),
    getStateAdmittedSeatData(collegeId),
    getSeatAllocationData(collegeId),
    getStateSeatAdmittedData(collegeId),
    getStateClosingRankData(collegeId)
  ]);

  data.collegeInfo = collegeInfo;
  data.closingRankData = closingRankData;
  data.allotedSeatData = allotedSeatData;
  data.admittedSeatData = admittedData;
  data.seatAllocationData = seatAllocationData;
  data.seatAdmittedData = seatAdmittedData;
  data.stateClosingRankData = stateClosingRankData;

  return data;
};
