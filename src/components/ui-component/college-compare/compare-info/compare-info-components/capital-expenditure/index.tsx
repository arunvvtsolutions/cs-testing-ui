import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

import CompareInfoHead from '../../compare-info-head';
import infoStyles from '../../compareInfoStyles.module.css';
import { CompareInfoTitles } from '../constant';

import CompareInfoContent, { ICapitalExpenditureData } from './compare-info-content';

import { ChartType } from 'ui-component/common/chart-card/bar-chart/MedicalChart';
import CompareCollegeGraph from 'ui-component/college-compare/compare-college-graph';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface ICapitalExpenditureProps {
  data: ICapitalExpenditureData[];
  graphData: ChartType;
}

export interface ICapitalExpenditureResult extends IErrorProps {
  capitalExpenditure: ICapitalExpenditureProps;
}
const CapitalExpenditure: FC<ICapitalExpenditureResult> = ({ capitalExpenditure, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setOpen] = useState(false);
  const [expenditureState, setExpenditure] = useState<ICapitalExpenditureProps>(capitalExpenditure);

  useEffect(() => {
    if (isMdDown) {
      setExpenditure({
        data: [...capitalExpenditure.data.slice(0, 2)],
        graphData: {
          categories: [...capitalExpenditure.graphData.categories.slice(0, 2)],
          series: [...capitalExpenditure.graphData.series.slice(0, 2)]
        }
      });
    } else setExpenditure(capitalExpenditure);
  }, [isMdDown, capitalExpenditure]);

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        expenditureState.data.some(
          (expt) => expt.creationofCapitalAssets || expt.library || expt.newEquipments || expt.total || expt.workshops
        ) && (
          <Box className={infoStyles.clgInfoCard}>
            <CompareInfoHead open={open} setOpen={setOpen} title={CompareInfoTitles.CAPITAL_EXPENDITURE} />
            {open && (
              <CompareCollegeGraph
                comparedCollegeData={{
                  title: CompareInfoTitles.CAPITAL_EXPENDITURE,
                  comparedData: expenditureState.graphData
                }}
              />
            )}
            {!open && <CompareInfoContent capitalExpenditure={expenditureState.data} />}
          </Box>
        )
      )}
    </>
  );
};

export default CapitalExpenditure;
