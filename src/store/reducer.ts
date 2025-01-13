// third-party
import { combineReducers } from 'redux';

// project imports
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';
import courseFeesReducer from './slices/course-fees';
import studentProfileSlice from './slices/student-profile';
import neetPredictorReducer from './slices/predictor';
import authenticationReducer from './slices/auth';
import chatBotReducer from './slices/chat-bot';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  snackbar: snackbarReducer,
  menu: menuReducer,
  courseFees: courseFeesReducer,
  studentProfile: studentProfileSlice,
  neetPredictor: neetPredictorReducer,
  userAuth: authenticationReducer,
  chatBot: chatBotReducer
});

export default reducer;
