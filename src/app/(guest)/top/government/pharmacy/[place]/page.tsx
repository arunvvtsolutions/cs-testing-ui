/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';

import CollegeListCard from 'ui-component/common/college-list-card';
import { Category, ITopcolleges, Stream, SubStream } from 'types';
import { getCatgryTopCollegesList } from 'utils/api/common';

interface IParamsProps {
  place: string;
}

export const generateMetadata = async ({ params }: { params: IParamsProps }): Promise<Metadata> => {
  const stream = Stream.MEDICAL;
  const { topColleges } = await getCatgryTopCollegesList(
    Category.GOVERNMENT,
    stream,
    SubStream.PHARMACY,
    params.place.replace('colleges-in-', '')
  );
  return {
    title: topColleges?.pageData?.title,
    description: topColleges?.pageData?.description,
    keywords: topColleges?.pageData?.keywords
  };
};

const getData = async ({ params }: { params: IParamsProps }): Promise<ITopcolleges> => {
  const stream = Stream.MEDICAL;
  const data = await getCatgryTopCollegesList(Category.GOVERNMENT, stream, SubStream.PHARMACY, params.place);
  return data;
};

const CollegesPage = async ({ params }: { params: IParamsProps }) => {
  if (!params.place.startsWith('colleges-in-')) notFound();
  const { topColleges } = await getData({ params: { place: params.place.replace('colleges-in-', '') } });
  return <CollegeListCard topColleges={topColleges} enableLoadMore={false} />;
};
export default CollegesPage;
