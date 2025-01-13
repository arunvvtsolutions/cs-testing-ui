import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

import CompareInfoHead from '../../compare-info-head';
import infoStyles from '../../compareInfoStyles.module.css';
import { CompareInfoTitles } from '../constant';

import CompareInfoContent, { IUgGraduationProps } from './compare-info-content';

import { ChartType } from 'ui-component/common/chart-card/bar-chart/MedicalChart';
import CompareCollegeGraph from 'ui-component/college-compare/compare-college-graph';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
export interface IUgGraduationDataProps {
  data: IUgGraduationProps[];
  graphData: ChartType;
}
export interface IUgGraduationResultProps extends IErrorProps {
  graduationData: IUgGraduationDataProps;
}

const UgAcrossGraduation: FC<IUgGraduationResultProps> = ({ graduationData, hasError }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [graduationState, setGraduationData] = useState<IUgGraduationDataProps>(graduationData);

  useEffect(() => {
    if (isMdDown) {
      setGraduationData({
        data: [...graduationData.data.slice(0, 2)],
        graphData: {
          categories: [...graduationData.graphData.categories.slice(0, 2)],
          series: [...graduationData.graphData.series.slice(0, 2)]
        }
      });
    } else setGraduationData(graduationData);
  }, [isMdDown, graduationData]);

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        graduationState.data.some((grdData) => grdData.data.length > 0) && (
          <Box className={infoStyles.clgInfoCard}>
            <CompareInfoHead open={open} setOpen={setOpen} title={CompareInfoTitles.UG_ACROSS_YEAR_GRADUATION} />
            {open && (
              <CompareCollegeGraph
                comparedCollegeData={{
                  title: CompareInfoTitles.UG_ACROSS_YEAR_GRADUATION,
                  comparedData: graduationState.graphData
                }}
              />
            )}
            {!open && <CompareInfoContent graduationData={graduationState.data} />}
          </Box>
        )
      )}
    </>
  );
};

export default UgAcrossGraduation;
