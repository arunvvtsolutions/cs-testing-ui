'use client';
import React from 'react';
import { Box, InputLabel, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import image from '../../../../public/assets/images/logo.webp';

import styles from './signUp.module.css';
import ContinueBtn from './ContinueBtn';
import CustomCheckBox from './CustomCheckBox';
import { SignUpContent } from './constant';
import CustomTextField from './CustomTextField';

import { ContainerWrapper } from 'ui-component/home/explore-career/styles';
import useAuth from 'hooks/useAuth';
import { openSnackbar } from 'store/slices/snackbar';
import { ErrorSnackbar } from 'ui-component/common/snackbar-type';
import { useDispatch } from 'store';

export interface ISignUpProps {
  userName: string;
  userEmail: string;
  userMobile: string;
  category: string[];
}

const SignUp = () => {
  const { register } = useAuth();
  const dispatch = useDispatch();
  //validation form schema
  const validationSchema = Yup.object({
    userName: Yup.string().required('Name is required'),
    userEmail: Yup.string().email('Invalid Email').required('Email is required'),
    userMobile: Yup.string()
      .max(10, 'Number cannot be more than 10 numbers')
      .min(10, 'Minimum 10 numbers is required')
      .required('Mobile Number is required')
    // category: Yup.array().required('Select atleast one category').min(1, 'Select atleast one category')
  });

  //formik value initialize
  const formik = useFormik({
    initialValues: {
      userName: '',
      userEmail: '',
      userMobile: '',
      category: []
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await register(values);

        if (res.status === 0) {
          dispatch(openSnackbar(ErrorSnackbar(res.message)));
        }
      } catch (error) {
        dispatch(openSnackbar(ErrorSnackbar(SignUpContent.ERROR_MSG)));
      }
    }
  });

  // Function to handle category changes
  const handleCategoryChange = (category: string, isChecked: boolean) => {
    const updatedCategories = isChecked
      ? [...formik.values.category, category]
      : formik.values.category.filter((item) => item !== category);

    // Update the Formik form state with the updated categories
    formik.setFieldValue('category', updatedCategories);
  };
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
    formik.handleChange({ ...event, target: { ...event.target, value: filteredValue } });
  };
  // Define the available categories
  const categories: string[] = ['Engineering', 'Medical', 'Dental', 'Architecture', 'Pharmacy'];
  return (
    <ContainerWrapper>
      <Box className={styles.signUpContainer}>
        <Box className={styles.logo}>
          <Image src={image} alt="logo" width={110} height={63} />
        </Box>
        <Box className={styles.headingWraper}>
          <Typography className={styles.heading}>{SignUpContent.HEADING}</Typography>
        </Box>
        <Box className={styles.linkWraper}>
          <Typography className={styles.customplaceholder}>
            {SignUpContent.ACCOUNT}
            <Link href={'/sign-in'} className={styles.signInLink}>
              {SignUpContent.SIGNIN_ACCOUNT}
            </Link>
            <Typography className={styles.customplaceholder}>{SignUpContent.SIGNIN_CONTENT}</Typography>
          </Typography>
        </Box>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Box className={styles.formWraper}>
            <InputLabel className={styles.formLabel} htmlFor="name">
              {SignUpContent.NAME}
            </InputLabel>
            <CustomTextField
              id="userName"
              placeHolderData={SignUpContent.NAME}
              name="userName"
              value={formik.values.userName}
              handleChange={handleUserNameChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              type="text"
              onChangeBlur={formik.handleBlur}
              helperText={formik.touched.userName && formik.errors.userName}
            />
          </Box>
          <Box className={styles.formWraper}>
            <InputLabel className={styles.formLabel} htmlFor="email">
              {SignUpContent.EMAIL}
            </InputLabel>
            <CustomTextField
              id="userEmail"
              placeHolderData={SignUpContent.EMAIL}
              name="userEmail"
              value={formik.values.userEmail}
              handleChange={formik.handleChange}
              error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}
              helperText={formik.touched.userEmail && formik.errors.userEmail}
              onChangeBlur={formik.handleBlur}
            />
          </Box>
          <Box className={styles.formWraper}>
            <InputLabel className={styles.formLabel} htmlFor="mobile">
              {SignUpContent.MOBILE_NUMBER}
            </InputLabel>
            <CustomTextField
              id="userMobile"
              placeHolderData="Enter Mobile Number"
              name="userMobile"
              value={formik.values.userMobile}
              handleChange={formik.handleChange}
              error={formik.touched.userMobile && Boolean(formik.errors.userMobile)}
              helperText={formik.touched.userMobile && formik.errors.userMobile}
              type="number"
              onChangeBlur={formik.handleBlur}
            />
          </Box>
          <Box display="none">
            <Typography className={styles.formLabel}>{SignUpContent.CATEGORY}</Typography>
            <Box className={styles.categoryWraper}>
              {categories &&
                categories.map((category, index) => (
                  <Box key={index} className={styles.categoryItem}>
                    <CustomCheckBox
                      onCheckChange={(isChecked) => handleCategoryChange(category, isChecked)}
                      id={category}
                    />
                    <InputLabel className={styles.categoryText} htmlFor={category}>
                      {category}
                    </InputLabel>
                  </Box>
                ))}
              {formik.errors.category && formik.touched.category && (
                <Typography className={styles.errorText}>{formik.errors.category}</Typography>
              )}
            </Box>
          </Box>
          <Box className={styles.BtnContainer}>
            <ContinueBtn />
          </Box>
        </form>
        {/* <Box className={styles.BtnContainer}>
          <GoogleSignInBtn btnContent={SignUpContent.G_BUTTON_NAME} />
        </Box> */}
        <Box className={styles.signInWraper}>
          <Typography className={styles.accountText}>{SignUpContent.ALREADY_ACCOUNT}</Typography>
          <Link href={'/sign-in'} className="linkTxt">
            {SignUpContent.SIGNIN}
          </Link>
        </Box>
      </Box>
    </ContainerWrapper>
  );
};

export default SignUp;
