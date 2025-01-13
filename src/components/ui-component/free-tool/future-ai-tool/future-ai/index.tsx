import CircleIcon from '@mui/icons-material/Circle';
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation

// eslint-disable-next-line import/order
import { ReadMoreOrLess } from '../../../../../constants';
// import { IResultDataProps } from '../result-info';

import { IResultDataProps } from '../result-info';

import styles from './FutureAiTool.module.css';
import DropDown from './Dropdown';
import { CollegeCompareToolTitles } from './constant';

import { IDropDownDataProps, IErrorProps } from 'types';

const listedData = [
  CollegeCompareToolTitles.LISTED_DATA_1,
  CollegeCompareToolTitles.LISTED_DATA_2,
  CollegeCompareToolTitles.LISTED_DATA_3
];

export interface ICompareNameProps {
  id: number;
  collegeName: string;
  shortName: string;
}

interface ICasteProps {
  casteId: number;
  casteName: string;
  courseId: number | null;
  collegeId: number | null;
}

interface ICourseProps {
  courseId: number;
  courseName: string;
  collegeId: number;
}

export interface ICompareProps {
  collegeData: ICompareNameProps[];
  course: ICourseProps[];
  caste: ICasteProps[];
}
export interface IFutureAiDataStoreProps extends IcompareToolProps {
  setSelectedCollege: (e: IDropDownDataProps) => void;
  setSelectedCourse: (e: IDropDownDataProps) => void;
  setSelectedSeat: (e: IDropDownDataProps) => void;
  selectedCollege: IDropDownDataProps;
  selectedCourse: IDropDownDataProps;
  selectedSeat: IDropDownDataProps;
  setResultedData: (data: IResultDataProps) => void;
}
export interface IcompareToolProps extends IErrorProps {
  comparedToolData: ICompareProps;
}

