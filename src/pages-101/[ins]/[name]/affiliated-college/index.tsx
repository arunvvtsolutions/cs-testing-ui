/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import Layout from 'layout';
import { IAffiliatedProps } from 'ui-component/college-affiliated-page';
import { getBannerData, getSubMenuData } from 'utils/api/common';
import { getAffiliatedData } from 'utils/api/affiliatedCollege';
import { Stream } from 'types';

const AffliatedPage = ({ data }: IAffiliatedProps) => {
  return (
    // <Page title="">
    //   <Box>
    //     <SubHeader {...data.subMenu} />
    //     <ContainerWrapper>
    //       <AffiliatedComponent data={data} />
    //     </ContainerWrapper>
    //   </Box>
    //   {/* listing page ends here */}
    // </Page>
    <></>
  );
};

AffliatedPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { ins, name } = params;

  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const affiliatedDataResponse = await getAffiliatedData(name, stream);
  const bannerDataResponse = await getBannerData(name, stream);

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
    collegeData: affiliatedDataResponse,
    bannerData: bannerDataResponse,
    subMenu: subMenuDataResponse
  };
  return {
    props: {
      data
    }
  };
};
export default AffliatedPage;
