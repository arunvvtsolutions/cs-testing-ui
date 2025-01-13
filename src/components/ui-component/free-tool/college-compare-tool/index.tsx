'use client';
import CircleIcon from '@mui/icons-material/Circle';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormControl, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from 'next/navigation';

import { ReadMoreOrLess } from '../../../../constants';

import styles from './CollegeCompareTool.module.css';
import DropDown from './Dropdown';
import { CollegeCompareToolTitles } from './constant';

import { IErrorProps } from 'types';
import { ENGINEERING_BASE_URL } from 'config';

const listedData = [
  CollegeCompareToolTitles.LISTED_DATA_1,
  CollegeCompareToolTitles.LISTED_DATA_2,
  CollegeCompareToolTitles.LISTED_DATA_3
];

export interface ICompareNameProps {
  collegeId: number;
  name: string;
  shortUrl: string;
  shortName: string;
}

interface IFormValueProps {
  [key: string]: string;
}

export interface IcompareToolProps extends IErrorProps {
  comparedToolData: ICompareNameProps[];
  onChange?: (shortName: string) => void;
}

const CollegeCompareTool: React.FC<IcompareToolProps> = ({ comparedToolData }) => {
  const theme = useTheme();
  const router = useRouter();
  const [openReadMore, setOpenReadMore] = useState(false);
  const [selectedColleges, setSelectedColleges] = useState({
    firstSelectedValue: '',
    secondSelectedValue: '',
    thirdSelectedValue: ''
  });

  const isMdBreakpoint = useMediaQuery(theme.breakpoints.down('lg'));
  //validation form schema
  const validationSchema = Yup.object({
    firstSelectedCollege: Yup.string().required('Select first college'),
    twoSelectedCollege: Yup.string().required('Select second college'),
    threeSelectedCollege: Yup.string().required('Select third college')
  });

  //formik value initialize
  const formik = useFormik({
    initialValues: {
      firstSelectedCollege: '',
      twoSelectedCollege: '',
      threeSelectedCollege: ''
    },
    validationSchema,
    onSubmit: (values: IFormValueProps) => {
      router.push(
        `${ENGINEERING_BASE_URL}/colleges-comparison/${values.firstSelectedCollege}/${values.twoSelectedCollege}/${values.threeSelectedCollege}`
      );
    },
    initialTouched: {
      firstSelectedCollege: false,
      twoSelectedCollege: false,
      threeSelectedCollege: false
    }
  });
  const handleClick = () => {
    setOpenReadMore((prevValue) => !prevValue);
  };

  const handleFirstDropDownChange = (shortName: string) => {
    setSelectedColleges({
      ...selectedColleges,
      firstSelectedValue: shortName
    });
    formik.setFieldValue('firstSelectedCollege', shortName);
  };

  const handleSecondDropDownChange = (shortName: string) => {
    setSelectedColleges({
      ...selectedColleges,
      secondSelectedValue: shortName
    });
    formik.setFieldValue('twoSelectedCollege', shortName);
  };

  const handleThirdDropDownChange = (shortName: string) => {
    setSelectedColleges({
      ...selectedColleges,
      thirdSelectedValue: shortName
    });
    formik.setFieldValue('threeSelectedCollege', shortName);
  };

  useEffect(() => {
    if (isMdBreakpoint) formik.setFieldValue('threeSelectedCollege', false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdBreakpoint]);

  return (
    <>
      <Box className={styles.compareMainWrapper}>
        <FormControl component="form" onSubmit={formik.handleSubmit}>
          <Grid className={styles.container} container spacing={1}>
            <Grid item lg={7} md={12} sm={12} xs={12}>
              <Box className={styles.compareContainer}>
                <Box className={styles.compareTitleContainer}>
                  <Typography className={styles.compareTitle}>{CollegeCompareToolTitles.COLLEGE_COMPARISON}</Typography>
                  <Typography className={styles.compareSubTitle}>
                    {CollegeCompareToolTitles.COLLEGE_COMPARISON_DISCP}
                  </Typography>
                  <Box className={styles.readMoreWrapper}>
                    <Button onClick={handleClick} className={styles.readMoreBtn}>
                      {openReadMore ? ReadMoreOrLess.READ_LESS : ReadMoreOrLess.READ_MORE}
                      <KeyboardArrowDownIcon
                        className={`${styles.readMoreIcon} ${openReadMore ? styles.rotate : ''}`}
                      />
                    </Button>
                  </Box>
                </Box>
                <Box
                  className={styles.listedCard}
                  style={isMdBreakpoint ? (openReadMore ? { display: 'block' } : { display: 'none' }) : undefined}
                >
                  {listedData.map((item, index) => (
                    <Box className={styles.listedUi} key={index}>
                      <CircleIcon className={styles.circleIcon} />
                      <Typography className={styles.listedLi}>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={5} md={12} sm={12} xs={12}>
              <Box className={styles.predictCard}>
                <Typography className={styles.predictTitle}>{CollegeCompareToolTitles.COMPARE_COLLEGES}</Typography>
                <Box className={styles.mgBm2}>
                  <Typography className={styles.mgBm2}>{CollegeCompareToolTitles.INSTITUTE_NAME}</Typography>
                  <DropDown
                    comparedToolData={comparedToolData}
                    onChange={handleFirstDropDownChange}
                    selectedColleges={Object.values(selectedColleges)}
                  />
                  {formik.touched.firstSelectedCollege && (
                    <Typography className={styles.errorText}>{formik.errors.firstSelectedCollege}</Typography>
                  )}
                </Box>

                <Box className={styles.mgBm2}>
                  <Typography className={styles.mgBm2}>{CollegeCompareToolTitles.INSTITUTE_NAME}</Typography>
                  <DropDown
                    comparedToolData={comparedToolData}
                    onChange={handleSecondDropDownChange}
                    selectedColleges={Object.values(selectedColleges)}
                  />
                  {formik.touched.twoSelectedCollege && (
                    <Typography className={styles.errorText}>{formik.errors.twoSelectedCollege}</Typography>
                  )}
                </Box>
                {!isMdBreakpoint && (
                  <Box className={styles.mgBm2}>
                    <Typography className={styles.mgBm2}>{CollegeCompareToolTitles.INSTITUTE_NAME}</Typography>
                    <DropDown
                      comparedToolData={comparedToolData}
                      onChange={handleThirdDropDownChange}
                      selectedColleges={Object.values(selectedColleges)}
                    />
                    {formik.touched.threeSelectedCollege && (
                      <Typography className={styles.errorText}>{formik.errors.threeSelectedCollege}</Typography>
                    )}
                  </Box>
                )}
                <Button className={styles.predictButton} type="submit">
                  {CollegeCompareToolTitles.SUBMIT}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </>
  );
};

export default CollegeCompareTool;
