import React from 'react';

import NeetPredictorFormComponent from 'ui-component/dashboard/predictors/neet-predictors/neet-predictor-form';
import { getNeetPredictorFormData } from 'utils/api/neet-predictor';

const PredictorForm = async () => {
  const data = await getNeetPredictorFormData();
  return <NeetPredictorFormComponent stateList={data.stateList} indiaCategoryList={data.indiaCategoryList} />;
};

export default PredictorForm;
