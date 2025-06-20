import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  birth_day_data:[],
  birth_day_pagination:{}
};
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setBirthDayData(state, action) {
      state.birth_day_data = action.payload;
    },
    setBirthDayDataPagination(state,action){
      state.birth_day_pagination = action.payload;
    },
    setBrithDayHasNext(state, action) {
      const existing = state.birth_day_data || [];
      const combined = [...existing, ...action.payload];
      const uniqueByUserId = Array.from(
        new Map(combined.map(item => [item.userId, item])).values()
      );
    
      state.birth_day_data = uniqueByUserId;
    } 
  }
});

export const {setBirthDayData,setBirthDayDataPagination,setBrithDayHasNext } = dashboardSlice.actions;

export default dashboardSlice.reducer;
