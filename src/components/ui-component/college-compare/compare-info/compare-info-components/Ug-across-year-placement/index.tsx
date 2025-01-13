/* eslint-disable import/order */
import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

import CompareInfoHead from '../../compare-info-head';
import infoStyles from '../../compareInfoStyles.module.css';

import CompareInfoContent, { IUgGraduationProps } from './compare-info-content';

import { ChartType } from 'ui-component/common/chart-card/bar-chart/MedicalChart';
import CompareCollegeGraph from 'ui-component/college-compare/compare-college-graph';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
import { CompareInfoTitles } from '../constant';

export interface IUgPlacementDataProps {
  data: IUgGraduationProps[];
  graphData: ChartType;
}

export interface IUgPlacementResultProps extends IErrorProps {
  graduationData: IUgPlacementDataProps;
}

const UgAcrossGraduation: FC<IUgPlacementResultProps> = ({ graduationData, hasError }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [placementState, setPlacementData] = useState<IUgPlacementDataProps>(graduationData);

  useEffect(() => {
    if (isMdDown) {
      setPlacementData({
        data: [...graduationData.data.slice(0, 2)],
        graphData: {
          categories: [...graduationData.graphData.categories.slice(0, 2)],
          series: [...graduationData.graphData.series.slice(0, 2)]
        }
      });
    } else setPlacementData(graduationData);
  }, [isMdDown, graduationData]);

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        placementState.data.some((placement) => placement.data.length > 0) && (
          <Box className={infoStyles.clgInfoCard}>
            <CompareInfoHead open={open} setOpen={setOpen} title={CompareInfoTitles.UG_ACROSS_YEAR_PLACEMENT} />
            {open && (
              <CompareCollegeGraph
                comparedCollegeData={{
                  title: CompareInfoTitles.UG_ACROSS_YEAR_PLACEMENT,
                  comparedData: placementState.graphData
                }}
              />
            )}
            {!open && <CompareInfoContent graduationData={placementState.data} />}
          </Box>
        )
      )}
    </>
  );
};

export default UgAcrossGraduation;
