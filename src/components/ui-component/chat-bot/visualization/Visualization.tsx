import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

import { IChatBotProps } from '../chatbot-window';
import { CHATBOT_CONSTANTS } from '../chatbot-window/constant';

import styles from './visualization.module.css';
import VisualizationSkeleton from './Skeleton';

import BarChartCard from 'ui-component/common/chart-card/bar-chart';
import { API_BASE_URL } from 'config';
import useAuth from 'hooks/useAuth';
import { Api } from 'types/enums';
import { ScrollContent } from 'ui-component/listing-page/filter/styles';

const Visualizatin = ({ visualization, height }: { visualization: IChatBotProps; height?: string | number }) => {
  const { user } = useAuth();

  const barColors = ['#148768', '#1D9B78', '#1DB089', '#1EC699'];
  return (
    <ScrollContent
      className={styles.mainContainer}
      data-test-id={`chat-bot-visualization-card-`}
      sx={{
        height: '100%',
        maxHeight: `100% !important`,
        overflowY: 'auto'
      }}
    >
      <Box className={styles.questionWrapper}>
        <Avatar className={styles.profileImage} src={`${API_BASE_URL}/${Api.profileImage}/${user?.image}`} />
        <Typography className={styles.queston}>{visualization.question}</Typography>
      </Box>
      <Box className={styles.chartDataWrapper}>
        {visualization?.visualization?.categorical_data?.length &&
        visualization?.visualization?.categorical_data?.length > 0 &&
        visualization.visualization?.numerical_data ? (
          <>
            {visualization.visualization.categorical_data.map((vis, index) => {
              return (
                <BarChartCard
                  key={index}
                  data={{
                    year: vis.data || [],
                    series: visualization.visualization?.numerical_data || []
                  }}
                  title=""
                  updatedColors={barColors}
                  chartBgColor="transparent"
                  graphContainerStyle
                  dataFontColor="rgba(22, 22, 24, 1)"
                  dataFontWeight="400"
                  dataLineHeight="18px"
                  distributed
                  legendShow={true}
                  minHeight="250px"
                  chatChart
                  mainCardBgColor="transparent"
                  rotate={-45}
                  chartHeight={400}
                />
              );
            })}
            {/* <Box className={styles.packageContent} px={2}>
              <ul>
                {visualization?.visualization_descriptions?.map((vis, index) => {
                  return <li key={index}>{vis.college_name}</li>;
                })}
              </ul>
            </Box> */}
          </>
        ) : (
          <>
            <Box paddingTop={'30px'} px={2}>
              {!visualization.loading ? (
                <Typography textAlign={'center'} fontWeight="500" fontSize="16px">
                  {CHATBOT_CONSTANTS.NO_VISULA_REPRESENTATION}
                </Typography>
              ) : (
                <VisualizationSkeleton />
              )}
            </Box>
          </>
        )}
      </Box>
    </ScrollContent>
  );
};

export default Visualizatin;
