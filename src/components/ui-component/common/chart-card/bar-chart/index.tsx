/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Box, Typography, SxProps } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Props as ChartProps } from 'react-apexcharts';
import { usePathname } from 'next/navigation';

import styles from '../card.module.css';

import { ChartDataProps as defaultChartData } from './barOption';

import MainCard from 'ui-component/MainCard';
import { converYaxis } from 'utils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ChartType = {
  year: string[];
  series: {
    name: string;
    data: number[];
  }[];
};

interface CardProps {
  data: ChartType;
  title: string;
  updatedColors?: string[];
  distributed?: boolean;
  barWidth?: string | number;
  legendShow?: boolean;
  dataLabelsShow?: boolean;
  titleSx?: SxProps;
  chartBgColor?: string;
  tooltipLabel?: boolean;
  graphContainerStyle?: boolean;
  dataFontColor?: string;
  dataFontWeight?: string;
  dataLineHeight?: string;
  minHeight?: string;
  chartHeight?: number;
  chatChart?: boolean;
  mainCardBgColor?: string;
  rotate?: number;
}

const BarChartCard = ({
  data,
  title,
  updatedColors,
  distributed,
  barWidth,
  legendShow = true,
  dataLabelsShow = false,
  titleSx = {},
  chartBgColor = '#FFF',
  tooltipLabel = false,
  graphContainerStyle = false,
  dataFontColor,
  dataFontWeight,
  dataLineHeight,
  minHeight = '',
  chartHeight = 250,
  chatChart,
  mainCardBgColor = '',
  rotate = 0
}: CardProps) => {
  const [chartData, setChartData] = useState<ChartProps | null>(null);
  const [activePage, setActivePage] = useState<string>('');
  const asPath = usePathname();

  useEffect(() => {
    if (data && data.year.length > 0 && data.series.length > 0) {
      const updatedChart = {
        ...defaultChartData,
        options: {
          ...defaultChartData.options,
          chart: {
            ...defaultChartData.options?.chart,
            background: chartBgColor
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
          xaxis: {
            ...defaultChartData.options?.xaxis,
            labels: {
              ...defaultChartData.options?.xaxis?.labels,
              rotate: rotate,
              style: {
                ...defaultChartData.options?.xaxis?.labels?.style,
                colors: chatChart ? dataFontColor : defaultChartData.options?.xaxis?.labels?.style?.colors,
                fontWeight: chatChart ? dataFontWeight : defaultChartData.options?.xaxis?.labels?.style?.fontWeight,
                lineHeight: chartData && dataLineHeight
              }
            },
            categories: [...data.year]
          },
          yaxis: {
            ...defaultChartData.options?.yaxis,
            labels: {
              formatter: function (value: any) {
                return converYaxis(value);
              },
              style: {
                colors: chatChart ? dataFontColor : defaultChartData.options?.xaxis?.labels?.style?.colors,
                fontWeight: chatChart ? dataFontWeight : defaultChartData.options?.xaxis?.labels?.style?.fontWeight,
                lineHeight: chartData && dataLineHeight
              }
            }
          },
          colors: updatedColors,
          tooltip: {
            ...defaultChartData.options?.tooltip,
            custom: function ({ seriesIndex, dataPointIndex, w }: any) {
              // Get the data series and value names
              const seriesData = w.config.series[seriesIndex];
              const value = seriesData.data[dataPointIndex];
              const valueName = tooltipLabel ? data.year[dataPointIndex] : w.config.series[seriesIndex].name;

              // Customize the tooltip content
              return `
              <div class="custom-tooltip" style="padding:5px 6px">
                    <p style="color: #FFF;
                        font-family: inherit;
                    font-size: 10px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;">${valueName}</p>
                    <p style="
                    color: #FFF;
                        font-family: inherit;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                    ">${value}</p>
                  </div>
                `;
            }
          }
        },
        series: [...data.series]
      };
      setChartData(updatedChart);
    }
  }, [data]);

  useEffect(() => {
    const segments = asPath?.split('/');
    const lastSegment = segments?.[segments.length - 1];
    lastSegment && setActivePage(lastSegment);
  }, [asPath]);

  return (
    <MainCard
      bgColor={mainCardBgColor}
      className={graphContainerStyle ? 'chatBotBarGraphContainer' : styles.graphContainer}
      data-test-id={`${activePage}-bar-chart`}
    >
      <Typography sx={titleSx} className={styles.heading}>
        {title}
      </Typography>
      <Box minHeight={minHeight} height="100%" width="100%">
        {chartData && chartData.type && <Chart {...chartData} width="100%" height={`${chartHeight}px`} />}
      </Box>
    </MainCard>
  );
};

export default BarChartCard;
