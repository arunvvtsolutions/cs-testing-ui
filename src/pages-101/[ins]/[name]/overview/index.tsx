/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
import { ReactElement } from 'react';
// import { useRouter } from 'next/router';
// material-ui
// import { Box } from '@mui/material';

// project imports
import { GetServerSideProps } from 'next';
import Layout from 'layout';
// import Page from 'components/ui-component/Page';
// import { ContainerWrapper } from 'ui-component/home/banner-page/styles';
// import SubHeader from 'ui-component/subheader';
// student review component mockupdate passed from below
// import OverViewComponent from 'ui-component/college-overview-page';
import { IOverviewPageProps } from 'ui-component/college-overview-page';
import { getFaqData, getBannerData, getOtherCollegeData, getInnerPageData, getSubMenuData } from 'utils/api/common';
import {
  getAdmissionData,
  getBlogData,
  getCollegeReviews,
  getCourseAndFeesData,
  getDescriptionData,
  getExamsAndCutoffsData,
  getFacilitiesData,
  getGalleryImgData,
  getHighlightsData,
  getOverAllRatingsData,
  getPlacementsData
} from 'utils/api/overview';
import { Stream } from 'types';

const OverViewPage = ({ data }: IOverviewPageProps) => {
  // const router = useRouter();
  // const { college, collegename } = router.query;
  // const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {/* <Page
        title={data.metaData.meta.title}
        meta={
          <>
            <meta name="description" content={data.metaData.meta.description} />
            <meta name="keywords" content={data.metaData.meta.keywords} />
          </>
        }
      >
        <Box>
          <SubHeader {...data.subMenu} />
          <ContainerWrapper>
            <OverViewComponent data={data} />
          </ContainerWrapper>
        </Box>
      </Page> */}
    </>
  );
};

OverViewPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

//API Intergration for serverside redering
export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { ins, name } = params;

  const pageName = 'overview';
  const PAGE_PARAM = 'overview';

  const stream = req.headers.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const faqDataResponse = await getFaqData(name, pageName, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const overviewDataResponse = await getDescriptionData(name, stream);
  const reviewsResponse = await getCollegeReviews(name, stream);
  const blogDataResponse = await getBlogData(name, stream);
  const admissionDataResponse = await getAdmissionData(name, stream);
  const placementDataResponse = await getPlacementsData(name, stream);
  const highlightDataResponse = await getHighlightsData(name, stream);
  const courseFeesDataResponse = await getCourseAndFeesData(name, stream);
  const galleryImageDataResponse = await getGalleryImgData(name, stream);
  const examCutoffDataResponse = await getExamsAndCutoffsData(name, stream);
  const facilitiesDataResponse = await getFacilitiesData(name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(name, stream);
  const reviewDataResponse = await getOverAllRatingsData(name, stream);
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
    collegeReviews: reviewsResponse,
    faqData: faqDataResponse,
    bannerData: bannerDataResponse,
    overviewData: overviewDataResponse,
    blogData: blogDataResponse,
    highlightData: highlightDataResponse,
    placementData: placementDataResponse,
    admissionData: admissionDataResponse,
    galleryImages: galleryImageDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    examData: examCutoffDataResponse,
    courseFeesData: courseFeesDataResponse,
    facilitiesData: facilitiesDataResponse,
    reviewData: reviewDataResponse,
    metaData: metaDataResponse
  };

  return {
    props: {
      data
    }
  };
};
export default OverViewPage;
