// types
import { createSlice } from '@reduxjs/toolkit';

// project imports

import { signInProps } from 'types/menu';

// initial state
const initialState: signInProps = {
  error: null,
  userMobileNo: ''
};

// ==============================|| SLICE - AUTHENTICATION ||============================== //

const authentication = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getLoginNumber(state, action) {
      state.userMobileNo = action.payload;
    },
    // has error
    hasError(state, action) {
      state.error = action.payload;
    }
  }
});

export default authentication.reducer;

export const { getLoginNumber } = authentication.actions;
