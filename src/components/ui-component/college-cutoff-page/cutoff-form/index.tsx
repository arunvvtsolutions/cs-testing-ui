/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FormControl, Box, Select, MenuItem, Button, FormHelperText } from '@mui/material';
// third party
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { useParams } from 'next/navigation';

import styles from './form.module.css';
import { CutoffContent } from './constants';

import MainCard from 'ui-component/MainCard';
import { IErrorProps, IInnerPageParams } from 'types';
import ErrorComponent from 'ui-component/error';

interface ICourseProps {
  courseId: number;
  courseName: string;
}

interface IQuotaProps {
  quotaId: number;
  courseId: number;
  quotaName: string;
}

interface ICasteProps {
  casteId: number;
  courseId: number;
  quotaId: number;
  name: string;
}

interface IGenderProps {
  genderId: number;
  courseId: number;
  casteId: number;
  genderName: string;
}

interface ICutoffFormDataProps {
  course: ICourseProps[];
  quota: IQuotaProps[];
  caste: ICasteProps[];
  gender: IGenderProps[];
  stream: string;
}

export interface ICutOffFormProps extends IErrorProps {
  cutoffFormData: ICutoffFormDataProps;
  setResultsData?: (data: unknown) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const CutOffForm = ({ cutoffFormData, hasError, setResultsData }: ICutOffFormProps) => {
  const params = useParams<IInnerPageParams>();
  const name = params?.name;
  const [filteredQuota, setFilteredQuota] = useState<IQuotaProps[]>([]);
  const [filteredCaste, setFilteredCaste] = useState<ICasteProps[]>([]);
  const [filteredGender, setFilteredGender] = useState<IGenderProps[]>([]);

  //formik value initialize
  const formik = useFormik({
    initialValues: {
      courseId: 0,
      quotaId: 0,
      casteId: 0,
      genderId: 0
    },
    //validation form schema
    validationSchema: Yup.object({
      courseId: Yup.number().notOneOf([0], 'Course is required').required('Course is required'),
      quotaId: Yup.number().notOneOf([0], 'Quota is required').required('Quota is required'),
      casteId: Yup.number().notOneOf([0], 'Caste is required').required('Caste is required'),
      genderId: Yup.number().notOneOf([0], 'Gender is required').required('Gender is required')
    }),
    onSubmit: async (values) => {
      const resultData = await fetch(
        `/api/cutoff-api?collegeUrl=${name}&courseId=${values.courseId}&casteId=${values.casteId}&genderId=${values.genderId}&quotaId=${values.quotaId}`
      );

      const cutoffData = await resultData.json();

      if (cutoffData && setResultsData) setResultsData(cutoffData);
    },
    initialTouched: {
      courseId: false,
      quotaId: false,
      casteId: false,
      genderId: false
    }
  });

  // Filter quota options when the course selection changes
  useEffect(() => {
    const courseId = formik.values.courseId;

    if (courseId) {
      const filteredQuotaOptions = cutoffFormData.quota?.filter((quota: IQuotaProps) => quota.courseId === courseId);
      setFilteredQuota(filteredQuotaOptions);
    } else {
      setFilteredQuota([]);
    }

    if (formik.values.quotaId && courseId) {
      const quotaId = formik.values.quotaId;
      const filteredCasteOptions = cutoffFormData.caste?.filter(
        (caste: ICasteProps) => caste.quotaId === quotaId && caste.courseId === courseId
      );
      setFilteredCaste(filteredCasteOptions);
    } else {
      setFilteredCaste([]);
    }

    if (formik.values.casteId && courseId) {
      const casteId = formik.values.casteId;
      const filteredGenderOptions = cutoffFormData.gender?.filter(
        (gender: IGenderProps) => gender.casteId === casteId && gender.courseId === courseId
      );
      setFilteredGender(filteredGenderOptions);
    } else {
      setFilteredGender([]);
    }
  }, [formik.values.courseId, formik.values.quotaId, formik.values.casteId]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      casteId: 0,
      quotaId: 0,
      genderId: 0
    });

