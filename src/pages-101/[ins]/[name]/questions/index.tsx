/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import Layout from 'layout';
// student placement component mockupdate passed from below
import { getBannerData, getOtherCollegeData, getSubMenuData } from 'utils/api/common';
import { IQuestionDataProps } from 'ui-component/college-question-page';
import { getQuestions } from 'utils/api/questions';
import { Stream } from 'types';

const Questions = ({ data }: IQuestionDataProps) => {
  // const router = useRouter();
  // const { college, collegename } = router.query;
  // const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <></>
    // <Page title="">
    //   <Box>
    //     <SubHeader {...data.subMenu} />
    //     <ContainerWrapper>
    //       {/* <PlacementComponent  */}
    //       <QuestionComponents data={data} />
    //     </ContainerWrapper>
    //   </Box>
    //   {/* listing page ends here */}
    // </Page>
  );
};

//API Intergration for serverside redering
export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { name, ins } = params;

  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(name, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const QuestionResponse = await getQuestions(name, stream);
  const QuestionReplayResponse = await getQuestions(name, stream);

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
    bannerData: bannerDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    profileData: QuestionResponse,
    replayData: QuestionReplayResponse
  };
  return {
    props: {
      data
    }
  };
};
Questions.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Questions;
