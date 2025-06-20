import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../login/authSlice";
import registerSlice from "../register/registerSlice";
import generalSlice from "../general/generalSlice";
import employeeSlice from "../hr/emplyee/employeeSlice";
import employeeReducer from "../general/employeeSlice";
import settingSlice from "../settings/settingSlice";
import dashboardSlice from "../dashboard/DashboardSlice";
import shiftSlice from "../shift/shiftSlice";
import resourcesPlannerSlice from "../resource-planner/resourcesPlannerSlice";

const appReducer = combineReducers({
  auth: authSlice,
  register: registerSlice,
  general: generalSlice,
  employees: employeeReducer,
  employee: employeeSlice,
  settings: settingSlice,
  dashboard: dashboardSlice,
  shift: shiftSlice,
  // resourcesPlanner: resourcesPlannerSlice,
  resourcesPlanner: resourcesPlannerSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
