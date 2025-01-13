/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import Layout from 'layout';
import { IAmenitiesPageProps } from 'ui-component/college-amenities-page';
import { getBannerData, getFaqData, getInnerPageData, getOtherCollegeData, getSubMenuData } from 'utils/api/common';
import { getCampusOverviewData, getFacilitiesListData, getAmenitiesDescriptionData } from 'utils/api/amenities';
import { Stream } from 'types';

const AmenitiesPage = ({ data }: IAmenitiesPageProps) => {
  // const router = useRouter();
  // const { college, collegename } = router.query;
  // const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <></>
    // <Page
    //   title={data.metaData.meta.title}
    //   meta={
    //     <>
    //       <meta name="description" content={data.metaData.meta.description} />
    //       <meta name="keywords" content={data.metaData.meta.keywords} />
    //     </>
    //   }
    // >
    //   <Box>
    //     <SubHeader {...data.subMenu} />
    //     <ContainerWrapper>
    //       <AmenitiesComponent data={data} />
    //     </ContainerWrapper>
    //   </Box>
    //   {/* listing page ends here */}
    // </Page>
  );
};

AmenitiesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { ins, name } = params;

  const pageName = 'amenities';
  const PAGE_PARAM = 'amenities';
  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const faqDataResponse = await getFaqData(name, pageName, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const campusOverviewDataResponse = await getCampusOverviewData(name, stream);
  const facilitiesListDataResponse = await getFacilitiesListData(name, stream);
  const amenitiesDescDataResponse = await getAmenitiesDescriptionData(name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(name, stream);
  const metaDataResponse = await getInnerPageData(name, PAGE_PARAM, stream);

  //Protect Routes
  if (
    (ins !== 'college' && ins !== 'university') ||
    (!bannerDataResponse.bannerData.name && !bannerDataResponse.hasError)
  ) {
    return {
      notFound: true
    };
  }

  const data: unknown = {
    faqData: faqDataResponse,
    bannerData: bannerDataResponse,
    campusData: campusOverviewDataResponse,
    facilitiesData: facilitiesListDataResponse,
    descData: amenitiesDescDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    metaData: metaDataResponse,
    subMenu: subMenuDataResponse
  };
  return {
    props: {
      data
    }
  };
};

export default AmenitiesPage;
