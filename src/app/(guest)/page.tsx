import { Metadata } from 'next';

import HomeComponent from 'components/ui-component/home';
import { getSearchData } from 'utils/api/home';

// ==============================|| HOME PAGE ||============================== //
// either Static metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://collegesuggest.com'),
  title: 'Explore The Best Colleges, Universities & Institutes | College Suggest',
  description:
    'Learn More About Education In India And Abroad By Viewing Information On Examinations, Colleges, Courses, And Certificates. Checkout In Our College Suggest Website',
  keywords:
    'collgesuggest, Career counseling, admission guidance, entrance exam preparation, career advice, college selection, rank predictor, college predictor,  education, colleges,universities, institutes,career, engineering, mba, medical, mbbs,courses, fees, placements, cutoff, faculty, review ,technical education, higher education, education career experts, admissions,results, events,scholarships',
  openGraph: {
    title: 'Explore The Best Colleges, Universities & Institutes | College Suggest',
    description:
      'Learn More About Education In India And Abroad By Viewing Information On Examinations, Colleges, Courses, And Certificates. Checkout In Our College Suggest Website',
    url: 'https://collegesuggest.com/',
    type: 'website',
    siteName: 'College Suggest 123',
    images: [
      {
        url: 'https://collegesuggest.com/assets/images/cslogo.webp',
        width: 800,
        height: 600,
        alt: 'College Suggest'
      }
    ]
  }
};

const LandingPage = async () => {
  const searchResult = await getSearchData();

  const { searchData } = searchResult;
  return <HomeComponent searchData={searchData} />;
};
export default LandingPage;
