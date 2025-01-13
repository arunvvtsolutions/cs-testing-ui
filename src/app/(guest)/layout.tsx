// PROJECT IMPORTS
import MainLayout from "layout/MainLayout";
import Link from "next/link";

// ================================|| SIMPLE LAYOUT ||================================ //

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <Link href="https://drive.google.com/file/d/1OWIecEF44ZdSYVmdqed2SSKAk0sLhUXX/view?pli=1" target="blank">
        Holiday click
      </Link>
      {children}
    </MainLayout>
  );
}
