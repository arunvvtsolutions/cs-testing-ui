/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';
import { useParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ReviewPopupStyles from './addReviewPopup.module.css';
import AddReviewStars from './AddReviewStars';
import { AddReviewTitles, ErrorMessageContents, ReviewValuesContants } from './constant';

import ErrorComponent from 'ui-component/error';
import { IErrorProps, IInnerPageParams } from 'types';
import { postAddReviewData } from 'utils/api/review';
import useAuth from 'hooks/useAuth';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { SuccessSnackbar } from 'ui-component/common/snackbar-type';
import { ErrorSnackbar } from 'ui-component/common/snackbar-type';

interface IOpenPop extends IErrorProps {
  open: boolean;
  handleClose: any;
  setOpen: (data: boolean) => void;
  stream: string;
}
export interface IReviews {
  studentId: string;
  title: string;
  infrastructureReview: string;
  infrastructureRating: number;
  academicReview: string;
  academicRating: number;
  placementReview: string;
  placementRating: number;
  valueForMoney: string;
  valueForMoneyRating: number;
  campusReview: string;
  campusRating: number;
  otherReview: string;
  otherRating: number;
  collegeName?: string | string[];
  stream?: string;
}
const AddReview: React.FC<IOpenPop> = ({ open, handleClose, hasError, setOpen, stream }) => {
  const params = useParams<IInnerPageParams>();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const name = params?.name;
  const [reviews, setReviews] = useState<IReviews>({
    studentId: '',
    title: '',
    infrastructureReview: '',
    infrastructureRating: 0,
    placementReview: '',
    placementRating: 0,
    academicReview: '',
    academicRating: 0,
    valueForMoney: '',
    valueForMoneyRating: 0,
    campusReview: '',
    campusRating: 0,
    otherReview: '',
    otherRating: 0
  });
  const handlePopupClose = () => {
    handleClose();
    setReviews((prev) => ({
      ...prev,
      studentId: '',
      title: '',
      infrastructureReview: '',
      infrastructureRating: 0,
      placementReview: '',
      placementRating: 0,
      academicReview: '',
      academicRating: 0,
      valueForMoney: '',
      valueForMoneyRating: 0,
      campusReview: '',
      campusRating: 0,
      otherReview: '',
      otherRating: 0
    }));
  };
  //validation form schema
  const validationSchema = Yup.object({
    title: Yup.string().required(ErrorMessageContents.TITLE),
    infrastructureReview: Yup.string().required(ErrorMessageContents.INFRASTRUCTURE_REVIEWS),
    infrastructureRating: Yup.number()
      .notOneOf([0], ErrorMessageContents.INFRASTRUCTURE_RATING)
      .required(ErrorMessageContents.INFRASTRUCTURE_RATING),
    placementReview: Yup.string().required(ErrorMessageContents.PLACEMENT_REVIEWS),
    placementRating: Yup.number()
      .notOneOf([0], ErrorMessageContents.PLACEMENT_RATING)
      .required(ErrorMessageContents.PLACEMENT_RATING),
    academicReview: Yup.string().required(ErrorMessageContents.ACADEMIC_REVIEWS),
    academicRating: Yup.number()
      .notOneOf([0], ErrorMessageContents.ACADEMIC_RATING)
      .required(ErrorMessageContents.ACADEMIC_RATING),
    valueForMoney: Yup.string().required(ErrorMessageContents.VALUE_FOR_MONEY_REVIEWS),
    valueForMoneyRating: Yup.number()
      .notOneOf([0], ErrorMessageContents.VALUE_FOR_MONEY_RATING)
      .required(ErrorMessageContents.VALUE_FOR_MONEY_RATING),
    campusReview: Yup.string().required(ErrorMessageContents.CAMPUS_REVIEWS),
    campusRating: Yup.number()
      .notOneOf([0], ErrorMessageContents.CAMPUS_RATING)
      .required(ErrorMessageContents.CAMPUS_RATING),
    otherReview: Yup.string().required(ErrorMessageContents.OTHER_REVIEWS),
    otherRating: Yup.number()
      .notOneOf([0], ErrorMessageContents.OTHER_RATING)
      .required(ErrorMessageContents.OTHER_RATING)
  });

  const formik = useFormik({
    initialValues: {
      studentId: '',
      title: '',
      infrastructureReview: '',
      infrastructureRating: 0,
      placementReview: '',
      placementRating: 0,
      academicReview: '',
      academicRating: 0,
      valueForMoney: '',
      valueForMoneyRating: 0,
      campusReview: '',
      campusRating: 0,
      otherReview: '',
      otherRating: 0
    },
    validationSchema,
    onSubmit: async (values) => {
      if (user?.id) {
        const response = await postAddReviewData({ ...values, collegeName: name, stream, studentId: user.id });

        if (response.status === 1) {
          dispatch(openSnackbar(SuccessSnackbar(AddReviewTitles.SUCCESS_MSG)));
        } else dispatch(openSnackbar(ErrorSnackbar(AddReviewTitles.FAILURE_MSG)));
        setOpen(false);
        setReviews((prev) => ({
          ...prev,
          studentId: '',
          title: '',
          infrastructureReview: '',
          infrastructureRating: 0,
          placementReview: '',
          placementRating: 0,
          academicReview: '',
          academicRating: 0,
          valueForMoney: '',
          valueForMoneyRating: 0,
          campusReview: '',
          campusRating: 0,
          otherReview: '',
          otherRating: 0
        }));
      }
    }
  });

  const handleOnchange = (field: string, value: string | number) => {
    setReviews((prevReviews: any) => ({
      ...prevReviews,
      [field]: value
    }));
    formik.setValues((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <>
          <Modal
            data-test-id="add-review-popup"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            style={{ zIndex: '99992' }}
          >
            <Fade in={open}>
              <Box className={ReviewPopupStyles.reviewPopup}>
                <Box className={ReviewPopupStyles.popupHead}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                    className={ReviewPopupStyles.titleTxt}
                  >
                    {AddReviewTitles.ADD_REVIEW}
                  </Typography>
                  <CancelIcon
                    sx={{ fontSize: 40 }}
                    className={ReviewPopupStyles.cancelIcn}
                    onClick={handlePopupClose}
                  />
                </Box>

                <Box className={ReviewPopupStyles.popUpBody}>
                  {/* FORM_STARTS_HERE */}
                  <form className={ReviewPopupStyles.formBlock} noValidate onSubmit={formik.handleSubmit}>
                    <Box className={ReviewPopupStyles.mobileScroll}>
                      <Box className={`${ReviewPopupStyles.inputBlock} ${ReviewPopupStyles.up}`}>
                        <textarea
                          placeholder=""
                          className={ReviewPopupStyles.topTextarea}
                          name="title"
                          id="outlined-multiline-flexible"
                          value={reviews.title}
                          onChange={(e) => handleOnchange(ReviewValuesContants.TITLE, e.target.value)}
                          data-test-id="add-review-popup-title"
                        />
                        {formik.touched.title && formik.errors.title && (
                          <Typography className={ReviewPopupStyles.popupFormError}>{formik.errors.title}</Typography>
                        )}
                      </Box>
                      <Box sx={{ flexGrow: 1 }} className={ReviewPopupStyles.formBody}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={12} lg={6}>
                            <Box data-test-id="add-review-popup-infrastructure-review">
                              <label htmlFor="#" className={ReviewPopupStyles.formLabels}>
                                {AddReviewTitles.INFRASTRUCTURE_REVIEWS}
                              </label>
                              <Box className={ReviewPopupStyles.formCols}>
                                <Box className={ReviewPopupStyles.inputBlock}>
                                  <textarea
                                    placeholder=""
                                    id="outlined-multiline-flexible"
                                    name="InfrastructureReview"
                                    value={reviews.infrastructureReview}
                                    onChange={(e) =>
                                      handleOnchange(ReviewValuesContants.INFRASTRUCTURE_REVIEWS, e.target.value)
                                    }
                                    data-test-id="infrastructure-review"
                                  />
                                </Box>
                                <Box className={ReviewPopupStyles.inputBlockFooter}>
                                  <Typography className={ReviewPopupStyles.subText}>
                                    {AddReviewTitles.ADD_STAR}
                                    {formik.touched.infrastructureRating && formik.errors.infrastructureRating && (
                                      <span className={ReviewPopupStyles.popupFormError}>*</span>
                                    )}
                                  </Typography>
                                  <AddReviewStars
                                    starValue={reviews.infrastructureRating}
                                    dataTestId="infrastructure-rating"
                                    onChange={(value) =>
                                      handleOnchange(ReviewValuesContants.INFRASTRUCTURE_RATING, value)
                                    }
                                  />
                                </Box>
                              </Box>
                            </Box>
                            {formik.touched.infrastructureReview && formik.errors.infrastructureReview && (
                              <Typography className={ReviewPopupStyles.popupFormError}>
                                {formik.errors.infrastructureReview}
                              </Typography>
                            )}
                          </Grid>

                          <Grid item xs={12} md={12} lg={6}>
                            <Box data-test-id="add-review-popup-academic-review">
                              <label htmlFor="#" className={ReviewPopupStyles.formLabels}>
                                {AddReviewTitles.ACADEMIC_REVIEWS}
                              </label>
                              <Box className={ReviewPopupStyles.formCols}>
                                <Box className={ReviewPopupStyles.inputBlock}>
                                  <textarea
                                    placeholder=""
                                    id="outlined-multiline-flexible"
                                    name="academicReview"
                                    value={reviews.academicReview}
                                    onChange={(e) =>
                                      handleOnchange(ReviewValuesContants.ACADEMIC_REVIEWS, e.target.value)
                                    }
                                    data-test-id="academic-review"
                                  />
                                </Box>
                                <Box className={ReviewPopupStyles.inputBlockFooter}>
                                  <Typography className={ReviewPopupStyles.subText}>
                                    {AddReviewTitles.ADD_STAR}
                                    {formik.touched.academicRating && formik.errors.academicRating && (
                                      <span className={ReviewPopupStyles.popupFormError}>*</span>
                                    )}
                                  </Typography>
                                  <AddReviewStars
                                    starValue={reviews.academicRating}
                                    onChange={(value) => handleOnchange(ReviewValuesContants.ACADEMIC_RATING, value)}
                                    dataTestId="academic-rating"
                                  />
                                </Box>
                              </Box>
                            </Box>
                            {formik.touched.academicReview && formik.errors.academicReview && (
                              <Typography className={ReviewPopupStyles.popupFormError}>
                                {formik.errors.academicReview}
                              </Typography>
                            )}
                          </Grid>

                          <Grid item xs={12} md={12} lg={6}>
                            <Box data-test-id="add-review-popup-placement-review">
                              <label htmlFor="#" className={ReviewPopupStyles.formLabels}>
                                {AddReviewTitles.PLACEMENT_REVIEWS}
                              </label>
                              <Box className={ReviewPopupStyles.formCols}>
                                <Box className={ReviewPopupStyles.inputBlock}>
                                  <textarea
                                    placeholder=""
                                    id="outlined-multiline-flexible"
                                    name="placementReview"
                                    value={reviews.placementReview}
                                    onChange={(e) =>
                                      handleOnchange(ReviewValuesContants.PLACEMENT_REVIEWS, e.target.value)
                                    }
                                    data-test-id="placement-review"
                                  />
                                </Box>
                                <Box className={ReviewPopupStyles.inputBlockFooter}>
                                  <Typography className={ReviewPopupStyles.subText}>
                                    {AddReviewTitles.ADD_STAR}
                                    {formik.touched.placementRating && formik.errors.placementRating && (
                                      <span className={ReviewPopupStyles.popupFormError}>*</span>
                                    )}
                                  </Typography>
                                  <AddReviewStars
                                    starValue={reviews.placementRating}
                                    onChange={(value) => handleOnchange(ReviewValuesContants.PLACEMENT_RATING, value)}
                                    dataTestId="placement-rating"
                                  />
                                </Box>
                              </Box>
                            </Box>
                            {formik.touched.placementReview && formik.errors.placementReview && (
                              <Typography className={ReviewPopupStyles.popupFormError}>
                                {formik.errors.placementReview}
                              </Typography>
                            )}
                          </Grid>

                          <Grid item xs={12} md={12} lg={6}>
                            <Box data-test-id="add-review-popup-value-for-money">
                              <label htmlFor="#" className={ReviewPopupStyles.formLabels}>
                                {AddReviewTitles.VALUE_FOR_MONEY_REVIEWS}
                              </label>
                              <Box className={ReviewPopupStyles.formCols}>
                                <Box className={ReviewPopupStyles.inputBlock}>
                                  <textarea
                                    placeholder=""
                                    id="outlined-multiline-flexible"
                                    name="valueForMoney"
                                    value={reviews.valueForMoney}
                                    onChange={(e) =>
                                      handleOnchange(ReviewValuesContants.VALUE_FOR_MONEY_REVIEWS, e.target.value)
                                    }
                                    data-test-id="value-for-money"
                                  />
                                </Box>
                                <Box className={ReviewPopupStyles.inputBlockFooter}>
                                  <Typography className={ReviewPopupStyles.subText}>
                                    {AddReviewTitles.ADD_STAR}
                                    {formik.touched.valueForMoneyRating && formik.errors.valueForMoneyRating && (
                                      <span className={ReviewPopupStyles.popupFormError}>*</span>
                                    )}
                                  </Typography>
                                  <AddReviewStars
                                    starValue={reviews.valueForMoneyRating}
                                    onChange={(value) =>
                                      handleOnchange(ReviewValuesContants.VALUE_FOR_MONEY_RATING, value)
                                    }
                                    dataTestId="value-for-money-rating"
                                  />
                                </Box>
                              </Box>
                            </Box>
                            {formik.touched.valueForMoney && formik.errors.valueForMoney && (
                              <Typography className={ReviewPopupStyles.popupFormError}>
                                {formik.errors.valueForMoney}
                              </Typography>
                            )}
                          </Grid>

                          <Grid item xs={12} md={12} lg={6}>
                            <Box data-test-id="add-review-popup-campus-review">
                              <label htmlFor="#" className={ReviewPopupStyles.formLabels}>
                                {AddReviewTitles.CAMPUS_REVIEWS}
                              </label>
                              <Box className={ReviewPopupStyles.formCols}>
                                <Box className={ReviewPopupStyles.inputBlock}>
                                  <textarea
                                    placeholder=""
                                    id="outlined-multiline-flexible"
                                    name="campusReview"
                                    value={reviews.campusReview}
                                    onChange={(e) =>
                                      handleOnchange(ReviewValuesContants.CAMPUS_REVIEWS, e.target.value)
                                    }
                                    data-test-id="campus-review"
                                  />
                                </Box>
                                <Box className={ReviewPopupStyles.inputBlockFooter}>
                                  <Typography className={ReviewPopupStyles.subText}>
                                    {AddReviewTitles.ADD_STAR}
                                    {formik.touched.campusRating && formik.errors.campusRating && (
                                      <span className={ReviewPopupStyles.popupFormError}>*</span>
                                    )}
                                  </Typography>
                                  <AddReviewStars
                                    starValue={reviews.campusRating}
                                    onChange={(value) => handleOnchange(ReviewValuesContants.CAMPUS_RATING, value)}
                                    dataTestId="campus-rating"
                                  />
                                </Box>
                              </Box>
                            </Box>
                            {formik.touched.campusReview && formik.errors.campusReview && (
                              <Typography className={ReviewPopupStyles.popupFormError}>
                                {formik.errors.campusReview}
                              </Typography>
                            )}
                          </Grid>

                          <Grid item xs={12} md={12} lg={6}>
                            <Box data-test-id="add-review-popup-other-review">
                              <label htmlFor="#" className={ReviewPopupStyles.formLabels}>
                                {AddReviewTitles.OTHER_REVIEWS}
                              </label>
                              <Box className={ReviewPopupStyles.formCols}>
                                <Box className={ReviewPopupStyles.inputBlock}>
                                  <textarea
                                    placeholder=""
                                    id="outlined-multiline-flexible"
                                    name="otherReview"
                                    value={reviews.otherReview}
                                    data-test-id="other-review"
                                    onChange={(e) => handleOnchange(ReviewValuesContants.OTHER_REVIEWS, e.target.value)}
                                  />
                                </Box>
                                <Box className={ReviewPopupStyles.inputBlockFooter}>
                                  <Typography className={ReviewPopupStyles.subText}>
                                    {AddReviewTitles.ADD_STAR}
                                    {formik.touched.otherRating && formik.errors.otherRating && (
                                      <span className={ReviewPopupStyles.popupFormError}>*</span>
                                    )}
                                  </Typography>
                                  <AddReviewStars
                                    starValue={reviews.otherRating}
                                    dataTestId="other-rating"
                                    onChange={(value) => handleOnchange(ReviewValuesContants.OTHER_RATING, value)}
                                  />
                                </Box>
                              </Box>
                              {formik.touched.otherReview && formik.errors.otherReview && (
                                <Typography className={ReviewPopupStyles.popupFormError}>
                                  {formik.errors.otherReview}
                                </Typography>
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box className={ReviewPopupStyles.ratingErrorWrapper}>
                        {formik.touched.infrastructureRating && formik.errors.infrastructureRating ? (
                          <Typography className={ReviewPopupStyles.popupFormError}>
                            *{formik.errors.infrastructureRating}
                          </Typography>
                        ) : formik.touched.academicRating && formik.errors.academicRating ? (
                          <Typography className={ReviewPopupStyles.popupFormError}>
                            *{formik.errors.academicRating}
                          </Typography>
                        ) : formik.touched.placementRating && formik.errors.placementRating ? (
                          <Typography className={ReviewPopupStyles.popupFormError}>
                            *{formik.errors.placementRating}
                          </Typography>
                        ) : formik.touched.valueForMoneyRating && formik.errors.valueForMoneyRating ? (
                          <Typography className={ReviewPopupStyles.popupFormError}>
                            *{formik.errors.valueForMoneyRating}
                          </Typography>
                        ) : formik.touched.campusRating && formik.errors.campusRating ? (
                          <Typography className={ReviewPopupStyles.popupFormError}>
                            *{formik.errors.campusRating}
                          </Typography>
                        ) : formik.touched.otherRating && formik.errors.otherRating ? (
                          <Typography className={ReviewPopupStyles.popupFormError}>
                            *{formik.errors.otherRating}
                          </Typography>
                        ) : (
                          ''
                        )}
                      </Box>
                    </Box>
                    <Button
                      className={ReviewPopupStyles.postButton}
                      type="submit"
                      data-test-id="add-review-popup-postbutton"
                    >
                      {AddReviewTitles.POST}
                    </Button>
                  </form>
                  {/* FORM_ENDS_HERE */}
                </Box>
              </Box>
            </Fade>
          </Modal>
        </>
      )}
    </>
  );
};

export default AddReview;
