import { Button, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import Link from 'next/link';

import BasicResult from './basicResult';
import BasicResultGraph from './basicResultGraph';
import styles from './styles.module.css';
import { BasicInfoContent } from './constant';

import { ChartType } from 'ui-component/common/chart-card/bar-chart/MedicalChart';
import { ENGINEERING_BASE_URL } from 'config';

export interface IResultProps {
  collegeName: string;
  nirfRank: number;
  nirfScore: number;
  campusArea: number;
  establishedYear: number;
  Ownership: string;
}

export interface IGraphDataProps extends ChartType {
  title: string;
}

export interface IResultGraphProps {
  [key: string]: IGraphDataProps;
  placementData: IGraphDataProps;
  salaryPackageData: IGraphDataProps;
  graduationRateData: IGraphDataProps;
  cutoffData: IGraphDataProps;
  expenditureData: IGraphDataProps;
}

export interface ICourseList {
  courseId: number;
  courseName: string;
}

export interface IBasicInfoResultProps {
  resultGraphData: IResultGraphProps;
  resultData: IResultProps;
  courseList: ICourseList[];
}

export interface IBasicInfoProps {
  basicInfoData: IBasicInfoResultProps;
  setSelectedCourse: (e: string | number) => void;
  selectedCollegeIns?: string;
  collegeShortUrl?: string;
  selectedCollege?: string | number;
}

const BasicResultInformation: FC<IBasicInfoProps> = ({
  basicInfoData,
  setSelectedCourse,
  selectedCollegeIns,
  collegeShortUrl,
  selectedCollege
}) => {
  const { resultGraphData, resultData } = basicInfoData;

  return (
    <>
      {basicInfoData && basicInfoData.resultData?.collegeName && (
        <Grid container spacing={2} data-test-id="freetool-graph-and-cutoff" className={styles.grid_wrap}>
          <Grid item xs={12} flexDirection="row" justifyContent="space-between" alignItems="center" display="flex">
            <Typography
              className={`dashBoard_h3 ${styles.title}`}
              data-test-id="freetool-graph-and-cutoff-college-name"
            >
              {resultData.collegeName}
            </Typography>
            <Link
              href={`${ENGINEERING_BASE_URL}/${selectedCollegeIns}/${collegeShortUrl}/overview`}
              className={styles.topButton}
              data-test-id="freetool-graph-and-cutoff-view-college-link"
              target="_blank"
            >
              <Button
                className={`${styles.viewCollegeButton} ${styles.topButton}`}
                variant="contained"
                data-test-id="freetool-graph-and-cutoff-view-college-button"
              >
                {BasicInfoContent.VIEWCOLLEGEBUTTON}
              </Button>
            </Link>
          </Grid>
          {resultData && (
            <Grid item xs={12} md={4} pt={0}>
              <BasicResult resultData={resultData} />
            </Grid>
          )}
          {resultGraphData.graduationRateData?.categories.length > 0 && (
            <Grid item xs={12} md={8} pt={0}>
              <BasicResultGraph
                graphData={resultGraphData}
                courseList={basicInfoData.courseList}
                setSelectedCourse={setSelectedCourse}
                selectedCollege={selectedCollege}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Link
              href={`${ENGINEERING_BASE_URL}/${selectedCollegeIns}/${collegeShortUrl}/overview`}
              className={styles.bottomButtonGrid}
              data-test-id="freetool-graph-and-cutoff-view-college-link-mobile"
              target="_blank"
            >
              <Button
                className={`${styles.viewCollegeButton} ${styles.bottomButton}`}
                variant="contained"
                data-test-id="freetool-graph-and-cutoff-view-college-button-mobile"
              >
                {BasicInfoContent.VIEWCOLLEGEBUTTON}
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default BasicResultInformation;
