// types
import { createSlice } from '@reduxjs/toolkit';

// project imports
// import { dispatch } from '../index';

import { INeetFormProps } from 'types/menu';
// initial state
const initialState: INeetFormProps = {
  error: null,
  neetPredictorFormData: {
    neetRank: 0,
    state: 0,
    seatType: 0,
    provisional: 0,
    collegeRegion: 0,
    indiaCategory: '',
    stateCategory: '',
    speciallyAbled: 0,
    minority: '',
    specialQuota: '',
    gender: 0,
    subCaste: 0,
    belongArea: '',
    geoArea: '',
    rankType: '',
    stateName: ''
  }
};
// ==============================|| SLICE - PREDICTORS ||============================== //

const neetPredictorSlice = createSlice({
  name: 'neetPredictor',
  initialState,
  reducers: {
    getNeetPredictorFormData(state, action) {
      state.neetPredictorFormData = action.payload;
    },
    // has error
    hasError(state, action) {
      state.error = action.payload;
    }
  }
});

export default neetPredictorSlice.reducer;

export const { getNeetPredictorFormData, hasError } = neetPredictorSlice.actions;
