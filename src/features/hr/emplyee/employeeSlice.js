import { createSlice } from "@reduxjs/toolkit";
import { appStorage } from "../../../services/appStorage";


const initialState = {
  employee_data:[],
  user_details:appStorage.getLocalStorageJSON("user_details",{}),
  employee_pagination:{},
  selected_employee_data:{},
  employee_single_view:{},
  employee_single_attachments_view:[]
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeData(state, action) {
      state.employee_data = action.payload;
    },
    setAddNewEmployeeData(state,action){
      state.employee_data.unshift(action.payload);
    },
    setEmployeePagination(state,action){
      state.employee_pagination = action?.payload;
    },
    setSingleEmployeeView(state,action){
      state.employee_single_view = action?.payload
    },
    setSingleEmployeeAttachmentsView(state,action){
      state.employee_single_attachments_view = action?.payload
    },
    setUserData(state,action){
      state.user_details = action?.payload;
      appStorage.setLocalStorageJSON("user_details",action?.payload);
    },
    setSelectedEmployeeIds(state,action){
        state.selected_employee_data = action?.payload
    }
  }
});

export const { setEmployeeData, setAddNewEmployeeData,setEmployeePagination,setUserData,setSelectedEmployeeIds,setSingleEmployeeView,setSingleEmployeeAttachmentsView } = employeeSlice.actions;

export default employeeSlice.reducer;