const FutureAiTool: React.FC<IFutureAiDataStoreProps> = ({
  comparedToolData,
  setSelectedCollege,
  setSelectedCourse,
  setSelectedSeat,
  selectedCollege,
  selectedCourse,
  selectedSeat,
  setResultedData
}) => {
  const theme = useTheme();
  const [openReadMore, setOpenReadMore] = useState(false);
  const [collegeData, setCollegeData] = useState<IDropDownDataProps[]>([]);
  const [courseData, setCourseData] = useState<IDropDownDataProps[]>([]);
  const [seatData, setSeatData] = useState<IDropDownDataProps[]>([]);

  const isMdBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
  const handleClick = () => {
    setOpenReadMore((prevValue) => !prevValue);
  };

  //formik value initialize
  const formik = useFormik({
    initialValues: {
      collegeId: 0,
      courseId: 0,
      seatId: 0
    },
    // //validation form schema
    validationSchema: Yup.object({
      collegeId: Yup.number().notOneOf([0], 'College Name is required').required('College Name is required'),
      courseId: Yup.number().notOneOf([0], 'Course Name is required').required('Course name is required'),
      seatId: Yup.number().notOneOf([0], 'Seat type is required').required('Seat type is required')
    }),
    onSubmit: async (values) => {
      const cutoffData = async () => {
        const response = await fetch(
          `/api/future-ai?collegeId=${values.collegeId}&courseId=${values.courseId}&seat=${values.seatId}`
        );

        if (response.ok) {
          const data = await response.json();
          const result = data.result;
          setResultedData({
            resultInfoData: {
              collegeName: data.collegeName,
              courseName: data.courseName,
              result
            }
          });
        }
      };
      cutoffData();
    },
    initialTouched: {
      collegeId: false,
      courseId: false,
      seatId: false
    }
  });

  // for the course filter from the college dropdown
  const handleCollegeChange = (collegeData: IDropDownDataProps) => {
    const cData = comparedToolData.course
      .filter((course) => course.collegeId === collegeData.id)
      .map((course) => {
        return {
          id: course.courseId,
          label: course.courseName,
          dependId: course.collegeId
        };
      });
    setCourseData(cData);
    setSelectedCollege(collegeData);
    setSelectedCourse({ id: 0, label: '' });
    setSelectedSeat({ id: 0, label: '' });
    formik.setTouched({ ...formik.touched, courseId: false, seatId: false });
    formik.setValues({ collegeId: collegeData.id, courseId: 0, seatId: 0 });
  };

  // for the seat type from the course filter
  const handleCourseChange = (courseData: IDropDownDataProps) => {
    const sData = comparedToolData.caste
      .filter((caste) => caste.courseId === courseData.id && caste.collegeId === courseData.dependId)
      .map((caste) => {
        return { id: caste.casteId, label: caste.casteName };
      });
    setSeatData(sData);
    setSelectedCourse(courseData);
    setSelectedSeat({ id: 0, label: '' });
    formik.setTouched({ ...formik.touched, seatId: false });
    formik.setValues({ ...formik.values, courseId: courseData.id, seatId: 0 });
  };

  // handle change of the seat dropdown
  const handleSeatTypeChange = (seatData: IDropDownDataProps) => {
    setSelectedSeat(seatData);
    formik.setValues({ ...formik.values, seatId: seatData.id });
  };

  // changing the data structure for the dropdown
  useEffect(() => {
    if (comparedToolData.collegeData) {
      const data = comparedToolData.collegeData.map((college) => {
        return {
          id: college.id,
          label: college.collegeName
        };
      });
      setCollegeData(data);
    }
  }, [comparedToolData.collegeData]);

  return (
    <>
      <Box className={styles.compareMainWrapper}>
        <Grid
          container
          className={styles.container}
          spacing={4}
          component="form"
          onSubmit={formik.handleSubmit}
          justifyContent="center"
          alignContent="center"
        >
          {/* Left side content */}
          <Grid item md={12} lg={6} className={`${styles.compareContainer} ${styles.gridBox}`}>
            <Box className={styles.compareTitleContainer}>
              <Typography className={styles.compareTitle}>{CollegeCompareToolTitles.COLLEGE_COMPARISON}</Typography>
              <Typography className={styles.compareSubTitle}>
                {CollegeCompareToolTitles.COLLEGE_COMPARISON_DISCP}
              </Typography>
              <Box className={styles.readMoreWrapper}>
                <Button onClick={handleClick} className={styles.readMoreBtn}>
                  {openReadMore ? ReadMoreOrLess.READ_LESS : ReadMoreOrLess.READ_MORE}
                  <KeyboardArrowDownIcon className={`${styles.readMoreIcon} ${openReadMore ? styles.rotate : ''}`} />
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
          </Grid>
          {/* Right side content */}
          <Grid
            item
            md={12}
            lg={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            className={styles.gridBox}
          >
            <Box className={styles.predictCard}>
              <Typography className={styles.predictTitle}>
                {CollegeCompareToolTitles.PREDICT_YOUR_FUTURE_COLLEGE}
              </Typography>

              <Box className={styles.mgBm1}>
                <Typography className={styles.mgBm2}>{CollegeCompareToolTitles.INSTITUTE_NAME}</Typography>
                <DropDown
                  comparedToolData={collegeData}
                  onChange={handleCollegeChange}
                  placeholder="Select your Institute Name"
                  handleFormik={formik.setValues}
                  type="collegeId"
                  values={formik.values}
                  selectedValue={selectedCollege}
                />
                {formik.touched.collegeId && (
                  <Typography className={styles.errorText}>{formik.errors.collegeId}</Typography>
                )}
              </Box>
              <Box className={styles.mgBm1}>
                <Typography className={styles.mgBm2}>{CollegeCompareToolTitles.ACADEMIC_PROGRAM}</Typography>
                <DropDown
                  comparedToolData={courseData}
                  onChange={handleCourseChange}
                  placeholder="Select your Course"
                  handleFormik={formik.setValues}
                  type="courseId"
                  values={formik.values}
                  selectedValue={selectedCourse}
                />
                {formik.touched.courseId && (
                  <Typography className={styles.errorText}>{formik.errors.courseId}</Typography>
                )}
              </Box>
              <Box className={styles.mgBm1}>
                <Typography className={styles.mgBm2}>{CollegeCompareToolTitles.SEAT_TYPE_CATEGORY}</Typography>
                <DropDown
                  comparedToolData={seatData}
                  onChange={handleSeatTypeChange}
                  placeholder="Select your Seat Type"
                  handleFormik={formik.setValues}
                  type="seatId"
                  values={formik.values}
                  selectedValue={selectedSeat}
                />
                {formik.touched.seatId && <Typography className={styles.errorText}>{formik.errors.seatId}</Typography>}
              </Box>
              <Button className={styles.predictButton} type="submit">
                {CollegeCompareToolTitles.SUBMIT}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FutureAiTool;
