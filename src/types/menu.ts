// project import
import { NavItemType } from 'types';

// ==============================|| MENU TYPES ||============================== //

export type MenuProps = {
  selectedItem: string[];
  selectedID: string | null;
  drawerOpen: boolean;
  error: null;
  menu: NavItemType;
  visualizationDrawer: boolean;
  chatDrawer: boolean;
  activeLayout: string;
  lastVisitedRoute: string;
  filterDrawer: boolean;
};

export type CourseFeesProps = {
  selectedCourseId: string | null;
  error: boolean;
};

export type signInProps = {
  userMobileNo: string;
  error: null;
};

// Formik hook
export interface INeetPredictorFormData {
  neetRank: number;
  state: number;
  seatType: number;
  provisional: number;
  collegeRegion: number;
  indiaCategory: string;
  stateCategory: string;
  speciallyAbled: number;
  minority: string;
  specialQuota: string;
  gender: number;
  subCaste: number;
  belongArea: string;
  geoArea: string;
  rankType: string;
  stateName?: string;
}
export interface INeetFormProps {
  error: null;
  neetPredictorFormData: INeetPredictorFormData;
}
