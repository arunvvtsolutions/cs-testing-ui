/* eslint-disable import/order */
'use client';

import { useRouter } from 'next/navigation';

// project imports
import { useEffect } from 'react';

import useAuth from 'hooks/useAuth';
import Loader from 'components/ui-component/Loader';

// types
import { GuardProps } from 'types';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/sign-in');
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Loader />;

  return children;
};

export default AuthGuard;
