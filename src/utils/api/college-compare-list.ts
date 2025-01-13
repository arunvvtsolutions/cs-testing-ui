import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { Stream } from 'types';
import { ICompareNameProps, IcompareToolProps } from 'ui-component/free-tool/college-compare-tool';
// API to get collegeData
export const getCollegeCompareData = async (stream: string) => {
  let data: ICompareNameProps[] = [];
  try {
    const res = await fetch(`${API_BASE_URL}/${Api.collegeCompareList}/${stream}`);

    if (res.ok) {
      const response = await res.json();
      data = response;
    }
  } catch (error) {}
  return data;
};
// get college-iq page data
export const getCollegeCompareListData = async (): Promise<IcompareToolProps> => {
  const stream = Stream.ENGINEERING;
  const collegeDataResponse = await getCollegeCompareData(stream);
  const data: IcompareToolProps = {
    comparedToolData: collegeDataResponse
  };
  return data;
};
