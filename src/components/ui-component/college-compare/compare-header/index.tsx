import { Box } from '@mui/material';
import React from 'react';

import style from './Compare.module.css';
import CollegeCompare from './Compare';
import { collegeCompareContent } from './constant';

import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
interface IcompareProps {
  id: number;
  imageUrl: string;
  collegeName: string;
  shortName: string;
  shortUrl: string;
  collegeShortName: string;
}

export interface IChangedCollegeProps {
  shortName: string;
  position: number;
  id: number;
  imageUrl: string;
  collegeName: string;
  shortUrl: string;
  collegeShortName: string;
}
export interface ICompareDataProps extends IErrorProps {
  // compareData: IcompareProps[];
  collegeData: IcompareProps[];
  setChangedCollege?: (collegeData: IChangedCollegeProps[]) => void;
  changedCollege?: IChangedCollegeProps[];
}

const CollegeCompareCard: React.FC<ICompareDataProps> = ({
  collegeData,
  setChangedCollege,
  changedCollege,
  hasError
}) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <>
          <Box className={style.collegeHead}>{collegeCompareContent.TITLE}</Box>
          <CollegeCompare
            CollegeData={collegeData}
            setChangedCollege={setChangedCollege}
            changedCollege={changedCollege}
          />
        </>
      )}
    </>
  );
};

export default CollegeCompareCard;
