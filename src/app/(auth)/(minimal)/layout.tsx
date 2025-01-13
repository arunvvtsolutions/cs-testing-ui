// PROJECT IMPORTS
'use client';
import AuthGuard from 'utils/route-guard/AuthGuard';

// ================================|| SIMPLE LAYOUT ||================================ //

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <>{children}</>
    </AuthGuard>
  );
}
