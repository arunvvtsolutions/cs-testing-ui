/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

import CompareInfoHead from '../../compare-info-head';
import infoStyles from '../../compareInfoStyles.module.css';

import CompareInfoContent, { IIprDataProps } from './compare-info-content';
import _ from 'lodash';
import { ChartType } from 'ui-component/common/chart-card/bar-chart/MedicalChart';
import CompareCollegeGraph from 'ui-component/college-compare/compare-college-graph';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
import { CompareInfoTitles } from '../constant';
export interface IIprProps {
  data: IIprDataProps[];
  graphData: ChartType;
}

export interface IIprResultProps extends IErrorProps {
  iprResult: IIprProps;
}

const IprInfo: FC<IIprResultProps> = ({ iprResult, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setOpen] = useState(false);
  const [iprResultState, setIprResult] = useState<IIprProps>(iprResult);

  useEffect(() => {
    if (isMdDown) {
      setIprResult({
        data: [...iprResult.data.slice(0, 2)],
        graphData: {
          categories: [
            ...iprResult.graphData.categories
              .slice(0, 2)
              .map((item) => _.capitalize(item.replace('Patents ', ''))),
          ],
          series: [...iprResult.graphData.series.slice(0, 2)],
        },
      });
    } else setIprResult(iprResult);
  }, [isMdDown, iprResult]);

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        iprResultState.data.length > 0 && (
          <Box className={infoStyles.clgInfoCard}>
            <CompareInfoHead
              open={open}
              setOpen={setOpen}
              title={`${CompareInfoTitles.IPR} ${
                isMdDown ? CompareInfoTitles.PATENTS : ''
              }`}
            />
            {open && (
              <CompareCollegeGraph
                comparedCollegeData={{
                  title: CompareInfoTitles.IPR,
                  comparedData: iprResultState.graphData,
                }}
              />
            )}
            {!open && <CompareInfoContent iprData={iprResultState.data} />}
          </Box>
        )
      )}
    </>
  );
};

export default IprInfo;
