/* eslint-disable @typescript-eslint/no-explicit-any */
import capitalize from 'lodash/capitalize';
import orderBy from 'lodash/orderBy';

import { ICollegeDataProps } from './predictor-college-list';
import { filterKey } from './constant';

import ICheckboxItem from 'types/college';

class PredictorInfo {
  private collegeData: ICollegeDataProps[];
  constructor(data: ICollegeDataProps[]) {
    this.collegeData = data;
  }

  updateFilterData(data: ICollegeDataProps[]) {
    this.collegeData = data;
  }
  getFilterData(key: string) {
    const idSet = new Set();
    let items: ICheckboxItem[] = [];
    switch (key) {
      case filterKey.COLLEGE_TYPE:
        items = this.collegeData
          .map((clgData) => {
            const id = clgData.collegeType?.replaceAll(' ', '-').toLowerCase();

            if (idSet.has(id) && clgData.collegeType) return null;
            idSet.add(id);
            return {
              id: id,
              label: capitalize(clgData.collegeType?.replaceAll('-', ' ')),
              checked: false
            };
          })
          .filter((data): data is ICheckboxItem => data !== null);
        return orderBy(items, 'label');
      case filterKey.HOSPITAL_TYPE:
        items = this.collegeData
          .map((clgData) => {
            const id = clgData.hospitalType?.replaceAll(' ', '-').toLowerCase();

            if (idSet.has(id) && clgData.hospitalType) return null;
            idSet.add(id);
            return {
              id: id,
              label: capitalize(clgData.hospitalType?.replaceAll('-', ' ')),
              checked: false
            };
          })
          .filter((data): data is ICheckboxItem => data !== null);
        return orderBy(items, 'label');
      case filterKey.STATE:
        items = this.collegeData
          .map((clgData) => {
            const id = clgData.state?.replaceAll(' ', '-').toLowerCase();

            if (idSet.has(id)) return null;
            idSet.add(id);
            return {
              id: id,
              label: capitalize(clgData.state?.replaceAll('-', ' ')),
              checked: false
            };
          })
          .filter((data): data is ICheckboxItem => data !== null);
        return orderBy(items, 'label');
      default:
        return items;
    }
  }
}

export default PredictorInfo;
