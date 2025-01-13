'use client';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import DetailCard from './DetailCard';
import { PaymentDetailsContent } from './constant';

import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { ErrorSnackbar } from 'ui-component/common/snackbar-type';
import { ccAvenueHandler, phonePeHandler } from 'utils/api/payment';
import useAuth from 'hooks/useAuth';
import { ACTIVE_PHONE_PE } from 'config';

export interface IPricingDetails {
  productName: string;
  predictorType: string;
  shortDescription: string;
  amount: number;
  description: string;
  productId: number;
  predictorId: number;
  tokenCount: number;
  examType: string;
  isFreePlanAct: boolean;
  planStaus: 0 | 1;
  freePlanUsed?: boolean;
}

export interface IPaymentProps {
  jee?: IPricingDetails;
  neet?: IPricingDetails;
}

export interface IUpdatedPaymentProps {
  trackingId: FormDataEntryValue | null;
  bankRefNo: number;
  orderStatus: number;
  failureMessage: string;
  paymentMode: string;
  billingName: string;
  cancelMessage: string;
  paymentId: string;
  paidAmount: number;
  otherDetails: string;
}

export interface IPackageDetails {
  paymentDetailsData: IPricingDetails[];
  setPaymentDetails: (plans: IPricingDetails[]) => void;
}

export type paymentData = {
  merchant_id: string;
  order_id: string;
  amount: number;
  currency: string;
  redirect_url: string;
  cancel_url: string;
  merchant_param1?: string;
  merchant_param2?: string;
  merchant_param3?: string;
};

export type PaymentDetailProps = {
  predictorType: number;
  planAmount: number;
  discountAmount: number;
  totalAmount: number;
  productId: number;
  couponId: number;
  tokenCount: number;
};

export type UpdatePaymentDetails = {
  orderId: number;
  trackingId: number;
  bankRefNo: number;
  orderStatus: string;
  failureMessage: string;
  paymentMode: string;
  billingName: string;
  cancelMessage: string;
  phoneNo: number;
  paymentId: string;
  statusMessage?: string;
  merchant_param1?: string;
  merchant_param2?: string;
  paidAmount: number;
};

export type FreePlanProps = {
  productId: number;
  predictortype: number;
  planAmount: number;
  totalAmount: number;
  paid_amount: number;
  order_id: number;
  tokenCount: number;
};

const PaymentDetails: React.FC<IPackageDetails> = ({ paymentDetailsData, setPaymentDetails }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();

  // ccavenue
  const paymentHanlder = async (
    amount: number,
    coupon: { id: number; amount: number },
    predictorType: number,
    productId: number,
    tokenCount: number
  ) => {
    try {
      let url = '';
      const transationId = `CS-${uuidv4().substring(0, 35)}`;
      const orderId = Math.floor(Math.random() * 99999) + 10000;

      if (!ACTIVE_PHONE_PE) {
        url = await ccAvenueHandler(amount, coupon, predictorType, productId, tokenCount, transationId, user);
      } else {
        url = await phonePeHandler(amount, coupon, predictorType, productId, tokenCount, user, transationId, orderId);
      }
      router.push(url);
    } catch (error) {
      dispatch(openSnackbar(ErrorSnackbar(PaymentDetailsContent.PAYMENT_ERROR_MESSAGE)));
    }
  };
  return (
    <Box>
      {/* <Box data-test-id="payment-details-title">
        <Typography className={`dashBoard_h6 ${styles.title}`}>{PaymentDetailsContent.TITLE}</Typography>
      </Box> */}
      <Grid container spacing={2} justifyContent={'center'} mb={1}>
        {/* <Grid item sm={12} md={6} lg={6} data-test-id="payment-details-jee" display="flex" justifyContent="center">
          <DetailCard detailsData={paymentDetailsData.jee} handleClick={handlePayment} />
        </Grid> */}
        {paymentDetailsData.map((payment, index) => {
          return (
            <Grid
              item
              sm={12}
              md={6}
              lg={6}
              data-test-id="payment-details-neet"
              display="flex"
              justifyContent="center"
              key={index}
            >
              <DetailCard
                detailsData={payment}
                bgColorActive={index % 2 !== 0}
                planDetails={paymentDetailsData}
                handleClick={paymentHanlder}
                setPaymentDetails={setPaymentDetails}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
export default PaymentDetails;
