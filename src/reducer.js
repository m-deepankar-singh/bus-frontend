import { combineReducers } from 'redux';
import { slice } from './slice';

const reducer = combineReducers({
  busLines: slice.reducer,
});

export default reducer;
