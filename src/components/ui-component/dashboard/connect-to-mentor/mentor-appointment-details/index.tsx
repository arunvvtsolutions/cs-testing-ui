'use client';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';

import styles from './appointment.module.css';
import { AppointmentDetailsContents } from './constant';

import { getScheduledDetails } from 'utils/api/connect-to-mentor';

interface IAppointmentDetailsProps {
  date: string;
  time: string;
  gmeet: string;
  status: number;
}

const AppointmentDetails = () => {
  const [appointmentDate, setAppointmentData] = useState<IAppointmentDetailsProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getScheduledDetails();
      setAppointmentData(data);
    };
    fetchData();
  }, []);

  const validateDateAndTime = (date: string, timeValue: string) => {
    const endTime = timeValue.split('-')[1].trim();
    const [time, period] = endTime.split(' ');
    const [hours, minutes] = time.split('.');
    let hour24Format = parseInt(hours, 10);
    if (period.toLowerCase() === 'pm' && hour24Format !== 12) {
      hour24Format += 12;
    }
    const isoDate = new Date(`${date}T${hour24Format.toString().padStart(2, '0')}:${minutes}:00`);
    const currentDateTime = new Date();

    return isoDate < currentDateTime ? 'Completed' : 'Upcoming';
  };

  const formatMeetingLink = (gmeetLink: string) => {
    const meetingId = gmeetLink.split('/').pop();
    return `meet.google.com/${meetingId}`;
  };

  return (
    <>
      {appointmentDate.length > 0 ? (
        <Box>
          <Typography className={styles.heading}>{AppointmentDetailsContents.HEADING}</Typography>
          {appointmentDate.map((data: IAppointmentDetailsProps, index) => (
            <Box className={styles.detailsWrapper} key={index}>
              <Grid container>
                <Grid item xs={3} md={3} lg={2} className={styles.itemWrapper}>
                  <Typography className={styles.detailKey}>{AppointmentDetailsContents.DATE}</Typography>
                  <Typography className={styles.detailValue}>{data.date}</Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  md={4}
                  lg={4}
                  className={styles.itemWrapper}
                  sx={{ paddingLeft: { xs: '15px', sm: '15px', lg: '40px' } }}
                >
                  <Typography className={styles.detailKey}>{AppointmentDetailsContents.TIME}</Typography>
                  <Typography className={styles.detailValue}>{data.time}</Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                  md={3}
                  lg={3}
                  className={styles.itemWrapper}
                  sx={{
                    paddingLeft: { xs: '20px', sm: '20px', lg: '40px' },
                    borderRight: {
                      xs: 'none !important',
                      md: '1px solid #3c3c4340 !important',
                      lg: '1px solid #3c3c4340 !important'
                    },
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
                >
                  <Typography className={styles.detailKey}>{AppointmentDetailsContents.LINK}</Typography>
                  <Link href={data.gmeet} className={styles.meetLink} target="_blank">
                    {formatMeetingLink(data.gmeet)}
                  </Link>
                </Grid>
                <Grid item xs={12} md={3} lg={3} className={styles.statusWrapper}>
                  <Box
                    className={styles.statusItemWrapper}
                    sx={{
                      background: validateDateAndTime(data.date, data.time) === 'Upcoming' ? '#cbf7da33' : '#FFE5D533'
                    }}
                  >
                    <Typography
                      className={
                        validateDateAndTime(data.date, data.time) === 'Upcoming'
                          ? styles.statusUpComing
                          : styles.statusUpCompleted
                      }
                    >
                      {validateDateAndTime(data.date, data.time)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      ) : (
        <Box className={styles.messageWrapper}>
          <Typography className={styles.heading}>{AppointmentDetailsContents.EMPTY_MESSAGE}</Typography>
        </Box>
      )}
    </>
  );
};

export default AppointmentDetails;
