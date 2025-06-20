import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { appStorage } from "../../services/appStorage";


const initialState = {
  data:appStorage.getLocalStorageJSON("token",{}),
  api_call_company_details:appStorage.getLocalStorageJSON("api_call_company_details",{}),
  remember_me_login:appStorage.getLocalStorageJSON("remember_me_login",{}),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setApiCallCompanyDetails(state, action) {
      state.api_call_company_details = action.payload;
      appStorage.setLocalStorageJSON("api_call_company_details",action.payload)
    },
    setRemeber(state, action) {
      state.remember_me_login = action.payload;
      appStorage.setLocalStorageJSON("remember_me_login",action.payload)
    },
    updatAuthCredentials(state, action) {
      state.data = action.payload.login_details;
      appStorage.setLocalStorageJSON("token",action?.payload?.login_details)
      if (action.payload.rememberMe) {
        Cookies.set('token', JSON.stringify(action.payload.login_details) , { expires:30 });
      }
      else if(action.payload.rememberMe === false){
        Cookies.set('token', JSON.stringify(action.payload.login_details) , { expires:7 });
      }
    },
  }
});

export const {updatAuthCredentials,setApiCallCompanyDetails,setRemeber} = authSlice.actions;

export default authSlice.reducer;
