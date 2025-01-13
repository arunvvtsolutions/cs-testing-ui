'use client';
import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PaymentCard = ({
  image,
  subTitle,
  title,
  buttonColor,
  buttonTitle
}: {
  image: 'success_default' | 'failed_default';
  title: string;
  subTitle: string;
  buttonTitle: string;
  buttonColor: string;
}) => {
  const router = useRouter();
  return (
    <Box height="90vh" width="100%" display="flex" justifyContent="center" alignItems="center">
      <Stack flexDirection="column" gap={2} justifyContent="center" alignItems="center">
        <Box>
          <Image src={`/assets/images/payment/${image}.webp`} alt="payment success" width="100" height={100} />
        </Box>
        <Box>
          <Typography fontSize="25px" fontWeight={600} textAlign="center">
            {title}
          </Typography>
          <Typography fontSize="15px" fontWeight={400} textAlign="center" sx={{ marginTop: '2px' }}>
            {subTitle}
          </Typography>
        </Box>
        <Button
          onClick={() => router.push('/chat-bot')}
          sx={{
            backgroundColor: `${buttonColor} !important`,
            borderRadius: '6px',
            height: '48px',
            width: '70%',
            color: '#FFF',
            '.hover': {
              backgroundColor: '#0B6049 !important',
              borderRadius: '8px'
            }
          }}
        >
          {buttonTitle}
        </Button>
      </Stack>
    </Box>
  );
};

export default PaymentCard;
