import { createSlice } from '@reduxjs/toolkit';
import dummyData from './dummyData';
import { fetchBusLines } from './actions';

const initialState = {
  busLines: [],
};

export const slice = createSlice({
  name: 'busLines',
  initialState,
  reducers: {
    toggleShowAllStops: (state, action) => {
      const { index } = action.payload;
      state.busLines[index].showAllStops = !state.busLines[index].showAllStops;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusLines.fulfilled, (state, action) => {
        state.busLines = action.payload.map((busLine) => ({ ...busLine, showAllStops: false }));
      })
      .addCase(fetchBusLines.rejected, (state) => {
        state.busLines = dummyData;
      });
  },
});

export default slice.reducer;
