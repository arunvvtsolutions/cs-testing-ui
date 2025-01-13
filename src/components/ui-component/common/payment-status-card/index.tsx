'use client';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from './PaymentStatus.module.css';
import { PaymentStatusContents } from './constant';

interface IPaymentStatusProps {
  image: string;
  testId: string;
  paymentStatus: string;
  paymentStatusDesc?: string;
}
const PaymentStatusCard: React.FC<IPaymentStatusProps> = ({ image, paymentStatus, paymentStatusDesc, testId }) => {
  const router = useRouter();
  return (
    <Box className={styles.paymentContainer} data-test-id={testId}>
      <Box className={styles.paymentWrapper}>
        <Box className={styles.paymentStatusCard}>
          <Box className={styles.paymentImgCard}>
            <Image
              src={image}
              alt={testId}
              width={50}
              height={100}
              className={styles.paymentImg}
              data-test-id={`${testId}-image`}
            />
          </Box>
          <Typography className={styles.paymentText}>{paymentStatus}</Typography>
          {paymentStatusDesc && <Typography className={styles.failDesc}>{paymentStatusDesc}</Typography>}
        </Box>
        <Button
          className={styles.backBtn}
          onClick={() => router.push('/chat-bot')}
          data-test-id={`${testId}-back-button`}
        >
          <ArrowBackIcon className={styles.backText} />
          <Typography className={styles.backText}>{PaymentStatusContents.BACK}</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentStatusCard;
