import { createSlice } from "@reduxjs/toolkit";
import { appStorage } from "../../services/appStorage";

const initialState = {
  showPopupMenu: false,
  showCustomerSupport:false,
  showGlobalSearch:false,
  attendance_data:[],
  country_data:localStorage.getItem("country_data")? JSON.parse(localStorage?.getItem("country_data")):[],
  state_data:localStorage?.getItem("state_data")? JSON.parse(localStorage?.getItem("state_data")):[],
  settingDropDown:localStorage?.getItem("setting_data")? JSON?.parse(localStorage?.getItem("setting_data")):{},
  employee_dropdown_data_list:localStorage?.getItem("employee_dropdown_data_list")? JSON?.parse(localStorage?.getItem("employee_dropdown_data_list")):[],
  employee_dropdown_data_list_pagination:localStorage?.getItem("employee_dropdown_data_list_pagination")? JSON?.parse(localStorage?.getItem("employee_dropdown_data_list_pagination")):{},
  employee_dropdown_filter_value:localStorage.getItem("employee_dropdown_filter_value")? JSON.parse(localStorage?.getItem("employee_dropdown_filter_value")):{
    id: "all",
    name: "All" ,
    profileImage: "",
    userDesignation:"All"
  }

};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    togglePopupMenuStatus(state, action){
      state.showPopupMenu = !state.showPopupMenu;
    },
    getPopupMenuStatus(state, action) {
      return state.showPopupMenu;
    },
    toggleCustomerSupport(state,action){
      state.showCustomerSupport = !state.showCustomerSupport;
    },
    toggleGlobalSearch(state,action){
      state.showGlobalSearch = !state?.showGlobalSearch;
    },
    setAttendanceData(state,action){
      state.attendance_data = action?.payload
    },
    setCountryData(state,action){
      state.country_data =action.payload;
      appStorage.setLocalStorageJSON("country_data",action?.payload)
    },
    setStateData(state,action){
      state.state_data =action.payload;
      appStorage.setLocalStorageJSON("state_data",action?.payload)
    },
    setSettingDropDown(state,action){
      state.settingDropDown =action.payload;
      appStorage.setLocalStorageJSON("setting_data",action?.payload)
    },
    setEmployeeDropDownList(state, action) {
      state.employee_dropdown_data_list = action.payload;
      appStorage.setLocalStorageJSON("employee_dropdown_data_list", action?.payload);
    },
    setEmployeeDropDownListHasNext(state, action) {
      state.employee_dropdown_data_list = [
        ...(state.employee_dropdown_data_list || []),
        ...action.payload
      ];
      appStorage.setLocalStorageJSON("employee_dropdown_data_list", state.employee_dropdown_data_list);
    },
    setEmployeeDropDownSearchList(state, action) {
      state.employee_dropdown_data_list = action.payload;
      appStorage.setLocalStorageJSON("employee_dropdown_data_list", action?.payload);
    },
    setEmployeeDropDownPagination(state, action) {
      state.employee_dropdown_data_list_pagination = action.payload;
      appStorage.setLocalStorageJSON("employee_dropdown_data_list_pagination", action?.payload);
    },
    setEmployeeDropDownFilterValue(state, action) {
      state.employee_dropdown_filter_value = action.payload;
      appStorage.setLocalStorageJSON("employee_dropdown_filter_value", action?.payload);
    }
  }
});

export const {togglePopupMenuStatus,getPopupMenuStatus,toggleCustomerSupport,toggleGlobalSearch,setAttendanceData, setCountryData, setStateData, setSettingDropDown
  , setEmployeeDropDownList, setEmployeeDropDownListHasNext, setEmployeeDropDownSearchList,setEmployeeDropDownPagination,setEmployeeDropDownFilterValue
} = generalSlice.actions;

export default generalSlice.reducer;
