import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBusLines = createAsyncThunk('api/fetchBusLines', async () => {
  const response = await fetch('http://3.22.116.126:9091/api/v1/bus/services');
  if (!response.ok) {
    throw new Error('Failed to fetch API data');
  }
  const data = await response.json();
  return data;
});
