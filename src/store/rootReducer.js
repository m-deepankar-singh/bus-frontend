import { combineReducers } from '@reduxjs/toolkit';
import busServicesReducer from './busServicesReducer';

const rootReducer = combineReducers({
  busServices: busServicesReducer,
});

export default rootReducer;
