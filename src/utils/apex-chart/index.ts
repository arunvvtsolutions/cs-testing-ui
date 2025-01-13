/* eslint-disable @typescript-eslint/no-explicit-any */
export const toolTip = ({ seriesIndex, dataPointIndex, w }: any) => {
  const seriesData = w.config.series[seriesIndex];
  const value = seriesData.data[dataPointIndex];
  const valueName = w.config.series[seriesIndex].name;
  const xValue = w.config.xaxis.categories[dataPointIndex];
  return `
        <div class="medical-tooltip" style="padding:5px 6px;">
          <p style="font-size: 10px;font-weight: 400;padding-left : 5px">${xValue}</p>
          <div style="display: flex; justify-content: space-between;">
            <p style="font-size: 10px;font-weight: 400;padding :0 5px;">${valueName}</p>
            <p style="font-size: 12px;font-weight: 500;padding :0 4px;">${value}</p>
          </div>
        </div>
          `;
};
