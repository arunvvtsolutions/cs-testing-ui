import { CSSProperties } from 'react';
import Script from 'next/script';


// global styles
import '../styles/globals.css';
import Link from 'next/link';
import DummyLayout from './dummyLayout';

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
        <Script
          id="googleTag"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NSKKPP2');
          `
          }}
          strategy="worker"
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NSKKPP2"
            height="0"
            width="0"
            style={GoogleTagStyles}
          ></iframe>
        </noscript>
        <Link href="https://www.w3schools.com/js/" target="_blank" rel="noopener noreferrer">
          Click w3
        </Link>
        <DummyLayout>{children}</DummyLayout>
      </body>
    </html>
  );
}
