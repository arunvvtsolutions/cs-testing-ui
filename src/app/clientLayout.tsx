"use client";

import { ReactNode } from "react";
// third-party

import Link from "next/link";

const MyApp = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <h1>Hello</h1>
      <Link target="blank" href="https://www.w3schools.com/">
        Click here
      </Link>
    </>
  );
};

export default MyApp;
