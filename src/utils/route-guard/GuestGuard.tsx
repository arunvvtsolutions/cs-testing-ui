'use client';

// project imports
// import useAuth from 'hooks/useAuth';
import { GuardProps } from 'types';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: GuardProps) => {
  // if (isLoggedIn) return <Loader />;

  return children;
};

export default GuestGuard;
