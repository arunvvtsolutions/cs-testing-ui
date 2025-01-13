// college ranking result

import { IRelatedComparedprops } from 'ui-component/college-compare/compared-colleges';
import { ICompareDataProps } from 'ui-component/college-compare/compare-header';
import { IRankingDataProps } from 'ui-component/college-compare/compare-info/compare-info-components/college-ranking';
import { IDetailsDataProps } from 'ui-component/college-compare/compare-info/compare-info-components/college-details';
import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { IIntakeDataProps } from 'ui-component/college-compare/compare-info/compare-info-components/approved-intake';
import { IStrengthDataProps } from 'ui-component/college-compare/compare-info/compare-info-components/student-strength';
import { IUgInfoDataProps } from 'ui-component/college-compare/compare-info/compare-info-components/ug-Info';
import { IUgGraduationResultProps } from 'ui-component/college-compare/compare-info/compare-info-components/Ug-across-year-graduation';
import { IPhdResultDataProps } from 'ui-component/college-compare/compare-info/compare-info-components/phd-info';
import { IIprResultProps } from 'ui-component/college-compare/compare-info/compare-info-components/ipr-info';
import { IFundsDataProps } from 'ui-component/college-compare/compare-info/compare-info-components/funds';
import { ICapitalExpenditureResult } from 'ui-component/college-compare/compare-info/compare-info-components/capital-expenditure';
import { IOperationalExpenditureResProps } from 'ui-component/college-compare/compare-info/compare-info-components/operational -expenditure';
import { IfacultyDataDetails } from 'ui-component/college-compare/compare-info/compare-info-components/faculty-details';
import { IFeeDataStructure } from 'ui-component/college-compare/compare-info/compare-info-components/fee-structure-info';
import { ICollegeCompareProps, ICompareResultData } from 'ui-component/college-compare/compare-info';
import { IFacultyDataProps } from 'ui-component/college-compare/compare-info/compare-info-components/college-facilities';
import { IUgPlacementResultProps } from 'ui-component/college-compare/compare-info/compare-info-components/Ug-across-year-placement';
import { ICompareComponentsProps } from 'ui-component/college-compare';
import { IPostHistoryType, Stream } from 'types';

