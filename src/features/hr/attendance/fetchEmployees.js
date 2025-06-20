import axios from "axios";
import {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
} from "../../general/employeeSlice";
import config from "../../../config/config";
import Cookies from "js-cookie";

const tokenValue = () => {
  const data = Cookies.get("token");
  const user_details = data ? JSON.parse(data) : null;
  return user_details?.authToken || "";
};

export const fetchEmployees = (variables) => async (dispatch) => {
  dispatch(fetchEmployeesStart());

  const token = tokenValue();

  const graphqlQuery = {
    query: `
      query NewQuery($companyId:Int,$first: Int, $after: String, $search: String) {
        users(
          where: {
            orderby: { field: REGISTERED, order: DESC },
            roleNotIn: CLIENT,
              meta: {companyId:$companyId,searchByName:$search,}
          },
          first: $first,
          after: $after
        ) {
          nodes {
            userId
            firstName
            lastName
            userDesignation
            profileImage
            email
          }
          pageInfo {
            startCursor
            hasPreviousPage
            endCursor
            hasNextPage
          }
        }
      }
    `,
    variables: {
      ...variables,
      search: variables.search || "", // Ensures search is never null/undefined
    },
  };

  try {
    const response = await axios.post(config.API_URL, graphqlQuery, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.errors) {
      dispatch(fetchEmployeesFailure(response.data.errors));
      return;
    }

    const { nodes, pageInfo } = response.data.data.users;

    dispatch(fetchEmployeesSuccess({ employees: nodes, pageInfo, variables }));

  } catch (error) {
    dispatch(fetchEmployeesFailure(error.message));
  }
};
