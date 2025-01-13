/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import CollegeListCard from 'ui-component/common/college-list-card';
import { Category, ITopcolleges, Stream, SubStream } from 'types';
import { getCatgryTopCollegesList } from 'utils/api/common';

interface IParamsProps {
  place: string;
}

export const generateMetadata = async ({ params }: { params: IParamsProps }): Promise<Metadata> => {
  const stream = Stream.ENGINEERING;
  const { topColleges } = await getCatgryTopCollegesList(
    Category.PRIVATE,
    stream,
    SubStream.ARCHITECTURE,
    params.place.replace('colleges-in-', '')
  );
  return {
    title: topColleges?.pageData?.title,
    description: topColleges?.pageData?.description,
    keywords: topColleges?.pageData?.keywords
  };
};

const getData = async ({ params }: { params: IParamsProps }): Promise<ITopcolleges> => {
  const stream = Stream.ENGINEERING;
  const data = await getCatgryTopCollegesList(Category.PRIVATE, stream, SubStream.ARCHITECTURE, params.place);
  return data;
};

const CollegesPage = async ({ params }: { params: IParamsProps }) => {
  if (!params.place.startsWith('colleges-in-')) notFound();
  const { topColleges } = await getData({ params: { place: params.place.replace('colleges-in-', '') } });
  return <CollegeListCard topColleges={topColleges} enableLoadMore={false} />;
};
export default CollegesPage;
