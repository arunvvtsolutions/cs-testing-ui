import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import styles from '../terms-condition/TermsandCondition.module.css';

import { PaymentCancellationContants } from './constant';

import { BASE_URL } from 'config';

const PaymentCancellation = () => {
  return (
    <Box className="containerWrapper" data-test-id="payment-cancellation-policy">
      {/* Payment cancellation policy */}
      <Box className={styles.overallBox}>
        <Box className={styles.staticCard}>
          <Box className={styles.titleHead}>
            <Typography className={styles.staticTitle}>{PaymentCancellationContants.PRIVACY_POLICY}</Typography>
          </Box>
          {/* introduction */}
          <Box className={styles.subBox}>
            <Typography className={styles.staticSubTitle}>{PaymentCancellationContants.INTRODUCTION}</Typography>
            <Typography className={styles.staticDiscp}>
              {PaymentCancellationContants.INTRODUCTION_DISCP}
              <Link href={`${BASE_URL}`} className={styles.websiteUrl}>
                {PaymentCancellationContants.WEBSITE}
              </Link>
              <span>{PaymentCancellationContants.INTRODUCTION_SUB_DISCP}</span>
            </Typography>
          </Box>
          {/*Cancellation*/}
          <Box className={styles.subBox}>
            <Typography className={styles.staticSubTitle}>{PaymentCancellationContants.CANCELLATION_INFO}</Typography>
            <Typography className={styles.staticDiscp}>
              {PaymentCancellationContants.CANCELLATION_INFO_DISCP}
            </Typography>
          </Box>
          {/*Payment method*/}
          <Box className={styles.subBox}>
            <Typography className={styles.staticSubTitle}>{PaymentCancellationContants.PAYMENT_METHOD}</Typography>
            <Typography className={styles.staticDiscp}>{PaymentCancellationContants.PAYMENT_METHOD_DECS}</Typography>
          </Box>
          {/*Data Security*/}
          <Box className={styles.subBox}>
            <Typography className={styles.staticSubTitle}>{PaymentCancellationContants.DATA_SECURITY}</Typography>
            <Typography className={styles.staticDiscp}>{PaymentCancellationContants.DATA_SECURITY_DECS}</Typography>
          </Box>
          {/*Contact Us*/}
          <Box className={styles.subBox}>
            <Typography className={styles.staticSubTitle}>{PaymentCancellationContants.CONTACT_US}</Typography>
            <Typography className={styles.staticDiscp}>
              {PaymentCancellationContants.CONTACT_US_DECS}
              <Link href={`mailto:${PaymentCancellationContants.SUPPORT}`} className={styles.websiteUrl}>
                {PaymentCancellationContants.SUPPORT}
              </Link>
            </Typography>
          </Box>
          {/*Amendments to the Policy*/}
          <Box className={styles.subBox}>
            <Typography className={styles.staticSubTitle}>{PaymentCancellationContants.AMENDMENTS_POLICY}</Typography>
            <Typography className={styles.staticDiscp}>{PaymentCancellationContants.AMENDMENTS_POLICY_DESC}</Typography>
            <Typography className={styles.staticDiscp}>
              {PaymentCancellationContants.AMENDMENTS_POLICY_SUB_DESC}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default PaymentCancellation;
