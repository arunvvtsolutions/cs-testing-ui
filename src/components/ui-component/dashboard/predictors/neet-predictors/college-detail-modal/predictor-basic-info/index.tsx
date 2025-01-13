import React from 'react';
import { Box } from '@mui/material';

import styles from '../DetailsModalstyles.module.css';

import PredictorBasicInfoCard from './basic-info-card';
import { BasicInfoTitles } from './constant';

import { IResultInfoProps } from 'ui-component/free-tool/kyc-medical/result-page-information';

const PredictorBasicInfo = ({ infoData, hasError }: IResultInfoProps) => {
  return (
    <Box className={styles.basicInfoContent}>
      <Box className={styles.gridWarp}>
        <Box className={styles.gridWarpCols}>
          <PredictorBasicInfoCard CardTitleTxt={infoData.campusArea || '-'} CardMInTxt={BasicInfoTitles.CAMPUS_AREA} />
        </Box>
        <Box className={styles.gridWarpCols}>
          <PredictorBasicInfoCard
            CardTitleTxt={infoData.establishedYear || '-'}
            CardMInTxt={BasicInfoTitles.ESTABLISHED_YEAR}
          />
        </Box>
        <Box className={styles.gridWarpCols}>
          <PredictorBasicInfoCard CardTitleTxt={infoData.ownership || '-'} CardMInTxt={BasicInfoTitles.OWNERSHIP} />
        </Box>
        <Box className={styles.gridWarpCols}>
          <PredictorBasicInfoCard CardTitleTxt={infoData.seats || '-'} CardMInTxt={BasicInfoTitles.SEAT} />
        </Box>
        <Box className={styles.gridWarpCols}>
          <PredictorBasicInfoCard
            CardTitleTxt={infoData.hospitalBeds || '-'}
            CardMInTxt={BasicInfoTitles.HOSPITAL_BEDS_OPD}
          />
        </Box>
        <Box className={styles.gridWarpCols}>
          <PredictorBasicInfoCard
            CardTitleTxt={infoData.hospitalType || '-'}
            CardMInTxt={BasicInfoTitles.HOSPITAL_TYPE}
          />
        </Box>
      </Box>

      <Box className={styles.GridDescribtion}>
        <PredictorBasicInfoCard CardTitleTxt={infoData.recognition} CardMInTxt={BasicInfoTitles.RECONIZED} />
      </Box>
    </Box>
  );
};

export default PredictorBasicInfo;
