/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import capitalize from 'lodash/capitalize';

import styles from './style.module.css';
import { ProfileContent } from './constant';
import ProfileForm, { IStreamProps, subStreams } from './profileForm';

import { ErrorSnackbar, SuccessSnackbar } from 'ui-component/common/snackbar-type';
import { getStudentProfileData, postStudentProfileData, postStudentProfileUpload } from 'utils/api/student-dashboard';
import { API_BASE_URL } from 'config';
import useAuth from 'hooks/useAuth';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { getUserData } from 'utils/api/common';
import { replaceSpecialChar } from 'utils';
export interface IProfileContent {
  firstName: string;
  lastName: string;
  emailId: string;
  dob: string;
  mobileNumber: string;
  gender: string;
  postCode: string;
  city: string;
  area: string;
  stream: string;
  image?: string;
}

const ProfileDetails = () => {
  const theme = useTheme();
  const { user, updateProfile } = useAuth();

  const [profileData, setProfileData] = useState<IProfileContent>({
    firstName: '',
    lastName: '',
    emailId: '',
    dob: '',
    mobileNumber: '',
    gender: '',
    postCode: '',
    city: '',
    area: '',
    stream: '',
    image: ''
  });
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userImgPrv, setUserImgPrev] = useState<string>('');
  const [verifiedNo, setVerifiedNo] = useState(true);
  const [fullNameTxt, setFullNameTxt] = useState('');
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  // validation
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    emailId: Yup.string().email('Invalid Email').required('Email Id is required'),
    mobile: Yup.string()
      .max(10, 'Number cannot be more than 10 numbers')
      .min(10, 'Minimum 10 numbers is required')
      .required('Mobile Number is required'),
    stream: Yup.array().min(1, 'Need to select atleast One').required('Need atleast one category')
  });

  //formik value initialize
  const formik = useFormik({
    initialValues: {
      fullName: profileData.firstName,
      lastName: profileData.lastName,
      emailId: profileData.emailId,
      mobile: profileData.mobileNumber,
      gender: profileData.gender,
      dob: profileData.dob?.split('-').reverse().join('-'),
      postCode: profileData.postCode,
      city: profileData.city,
      area: profileData.area,
      stream: [] as IStreamProps[]
    },
    validationSchema,
    onSubmit: async (values) => {
      const stream = values.stream.map((st) => st.label);
      const formattedDob = values.dob?.split('-').reverse().join('-');
      const studentProfileData = {
        studentId: user?.id,
        ...values,
        mobile: `91${values.mobile}`,
        image: userImgPrv,
        stream: stream.join(','),
        dob: formattedDob
      };

      if (verifiedNo) {
        const res = await postStudentProfileData(studentProfileData);

        if (res) {
          try {
            const userData = await getUserData();
            updateProfile({ ...user, ...userData, image: userImgPrv });
            setFullNameTxt(`${capitalize(values.fullName)} ${capitalize(values.lastName)}`);
            dispatch(openSnackbar(SuccessSnackbar(ProfileContent.SUCCESS_MESSAGE)));
          } catch (error) {
            dispatch(openSnackbar(ErrorSnackbar(ProfileContent.ERROR_MESSAGE)));
          }
        } else {
          dispatch(openSnackbar(ErrorSnackbar(ProfileContent.ERROR_MESSAGE)));
        }
      } else dispatch(openSnackbar(ErrorSnackbar(ProfileContent.MOBILE_VERIFICATION_ERROR)));
    }
  });

  // file click
  const handleFileClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };
  // file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append('file', files[0]);
      const upload = await postStudentProfileUpload(formData);

      if (upload.success == true) {
        setUserImgPrev(URL.createObjectURL(files[0]));
      } else {
        dispatch(openSnackbar(ErrorSnackbar(ProfileContent.UPLOADE_IMAGE_MESSAGE)));
      }
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const studentId = user?.id;
      const data = await getStudentProfileData(studentId);
      setProfileData({ ...data });
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const streams = profileData.stream?.toLowerCase().split(',') || [profileData.stream?.toLowerCase()];
    const values = subStreams.filter((value) =>
      streams.some((stream) => replaceSpecialChar(stream).includes(replaceSpecialChar(value.label)))
    );

    const mobileNo = profileData.mobileNumber?.substring(2);
    formik.setValues({
      fullName: profileData.firstName,
      lastName: profileData.lastName,
      emailId: profileData.emailId,
      mobile: mobileNo,
      gender: profileData.gender,
      dob: profileData.dob?.split('-').reverse().join('-'),
      postCode: profileData.postCode,
      city: profileData.city,
      area: profileData.area,
      stream: values
    });
    setFullNameTxt(`${capitalize(profileData.firstName)} ${capitalize(profileData.lastName)}`);
  }, [profileData]);
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        maxWidth={'843px'}
        data-test-id="dashboard-profile"
        className={styles.formContainer}
      >
        <Grid item xs={12} className={styles.titleGrid}>
          {isMdDown ? (
            <>
              <Stack
                direction="column"
                spacing={2}
                alignItems="center"
                justifyContent="center"
                className={styles.profileView}
                onClick={handleFileClick}
                data-test-id="dashboard-upload-profile-image-mob"
              >
                <input
                  type="file"
                  style={{ display: 'none' }}
                  id="upload"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <Avatar
                  alt="Profile picture"
                  data-test-id="dashboard-upload-profile-image-avatar"
                  src={userImgPrv ? userImgPrv : `${API_BASE_URL}/uploads/profile/${profileData.image}`}
                  className={styles.avatar}
                >
                  {profileData?.firstName && capitalize(profileData.firstName[0])}
                </Avatar>
                <Box className={styles.uploadFileImage}>
                  <Image
                    src="/assets/images/icons/cameraIcon.svg"
                    alt="camera-Icon"
                    width={20}
                    height={20}
                    data-test-id="dashboard-profile-image-mob"
                  />
                </Box>
                <Typography className={styles.userName}>{fullNameTxt}</Typography>
              </Stack>
            </>
          ) : (
            <>
              <Typography className={`dashBoard_h6 ${styles.title}`}>{ProfileContent.PROFILE_TITLE}</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  alt="Profile picture"
                  src={userImgPrv ? userImgPrv : `${API_BASE_URL}/uploads/profile/${profileData.image}`}
                  data-test-id="dashboard-profile-image-desk"
                >
                  {profileData.firstName && capitalize(profileData.firstName[0])}
                </Avatar>
                <Typography className={styles.userName}>{fullNameTxt}</Typography>
              </Stack>
            </>
          )}
        </Grid>
        <Grid item xs={12} className={styles.formGrid}>
          <ProfileForm
            formik={formik}
            handleFileClick={handleFileClick}
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
            setVerifiedNo={setVerifiedNo}
            verifiedNo={verifiedNo}
          />
        </Grid>
        <Grid item xs={12} className={styles.buttonGrid}>
          <Button
            variant="contained"
            className={styles.uploadButton}
            type="submit"
            data-test-id="dashboard-update-profile"
          >
            {ProfileContent.UPDATE_PROFILE}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProfileDetails;
