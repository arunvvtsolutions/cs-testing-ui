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
  typeId: number;
  type: string;
  ownershipId: number;
  ownership: string;
  categoryId: number;
  category: string;
  stateId: number;
  state: string;
  cityId: number;
  city: string;
  courses: number[];
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
