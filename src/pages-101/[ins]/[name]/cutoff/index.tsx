/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from 'next';

// student placement component mockupdate passed from below
import { getBannerData, getFaqData, getInnerPageData, getOtherCollegeData, getSubMenuData } from 'utils/api/common';
import { getContentData, getCutoffFormData, getExamsAndCutoffsData } from 'utils/api/cutoff';
import { Stream } from 'types';

// const CutoffPage = ({ data }: ICutoffPageProps) => {
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
//           {/* <CutoffComponent  */}
//           <CutoffComponent data={data} />
//         </ContainerWrapper>
//       </Box>
//       {/* listing page ends here */}
//     </Page>
//   );
// };

// CutoffPage.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };

//API Intergration for serverside redering
export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { ins, name } = params;

  const pageName = 'cutoff';
  const PAGE_PARAM = 'cutoff';

  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const faqDataResponse = await getFaqData(name, pageName, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(name, stream);
  const contentDataResponse = await getContentData(name, stream);
  const examDataResponse = await getExamsAndCutoffsData(name, stream);
  const cutoffFormDataResponse = await getCutoffFormData(name, stream);
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
    examData: examDataResponse,
    cutoffFormData: cutoffFormDataResponse,
    metaData: metaDataResponse
  };
  return {
    props: {
      data
    }
  };
};

// export default CutoffPage;
