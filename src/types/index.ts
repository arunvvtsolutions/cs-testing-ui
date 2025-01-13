/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}
// material-ui
import { SvgIconTypeMap, ChipProps, TableCellProps } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
// project imports
import { Icon as TablerIcon } from '@tabler/icons-react';

import { UserStateProps } from './user';
import { SnackbarProps } from './snackbar';
import { ICollegeData } from './college';

import { IBannerProps } from 'ui-component/college-overview-page/banner';
import { IPlacementsProps } from 'ui-component/college-overview-page/placements-and-salary';
import { IOtherCollegeProps } from 'ui-component/college-overview-page/overview-sidebar';
import { IExamsAndCutoffsProps } from 'ui-component/college-overview-page/exams-and-cutoffs';
import { IGalleryImageProps } from 'ui-component/college-overview-page/gallery';
import { ICollegeReviewsDataProps } from 'ui-component/college-overview-page/students-reviews';
import { IReviewDataProps } from 'ui-component/college-overview-page/review-percentage';
import { IFAQsProps } from 'ui-component/college-overview-page/overview-faq/FAQItem';
import { IBlogProps } from 'ui-component/college-overview-page/blogs/Blogs';
import { IAdmissionProps } from 'ui-component/college-overview-page/admission/Admission';
import { IOverviewProps } from 'ui-component/college-overview-page/overview-section/OverviewContent';
import { IFacilitiesProps } from 'ui-component/college-overview-page/placement-facility/Facility';
import { UserProfile } from 'types/user-profile';
import { IHighlightsProps } from 'ui-component/college-overview-page/highlights';
import { ICollegeFeesProps } from 'ui-component/college-overview-page/course-fees';
import { ISubMenuProps } from 'ui-component/subheader';
import { ICampusProps } from 'ui-component/college-amenities-page/campus-overview';
import { IFacilityProps } from 'ui-component/college-amenities-page/facilities-list';
import { IDescDataProps } from 'ui-component/college-amenities-page/amenities-description';
import { IContentProps as IContentPropsCourseFees } from 'ui-component/course-fees-page/overview-content/ContentSection';
import { ICourseProps } from 'ui-component/course-fees-page/course-fees-filter';
import { ICourseListProps } from 'ui-component/course-fees-page/course-list';
import { IContactProps } from 'ui-component/college-contact-page/contact-details';
import { INearByProps } from 'ui-component/college-contact-page/nearby-section';
import { IMapProps } from 'ui-component/college-contact-page/map-section';
import { IContentProps } from 'ui-component/college-admission-eligibility/overview-section/ContentSection';
import { ICutOffFormProps } from 'ui-component/college-cutoff-page/cutoff-form';
import { IFacultyDataProps } from 'ui-component/college-faculty-page/faculty-details';
import { IProfessorProps } from 'ui-component/college-faculty-page/professors-list';
import { IOtherCourseListProps } from 'ui-component/course-fees-inner-page/courses-sidebar';
import { ICourseOverviewDetailsProps } from 'ui-component/course-fees-inner-page/overview/course-details';
import { ISeatDataProps } from 'ui-component/medical/course-fees-inner-page/overview/cutoff-seatallocation';
import { IClosingRankDataProps } from 'ui-component/medical/course-fees-inner-page/overview/cutoff-clossingRank';
import { IIntakeProps } from 'ui-component/medical/course-fees-inner-page/overview/course-intake';
import { IQuestionProps } from 'ui-component/college-question-page/question-replay-accordion';
import { ICollegeImageProps } from 'ui-component/college-pictures-page/gallery-section';
import { ICategoriesProps } from 'ui-component/college-student-strength-page/students-categorywise-section';
import { IApprovedIntakeProps } from 'ui-component/college-student-strength-page/approved-intake';
import { StrengthDataProps } from 'ui-component/college-student-strength-page/total-students-section';
import { IDiversityDataProps } from 'ui-component/college-student-strength-page/diversity-inclusion';
import { ICutoffResultsProps } from 'ui-component/college-cutoff-page/cutoff-results';
import { IFilterProps } from 'ui-component/course-fees-inner-page/cutoff/filter/CutoffFilterDesktop';
import { ICourseDetailsProps } from 'ui-component/course-fees-inner-page/fees-structure/course-details';
import { ICompaniesProps } from 'ui-component/college-placements-page/top-recruiters/RecruiterItem';
import { IGraduartionContentProps } from 'ui-component/college-placements-page/graduation-graph';
import { IPercentContentProps } from 'ui-component/college-placements-page/percentage-year-graph';
import { ISalaryContentProps } from 'ui-component/college-placements-page/median-salary-section';
import { IYoutubeProps } from 'ui-component/college-placements-page/youtube-shorts';
import { IIqBannerProps } from 'ui-component/free-tool/college-iq/banner';
import { ICompareNameProps } from 'ui-component/free-tool/college-compare-tool';
import { IcompareToolProps } from 'ui-component/free-tool/college-compare-tool';
import { IRelatedComparedprops } from 'ui-component/college-compare/compared-colleges';
import { ICompareDataProps } from 'ui-component/college-compare/compare-header';
import { ICollegeProps } from 'ui-component/college-affiliated-page/college-list';
import { IResultInfoProps } from 'ui-component/free-tool/kyc-medical/result-page-information';
import { IClosingCutoffRankData } from 'ui-component/free-tool/kyc-medical/cutoff-closing-rank';
import { IAllotedSeatProps } from 'ui-component/free-tool/kyc-medical/alloted-seat-matrix';
import { IAdmittedSeatProps } from 'ui-component/free-tool/kyc-medical/admitted-seat-matrix';
import { IAllocationBarProps } from 'ui-component/free-tool/kyc-medical/seats-allocation-bar-chart';
import { IAllottedAdmitBarProps } from 'ui-component/free-tool/kyc-medical/allotted-admitted-bar-chart';

