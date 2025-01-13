'use client';
import React, { useEffect } from 'react';
import { sha256 } from 'node-forge';
import { useRouter, useSearchParams } from 'next/navigation';

import { postPhonePePayment } from 'utils/api/payment';
import { decrypt } from 'utils';
import { JEE_BASE_URL, NEET_BASE_URL } from 'config';
import { paymentData } from 'ui-component/dashboard/connect-to-mentor/payment-details';
import CCAvenue from 'utils/payment';
import { PaymentDetailsContent } from 'ui-component/dashboard/connect-to-mentor/payment-details/constant';
import { EDU_PORT } from 'types/enums';

const IntegrateNeetPhonePe = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const iv = searchParams?.get('iv');
  const encData = searchParams?.get('enc');
  const phonePeHandler = async (
    amount: number,
    coupon: { id: number; amount: number },
    transactionId: string,
    orderId: number,
    phone: number,
    userId: number,
    platForm: string
  ) => {
    try {
      const redirectBaseUrl = platForm === EDU_PORT.JEE ? JEE_BASE_URL : NEET_BASE_URL;
      const payload = {
        merchantId: process.env.NEXT_PUBLIC_PHONE_PE_MERCHANT_ID,
        merchantTransactionId: transactionId,
        merchantUserId: userId,
        merchantOrderId: orderId,
        amount: amount - coupon.amount,
        redirectUrl: `${redirectBaseUrl}/api/payment/${userId}`,
        redirectMode: 'POST',
        callbackUrl: `${redirectBaseUrl}/api/payment/${userId}`,
        mobileNumber: phone,
        paymentInstrument: {
          type: 'PAY_PAGE'
        }
      };
      const dataPayload = JSON.stringify(payload);
      const dataBase64 = Buffer.from(dataPayload).toString('base64');
      const saltKey = process.env.NEXT_PUBLIC_PHONE_PE_SALT_KEY;
      const fullURL = `${dataBase64}/pg/v1/pay${saltKey}`;
      const md = sha256.create();
      md.update(fullURL, 'utf8');
      const dataSha256 = md.digest().toHex();
      const checksum = `${dataSha256}###${process.env.NEXT_PUBLIC_PHONE_PE_SALT_INDEX}`;
      const response = await postPhonePePayment(dataBase64, checksum);

      if (response.success) {
        const redirect = response.data.instrumentResponse.redirectInfo.url;
        router.push(redirect);
      } else {
        router.push(`${NEET_BASE_URL}/payment/failed`);
      }
    } catch (error) {
      router.push(`${NEET_BASE_URL}/payment/failed`);
    }
  };

  const handleCcAvenue = async (
    transationId: string,
    amount: number,
    coupon: { id: number; amount: number },
    phone: number,
    userId: string,
    platForm: string
  ) => {
    const redirectBaseUrl = platForm === EDU_PORT.JEE ? JEE_BASE_URL : NEET_BASE_URL;
    const paymentData: paymentData = {
      merchant_id: process.env.NEXT_PUBLIC_CCAVENUE_MERCHANT_ID || '',
      order_id: transationId,
      amount: amount - coupon.amount,
      currency: 'INR',
      redirect_url: `${redirectBaseUrl}/api/payment/cc-avenue`,
      cancel_url: `${redirectBaseUrl}/api/payment/cc-avenue`,
      merchant_param1: userId,
      merchant_param2: `${phone}`
    };

    const encReq = await CCAvenue.getEncryptedOrder(paymentData);
    const accessCode = process.env.NEXT_PUBLIC_CCAVENUE_ACCESS_CODE;
    // redirection url for ccavenue
    const URL = `${process.env.NEXT_PUBLIC_CCAVENUE_BASE_URL}/transaction/transaction.do/?command=initiateTransaction&merchant_id=${paymentData.merchant_id}&encRequest=${encReq}&access_code=${accessCode}`;
    router.push(URL);
  };

  useEffect(() => {
    const decryptedString = decrypt(encData || '', iv || '', process.env.NEXT_PUBLIC_NEET_PHONE_PE_SECRET || '');

    if (decryptedString) {
      const { userId, amount, phone, transactionId, orderId, paymentType, coupon, platForm } =
        JSON.parse(decryptedString);

      if (paymentType && paymentType.toLowerCase() === PaymentDetailsContent.PHONE_PE.toLowerCase())
        phonePeHandler(amount, coupon || { id: 0, amount: 0 }, transactionId, orderId, phone, userId, platForm);
      else handleCcAvenue(transactionId, amount, coupon, phone, userId, platForm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encData, iv]);

  return <></>;
};

export default IntegrateNeetPhonePe;
