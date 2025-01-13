'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { Props as ChartProps } from 'react-apexcharts';
import { usePathname } from 'next/navigation';

import styles from '../card.module.css';

import { ChartDataProps as defaultChartData } from './pieOption';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ChartType = {
  labels: string[];
  series: number[];
};

interface CardProps {
  data: ChartType;
  title: string;
  backGroundColor?: string;
}

const PieChartCard = ({ data, title, backGroundColor = '#FFF' }: CardProps) => {
  const [chartData, setChartData] = useState<ChartProps | null>(null);
  const [activePage, setActivePage] = useState<string>('');
  const asPath = usePathname();
  const segments = asPath?.split('/');

  useEffect(() => {
    if (data && data.labels?.length > 0 && data.series.length > 0) {
      const updatedChart = {
        ...defaultChartData,
        options: {
          ...defaultChartData.options,
          chart: { ...defaultChartData.options?.chart, background: backGroundColor },
          labels: [...data.labels]
        },
        series: [...data.series]
      };
      setChartData(updatedChart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    const activePageName = segments?.[segments.length - 1];
    activePageName && setActivePage(activePageName);
  }, [segments]);

  return (
    <Box className={styles.graphContainer} data-test-id={`${activePage}-pie-chart`}>
      <Typography className={styles.heading}>{title}</Typography>
      <Box>{chartData && chartData.type && <Chart {...chartData} width="100%" />}</Box>
    </Box>
  );
};

export default PieChartCard;
