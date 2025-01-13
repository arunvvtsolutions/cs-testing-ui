/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from 'next';

import { getBannerData, getFaqData, getInnerPageData, getOtherCollegeData, getSubMenuData } from 'utils/api/common';
import { getDescriptionData, getProfessorsList } from 'utils/api/faculty';
import { Stream } from 'types';

// const FacultyPage = ({ data }: IFacultyProps) => {
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
//           <FacultyComponent data={data} />
//         </ContainerWrapper>
//       </Box>
//       {/* listing page ends here */}
//     </Page>
//   );
// };

// FacultyPage.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };

export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { name, ins } = params;

  const pageName = 'faculty';
  const PAGE_PARAM = 'faculty';
  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const faqDataResponse = await getFaqData(name, pageName, stream);
  const facultyDataResponse = await getDescriptionData(name, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const ProfessorsDataResponse = await getProfessorsList(name, stream);
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
    bannerData: bannerDataResponse,
    facultyData: facultyDataResponse,
    listData: ProfessorsDataResponse,
    faqData: faqDataResponse,
    otherCollegeData: otherCollegeDataResponse,
    metaData: metaDataResponse
  };
  return {
    props: {
      data
    }
  };
};

// export default FacultyPage;
