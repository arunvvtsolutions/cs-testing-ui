/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { Props as ChartProps } from 'react-apexcharts';
import { usePathname } from 'next/navigation';

import { ChartDataProps as defaultChartData } from './defaultLineChart';
import styles from './LineChart.module.css'; // Import the component-specific styles

import { converYaxis } from 'utils';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
type SeriesProps = {
  data: number[];
  name?: string;
  color?: string;
};
type ChartType = {
  categories: string[];
  series: SeriesProps[];
};

interface CardProps {
  data?: ChartType;
  title: string;
  subTitle?: string;
  dataStatus?: React.ReactNode;
  colors?: string[];
  lineColor?: string[];
  customeLabel?: React.ReactNode;
  chartWidth?: string;
  bgColor?: string;
  disableTooltiple?: boolean;
}
const LineChartCard = ({
  data,
  title,
  subTitle,
  dataStatus,
  colors,
  customeLabel,
  lineColor,
  chartWidth = '100%',
  bgColor = 'white',
  disableTooltiple = false
}: CardProps) => {
  const [chartData, setChartData] = useState<ChartProps | null>(null);
  const [activePage, setActivePage] = useState<string>('');
  const asPath = usePathname();
  const segments = asPath?.split('/');

  useEffect(() => {
    if (data && data.categories.length > 0 && data.series?.length > 0) {
      const updatedSeries = data.series.map((series, seriesIndex) => {
        const markersWithColors = series.data.map((value, dataPointIndex) => ({
          x: data.categories[dataPointIndex],
          y: value,
          strokeColor: colors ? colors[dataPointIndex] : undefined
        }));

        return {
          name: series.name,
          data: markersWithColors
        };
      });

      const updatedChart = {
        ...defaultChartData,
        options: {
          ...defaultChartData.options,
          chart: {
            ...defaultChartData.options?.chart,
            background: bgColor
          },
          xaxis: {
            ...defaultChartData.options?.xaxis,
            categories: data.categories,
            min: lineColor ? defaultChartData.options?.xaxis?.min : 0,
            max: lineColor ? defaultChartData.options?.xaxis?.max : 4,
            axisBorder: {
              show: lineColor && lineColor?.length > 0,
              color: 'black'
            },
            label: { trim: true, rotate: -0 }
          },
          legend: {
            ...defaultChartData.options?.legend,
            markers: {
              ...defaultChartData.options?.legend?.markers,
              width: lineColor ? 23 : 12,
              height: lineColor ? 6 : 12,
              radius: lineColor ? 0 : 12
            },
            itemMargin: {
              ...defaultChartData.options?.legend?.itemMargin,
              horizontal: lineColor ? 10 : defaultChartData.options?.legend?.itemMargin?.horizontal
            }
          },
          markers: {
            ...defaultChartData.options?.markers,
            colors: lineColor ? lineColor : defaultChartData.options?.markers?.colors,
            strokeColors: lineColor ? lineColor : defaultChartData.options?.markers?.strokeColors,
            hover: {
              ...defaultChartData.options?.markers?.hover,
              size: lineColor ? 6 : defaultChartData.options?.markers?.hover?.size
            }
          },
          colors: lineColor ? lineColor : defaultChartData.options?.colors,
          tooltip: disableTooltiple
            ? defaultChartData.options?.tooltip
            : {
                ...defaultChartData.options?.tooltip,
                custom: function ({ seriesIndex, dataPointIndex, w }: any) {
                  const seriesData = w.config.series[seriesIndex];
                  const value = colors
                    ? seriesData.data[dataPointIndex].y
                    : converYaxis(seriesData.data[dataPointIndex]);
                  const valueName = colors ? seriesData.data[dataPointIndex].x : w.config.series[seriesIndex].name;
                  return `
                <div class="${styles.customTooltip}">
                  <p class=${styles.customTooltipTitle}>${valueName}</p>
                  <p class="${styles.customTooltipValue}">${value}</p>
                </div>
              `;
                }
              }
        },
        series: colors ? updatedSeries : data.series
      };

      setChartData(updatedChart);
    }
  }, [bgColor, colors, data, disableTooltiple, lineColor]);

  useEffect(() => {
    const activePageName = segments?.[segments.length - 1];
    activePageName && setActivePage(activePageName);
  }, [segments]);

  return (
    <Box
      className={styles.graphContainer}
      data-test-id={`${activePage}-line-chart`}
      bgcolor={' rgba(245, 245, 245, 0.4)'}
    >
      <Typography className={styles.heading}>{title}</Typography>
      <Box>{chartData && chartData.type && <Chart {...chartData} width={chartWidth} height={250} />}</Box>
      {subTitle && <Typography className={styles.subTitle}>{subTitle}</Typography>}
      {dataStatus && <Box>{dataStatus}</Box>}
      {customeLabel}
    </Box>
  );
};

export default LineChartCard;
