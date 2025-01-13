import { FC, ReactNode } from 'react';

// project imports
import NavMotion from './NavMotion';

import GuestGuard from 'utils/route-guard/GuestGuard';

interface Props {
  children: ReactNode;
}

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout: FC<Props> = ({ children }) => (
  <NavMotion>
    <GuestGuard>
      <>{children}</>
    </GuestGuard>
  </NavMotion>
);

export default MinimalLayout;
