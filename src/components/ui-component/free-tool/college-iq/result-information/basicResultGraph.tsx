import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { TabContext } from '@mui/lab/';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.css';
import { BasicInfoContent } from './constant';

import { ICourseList, IResultGraphProps } from '.';

import DefaultBarChart from 'ui-component/common/chart-card/bar-chart/MedicalChart';
import { CustomTab, CustomTabList, CustomTabPanel } from 'ui-component/home/banner-page/styles';
interface BasicResultGraphProps {
  graphData: IResultGraphProps;
  courseList: ICourseList[];
  setSelectedCourse: (e: string | number) => void;
  selectedCollege?: string | number;
}
const BasicResultGraph: React.FC<BasicResultGraphProps> = ({
  graphData,
  courseList,
  setSelectedCourse,
  selectedCollege
}) => {
  const [value, setValue] = useState('placementData');
  const [courseId, setCourseId] = useState<ICourseList | null>(null);
  //validation form schema
  const validationSchema = Yup.object({
    selectedCourseValue: Yup.mixed().test('required', 'Course is required', function (value) {
      if (value === 0) {
        return this.createError({
          message: 'Course is required',
          path: 'selectedCourseValue'
        });
      }
      return true;
    })
  });

  const formik = useFormik({
    initialValues: {
      selectedCourseValue: 0
    },
    validationSchema,
    onSubmit: (values) => {
      setSelectedCourse(values.selectedCourseValue);
    }
  });

  useEffect(() => {
    setSelectedCourse(0);
    setCourseId(null);
    formik.setFieldValue('selectedCourseValue', 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCollege]);

  const colors = ['#1862C5', '#1452A4', '#104283'];
  const tabData = [
    {
      title: 'Placements',
      key: 'placementData'
    },
    {
      title: 'Salary Packages',
      key: 'salaryPackageData'
    },
    {
      title: 'Graduation Rate',
      key: 'graduationRateData'
    },
    {
      title: 'Cut-off Trends',
      key: 'cutoffData'
    },
    {
      title: 'Expenditure',
      key: 'expenditureData'
    }
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
          <CustomTabList
            onChange={handleChange}
            allowScrollButtonsMobile
            variant="scrollable"
            aria-label="scrollable force tabs example"
            data-test-id="freetool-graph-main-tab"
          >
            {tabData.map((tab, index) => {
              return (
                <CustomTab
                  label={tab.title}
                  value={tab.key}
                  key={index}
                  sx={{
                    borderRight:
                      tabData.length - 1 === index || tabData[index].key === value || tabData[index + 1].key === value
                        ? ''
                        : '1px solid #3c3c4326'
                  }}
                  data-test-id={`freetool-graph-main-tab-${index}`}
                />
              );
            })}
          </CustomTabList>
        </Box>
        {tabData.map((tab, index) => {
          return (
            <CustomTabPanel
              value={tab.key}
              key={index}
              sx={{ borderRadius: '20px' }}
              data-test-id={`freetool-graph-${index}`}
            >
              {tab.key == 'cutoffData' && (
                <Box onSubmit={formik.handleSubmit} component={'form'} marginBottom={'20px'}>
                  <Grid container spacing={2} className={styles.formWrapper}>
                    <Grid item xs={12} sm={9}>
                      <Autocomplete
                        disablePortal
                        id="college-iq-form-dropdown"
                        value={courseId}
                        options={courseList}
                        getOptionLabel={(option) => option.courseName}
                        data-test-id="college-iq-form-dropdown"
                        onChange={(e, newValue) => {
                          if (newValue) {
                            newValue && setCourseId(newValue);
                            newValue &&
                              formik.setValues({
                                selectedCourseValue: newValue.courseId
                              });
                          } else formik.setValues({ selectedCourseValue: 0 });
                        }}
                        fullWidth
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select Course"
                            error={formik.touched.selectedCourseValue && Boolean(formik.errors.selectedCourseValue)}
                            helperText={
                              formik.touched.selectedCourseValue && formik.errors.selectedCourseValue
                                ? formik.errors.selectedCourseValue
                                : ''
                            }
                            onKeyDown={(e) => {
                              if (!/[a-zA-Z-]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        )}
                        // sx={{
                        //   '& .MuiOutlinedInput-root': {
                        //     padding: '6px!important'
                        //   }
                        // }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Button className={styles.formSubmitBtn} data-test-id="college-iq-form-submit-btn" type="submit">
                        {BasicInfoContent.SUBMIT}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
              <Box className={styles.graphWrapper}>
                <DefaultBarChart
                  backgroundColor="#FFF"
                  data={graphData[tab.key]}
                  title=""
                  distributed={tab.key === 'expenditureData'}
                  updatedColors={colors}
                  legendShow={tab.key === 'expenditureData'}
                  paddingDisable
                  barWidth="42px"
                  strokeLine
                  width="100%"
                  height="220px"
                />
              </Box>
              <Typography className={styles.chartText}>
                {graphData[tab.key]?.categories?.length > 0 && graphData[tab.key]?.title}
              </Typography>
            </CustomTabPanel>
          );
        })}
      </TabContext>
    </>
  );
};

export default BasicResultGraph;
