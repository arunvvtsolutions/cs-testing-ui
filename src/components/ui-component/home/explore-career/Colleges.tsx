import { TopColleges, TopCourse, TopCities } from '../../../../constants';

import { ENGINEERING_BASE_URL, MEDICAL_BASE_URL } from 'config';
import { GenericProp } from 'types';

export const listname: GenericProp[] = [
  {
    id: 1,
    name: TopColleges.TOP_ENGINEERIG_COLLEGES,
    links: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-india`
  },
  {
    id: 2,
    name: TopColleges.TOP_MEDICAL_COLLEGES,
    links: `${MEDICAL_BASE_URL}/top/medical/colleges-in-india`
  },
  {
    id: 3,
    name: TopColleges.TOP_DENTAL_COLLGE,
    links: `${MEDICAL_BASE_URL}/top/dental/colleges-in-india`
  },
  {
    id: 4,
    name: TopColleges.TOP_ARCHITECTURE_COLLEGE,
    links: `${ENGINEERING_BASE_URL}/top/architecture/colleges-in-india`
  },
  {
    id: 5,
    name: TopColleges.TOP_PHARMACY_COLLEGE,
    links: `${MEDICAL_BASE_URL}/top/pharmacy/colleges-in-india`
  },
  {
    id: 6,
    name: TopColleges.TOP_IIT_COLLEGE,
    links: `${ENGINEERING_BASE_URL}/top/iit/colleges-in-india`
  },
  {
    id: 7,
    name: TopColleges.TOP_NIT_COLLEGE,
    links: `${ENGINEERING_BASE_URL}/top/nit/colleges-in-india`
  },
  {
    id: 8,
    name: TopColleges.TOP_GOVERNMENT_ENGINEERING_COLLEGE,
    links: `${ENGINEERING_BASE_URL}/top/government/colleges-in-india`
  },
  {
    id: 9,
    name: TopColleges.TOP_PRIVATE_ENGINEERING_COLLEGE,
    links: `${ENGINEERING_BASE_URL}/top/private/colleges-in-india`
  },
  {
    id: 10,
    name: TopColleges.TOP_GOVERNMENT_MEDICAL_COLLEGE,
    links: `${MEDICAL_BASE_URL}/top/government/colleges-in-india`
  },
  {
    id: 11,
    name: TopColleges.TOP_PRIVATE_MEDICAL_COLLEGES,
    links: `${MEDICAL_BASE_URL}/top/private/colleges-in-india`
  },
  {
    id: 12,
    name: TopColleges.TOP_GOVERNMENT_DENTAL_COLLEGES,
    links: `${MEDICAL_BASE_URL}/top/government/dental/colleges-in-india`
  },
  {
    id: 13,
    name: TopColleges.TOP_PRIVATE_DENTAL_COLLEGES,
    links: `${MEDICAL_BASE_URL}/top/private/dental/colleges-in-india`
  },
  {
    id: 14,
    name: TopColleges.TOP_GOVERNMENT_ARCHITECTURE_COLLEGES,
    links: `${ENGINEERING_BASE_URL}/top/government/architecture/colleges-in-india`
  },
  {
    id: 15,
    name: TopColleges.TOP_PRIVATE_ARCHITECTURE_COLLEGES,
    links: `${ENGINEERING_BASE_URL}/top/private/architecture/colleges-in-india`
  }
];

export const coursesList: GenericProp[] = [
  {
    id: 1,
    name: TopCourse.CSE,
    links: `${ENGINEERING_BASE_URL}/course/top/computer-science-and-engineering/colleges-in-india`
  },
  {
    id: 2,
    name: TopCourse.ECE,
    links: `${ENGINEERING_BASE_URL}/course/top/electronics-and-communication-engineering/colleges-in-india`
  },
  {
    id: 3,
    name: TopCourse.IT,
    links: `${ENGINEERING_BASE_URL}/course/top/information-technology/colleges-in-india`
  },
  {
    id: 4,
    name: TopCourse.MECHANICAL,
    links: `${ENGINEERING_BASE_URL}/course/top/mechanical-engineering/colleges-in-india`
  },
  {
    id: 5,
    name: TopCourse.MECHATRONICS,
    links: `${ENGINEERING_BASE_URL}/course/top/mechatronics-engineering/colleges-in-india`
  },
  {
    id: 6,
    name: TopCourse.CIVIL,
    links: `${ENGINEERING_BASE_URL}/course/top/civil-engineering/colleges-in-india`
  },
  {
    id: 7,
    name: TopCourse.AERONATICAL,
    links: `${ENGINEERING_BASE_URL}/course/top/aeronautical-engineering/colleges-in-india`
  },

  {
    id: 8,
    name: TopCourse.AEROSPACE,
    links: `${ENGINEERING_BASE_URL}/course/top/aerospace-engineering/colleges-in-india`
  },
  {
    id: 9,
    name: TopCourse.ARCHITECTURE,
    links: `${ENGINEERING_BASE_URL}/course/top/bachelor-of-architecture/architecture/colleges-in-india`
  },
  {
    id: 10,
    name: TopCourse.AI_ML,
    links: `${ENGINEERING_BASE_URL}/course/top/artificial-intelligence-and-machine-learning/colleges-in-india`
  },
  {
    id: 11,
    name: TopCourse.MBBS,
    links: `${MEDICAL_BASE_URL}/course/top/mbbs/colleges-in-india`
  },
  {
    id: 12,
    name: TopCourse.PHARMA,
    links: `${MEDICAL_BASE_URL}/course/top/bachelor-of-pharmacy/pharmacy/colleges-in-india`
  }
];

export const PlacesList: GenericProp[] = [
  {
    id: 1,
    name: TopCities.CHENNAI,
    links: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-chennai`
  },
  {
    id: 2,
    name: TopCities.BANGLORE,
    links: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-bengaluru`
  },
  {
    id: 3,
    name: TopCities.DELHI,
    links: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-delhi`
  },
  {
    id: 4,
    name: TopCities.MUMBAI,
    links: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-mumbai`
  },
  {
    id: 5,
    name: TopCities.PUNE,
    links: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-pune`
  },
  {
    id: 6,
    name: TopCities.COIMBATURE,
    links: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-coimbatore`
  },

  {
    id: 7,
    name: TopCities.HYDERABAD,
    links: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-hyderabad`
  },
  {
    id: 8,
    name: TopCities.CALCUTTA,
    links: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-kolkata`
  },
  {
    id: 9,
    name: TopCities.TAMILNADU,
    links: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-tamil-nadu`
  },

  {
    id: 10,
    name: TopCities.KERALA,
    links: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-kerala`
  },
  {
    id: 11,
    name: TopCities.MAHARASTRA,
    links: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-maharashtra`
  },
  {
    id: 12,
    name: TopCities.TELANGANA,
    links: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-telangana`
  }
];
