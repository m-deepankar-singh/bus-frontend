import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBusServices = createAsyncThunk(
  'busServices/fetchBusServices',
  async () => {
    const response = await fetch('http://3.22.116.126:9091/api/v1/bus/services');
    if (!response.ok) {
      throw new Error('Failed to fetch API data');
    }
    const data = await response.json();
    return data;
  }
);

const busServicesSlice = createSlice({
  name: 'busServices',
  initialState: {
    busServices: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBusServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.busServices = action.payload;
      })
      .addCase(fetchBusServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default busServicesSlice.reducer;
