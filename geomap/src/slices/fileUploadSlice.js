// slices/fileSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    file: null,
    loading: false,
    error: null,
}
const fileUploadSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    uploadFileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadFileSuccess: (state, action) => {
      state.file = action.payload;
      state.loading = false;
      state.error = null;
    },
    uploadFileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    reset: () => initialState
  },
});

export const {
  uploadFileRequest,
  uploadFileSuccess,
  uploadFileFailure,
  reset,
} = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
