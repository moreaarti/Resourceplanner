import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resourcesPlanner_list: [],
  resourcesPlanner_list_pagination: {},
  project_details: {},
};

const resourcesPlannerSlice = createSlice({
  name: "resourcesPlanner",
  initialState,
  reducers: {
    setresourcesPlannerListView: (state, action) => {
      state.resourcesPlanner_list = action.payload;
    },
    setresourcesPlannerHasNextListView: (state, action) => {
      state.resourcesPlanner_list = [
        ...state.resourcesPlanner_list,
        ...action.payload,
      ];
    },
    setresourcesPlannerListViewPagination: (state, action) => {
      state.resourcesPlanner_list_pagination = action.payload;
    },
  },
});

export const {
  setresourcesPlannerListView,

  setresourcesPlannerHasNextListView,
  setresourcesPlannerListViewPagination,
} = resourcesPlannerSlice.actions;

export default resourcesPlannerSlice.reducer;
