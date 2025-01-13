import { NextResponse } from 'next/server';

import { CCAvenueConstants } from '../../../../constants';

import { BASE_URL } from 'config';
import CCAvenue from 'utils/payment';
import { updateCCAvenuePayment } from 'utils/api/payment';

export async function POST(req: Request, res: Response) {
  try {
    const formData = await req.formData();
    const encResp = formData.get('encResp');

    if (encResp) {
      const result = CCAvenue.redirectResponseToJson(encResp);

      // here we are updating the order data,
      // and for the jwt token we are passing as param into ccavenue and
      // taking it from here because this is a server side api
      await updateCCAvenuePayment({
        orderId: result.order_id,
        bankRefNo: result.bank_ref_no,
        billingName: result.billing_name,
        cancelMessage: result.order_status !== CCAvenueConstants.SUCCESS ? result.status_message : '',
        failureMessage: result.failure_message,
        orderStatus: result.order_status,
        paymentId: result.merchant_param1,
        paymentMode: result.payment_mode,
        trackingId: result.tracking_id,
        paidAmount: result.mer_amount,
        merchant_param1: result.merchant_param1,
        merchant_param2: result.merchant_param2,
        phoneNo: result.merchant_param3
      });

      if (result.order_status === CCAvenueConstants.SUCCESS) {
        return NextResponse.redirect(`${BASE_URL}/payment/success`, { status: 301 });
      }
    }
    return NextResponse.redirect(`${BASE_URL}/payment/fail`, { status: 301 });
  } catch (error) {
    return NextResponse.redirect(`${BASE_URL}/payment/fail`, { status: 301 });
  }
}
