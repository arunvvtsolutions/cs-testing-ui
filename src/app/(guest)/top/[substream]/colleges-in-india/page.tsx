import React from 'react';
import { Metadata } from 'next';

import CollegeListCard from 'ui-component/common/college-list-card';
import { ITopcolleges, Stream, SubStream } from 'types';
import { getTopCollegesList } from 'utils/api/common';

interface IParamsProps {
  substream: string;
}

export const generateMetadata = async ({ params }: { params: IParamsProps }): Promise<Metadata> => {
  const stream =
    params.substream.includes(Stream.ENGINEERING) || params.substream.includes(SubStream.ARCHITECTURE)
      ? Stream.ENGINEERING
      : Stream.MEDICAL;
  const { topColleges } = await getTopCollegesList('india', stream, params.substream);
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
  const data = await getTopCollegesList('india', stream, params.substream);
  return data;
};

const TopCollegesList = async ({ params }: { params: IParamsProps }) => {
  const { topColleges } = await getData({ params });
  return <CollegeListCard topColleges={topColleges} enableLoadMore={false} />;
};

export default TopCollegesList;
