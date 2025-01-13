/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';

export const LAYOUT_CONST = {
  VERTICAL_LAYOUT: 'vertical',
  HORIZONTAL_LAYOUT: 'horizontal',
  DEFAULT_DRAWER: 'default',
  MINI_DRAWER: 'mini-drawer'
};

export const LAYOUT: any = {
  main: 'main',
  noauth: 'noauth',
  minimal: 'minimal'
};
export interface Props {
  children: ReactElement;
  variant?: 'main' | 'minimal' | 'noauth';
}

export const USERMENUDATA = [
  { menuName: 'Dashboard', link: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard` || '' },
  { menuName: 'Logout', link: '/' }
];

export const AUTHCONST = {
  LOGOUT: 'logout'
};

export const AUTHOURIZEDROUTE = ['/profile'];

export default LAYOUT;
