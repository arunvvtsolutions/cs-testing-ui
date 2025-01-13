/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
// project imports
import { GetServerSideProps } from 'next';

import Layout from 'layout';
import Page from 'components/ui-component/Page';
import HomeComponent from 'components/ui-component/home';
import { getSearchData } from 'utils/api/home';
import { ISearchDataProps } from 'ui-component/home/banner-page/Searchbar';

// ==============================|| HOME PAGE ||============================== //

const LandingPage = ({ searchData }: ISearchDataProps) => {
  return (
    <Page title="Home Page">
      <HomeComponent searchData={searchData} />
    </Page>
  );
};
LandingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const searchResult = await getSearchData();
  const { searchData } = searchResult;
  return {
    props: {
      searchData
    }
  };
};

export default LandingPage;
