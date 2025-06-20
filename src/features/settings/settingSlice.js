import { createSlice } from "@reduxjs/toolkit";
import { appStorage } from "../../services/appStorage";

const initialState = {
 setting_Integration_data:localStorage.getItem("setting_integration") ? JSON.parse(localStorage.getItem("setting_integration")) : [],
 setting_general:localStorage.getItem("setting_general") ? JSON.parse(localStorage.getItem("setting_general")) : {},
 setting_channel_listView:localStorage.getItem("setting_channel_listView") ? JSON.parse(localStorage.getItem("setting_channel_listView")) : [],
  settingCustomUserRole:[],
};

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettingIntegrationData(state, action) {
      state.setting_Integration_data = action.payload;
      appStorage.setLocalStorageJSON("setting_integration",action?.payload)
    },
    setSettingDeatails(state, action) {
      state.setting_general = action.payload;
      appStorage.setLocalStorageJSON("setting_general",action?.payload)
    },
    setChannelListView(state,action){
      state.setting_channel_listView = action.payload;
      appStorage.setLocalStorageJSON("setting_channel_listView",action?.payload)
    },
     setSettingCustomUserRole(state,action){
      state.settingCustomUserRole = action.payload
    },
  }
});

export const { setSettingIntegrationData,setSettingDeatails,setChannelListView,setSettingCustomUserRole } = settingSlice.actions;

export default settingSlice.reducer;
