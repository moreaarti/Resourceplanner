import axios from 'axios';
import config from '../../../config/config';
import Cookies from 'js-cookie';
import {
  fetchAttendanceStart,
  fetchAttendanceSuccess,
  fetchAttendanceFailure,
} from './attendanceSlice';
import { tokenExpireLogoutHandler } from '../../../components/elements/amdital/toastyMessage';

const tokenValue = () => {
  const data = Cookies.get('token');
  const user_details = data ? JSON.parse(data) : null;
  const token = user_details?.authToken || '';
  return token;
};

const getFormattedDate = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

export const fetchAttendanceRecords = (filter, customDates = {}, fixedEmployeeID = null,companyId=null) => async (dispatch) => {
  dispatch(fetchAttendanceStart());

  const token = tokenValue();
  let today = new Date();
  let startDate, endDate;


  if (filter === "Today") {
    startDate = `${getFormattedDate(today)} 00:00:00`;
    endDate = `${getFormattedDate(today)} 23:59:59`;
  } else if (filter === "Yesterday") {
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    startDate = `${getFormattedDate(yesterday)} 00:00:00`;
    endDate = `${getFormattedDate(yesterday)} 23:59:59`;
  } else if (filter === "This week") {
    let weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    startDate = `${getFormattedDate(weekStart)} 00:00:00`;
    endDate = `${getFormattedDate(today)} 23:59:59`;
  } else if (filter === "Last week") {
    let lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
    let lastWeekEnd = new Date(lastWeekStart);
    lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
    startDate = `${getFormattedDate(lastWeekStart)} 00:00:00`;
    endDate = `${getFormattedDate(lastWeekEnd)} 23:59:59`;
  } else if (filter === "Last 14 days") {
    let last14DaysStart = new Date(today);
    last14DaysStart.setDate(today.getDate() - 14);
    startDate = `${getFormattedDate(last14DaysStart)} 00:00:00`;
    endDate = `${getFormattedDate(today)} 23:59:59`;
  } else if (filter === "This Month") {
    let monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    let monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    startDate = `${getFormattedDate(monthStart)} 00:00:00`;
    endDate = `${getFormattedDate(monthEnd)} 23:59:59`;
  } else if (filter === "Last Month") {
    let lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    let lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    startDate = `${getFormattedDate(lastMonthStart)} 00:00:00`;
    endDate = `${getFormattedDate(lastMonthEnd)} 23:59:59`;
  } else if (filter === "Last 30 days") {
    let last30DaysStart = new Date(today);
    last30DaysStart.setDate(today.getDate() - 30);
    startDate = `${getFormattedDate(last30DaysStart)} 00:00:00`;
    endDate = `${getFormattedDate(today)} 23:59:59`;
  } else if (filter === "Custom") {
    startDate = `${customDates.startDate} 00:00:00`;
    endDate = `${customDates.endDate} 23:59:59`;
  }



const graphqlQuery = {
  query: `
    query NewQuery (
      $companyId: Int, 
      $department: String,
      $designation:String,
      $today_start: String, 
      $today_end: String,
      $first:Int,
    ) {
      users(where: {
        meta: {
          companyId: $companyId,
          department: $department,
          userDesignation:$designation,
        },
      },first:$first) {
        nodes {
          userId
          firstName
          lastName
          profileImage
          userDesignation
          department
          attendanceRecords(where: { 
            attendanceFrom: $today_start, 
            attendanceTo: $today_end 
          }) {
            check_in_time
            check_out_time
            checkout_notes
            created_at
            id
            last_activity_type
            total_break
            total_time
            updated_at
            worked_time
            user_notes
            break_logs {
              break_end_time
              break_start_time
              id
            }
          }
        }
      }
    }
  `,
  variables: {
    first:100,
    companyId: companyId?parseInt(companyId):null,
    email:
      fixedEmployeeID !== "all" && fixedEmployeeID !== "All"
        ? fixedEmployeeID
        : filter.user_id || "",
    department: filter.department || null,
    designation: filter.designation || null,
    today_start: filter.startDate || startDate,
    today_end: filter.endDate || endDate,
  },
};


  try {
    const response = await axios.post(config.API_URL, graphqlQuery, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(fetchAttendanceSuccess(response.data?.data.users?.nodes));
  } catch (error) {
    tokenExpireLogoutHandler(error?.message);
    dispatch(fetchAttendanceFailure(error.message));
  }
};