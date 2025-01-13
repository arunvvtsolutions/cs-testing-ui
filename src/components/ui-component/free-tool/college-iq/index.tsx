/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import IqBanner, { IIqBannerProps } from './banner';
import BasicResultInformation, { IBasicInfoResultProps } from './result-information';

import { getCollegeDetails, getCollegeInsType, getCutoffData } from 'utils/api/college-iq';
import useAuth from 'hooks/useAuth';
import { Stream } from 'types';

export interface ICollegeInsType {
  insType: string;
  shortUrl: string;
}
export interface ICollegeIqPageProps {
  data: {
    collegeData: IIqBannerProps;
  };
}

const CollegeIqComponent: React.FC<ICollegeIqPageProps> = ({ data }) => {
  const { user } = useAuth();
  const router = useRouter();
  const targetRef = useRef<HTMLDivElement>(null);
  const initialChartValue = {
    categories: [],
    series: [],
    title: ''
  };
  const [selectedCourse, setSelectedCourse] = useState<string | number>(0);
  const [selectedCollege, setSelectedCollege] = useState<string | number>(0);
  const [selectedCollegeIns, setSelectedCollegeIns] = useState<ICollegeInsType>({
    insType: '',
    shortUrl: ''
  });
  const defaultValue = {
    resultData: {
      collegeName: '',
      nirfRank: 0,
      nirfScore: 0,
      campusArea: 0,
      establishedYear: 0,
      Ownership: ''
    },
    resultGraphData: {
      placementData: initialChartValue,
      salaryPackageData: initialChartValue,
      graduationRateData: initialChartValue,
      cutoffData: initialChartValue,
      expenditureData: initialChartValue
    },
    courseList: []
  };
  const [collegeShortName, setCollegeShortName] = useState<string | undefined>('');
  const [basicInfoData, setBasicInfoData] = useState<IBasicInfoResultProps>(defaultValue);

  const handleSelect = async (value: string | number, shortUrl?: string) => {
    setBasicInfoData(defaultValue);
    setCollegeShortName(shortUrl);
    setSelectedCollege(value);
    const response = await getCollegeDetails(value);
    setBasicInfoData(response);
  };
  const scrollToDown = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  useEffect(() => {
    if (basicInfoData) {
      scrollToDown();
    }
  }, [basicInfoData]);
  useEffect(() => {
    const cutoffData = async () => {
      const response = await getCutoffData(selectedCollege, selectedCourse);

      if (response) {
        setBasicInfoData({
          ...basicInfoData,
          resultGraphData: {
            ...basicInfoData.resultGraphData,
            cutoffData: response
          }
        });
      }
    };

    cutoffData();
  }, [selectedCourse]);

  useEffect(() => {
    const insData = async () => {
      const insResponse = await getCollegeInsType(collegeShortName);

      if (insResponse) {
        setSelectedCollegeIns({
          insType: insResponse.insType,
          shortUrl: insResponse.shortUrl
        });
      }
    };
    insData();
  }, [collegeShortName]);

  useEffect(() => {
    if (user?.stream && !user.stream.toLowerCase().includes(Stream.ENGINEERING.toLowerCase())) {
      router.back();
    }
  }, [user?.stream]);
  return (
    <Box className="containerWrapper" ref={targetRef} pb={2}>
      <IqBanner {...data.collegeData} handleSelect={handleSelect} selectedCollege={selectedCollege} />
      <BasicResultInformation
        basicInfoData={basicInfoData}
        setSelectedCourse={setSelectedCourse}
        selectedCollegeIns={selectedCollegeIns.insType}
        collegeShortUrl={selectedCollegeIns.shortUrl}
        selectedCollege={selectedCollege}
      />
    </Box>
  );
};

export default CollegeIqComponent;