export type ArrangementOrder = 'asc' | 'desc' | undefined;

export type DateRange = { start: number | Date; end: number | Date };

export type GetComparator = (o: ArrangementOrder, o1: string) => (a: KeyedObject, b: KeyedObject) => number;

export type Direction = 'up' | 'down' | 'right' | 'left';

export interface TabsProps {
  children?: React.ReactElement | React.ReactNode | string;
  value: string | number;
  index: number;
}

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}

export type OverrideIcon =
  | (OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
      muiName: string;
    })
  | React.ComponentClass<unknown>
  | FunctionComponent<unknown>
  | TablerIcon;

export interface EnhancedTableHeadProps extends TableCellProps {
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  order: ArrangementOrder;
  orderBy?: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (e: React.SyntheticEvent, p: string) => void;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export type HeadCell = {
  id: string;
  numeric: boolean;
  label: string;
  disablePadding?: string | boolean | undefined;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
};

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type NavItemTypeObject = {
  children?: NavItemType[];
  items?: NavItemType[];
  type?: string;
};

export type NavItemType = {
  id?: string;
  icon?: GenericCardProps['iconPrimary'];
  target?: boolean;
  external?: boolean;
  url?: string | undefined;
  redirectUrl?: string | undefined;
  type?: string;
  title?: ReactNode | string;
  color?: 'primary' | 'secondary' | 'default' | undefined;
  caption?: ReactNode | string;
  breadcrumbs?: boolean;
  disabled?: boolean;
  chip?: ChipProps;
  children?: NavItemType[];
  elements?: NavItemType[];
  search?: string;
};

export type AuthSliderProps = {
  title: string;
  description: string;
};

export interface ColorPaletteProps {
  color: string;
  label: string;
  value: string;
}

export interface DefaultRootStateProps {
  snackbar: SnackbarProps;
  user: UserStateProps;
}

export interface ColorProps {
  readonly [key: string]: string;
}

export type GuardProps = {
  children: ReactElement | null;
};

export interface StringColorProps {
  id?: string;
  label?: string;
  color?: string;
  primary?: string;
  secondary?: string;
}

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
}

export interface FormInputProps {
  bug: KeyedObject;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | undefined;
  label: string;
  name: string;
  required?: boolean;
  InputProps?: {
    label: string;
    startAdornment?: React.ReactNode;
  };
}

export type JwtTokenProps = {
  id: string;
  username: string;
  stream: string;
};

export type HandleFunction = (i: string, s: string) => Promise<void>;

export type LayoutType = 'authGuard' | 'guestGuard' | 'minimalLayout';
/** ---- Common Functions types ---- */

export type StringBoolFunc = (s: string) => boolean;
export type StringNumFunc = (s: string) => number;
export type NumbColorFunc = (n: number) => StringColorProps | undefined;
export type ChangeEventFunc = (e: React.ChangeEvent<HTMLInputElement>) => void;

export interface GenericProp {
  id: number;
  name: string;
  links: string;
}

export interface IErrorProps {
  hasError?: boolean;
}

export interface IMetaData {
  title: string;
  description: string;
  keywords: string;
}

// drop down props
export interface IDropDownDataProps {
  id: number;
  label: string;
  dependId?: number;
}

export interface IMetaProps extends IErrorProps {
  meta: IMetaData;
}

