import React, { FC, MouseEventHandler, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { AuthenticationConstants } from '../../../../constants';

import styles from './style.module.css';
import { ProfileContent } from './constant';
const VerifyOtpModal = dynamic(() => import('./VerifyOtpModal'));

import { handleNumericInputChange } from 'utils';
import useAuth from 'hooks/useAuth';
import { verifyMobileNumber } from 'utils/api/common';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { ErrorSnackbar } from 'ui-component/common/snackbar-type';

interface IProfileProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  fileInputRef: React.LegacyRef<HTMLInputElement> | undefined;
  verifiedNo: boolean;
  setVerifiedNo: (verify: boolean) => void;
  handleFileClick: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IStreamProps {
  label: string;
  name: string;
}

export const subStreams = [
  { name: 'Engineering', label: 'engineering' },
  { name: 'Architecture', label: 'architecture' },
  { name: 'Medical', label: 'medical' },
  { name: 'Pharmacy', label: 'pharmacy' },
  { name: 'Dental', label: 'dental' }
];
const ProfileForm: FC<IProfileProps> = ({
  formik,
  handleFileClick,
  fileInputRef,
  handleFileUpload,
  setVerifiedNo,
  verifiedNo
}) => {
  const theme = useTheme();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [newMobileNO, setNewMobileNo] = useState('');
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [subStream, setSubStream] = useState(subStreams);
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const { MOBILENUMBERPREFIX } = AuthenticationConstants;
  // radio button style
  const radioStyle = {
    '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)': {
      color: '#0B6049'
    },
    '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
      color: '#0B6049'
    }
  };

  const handlSelect = (newValue: IStreamProps[]) => {
    setSubStream(() => [...subStreams.filter((st) => !newValue.some((value) => value.label.includes(st.label)))]);
    formik.setFieldValue('stream', newValue);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Regex to allow only alphabets and spaces
    const regex = /^[A-Za-z ]*$/;

    if (regex.test(e.target.value) || e.target.value === '') {
      formik.handleChange(e);
    }
  };

  // for verify mobile no
  const handleOpenVerifyModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      setVerifiedNo(false);
      user?.mobile && verifyMobileNumber(user?.mobile, MOBILENUMBERPREFIX + formik.values.mobile);
      setOpenOtpModal(true);
    } catch (error) {
      formik.setFieldValue('mobile', user?.mobile?.slice(2));
      dispatch(openSnackbar(ErrorSnackbar(ProfileContent.OTP_ERROR_MESSAGE)));
    }
  };

  const handleCloseVerifyModal = () => {
    formik.setFieldValue('mobile', user?.mobile?.slice(2));
    setOpenOtpModal(false);
    setVerifiedNo(true);
  };

  useEffect(() => {
    if (formik.values.mobile !== user?.mobile?.slice(2)) setVerifiedNo(false);
    else setVerifiedNo(true);
    setNewMobileNo(formik.values.mobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.mobile, user?.mobile]);

  return (
    <>
      <Grid container spacing={2} data-test-id="dashboard-profile-form">
        <Grid container spacing={2} ml={0} mb={2}>
          <Grid item xs={12} md={6}>
            <Typography className={`linkTxt ${styles.textFieldLabel}`}>{ProfileContent.FIRST_NAME}</Typography>
            <FormControl fullWidth>
              <TextField
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                FormHelperTextProps={{
                  className: styles.errorText
                }}
                onChange={handleNameChange}
                value={formik.values.fullName}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                onBlur={formik.handleBlur}
                size="small"
                fullWidth
                className={styles.customplaceholder}
                InputProps={{
                  classes: {
                    input: styles['custom-input'],
                    notchedOutline: styles['custom-fieldset']
                  }
                }}
                data-test-id="dashboard-profile-form-firstname"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className={`linkTxt ${styles.textFieldLabel}`}>{ProfileContent.LAST_NAME}</Typography>
            <FormControl fullWidth>
              <TextField
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                FormHelperTextProps={{
                  className: styles.errorText
                }}
                onChange={handleNameChange}
                value={formik.values.lastName}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                onBlur={formik.handleBlur}
                size="small"
                fullWidth
                className={styles.customplaceholder}
                InputProps={{
                  classes: {
                    input: styles['custom-input'],
                    notchedOutline: styles['custom-fieldset']
                  }
                }}
                data-test-id="dashboard-profile-form-lastname"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} ml={0} mb={2}>
          <Grid item xs={12} md={6}>
            <Typography className={`linkTxt ${styles.textFieldLabel}`}>{ProfileContent.EMAIL_ID}</Typography>
            <FormControl fullWidth>
              <TextField
                id="emailId"
                name="emailId"
                placeholder="Email Id"
                onChange={formik.handleChange}
                value={formik.values.emailId}
                error={formik.touched.emailId && Boolean(formik.errors.emailId)}
                helperText={formik.touched.emailId && formik.errors.emailId}
                onBlur={formik.handleBlur}
                FormHelperTextProps={{
                  className: styles.errorText
                }}
                size="small"
                fullWidth
                className={styles.customplaceholder}
                InputProps={{
                  classes: {
                    input: styles['custom-input'],
                    notchedOutline: styles['custom-fieldset']
                  }
                }}
                data-test-id="dashboard-profile-form-emailid"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className={`linkTxt ${styles.textFieldLabel}`}>{ProfileContent.DOB}</Typography>
            <FormControl fullWidth>
              <TextField
                id="dob"
                name="dob"
                placeholder="01-02-2002"
                onChange={formik.handleChange}
                value={formik.values.dob}
                onBlur={formik.handleBlur}
                size="small"
                type="date"
                fullWidth
                className={styles.customplaceholder}
                InputProps={{
                  classes: {
                    input: styles['custom-input'],
                    notchedOutline: styles['custom-fieldset']
                  }
                }}
                data-test-id="dashboard-profile-form-dateofbirth"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} ml={0} mb={2}>
          <Grid item xs={12} md={6}>
            <Typography className={`linkTxt ${styles.textFieldLabel}`}>{ProfileContent.MOBILE_NUMBER}</Typography>
            <FormControl fullWidth>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <TextField
                  id="mobile"
                  name="mobile"
                  placeholder="Mobile"
                  onChange={(e) => handleNumericInputChange(e, formik.handleChange)}
                  value={formik.values.mobile}
                  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                  onBlur={formik.handleBlur}
                  FormHelperTextProps={{
                    className: styles.errorText
                  }}
                  size="small"
                  fullWidth
                  className={styles.customplaceholder}
                  InputProps={{
                    classes: {
                      input: styles['custom-input'],
                      notchedOutline: styles['custom-fieldset']
                    }
                  }}
                  data-test-id="dashboard-profile-form-mobile"
                />
                <Button
                  type="button"
                  onClick={handleOpenVerifyModal}
                  disabled={!newMobileNO || newMobileNO === user?.mobile?.slice(2) || !(newMobileNO.length === 10)}
                  variant="contained"
                  sx={{
                    mx: 1,
                    backgroundColor: '#0b6049',
                    color: '#FFFF',
                    padding: '10px 8px !important',
                    '&:hover': {
                      backgroundColor: '#0b6049'
                    }
                  }}
                >
                  {ProfileContent.VERIFY_MOB}
                </Button>
              </Box>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormLabel className={`linkTxt ${styles.textFieldLabel}`}>{ProfileContent.GENDER}</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="gender"
              className={styles.radioGroup}
              onChange={formik.handleChange}
              value={formik.values.gender}
              onBlur={formik.handleBlur}
              data-test-id="dashboard-profile-form-gender"
            >
              <FormControlLabel
                value="female"
                control={<Radio sx={radioStyle} id="female" data-test-id="dashboard-profile-form-gender-female" />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<Radio sx={radioStyle} id="male" data-test-id="dashboard-profile-form-gender-male" />}
                label="Male"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid container spacing={2} ml={0} mb={2}>
          <Grid item xs={12} md={6}>
            <Typography className={`linkTxt ${styles.textFieldLabel}`}>{ProfileContent.POSTCODE}</Typography>
            <FormControl fullWidth>
              <TextField
                name="postCode"
                placeholder="Post Code"
                value={formik.values.postCode}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                size="small"
                fullWidth
                className={styles.customplaceholder}
                InputProps={{
                  classes: {
                    input: styles['custom-input'],
                    notchedOutline: styles['custom-fieldset']
                  }
                }}
                data-test-id="dashboard-profile-form-postcode"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className={`linkTxt ${styles.textFieldLabel}`}>{ProfileContent.CITY}</Typography>
            <FormControl fullWidth>
              <TextField
                name="city"
                id="city"
                placeholder="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
                fullWidth
                className={styles.customplaceholder}
                InputProps={{
                  classes: {
                    input: styles['custom-input'],
                    notchedOutline: styles['custom-fieldset']
                  }
                }}
                data-test-id="dashboard-profile-form-city"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} ml={0} mb={2}>
          <Grid item xs={12} md={6}>
            <Typography className={`linkTxt ${styles.textFieldLabel}`}>{ProfileContent.AREA}</Typography>
            <FormControl fullWidth>
              <TextField
                name="area"
                id="area"
                placeholder="Area"
                value={formik.values.area}
                onChange={formik.handleChange}
                size="small"
                fullWidth
                className={styles.customplaceholder}
                InputProps={{
                  classes: {
                    input: styles['custom-input'],
                    notchedOutline: styles['custom-fieldset']
                  }
                }}
                data-test-id="dashboard-profile-form-area"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className={`linkTxt ${styles.textFieldLabel}`}>{ProfileContent.STREAM}</Typography>
            <FormControl fullWidth>
              <Autocomplete
                multiple
                id="stream"
                options={subStream}
                getOptionLabel={(option) => option.name}
                value={formik.values.stream}
                noOptionsText={'No streams'}
                filterSelectedOptions
                onChange={(e, newValue) => {
                  handlSelect(newValue);
                }}
                data-test-id="dashboard-profile-form-stream"
                renderInput={(params) => (
                  <TextField
                    className={styles.customplaceholder}
                    error={formik.touched.stream && Boolean(formik.errors.stream)}
                    helperText={formik.touched.stream && formik.errors.stream}
                    onBlur={formik.handleBlur}
                    {...params}
                    sx={{
                      fieldset: {
                        border: 'none',
                        padding: '0'
                      },
                      '.MuiOutlinedInput-root': {
                        padding: '6.5px !important'
                      },
                      '.MuiChip-root': {
                        marginRight: '15px'
                      }
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          {!isMdDown && (
            <Grid item xs={12} md={6} mb={2}>
              <Box className={styles.fileUploadField}>
                <Button
                  startIcon={
                    <Image src="/assets/images/icons/uploadIcon.svg" alt="upload-image" width={20} height={20} />
                  }
                  variant="contained"
                  className={styles.uploadButton}
                  onClick={handleFileClick}
                  data-test-id="dashboard-upload-profile-image-desk"
                >
                  {ProfileContent.UPLOAD_FILE}
                </Button>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  id="upload"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
      {openOtpModal && (
        <VerifyOtpModal
          handleClose={handleCloseVerifyModal}
          open={openOtpModal}
          setOpen={setOpenOtpModal}
          newNumber={formik.values.mobile}
          setVerifyMobile={setVerifiedNo}
        />
      )}
    </>
  );
};
export default ProfileForm;
