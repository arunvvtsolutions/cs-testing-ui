// types
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';

import { StudentProfileProps } from 'types/user-profile';

// initial state
const initialState: StudentProfileProps = {
  studentData: null,
  comparedColleges: [],
  error: false
};

// ==============================|| SLICE - AUTHENTICATION ||============================== //

const studentProfileSlice = createSlice({
  name: 'studentProfile',
  initialState,
  reducers: {
    updateStudentData(state, action) {
      state.studentData = action.payload;
    },
    updateComparingColleges(state, action) {
      state.comparedColleges = action.payload;
    },
    // has error
    hasError(state, action) {
      state.error = action.payload;
    }
  }
});

export default studentProfileSlice.reducer;

export const { updateStudentData, updateComparingColleges } = studentProfileSlice.actions;

export function logout() {
  return async () => {
    try {
      //   const response = await axios.get('/api/menu/widget');
      dispatch(studentProfileSlice.actions.updateStudentData(null));
    } catch (error) {
      dispatch(studentProfileSlice.actions.hasError(error));
    }
  };
}
