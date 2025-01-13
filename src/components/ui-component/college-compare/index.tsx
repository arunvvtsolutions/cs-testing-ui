'use client';
import React, { FC, useState } from 'react';
import { Box } from '@mui/system';

import CollegeCompareCard, { IChangedCollegeProps, ICompareDataProps } from './compare-header';

import CollegeCompareInfo, { ICollegeCompareProps } from 'ui-component/college-compare/compare-info';
import RelatedColleges, { IRelatedComparedprops } from 'ui-component/college-compare/compared-colleges';

export interface ICompareComponentsProps {
  data: {
    compareInfo: ICollegeCompareProps;
    collegeCompareHead: ICompareDataProps;
    relatedComparedData: IRelatedComparedprops;
  };
}

const CompareInfoComponets: FC<ICompareComponentsProps> = ({ data }) => {
  const [changedCollege, setChangedCollege] = useState<IChangedCollegeProps[]>([]);
  return (
    <>
      <Box>
        <Box className="containerWrapper">
          <CollegeCompareCard
            {...data.collegeCompareHead}
            setChangedCollege={setChangedCollege}
            changedCollege={changedCollege}
          />
          <CollegeCompareInfo {...data.compareInfo} changedCollege={changedCollege} />
          <RelatedColleges {...data.relatedComparedData} />
        </Box>
      </Box>
    </>
  );
};

export default CompareInfoComponets;
