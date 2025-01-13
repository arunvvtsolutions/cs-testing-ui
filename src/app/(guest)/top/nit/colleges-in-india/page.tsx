import { Metadata } from 'next';
import React from 'react';

import CollegeListCard from 'ui-component/common/college-list-card';
import { Category, ITopcolleges, Stream } from 'types';
import { getCatgryTopCollegesList } from 'utils/api/common';

export const generateMetadata = async (): Promise<Metadata> => {
  const stream = Stream.ENGINEERING;
  const { topColleges } = await getCatgryTopCollegesList(Category.NIT, stream, stream);
  return {
    title: topColleges?.pageData?.title,
    description: topColleges?.pageData?.description,
    keywords: topColleges?.pageData?.keywords
  };
};

const getData = async (): Promise<ITopcolleges> => {
  const stream = Stream.ENGINEERING;
  const data = await getCatgryTopCollegesList(Category.NIT, stream, stream);
  return data;
};

const CollegesPage = async () => {
  const { topColleges } = await getData();
  return <CollegeListCard topColleges={topColleges} enableLoadMore={false} />;
};
export default CollegesPage;
