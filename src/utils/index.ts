/* eslint-disable @typescript-eslint/no-explicit-any */
import sortBy from 'lodash/sortBy';
import upperFirst from 'lodash/upperFirst';
import { ChangeEvent } from 'react';
import forge from 'node-forge';

import { BASE_URL_NAME } from 'config';
import { Category, Stream, SubStream } from 'types';
import { ICollege, IFilterData, ISelectedFilterPrpos } from 'types/college';
import { ICollegeDataProps } from 'ui-component/dashboard/predictors/neet-predictors/predictors-result/predictor-college-list';
// converting yaxis value with letter
export const converYaxis = (value: any) => {
  const updatedValue = parseInt(value);

  if (updatedValue && updatedValue.toString().length >= 6 && updatedValue.toString().length <= 7)
    return (value / 100000).toFixed(2) + 'L';
  else if (updatedValue && updatedValue.toString().length > 7) return (value / 10000000).toFixed() + 'C';
  else if (updatedValue && updatedValue.toString().length < 6 && updatedValue.toString().length > 3)
    return (value / 1000).toFixed(2) + 'K';
  else return value;
};

//format date
export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

//custom date format
export const convertISOToCustomFormat = (isoDate: string): string => {
  const inputDate = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  };
  const customDate = inputDate.toLocaleDateString('en-US', options);
  return customDate;
};

//cutom days format
export const formatISODateAsDaysAgo = (isoDate: string): string => {
  const inputDate = new Date(isoDate);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - inputDate.getTime();
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return `${daysAgo} Days Ago`;
};

// capital to lower
export const CapitalizedString = (input: string) => {
  return input
    .split(' ')
    .map((word) => upperFirst(word.toLowerCase()))
    .join(' ');
};

// listing page sorting
export const sortColleges = (sortKey: string, collegeData: ICollege[], setCollegeData: (data: ICollege[]) => void) => {
  let sortedData: ICollege[];
  if (sortKey === 'nirfRank') {
    sortedData = sortBy(collegeData, [sortKey]);
  } else {
    sortedData = sortBy(collegeData, (obj: any) => -parseInt(obj[sortKey], 10));
  }
  setCollegeData(sortedData);
};

// listing page side filter
export const filterColleges = (
  collegeData: ICollege[],
  filterDataState: IFilterData,
  searchText: string,
  setCollegeData: (collegeData: ICollege[]) => void
) => {
  const searchQuery = searchText.toLowerCase().replaceAll(' ', '');

  const filteredData = collegeData.filter((item) => {
    const stateMatches =
      filterDataState.state.length === 0 || filterDataState.state.some((state) => state.id.includes(item.state));
    const cityMatches =
      filterDataState.city.length === 0 || filterDataState.city.some((city) => city.id.includes(item.city));
    const ownershipMatches =
      filterDataState.ownership.length === 0 ||
      filterDataState.ownership.some((ownership) => ownership.id.includes(item.ownership));
    const categoryMatches =
      filterDataState.category.length === 0 ||
      filterDataState.category.some(
        (category) => category.id.toLowerCase().replaceAll(' ', '') === item.category.toLowerCase().replaceAll(' ', '')
      );
    const courseMatches =
      filterDataState.course.length === 0 ||
      filterDataState.course.some((course) =>
        Array.isArray(item.course)
          ? item?.course?.includes(Number(course.id))
          : item.course.includes(',')
            ? item?.course?.split(',')?.includes(course.id)
            : [item?.course]?.includes(course.id)
      );
    const nameMatches =
      searchText.trim() === '' ||
      item.name?.toLowerCase().replaceAll(' ', '').includes(searchQuery) ||
      item.shortName?.toLowerCase().replaceAll(' ', '').includes(searchQuery) ||
      item.city?.toLowerCase().replaceAll(' ', '').includes(searchQuery) ||
      item.state?.toLowerCase().replaceAll(' ', '').includes(searchQuery);
    return stateMatches && cityMatches && ownershipMatches && categoryMatches && nameMatches && courseMatches; // && courseMatches;
  });
  setCollegeData(filteredData);
};

export const findStream = (url: string) => {
  let stream = '',
    subStream = '';
  if (url.includes(SubStream.PHARMACY)) {
    stream = Stream.MEDICAL;
    subStream = SubStream.PHARMACY;
  } else if (url.includes(SubStream.DENTAL)) {
    stream = Stream.MEDICAL;
    subStream = SubStream.DENTAL;
  } else if (url.includes(SubStream.ARCHITECTURE)) {
    stream = Stream.ENGINEERING;
    subStream = SubStream.ARCHITECTURE;
  } else if (url.includes(Stream.MEDICAL)) {
    stream = Stream.MEDICAL;
    subStream = Stream.MEDICAL;
  } else {
    stream = Stream.ENGINEERING;
    subStream = Stream.ENGINEERING;
  }
  return { stream, subStream };
};

