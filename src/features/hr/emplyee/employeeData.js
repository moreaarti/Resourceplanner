import axios from "axios";
import config from "../../../config/config";
import Cookies from 'js-cookie';
import  store  from '../../../store';
import { setEmployeeData, setEmployeePagination, setSingleEmployeeAttachmentsView, setSingleEmployeeView, setUserData } from "./employeeSlice";
import { setCountryData, setEmployeeDropDownList, setEmployeeDropDownListHasNext, setEmployeeDropDownPagination, setEmployeeDropDownSearchList } from "../../general/generalSlice";
import { tokenExpireLogoutHandler } from "../../../components/elements/amdital/toastyMessage";

const token = ()=>{
    const data = Cookies.get('token');
    const user_details = data ?  JSON?.parse(data) : "";
    const token = user_details;
    return token;
}

const storeReduxData = store.getState();


export  async function getUserData (navigate){
     
    const userData = token();
    const token_value = userData?.authToken;
    const user_id =userData?.user?.id;

    if(token_value === ""){
      navigate('/logout')
      return false;  
    }
    const graphqlQuery = {
      query: `
        query NewQuery {
        user(id:"${user_id}") {

                  id
                  userId
                  userSalutation
                  firstName
                  lastName
                  phone
                  aboutInfo
                  address
                  email
                  dateOfBirth
                  emergencyContact
                  employmentEndDate
                  employmentStartDate
                  employmentType
                  gender
                  maritalStatus
                  memberID
                  nextPerformanceReview
                  salary
                  userRole
                  profileImage
                  userLanguages
                  userLoginAllowed
                  userNoticePeriodEndDate
                  userNoticePeriodStartDate
                  userProbationEndDate
                  userReceiveEmailNotifications
                  userCountry
                  userState
                  userDesignation
                  department
                  userHourlyRate
                  skills
                  manager{
                    id
                    name
                    profile_image
                    designation
                  }
                  lastPromotionDate
                  userIsInActive
                  userNotes
                  userDocuments
                  userBusinessAddress
                  salary 
                  
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
      
      if(res?.data?.data?.user){
        store.dispatch(setUserData(res?.data?.data?.user));
        return res
      }  
      if(res?.data?.errors){
        store.dispatch(setUserData({}));
        return res
      }

 
}

export async function getEmployeeData(companyId=null,first = null, last = null, nextValue = null , previousValue = null, showEntries = 10 , searchValue="",employmentValue,departmentValue,roleValue,statusValue,genderValue,filterValue) {

  const status_value = statusValue === "Active" || statusValue === undefined ? false : true;
  const gender_value = genderValue === "All" || genderValue === undefined ? "": genderValue;
  const employment_value = employmentValue === "All" || employmentValue === undefined ? "": employmentValue;
  const department_value = departmentValue === "All" || departmentValue === undefined ? "": departmentValue;
  const role_type = roleValue === "All" || roleValue === undefined ? null: roleValue?.toUpperCase();
  
  const userData = token();

  const token_value = userData?.authToken;

  const graphqlQuery = {
      query: `
        query NewQuery( $last: Int, $first: Int, $after: String,$before:String) {
          users(
            where: {
              orderby: { field: REGISTERED, order: DESC },
              role:${role_type},
              meta: {
                gender:"${gender_value}",
                userIsInActive:${status_value},
                employmentType:"${employment_value}",
                department:"${department_value}",
                companyId:${companyId},
                searchByName: "${searchValue}",
              },
            },
            first: $first,
            last: $last,
            after: $after,
            before: $before,
          ) {
            nodes {
                  id
                  userId
                  userSalutation
                  firstName
                  lastName
                  phone
                  aboutInfo
                  address
                  email
                  dateOfBirth
                  emergencyContact
                  employmentEndDate
                  employmentStartDate
                  employmentType
                  gender
                  maritalStatus
                  memberID
                  nextPerformanceReview
                  salary
                  userRole
                  profileImage
                  userLanguages
                  userLoginAllowed
                  userNoticePeriodEndDate
                  userNoticePeriodStartDate
                  userProbationEndDate
                  userReceiveEmailNotifications
                  userCountry
                  userState
                  userDesignation
                  department
                  userHourlyRate
                  skills
                  manager{
                    id
                    name
                    profile_image
                    designation
                  }
                  lastPromotionDate
                  userIsInActive
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
        "first": previousValue === null ? nextValue === null ? (first === null && last === null) ? showEntries : first === null ? null : showEntries : showEntries : null ,
        "last":  nextValue === null ?  previousValue === null ? (first === null && last === null) ? null : last === null ? null : showEntries : showEntries : null ,
        "after": nextValue === null ? null : nextValue,
        "before":previousValue === null ? null : previousValue
      },
    };
    const res= await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });
    if(res?.data?.errors){
      tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
      // store.dispatch(setEmployeeData([]));
    }
    if(res?.data?.data?.users?.nodes){
      store.dispatch(setEmployeeData(res?.data?.data?.users?.nodes));
      store.dispatch(setEmployeePagination(res?.data?.data?.users?.pageInfo));
    } 
    
    return res

}

