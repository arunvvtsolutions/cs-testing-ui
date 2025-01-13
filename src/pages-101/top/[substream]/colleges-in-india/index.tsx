/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { ReactElement, useEffect, useState } from 'react';

import Layout from 'layout';
import Page from 'ui-component/Page';
import { ICollegeData } from 'types/college';
import CollegeListCard from 'ui-component/common/college-list-card';
import { Stream, SubStream } from 'types';
import { getTopCollegesList } from 'utils/api/common';
import Loading from 'ui-component/common/listing-page-loading/Loading';

const TopCollegesList = ({ topColleges }: { topColleges: ICollegeData }) => {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (topColleges.collegeData.length > 0) {
      setDataLoaded(true);
    }
  }, [topColleges.collegeData]);

  return dataLoaded ? (
    <Page
      title={topColleges?.pageData?.title}
      meta={
        <>
          <meta title={topColleges?.pageData?.title}></meta>
          <meta name="description" content={topColleges?.pageData?.description}></meta>
          <meta name="keywords" content={topColleges?.pageData?.keywords}></meta>
        </>
      }
    >
      <CollegeListCard topColleges={topColleges} enableLoadMore={false} />
    </Page>
  ) : (
    <Loading />
  );
};

TopCollegesList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// Implement the getStaticPaths function
export const getStaticPaths: GetStaticPaths = async () => {
  // Replace this with the actual categories you want to support

  const subStream = ['engineering', 'medical', 'architecture', 'pharmacy', 'dental'];
  const paths = subStream.flatMap((s) => {
    return { params: { substream: s } };
  });
  return {
    paths,
    fallback: false
  };
};
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  let stream = '';
  const { substream } = params;

  if (substream === SubStream.ARCHITECTURE || substream === Stream.ENGINEERING) stream = Stream.ENGINEERING;
  else stream = Stream.MEDICAL;
  const topCollegesData = await getTopCollegesList('india', stream, substream);
  const { topColleges } = topCollegesData;
  return {
    props: {
      topColleges
    }
  };
};

export default TopCollegesList;