export const findCollegeCategory = (url: string | null) => {
  let collegeCategory = '';
  if (url?.includes(Category.GFTI)) {
    collegeCategory = Category.GFTI;
  } else if (url?.includes(Category.GOVERNMENT)) {
    collegeCategory = Category.GOVERNMENT;
  } else if (url?.includes(Category.IIIT)) {
    collegeCategory = Category.IIIT;
  } else if (url?.includes(Category.IIT)) {
    collegeCategory = Category.IIT;
  } else if (url?.includes(Category.NIT)) {
    collegeCategory = Category.NIT;
  } else if (url?.includes(Category.PRIVATE)) {
    collegeCategory = Category.PRIVATE;
  }
  return { collegeCategory };
};

// for filtering college data according the search text
export const filterSearch = (college: ICollege, searchText: string): boolean => {
  const searchQuery = searchText.toLowerCase().replaceAll(' ', '');
  return (
    college?.name?.toLowerCase().replaceAll(' ', '').includes(searchQuery) ||
    college?.shortName?.toLowerCase().replaceAll(' ', '').includes(searchQuery) ||
    college?.city?.toLowerCase().replaceAll(' ', '').includes(searchQuery) ||
    college?.state?.toLowerCase().replaceAll(' ', '').includes(searchQuery)
  );
};

// for handle the type of mobile no
export const handleNumericInputChange = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  handleChange: (data: ChangeEvent<HTMLInputElement>) => void
) => {
  const { name, value } = event.target;
  // Use a regular expression to allow only numeric characters (0-9)
  const numericValue = value.replace(/[^0-9]/g, '');
  // Create an event object with 'target' property and call the 'handleChange' function
  const eventObject = {
    target: {
      name,
      value: name === 'mobile' ? numericValue : value
    }
  } as ChangeEvent<HTMLInputElement>;
  handleChange(eventObject);
};
// Truncate string to ...
export const truncateString = (str: string, maxLength: number) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

export const replaceSpecialChar = (value: string) => {
  return value ? value.replaceAll(/[\s\W]/g, '').toLowerCase() : value;
};

export const needPredictorFilterHanlder = (filterState: ISelectedFilterPrpos, collegeData: ICollegeDataProps) => {
  const collegeTypeId = collegeData.collegeType?.replaceAll(' ', '-').toLowerCase();
  const hospitalTypeId = collegeData.hospitalType?.replaceAll(' ', '-').toLowerCase();
  const stateId = collegeData.state?.replaceAll(' ', '-').toLowerCase();
  const collegeType =
    filterState.collegeType.length === 0 || filterState.collegeType.some((clgType) => clgType.id === collegeTypeId);
  const hospitalType =
    filterState.hospitalType.length === 0 ||
    filterState.hospitalType.some((hptlType) => hptlType.id === hospitalTypeId);
  const states = filterState.state.length === 0 || filterState.state.some((state) => state.id === stateId);
  return collegeType && hospitalType && states;
};

export const getCookieToken = () => {
  return (
    document.cookie
      ?.split(';')
      ?.find((item) => item.includes('serviceToken'))
      ?.replace('serviceToken=', '')
      ?.trim() || ''
  );
};

export const deleteCookiesToken = () => {
  document.cookie.split(';').forEach((item) => {
    if (item.includes('serviceToken')) item = '';
  });
};

export const addCookies = (key: string, value: string) => {
  document.cookie = `${key}=${value}; domain=.${BASE_URL_NAME}; path=/;`;
};

export const getCookies = (key: string) => {
  return (
    document.cookie
      ?.split(';')
      ?.find((item) => item.includes(key))
      ?.replace(`${key}=`, '')
      ?.trim() || ''
  );
};

// decrypting node forge data
export const decrypt = (encrypted: string, ivHex: string, password: string) => {
  try {
    // Convert IV from hex to bytes
    const iv = forge.util.hexToBytes(ivHex);
    // Derive the key from the password using SHA-256
    const md = forge.md.sha256.create();
    md.update(password);
    const key = md.digest().bytes();
    // Create and initialize the decipher
    const decipher = forge.cipher.createDecipher('AES-CTR', key);
    decipher.start({ iv: iv });
    // Convert encrypted data from hex to bytes and update the decipher
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(encrypted)));
    decipher.finish();
    // Get the decrypted data
    const decrypted = decipher.output.toString();
    return decrypted;
  } catch (error) {
    return null;
  }
};
