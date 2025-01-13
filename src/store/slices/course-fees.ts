// types
import { createSlice } from '@reduxjs/toolkit';

// project imports

import { CourseFeesProps } from 'types/menu';

// initial state
const initialState: CourseFeesProps = {
  selectedCourseId: '',
  error: false
};

// ==============================|| SLICE - MENU ||============================== //

const courseAndFees = createSlice({
  name: 'courseAndFees',
  initialState,
  reducers: {
    getSelectedCourse(state, action) {
      state.selectedCourseId = action.payload;
    },

    // has error
    hasError(state, action) {
      state.error = action.payload;
    }
  }
});

export default courseAndFees.reducer;

export const { getSelectedCourse } = courseAndFees.actions;
