/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/next-script-for-ga */
// eslint-disable-next-line @next/next/no-document-import-in-page
import { Html, Head, Main, NextScript } from 'next/document';
import { CSSProperties } from 'react';

const GoogleTagStyles: CSSProperties = {
  display: 'none',
  visibility: 'hidden'
};
 
export default function Document() {
  return (
    <Html lang="en-us">
      <Head> 
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NSKKPP2');
            `,
          }}
        />
        <meta name="theme-color" content="#2296f3" />
        <meta name="title" content="Explore The Best Colleges, Universities & Institutes | College Suggest" />
        <meta
          name="description"
          content="Learn More About Education In India And Abroad By Viewing Information On Examinations, Colleges, Courses, And Certificates. Checkout In Our College Suggest Website"
        />
        <meta
          name="keywords"
          content="collgesuggest, Career counseling, admission guidance, entrance exam preparation, career advice, college selection, rank predictor, college predictor,  education, colleges,universities, institutes,career, engineering, mba, medical, mbbs,courses, fees, placements, cutoff, faculty, review ,technical education, higher education, education career experts, admissions,results, events,scholarships"
        />
        <meta name="viewport" content="width=device-width,user-scalable=no" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://collegesuggest.com/" />
        <meta property="og:site_name" content="https://collegesuggest.com/" />
        <meta property="article:publisher" content="https://collegesuggest.com/" />
        <meta property="og:title" content="College Suggest" />
        <meta property="og:image" content="https://collegesuggest.com/assets/images/cslogo.webp" />
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
        {/* <link rel="preconnect" href="https://rsms.me/"/> */}
        <link rel="stylesheet" href="/assets/fonts/inter.css" />

        {/* previous google font  hidden here */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        /> */}
      </Head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NSKKPP2"
            height="0"
            width="0"
            style={GoogleTagStyles}
          ></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
