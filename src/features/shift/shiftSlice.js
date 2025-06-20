import { createSlice } from "@reduxjs/toolkit";
// import { appStorage } from "../../../services/appStorage";

const initialState = {
  shift_data: [],
  shift_pagination: {},
};

const shiftSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    setShiftData(state, action) {
      state.shift_data = action.payload;
    },
    setShiftPaginationData(state, action) {
      state.shift_pagination = action.payload;
    },
    setShiftHasNext(state, action) {
      state.shift_data = [...(state.shift_data || []), ...action.payload];
    },
  },
});

export const { setShiftData, setShiftPaginationData, setShiftHasNext } =
  shiftSlice.actions;

export default shiftSlice.reducer;
