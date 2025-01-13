// project import
import MainLayout from './MainLayout';
import MinimalLayout from './MinimalLayout';

import LAYOUT, { Props } from 'constant';
import { useSelector } from 'store';
import AuthGuard from 'utils/route-guard/AuthGuard';
import GuestGuard from 'utils/route-guard/GuestGuard';

// ==============================|| LAYOUTS - STRUCTURE ||============================== //

export default function Layout({ variant = LAYOUT.main, children }: Props) {
  const { activeLayout } = useSelector((stata) => stata.menu);
  switch (activeLayout) {
    case LAYOUT.minimal:
      return <MinimalLayout>{children}</MinimalLayout>;

    case LAYOUT.noauth:
      return (
        <GuestGuard>
          <MinimalLayout>{children}</MinimalLayout>
        </GuestGuard>
      );

    default:
      return (
        <AuthGuard>
          <MainLayout>{children}</MainLayout>
        </AuthGuard>
      );
  }
}
