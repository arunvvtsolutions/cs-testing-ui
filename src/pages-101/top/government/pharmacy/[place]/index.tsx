/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from 'next';
import React, { ReactElement, useEffect, useState } from 'react';

import Layout from 'layout';
import Page from 'ui-component/Page';
import { ICollegeData } from 'types/college';
import CollegeListCard from 'ui-component/common/college-list-card';
import { Category, Stream, SubStream } from 'types';
import { getCatgryTopCollegesList } from 'utils/api/common';
import Loading from 'ui-component/common/listing-page-loading/Loading';

const CollegesPage = ({ topColleges }: { topColleges: ICollegeData }) => {
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
      <CollegeListCard topColleges={topColleges} enableLoadMore={false} disablePagination={true} />
    </Page>
  ) : (
    <Loading />
  );
};
CollegesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CollegesPage;

export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  let { place } = params;

  if (!place.startsWith('colleges-in-')) {
    return {
      notFound: true
    };
  }
  place = place.replace('colleges-in-', '');
  const stream = Stream.MEDICAL;

  const topCollegesData = await getCatgryTopCollegesList(Category.GOVERNMENT, stream, SubStream.DENTAL, place);
  const { topColleges } = topCollegesData;
  return {
    props: {
      topColleges
    }
  };
};
