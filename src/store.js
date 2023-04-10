import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import { fetchBusLines } from './actions';

export const store = configureStore({
  reducer,
});

// Dispatch the fetchBusLines action on app startup
store.dispatch(fetchBusLines());
