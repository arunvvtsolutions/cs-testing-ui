import { CSSProperties } from 'react';
import Script from 'next/script';

import ClientLayout from './clientLayout';

// global styles
import '../styles/globals.css';
import Link from 'next/link';

const GoogleTagStyles: CSSProperties = {
  display: 'none',
  visibility: 'hidden'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-us">
      <head>
        <meta name="theme-color" content="#2296f3" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta property="og:locale" content="en_US" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://collegesuggest.com" />
        <meta
          property="twitter:title"
          content="Explore The Best Colleges, Universities & Institutes | College Suggest"
        />
        <meta
          property="twitter:description"
          content="Learn More About Education In India And Abroad By Viewing Information On Examinations, Colleges, Courses, And Certificates. Checkout In Our College Suggest Website"
        />
        <meta property="twitter:image" content="https://collegesuggest.com/assets/images/cslogo.webp" />
        <meta name="twitter:creator" content="CollegeSuggest" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
       
      </head>
      <body>
       
        {/* <ClientLayout>{children}</ClientLayout> */}
        <h1>Hello</h1>
        <Link target="blank" href="https://www.w3schools.com/">Click here</Link>
      </body>
    </html>
  );
}
