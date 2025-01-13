interface ICheckboxItem {
  id: string;
  label: string;
  checked: boolean;
  depended: string;
}

export interface IGeoLocation {
  state: string;
  cities: string[];
}
export interface ICourse {
  courseId: number;
  courseName: string;
  longUrl: string;
  shortUrl: string;
}

export interface ICollege {
  id: number;
  name: string;
  logo: string;
  collegeUrl: string;
  shortUrl: string;
  shortName: string;
  nirfRank: number;
  estdYear: number;
  type: string;
  ownership: string;
  category: string;
  state: string;
  city: string;
  course: string | number[];
  insType: string;
  subMenu: string;
}

export interface IPageData {
  title: string;
  url: string;
  description: string;
  keywords: string;
  contents: string;
  collegeTypeId: number;
}

export interface ICollegeData {
  collegeData: ICollege[];
  pageData: IPageData;
  courses: ICourse[];
}

export type SelelctedProps = {
  id: string;
  label: string;
  depended?: string;
};

export interface IFilterData {
  state: SelelctedProps[];
  ownership: SelelctedProps[];
  course: SelelctedProps[];
  city: SelelctedProps[];
  category: SelelctedProps[];
  caste?: SelelctedProps[];
  gender?: SelelctedProps[];
  quota?: SelelctedProps;
}

export interface ISelectedFilterPrpos {
  collegeType: SelelctedProps[];
  hospitalType: SelelctedProps[];
  state: SelelctedProps[];
  sortBy: SelelctedProps;
  orderBy: SelelctedProps;
  [key: string]: SelelctedProps[] | SelelctedProps;
}

export default ICheckboxItem;