export enum Stream {
  ENGINEERING = 'engineering',
  MEDICAL = 'medical'
}
type StreamCodeProps = {
  [key: string]: string;
};
export const streamCode: StreamCodeProps = {
  '1': 'engineering',
  '2': 'medical',
  '3': 'dental',
  '4': 'architecture',
  '5': 'pharmacy'
};

export enum SubStream {
  PHARMACY = 'pharmacy',
  DENTAL = 'dental',
  ARCHITECTURE = 'architecture'
}

export enum Category {
  GOVERNMENT = 'government',
  IIT = 'iit',
  IIIT = 'iiit',
  NIT = 'nit',
  PRIVATE = 'private',
  GFTI = 'gfti'
}

export enum Submenu {
  OVERVIEW = '1',
  COURSEANDFEES = '2',
  ADMISSION = '3',
  PLACEMENT = '4',
  AMENITIES = '5',
  CUTOFF = '6',
  FACULTY = '7',
  STUDENTSTRENGTH = '8',
  REVIEWS = '9',
  PICTURES = '10',
  FAQ = '11',
  CONTACT = '12',
  AFFILIATEDCOLLEGES = '13'
}

export interface ITopcolleges {
  hasError: boolean;
  topColleges: ICollegeData;
}

export interface IOverviewPageProps {
  faqData: IFAQsProps;
  bannerData: IBannerProps;
  blogData: IBlogProps;
  overviewData: IOverviewProps;
  highlightData: IHighlightsProps;
  placementData: IPlacementsProps;
  admissionData: IAdmissionProps;
  otherCollegeData: IOtherCollegeProps;
  collegeReviews: ICollegeReviewsDataProps;
  examData: IExamsAndCutoffsProps;
  galleryImages: IGalleryImageProps;
  facilitiesData: IFacilitiesProps;
  courseFeesData: ICollegeFeesProps;
  reviewData: IReviewDataProps;
  subMenu: ISubMenuProps;
}

export interface IAmenitiesPageProps {
  faqData: IFAQsProps;
  bannerData: IBannerProps;
  campusData: ICampusProps;
  facilitiesData: IFacilityProps;
  descData: IDescDataProps;
  otherCollegeData: IOtherCollegeProps;
  subMenu: ISubMenuProps;
}
export interface ICollegeIqPageProps {
  collegeData: IIqBannerProps;
}
export interface ICutOffInnerPageProps {
  subMenu: ISubMenuProps;
  bannerData: IBannerProps;
  cutoffResultsData: ICutoffResultsProps;
  filteredData: IFilterProps;
}
export interface IAdmissionEligibilityProps {
  faqData: IFAQsProps;
  bannerData: IBannerProps;
  otherCollegeData: IOtherCollegeProps;
  contentData: IContentProps;
  admissionData: IAdmissionProps;
  subMenu: ISubMenuProps;
}
export interface IFacultyPageProps {
  bannerData: IBannerProps;
  facultyData: IFacultyDataProps;
  listData: IProfessorProps;
  faqData: IFAQsProps;
  otherCollegeData: IOtherCollegeProps;
  subMenu: ISubMenuProps;
}
export interface ICourseFeesPageProps {
  faqData: IFAQsProps;
  bannerData: IBannerProps;
  contentData: IContentPropsCourseFees;
  courseFilterData: ICourseProps;
  courseListData: ICourseListProps;
  subMenu: ISubMenuProps;
}
export interface ICutOffPageProps {
  faqData: IFAQsProps;
  bannerData: IBannerProps;
  otherCollegeData: IOtherCollegeProps;
  examData: IExamsAndCutoffsProps;
  contentData: IContentProps;
  cutoffFormData: ICutOffFormProps;
  subMenu: ISubMenuProps;
}
export interface IContactusPageProps {
  bannerData: IBannerProps;
  contactData: IContactProps;
  nearByData: INearByProps;
  mapData: IMapProps;
  subMenu: ISubMenuProps;
}

export interface ICourseFeesOverview {
  subMenu: ISubMenuProps;
  bannerData: IBannerProps;
  otherCourseData: IOtherCourseListProps;
  courseDetailsData: ICourseOverviewDetailsProps;
  seatAllocationData: ISeatDataProps;
  closingRankData: IClosingRankDataProps;
  courseIntake: IIntakeProps;
  courseAllotedSeatMat: IAllotedSeatProps;
  courseAdmittedSeat: IAllottedAdmitBarProps;
  courseAdmittedSeatMat: IAdmittedSeatProps;
}

