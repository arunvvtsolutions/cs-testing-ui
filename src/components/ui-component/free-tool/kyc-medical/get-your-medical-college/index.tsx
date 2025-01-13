'use client';
import { Box } from '@mui/material';
import React, { useState } from 'react';

import CollegeDetailModal from '..';

import { GetYourCollege } from './constant';
import styles from './styles.module.css';

import { IErrorProps } from 'types';
import BannerForm from 'ui-component/common/profile-banner/banner-form';
import { IIqBannerProps } from 'ui-component/free-tool/college-iq/banner';
import ErrorComponent from 'ui-component/error';
export interface IGetMedicalCollegeProps extends IErrorProps {
  medicalCollegeData: IIqBannerProps;
}
const GetyourCollegeComponent: React.FC<IGetMedicalCollegeProps> = ({ medicalCollegeData, hasError }) => {
  const [selectedCollege, setSelectedCollege] = useState<string | number>(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleSelect = async (value: string | number, shortUrl?: string) => {
    setSelectedCollege(value);
    if (value) setModalOpen(true);
  };

  return (
    <>
      {hasError ? (
        <ErrorComponent />
      ) : (
        <Box className={styles.formWrapper}>
          <BannerForm
            formHeading={GetYourCollege.GET_TO_kNOW_YOURE_COLLEGE}
            formSubTitle={GetYourCollege.GET_TO_kNOW_YOURE_COLLEGE}
            placeHolder={GetYourCollege.SELECT_YOUR_INSTITUTE_NAME}
            errorMessage={GetYourCollege.VALIDATION_ERROR_MSG}
            value={selectedCollege}
            collegeData={medicalCollegeData.collegeData}
            handleSelect={handleSelect}
            showDropDown
          />
        </Box>
      )}
      <CollegeDetailModal open={isModalOpen} handleClose={handleCloseModal} selecedCollege={Number(selectedCollege)} />
    </>
  );
};

export default GetyourCollegeComponent;
