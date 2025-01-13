/* eslint-disable prettier/prettier */
'use client';
import { CSSProperties, useEffect, useState } from 'react';
import { Button, Typography, Box, FormControl } from '@mui/material';
import Image from 'next/image';
import OtpInput from 'react-otp-input';
import { useRouter } from 'next/navigation';

import styles from './OtpVerify.module.css';
import { OptVeriyTitles } from './constant';

import { ContainerWarp } from 'ui-component/home/explore-by-stream/styles';
import { useDispatch, useSelector } from 'store';
import { handlResendOtp } from 'utils/api/authentication';
import useAuth from 'hooks/useAuth';
import { openSnackbar } from 'store/slices/snackbar';
import { ErrorSnackbar } from 'ui-component/common/snackbar-type';

const OtpVerification = () => {
  const { login } = useAuth();
  const router = useRouter()
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(30);
  const [formatedMobileNo, setFormatedMOb] = useState('');
  const signInByMobile = useSelector((state) => state.userAuth.userMobileNo);
  // const router = useRouter();

  const resendOtp = () => {
    setSeconds(5);
    setOtp('');
    handlResendOtp(signInByMobile);
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

  const handleSubmit = async () => {
    if (signInByMobile && otp) {
      try {
        const res = await login(otp, signInByMobile);

        if (res.status !== 1)
          dispatch(openSnackbar(ErrorSnackbar(res.message)));
      } catch (error) {
        dispatch(openSnackbar(ErrorSnackbar(OptVeriyTitles.ERROR_MSG)));
      }
    } else if(!otp) dispatch(openSnackbar(ErrorSnackbar(OptVeriyTitles.OTP_VALIDATION)));
  };

  const inputStyle: CSSProperties = {
    width: '56px',
    height: '56px',
    padding: '16px',
    textAlign: 'center',
    borderRadius: '4px',
    border: '1px solid #E0E0E0',
    background: '#FFFFFF',
    fontSize: '16px',
    color: '#222831',
  };

  if (window.innerWidth <= 600) {
    inputStyle.width = '44px';
    inputStyle.height = '44px';
    inputStyle.padding = '12px';
    inputStyle.fontSize = '16px';
  }

  if (window.innerWidth <= 320) {
    inputStyle.width = '38px';
    inputStyle.height = '38px';
    inputStyle.padding = '10px';
    inputStyle.fontSize = '15px';
  }

  useEffect(() => {
    if (signInByMobile) {
      const mobileNoString = String(signInByMobile);
      const formattedMobileNo = `${mobileNoString.slice(
        0,
        2
      )} ${mobileNoString.slice(2, 4)}XXXXX${mobileNoString.slice(9, 12)}`;
      setFormatedMOb(formattedMobileNo);
    } else if(!signInByMobile) router.back()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInByMobile]);

  return (
    <>
      <ContainerWarp>
        <Box className={styles.OverallBox}>
          <Box className={styles.csLogo}>
            <Image
              src="/assets/images/logo.webp"
              alt="College Suggest"
              width={110}
              height={65}
            />
          </Box>
          <Typography className={styles.otpHeader}>
            {OptVeriyTitles.SIGN_IN_WITH_OTP}
          </Typography>
          <Box className="emptyCard">
            <Typography className={styles.otpSubTitles}>
              {OptVeriyTitles.PLEASE_ENTER_OTP}
            </Typography>
            <Typography className={styles.otpSubTitles}>
              {formatedMobileNo && '+' + formatedMobileNo}
            </Typography>
          </Box>
          <Box className={styles.otpBox}>
            <Typography className={styles.enterOtp}>
              {OptVeriyTitles.ENTER_OTP}
            </Typography>
            <FormControl sx={{ width: '100%' }}>
              <Box className={styles.otpfield}>
                <OtpInput
                  value={otp}
                  onChange={handleInputChange}
                  inputType="number"
                  numInputs={6}
                  renderInput={(props) => (
                    <input {...props} style={inputStyle} />
                  )}
                />
              </Box>
              <Box className={styles.resend}>
                <Button
                  className={styles.customButton}
                  disabled={seconds > 0}
                  onClick={resendOtp}
                >
                  {OptVeriyTitles.RESEND_OTP}
                  <Typography className={styles.otpTimer}>
                    {seconds < 10 ? `0${seconds}` : seconds}s
                  </Typography>
                </Button>
              </Box>
              <Button className={styles.otpButton} onClick={handleSubmit}>
                {OptVeriyTitles.SIGN_IN}
              </Button>
            </FormControl>
          </Box>
        </Box>
      </ContainerWarp>
    </>
  );
};
export default OtpVerification;
