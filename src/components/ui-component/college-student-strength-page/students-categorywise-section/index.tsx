import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { STUDENT_STRENGTH_CONTENT } from './constants';

import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
import BarChartCard from 'ui-component/common/chart-card/bar-chart';

type SeriesProps = {
  name: string;
  data: number[];
};

type ChartType = {
  shortName: string;
  categories: string[];
  series: SeriesProps[];
};
export interface ICategoriesProps extends IErrorProps {
  categoryData: ChartType;
}

const CategoryWiseStudentsPage: React.FC<ICategoriesProps> = ({ categoryData, hasError }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const colors = ['#11519C', '#4083C3', '#68ABE1', '#9DD2F5'];
  const [categoryDataState, setCategoryData] = useState<ChartType>({
    categories: [],
    series: [],
    shortName: ''
  });

  useEffect(() => {
    setCategoryData(categoryData);
  }, [categoryData]);
  useEffect(() => {
    if (isMd) {
      const categories = categoryData.categories.map((category) => {
        return category.replace(STUDENT_STRENGTH_CONTENT.YEARS, STUDENT_STRENGTH_CONTENT.Y);
      });
      setCategoryData({
        series: categoryData.series,
        categories: categories,
        shortName: categoryData.shortName
      });
    } else {
      setCategoryData(categoryData);
    }
  }, [isMd, categoryData]);
  return (
    <Box className="emptyCard" data-test-id="student-strength-categorywise">
      {hasError ? (
        <ErrorComponent />
      ) : (
        <>
          <Box className="cardHead" display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography className="cg_InnerTitleTxt">
              {categoryData.shortName}
              {STUDENT_STRENGTH_CONTENT.IIT_APR_INTAKE}
            </Typography>
          </Box>

          <Box className="ReviewSecBody">
            <BarChartCard
              updatedColors={colors}
              data={{
                series: categoryDataState.series,
                year: categoryDataState.categories
              }}
              barWidth={50}
              distributed
              tooltipLabel
              dataLabelsShow={isMd ? true : false}
              title={STUDENT_STRENGTH_CONTENT.STUDENT_STRENGTH_CATEGORYWISE}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default CategoryWiseStudentsPage;
