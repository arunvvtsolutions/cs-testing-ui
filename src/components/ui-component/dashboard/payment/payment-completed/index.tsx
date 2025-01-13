import { PaymentCompletedContents } from './constant';

import PaymentStatusCard from 'ui-component/common/payment-status-card';

const PaymentCompleted = () => {
  return (
    <>
      <PaymentStatusCard
        image="/assets/images/payment/success.svg"
        paymentStatus={PaymentCompletedContents.PAYMENT_COMPLETED_SUCCESSFULLY}
        testId={PaymentCompletedContents.TEST_ID}
      />
    </>
  );
};

export default PaymentCompleted;
