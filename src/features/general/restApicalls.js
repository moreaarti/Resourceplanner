import axios from "axios";
import Cookies from 'js-cookie';
import store from "../../store";
import config from "../../config/config";


const token = ()=>{
    const data = Cookies.get('token');
    const user_details = data ?  JSON?.parse(data) : "";
    const token = user_details;
    return token;
}

const storeReduxData = store.getState();

export async function updateAttendanceRestApi(slack_id,channel_id,text) {
    const userData = token(); 
    const tokenValue = userData?.authToken;
  
    if (!tokenValue) {
      return Promise.reject("No token provided");
    }
  
    const url = `${config.API_ATTENDENCE_URL}/wp-json/amdital/v1/slack-attendance`;
  
    const headers = new Headers({
      "Authorization": `Bearer ${tokenValue}`,
      "Content-Type": "application/json"
    });
  
    const requestBody = JSON.stringify({
      user_id: slack_id,
      channel_id: channel_id,
      text: text,
    });
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: requestBody,
      });

      console.log("rrrree",response)
  
      if (!response.ok) {
        const errorData = await response.json();
        return errorData
        throw new Error(errorData?.message || 'Failed to update attendance');
      }
      return {
        success: true,
        message: 'Attendance updated successfully',
        status: response.status,
      };
    } catch (error) {
        return error
      console.error("Error updating attendance:", error);
      throw error;
    }
  }
  
  
  
  