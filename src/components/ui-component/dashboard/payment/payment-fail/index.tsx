import { PaymentFailedContents } from './constant';

import PaymentStatusCard from 'ui-component/common/payment-status-card';

const PaymentFailComponent = () => {
  return (
    <>
      <PaymentStatusCard
        image="/assets/images/payment/fail.svg"
        paymentStatus={PaymentFailedContents.PAYMENT_FAILED}
        testId={PaymentFailedContents.TEST_ID}
        paymentStatusDesc={PaymentFailedContents.PAYMENT_STATUS_DESC}
      />
    </>
  );
};

export default PaymentFailComponent;
