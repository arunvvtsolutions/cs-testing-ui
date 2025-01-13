'use client';
import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { PlacementsAndSalaryTrends } from './constant';
import styles from './Placements.module.css';

import MainCard from 'ui-component/MainCard';
import { IErrorProps, IInnerPageParams } from 'types';
import ErrorComponent from 'ui-component/error';
import { converYaxis } from 'utils';

interface IPlacementDataProps {
  shortName: string;
  medianSalary: number;
  maxPackage: string;
  collegePlacements: string;
}
export interface IPlacementsProps extends IErrorProps {
  placementData: IPlacementDataProps;
}

const PlacementsAndSalary: React.FC<IPlacementsProps> = ({ placementData, hasError }) => {
  const theme = useTheme();
  const params = useParams<IInnerPageParams>();
  const ins = params?.ins;
  const name = params?.name;
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <MainCard
          title={
            <Typography className="subHeadText">
              {placementData.shortName} {PlacementsAndSalaryTrends.TITLE}
            </Typography>
          }
          data-test-id="overview-placements-salary"
        >
          <Box className={styles.placementsInner}>
            <Box className={styles.placementsDetail}>
              <Typography className={styles.placementsValue}>
                {placementData.medianSalary && placementData.medianSalary !== 0
                  ? isNaN(Number(placementData.medianSalary))
                    ? placementData.medianSalary
                    : converYaxis(placementData.medianSalary)
                  : 'NA'}
              </Typography>
              <Typography className={styles.placementsKey}>{PlacementsAndSalaryTrends.UG_MEDIAN_SALARY}</Typography>
            </Box>
            <Box className={styles.placementsDetail}>
              <Typography className={styles.placementsValue}>
                {placementData.collegePlacements && placementData.collegePlacements !== '0'
                  ? placementData.collegePlacements
                  : 'NA'}
              </Typography>
              <Typography className={styles.placementsKey}>{PlacementsAndSalaryTrends.TOTAL_OFFERS}</Typography>
            </Box>
            <Box className={styles.placementsDetail}>
              <Typography className={styles.placementsValue}>
                {placementData.maxPackage && placementData.maxPackage !== '0' ? placementData.maxPackage : 'NA'}
              </Typography>
              <Typography className={styles.placementsKey}>{PlacementsAndSalaryTrends.MAX_PACKAGE}</Typography>
            </Box>
            <Link
              className={styles.detailsLinkBox}
              href={`/${ins}/${name}/placement`}
              as={`/${ins}/${name}/placement`}
              data-test-id="overview-placements-salary-viewall"
            >
              <Typography className={styles.readMoreLink}>
                {PlacementsAndSalaryTrends.VIEW_ALL}
                <ChevronRightIcon
                  style={{
                    color: isMdBreakpoint ? '#fff' : '#1452A4',
                    verticalAlign: 'middle'
                  }}
                />
              </Typography>
            </Link>
          </Box>
        </MainCard>
      )}
    </>
  );
};
export default PlacementsAndSalary;
