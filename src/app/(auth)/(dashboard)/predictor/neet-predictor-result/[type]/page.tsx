import { notFound } from 'next/navigation';
import React from 'react';

import PredictorsColleges from 'ui-component/dashboard/predictors/neet-predictors/predictors-result';
import { PREDICTOR_RESULT } from 'ui-component/dashboard/predictors/neet-predictors/predictors-result/constant';

const PredictorAiqResult = ({ params }: { params: { type: string } }) => {
  if (params.type !== PREDICTOR_RESULT.AIQ_PATH && params.type !== PREDICTOR_RESULT.STATE_PATH) notFound();
  return <PredictorsColleges />;
};

export default PredictorAiqResult;
