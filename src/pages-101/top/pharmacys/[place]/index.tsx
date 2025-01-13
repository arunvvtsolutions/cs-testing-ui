/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from 'next';
import React, { ReactElement, useEffect, useState } from 'react';

import Layout from 'layout';
import Page from 'ui-component/Page';
import { ICollegeData } from 'types/college';
import CollegeListCard from 'ui-component/common/college-list-card';
import { Stream, SubStream } from 'types';
import { getTopCollegesList } from 'utils/api/common';
import Loading from 'ui-component/common/listing-page-loading/Loading';

const TopDentalCollegesList = ({ topColleges }: { topColleges: ICollegeData }) => {
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
TopDentalCollegesList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default TopDentalCollegesList;

export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  let { place } = params;
  const stream = Stream.MEDICAL;

  if (!place.startsWith('colleges-in-')) {
    return {
      notFound: true
    };
  }
  place = place.replace('colleges-in-', '');
  const topCollegesData = await getTopCollegesList(place, stream, SubStream.PHARMACY);
  const { topColleges } = topCollegesData;
  return {
    props: {
      topColleges
    }
  };
};
