import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resourcesPlanner_list: [],
  resourcesPlanner_list_pagination: {},
  project_details: {},
  resourceTasks: [],
  resourceTasksPagination: {},
};

const resourcesPlannerSlice = createSlice({
  name: "resourcesPlanner",
  initialState,
  reducers: {
    setresourcesPlannerListView: (state, action) => {
      state.resourcesPlanner_list = action.payload;
    },
    setResourceTasks: (state, action) => {
      state.resourceTasks = action.payload;
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
    setResourceTasksPagination: (state, action) => {
      state.resourceTasksPagination = action.payload;
    },
  },
});

export const {
  setresourcesPlannerListView,

  setresourcesPlannerHasNextListView,
  setresourcesPlannerListViewPagination,
  setResourceTasks,
  setResourceTasksPagination,
} = resourcesPlannerSlice.actions;

export default resourcesPlannerSlice.reducer;
