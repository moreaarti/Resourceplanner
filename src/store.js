import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './features/general/reStoreSlice'; // or 'rootReducer.js'

const store = configureStore({
  reducer: rootReducer,
});

export default store;

