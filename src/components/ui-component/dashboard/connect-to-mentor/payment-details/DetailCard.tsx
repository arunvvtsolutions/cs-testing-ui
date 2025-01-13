'use client';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import parser from 'html-react-parser';

import styles from './paymentDetail.module.css';
import { ButtonStatustypeConstants, PaymentDetailsContent } from './constant';

import { IPricingDetails } from '.';

import { addFreePlan, getApplyCouponValue } from 'utils/api/payment';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { ErrorSnackbar, SuccessSnackbar } from 'ui-component/common/snackbar-type';
import { getTokenDetailsSuccess, openPaymentModal } from 'store/slices/chat-bot';

interface IDetailCardProps {
  bgColorActive?: boolean;
  detailsData?: IPricingDetails;
  planDetails?: IPricingDetails[];
  setPaymentDetails: (plan: IPricingDetails[]) => void;
  handleClick: (
    amount: number,
    coupon: { id: number; amount: number },
    predictorType: number,
    productId: number,
    tokenCount: number
  ) => void;
}

const DetailCard: React.FC<IDetailCardProps> = ({
  detailsData,
  bgColorActive,
  planDetails,
  handleClick,
  setPaymentDetails
}) => {
  const dispatch = useDispatch();
  //NOTE:Apply coupen function below
  const [couponValue, setCouponValue] = useState({ id: 0, amount: 0 });
  const [coupon, setCoupon] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [buttonStatus, setButtonStatus] = useState<
    | ButtonStatustypeConstants.ACTIVATED
    | ButtonStatustypeConstants.CANNOT_ACTIVATE
    | ButtonStatustypeConstants.NOT_ACTIVATE
    | false
  >(false);

  const handleCoupen = async () => {
    const res = await getApplyCouponValue(coupon, detailsData?.productId || 0);

    if (res.status == true) {
      setCouponValue(res.data);
    } else {
      dispatch(openSnackbar(ErrorSnackbar(PaymentDetailsContent.NOVAILD_COUPON)));
    }
  };

  const handleFreePlan = async (productId: number) => {
    try {
      if (detailsData) {
        setPaymentProcessing(true);
        const res = await addFreePlan({
          order_id: 0,
          paid_amount: detailsData.amount,
          planAmount: detailsData.amount,
          predictortype: detailsData.predictorId,
          productId: detailsData.productId,
          tokenCount: detailsData.tokenCount,
          totalAmount: detailsData.amount
        });

        if (!res.status) {
          dispatch(openSnackbar(ErrorSnackbar(PaymentDetailsContent.FREE_PLAN_USED)));
        } else {
          dispatch(
            getTokenDetailsSuccess({
              totalTokens: detailsData?.tokenCount,
              tokenCount: detailsData?.tokenCount
            })
          );
          if (planDetails) {
            const plans = planDetails.map((plan) => {
              return {
                ...plan,
                freePlanUsed: true,
                isFreePlanAct: true
              };
            });
            setPaymentDetails(plans);
          }
          setTimeout(() => {
            dispatch(openSnackbar(SuccessSnackbar(PaymentDetailsContent.FREE_PLAN_ACTIVATED)));
            setPaymentProcessing(false);
            setButtonStatus(ButtonStatustypeConstants.ACTIVATED);
            dispatch(openPaymentModal(false));
          }, 1000);
        }
      }
    } catch (error) {
      setPaymentProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (detailsData) {
      await handleClick(
        detailsData.amount,
        couponValue,
        detailsData.predictorId,
        detailsData.productId,
        detailsData.tokenCount
      );
      // setButtonStatus(ButtonStatustypeConstants.CANNOT_ACTIVATE);
    }
  };

  useEffect(() => {
    if (detailsData) {
      if (detailsData.isFreePlanAct && detailsData.planStaus === 0 && detailsData.freePlanUsed)
        setButtonStatus(ButtonStatustypeConstants.ACTIVATED);
      else if (!detailsData.freePlanUsed && detailsData.isFreePlanAct && detailsData.planStaus === 0)
        setButtonStatus(ButtonStatustypeConstants.CANNOT_ACTIVATE);
      else setButtonStatus(false);
    }
  }, [detailsData]);

  return (
    <>
      {detailsData && (
        <Box className={bgColorActive ? styles.activeMainSection : styles.mainSection} data-test-id="payment-details">
          <Box margin={'auto'}>
            <Box className={styles.headingWrapper}>
              <Typography className={styles.heading}>{detailsData.shortDescription}</Typography>
              <Typography className={bgColorActive ? styles.activeExam : styles.examType}>
                {detailsData.predictorType}
              </Typography>
            </Box>
            <Box className={styles.payRupeesWrapper}>
              <Typography
                className={couponValue.amount > 0 ? `${styles.payRupees} ${styles.discount}` : styles.payRupees}
              >
                {PaymentDetailsContent.RUPPES_SYMBOL} {detailsData.amount}
              </Typography>
              {couponValue.amount > 0 && (
                <Typography className={styles.payRupees}>
                  {PaymentDetailsContent.RUPPES_SYMBOL}{' '}
                  {couponValue ? detailsData.amount - couponValue.amount : detailsData.amount}
                </Typography>
              )}
            </Box>
            <Box className={styles.packageWrapper}>
              <Typography className={styles.packageHeading}>{detailsData.productName}</Typography>
              <Box className={styles.packageContent}>{detailsData.description && parser(detailsData.description)}</Box>
            </Box>

            {detailsData.amount ? (
              <Box>
                <form method="#" className={styles.coupen_form}>
                  <input
                    type="text"
                    placeholder={PaymentDetailsContent.APPLY_COUPEN}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <Button onClick={handleCoupen} className={styles.applyBtn}>
                    {PaymentDetailsContent.APPLY}
                  </Button>
                </form>
              </Box>
            ) : (
              <></>
            )}

            <Button
              disabled={
                buttonStatus === ButtonStatustypeConstants.ACTIVATED ||
                buttonStatus === ButtonStatustypeConstants.CANNOT_ACTIVATE
              }
              className={bgColorActive ? styles.activeOrderBtn : styles.orderBtn}
              sx={{
                backgroundColor:
                  buttonStatus === ButtonStatustypeConstants.ACTIVATED ||
                  buttonStatus === ButtonStatustypeConstants.CANNOT_ACTIVATE
                    ? 'rgba(11, 96, 73, 0.1) !important'
                    : ''
              }}
              data-test-id="payment-order-btn"
              onClick={() => (detailsData.amount ? handlePayment() : handleFreePlan(detailsData.productId))}
            >
              {buttonStatus === ButtonStatustypeConstants.ACTIVATED
                ? PaymentDetailsContent.ACTIVATED
                : buttonStatus === ButtonStatustypeConstants.CANNOT_ACTIVATE
                  ? PaymentDetailsContent.IN_PAID_PLAN
                  : paymentProcessing
                    ? PaymentDetailsContent.PROCESSING
                    : PaymentDetailsContent.ORDER}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
export default DetailCard;
