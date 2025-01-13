/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from 'next';

// student placement component mockupdate passed from below
import { getBannerData, getFaqData, getInnerPageData, getOtherCollegeData, getSubMenuData } from 'utils/api/common';
import {
  getAdmissionCategory,
  getAdmissionDeversity,
  getAdmissionIntake,
  getAdmissionStudentsStregth,
  getDescriptionData
} from 'utils/api/student-strength';
import { Stream } from 'types';

// const StudentStrengthPage = ({ data }: IStudentStrengthProps) => {
//   return (
//     <Page
//       title={data.metaData.meta.title}
//       meta={
//         <>
//           <meta name="description" content={data.metaData.meta.description} />
//           <meta name="keywords" content={data.metaData.meta.keywords} />
//         </>
//       }
//     >
//       <Box>
//         <SubHeader {...data.subMenu} />
//         <ContainerWrapper>
//           {/* <StudentStrength Component  */}
//           <StudentStrengthComponent data={data} />
//         </ContainerWrapper>
//       </Box>
//       {/* listing page ends here */}
//     </Page>
//   );
// };

// StudentStrengthPage.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };

export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { name, ins } = params;

  const pageName = 'student-strength';
  const PAGE_PARAM = 'student-strength';

  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const descriptionDataResponse = await getDescriptionData(name, stream);
  const faqDataResponse = await getFaqData(name, pageName, stream);
  const categoryDataResponse = await getAdmissionCategory(name, stream);
  const approvedIntakeDataResponse = await getAdmissionIntake(name, stream);
  const strengthDataResponse = await getAdmissionStudentsStregth(name, stream);
  const diversityDataResponse = await getAdmissionDeversity(name, stream);
  const bannerDataResponse = await getBannerData(name, stream);
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
    subMenu: subMenuDataResponse,
    contentData: descriptionDataResponse,
    faqData: faqDataResponse,
    categoryData: categoryDataResponse,
    approvedIntakeData: approvedIntakeDataResponse,
    strengthData: strengthDataResponse,
    diversityData: diversityDataResponse,
    bannerData: bannerDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    metaData: metaDataResponse
  };
  return {
    props: {
      data
    }
  };
};

// export default StudentStrengthPage;
