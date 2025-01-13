import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

import CompareInfoHead from '../../compare-info-head';
import infoStyles from '../../compareInfoStyles.module.css';
import { CompareInfoTitles } from '../constant';

import CompareInfoContent from './compare-info-content';

import { ChartType } from 'ui-component/common/chart-card/bar-chart/MedicalChart';
import CompareCollegeGraph from 'ui-component/college-compare/compare-college-graph';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
interface IPhdDataProps {
  pursuing: string;
  graduated: string;
}
export interface IPhdResultProps {
  data: IPhdDataProps[];
  graphData: ChartType;
}

export interface IPhdResultDataProps extends IErrorProps {
  phdResult: IPhdResultProps;
}

const UgAcrossPlacement: FC<IPhdResultDataProps> = ({ phdResult, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setOpen] = useState(false);
  const [phdResultState, setPhdResult] = useState<IPhdResultProps>(phdResult);

  useEffect(() => {
    if (isMdDown) {
      setPhdResult({
        data: [...phdResult.data.slice(0, 2)],
        graphData: {
          categories: [...phdResult.graphData.categories.slice(0, 2)],
          series: [...phdResult.graphData.series.slice(0, 2)]
        }
      });
    } else setPhdResult(phdResult);
  }, [isMdDown, phdResult]);
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        phdResultState.data.length > 0 && (
          <Box className={infoStyles.clgInfoCard}>
            <CompareInfoHead open={open} setOpen={setOpen} title={CompareInfoTitles.PHD} />
            {open && (
              <CompareCollegeGraph
                comparedCollegeData={{
                  title: CompareInfoTitles.PHD,
                  comparedData: phdResultState.graphData
                }}
              />
            )}
            {!open && <CompareInfoContent phdResult={phdResultState.data} />}
          </Box>
        )
      )}
    </>
  );
};

export default UgAcrossPlacement;
