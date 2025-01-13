import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CollegeListCard from 'ui-component/common/college-list-card';
import { ITopcolleges, Stream, SubStream } from 'types';
import { getTopCollegesList } from 'utils/api/common';

interface IParamsProps {
  substream: string;
  place: string;
}

export const generateMetadata = async ({ params }: { params: IParamsProps }): Promise<Metadata> => {
  const stream =
    params.substream.includes(Stream.ENGINEERING) || params.substream.includes(SubStream.ARCHITECTURE)
      ? Stream.ENGINEERING
      : Stream.MEDICAL;
  const { topColleges } = await getTopCollegesList(params.place.replace('colleges-in-', ''), stream, params.substream);
  return {
    title: topColleges?.pageData?.title,
    description: topColleges?.pageData?.description,
    keywords: topColleges?.pageData?.keywords
  };
};

const getData = async ({ params }: { params: IParamsProps }): Promise<ITopcolleges> => {
  const stream =
    params.substream.includes(Stream.ENGINEERING) || params.substream.includes(SubStream.ARCHITECTURE)
      ? Stream.ENGINEERING
      : Stream.MEDICAL;
  const data = await getTopCollegesList(params.place, stream, params.substream);
  return data;
};

const TopCollegesList = async ({ params }: { params: IParamsProps }) => {
  if (!params.place.startsWith('colleges-in-')) {
    notFound();
  }
  params.place = params.place.replace('colleges-in-', '');
  const { topColleges } = await getData({ params });
  return <CollegeListCard topColleges={topColleges} enableLoadMore={false} />;
};

export default TopCollegesList;
