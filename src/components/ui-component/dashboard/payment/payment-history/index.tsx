'use client';
import { Stack, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';
import PaymentTable from './payment-table';
import data from './data.json';
import { PAYMENT_HISTORY_CONSTANTS } from './constant';

import { getPaymentHistory } from 'utils/api/payment';
interface IPaymentHistoryProps {
  productName: string;
  amount: string;
  discount: string;
  date: string;
  status: string;
  trackingId: string;
}
const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState<IPaymentHistoryProps[]>([]);

  useEffect(() => {
    const paymentHistoryData = async () => {
      const result = await getPaymentHistory();
      setPaymentHistory(result.data);
    };
    paymentHistoryData();
  }, []);
  return (
    <Stack direction="column" width="100%">
      {data.length > 0 ? (
        <>
          <Box width="100%">
            <Typography className={styles.paymentHistoryTitle}>{PAYMENT_HISTORY_CONSTANTS.History_TITLE}</Typography>
          </Box>
          <Box mt={3}>
            <PaymentTable paymentHistory={paymentHistory} />
          </Box>
        </>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
          <Typography textAlign="center" fontSize="23px" fontWeight="600">
            {PAYMENT_HISTORY_CONSTANTS.NO_HISTORY}
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default PaymentHistory;
