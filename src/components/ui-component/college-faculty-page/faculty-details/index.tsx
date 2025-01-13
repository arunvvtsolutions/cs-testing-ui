import React from 'react';
import { Box, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import parser from 'html-react-parser';

import styles from './facultyDetails.module.css';
import { FacultyDetailsContent } from './constant';

import MainCard from 'ui-component/MainCard';
import { IErrorProps } from 'types';
import ErrorComponent from 'ui-component/error';

interface IFacultyProps {
  totalFaculty: number;
  totalPhdFaculty: number;
  femaleFaculty: number;
  studentRatio: string;
  facultyDescription: string;
}

export interface IFacultyDataProps extends IErrorProps {
  facultyData: IFacultyProps;
}

const FacultyDetails: React.FC<IFacultyDataProps> = ({ facultyData, hasError }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box className="emptyCard">
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Box data-test-id="faculty-details">
          <Box className="cardHead">
            <Typography className="cg_InnerTitleTxt">{FacultyDetailsContent.TITLE}</Typography>
          </Box>
          <MainCard>
            <Box className={styles.detailsContainer}>
              <Grid container className={styles.detailsWrapper} spacing={2}>
                <Grid item xs={12} md={3} className={styles.itemWraper}>
                  <Typography className={styles.itemValue}>
                    {facultyData.totalFaculty && facultyData.totalFaculty !== 0 ? facultyData.totalFaculty : 'NA'}
                  </Typography>
                  <Typography className={styles.itemKey}>{FacultyDetailsContent.TOTAL_FACULTY}</Typography>
                </Grid>
                <Grid item xs={12} md={3} className={styles.itemWraper}>
                  <Typography className={styles.itemValue}>
                    {facultyData.totalPhdFaculty && facultyData.totalPhdFaculty !== 0
                      ? facultyData.totalPhdFaculty
                      : 'NA'}
                  </Typography>
                  <Typography className={styles.itemKey}>{FacultyDetailsContent.TOTAL_PHD_FACULTY}</Typography>
                </Grid>
                <Grid item xs={12} md={3} className={styles.itemWraper}>
                  <Typography className={styles.itemValue}>
                    {facultyData.femaleFaculty && facultyData.femaleFaculty !== 0 ? facultyData.femaleFaculty : 'NA'}
                  </Typography>
                  <Typography className={styles.itemKey}>{FacultyDetailsContent.FEMALE_FACULTY}</Typography>
                </Grid>
                <Grid item xs={12} md={3} className={styles.itemWraper}>
                  <Typography className={styles.itemValue}>
                    {facultyData.studentRatio &&
                    !facultyData.studentRatio.toLowerCase().includes(FacultyDetailsContent.INFINITY)
                      ? facultyData.studentRatio
                      : 'NA'}
                  </Typography>
                  <Typography className={styles.itemKey}>{FacultyDetailsContent.STUDENT_RATIO}</Typography>
                </Grid>
              </Grid>
              {!isMdDown && <Divider />}
              <Box className={styles.facultyInfoBox}>
                <Typography className="custompara">{parser(facultyData.facultyDescription)}</Typography>
              </Box>
            </Box>
          </MainCard>
        </Box>
      )}
    </Box>
  );
};
export default FacultyDetails;
