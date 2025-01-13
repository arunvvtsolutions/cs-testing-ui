/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from 'next';

// all course fee datas passed below
import { getBannerData, getSubMenuData } from 'utils/api/common';
import { getCutoffData, getFilterData } from 'utils/api/course-fees-inner-page/course-fees-cutoff';
import { Stream } from 'types';

// const CutoffInnerPage = ({ data }: any) => {
//   return (
//     <>
//       <Page title="">
//         <Box>
//           <SubHeader {...data.subMenu} />
//           <ContainerWrapper>
//             <CutoffInnerComponent data={data} />
//           </ContainerWrapper>
//         </Box>
//       </Page>
//     </>
//   );
// };

// CutoffInnerPage.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };

export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { name, courseName } = params;

  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const cutoffResultsDataResponse = await getCutoffData(name, courseName, stream);
  const filterdataResponse = await getFilterData(name, courseName, stream);
  const data: unknown = {
    subMenu: subMenuDataResponse,
    bannerData: bannerDataResponse,
    cutoffResultsData: cutoffResultsDataResponse,
    filteredData: filterdataResponse
  };

  return {
    props: {
      data
    }
  };
};

// export default CutoffInnerPage;
