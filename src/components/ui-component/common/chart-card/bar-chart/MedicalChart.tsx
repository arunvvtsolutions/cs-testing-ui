import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Props as ChartProps } from 'react-apexcharts';

import { ChartDataProps as defaultChartData } from './barOption';

import MainCard from 'ui-component/MainCard';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export type ChartType = {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
};

interface CardProps {
  data: ChartType;
  title: React.ReactNode;
  updatedColors?: string[];
  distributed?: boolean;
  barWidth?: string | number;
  cardBgColor?: string;
  width?: string;
  legendShow?: boolean;
  dataLabelsShow?: boolean;
  opacity?: number;
  backgroundColor?: string;
  strokeLine?: boolean;
  paddingDisable?: boolean;
  height?: number | string;
  toolTip?: (data: React.ReactNode) => React.ReactNode;
}

const DefaultBarChart = ({
  data,
  title,
  updatedColors,
  distributed,
  barWidth,
  legendShow = true,
  dataLabelsShow = false,
  opacity = 1,
  backgroundColor = '#FBFBFB',
  toolTip,
  strokeLine = false,
  width = '100%',
  height = '250px',
  paddingDisable = false
}: CardProps) => {
  const [chartData, setChartData] = useState<ChartProps | null>(null);

  useEffect(() => {
    if (data && data.categories?.length > 0 && data.series?.length > 0) {
      const updatedChart = {
        ...defaultChartData,
        options: {
          ...defaultChartData.options,
          chart: {
            ...defaultChartData.options?.chart,
            background: backgroundColor
          },
          plotOptions: {
            ...defaultChartData.options?.plotOptions,
            bar: {
              ...defaultChartData.options?.plotOptions?.bar,
              columnWidth: barWidth ? barWidth : 35,
              distributed: distributed
            }
          },
          dataLabels: {
            enabled: dataLabelsShow
          },
          legend: {
            ...defaultChartData.options?.legend,
            show: legendShow
          },
          fill: {
            opacity: opacity
          },
          xaxis: {
            ...defaultChartData.options?.xaxis,
            categories: [...data.categories]
          },
          grid: {
            ...defaultChartData.options?.grid,
            strokeDashArray: strokeLine ? 10 : 0,
            yaxis: {
              lines: {
                show: true
              }
            }
          },
          tooltip: {
            theme: 'dark',
            custom: toolTip ? toolTip : defaultChartData.options?.tooltip?.custom
          },
          colors: updatedColors
        },
        series: [...data.series]
      };
      setChartData(updatedChart);
    }
  }, [
    backgroundColor,
    barWidth,
    data,
    dataLabelsShow,
    distributed,
    legendShow,
    opacity,
    strokeLine,
    toolTip,
    updatedColors
  ]);

  return (
    <MainCard paddingDisable={paddingDisable} bgColor={backgroundColor}>
      {title}
      <Box>{chartData && chartData.type && <Chart {...chartData} width={width} height={height} />}</Box>
    </MainCard>
  );
};

export default DefaultBarChart;
