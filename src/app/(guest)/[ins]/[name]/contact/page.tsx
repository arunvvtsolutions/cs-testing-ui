/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import SubHeader from 'ui-component/subheader';
import ContactComponent from 'ui-component/college-contact-page';
import { getInnerPageData } from 'utils/api/common';
import { getContactPageData } from 'utils/api/contact';
import { Stream } from 'types';
interface IContactParams {
  name: string;
  ins: string;
}

export const generateMetadata = async ({ params }: { params: IContactParams }): Promise<Metadata> => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const PAGE_PARAM = 'contact';
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;
  const metaDataResponse = await getInnerPageData(params.name, PAGE_PARAM, stream);
  return {
    title: metaDataResponse.meta.title,
    description: metaDataResponse.meta.description,
    keywords: metaDataResponse.meta.keywords
  };
};
const ContactPage = async ({ params }: { params: IContactParams }) => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';

  const data = await getContactPageData({ params, domain });

  const isInvalidInstitution = params.ins !== 'college' && params.ins !== 'university';

  const hasNoBannerData =
    !data ||
    !data.bannerData ||
    !data.bannerData.bannerData ||
    (!data.bannerData.bannerData.name && !data.bannerData.hasError);

  if (isInvalidInstitution || hasNoBannerData) notFound();
  return (
    <Box>
      <SubHeader {...data.subMenu} />
      <Box className="containerWrapper">
        <ContactComponent data={data} />
      </Box>
    </Box>
  );
};

export default ContactPage;
