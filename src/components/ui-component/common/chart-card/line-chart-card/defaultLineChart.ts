/* eslint-disable @typescript-eslint/no-explicit-any */
import { Props } from 'react-apexcharts';

import { converYaxis } from 'utils';
export const ChartDataProps: Props = {
  type: 'line',
  options: {
    chart: {
      id: 'fb',
      // group: "social",
      type: 'line',
      height: 160,
      background: 'white',
      width: 2,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    legend: {
      show: true,
      fontFamily: 'inherit',
      fontSize: '12px',
      fontWeight: 400
    },
    fill: {
      type: 'solid',
      opacity: 0
    },
    grid: {
      strokeDashArray: 10,
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
    xaxis: {
      tooltip: {
        enabled: false
      },
      axisBorder: {
        show: false
      },
      labels: {
        rotate: -0,
        style: {
          colors: 'rgba(32, 33, 36, 0.50)',
          fontFamily: 'inherit',
          fontSize: '12px',
          fontWeight: '500' // Adjust as needed
        }
      }
      // max: 0.1,
    },
    stroke: {
      curve: 'straight',
      show: true,
      width: 2,
      dashArray: 0
    },
    markers: {
      size: 6, // Adjust the size of the markers as neede
      colors: '#FFFFFF', // Marker color
      strokeWidth: 2, // Border width of the markers
      strokeColors: '#1452A4'
    },
    dataLabels: {
      enabled: false
    },
    colors: ['rgba(20, 82, 164, 1)'],
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'center' // Center-align the data labels
        }
      }
    },
    tooltip: {
      theme: 'dark',
      x: { show: false }
    }
  },
  series: []
};
