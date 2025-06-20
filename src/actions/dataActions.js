import { updateCustomer } from "../features/login/authSlice";
import { getCustomer } from "../services/ApiProtected";
export const fetchCustomer = () => async (dispatch) => {
  try {
    getCustomer().then((o) => {
      dispatch(updateCustomer(o));
    });
  } catch (error) {
    
  }
};
