import React, { ReactElement } from 'react';

import TermsAndCondition from 'ui-component/static-page/terms-condition';
import Layout from 'layout';
const PaymentPolicies = () => {
  return <TermsAndCondition />;
};
PaymentPolicies.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default PaymentPolicies;
