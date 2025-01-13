/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Autocomplete, Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useRouter } from 'next/navigation';

import styles from './scheduleAppointment.module.css';
import { ErrorMessage, ScheduleAppointmentContents } from './constant';

import { getTimeValue, postScheduleTimeData } from 'utils/api/connect-to-mentor';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { ErrorSnackbar, SuccessSnackbar } from 'ui-component/common/snackbar-type';
import useAuth from 'hooks/useAuth';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';
// Add plugins to dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
export interface IScheduleDropdown {
  id: number;
  label: string;
}
export interface IScheduleYourAppointment extends IErrorProps {
  timeData: IScheduleDropdown[];
}
interface FormValues {
  date: Dayjs | null;
  time: {
    id: number;
    label: string;
  };
  message: string;
}
const ScheduleYourAppointment: React.FC<IScheduleYourAppointment> = ({ timeData, hasError }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const [time, setTime] = useState<IScheduleDropdown[]>(timeData);
  const validationSchema = Yup.object({
    date: Yup.date().nullable().required(ErrorMessage.DATE),
    time: Yup.object().shape({
      id: Yup.number().notOneOf([0], ErrorMessage.TIME).required(ErrorMessage.TIME)
    }),
    message: Yup.string().required(ErrorMessage.MESSAGE)
  });
  // For disable a sunday dates
  const isDisabledDate = (date: Dayjs) => {
    return dayjs(date).day() === 0;
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      date: null,
      time: { id: 0, label: '' },
      message: ''
    },
    validationSchema,
    // eslint-disable-next-line prettier/prettier
    onSubmit: async(values,{ resetForm }) => {
      try {
        const { date, time, message } = values;
        const timeRangeString = time.label;
        const [startTime, endTime] = timeRangeString.split(' - ');
        const startDate = dayjs(date).startOf('day');

        const startTimeUTC = startDate
          .set('hour', dayjs(startTime, 'hh.mm A').hour())
          .set('minute', dayjs(startTime, 'hh.mm A').minute())
          .format();
        const endTimeUTC = startDate
          .set('hour', dayjs(endTime, 'hh.mm A').hour())
          .set('minute', dayjs(endTime, 'hh.mm A').minute())
          .format();

        const startTimeIST = dayjs(startTimeUTC).tz('Asia/Kolkata').format();
        const endTimeIST = dayjs(endTimeUTC).tz('Asia/Kolkata').format();

        const postScheduleTime = await postScheduleTimeData(
          String(date),
          time.id,
          message,
          startTimeIST,
          endTimeIST,
          user?.email
        );

        if (postScheduleTime.status) {
          dispatch(openSnackbar(SuccessSnackbar(ScheduleAppointmentContents.SUCCESS_MESSAGE)));
          resetForm();
          router.push('/appointment-details');
        } else {
          dispatch(openSnackbar(ErrorSnackbar(ScheduleAppointmentContents.FAILURE_MESSAGE)));
        }
      } catch (error) {
        dispatch(openSnackbar(ErrorSnackbar(ScheduleAppointmentContents.FAILURE_MESSAGE)));
      }
    }
  });
  const handleDateChange = async (value: any) => {
    if (value) {
      formik.setFieldValue('date', value);
      const result = await getTimeValue(value.toString());
      const filterTime = timeData.filter((obj) => !result.includes(obj.id));
      setTime(filterTime);
    }
  };
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Box className={styles.mainWrapper}>
          <Typography className={styles.heading}>{ScheduleAppointmentContents.HEADING}</Typography>
          <Box component={'form'} noValidate onSubmit={formik.handleSubmit}>
            <Box className={styles.dropdownWrapper}>
              <InputLabel className={styles.formKey} htmlFor="date">
                {ScheduleAppointmentContents.DATE}
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formik.values.date || null}
                  onChange={(value) => handleDateChange(value)}
                  minDate={dayjs()}
                  shouldDisableDate={isDisabledDate}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      background: '#f8fafc !important',
                      border: 'none',
                      '&.Mui-focused fieldset': {
                        border: 'none'
                      }
                    },
                    '& fieldset': {
                      border: 'none',
                      background: 'transparent !important'
                    },
                    '& .MuiIconButton-root': {
                      color: '#1b1b1ba8'
                    }
                  }}
                />
              </LocalizationProvider>
              {formik.touched.date && formik.errors.date && (
                <Typography className={styles.appointmentFormError}>{formik.errors.date}</Typography>
              )}
            </Box>
            <Box className={styles.dropdownWrapper}>
              <InputLabel className={styles.formKey} htmlFor="time">
                {ScheduleAppointmentContents.TIME}
              </InputLabel>
              <Autocomplete
                id={'time'}
                value={formik.values.time}
                options={time}
                disableClearable
                data-test-id="connect-to-mentor-dropdown"
                onChange={(e, newValue) => formik.setFieldValue('time', newValue)}
                fullWidth
                renderInput={(params) => <TextField {...params} placeholder={'Select Your Time'} />}
                noOptionsText={'No available time slots for the selected date'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: '#f8fafc !important',
                    border: 'none',
                    '&.Mui-focused fieldset': {
                      border: 'none'
                    }
                  },
                  '& fieldset': {
                    border: 'none',
                    background: 'transparent !important'
                  }
                }}
              />
              {formik.touched.time && formik.errors.time && (
                <Typography className={styles.appointmentFormError}>{formik.errors.time.id}</Typography>
              )}
            </Box>
            <Box>
              <InputLabel className={styles.formKey} sx={{ marginBottom: '15px !important' }} htmlFor="message">
                {ScheduleAppointmentContents.MESSAGE}
              </InputLabel>
              <TextField
                fullWidth
                multiline
                minRows={6}
                maxRows={7}
                autoFocus
                value={formik.values.message}
                name="message"
                id="message"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: '#F6F7F9 !important',
                    border: 'none',
                    '&.Mui-focused fieldset': {
                      border: 'none'
                    }
                  },
                  '& fieldset': {
                    border: 'none',
                    background: 'transparent !important'
                  },
                  '& .MuiInputBase-input': {
                    background: '#F6F7F9 !important',
                    '&::-webkit-scrollbar': {
                      width: '1px'
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#F6F7F9'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#888',
                      borderRadius: '4px'
                    }
                  }
                }}
                onChange={formik.handleChange}
              />
            </Box>
            {formik.touched.message && formik.errors.message && (
              <Typography className={styles.appointmentFormError}>{formik.errors.message}</Typography>
            )}
            <Button className={styles.SubmitBtn} type="submit">
              {ScheduleAppointmentContents.SUBMIT}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
export default ScheduleYourAppointment;
