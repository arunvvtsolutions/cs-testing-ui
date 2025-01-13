/* eslint-disable @typescript-eslint/no-explicit-any */
import { Props } from 'react-apexcharts';

import { converYaxis } from 'utils';

export const ChartDataProps: Props = {
  type: 'bar',
  options: {
    chart: {
      id: 'strengthbar-chart',
      type: 'bar',
      background: '#FFF',
      toolbar: {
        show: false
      }
    },
    colors: [], // Move colors to plotOptions.bar
    plotOptions: {
      bar: {
        horizontal: false,
        distributed: false,
        borderRadius: 2,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last'
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false,
      position: 'bottom',
      fontFamily: 'inherit',
      fontSize: '12px',
      fontWeight: 400,
      labels: {
        colors: '#000'
      },
      markers: {
        radius: 12
      }
    },
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    grid: {
      position: 'back',
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (value: any) {
          return converYaxis(value);
        },
        style: {
          colors: 'rgba(32, 33, 36, 0.50)',
          fontFamily: 'inherit',
          fontSize: '12px',
          fontWeight: '500'
        }
      }
    },
    stroke: {
      colors: ['transparent'],
      width: 2
    },
    xaxis: {
      labels: {
        style: {
          colors: 'rgba(32, 33, 36, 0.50)',
          fontFamily: 'inherit',
          fontSize: '12px',
          fontWeight: '500'
        },
        trim: true,
        rotate: -0
      },
      categories: []
    },
    tooltip: {
      theme: 'dark',
      custom: function ({ seriesIndex, dataPointIndex, w }: any) {
        // Get the data series and value names
        const seriesData = w.config.series[seriesIndex];
        const value = seriesData.data[dataPointIndex];
        const valueName = w.config.series[seriesIndex].name;

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
  series: []
};
