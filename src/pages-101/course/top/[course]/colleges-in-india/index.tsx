/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from 'next';
import React, { ReactElement } from 'react';

import Layout from 'layout';
import Page from 'ui-component/Page';
import { ICollegeData } from 'types/college';
import CollegeListCard from 'ui-component/common/college-list-card';
import { Stream } from 'types';
import { getCourseTopCollegesList } from 'utils/api/common';

const CollegesPage = ({ topColleges }: { topColleges: ICollegeData }) => {
  return (
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
  );
};
CollegesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default CollegesPage;

export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { course } = params;
  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const topCollegesData = await getCourseTopCollegesList(course, stream, stream, 'india');
  const { topColleges } = topCollegesData;
  return {
    props: {
      topColleges
    }
  };
};
