'use client';
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';

import CollegeRanking, { IRankingDataProps } from './compare-info-components/college-ranking';
// import CollegeGraduation from './compare-info-components/college-graduation';

import CollegeFacilites, { IFacultyDataProps } from './compare-info-components/college-facilities';
import ApprovedIntake, { IIntakeDataProps } from './compare-info-components/approved-intake';
import StudentStrength, { IStrengthDataProps } from './compare-info-components/student-strength';
import CollegeDetails, { IDetailsDataProps } from './compare-info-components/college-details';
import UgInfo, { IUgInfoDataProps } from './compare-info-components/ug-Info';
import UgAcrossGraduation, { IUgGraduationResultProps } from './compare-info-components/Ug-across-year-graduation';
import UgAcrossPlacement, { IUgPlacementResultProps } from './compare-info-components/Ug-across-year-placement';
import PhdInfo, { IPhdResultDataProps } from './compare-info-components/phd-info';
import IprInfo, { IIprResultProps } from './compare-info-components/ipr-info';
import Funds, { IFundsDataProps } from './compare-info-components/funds';
import CapitalExpenditure, { ICapitalExpenditureResult } from './compare-info-components/capital-expenditure';
import OperationalExpenditure, {
  IOperationalExpenditureResProps
} from './compare-info-components/operational -expenditure';
import FacultyDetailsInfo, { IfacultyDataDetails } from './compare-info-components/faculty-details';
import FeeStructure, { IFeeDataStructure } from './compare-info-components/fee-structure-info';
import { IChangedCollegeProps } from '../compare-header';
import { getCompareCollegeResult } from 'utils/api/compare-college';
import { findStream } from 'utils';

export interface ICompareResultData {
  collegeRanking: IRankingDataProps;
  collegeDetails: IDetailsDataProps;
  faculty: IFacultyDataProps;
  aprovedIntake: IIntakeDataProps;
  studentStrength: IStrengthDataProps;
  ugInfo: IUgInfoDataProps;
  ugAcrossYearGraduation: IUgGraduationResultProps;
  ugAcrossYearPlacement: IUgPlacementResultProps;
  phdStudents: IPhdResultDataProps;
  iprResult: IIprResultProps;
  funds: IFundsDataProps;
  capitalExpenditure: ICapitalExpenditureResult;
  operationalExpenditure: IOperationalExpenditureResProps;
  facultyDetails: IfacultyDataDetails;
  feeStructure: IFeeDataStructure;
  [key: string | number]:
    | IRankingDataProps
    | IDetailsDataProps
    | IFacultyDataProps
    | IIntakeDataProps
    | IStrengthDataProps
    | IUgInfoDataProps
    | IUgGraduationResultProps
    | IUgPlacementResultProps
    | IPhdResultDataProps
    | IIprResultProps
    | IFundsDataProps
    | ICapitalExpenditureResult
    | IOperationalExpenditureResProps
    | IfacultyDataDetails
    | IFeeDataStructure;
}

export interface ICollegeCompareProps {
  data: ICompareResultData;
  changedCollege?: IChangedCollegeProps[];
}
const CollegeCompareInfo = ({ data, changedCollege }: ICollegeCompareProps) => {
  const [comparedResult, setComparedResult] = useState<ICompareResultData>();
  useEffect(() => {
    setComparedResult(data);
  }, [data]);

  useEffect(() => {
    const getData = async () => {
      const { stream } = findStream(window.location.host);

      if (changedCollege?.length && comparedResult) {
        let selectedColleges = '';
        changedCollege.forEach((clg) => {
          if (selectedColleges) {
            selectedColleges = selectedColleges.concat(',', clg.shortName);
          } else selectedColleges = selectedColleges.concat(clg.shortName);
        });
        const result = await getCompareCollegeResult(selectedColleges, stream);
        setComparedResult(result);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changedCollege]);
  return (
    <>
      {comparedResult && (
        <>
          <CollegeRanking {...comparedResult.collegeRanking} />
          <CollegeDetails {...comparedResult.collegeDetails} />
          <CollegeFacilites {...comparedResult.faculty} />
          <ApprovedIntake {...comparedResult.aprovedIntake} />
          <StudentStrength {...comparedResult.studentStrength} />
          <UgInfo {...comparedResult.ugInfo} />
          <UgAcrossGraduation {...comparedResult.ugAcrossYearGraduation} />
          <UgAcrossPlacement {...comparedResult.ugAcrossYearPlacement} />
          <PhdInfo {...comparedResult.phdStudents} />
          <IprInfo {...comparedResult.iprResult} />
          <Funds {...comparedResult.funds} />
          <CapitalExpenditure {...comparedResult.capitalExpenditure} />
          <OperationalExpenditure {...comparedResult.operationalExpenditure} />
          <FacultyDetailsInfo {...comparedResult.facultyDetails} />
          <FeeStructure {...comparedResult.feeStructure} />
        </>
      )}
    </>
  );
};

export default CollegeCompareInfo;
