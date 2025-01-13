/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button, Chip, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import capitalize from 'lodash/capitalize';

import styles from './style.module.css';
import { CollegeContent } from './constant';

import { getShortListedCollegeData, postShortlistedData } from 'utils/api/student-dashboard';
import useAuth from 'hooks/useAuth';
import { Stream, SubStream, streamCode } from 'types';
import { ENGINEERING_BASE_URL, MEDICAL_BASE_URL } from 'config';

interface ICollegeProps {
  collegeId: number;
  collegeName: string;
  location: string;
  collegeImg: string;
  collegeType: string;
  estdYear: string;
  campusArea: string;
  insType: string;
  shortUrl: string;
  stream: string;
  type: number;
}
export interface IShortListedCollegeProps {
  shortListedColleges: ICollegeProps[];
}
const ShortlistedColleges = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [collegeList, setCollegeList] = useState<ICollegeProps[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRemove = async (collegeId: number, shortUrl: string, stream: string) => {
    const colleges = collegeList.filter((college) => college.collegeId !== collegeId);
    setCollegeList(colleges);
    if (user?.id) {
      const shortlistedData = { studentId: user.id, shortUrl, stream };
      await postShortlistedData(shortlistedData);
    }
  };

  useEffect(() => {
    const fetchShortlistedData = async () => {
      const studentId = user?.id;
      const data = await getShortListedCollegeData(studentId);
      setCollegeList(data);
      setLoading(false);
    };
    fetchShortlistedData();
  }, []);
  return (
    <Grid container spacing={2} maxWidth="843px" data-test-id="dashboard-shortlisted-colleges">
      <Grid item xs={12}>
        <Typography component="h3" className={styles.title} data-test-id="dashboard-shortlisted-colleges-title">
          {CollegeContent.TITLE}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {collegeList.length > 0 &&
          !loading &&
          collegeList.map((college, index) => {
            const isEngineeringOrArchitecture =
              college.stream?.includes(Stream.ENGINEERING) || college.stream?.includes(SubStream.ARCHITECTURE);
            // Determine the base URL
            const baseUrl = isEngineeringOrArchitecture ? ENGINEERING_BASE_URL : MEDICAL_BASE_URL;
            const linkUrl = `${college.insType}/${college.shortUrl}/overview`;
            return (
              <Box
                className={styles.compareBox}
                key={index}
                data-test-id={`dashboard-shortlisted-colleges-content-${index}`}
              >
                <Grid container direction="row" spacing={2} px={2}>
                  <Grid xs={12} md={10} item display="flex" justifyContent="start" alignItems="start" gap={2}>
                    <Box className={styles.clgImg}>
                      <Image
                        src={`/assets/images/cs/${college.collegeImg}`}
                        width={50}
                        height={50}
                        alt={college.collegeName}
                        data-test-id={`dashboard-shortlisted-colleges-image-${index}`}
                      />
                    </Box>
                    <Box>
                      <Typography
                        className={styles.collegeName}
                        data-test-id={`dashboard-shortlisted-colleges-title-${index}`}
                      >
                        {college.collegeName}
                      </Typography>
                      <Typography className={styles.locationName}>
                        {CollegeContent.COLLEGE_LOCATION} {college.location}
                      </Typography>
                      {isMdDown && (
                        <Typography color="#202124" fontWeight={400} fontSize="12px" mt={1}>
                          {capitalize(streamCode[college.type])}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  {!isMdDown && (
                    <Grid item sx={{ marginLeft: 'auto !important' }}>
                      <Typography component="li" color="#202124" fontWeight={400} fontSize="14px">
                        {capitalize(streamCode[college.type])}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
                <Grid container className={styles.chipGrid}>
                  <Grid item className={styles.chipSubGrid}>
                    <Chip className={styles.chip} label={college.collegeType} />
                  </Grid>
                  <Grid item className={styles.chipSubGrid}>
                    <Chip label={`${CollegeContent.ESTD} ${college.estdYear}`} className={styles.chip} />
                  </Grid>
                  <Grid item className={styles.chipSubGrid}>
                    <Chip label={`${CollegeContent.CAMPUS} ${college.campusArea}`} className={styles.chip} />
                  </Grid>
                </Grid>
                <Grid container direction="row" className={styles.bottonGridContainer}>
                  <Grid item xs={6} className={`${styles.bottonGrid} ${styles.buttonBorder}  ${styles.br}`}>
                    <Button
                      className={styles.removeButton}
                      onClick={() => handleRemove(college.collegeId, college.shortUrl, college.stream)}
                      data-test-id={`dashboard-shortlisted-colleges-removebutton-${index}`}
                    >
                      <Image
                        src={'/assets/images/icons/deleteIcon.svg'}
                        alt="remove-icon"
                        width={20}
                        height={20}
                        data-test-id={`dashboard-shortlisted-colleges-removeimage-${index}`}
                      />
                      <Typography className={styles.buttonText}>{CollegeContent.REMOVE}</Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={6} className={styles.bottonGrid}>
                    <Link key={college.collegeId} href={`${baseUrl}/${linkUrl}`}>
                      <Button
                        className={styles.showMoreButton}
                        data-test-id={`dashboard-shortlisted-colleges-showmorebutton-${index}`}
                      >
                        <Image
                          src={'/assets/images/icons/showMoreIcon.svg'}
                          alt="remove-icon"
                          width={20}
                          height={20}
                          data-test-id={`dashboard-shortlisted-colleges-showmoreimage-${index}`}
                        />
                        <Typography className={styles.showMorebuttonText}>{CollegeContent.SHOWMORE}</Typography>
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        {collegeList.length === 0 && !loading && (
          <Typography className={styles.noShortlistedColleges} data-test-id="no-shortlisted-colleges">
            {CollegeContent.NO_COLLEGES_FOUND}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};
export default ShortlistedColleges;
