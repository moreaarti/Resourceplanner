import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  records: [],
  loading: false,
  error: null,
  toggle_api_call:false,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    fetchAttendanceStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAttendanceSuccess(state, action) {
      state.loading = false;
      state.records = action.payload;
    },
    fetchAttendanceFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setToggleAttendanceApiCall(state,action){
      state.toggle_api_call = !state.toggle_api_call
    }
  },
});

export const {
  fetchAttendanceStart,
  fetchAttendanceSuccess,
  fetchAttendanceFailure,
  setToggleAttendanceApiCall
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
