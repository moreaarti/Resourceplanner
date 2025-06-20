import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName:"",
    isVerificationScreen: false,
  },
};

const authSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateRegisterData(state, action) {
      state.data = action.payload;
    },
  }
});

export const { updateRegisterData } = authSlice.actions;

export default authSlice.reducer;
