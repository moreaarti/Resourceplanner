import axios from "axios";
import config from "../../../config/config";
import Cookies from "js-cookie";
import store from "../../../store";
import { setAttendanceData } from "../../general/generalSlice";
import { tokenExpireLogoutHandler } from "../../../components/elements/amdital/toastyMessage";

const getAttendanceRecords = async () => {
  const data = Cookies.get("token");
  const user_details = data ? JSON?.parse(data) : "";
  const token = user_details?.authToken;

  const graphqlQuery = {
    query:
      "query { getAttendanceRecords { id last_activity_type check_in_time check_out_time total_break worked_time total_time user_notes checkout_notes break_logs { id break_start_time break_end_time } created_at updated_at } }",
  };
  try {
    const res = await axios.post(config.API_URL, graphqlQuery, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if(res?.data?.errors){
      store.dispatch(setAttendanceData([]));
      tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
      return res
    }
    if (res?.data?.data?.getAttendanceRecords) {
      store.dispatch(setAttendanceData(res?.data?.data?.getAttendanceRecords));
      return res
    } else {
      store.dispatch(setAttendanceData([]));
       tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
       return res
    }
   
  } catch (e) {
    store.dispatch(setAttendanceData([]));
  }
};

export default getAttendanceRecords;
