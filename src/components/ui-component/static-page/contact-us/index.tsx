'use client';
import { Box, Button, Divider, TextareaAutosize, Typography } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './contactUs.module.css';
import { ContactUsContent } from './constant';

import CustomTextField from 'ui-component/signup/CustomTextField';
import { ContainerWrapper } from 'ui-component/home/banner-page/styles';

const ContactUs = () => {
  // validation form schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    mobile: Yup.string()
      .max(10, 'Number cannot be more than 10 numbers')
      .min(10, 'Minimum 10 numbers is required')
      .required('Mobile Number is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('message is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      subject: '',
      message: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <ContainerWrapper>
      <Box className={styles.mainContainer}>
        <Box className={styles.titleWraper}>
          <Typography className={styles.title}>{ContactUsContent.TITLE}</Typography>
        </Box>
        <Divider />
        <Box className={styles.descWraper}>
          <Typography className={styles.description}>{ContactUsContent.DESCRIPTION}</Typography>
        </Box>
        <Box className={styles.mailWraper}>
          <Box className={styles.mailItem}>
            <Typography className={styles.contactHeading}>{ContactUsContent.OUR_MAIL}</Typography>
          </Box>
          <Link href={`mailto:${ContactUsContent.CONTACT_MAIL}`} className={styles.contactMail}>
            {ContactUsContent.CONTACT_MAIL}
          </Link>
        </Box>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Box className={styles.getSupportWraper}>
            <Box className={styles.contactHeadingItem}>
              <Typography className={styles.contactHeading}>{ContactUsContent.GET_SUPPORT}</Typography>
            </Box>
            <Box className={styles.textFieldItem}>
              <CustomTextField
                handleChange={formik.handleChange}
                id="name"
                name="name"
                onChangeBlur={formik.handleBlur}
                helperText={formik.touched.name && formik.errors.name}
                placeHolderData="Your Name"
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                type="text"
              />
            </Box>
            <Box className={styles.textFieldItem}>
              <CustomTextField
                id="email"
                name="email"
                value={formik.values.email}
                handleChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChangeBlur={formik.handleBlur}
                placeHolderData="Your Email"
              />
            </Box>
            <Box className={styles.textFieldItem}>
              <CustomTextField
                id="mobile"
                name="mobile"
                value={formik.values.mobile}
                handleChange={formik.handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                type="number"
                onChangeBlur={formik.handleBlur}
                placeHolderData="Your Number"
              />
            </Box>
            <Box className={styles.textFieldItem}>
              <CustomTextField
                id="subject"
                name="subject"
                value={formik.values.subject}
                handleChange={formik.handleChange}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
                type="text"
                onChangeBlur={formik.handleBlur}
                placeHolderData="Subject"
              />
            </Box>
            <Box className={styles.textFieldItem}>
              <TextareaAutosize
                id="message"
                name="message"
                aria-label="textarea"
                placeholder="Write A Message"
                className={styles.autoSizeTextArea}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.message && formik.touched.message && (
                <Typography className={styles.errorText}>{formik.errors.message}</Typography>
              )}
            </Box>
          </Box>
          <Box className={styles.buttonWraper}>
            <Button className={styles.sendButton} type="submit">
              {ContactUsContent.SEND_MESSAGE}
            </Button>
          </Box>
        </form>
      </Box>
    </ContainerWrapper>
  );
};
export default ContactUs;
