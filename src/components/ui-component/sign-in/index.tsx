'use client';
import { Box } from '@mui/system';
import React from 'react';
import Image from 'next/image';
import { InputLabel, Typography } from '@mui/material';
import Link from 'next/link';
// import OutlinedInput from '@mui/material/OutlinedInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import collegeSuggestLogo from '/public/assets/images/logo.webp';

import { useRouter } from 'next/navigation';

import { SignInContent } from './constant';
import styles from './signIn.module.css';

import { ContainerWrapper } from 'ui-component/home/banner-page/styles';
import CustomTextField from 'ui-component/signup/CustomTextField';
import ContinueBtn from 'ui-component/signup/ContinueBtn';
import { useDispatch } from 'store';
import { getSignIn } from 'utils/api/authentication';
import { openSnackbar } from 'store/slices/snackbar';
import { ErrorSnackbar } from 'ui-component/common/snackbar-type';
import { getLoginNumber } from 'store/slices/auth';
import { SignUpContent } from 'ui-component/signup/constant';

const SignIn = () => {
  const router = useRouter();
  //validation form schema
  const validationSchema = Yup.object({
    userMobile: Yup.string()
      .max(10, 'Number cannot be more than 10 numbers')
      .min(10, 'Minimum 10 numbers is required')
      .required('Mobile Number is required')
  });
  const dispatch = useDispatch();
  //formik value initialize
  const formik = useFormik({
    initialValues: {
      userMobile: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await getSignIn(values.userMobile);

        if (result.status === 1) {
          dispatch(getLoginNumber(String(result.mobileNo)));
          router.push('/verify-otp');
        } else {
          dispatch(openSnackbar(ErrorSnackbar(result.message)));
        }
      } catch (error) {
        dispatch(openSnackbar(ErrorSnackbar(SignInContent.ERROR_MSG)));
      }
    }
  });
  return (
    <>
      <ContainerWrapper>
        <Box className={styles.mainBox}>
          <Box className={styles.logoBox}>
            <Image className={styles.logo} src={collegeSuggestLogo} alt="college Suggest Logo" />
          </Box>
          <Box>
            <Box>
              <Typography className={styles.signInText}>{SignInContent.WELCOME_TEXT}</Typography>
            </Box>
            <Box className={styles.subTextWraper}>
              <Typography className={styles.subText}>
                {SignInContent.ACCOUNT_TEXT}
                <Link className={styles.subUnderline} href="/sign-up">
                  {SignInContent.CREATE_ACCOUNT}
                </Link>
                <Typography className={styles.subText}> {SignInContent.LESS_MINUTE}</Typography>
              </Typography>
            </Box>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Box className={styles.formWraper}>
                <InputLabel className={styles.formLabel} htmlFor="mobile">
                  {SignInContent.MOBILE_LABEL}
                </InputLabel>
                <CustomTextField
                  id="mobile"
                  placeHolderData={SignInContent.PLACEHOLDER}
                  name={SignUpContent.MOBILE_NO_KEY}
                  value={formik.values.userMobile}
                  handleChange={formik.handleChange}
                  error={formik.touched.userMobile && Boolean(formik.errors.userMobile)}
                  helperText={formik.touched.userMobile && formik.errors.userMobile}
                  type="number"
                  onChangeBlur={formik.handleBlur}
                />
              </Box>
              <Box className={styles.continueBtn}>
                <ContinueBtn />
              </Box>
            </form>
            {/* <Box className={styles.signInBtn}>
              <GoogleSignInBtn btnContent={SignInContent.SIGNIN_GOOGLE} />
            </Box> */}
            <Box className={styles.signInWraper}>
              <Typography className={styles.accountText}>
                {SignInContent.ACCOUNT_TEXT}
                <Link className={styles.accountLink} href="/sign-up">
                  {SignInContent.SIGNUP}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </ContainerWrapper>
    </>
  );
};

export default SignIn;
