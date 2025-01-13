/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import Layout from 'layout';
// student placement component mockupdate passed from below
import { IPlacementPageProps } from 'ui-component/college-placements-page';
import { getBannerData, getFaqData, getInnerPageData, getSubMenuData } from 'utils/api/common';
import { getOtherCollegeData } from 'utils/api/common';
import {
  getGraduationData,
  getMedianSalaryData,
  getPercentData,
  getPlacementDescriptionData,
  getTopCompaniesData,
  getYoutubeShortsData
} from 'utils/api/placement';
import { Stream } from 'types';

const PlacementPage = ({ data }: IPlacementPageProps) => {
  // const router = useRouter();
  // const { college, collegename } = router.query;
  // const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  return (
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
    //       {/* <PlacementComponent  */}
    //       <PlacementComponent data={data} />
    //     </ContainerWrapper>
    //   </Box>
    //   {/* listing page ends here */}
    // </Page>
    <></>
  );
};

PlacementPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

//API Intergration for serverside redering
export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { ins, name } = params;

  const pageName = 'placement';
  const PAGE_PARAM = 'placement';
  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const faqDataResponse = await getFaqData(name, pageName, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(name, stream);
  const contentDataResponse = await getPlacementDescriptionData(name, stream);
  const topCompaniesDataResponse = await getTopCompaniesData(name, stream);
  const graduationDataResponse = await getGraduationData(name, stream);
  const percentDataResponse = await getPercentData(name, stream);
  const medianSalaryDataResponse = await getMedianSalaryData(name, stream);
  const youtubeShortsDataResponse = await getYoutubeShortsData(name, stream);
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
    subMenu: subMenuDataResponse,
    faqData: faqDataResponse,
    bannerData: bannerDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    contentData: contentDataResponse,
    topCompaniesData: topCompaniesDataResponse,
    graduationData: graduationDataResponse,
    percentData: percentDataResponse,
    salaryData: medianSalaryDataResponse,
    youtubeData: youtubeShortsDataResponse,
    metaData: metaDataResponse
  };
  return {
    props: {
      data
    }
  };
};

export default PlacementPage;
