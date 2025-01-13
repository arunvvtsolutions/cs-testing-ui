import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import {
  INeetPredResultProps,
  IStatePredictorProps
} from 'ui-component/dashboard/predictors/neet-predictors/predictors-result';
import { IQuotaProps } from 'ui-component/dashboard/predictors/neet-predictors/predictors-result/quota-selector';
import axios from 'utils/axios';
import { INeetPredictorFormData } from 'types/menu';
import { INeetPredictorFormProps } from 'ui-component/dashboard/predictors/neet-predictors/neet-predictor-form';
import {
  IGeographicAreaBasedProps,
  IIndiaCategoryListProps,
  ISeatTypeBasedProps,
  IStateCategoryDependentListProps,
  IStateCategoryListProps,
  IStateListProps
} from 'ui-component/dashboard/predictors/neet-predictors/neet-predictor-form/NeetPredictorForm';
import { PREDICTOR_RESULT } from 'ui-component/dashboard/predictors/neet-predictors/predictors-result/constant';

// State List
export const getStateData = async () => {
  let data: IStateListProps[] = [];
  try {
    const res = await fetch(`${API_BASE_URL}/${Api.stateDataApi}`);

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.log(error);
  }
  return data;
};
// India Category
export const getIndiaCategoryData = async () => {
  let data: IIndiaCategoryListProps[] = [];

  try {
    const res = await fetch(`${API_BASE_URL}/${Api.indiaCategoryApi}`);

    if (res.ok) {
      const response = await res.json();
      data = response.indiaCategory;
    }
  } catch (error) {
    console.log(error);
  }
  return data;
};
// State Category List
export const getStateCategoryData = async (stateID: number | undefined) => {
  let data: IStateCategoryListProps[] = [];

  try {
    const res = await fetch(`${API_BASE_URL}/${Api.stateCategoryApi}/${stateID}`);

    if (res.ok) {
      const response = await res.json();

      data = response.stateCategory;
    }
  } catch (error) {
    console.log(error);
  }
  return data;
};

//state category dependent List
export const getStateCategoryDependentData = async (
  stateID: number | undefined,
  stateCategoryName: string | undefined
) => {
  let data: IStateCategoryDependentListProps = {
    speciallyAbled: [],
    gender: [],
    collegeRegion: [],
    belongs: [],
    subCasteData: [],
    seatType: [],
    minority: [],
    provisitional: [],
    specialQuota: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${Api.getStateCategoryDependentApi}/${stateID}/${stateCategoryName}`);

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.log(error);
  }
  return data;
};

// seat type based list
export const getStateSeatBasedData = async (stateID: number | undefined, seatType: number | undefined) => {
  let data: ISeatTypeBasedProps = {
    geographicType: [],
    specialQuota: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${Api.seatTypeBasedApi}/${stateID}/${seatType}`);

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.log(error);
  }
  return data;
};

//Geographic Area Based
export const getGeographicAreaBasedData = async (
  stateID: number | undefined,
  seatType: number | undefined,
  geographicArea: string | undefined
) => {
  let data: IGeographicAreaBasedProps = {
    gender: [],
    pastrolGroup: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${Api.geographicAreaBasedApi}/${stateID}/${seatType}/${geographicArea}`);

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.log(error);
  }
  return data;
};
//add a form data
export const addFormData = async (neetFormData: INeetPredictorFormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${Api.addFormApi}`, {
      ...neetFormData
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
//update a form data
export const updateFormData = async (neetFormData: INeetPredictorFormData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${Api.updateFormApi}`, {
      ...neetFormData
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
//get neet predictor form data
export const getpredictorFormData = async (studentId: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/${Api.getFormDataApi}/${studentId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export const getNeetPredictorFormData = async (): Promise<INeetPredictorFormProps> => {
  const stateListDataResponse = await getStateData();
  const indiaCategoryResponse = await getIndiaCategoryData();
  const data: INeetPredictorFormProps = {
    stateList: stateListDataResponse,
    indiaCategoryList: indiaCategoryResponse
  };
  return data;
};

export const getAiqPredictorResult = async (
  type: string | string[],
  rank: number,
  categoryType: string,
  abled: number,
  stateData?: IStatePredictorProps
) => {
  let data: INeetPredResultProps = {
    hasError: false,
    neetRank: 0,
    collegeData: []
  };
  try {
    let result;
    if (type === PREDICTOR_RESULT.AIQ_PATH) {
      const res = await axios.get(`${API_BASE_URL}/${Api.aiqPredictorResult}/${rank}/${categoryType}/${abled}`);
      result = await res.data;
    } else {
      const res = await axios.post(`${API_BASE_URL}/${Api.statePredictorResult}`, stateData);
      result = res.data;
    }
    data = { ...result, hasError: false };
  } catch (error) {
    data = { ...data, hasError: true };
  }
  return data;
};

export const getQuotaData = async (categoryType: string, abled: number) => {
  const data: IQuotaProps = {
    quotaData: [],
    hasError: false
  };
  try {
    const res = await axios.get(`${API_BASE_URL}/${Api.quotaData}/${categoryType}/${abled}`);
    data.quotaData = [{ quotaId: res.data[0]?.id, quotaName: res.data[0]?.name }, ...res.data?.splice(1)];
  } catch (error) {
    data.hasError = true;
  }
  return data;
};
