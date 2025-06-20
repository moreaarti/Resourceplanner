import axios from "axios";
import Cookies from 'js-cookie';
import { setSettingCustomUserRole, setSettingDeatails, setSettingIntegrationData } from "./settingSlice";
import config from "../../config/config";
import store from '../../store'
import { tokenExpireLogoutHandler } from "../../components/elements/amdital/toastyMessage";


const token = ()=>{
    const data = Cookies.get('token');
    const user_details = data ?  JSON?.parse(data) : "";
    const token = user_details;
    return token;
}

const storeReduxData = store.getState();

export async function getSettingIntegration(companyID) {

    const userData = token();
    const token_value = userData?.authToken;
  
    const graphqlQuery = {
        query: `
             query {
                amditalIntegrations(company_id: ${companyID}) {
                        id
                        company_id
                        api_url
                        name
                        api_key
                        private_key
                        is_enabled
                    }
                }
        `,
      };
      const res= await axios.post(config.API_URL,graphqlQuery,{
        headers: {
          Authorization: `Bearer ${token_value}`,
          "Content-Type": "application/json",
        },
      });
      if(res?.data?.errors){
        // store.dispatch(setEmployeeData([]));
      }
      if(res?.data?.data?.amditalIntegrations){
        store.dispatch(setSettingIntegrationData(res?.data?.data?.amditalIntegrations));
      } 
      
      return res
    
}

export async function enableDisableIntegration (integrationId,value){


    const userData = token();
    const token_value = userData?.authToken;
  
    const graphqlQuery = {
        query: `
             mutation {
                updateAmditalIntegration(input: {id: ${integrationId},is_enabled:${value}}) {
                    integration {
                    id
                    name
                    api_key
                    private_key
                    is_enabled
                    }
                }
            }
        `,
      };
      const res= await axios.post(config.API_URL,graphqlQuery,{
        headers: {
          Authorization: `Bearer ${token_value}`,
          "Content-Type": "application/json",
        },
      });

    
      
      return res



}

export async function updateIntegration (integrationData){

   
    const userData = token();
    const token_value = userData?.authToken;
  
    const graphqlQuery = {
        query: `
             mutation {
                updateAmditalIntegration(input: {id:${integrationData?.id},name:"${integrationData?.name}",api_key:"${integrationData?.api_key}", private_key:"${integrationData?.private_key}",api_url:"${integrationData?.api_url}"}) {
                    integration {
                    id
                    name
                    api_key
                    private_key
                    is_enabled
                    }
                }
                }
        `,
      };
      const res= await axios.post(config.API_URL,graphqlQuery,{
        headers: {
          Authorization: `Bearer ${token_value}`,
          "Content-Type": "application/json",
        },
      });      
      return res;

}

export async function deleteIntegration (integrationData){

    const userData = token();
    const token_value = userData?.authToken;
  
    const graphqlQuery = {
        query: `
             mutation {
                    deleteAmditalIntegration(input: {id:${integrationData}}) {
                        deleted
                    }
                }
        `,
      };
      const res= await axios.post(config.API_URL,graphqlQuery,{
        headers: {
          Authorization: `Bearer ${token_value}`,
          "Content-Type": "application/json",
        },
      }); 

      return res;

}

export async function createIntegration(integrationData) {
    const userData = token();
    const token_value = userData?.authToken;
  
    const graphqlQuery = {
        query: `
            mutation {
            createAmditalIntegration(input: {company_id:${integrationData?.company_id},api_url:"${integrationData?.api_url}",name: "${integrationData?.name}", api_key: "${integrationData?.api_key}", private_key: "${integrationData?.private_key}", is_enabled: ${integrationData?.is_enabled}}) {
                integration {
                id
                name
                api_key
                private_key
                is_enabled
                company_id
                api_url
                }
            }
            }
        `,
      };
      const res= await axios.post(config.API_URL,graphqlQuery,{
        headers: {
          Authorization: `Bearer ${token_value}`,
          "Content-Type": "application/json",
        },
      }); 

      return res;
    
}

