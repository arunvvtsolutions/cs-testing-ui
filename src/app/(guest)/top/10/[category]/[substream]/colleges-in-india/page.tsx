import React from 'react';
import { Metadata } from 'next';

import CollegeListCard from 'ui-component/common/college-list-card';
import { ITopcolleges, Stream, StreamCode, SubStream } from 'types';
import { getTopCollegesData } from 'utils/api/common';

interface IParamsProps {
  category: string;
  top: number;
  substream: string;
}
// Implement the getStaticPaths function
export const generateStaticParams = async () => {
  const categories = ['iit', 'nit', 'iiit', 'gfti', 'government', 'private'];
  const topList = ['10'];
  const substream = ['engineering', 'architecture', 'medical', 'dental', 'pharamcy'];
  return topList.flatMap((top) => {
    return categories.flatMap((category) => {
      return substream.map((substream) => ({
        top: String(top),
        category,
        substream
      }));
    });
  });
};

export const generateMetadata = async ({ params }: { params: IParamsProps }): Promise<Metadata> => {
  const stream =
    params.substream.includes(Stream.ENGINEERING) || params.substream.includes(SubStream.ARCHITECTURE)
      ? Stream.ENGINEERING
      : Stream.MEDICAL;
  const { topColleges } = await getTopCollegesData(StreamCode[params.substream], params.category, 10, stream);
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

  const data = await getTopCollegesData(StreamCode[params.substream], params.category, 10, stream);
  return data;
};

const TopCollegesList = async ({ params }: { params: IParamsProps }) => {
  const { topColleges } = await getData({ params });
  return <CollegeListCard topColleges={topColleges} enableLoadMore={false} disablePagination={true} />;
};

export default TopCollegesList;
