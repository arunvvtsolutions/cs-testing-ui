/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { sha256 } from 'node-forge';

import { API_BASE_URL, BASE_URL } from 'config';
import { Api } from 'types/enums';
import {
  FreePlanProps,
  IPricingDetails,
  IUpdatedPaymentProps,
  PaymentDetailProps,
  UpdatePaymentDetails,
  paymentData
} from 'ui-component/dashboard/connect-to-mentor/payment-details';
import { getCookieToken } from 'utils';
import axiosServices from 'utils/axios';
import CCAvenue from 'utils/payment';

export const getPaymentProducts = async () => {
  let data: IPricingDetails[] = [];
  try {
    const res = await axiosServices.get(`${API_BASE_URL}/${Api.paymentGetProduts}`);
    data = res.data;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export const getApplyCouponValue = async (couponName: string, productId: number) => {
  try {
    const res = await axiosServices.get(`${API_BASE_URL}/${Api.paymentApplyCoupon}/${couponName}/${productId}`);
    return await res.data;
  } catch (error) {
    console.log(error);
  }
};

// this is for the phonePe payment request
export const postPhonePePayment = async (dataBase64: string, checksum: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_PHONE_PE_REQUEST_URL}`,
      { request: dataBase64 },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-VERIFY': checksum
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// this is for the payment status
export const phonePePaymentStatusRequest = async (
  merchantId: FormDataEntryValue | null,
  transactionId: FormDataEntryValue | null,
  checksum: string
) => {
  try {
    const options = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_PHONE_PE_STATUS_URL}/${merchantId}/${transactionId}`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': `${merchantId}`
      }
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// initiate payment
export const addPayment = async (
  predictorType: number,
  planAmount: number,
  discountAmount: number,
  totalAmount: number,
  productId: number,
  couponId: number,
  orderId: number,
  tokenCount: number,
  phoneNumber?: string
) => {
  try {
    const response = await axiosServices.post(`${API_BASE_URL}/${Api.addPhonePePayment}`, {
      predictorType,
      planAmount,
      discountAmount,
      totalAmount,
      productId,
      couponId,
      orderId,
      tokenCount,
      phoneNumber
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPaymentDetals = async (jwtToken: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/${Api.getPaymentDetails}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updatePayment = async (
  {
    trackingId,
    bankRefNo,
    orderStatus,
    failureMessage,
    paymentMode,
    billingName,
    cancelMessage,
    paymentId,
    paidAmount,
    otherDetails
  }: IUpdatedPaymentProps,
  jwtToken: string
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${Api.updatePhonePePayment}`,
      {
        trackingId,
        bankRefNo,
        orderStatus,
        failureMessage,
        paymentMode,
        billingName,
        cancelMessage,
        paymentId,
        paidAmount,
        otherDetails
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCCAvenuePayment = async (paymentData: UpdatePaymentDetails) => {
  try {
    await axios.put(
      `${API_BASE_URL}/${Api.updatePayment}`,
      {
        orderId: paymentData.orderId,
        bankRefNo: paymentData.bankRefNo,
        billingName: paymentData.billingName,
        cancelMessage: paymentData.cancelMessage,
        failureMessage: paymentData.failureMessage,
        orderStatus: paymentData.orderStatus,
        paymentId: paymentData.merchant_param1, //here we are passing the payment id which is getting from db
        paymentMode: paymentData.paymentMode,
        phoneNo: paymentData.phoneNo,
        trackingId: paymentData.trackingId,
        paidAmount: paymentData.paidAmount,
        otherDetails: paymentData
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${paymentData.merchant_param2}`
        }
      }
    );
  } catch (error) {
    throw error;
  }
};

export const addCCAvenuePayment = async (paymentData: PaymentDetailProps) => {
  try {
    const result = await axiosServices.post(`${API_BASE_URL}/${Api.addPayment}`, paymentData);
    return result.data;
  } catch (error) {
    throw error;
  }
};

// payment history
export const getPaymentHistory = async () => {
  try {
    return await axiosServices.get(`${API_BASE_URL}/payment/get-payment-history`);
  } catch (error) {
    throw error;
  }
};

// ccavenue
export const ccAvenueHandler = async (
  amount: number,
  coupon: { id: number; amount: number },
  predictorType: number,
  productId: number,
  tokenCount: number,
  transationId: string,
  user: any
) => {
  try {
    const result = await addCCAvenuePayment({
      discountAmount: coupon.amount,
      planAmount: amount,
      predictorType,
      totalAmount: amount - coupon.amount,
      productId: productId,
      couponId: coupon.id,
      tokenCount
    });

    const paymentData: paymentData = {
      merchant_id: process.env.NEXT_PUBLIC_CCAVENUE_MERCHANT_ID || '',
      order_id: transationId,
      amount: amount - coupon.amount,
      currency: 'INR',
      redirect_url: `${BASE_URL}/api/payment/cc-avenue`,
      cancel_url: `${BASE_URL}/api/payment/cc-avenue`,
      merchant_param1: result?.id,
      merchant_param2: JSON.stringify(getCookieToken()),
      merchant_param3: user?.mobile
    };

    const encReq = await CCAvenue.getEncryptedOrder(paymentData);
    const accessCode = process.env.NEXT_PUBLIC_CCAVENUE_ACCESS_CODE;
    // redirection url for ccavenue
    const URL = `${process.env.NEXT_PUBLIC_CCAVENUE_BASE_URL}/transaction/transaction.do/?command=initiateTransaction&merchant_id=${paymentData.merchant_id}&encRequest=${encReq}&access_code=${accessCode}`;
    return URL;
    // router.push(URL);
  } catch (error) {
    throw error;
  }
};

// phonepe
export const phonePeHandler = async (
  amount: number,
  coupon: { id: number; amount: number },
  predictorType: number,
  productId: number,
  tokenCount: number,
  user: any,
  transactionId: string,
  orderId: number
) => {
  try {
    const payload = {
      merchantId: process.env.NEXT_PUBLIC_PHONE_PE_MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: user?.id,
      merchantOrderId: orderId,
      amount: amount - coupon.amount,
      redirectUrl: `${window.origin}/api/payment/${getCookieToken()}`,
      redirectMode: 'POST',
      callbackUrl: `${window.origin}/api/payment/${getCookieToken()}`,
      mobileNumber: user?.mobile,
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
      await addPayment(
        predictorType,
        amount,
        coupon.amount,
        amount - coupon.amount,
        productId,
        coupon.id,
        orderId,
        tokenCount,
        user?.mobile
      );
      const redirect = response.data.instrumentResponse.redirectInfo.url;
      return redirect;
    } else throw Error();
  } catch (error) {
    throw error;
  }
};

export const addFreePlan = async (bodyData: FreePlanProps) => {
  try {
    const result = await axiosServices.post(`${API_BASE_URL}/${Api.addFreePlan}`, bodyData);
    return result.data;
  } catch (error) {
    throw error;
  }
};
