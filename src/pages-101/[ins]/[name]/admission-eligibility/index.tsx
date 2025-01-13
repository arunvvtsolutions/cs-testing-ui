/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';

import Layout from 'layout';
import { IAdmissionEligibilityProps } from 'ui-component/college-admission-eligibility';
import { getBannerData, getFaqData, getInnerPageData, getOtherCollegeData, getSubMenuData } from 'utils/api/common';
import { getAdmissionData, getDescriptionData } from 'utils/api/admission-eligibility';
import { Stream } from 'types';

const AdmissionEligibilityPage = ({ data }: IAdmissionEligibilityProps) => {
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
    //       <AdmissionEligibilityComponent data={data} />
    //     </ContainerWrapper>
    //   </Box>
    //   {/* listing page ends here */}
    // </Page>
  );
};

AdmissionEligibilityPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

//API Intergration for serverside redering
export const getServerSideProps: GetServerSideProps = async ({ params, req }: any) => {
  const { ins, name } = params;

  const pageName = 'admission-eligibility';
  const PAGE_PARAM = 'admission';

  const stream = req.headers?.host?.includes(Stream.MEDICAL) ? Stream.MEDICAL : Stream.ENGINEERING;

  const subMenuDataResponse = await getSubMenuData(name, stream);
  const bannerDataResponse = await getBannerData(name, stream);
  const otherCollegeDataResponse = await getOtherCollegeData(name, stream);
  const contentDataResponse = await getDescriptionData(name, stream);
  const admissionDataResponse = await getAdmissionData(name, stream);
  const faqDataResponse = await getFaqData(name, pageName, stream);
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
    otherCollegeData: otherCollegeDataResponse,
    admissionData: admissionDataResponse,
    contentData: contentDataResponse,
    faqData: faqDataResponse,
    metaData: metaDataResponse
  };
  return {
    props: {
      data
    }
  };
};

export default AdmissionEligibilityPage;
