/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from 'next';
import React, { ReactElement, useEffect, useState } from 'react';

import Loading from 'ui-component/common/listing-page-loading/Loading';
import Layout from 'layout';
import Page from 'ui-component/Page';
import { ICollegeData } from 'types/college';
import CollegeListCard from 'ui-component/common/college-list-card';
import { Stream } from 'types';
import { getTopCollegesList } from 'utils/api/common';

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
      <CollegeListCard topColleges={topColleges} enableLoadMore={false} disablePagination={true} />
    </Page>
  ) : (
    <Loading />
  );
};

TopCollegesList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default TopCollegesList;

export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  let { place } = params;
  const { substream } = params;
  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  if (!place.startsWith('colleges-in-')) {
    return {
      notFound: true
    };
  }
  place = place.replace('colleges-in-', '');
  const topCollegesData = await getTopCollegesList(place, stream, substream);
  const { topColleges } = topCollegesData;
  return {
    props: {
      topColleges
    }
  };
};
