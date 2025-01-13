import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

import CompareInfoHead from '../../compare-info-head';
import infoStyles from '../../compareInfoStyles.module.css';
import { CompareInfoTitles } from '../constant';

import CompareInfoContent, { IOperationalExpenditure } from './compare-info-content';

import { ChartType } from 'ui-component/common/chart-card/bar-chart/MedicalChart';
import CompareCollegeGraph from 'ui-component/college-compare/compare-college-graph';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

export interface IOperationalExpenditureProps {
  data: IOperationalExpenditure[];
  graphData: ChartType;
}

export interface IOperationalExpenditureResProps extends IErrorProps {
  operationalExpenditure: IOperationalExpenditureProps;
}
const OperationalExpenditure: FC<IOperationalExpenditureResProps> = ({ operationalExpenditure, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setOpen] = useState(false);
  const [expenditureState, setExpenditure] = useState<IOperationalExpenditureProps>(operationalExpenditure);

  useEffect(() => {
    if (isMdDown) {
      setExpenditure({
        data: [...operationalExpenditure.data.slice(0, 2)],
        graphData: {
          categories: [...operationalExpenditure.graphData.categories.slice(0, 2)],
          series: [...operationalExpenditure.graphData.series.slice(0, 2)]
        }
      });
    } else setExpenditure(operationalExpenditure);
  }, [isMdDown, operationalExpenditure]);
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        expenditureState.data.some(
          (data) => data.academicInfrastructure || data.salaries || data.seminar || data.total
        ) && (
          <Box className={infoStyles.clgInfoCard}>
            <CompareInfoHead open={open} setOpen={setOpen} title={CompareInfoTitles.OPERATIONAL_EXPENDITURE} />
            {open && (
              <CompareCollegeGraph
                comparedCollegeData={{
                  title: CompareInfoTitles.OPERATIONAL_EXPENDITURE,
                  comparedData: expenditureState.graphData
                }}
              />
            )}
            {!open && <CompareInfoContent operationalExpenditure={expenditureState.data} />}
          </Box>
        )
      )}
    </>
  );
};

export default OperationalExpenditure;
