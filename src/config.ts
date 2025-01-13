import { LAYOUT_CONST } from 'constant';
// types
import { ConfigProps } from 'types/config';

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
export const BASE_PATH = '';

export const DASHBOARD_PATH = '/';
export const HORIZONTAL_MAX_ITEM = 6;

const config: ConfigProps = {
  layout: LAYOUT_CONST.HORIZONTAL_LAYOUT, // vertical, horizontal
  drawerType: LAYOUT_CONST.DEFAULT_DRAWER,
  fontFamily: `'Inter', sans-serif`,
  borderRadius: 8,
  outlinedFilled: true,
  navType: 'light', // light, dark
  presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
  locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
  rtlLayout: false,
  container: false
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const ENGINEERING_BASE_URL = process.env.NEXT_PUBLIC_ENGINEERING_URL;
export const MEDICAL_BASE_URL = process.env.NEXT_PUBLIC_MEDICAL_URL;
// URL NAMES
export const BASE_URL_NAME = process.env.NEXT_PUBLIC_BASE_URL_NAME;
export const YOUTUBE_URL = process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_URL;
export const NEET_BASE_URL = process.env.NEXT_PUBLIC_NEET_BASE_URL;
export const JEE_BASE_URL = process.env.NEXT_PUBLIC_JEE_BASE_URL;

export const ACTIVE_PHONE_PE = process.env.NEXT_PUBLIC_ACTIVE_PHONEPE === 'true';
export default config;
