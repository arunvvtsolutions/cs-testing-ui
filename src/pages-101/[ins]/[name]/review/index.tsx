/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import Layout from 'layout';
// student placement component mockupdate passed from below
import { ICollegeReviewPage } from 'ui-component/college-review-page';
import { getBannerData, getFaqData, getInnerPageData, getOtherCollegeData, getSubMenuData } from 'utils/api/common';
import { getOverAllRatingsData } from 'utils/api/overview';
import { getCollegeReviewsData } from 'utils/api/review';
import { Stream } from 'types';

const Review = ({ data }: ICollegeReviewPage) => {
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
    //       <ReviewComponents data={data} />
    //     </ContainerWrapper>
    //   </Box>
    // </Page>
  );
};
Review.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { ins, name } = params;

  const pageName = 'review';
  const PAGE_PARAM = 'reviews';

  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const faqDataResponse = await getFaqData(name, pageName, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(name, stream);
  const collegeReviewsResponse = await getCollegeReviewsData(name, stream);
  const reviewDataResponse = await getOverAllRatingsData(name, stream);
  const metaDataResponse = await getInnerPageData(name, PAGE_PARAM, stream);

  //Protect Routes
  if ((ins !== 'college' && ins !== 'university') || !bannerDataResponse.bannerData.name) {
    return {
      notFound: true
    };
  }
  const data: unknown = {
    subMenu: subMenuDataResponse,
    faqData: faqDataResponse,
    bannerData: bannerDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    collegeReviews: collegeReviewsResponse,
    reviewData: reviewDataResponse,
    metaData: metaDataResponse
  };
  return {
    props: {
      data
    }
  };
};

export default Review;