export const getrelatedCompared = async (collegeData: string, stream: string) => {
  const data: IRelatedComparedprops = {
    hasError: false,
    relatedComparedData: []
  };

  try {
    const res = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.relatedCompareCollege}/${collegeData}`
    );

    if (res.ok) data.relatedComparedData = await res.json();
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeList = async (stream: string) => {
  const data: ICompareDataProps = {
    hasError: false,
    collegeData: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.compareCollegeList}`);

    if (res.ok) {
      const result = await res.json();
      data.collegeData = result;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// get result of compared colleges
export const getCollegeRankingData = async (collegeData: string, stream: string): Promise<IRankingDataProps> => {
  const data: IRankingDataProps = {
    rankingData: [],
    hasError: false
  };
  try {
    const rankingRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareRankingResult}/${collegeData}`
    );

    if (rankingRes.ok) {
      const rankResult = await rankingRes.json();
      data.rankingData = rankResult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeDetailsData = async (collegeData: string, stream: string): Promise<IDetailsDataProps> => {
  const data: IDetailsDataProps = {
    collegeDetailsData: [],
    hasError: false
  };
  try {
    const detailsRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareDetailsResult}/${collegeData}`
    );

    if (detailsRes.ok) {
      const detailsResult = await detailsRes.json();
      data.collegeDetailsData = detailsResult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeFacilitiesRes = async (collegeData: string, stream: string): Promise<IFacultyDataProps> => {
  const data: IFacultyDataProps = {
    facultyData: [],
    hasError: false
  };
  try {
    const facilitiesRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareFacilitiesResult}/${collegeData}`
    );

    if (facilitiesRes.ok) {
      const facilitiesResult = await facilitiesRes.json();
      data.facultyData = facilitiesResult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeApprovedIntakeData = async (collegeData: string, stream: string): Promise<IIntakeDataProps> => {
  const data: IIntakeDataProps = {
    approvedIntake: [],
    hasError: false
  };
  try {
    const approvedIntakeRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareApprovedIntakeResult}/${collegeData}`
    );

    if (approvedIntakeRes.ok) {
      const approvedIntakeResult = await approvedIntakeRes.json();
      data.approvedIntake = approvedIntakeResult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeStudentStrengthData = async (
  collegeData: string,
  stream: string
): Promise<IStrengthDataProps> => {
  const data: IStrengthDataProps = {
    studentStrengthData: [],
    hasError: false
  };
  try {
    const studentStrengthRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareStudentStrengthResult}/${collegeData}`
    );

    if (studentStrengthRes.ok) {
      const studentStrengthResult = await studentStrengthRes.json();
      data.studentStrengthData = studentStrengthResult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeUgData = async (collegeData: string, stream: string): Promise<IUgInfoDataProps> => {
  const data: IUgInfoDataProps = {
    ugInfo: [],
    hasError: false
  };
  try {
    const ugStudentsRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareUgStudentResult}/${collegeData}`
    );

    if (ugStudentsRes.ok) {
      const ugStudentsResult = await ugStudentsRes.json();
      data.ugInfo = ugStudentsResult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeugGradutionData = async (
  collegeData: string,
  stream: string
): Promise<IUgGraduationResultProps> => {
  const data: IUgGraduationResultProps = {
    graduationData: {
      data: [],
      graphData: {
        categories: [],
        series: []
      }
    },
    hasError: false
  };
  try {
    const ugGradutionRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareUgGraduationResult}/${collegeData}`
    );

    if (ugGradutionRes.ok) {
      const ugStudentsResult = await ugGradutionRes.json();
      data.graduationData = ugStudentsResult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeugUgPlacementData = async (
  collegeData: string,
  stream: string
): Promise<IUgPlacementResultProps> => {
  const data: IUgPlacementResultProps = {
    graduationData: {
      data: [],
      graphData: {
        categories: [],
        series: []
      }
    },
    hasError: false
  };
  try {
    const ugPlacementRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareUgPlacementResult}/${collegeData}`
    );

    if (ugPlacementRes.ok) {
      const ugStudentsResult = await ugPlacementRes.json();
      data.graduationData = ugStudentsResult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegePhdData = async (collegeData: string, stream: string): Promise<IPhdResultDataProps> => {
  const data: IPhdResultDataProps = {
    phdResult: {
      data: [],
      graphData: {
        categories: [],
        series: []
      }
    },
    hasError: false
  };
  try {
    const PhdRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareCollegesPhdResult}/${collegeData}`
    );

    if (PhdRes.ok) {
      const PhdResult = await PhdRes.json();
      data.phdResult = PhdResult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeIprData = async (collegeData: string, stream: string): Promise<IIprResultProps> => {
  const data: IIprResultProps = {
    iprResult: {
      data: [],
      graphData: {
        categories: [],
        series: []
      }
    },
    hasError: false
  };
  try {
    const IprRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareIprResult}/${collegeData}`
    );

    if (IprRes.ok) {
      const PhdResult = await IprRes.json();
      data.iprResult = PhdResult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegefundsData = async (collegeData: string, stream: string): Promise<IFundsDataProps> => {
  const data: IFundsDataProps = {
    funds: [],
    hasError: false
  };
  try {
    const fundsRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareFundResult}/${collegeData}`
    );

    if (fundsRes.ok) {
      const fundsResult = await fundsRes.json();
      data.funds = fundsResult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeCapitalExpenditureData = async (
  collegeData: string,
  stream: string
): Promise<ICapitalExpenditureResult> => {
  const data: ICapitalExpenditureResult = {
    capitalExpenditure: {
      data: [],
      graphData: {
        categories: [],
        series: []
      }
    },
    hasError: false
  };
  try {
    const capitalExpenditureRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareCapitalExpenditureResult}/${collegeData}`
    );

    if (capitalExpenditureRes.ok) {
      const capitalExpendituresult = await capitalExpenditureRes.json();
      data.capitalExpenditure = capitalExpendituresult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeOperationalExpenditureData = async (
  collegeData: string,
  stream: string
): Promise<IOperationalExpenditureResProps> => {
  const data: IOperationalExpenditureResProps = {
    operationalExpenditure: {
      data: [],
      graphData: {
        categories: [],
        series: []
      }
    },
    hasError: false
  };
  try {
    const operationalExpenditureRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareOperationalExpenditureResult}/${collegeData}`
    );

    if (operationalExpenditureRes.ok) {
      const capitalExpendituresult = await operationalExpenditureRes.json();
      data.operationalExpenditure = capitalExpendituresult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegeFacultyData = async (collegeData: string, stream: string): Promise<IfacultyDataDetails> => {
  const data: IfacultyDataDetails = {
    facultyDetails: [],
    hasError: false
  };
  try {
    const facultyRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareFacultyresult}/${collegeData}`
    );

    if (facultyRes.ok) {
      const capitalExpendituresult = await facultyRes.json();
      data.facultyDetails = capitalExpendituresult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getCollegefeeStructureData = async (collegeData: string, stream: string): Promise<IFeeDataStructure> => {
  const data: IFeeDataStructure = {
    feeStructure: [],
    hasError: false
  };
  try {
    const feeStructureRes = await fetch(
      `${API_BASE_URL}/${stream}/${Api.compareBaseUrl}/${Api.collgeCompareFeeStructureResult}/${collegeData}`
    );

    if (feeStructureRes.ok) {
      const capitalExpendituresult = await feeStructureRes.json();
      data.feeStructure = capitalExpendituresult;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};
// ----------------------------------------------------
// college info api below

export const getCollegeInfoData = async (collegeData: string, stream: string) => {
  const data: ICollegeCompareProps = {
    data: {
      collegeRanking: {
        rankingData: []
      },
      collegeDetails: {
        collegeDetailsData: []
      },
      faculty: {
        facultyData: []
      },
      aprovedIntake: {
        approvedIntake: []
      },
      studentStrength: {
        studentStrengthData: []
      },
      ugInfo: {
        ugInfo: []
      },
      ugAcrossYearGraduation: {
        graduationData: {
          data: [],
          graphData: {
            categories: [],
            series: []
          }
        }
      },
      ugAcrossYearPlacement: {
        graduationData: {
          data: [],
          graphData: {
            categories: [],
            series: []
          }
        }
      },
      phdStudents: {
        phdResult: {
          data: [],
          graphData: {
            categories: [],
            series: []
          }
        }
      },
      iprResult: {
        iprResult: {
          data: [],
          graphData: {
            categories: [],
            series: []
          }
        }
      },
      funds: {
        funds: []
      },
      capitalExpenditure: {
        capitalExpenditure: {
          data: [],
          graphData: {
            categories: [],
            series: []
          }
        }
      },
      operationalExpenditure: {
        operationalExpenditure: {
          data: [],
          graphData: {
            categories: [],
            series: []
          }
        }
      },
      facultyDetails: {
        facultyDetails: []
      },
      feeStructure: {
        feeStructure: []
      }
    }
  };
  const [
    rankingData,
    collegeDetailsData,
    facilityData,
    approvedIntake,
    studentStrength,
    ugData,
    graduationData,
    placementData,
    pgData,
    iprData,
    fundsData,
    capitalExpenditureData,
    operationExpenditureData,
    facultyData,
    feesStructureData
  ] = await Promise.all([
    getCollegeRankingData(collegeData, stream),
    getCollegeDetailsData(collegeData, stream),
    getCollegeFacilitiesRes(collegeData, stream),
    getCollegeApprovedIntakeData(collegeData, stream),
    getCollegeStudentStrengthData(collegeData, stream),
    getCollegeUgData(collegeData, stream),
    getCollegeugGradutionData(collegeData, stream),
    getCollegeugUgPlacementData(collegeData, stream),
    getCollegePhdData(collegeData, stream),
    getCollegeIprData(collegeData, stream),
    getCollegefundsData(collegeData, stream),
    getCollegeCapitalExpenditureData(collegeData, stream),
    getCollegeOperationalExpenditureData(collegeData, stream),
    getCollegeFacultyData(collegeData, stream),
    getCollegefeeStructureData(collegeData, stream)
  ]);
  data.data = {
    collegeRanking: rankingData,
    collegeDetails: collegeDetailsData,
    faculty: facilityData,
    aprovedIntake: approvedIntake,
    studentStrength: studentStrength,
    ugInfo: ugData,
    ugAcrossYearGraduation: graduationData,
    ugAcrossYearPlacement: placementData,
    phdStudents: pgData,
    iprResult: iprData,
    funds: fundsData,
    capitalExpenditure: capitalExpenditureData,
    operationalExpenditure: operationExpenditureData,
    facultyDetails: facultyData,
    feeStructure: feesStructureData
  };
  return data;
};

// get admission and eligibility page data

export const getCollegeCompareInfoData = async ({
  params,
  domain
}: {
  params: { collegeone: string; collegetwo: string; collegethree: string[] };
  domain: string;
}): Promise<ICompareComponentsProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const { collegeone, collegetwo, collegethree } = params;
  let collegeData = collegeone + ',' + collegetwo;
  if (collegethree && collegethree[0]) collegeData = collegeData.concat(',' + collegethree[0]);

  const collegeCompareHead = await getCollegeList(stream);
  const compareInfo = await getCollegeInfoData(collegeData, stream);
  const relatedComparedData = await getrelatedCompared(collegeData, stream);

  const data: ICompareComponentsProps = {
    data: {
      collegeCompareHead,
      compareInfo,
      relatedComparedData
    }
  };
  return data;
};

export const getCompareCollegeResult = async (selectedCollege: string, stream: string) => {
  let data: ICompareResultData = {
    collegeRanking: {
      rankingData: []
    },
    collegeDetails: {
      collegeDetailsData: []
    },
    faculty: {
      facultyData: []
    },
    aprovedIntake: {
      approvedIntake: []
    },
    studentStrength: {
      studentStrengthData: []
    },
    ugInfo: {
      ugInfo: []
    },
    ugAcrossYearGraduation: {
      graduationData: {
        data: [],
        graphData: {
          categories: [],
          series: []
        }
      }
    },
    ugAcrossYearPlacement: {
      graduationData: {
        data: [],
        graphData: {
          categories: [],
          series: []
        }
      }
    },
    phdStudents: {
      phdResult: {
        data: [],
        graphData: {
          categories: [],
          series: []
        }
      }
    },
    iprResult: {
      iprResult: {
        data: [],
        graphData: {
          categories: [],
          series: []
        }
      }
    },
    funds: {
      funds: []
    },
    capitalExpenditure: {
      capitalExpenditure: {
        data: [],
        graphData: {
          categories: [],
          series: []
        }
      }
    },
    operationalExpenditure: {
      operationalExpenditure: {
        data: [],
        graphData: {
          categories: [],
          series: []
        }
      }
    },
    facultyDetails: {
      facultyDetails: []
    },
    feeStructure: {
      feeStructure: []
    }
  };
  try {
    const res = await fetch(`/api/comparecollege-api?selectedCollege=${selectedCollege}&stream=${stream}`);

    if (res.ok) {
      const result = await res.json();
      data = result;
    }
  } catch (error) {}
  return data;
};

export const postAddCompareHistory = async (historyData: IPostHistoryType) => {
  const res = await fetch(`/api/comparecollege-api`, {
    method: 'post',
    body: JSON.stringify(historyData)
  });

  if (res.ok) {
    const result = await res.json();
    return result;
  }
};
