import React from 'react';

import PaymentCard from 'ui-component/common/payment-card';
import { PaymentStatus } from 'ui-component/common/payment-card/constant';

const PaymentSuccess = () => {
  return (
    <PaymentCard
      buttonColor="#0B6049"
      buttonTitle={PaymentStatus.START_YOUR_CHAT}
      image="success_default"
      subTitle={PaymentStatus.SUCCESS_SUB_TITLE}
      title={PaymentStatus.SUCCESS_TITLE}
    />
  );
};

export default PaymentSuccess;
