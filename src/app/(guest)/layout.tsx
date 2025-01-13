// PROJECT IMPORTS
import MainLayout from 'layout/MainLayout';

// ================================|| SIMPLE LAYOUT ||================================ //

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