export async function getSingleEmployeeData(user_id) {

  const userData = token();

  const token_value = userData?.authToken;

  const email =userData?.user?.email;

  const graphqlQuery = {
      query: `
        query NewQuery {
        user(id:"${user_id}") {
                  id
                  userId
                  userSalutation
                  firstName
                  lastName
                  phone
                  email
                  countryOfOrigin
                  addressPhone
                  presentAddressPhone
                  dateOfBirth
                  employmentType
                  gender
                  memberID  
                  slackUserId           
                  userRole
                  profileImage
                  userCountry
                  userState
                  userDesignation
                  department
                  manager{
                    id
                    name
                    profile_image
                    designation
                  }  
                  bloodGroup
                  personalEmail
                  fatherName
                  maritalStatus 
                  marriageDate
                  spouseName
                  userNationality
                  isInternationalEmployee
                  isPhysicallyChallenged
                  disabilityType
                  address
                  addressStreet
                  addressArea
                  addressCity
                  addressPin
                  isSameAsPermanent
                  presentAddress
                  presentAddressStreet
                  presentAddressArea
                  presentAddressCity
                  presentAddressPin
                  presentAddressCountry
                  presentAddressState
                  emergencyContactName
                  emergencyContact
                  emergencyContactRelationship
                  qualification{
                    degree
                    institute
                    from_year
                    to_year
                  } 
                  previousEmployment{
                    company_name
                    designation
                    from_date
                    to_date
                    company_address
                  }
                    bankCountry
                    bankAccountNumber
                    bankBranchName
                    bankName
                    bankCode
                    nameOnBankAcc
                    accountType
                    pfAccountDetails
                    pfUan
                    panNumber
                    panName
                    aadharNumber
                    aadharName
                    passportNumber
                    passportName
                    passportExpiryDate
                    familyDetails{
                      name
                      relationship
                      date_of_birth
                      gender
                      blood_group
                      nationality
                      is_minor
                      has_mental_illness
                      illness_type
                      mobile
                    } 
                  epfNomination{
                    name
                    relationship
                    nomination_percentage
                  }  
                  epsNomination{
                    name
                    relationship
                    nomination_percentage
                  }  
                  esiNomination{
                    name
                    relationship
                    nomination_percentage
                  }  
                  gravityNomination{
                    name
                    relationship
                    nomination_percentage
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
    if(res?.data?.errors){
      store.dispatch(setSingleEmployeeView({}));
      tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
      return {}
    }
    if(res?.data?.data?.user){
      store.dispatch(setSingleEmployeeView(res?.data?.data?.user));
      return res?.data?.data?.user
    }
}
export async function getSingleEmployeeAttachmentsData(user_id) {

  const userData = token();
  const token_value = userData?.authToken;
  const graphqlQuery = {
      query:` {
              mediaItems(where: {title: "${user_id}"}, first: 200) {
                edges {
                  cursor
                  node {
                    id
                    mimeType
                    fileSize
                    title
                    altText
                    sourceUrl
                    mediaItemId
                    mediaItemUrl
                  }
                }
                pageInfo {
                  endCursor
                  hasNextPage
                  hasPreviousPage
                  startCursor
                }
              }
            }`,
    };
    const res= await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });
    if(res?.data?.errors){
      store.dispatch(setSingleEmployeeAttachmentsView([]));
      tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
      return {}
    }
    if(res?.data?.data?.mediaItems){
      store.dispatch(setSingleEmployeeAttachmentsView(res?.data?.data?.mediaItems));
      return res
    }
}

export async function getCountryData() {
  const userData = token();
  const token_value = userData?.authToken;
  const graphqlQuery = {
      query: `
        query {
              getCountries{
                  code
                  name
              }
          }
      `,
    };

    if(storeReduxData?.general.country_data?.length === 0 ){
          const res= await axios.post(config.API_URL,graphqlQuery,{
            headers: {
              Authorization: `Bearer ${token_value}`,
              "Content-Type": "application/json",
            },
          });
          if(res?.data?.data?.getCountries){
            store.dispatch(setCountryData(res?.data?.data?.getCountries));
          }
          if(res?.data?.errors){
            store.dispatch(setCountryData([]));
            tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
          }
    }
}

export async function getEmployeeDropdownList (companyId=null,getEmployeeData = false,getHasNext=false,getSearch=false,showEntries=100,nextValue=null,searchValue=""){

  const userData = token();

  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
      query NewQuery( $last: Int, $first: Int, $after: String,$before:String) {
        users(
          where: {
            orderby: { field: REGISTERED, order: DESC },
            roleNotIn: CLIENT,
            meta: {companyId:${companyId},
            searchByName: "${searchValue}",}
          },
          first: $first,
          last: $last,
          after: $after,
          before: $before,

        ) {
          nodes {
            userId
            firstName
            lastName
            userDesignation
            profileImage
            email
            manager{
            id
            }
                
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
      "first": showEntries,
      "after": nextValue ,
    },
  };

  const res= await axios.post(config.API_URL,graphqlQuery,{
    headers: {
      Authorization: `Bearer ${token_value}`,
      "Content-Type": "application/json",
    },
  });
  if(res?.data?.errors){
    store.dispatch(setEmployeeDropDownList([]));
    store.dispatch(setEmployeeDropDownListHasNext([]));
    store.dispatch(setEmployeeDropDownSearchList([]));
    store.dispatch(setEmployeeDropDownPagination([]));
    tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
  }
  if(res?.data?.data?.users?.nodes){

    store.dispatch(setEmployeeDropDownPagination(res?.data?.data?.users?.pageInfo));

    if(getEmployeeData){
     
      store.dispatch(setEmployeeDropDownList(res?.data?.data?.users?.nodes));
    }
    if(getHasNext){
     
      store.dispatch(setEmployeeDropDownListHasNext(res?.data?.data?.users?.nodes));
    }
    if(getSearch){
      store.dispatch(setEmployeeDropDownSearchList(res?.data?.data?.users?.nodes));
    }
  } 
  return res
}


export async function updateProfileInformationApi( id,fields) {
  const userData = token();
  const token_value = userData?.authToken;
  const {
    firstName, lastName, memberID,phone, userDesignation,employmentType,
    department, userRole,managerID,dateOfBirth,slackUserId}= fields
 
    const graphqlQuery = {
      query: `
          mutation UpdateUser($input: UpdateUserInput!) {
            updateUser(input: $input) {
              user {
                id
              }
            }
          }
        `,
    variables: {
      input: {
       "id": id,
       "firstName":firstName,
       "lastName":lastName,
        "phone":phone,
        "memberID":memberID,
        "userRole":userRole,
        "employmentType":employmentType,
        "department":department,
        "dateOfBirth":dateOfBirth,
        "managerID":managerID || null,
        "userDesignation":userDesignation,
        
      },
    },
  }; 
  // "slackUserId":slackUserId,
    const res= await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      }})
  return res
}


export async function updatePersonalInformationApi( id,fields) {
  const userData = token();
  const token_value = userData?.authToken;
  const {
    bloodGroup, personalEmail,fatherName, maritalStatus,
    marriageDate, spouseName, countryOfOrigin, userNationality,
    isInternationalEmployee,
    isPhysicallyChallenged,
    disabilityType,
    emergencyContactName,
    emergencyContact,
    emergencyContactRelationship}= fields
 
    const graphqlQuery = {
      query: `
                  mutation UpdateUser {
              updateUser(
                input: {id:"${id}", 
                bloodGroup: "${bloodGroup}",
                personalEmail: "${personalEmail}", 
                fatherName: "${fatherName}", 
                maritalStatus: "${maritalStatus}", 
                marriageDate: "${marriageDate}", 
                spouseName: "${spouseName}", 
                countryOfOrigin: "${countryOfOrigin}", 
                userNationality: "${userNationality}", 
                isInternationalEmployee:${isInternationalEmployee} , 
                isPhysicallyChallenged:${isPhysicallyChallenged}, 
                disabilityType: "${disabilityType}", 
                emergencyContactName: "${emergencyContactName}", 
                emergencyContact: "${emergencyContact}", 
                emergencyContactRelationship: "${emergencyContactRelationship}", 
                }
              ) {
                user {
                  id
                }
              }
            }
        `,
  }; 
    const res= await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      }})
  return res
}

export async function updateAddressInformationApi( id,fields) {
  const userData = token();
  const token_value = userData?.authToken;
  const { address,
    addressStreet,
    addressArea,
    addressCity,
    userCountry,
    userState,
    addressPin,
    addressPhone,
    isSameAsPermanent,
    presentAddress,
    presentAddressStreet,
    presentAddressArea,
    presentAddressCity,
    presentAddressCountry,
    presentAddressState,
    presentAddressPin,
presentAddressPhone
  }= fields
 
    const graphqlQuery = {
      query: `
                  mutation UpdateUser {
              updateUser(
                input: {id:"${id}", 
                address: "${address}", 
                addressPhone:"${addressPhone}",
                addressStreet: "${addressStreet}",
                presentAddressPhone:"${presentAddressPhone}"
                 addressArea: "${addressArea}", 
                 addressCity: "${addressCity}", 
                 userCountry:"${userCountry}",
                 userState: "${userState}", 
                 addressPin: "${addressPin}", 
                 isSameAsPermanent: ${isSameAsPermanent}, 
                 presentAddress: "${presentAddress}", 
                 presentAddressStreet: "${presentAddressStreet}", 
                 presentAddressArea: "${presentAddressArea}", 
                 presentAddressCity: "${presentAddressCity}", 
                 presentAddressCountry:"${presentAddressCountry}",
                 presentAddressState:"${presentAddressState}"
                 presentAddressPin: "${presentAddressPin}", 
                }
              ) {
                user {
                  id
                }
              }
            }
        `,
  }; 
    const res= await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      }})
  return res
}

export async function updateQualificationInformationApi( id,qualification) {
  const userData = token();
  const token_value = userData?.authToken;
 
    const graphqlQuery = {
      query: `
          mutation UpdateUser($input: UpdateUserInput!) {
            updateUser(input: $input) {
              user {
                id
              }
            }
          }
        `,
    variables: {
      input: {
       "id": id,
       "qualification":qualification
      },
    },
  };
    const res= await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      }})
  return res
}
export async function updatePreviousEmploymentInformationApi( id,previous_employeement) {
  const userData = token();
  const token_value = userData?.authToken;

    const graphqlQuery = {
      query: `
          mutation UpdateUser($input: UpdateUserInput!) {
            updateUser(input: $input) {
              user {
                id
              }
            }
          }
        `,
    variables: {
      input: {
       "id": id,
       "previousEmployment":previous_employeement
      },
    },
  };
    const res= await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      }})
  return res
}

export async function updateAccountIdentificationInformationApi( id,fields) {
  const userData = token();
  const token_value = userData?.authToken;
    const graphqlQuery = {
      query: `
          mutation UpdateUser {
              updateUser(
                input: {id:"${id}",
                bankBranchName:"${fields?.bankBranchName}",
                bankName:"${fields?.bankName}", 
                bankCountry: "${fields?.bankCountry}", 
                bankAccountNumber: "${fields?.bankAccountNumber}", 
                bankCode: "${fields?.bankCode}", 
                nameOnBankAcc: "${fields?.nameOnBankAcc}", 
                accountType: "${fields?.accountType}", 
                pfAccountDetails: "${fields?.pfAccountDetails}", 
                pfUan: "${fields?.pfUan}", 
                panNumber: "${fields?.panNumber}", 
                panName: "${fields?.panName}", 
                aadharNumber: "${fields?.aadharNumber}", 
                aadharName: "${fields?.aadharName}", 
                passportNumber: "${fields?.passportNumber}", 
                passportName: "${fields?.passportName}", 
                passportExpiryDate: "${fields?.passportExpiryDate}" 
                }
              ) {
                user {
                  id
                }
              }
            }
          `
  };
    const res= await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      }})
  return res
}

export async function updateFamilyInformationApi( id,familyData) {
  const userData = token();
  const token_value = userData?.authToken;
 
    const graphqlQuery = {
      query: `
          mutation UpdateUser($input: UpdateUserInput!) {
            updateUser(input: $input) {
              user {
                id
              }
            }
          }
        `,
    variables: {
      input: {
       "id": id,
       "familyDetails":familyData
      },
    },
  };
    const res= await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      }})
  return res
}

export async function updateNominationInformationApi( id,fields) {
  const userData = token();
  const token_value = userData?.authToken;
 
    const graphqlQuery = {
      query: `
          mutation UpdateUser($input: UpdateUserInput!) {
            updateUser(input: $input) {
              user {
                id
              }
            }
          }
        `,
    variables: {
      input: {
       "id": id,
       "epfNomination":fields?.epfNomination,
       "epsNomination":fields?.epsNomination,
       "esiNomination":fields?.esiNomination,
       "gravityNomination": fields?.gravityNomination
      },
    },
  };
    const res= await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      }})
  return res
}

