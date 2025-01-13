import { Box, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Close } from '@mui/icons-material';

import { ChatSidebarTitle } from './constant';

import CustomizedDialogs from 'ui-component/common/dialog';
import PaymentDetails, { IPricingDetails } from 'ui-component/dashboard/connect-to-mentor/payment-details';

const PaymentModal = ({
  handleClose,
  open,
  paymentDetailsData,
  setPaymentDetails
}: {
  handleClose: () => void;
  open: boolean;
  paymentDetailsData: IPricingDetails[];
  setPaymentDetails: (plans: IPricingDetails[]) => void;
}) => {
  const theme = useTheme();
  return (
    <CustomizedDialogs
      handleClose={handleClose}
      maxWidth="md"
      padding="20px 25px"
      open={open}
      sx={{
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2)
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1)
        },
        '& .MuiPaper-root': {
          borderRadius: '20px',
          maxHeight: '90% !important',
          height: 'auto !important',
          overFlow: 'unset !important',
          overflowY: 'auto !important',
          width: 'calc(95%) !important',
          margin: 'auto',
          padding: '0px !important',
          '&::-webkit-scrollbar': {
            width: '2px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#4a7c6f',
            borderRadius: '4px'
          },
          // position: 'fixed',
          // bottom : '15% !important',
          [theme.breakpoints.down('sm')]: {
            padding: '20px'
          }
        }
      }}
      customizedHeader={
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          position="sticky"
          sx={{ top: 0, zIndex: 10, padding: '20px 25px 15px 20px', backgroundColor: '#FFF' }}
        >
          <Typography fontSize="18px" fontWeight="bold">
            {ChatSidebarTitle.UPGRADE_YOUR_PLAN}
          </Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      }
      bottomCloseIcon={false}
    >
      <PaymentDetails paymentDetailsData={paymentDetailsData} setPaymentDetails={setPaymentDetails} />
    </CustomizedDialogs>
  );
};

export default PaymentModal;
