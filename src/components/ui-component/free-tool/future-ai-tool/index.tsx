'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

import FutureAiTool, { IcompareToolProps } from './future-ai';
import ResultInfo, { IResultDataProps } from './result-info';
// import ResultData from './result-info/resultData.json';

import { IDropDownDataProps } from 'types';

export interface IFreeAiProps {
  comparedToolData: IcompareToolProps;
}
const FutureAiComponents: React.FC<IFreeAiProps> = ({ comparedToolData }) => {
  const [selectedCollege, setSelectedCollege] = useState<IDropDownDataProps>({ id: 0, label: '' });
  const [selectedCourse, setSelectedCourse] = useState<IDropDownDataProps>({ id: 0, label: '' });
  const [selectedSeat, setSelectedSeat] = useState<IDropDownDataProps>({ id: 0, label: '' });
  const targetRef = useRef<HTMLDivElement>(null);
  const [resultedData, setResultedData] = useState<IResultDataProps>({
    resultInfoData: {
      collegeName: '',
      courseName: '',
      result: []
    }
  });
  const scrollToDown = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  useEffect(() => {
    if (resultedData.resultInfoData?.result?.length > 0) {
      scrollToDown();
    }
  }, [resultedData.resultInfoData?.result?.length]);
  return (
    <Box ref={targetRef} pb={2}>
      <FutureAiTool
        comparedToolData={comparedToolData.comparedToolData}
        setSelectedCollege={setSelectedCollege}
        setSelectedSeat={setSelectedSeat}
        setSelectedCourse={setSelectedCourse}
        selectedCollege={selectedCollege}
        selectedCourse={selectedCourse}
        selectedSeat={selectedSeat}
        setResultedData={setResultedData}
      />
      {resultedData.resultInfoData?.result?.length > 0 && <ResultInfo resultInfoData={resultedData.resultInfoData} />}
    </Box>
  );
};

export default FutureAiComponents;
