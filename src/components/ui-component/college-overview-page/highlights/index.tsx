'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';

import { HighlightsConst } from './constant';
import styles from './highlights.module.css';

import MainCard from 'ui-component/MainCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
import { Stream } from 'types';
import { ISubMenuProps } from 'ui-component/subheader';
import { converYaxis } from 'utils';

interface IHighlightDataProps {
  shortName?: string;
  nirfRank?: number;
  medianSalary?: string;
  ownership?: string;
  genderAccepted?: string;
  estdYear?: number;
  campus?: string;
  totalFaculty?: string;
  approvedIntake?: string;
  hospitalBeds?: string;
  hostpitalType?: string;
  stream: string;
}
export interface IHighlightsProps extends IErrorProps, ISubMenuProps {
  highlightData: IHighlightDataProps;
}

const Highlights: React.FC<IHighlightsProps> = ({ highlightData, hasError }) => {
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <MainCard
          title={
            <Typography className="subHeadText">
              {highlightData.shortName} {HighlightsConst.HIGHLIGHTS}
            </Typography>
          }
          data-test-id="overview-galary-highlights"
        >
          <Box className={styles.highlightsBox}>
            <Box className={styles.singleHighlightsBox}>
              <Typography className={styles.highlightsValue}>
                {highlightData.nirfRank ? highlightData.nirfRank : 'NA'}
              </Typography>
              <Typography className={styles.highlight}>{HighlightsConst.NIRF_RANK}</Typography>
            </Box>
            {highlightData.stream === Stream.ENGINEERING && (
              <Box className={styles.singleHighlightsBox}>
                <Typography className={styles.highlightsValue}>
                  {highlightData.medianSalary
                    ? isNaN(Number(highlightData.medianSalary))
                      ? highlightData.medianSalary
                      : converYaxis(highlightData.medianSalary)
                    : 'NA'}
                </Typography>
                <Typography className={styles.highlight}>{HighlightsConst.MEDIAN_SALARY}</Typography>
              </Box>
            )}
            {highlightData.stream === Stream.MEDICAL && (
              <Box className={styles.singleHighlightsBox}>
                <Typography className={styles.highlightsValue}>
                  {highlightData.approvedIntake && highlightData.approvedIntake !== '0'
                    ? highlightData.approvedIntake
                    : 'NA'}
                </Typography>
                <Typography className={styles.highlight}>{HighlightsConst.TOTAL_APPROVED}</Typography>
              </Box>
            )}
            <Box className={styles.singleHighlightsBox}>
              <Typography className={styles.highlightsValue}>
                {highlightData.ownership ? highlightData.ownership : 'NA'}
              </Typography>
              <Typography className={styles.highlight}>{HighlightsConst.COLLEGE_OWNERSHIP}</Typography>
            </Box>
            {highlightData.stream === Stream.ENGINEERING && (
              <Box className={styles.singleHighlightsBox}>
                <Typography className={styles.highlightsValue}>
                  {highlightData.genderAccepted ? highlightData.genderAccepted : 'NA'}
                </Typography>
                <Typography className={styles.highlight}>{HighlightsConst.GENDERS_ACCEPTED}</Typography>
              </Box>
            )}
            {highlightData.stream === Stream.MEDICAL && (
              <Box className={styles.singleHighlightsBox}>
                <Typography className={styles.highlightsValue}>
                  {highlightData.hospitalBeds && highlightData.hospitalBeds !== '0' ? highlightData.hospitalBeds : 'NA'}
                </Typography>
                <Typography className={styles.highlight}>{HighlightsConst.HOSPITAL_BEDS}</Typography>
              </Box>
            )}
          </Box>
          <Box className={styles.highlightsBox}>
            <Box className={styles.singleHighlightsBox}>
              <Typography className={styles.highlightsValue}>
                {highlightData.estdYear ? highlightData.estdYear : 'NA'}
              </Typography>
              <Typography className={styles.highlight}>{HighlightsConst.ESTD}</Typography>
            </Box>
            <Box className={styles.singleHighlightsBox}>
              <Typography className={styles.highlightsValue}>
                {highlightData.campus ? highlightData.campus : 'NA'}
              </Typography>
              <Typography className={styles.highlight}>{HighlightsConst.CAMPUS_SIZE}</Typography>
            </Box>
            <Box className={styles.singleHighlightsBox}>
              <Typography className={styles.highlightsValue}>
                {highlightData.totalFaculty && highlightData.totalFaculty !== '0' ? highlightData.totalFaculty : 'NA'}
              </Typography>
              <Typography className={styles.highlight}>{HighlightsConst.FACULTY}</Typography>
            </Box>
            {highlightData.stream === Stream.ENGINEERING && (
              <Box className={styles.singleHighlightsBox}>
                <Typography className={styles.highlightsValue}>
                  {highlightData.approvedIntake ? highlightData.approvedIntake : 'NA'}
                </Typography>
                <Typography className={styles.highlight}>{HighlightsConst.TOTAL_APPROVED}</Typography>
              </Box>
            )}
            {highlightData.stream === Stream.MEDICAL && (
              <Box className={styles.singleHighlightsBox}>
                <Typography className={styles.highlightsValue}>
                  {highlightData.hostpitalType ? highlightData.hostpitalType : 'NA'}
                </Typography>
                <Typography className={styles.highlight}>{HighlightsConst.HOSPITAL_TYPE}</Typography>
              </Box>
            )}
          </Box>
        </MainCard>
      )}
    </>
  );
};

export default Highlights;
