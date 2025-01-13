import React from 'react';

import PaymentCard from 'ui-component/common/payment-card';
import { PaymentStatus } from 'ui-component/common/payment-card/constant';

const PaymentFailed = () => {
  return (
    <PaymentCard
      buttonColor="#FF5150"
      buttonTitle={PaymentStatus.RETRY}
      image="failed_default"
      subTitle={PaymentStatus.FAILED_SUB_TITLE}
      title={PaymentStatus.FAILED_TITLE}
    />
  );
};

export default PaymentFailed;
