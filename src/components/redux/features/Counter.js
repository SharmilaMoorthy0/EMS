import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request from '../../api/Api';

export const fetchEmploye = createAsyncThunk('fetchEmploye', async () => {
  const response = await request({
    url: `/all/employe`,
    method: 'GET',
  });
  return response.response;
});

export const TotalSlice= createSlice({
  name: 'employe',
  initialState: {
    allEmploye: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase( fetchEmploye .fulfilled, (state, action) => {
        state.allEmploye= action.payload;
      })
      .addCase( fetchEmploye .rejected, (state, action) => {
        console.error('fetchTodo rejected:', action.error);
      });
  },
});

export default TotalSlice.reducer;