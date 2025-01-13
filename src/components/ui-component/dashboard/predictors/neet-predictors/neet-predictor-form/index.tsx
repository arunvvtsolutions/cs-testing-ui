import React from 'react';
import { Box } from '@mui/material';

import NeetPredictorBanner from './NeetPredictorBanner';
import styles from './form.module.css';
import { IIndiaCategoryListProps, IStateListProps } from './NeetPredictorForm';

import NeetPredictorBannerCard from 'ui-component/common/neet-predictor-banner';
export interface INeetPredictorFormProps {
  stateList: IStateListProps[];
  indiaCategoryList: IIndiaCategoryListProps[];
}

const NeetPredictorFormComponent: React.FC<INeetPredictorFormProps> = ({ stateList, indiaCategoryList }) => {
  return (
    <Box className={styles.mainBannerContainer}>
      <NeetPredictorBannerCard margin="auto" width="860px">
        <NeetPredictorBanner stateList={stateList} indiaCategoryList={indiaCategoryList} />
      </NeetPredictorBannerCard>
    </Box>
  );
};
export default NeetPredictorFormComponent;
