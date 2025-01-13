import React, { ReactElement } from 'react';

import Layout from 'layout';
import Contact from 'ui-component/static-page/contact-us';
const ContactUs = () => {
  return <Contact />;
};

ContactUs.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ContactUs;
