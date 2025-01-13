/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next';
import React from 'react';

import CollegeListCard from 'ui-component/common/college-list-card';
import { ITopcolleges, Stream, SubStream } from 'types';
import { getCourseTopCollegesList } from 'utils/api/common';

interface IParamsProps {
  course: string;
}

export const generateMetadata = async ({ params }: { params: IParamsProps }): Promise<Metadata> => {
  const stream = Stream.MEDICAL;
  const { topColleges } = await getCourseTopCollegesList(params.course, stream, stream, 'india');
  return {
    title: topColleges?.pageData?.title,
    description: topColleges?.pageData?.description,
    keywords: topColleges?.pageData?.keywords
  };
};

const getData = async ({ params }: { params: IParamsProps }): Promise<ITopcolleges> => {
  const stream = Stream.MEDICAL;
  const data = await getCourseTopCollegesList(params.course, stream, SubStream.PHARMACY, 'india');
  return data;
};

const CollegesPage = async ({ params }: { params: IParamsProps }) => {
  const { topColleges } = await getData({ params });
  return <CollegeListCard topColleges={topColleges} enableLoadMore={false} />;
};
export default CollegesPage;