export interface IQuestionPageProps {
  bannerData: IBannerProps;
  otherCollegeData: IOtherCollegeProps;
  // replayData: IQuestionProps;
  profileData: IQuestionProps;
  subMenu: ISubMenuProps;
}

export interface ICourseFeeQnAProps {
  subMenu: ISubMenuProps;
  bannerData: IBannerProps;
  otherCourseData: IOtherCourseListProps;
  // replayData: IQuestionProps;
  profileData: IQuestionProps;
}

export interface IPicturesPageProps {
  bannerData: IBannerProps;
  otherCollegeData: IOtherCollegeProps;
  collegeImagesData: ICollegeImageProps;
  subMenu: ISubMenuProps;
}

export interface IPlacementPageProps {
  faqData: IFAQsProps;
  bannerData: IBannerProps;
  otherCollegeData: IOtherCollegeProps;
  contentData: IContentProps;
  topCompaniesData: ICompaniesProps;
  graduationData: IGraduartionContentProps;
  percentData: IPercentContentProps;
  salaryData: ISalaryContentProps;
  youtubeData: IYoutubeProps;
  subMenu: ISubMenuProps;
}

export interface IAffiliatedCollegeProps {
  collegeData: ICollegeProps;
  bannerData: IBannerProps;
  subMenu: ISubMenuProps;
}

interface IStreamCodeProsp {
  [key: string]: number;
}

export const StreamCode: IStreamCodeProsp = {
  engineering: 1,
  architecture: 4,
  medical: 2,
  dental: 3,
  pharmacy: 5
};

export interface IInnerPageParams {
  ins: string;
  name: string;
  courseName: string;
  [key: string]: string;
}

export interface IStudentStrengthProps {
  contentData: IContentProps;
  faqData: IFAQsProps;
  categoryData: ICategoriesProps;
  approvedIntakeData: IApprovedIntakeProps;
  strengthData: StrengthDataProps;
  diversityData: IDiversityDataProps;
  bannerData: IBannerProps;
  otherCollegeData: IOtherCollegeProps;
  subMenu: ISubMenuProps;
}

export interface IinnerFeeStructureProps {
  bannerData: IBannerProps;
  courseInfoData: ICourseDetailsProps;
  otherCourseList: IOtherCourseListProps;
  subMenu: ISubMenuProps;
}

export interface IPageParamsProps {
  ins: string;
  name: string;
}
export interface IReviewPageProps {
  faqData: IFAQsProps;
  bannerData: IBannerProps;
  reviewData: IReviewDataProps;
  otherCollegeData: IOtherCollegeProps;
  collegeReviews: ICollegeReviewsDataProps;
  subMenu: ISubMenuProps;
}

export interface IBookmarkDataProps {
  collegeId: number;
  collegeName: string;
  collegeImg: string;
  estdYear: number;
  campusArea: string;
  location: string;
  collegeType: string;
  stream: string;
  insType: string;
}

export interface ICollegeCompareProps {
  compareInfo: ICollegeCompareProps;
  collegeCompareHead: ICompareDataProps;
  relatedComparedData: IRelatedComparedprops;
}

export interface IFreeAiToolProps {
  comparedToolData: IcompareToolProps;
}
export interface IFreeAiToolProps {
  comparedToolData: IcompareToolProps;
}

export interface IPostHistoryType {
  userId: number;
  collegeIds: string[];
}
export interface IStudentProfileProps {
  studentId: string | number | undefined;
  fullName: string;
  lastName: string;
  emailId: string;
  mobile: string;
  gender: string;
  dob: string;
  postCode: string;
  city: string;
  area: string;
  stream: string;
}
export interface IShortListedPostProps {
  studentId: string;
  shortUrl: string;
  stream: string;
}
export interface ICollegeCompareListPageProps {
  [x: string]: any;
  collegeData: ICompareNameProps;
}

export interface IMedCollegeProps {
  collegeInfo: IResultInfoProps;
  closingRankData: IClosingCutoffRankData;
  allotedSeatData: IAllotedSeatProps;
  admittedSeatData: IAdmittedSeatProps;
  seatAllocationData: IAllocationBarProps;
  seatAdmittedData: IAllottedAdmitBarProps;
}
export interface IPredictorCollegeProps {
  collegeInfo: IResultInfoProps;
  closingRankData: IClosingCutoffRankData;
  allotedSeatData: IAllotedSeatProps;
  admittedSeatData: IAdmittedSeatProps;
  seatAllocationData: IAllocationBarProps;
  seatAdmittedData: IAllottedAdmitBarProps;
  stateClosingRankData: IClosingCutoffRankData;
}
