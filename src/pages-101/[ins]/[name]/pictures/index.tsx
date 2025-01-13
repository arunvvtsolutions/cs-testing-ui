/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import Layout from 'layout';
// student placement component mockupdate passed from below
import { IPicturePageProps } from 'ui-component/college-pictures-page';
import { getPicturesData } from 'utils/api/picture';
import { getBannerData, getOtherCollegeData, getInnerPageData, getSubMenuData } from 'utils/api/common';
import { Stream } from 'types';

const PicturePage = ({ data }: IPicturePageProps) => {
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
    //       {/* <PictureComponent  */}
    //       <PictureComponent data={data} />
    //     </ContainerWrapper>
    //   </Box>
    //   {/* listing page ends here */}
    // </Page>
  );
};

PicturePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
//API Intergration for serverside redering
export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { ins, name } = params;

  const PAGE_PARAM = 'pictures';

  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const pictureDataResponse = await getPicturesData(name, stream);
  const otherClgDataResponse = await getOtherCollegeData(name, stream);
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
    otherCollegeData: otherClgDataResponse,
    collegeImagesData: pictureDataResponse,
    metaData: metaDataResponse
  };
  return {
    props: {
      data
    }
  };
};

export default PicturePage;
