/* eslint-disable @typescript-eslint/no-explicit-any */
import { Props } from 'react-apexcharts';

export const ChartDataProps: Props = {
  type: 'pie',
  options: {
    chart: {
      id: 'diversity-chart',
      type: 'pie',
      background: '#FFF' // Set the background color to white
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        startAngle: 0,
        donut: {
          size: '75%'
        }
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      fontFamily: 'inherit',
      fontSize: '12px',
      fontWeight: 400,
      labels: {
        colors: '#000'
      }
    },
    labels: [],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontFamily: 'inherit',
        fontWeight: '500'
      },
      dropShadow: {
        enabled: false
      }
    },
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    stroke: {
      show: false,
      curve: 'smooth'
    },
    colors: ['#03164A', '#05205A', '#082E70', '#0C3E86', '#11519C', '#4083C3', '#68ABE1', '#9DD2F5', '#CDEAFA'], //hardcoded 10 colors
    tooltip: {
      theme: 'dark',
      custom: function ({ seriesIndex, dataPointIndex, w }: any) {
        // Get the data series and value
        const seriesValue = w.config.series[seriesIndex];
        const label = w.config.labels[seriesIndex];

        // Customize the tooltip content
        return `
        <div class="custom-tooltip" style="padding:5px 6px">
              <p style="color: #FFF;
                  font-family: inherit;
              font-size: 10px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;">${label}</p>
              <p style="
              color: #FFF;
                  font-family: inherit;
              font-size: 12px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              ">${seriesValue}</p>
            </div>
          `;
      }
    }
  },
  series: []
};
