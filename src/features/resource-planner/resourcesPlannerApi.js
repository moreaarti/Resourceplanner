import axios from "axios";
import config from "../../config/config";
import Cookies from "js-cookie";
import store from "../../store";
// import client from "../../graphql/client"; // your graphql client path
import { tokenExpireLogoutHandler } from "../../components/elements/amdital/toastyMessage";
import {
  setresourcesPlannerHasNextListView,
  setresourcesPlannerListView,
  setresourcesPlannerListViewPagination,
} from "./resourcesPlannerSlice";

const token = () => {
  const data = Cookies.get("token");
  const user_details = data ? JSON?.parse(data) : "";

  const token = user_details;
  return token;
};

export async function getResourcePlannerApi(
  companyId = null,
  start_date = "2025-06-01",
  end_date = "2025-07-01",
  departmentValue,
  userValue,
  endCursor,
  loadMore = false,

  projectId = null,
) {
  const department_type =
    departmentValue === "All" || departmentValue === undefined
      ? ""
      : departmentValue;
  const user_type =
    userValue === "All" || userValue === undefined ? "" : userValue;

  const userData = token();
  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
                {
            users(where: { login:"${user_type}",meta: {     
              companyId: ${companyId},       
            department:"${department_type}",
            },roleNotIn: CLIENT},first: 100,after:"${endCursor}") {
              nodes {
                userId
                firstName
                lastName
                profileImage
                userDesignation
                assignmentsRecords(from_date: "${start_date}", to_date: "${end_date}") {
                  id
                  assignment_type
                  count_weekends
                  created_at
                  from_date
                  leave_type
                  notes
                  notify_to
                  project_name
                  task_name 
                  to_date
                  total_days
                  total_hours
                  total_tracked_time
                  updated_at
                  user_id
                  created_by
                 
                  
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
    store.dispatch(setresourcesPlannerListView(res?.data?.data?.users?.nodes));
    store.dispatch(
      setresourcesPlannerListViewPagination(res?.data?.data?.users?.pageInfo),
    );
    return res;
  }
  if (res?.data?.data?.users?.nodes && loadMore) {
    store.dispatch(
      setresourcesPlannerHasNextListView(res?.data?.data?.users?.nodes),
    );
    // store.dispatch(setShiftPaginationData(res?.data?.data?.users?.pageInfo));
    return res;
  }
  if (res?.data?.errors) {
    store.dispatch(setresourcesPlannerListView([]));
    store.dispatch(setresourcesPlannerListViewPagination({}));
    tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
    return res;
  }
}
export async function AddEmployeeAssignmentApi(fields) {
  const userData = token();
  const token_value = userData?.authToken;

  // Add
  const mutations = (fields?.member || [])
    .map((userId, index) => {
      return `
      assignment${index}: addEmployeeAssignment(input: {
        user_id: ${userId}
        assignment_type: "${fields?.assignmentType}"
        leave_type: "${fields?.leaveType || ""}"
        project_name: "${fields?.projectName}"
        from_date: "${fields?.startDate}"
        to_date: "${fields?.endDate}"
        total_days: ${fields?.totalDays}
        total_hours: ${fields?.totalHours}
        count_weekends: ${fields?.countWeekends}
        notes: "${fields?.notes || ""}"
        notify_to: ${fields?.notifyTo}
      }) {
        assignment {
          id
          user_id
          assignment_type
          leave_type
          project_name
          from_date
          to_date
          total_days
          total_hours
          count_weekends
          notes
          notify_to
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
      // Optional: create slice like shiftSlice if needed
      store.dispatch(setresourcesPlannerListView([]));

      tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
      return res;
    }

    return res;
  } catch (error) {
    return { error };
  }
}

// Main update function
export async function updateResourcePlannerDataApi(fields) {
  console.log("fields in update", fields);
  const userData = token();
  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
    mutation UpdateProjectTask {
      updateProjectTask(
        input: {
          id: ${JSON.stringify(fields?.id)}
          clientMutationId: "updateProjectTask"
          startDate: ${JSON.stringify(fields?.from_date || "")}
          dueDate: ${JSON.stringify(fields?.to_date || "")}
          estimate: ${fields?.estimate || 0}
          title: ${JSON.stringify(fields?.title || "")}
        }
      ) {
        projectTask {
          id
        }
      }
    }
  `,
  };

  try {
    const res = await axios.post(config.API_URL, graphqlQuery, {
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });

    if (res?.data?.errors) {
      store.dispatch(setresourcesPlannerListView([]));
      tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
      return res;
    }

    return res?.data?.data?.updateProjectTask;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

export async function deleteResourcePlannerApi(delete_id) {
  const userData = token();
  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `



      mutation DeleteProjectTask {
  deleteProjectTask(input: { id: ${delete_id} }) {
    deletedId
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
    store.dispatch(setresourcesPlannerListView([]));
    tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
    return res;
  }

  return res; // this is fine
}
export const getTasksListforDD = async (
  search = "",
  first = 10,
  after = "",
  projectId,
) => {
  const userData = token();
  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
    query {
      projectTasks(
        where: {
          search: "${search}"
          projectId: ${projectId ? projectId : null}
        },
        first: ${first},
        after: "${after}"
      ) {
        nodes {
          id
          projectTaskId
          title
          taskFields {
            relatedProject {
              nodes {
                ... on Project {
                  projectFields {
                    projectMembers {
                      nodes {
                        userId
                        firstName
                        lastName
                        profileImage
                        id
                        userDesignation
                      }
                    }
                  }
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  `,
  };

  try {
    const res = await axios.post(config.API_URL, graphqlQuery, {
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });

    if (res?.data?.errors) {
      tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
      return null;
    }

    // return res?.data?.data?.projectTasks || {};
    return res?.data?.data.projectTasks || {};
  } catch (error) {
    console.error("Error fetching tasks list:", error);
    return null;
  }
};

export const getProjectsListforDD = async (
  search = "",
  first = 10,
  after = "",
  projectMember,
) => {
  const userData = token();
  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
      query {
        projects(where: {projectMember: ${projectMember}, search: "${search}"}, first: ${first}, after: "${after}") {
          nodes {
            id
            projectId
            title
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    `,
  };

  try {
    const res = await axios.post(config.API_URL, graphqlQuery, {
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });

    if (res?.data?.errors) {
      tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
      return null;
    }

    return res?.data?.data?.projects || {};
  } catch (error) {
    console.error("Error fetching projects list:", error);
    return null;
  }
};

// Main update function
// export async function updateResourcePlannersavefortask(fields) {
//   const userData = token();
//   const token_value = userData?.authToken;

//   const graphqlQuery = {
//     query: `
//     mutation CreateProjectTask {
//   updateProjectTask(
//     input: {id: "cG9zdDoxMTAyMQ==", clientMutationId: "updateProjectTask", assignedTo: ["566", "553"]}
//   ) {
//     projectTask {
//       id
//     }
//   }
// }
//     `,
//   };

//   try {
//     const res = await axios.post(config.API_URL, graphqlQuery, {
//       headers: {
//         Authorization: `Bearer ${token_value}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (res?.data?.errors) {
//       store.dispatch(setresourcesPlannerListView([]));

//       tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
//       return res;
//     }

//     return res?.data?.data?.updateEmployeeAssignment;
//   } catch (error) {
//     console.error("API Error:", error);
//     return null;
//   }
// }

// Main update function
export async function updateResourcePlannersavefortask(fields) {
  const userData = token();
  const token_value = userData?.authToken;

  // Assuming fields contains id and assignedTo values
  const { id, assignedTo } = fields;

  const graphqlQuery = {
    query: `
      mutation CreateProjectTask {
        updateProjectTask(
          input: {
            id: "${id}"
            clientMutationId: "updateProjectTask"
            assignedTo: [${assignedTo.map((item) => `"${item}"`).join(", ")}]
          }
        ) {
          projectTask {
            id
          }
        }
      }
    `,
  };

  try {
    const res = await axios.post(config.API_URL, graphqlQuery, {
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });

    if (res?.data?.errors) {
      store.dispatch(setresourcesPlannerListView([]));
      tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
      return res;
    }

    return res?.data?.data?.updateProjectTask; // <-- Correct key here
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

export async function addTaskApi(fields) {
  const userData = token();
  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
    mutation CreateProjectTask {
  createProjectTask(
    input: {clientMutationId: "CreateProjectTask", title:"${
      fields.taskName || ""
    }", content: "checking", startDate: "${fields.start || ""}", dueDate:"${
      fields.end || ""
    }", status: PUBLISH, assignedTo: "${fields.member || ""}", estimate:${
      fields.estimate
    },  relatedProject: ${fields.relatedProject}}
  ) {
    projectTask {
      id
    }
  }
}
    `,
  };

  try {
    const res = await axios.post(config.API_URL, graphqlQuery, {
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });

    if (res?.data?.errors) {
      tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
      return res;
    }

    return res;
  } catch (error) {
    return error;
  }
}
