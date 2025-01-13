/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import Layout from 'layout';
import { ICollegecontactPageprops } from 'ui-component/college-contact-page';
import { getBannerData, getInnerPageData, getSubMenuData } from 'utils/api/common';
import { getMapData, getNearByData, getContactDetailsData } from 'utils/api/contact';
import { Stream } from 'types';

const ContactPage = ({ data }: ICollegecontactPageprops) => {
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
    //       <ContactComponent data={data} />
    //     </ContainerWrapper>
    //   </Box>
    //   {/* listing page ends here */}
    // </Page>
  );
};

ContactPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

//API Intergration for serverside redering
export const getServerSideProps: GetServerSideProps = async ({ req, params }: any) => {
  const { ins, name } = params;

  const PAGE_PARAM = 'contact';

  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const contactDetailDataResponse = await getContactDetailsData(name, stream);
  const nearByDataResponse = await getNearByData(name, stream);
  const mapDataResponse = await getMapData(name, stream);
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
    contactData: contactDetailDataResponse,
    nearByData: nearByDataResponse,
    mapData: mapDataResponse,
    metaData: metaDataResponse
  };
  return {
    props: {
      data
    }
  };
};

export default ContactPage;
