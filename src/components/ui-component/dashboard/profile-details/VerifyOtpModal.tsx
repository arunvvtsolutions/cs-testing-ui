/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, FormControl, Typography } from '@mui/material';
import React, { CSSProperties, useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';

import styles from './style.module.css';
import { ProfileContent } from './constant';

import CustomizedDialogs from 'ui-component/common/dialog';
import { handlResendOtp, handlSubmitOtp } from 'utils/api/authentication';
import useAuth from 'hooks/useAuth';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { ErrorSnackbar, SuccessSnackbar } from 'ui-component/common/snackbar-type';

const VerifyOtpModal = ({
  open,
  handleClose,
  newNumber,
  setOpen,
  setVerifyMobile
}: {
  open: boolean;
  newNumber: string;
  setVerifyMobile: (verify: boolean) => void;
  setOpen: (open: boolean) => void;
  handleClose: () => void;
}) => {
  const { user } = useAuth();
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(30);
  const dispatch = useDispatch();

  const resendOtp = () => {
    setSeconds(5);
    setOtp('');
    handlResendOtp(newNumber);
  };
  //For Resend Timing
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) setSeconds(seconds - 1);
      else if (seconds === 0) clearInterval(interval);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleInputChange = (value: string) => {
    if (!/\D/g.test(value)) {
      const numericValue = value.replace(/\D/g, '');
      setOtp(numericValue);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (user?.mobile) {
        const result = await handlSubmitOtp(otp, user?.mobile);

        if (result.status === 0) {
          dispatch(openSnackbar(ErrorSnackbar(ProfileContent.VERIFY_MOB_ERROR)));
          setVerifyMobile(false);
        } else {
          dispatch(openSnackbar(SuccessSnackbar(ProfileContent.VERIFY_MOB_SUCCESS)));
          setOpen(false);
          setVerifyMobile(true);
        }
      }
    } catch (error) {
      dispatch(openSnackbar(ErrorSnackbar(ProfileContent.OTP_ERROR_MESSAGE)));
    }
  };

  const inputStyle: CSSProperties = {
    width: '50px',
    height: '50px',
    padding: '16px',
    textAlign: 'center',
    borderRadius: '4px',
    border: '1px solid #E0E0E0',
    background: '#FFFFFF',
    fontSize: '16px',
    color: '#222831'
  };

  if (window.innerWidth <= 600) {
    inputStyle.width = '44px';
    inputStyle.height = '44px';
    inputStyle.padding = '12px';
    inputStyle.fontSize = '16px';
  }

  if (window.innerWidth <= 320) {
    inputStyle.width = '33px';
    inputStyle.height = '33px';
    inputStyle.padding = '5px';
    inputStyle.fontSize = '13px';
  }
  return (
    <CustomizedDialogs
      handleClose={handleClose}
      open={open}
      maxWidth={'xs'}
      title={<Typography className={styles.modalTitle}>Verify OTP</Typography>}
    >
      <FormControl sx={{ width: '100%' }}>
        <Box className={styles.otpfield}>
          <OTPInput
            value={otp}
            onChange={handleInputChange}
            inputType="number"
            numInputs={6}
            renderInput={(props) => <input {...props} style={inputStyle} />}
          />
        </Box>
        <Box className={styles.resend}>
          <Button className={styles.customButton} disabled={seconds > 0} onClick={resendOtp}>
            {ProfileContent.RESEND_OTP}
            <Typography className={styles.otpTimer}>{seconds < 10 ? `0${seconds}` : seconds}s</Typography>
          </Button>
        </Box>
        <Button className={styles.otpButton} onClick={handleVerifyOtp}>
          {ProfileContent.VERIFY_MOB}
        </Button>
      </FormControl>
    </CustomizedDialogs>
  );
};

export default VerifyOtpModal;
