/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { ReactElement } from 'react';
// import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
// material-ui

// project imports
import { getTopCollegesData } from 'utils/api/common';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import { ICollegeData } from 'types/college';
import { Stream } from 'types';

// ==============================|| TOP ENGINEERING COLLEGES PAGE ||============================== //

const TopEngineeringColleges = ({ topColleges }: { topColleges: ICollegeData }) => {
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
      <>
    
      {/* <Box>
        <ContainerWrapper>
          {matchDownLg && (
            <Box
              sx={{
                position: 'sticky',
                top: '80px',
                background: '#fff',
                zIndex: '800'
              }}
            >
              <ListingTopFilters
                sortHandler={handleSortChange}
                filterHandler={filterHandler}
                topColleges={topColleges}
              />
            </Box>
          )}
          {topColleges?.pageData?.title && topColleges?.pageData?.contents && (
            <TopBanner title={topColleges?.pageData?.title} readMoreContent={topColleges?.pageData?.contents} />
          )}
          <Grid container spacing={2}>
            <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
              <Box
                sx={{
                  paddingRight: {
                    xl: '30px',
                    lg: '0px',
                    md: '0px',
                    sm: '0px',
                    xs: '0px'
                  }
                }}
              >
                {matchDownLg ? null : (
                  <ListingTopFilters
                    sortHandler={handleSortChange}
                    filterHandler={filterHandler}
                    topColleges={topColleges}
                  />
                )}
                {matchDownLg && (
                  <Box mb={2}>
                    <CollegeCount />
                  </Box>
                )}
                <ListingPageCards collegeData={collegeData} />
              </Box>
            </Grid>
            <Grid
              item
              xl={4}
              sx={{
                display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' }
              }}
            >
              <Box className="stickySidebar">
                <CollegeFilter data={topColleges} filterHandler={filterHandler} />
              </Box>
            </Grid>
          </Grid>
        </ContainerWrapper>
      </Box> */}
       </>
    </Page>
  );
};
TopEngineeringColleges.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// Implement the getStaticPaths function
export const getStaticPaths: GetStaticPaths = async () => {
  // Replace this with the actual categories you want to support
  const categories = ['iit', 'nit', 'iiit', 'gfti', 'government', 'private'];
  const topList = ['10', '15', '20', '25'];
  const paths = topList.flatMap((top) => {
    return categories.map((category) => ({
      params: { top: String(top), category }
    }));
  });
  return {
    paths,
    fallback: false
  };
};
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const stream = Stream.ENGINEERING;

  const data = await getTopCollegesData(1, params.category, params.top, stream);
  const { topColleges } = data;
  return {
    props: {
      topColleges
    }
  };
};

export default TopEngineeringColleges;