export async function getSettingdetails(userId) {
  const userData = token();
  const token_value = userData?.authToken;

  const storeData = storeReduxData?.settings?.setting_general;

  const graphqlQuery = {
      query: `
         query {
          getCompanySettingsByUserId(id: ${userId}) {
            id
            userId
            companyName
            companyWebsite
            companyEmail
            companyPhone
            companyLogo,
            moduleVisibility
            createdAt
            updatedAt
          }
        }
      `,
    };
      const res= await axios.post(config.API_URL,graphqlQuery,{
        headers: {
          Authorization: `Bearer ${token_value}`,
          "Content-Type": "application/json",
        },
      });
      if(res?.data?.data?.getCompanySettingsByUserId === null){
        store.dispatch(setSettingDeatails({}));
      }
      if(res?.data?.data?.getCompanySettingsByUserId !== null){
        store.dispatch(setSettingDeatails(res?.data?.data?.getCompanySettingsByUserId));
      }
      if(res?.data?.errors){
        store.dispatch(setSettingDeatails({}));
      }
      return res;

}


export async function addCompanyDetails(formData) {
  const userData = token();
  const token_value = userData?.authToken;
  const graphqlQuery = {
      query: `
         mutation {
          addCompanySettings(
            input: {
              userId:${formData?.userId},
              companyName: "${formData?.companyName}",
              companyWebsite: "${formData?.companyWebsite}",
              companyEmail: "${formData?.companyEmail}",
              companyPhone: "${formData?.companyPhone}",
              companyLogo: "${formData?.companyLogo}",
              moduleVisibility: "${formData?.moduleVisibility}",
            }
          ) {
            companySettings {
              id
              userId
              companyName
              companyWebsite
              companyEmail
              companyPhone
              companyLogo
              createdAt
              moduleVisibility  
            }
          }
        }

      `,
    };
    const res= await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });
    if(res?.data?.data?.addCompanySettings?.companySettings?.id){
      store.dispatch(setSettingDeatails(res?.data?.data?.addCompanySettings?.companySettings));
    }
    return res;
}

export async function updateCompanyDetails(formData) {
  const userData = token();
  const token_value = userData?.authToken;
  const graphqlQuery = {
      query: `
        mutation {
          updateCompanySettings(
            input: {
              id: ${formData?.id},
               userId:${formData?.userId},
              companyName: "${formData?.companyName}",
              companyWebsite: "${formData?.companyWebsite}",
              companyEmail: "${formData?.companyEmail}",
              companyPhone: "${formData?.companyPhone}",
              companyLogo: "${formData?.companyLogo}",
            }
          ) {
            companySettings {
              id
              userId
              companyName
              companyWebsite
              companyEmail
              companyPhone
              companyLogo
              moduleVisibility
              updatedAt
            }
          }
        }
      `,
    };
    const res= await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });
    if(res?.data?.data?.updateCompanySettings?.companySettings?.id){
      store.dispatch(setSettingDeatails(res?.data?.data?.updateCompanySettings?.companySettings));
    }
    return res;
}

export async function updateModulelistApi(formData) {
  const userData = token();
  const token_value = userData?.authToken;
  const graphqlQuery = {
      query: `
        mutation {
          updateCompanySettings(
            input: {
              id: ${formData?.id},
              userId:${formData?.userId},
              moduleVisibility:"${formData?.moduleVisibility}",
            }
          ) {
            companySettings {
              id
              userId
              companyName
              companyWebsite
              companyEmail
              companyPhone
              companyLogo
              moduleVisibility
              updatedAt
            }
          }
        }
      `,
    };
    const res= await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });
    if(res?.data?.data?.updateCompanySettings?.companySettings?.id){
      store.dispatch(setSettingDeatails(res?.data?.data?.updateCompanySettings?.companySettings));
    }
    return res;
}

