import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { DiversityContent } from './constant';

import BarChartCard from 'ui-component/common/chart-card/bar-chart';
import PieChartCard from 'ui-component/common/chart-card/pie-chart';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

interface IDiversityProps {
  shortName: string;
  diversity: {
    labels: string[];
    series: number[];
  };
  previousYear: {
    year: string[];
    series: {
      name: string;
      data: number[];
    }[];
  };
}

export interface IDiversityDataProps extends IErrorProps {
  diversityData: IDiversityProps;
  strengthData: IStrengthData;
}

interface IStrengthData {
  strength: {
    labels: string[];
    series: number[];
  };

  previousYear: {
    year: string[];
    series: {
      name: string;
      data: number[];
    }[];
  };
}

export interface IDiversityDataProps extends IErrorProps {
  diversityData: IDiversityProps;
  strengthData: IStrengthData;
}

const DiversityInclusion: React.FC<IDiversityDataProps> = ({ diversityData, strengthData, hasError }) => {
  const barColors = ['#11519C', '#4083C3', '#68ABE1'];

  return (
    <Box>
      <Box className="emptyCard" data-test-id="student-stength-diversity-inclusion">
        {hasError ? (
          <ErrorComponent />
        ) : (
          <>
            <Box className="cardHead">
              <Typography className="cg_InnerTitleTxt">
                {DiversityContent.HEADING} {diversityData.shortName}
              </Typography>
            </Box>
            <Grid container spacing={{ xs: 1, md: 3 }}>
              <Grid item xs={12} md={6}>
                {diversityData.diversity && diversityData.diversity.series?.length > 0 && (
                  <Box>
                    <PieChartCard title={DiversityContent.DIVERSITY_INCLUSION} data={diversityData.diversity} />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                {diversityData.previousYear && diversityData.previousYear?.year?.length > 0 && (
                  <Box>
                    <BarChartCard
                      title={DiversityContent.PREVIOUS_YEAR_COMPARISON}
                      data={diversityData.previousYear}
                      updatedColors={barColors}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                {strengthData.strength && strengthData.strength.series?.length > 0 && (
                  <Box>
                    <PieChartCard title={DiversityContent.STUDENT_STRENGTH} data={strengthData.strength} />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                {strengthData.previousYear && strengthData.previousYear?.year?.length > 0 && (
                  <Box>
                    <BarChartCard
                      title={DiversityContent.PREVIOUS_YEAR_COMPARISON}
                      data={strengthData.previousYear}
                      updatedColors={barColors}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DiversityInclusion;
