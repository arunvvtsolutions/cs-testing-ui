import { ICourseProps } from './CutoffFilterDesktop';

import ICheckboxItem from 'types/college';

interface IFilterProps {
  id: number;
  type: string;
}

class CourseInfo {
  private caste: IFilterProps[];
  private gender: IFilterProps[];
  private quota: IFilterProps[];

  constructor(data: ICourseProps) {
    this.caste = data.caste;
    this.gender = data.gender;
    this.quota = data.quota;
  }

  public getCasteData(): ICheckboxItem[] {
    const casteData: ICheckboxItem[] = [];

    this.caste.forEach((caste) => {
      const data = {
        id: caste.id.toString(),
        label: caste.type,
        checked: false,
        depended: ''
      };
      casteData.push(data);
    });
    return casteData;
  }
  public getGenderData(): ICheckboxItem[] {
    const genderData: ICheckboxItem[] = [];

    this.gender.forEach((gender) => {
      const data = {
        id: gender.id.toString(),
        label: gender.type,
        checked: false,
        depended: ''
      };
      genderData.push(data);
    });
    return genderData;
  }
  public getQuotaData(): ICheckboxItem[] {
    const quotaData: ICheckboxItem[] = [];

    this.quota.forEach((quota) => {
      const data = {
        id: quota.id.toString(),
        label: quota.type,
        checked: false,
        depended: ''
      };
      quotaData.push(data);
    });
    return quotaData;
  }
}

export default CourseInfo;