export async function updateCompanyIdToOwnerAccount(userId, companyId) {
  const userData = token();
  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
      mutation UpdateUserAndCreateWiki($userInput: UpdateUserInput!) {
        updateUser: updateUser(input: $userInput) {
          user {
            id
            companyId
            onboardingStatus,
            onboardingStep,
          }
        }
      }
    `,
    variables: {
      userInput: {
        id: userId,
        companyId: parseInt(companyId),
        onboardingStatus: "completed",
        onboardingStep: "0",
      },
    },
  };

  const res = await axios.post(config.API_URL, graphqlQuery, {
    headers: {
      Authorization: `Bearer ${token_value}`,
      "Content-Type": "application/json",
    },
  });
  
  return res;
}

export async function getChannelListViewIntegrationApi(key_value) {
  const userData = token();
  const token_value = userData?.authToken;

  if (!token_value) {
    console.error("No auth token found");
    return;
  }
  
  try {
    const listViewResponse = await axios.post(config.API_ATTENDENCE_URL+"/wp-json/custom/v1/get-slack-channels",{
      "slackToken":`${key_value}`
  }, {
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });
    return listViewResponse;
  } catch (e) {
    return {error:"Wrong API key provided."}
  }
}

export async function getSlackIdApi(userId) {
  const userData = token();
  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
            query NewQuery {
        user(id:"${userId}") {
            userId
            firstName
            lastName
            slackUserId
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
  
  return res;
}






// export async function updateCompanyIdToOwnerAccount(userId, companyId) {
//   const userData = token();
//   const token_value = userData?.authToken;

//   const graphqlQuery = {
//     query: `
//       mutation UpdateUserAndCreateWiki($userInput: UpdateUserInput!, $wikiInput: CreateWikiCategoryInput!) {
//         updateUser: updateUser(input: $userInput) {
//           user {
//             id
//             companyId
//             onboardingStatus,
//             onboardingStep,
//           }
//         }
//         createWiki: createWikiCategory(input: $wikiInput) {
//           clientMutationId
//           wikiCategory {
//             wikiCategoryId
//             name
//             modifiedDate
//           }
//         }
//       }
//     `,
//     variables: {
//       userInput: {
//         id: userId,
//         companyId: parseInt(companyId),
//         onboardingStatus: "completed",
//         onboardingStep: "0",
//       },
//       wikiInput: {
//         name: "company_id_" +companyId.toString(),
//         parentId: "",
//       },
//     },
//   };

//   const res = await axios.post(config.API_URL, graphqlQuery, {
//     headers: {
//       Authorization: `Bearer ${token_value}`,
//       "Content-Type": "application/json",
//     },
//   });
//   console.log("res wiki category",res);
  
//   return res;
// }


// export async function getChannelListViewIntegrationApi() {
//     const userData = token(); 
//     const tokenValue = userData?.authToken;
  
//     if (!tokenValue) {
//       return Promise.reject("No token provided");
//     }
//     const url = `https://slack.com/api/conversations.list`;
  
//     const headers = new Headers({
//       "Authorization": `Bearer ${tokenValue}`,
//       "Content-Type": "application/json"
//     });
  
//     try {
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: headers,
//       });

//       const response1 = await  response?.json();

//       console.log("response1",response1)
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         return errorData
//         throw new Error(errorData?.message || 'Failed to update attendance');
//       }
      
//     } catch (error) {
//         return error
//       console.error("Error updating attendance:", error);
//       throw error;
//     }
//   }

export  async function getCustomUserRole(no_cache=false){
     
    const userData = token();
    const token_value = userData?.authToken;
    const storeReduxData = store.getState();
    const graphqlQuery = {
      query:`
      {
        customUserRoles {
          name
          displayName
        }
      }
      `,
    };
    if(storeReduxData?.settings?.settingCustomUserRole?.length > 0 && !no_cache){
      return storeReduxData?.settings?.settingCustomUserRole
    }
    if(storeReduxData?.settings?.settingCustomUserRole?.length === 0 || no_cache ){
          const res= await axios.post(config.API_URL,graphqlQuery,{
              headers: {
                Authorization: `Bearer ${token_value}`,
                "Content-Type": "application/json",
              },
            });

           if(res?.data?.data){
             store?.dispatch(setSettingCustomUserRole(res?.data?.data?.customUserRoles));
             return res
           }
           if(res?.data?.errors){
            store?.dispatch(setSettingCustomUserRole([]));
            tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
            return res
           }
    }
 
}

export  async function getPermissionSingleCustomUserRole(custom_role){
     
    const userData = token();
    const token_value = userData?.authToken;
    const graphqlQuery = {
      query:`
      {
        getRolePermissionInputPermissions(role: "${custom_role}")
      }
      `,
    };
 
          const res= await axios.post(config.API_URL,graphqlQuery,{
              headers: {
                Authorization: `Bearer ${token_value}`,
                "Content-Type": "application/json",
              },
            });

           if(res?.data?.data){
             return res
           }
           if(res?.data?.errors){
            tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
            return res
           }
 
}

export  async function updatePermissionCustomUserRole(custom_role,moduleList){
     
    const userData = token();
    const token_value = userData?.authToken;

        const formatPermissionsToGraphQL = (data) => {
          return Object.entries(data).map(([field, perms]) => {
            return `{ field: "${perms?.field}", view: ${perms.view}, edit: ${perms.edit}, update: ${perms.update}, delete: ${perms.delete} }`;
          }).join('\n');
        };

        const permissionsString = formatPermissionsToGraphQL(moduleList);

        const graphqlQuery = {
          query: `
            mutation UpdateRetailPermissions {
              updateRolePermissionInputPermissions(
                input: {
                  role: "${custom_role}"
                  permissions: [
                    ${permissionsString}
                  ]
                }
              ) {
                success
                message
              }
            }
          `,
        };

 
          const res= await axios.post(config.API_URL,graphqlQuery,{
              headers: {
                Authorization: `Bearer ${token_value}`,
                "Content-Type": "application/json",
              },
            });

           if(res?.data?.data){
             return res
           }
           if(res?.data?.errors){
            tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
            return res
           }
 
}

export  async function updateCustomUserRoleRenameApi(fields){
     
    const userData = token();
    const token_value = userData?.authToken;
    
        const graphqlQuery = {
          query: `
           mutation {
              updateCustomRole(input: {
                name: "${fields?.name}"
                displayName: "${fields?.displayName}"
              }) {
                success
                message
              }
            }
          `,
        };
 
          const res= await axios.post(config.API_URL,graphqlQuery,{
              headers: {
                Authorization: `Bearer ${token_value}`,
                "Content-Type": "application/json",
              },
            });

           if(res?.data?.data){
             return res
           }
           if(res?.data?.errors){
            tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
            return res
           }
 
}

export  async function addCustomUserRoleApi(fields){
     
    const userData = token();
    const token_value = userData?.authToken;
    
        const graphqlQuery = {
          query: `
            mutation {
              createCustomRole(input: {
                roleKey:"${fields?.roleKey}"
                roleName: "${fields?.roleName}"
                cloneFromRole: "${fields?.importRole}"
              }) {
                success
                message
              }
            }
          `,
        };
 
          const res= await axios.post(config.API_URL,graphqlQuery,{
              headers: {
                Authorization: `Bearer ${token_value}`,
                "Content-Type": "application/json",
              },
            });

           if(res?.data?.data){
             return res
           }
           if(res?.data?.errors){
            tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
            return res
           }
 
}

export  async function deleteCustomUserRoleApi(userRole){
     
    const userData = token();
    const token_value = userData?.authToken;
    
        const graphqlQuery = {
          query: `
           mutation {
              deleteCustomRole(input: {
                name:"${userRole}"
                fallbackRole:"employee"
              }) {
                success
                message
              }
            }
          `,
        };
 
          const res= await axios.post(config.API_URL,graphqlQuery,{
              headers: {
                Authorization: `Bearer ${token_value}`,
                "Content-Type": "application/json",
              },
            });

           if(res?.data?.data){
             return res
           }
           if(res?.data?.errors){
            tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
            return res
           }
 
}