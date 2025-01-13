import { sha256 } from 'node-forge';
import { NextResponse } from 'next/server';

import { BASE_URL } from 'config';
import { IUpdatedPaymentProps } from 'ui-component/dashboard/connect-to-mentor/payment-details';
import { PaymentDetailsContent } from 'ui-component/dashboard/connect-to-mentor/payment-details/constant';
import { getPaymentDetals, phonePePaymentStatusRequest, updatePayment } from 'utils/api/payment';

// PAYMENT CALL BACK HANDLER
export async function POST(req: Request, router: { params: { jwtToken: string } }) {
  try {
    const paymentDetails = await getPaymentDetals(router.params.jwtToken);

    const data = await req.formData();
    const merchantId = data.get(PaymentDetailsContent.MERCHANT_ID);
    const transactionId = data.get(PaymentDetailsContent.TRANSACTION_ID);

    const md = sha256.create();
    const saltKey = process.env.NEXT_PUBLIC_PHONE_PE_SALT_KEY;
    const st = `/pg/v1/status/${merchantId}/${transactionId}${saltKey}`;
    md.update(st, 'utf8');
    const dataSha256 = md.digest().toHex();
    const checksum = `${dataSha256}###${process.env.NEXT_PUBLIC_PHONE_PE_SALT_INDEX}`;

    const response = await phonePePaymentStatusRequest(merchantId, transactionId, checksum);

    const result: IUpdatedPaymentProps = {
      trackingId: response.data.transactionId,
      bankRefNo: response.data.paymentInstrument.bankTransactionId,
      orderStatus: response.data.responseCode,
      failureMessage: !response.success ? response.message : '',
      paymentMode: response.data.paymentInstrument.type,
      billingName: '',
      cancelMessage: !response.success ? response.message : '',
      paymentId: paymentDetails.id,
      paidAmount: response.data.amount,
      otherDetails: JSON.stringify({ ...response.data, csTransactionId: transactionId })
    };
    await updatePayment(result, router.params.jwtToken);
    if (response.code === PaymentDetailsContent.PAYMENT_SUCCESS_STATUS)
      return NextResponse.redirect(`${BASE_URL}/chat-bot`, { status: 301 });
    else return NextResponse.redirect(`${BASE_URL}/payment/fail`, { status: 301 });
  } catch (error) {
    return NextResponse.redirect(`${BASE_URL}/payment/fail`, { status: 301 });
  }
}
