'use client';
import { FC, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import useAuth from 'hooks/useAuth';

interface Props {
  children: ReactNode;
}

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout: FC<Props> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const pathName = usePathname();
  const route = useRouter();

  useEffect(() => {
    isLoggedIn && route.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, pathName]);
  return <>{children}</>;
};

export default MinimalLayout;
