import axios from "axios";
import config from "../../config/config";
import Cookies from "js-cookie";
import store from "../../store";
import {
  setShiftData,
  setShiftHasNext,
  setShiftPaginationData,
} from "./shiftSlice";
import { tokenExpireLogoutHandler } from "../../components/elements/amdital/toastyMessage";

const token = () => {
  const data = Cookies.get("token");
  const user_details = data ? JSON?.parse(data) : "";
  const token = user_details;
  return token;
};

export async function getShiftsData(
  companyId,
  start_date = "",
  end_date = "",
  employmentValue,
  departmentValue,
  roleValue,
  userValue,
  endCursor,
  loadMore = false,
) {
  const employment_type =
    employmentValue === "All" || employmentValue === undefined
      ? ""
      : employmentValue;
  const department_type =
    departmentValue === "All" || departmentValue === undefined
      ? ""
      : departmentValue;
  const role_type =
    roleValue === "All" || roleValue === undefined
      ? null
      : roleValue?.toUpperCase();
  const user_type =
    userValue === "All" || userValue === undefined ? "" : userValue;

  const userData = token();
  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
                {
            users(where: { login:"${user_type}",role:${role_type},meta: {companyId:${companyId}
       
            },roleNotIn: CLIENT},first: 100,after:"${endCursor}") {
              nodes {
                userId
                firstName
                lastName
                profileImage
                userDesignation
                memberID
                shiftRecords(from_date: "${start_date}", to_date: "${end_date}") {
                  id
                  from_date
                  to_date
                  total_days
                  shifts
                  notes
                  is_full_day
                  created_at
                  updated_at
                }
              }
              pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
              }
            }
          }
      
      `,
  };
  const res = await axios.post(config.API_URL, graphqlQuery, {
    headers: {
      Authorization: `Bearer ${token_value}`,
      "Content-Type": "application/json",
    },
  });

  if (res?.data?.data?.users?.nodes && !loadMore) {
    store.dispatch(setShiftData(res?.data?.data?.users?.nodes));
    store.dispatch(setShiftPaginationData(res?.data?.data?.users?.pageInfo));
    return res;
  }
  if (res?.data?.data?.users?.nodes && loadMore) {
    store.dispatch(setShiftHasNext(res?.data?.data?.users?.nodes));
    store.dispatch(setShiftPaginationData(res?.data?.data?.users?.pageInfo));
    return res;
  }
  if (res?.data?.errors) {
    store.dispatch(setShiftData([]));
    store.dispatch(setShiftPaginationData({}));
    tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
    return res;
  }
}

export async function AddShiftDataApi(fields) {
  const userData = token();
  const token_value = userData?.authToken;

  // Construct multiple mutations using aliases
  const mutations = (fields?.member || [])
    .map((userId, index) => {
      return `
      shift${index}: addEmployeeShift(input: {
        user_id: ${userId}
        shifts: "${fields?.shiftType?.toLowerCase()}"
        from_date: "${fields?.startDate}"
        to_date: "${fields?.endDate}"
        total_days: ${fields?.totalDays}
        is_full_day: ${fields?.fullDay}
        notes: "${fields?.notes || ""}"
      }) {
        shift {
          id
          user_id
          shifts
          from_date
          to_date
          total_days
          is_full_day
          notes
          created_at
          updated_at
        }
      }
    `;
    })
    .join("\n");

  const graphqlQuery = {
    query: `mutation {\n${mutations}\n}`,
  };

  try {
    const res = await axios.post(config.API_URL, graphqlQuery, {
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });

    if (res?.data?.errors) {
      store.dispatch(setShiftData([]));
      tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
      return res;
    }

    return res;
  } catch (error) {
    return { error };
  }
}

export async function updateShiftDataApi(fields) {
  const userData = token();
  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
      mutation {
        updateEmployeeShift(input: {
          id: ${fields?.shift_id}
          shifts: "${fields?.shiftType}"           
          from_date: "${fields?.startDate}"    
          to_date: "${fields?.endDate}"      
          total_days:${fields?.totalDays}              
          is_full_day: ${fields?.fullDay}         
          notes: "${fields?.notes}"     
        }) {
          shift {
            id
            user_id
            shifts
            from_date
            to_date
            total_days
            is_full_day
            notes
            created_at
            updated_at
          }
        }
      }
  `,
  };
  const res = await axios.post(config.API_URL, graphqlQuery, {
    headers: {
      Authorization: `Bearer ${token_value}`,
      "Content-Type": "application/json",
    },
  });
  if (res?.data?.errors) {
    store.dispatch(setShiftData([]));
    tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
    return res;
  }
  if (res?.data?.data) {
    return res;
  }
  return res;
}

export async function deleteShiftDataApi(delete_id) {
  const userData = token();
  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
            mutation {
        deleteEmployeeShift(input: {
          id:${delete_id}
        }) {
          success
        }
      }
    `,
  };
  const res = await axios.post(config.API_URL, graphqlQuery, {
    headers: {
      Authorization: `Bearer ${token_value}`,
      "Content-Type": "application/json",
    },
  });
  if (res?.data?.errors) {
    store.dispatch(setShiftData([]));
    tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
    return res;
  }
  if (res?.data?.data) {
    return res;
  }
  return res;
}