    formik.values.courseId !== 0 &&
      formik.setTouched({
        courseId: true,
        casteId: false,
        quotaId: false,
        genderId: false
      });
  }, [formik.values.courseId]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      casteId: 0,
      genderId: 0
    });
    formik.setTouched({
      casteId: false,
      genderId: false
    });
  }, [formik.values.quotaId]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      genderId: 0
    });
    formik.setTouched({
      genderId: false
    });
  }, [formik.values.casteId]);

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        cutoffFormData.course.length > 0 && (
          <MainCard title="" secondary="" data-test-id="cutoff-form">
            <Box className={styles.formContainer}>
              <form noValidate onSubmit={formik.handleSubmit}>
                <FormControl className={styles.inputFormControl} fullWidth>
                  <Select
                    id="courseId"
                    name="courseId"
                    value={formik.values.courseId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Set touched when the field is blurred
                    error={Boolean(formik.touched.courseId && formik.errors.courseId)} // Check if it's touched
                    MenuProps={MenuProps}
                  >
                    <MenuItem value={0}>{CutoffContent.SELECTED_COURSE}</MenuItem>
                    {cutoffFormData.course.map((cD) => (
                      <MenuItem
                        value={cD.courseId}
                        key={cD.courseId}
                        data-test-id={`form-cD-${cD.courseId}`}
                        className={styles.menuData}
                      >
                        {cD.courseName}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.courseId && formik.errors.courseId && (
                    <FormHelperText className={styles.formHelperText} error id="component-error-text">
                      {formik.errors.courseId}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl className={styles.inputFormControl} fullWidth>
                  <Select
                    id="quotaId"
                    name="quotaId"
                    value={formik.values.quotaId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Set touched when the field is blurred
                    error={Boolean(formik.touched.quotaId && formik.errors.quotaId)} // Check if it's touched
                    MenuProps={MenuProps}
                  >
                    <MenuItem value={0}> {CutoffContent.SELECTED_QUOTA}</MenuItem>
                    {filteredQuota.map((qType: any) => (
                      <MenuItem
                        value={qType.quotaId}
                        key={qType.quotaId}
                        data-test-id={`form-${qType.quotaId}`}
                        className={styles.menuData}
                      >
                        {qType.quotaName}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.quotaId && formik.errors.quotaId && (
                    <FormHelperText error className={styles.formHelperText} id="component-error-text">
                      {formik.errors.quotaId}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl error={Boolean(formik.errors.casteId)} className={styles.inputFormControl} fullWidth>
                  <Select
                    id="casteId"
                    name="casteId"
                    value={formik.values.casteId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Set touched when the field is blurred
                    error={Boolean(formik.touched.casteId && formik.errors.casteId)} // Check if it's touched
                    MenuProps={MenuProps}
                  >
                    <MenuItem value={0}>{CutoffContent.SELECTED_CASTE}</MenuItem>
                    {filteredCaste.map((cType: any) => (
                      <MenuItem
                        value={cType.casteId}
                        key={cType.casteId}
                        data-test-id={`form-cType-${cType.casteId}`}
                        className={styles.menuData}
                      >
                        {cType.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.casteId && formik.errors.casteId && (
                    <FormHelperText error className={styles.formHelperText} id="component-error-text">
                      {formik.errors.casteId}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  error={Boolean(formik.touched.genderId && formik.errors.genderId)}
                  className={styles.inputFormControl}
                  fullWidth
                >
                  <Select
                    id="genderId"
                    name="genderId"
                    value={formik.values.genderId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Set touched when the field is blurred
                    error={Boolean(formik.touched.genderId && formik.errors.genderId)} // Check if it's touched
                    MenuProps={MenuProps}
                  >
                    <MenuItem value={0}>{CutoffContent.SELECTED_GENDER}</MenuItem>
                    {filteredGender.map((gD: any) => (
                      <MenuItem
                        value={gD.genderId}
                        key={gD.genderId}
                        data-test-id={`form-gD-${gD.casteId}`}
                        className={styles.menuData}
                      >
                        {gD.genderName}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.genderId && formik.errors.genderId && (
                    <FormHelperText error className={styles.formHelperText} id="component-error-text">
                      {formik.errors.genderId}
                    </FormHelperText>
                  )}
                </FormControl>
                <Button
                  className={styles.cutoffButton}
                  type="submit"
                  variant="contained"
                  fullWidth
                  data-test-id="cutoff-form-button"
                >
                  {CutoffContent.SUBMIT_BUTTON}
                </Button>
              </form>
            </Box>
          </MainCard>
        )
      )}
    </>
  );
};

export default CutOffForm;
