import { createSlice } from "@reduxjs/toolkit";
import { appStorage } from "../../../services/appStorage";


const initialState = {
  onboarding_employee_authentication_data:appStorage.getLocalStorageJSON("onboarding_employee_authentication_data",{}),
  onboarding_employee_data:appStorage.getLocalStorageJSON("onboarding_employee_data",{}),
  onboarding_employee_attachments:appStorage.getLocalStorageJSON("onboarding_employee_attachments",[]),
  onboarding_country_data:appStorage.getLocalStorageJSON("onboarding_country_data",[]),
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setOnboardingAuthenticationData(state,action){
      state.onboarding_employee_authentication_data=action?.payload;
      appStorage.setLocalStorageJSON("onboarding_employee_authentication_data",action?.payload);
    },
    setOnboardingEmployeeData(state,action){
      state.onboarding_employee_data=action?.payload;
      appStorage.setLocalStorageJSON("onboarding_employee_data",action?.payload);
    },
    setOnboardingAttachmentsData(state,action){
      state.onboarding_employee_attachments=action?.payload;
      appStorage.setLocalStorageJSON("onboarding_employee_attachments",action?.payload);
    },
    setOnboardingCountryData(state,action){
      state.onboarding_country_data=action?.payload;
      appStorage.setLocalStorageJSON("onboarding_country_data",action?.payload);
    },

  }
});

export const { setOnboardingAuthenticationData, setOnboardingEmployeeData, setOnboardingAttachmentsData, setOnboardingCountryData } = onboardingSlice.actions;

export default onboardingSlice.reducer;
 