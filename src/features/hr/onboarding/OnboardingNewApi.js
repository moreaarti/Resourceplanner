import axios from "axios";
import { tokenExpireLogoutHandler } from "../../../components/elements/amdital/toastyMessage";
import store from "../../../store";
import config from "../../../config/config";
import { setOnboardingAttachmentsData, setOnboardingCountryData, setOnboardingEmployeeData } from "./OnboardingSlice";
import Cookies from "js-cookie";
import he from "he";


const onboarding_token = () => {
  const data = localStorage.getItem("onboarding_employee_authentication_data");
  const user_data = JSON.parse(data);
  return user_data;
};

const token = () => {
  const data = Cookies.get("token");
  const user_details = data ? JSON?.parse(data) : "";
  const token = user_details;
  return token;
};

export async function sendInvitationHandler(fields, enqueueSnackbar) {
  try {
    const response = await sendInvitationApi(fields);
    if (response?.data?.data?.registerUser) {
      const successMessage = he.decode("Successfully sent invitation");
      enqueueSnackbar(successMessage, {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: { vertical: "top", horizontal: "right" },
        style: {
          background: "#FFFFFF",
          fontSize: "16px",
          fontWeight: "600",
          lineHeight: "20px",
          color: "#26212E",
        },
      });
    }
    if (response?.data?.errors) {
      const errorMessage = he.decode(
        response.data.errors[0]?.message || "Network error occurred",
      );
      const encodedMessage = errorMessage|| "Network error occurred";
      const parser = new DOMParser();
      const decodedMessage = parser.parseFromString(encodedMessage, "text/html").body.textContent;

      enqueueSnackbar(decodedMessage, {
        variant: "error",
        autoHideDuration: 1500,
        anchorOrigin: { vertical: "top", horizontal: "right" },
        style: {
          background: "#FF0000",
          fontSize: "16px",
          fontWeight: "500",
          color: "#FFFFFF",
        },
      });
    }
    return response;
  } catch (error) {
    enqueueSnackbar("An unexpected error occurred", {
      variant: "error",
      autoHideDuration: 1500,
      anchorOrigin: { vertical: "top", horizontal: "right" },
      style: {
        background: "#FF0000",
        fontSize: "16px",
        fontWeight: "500",
        color: "#FFFFFF",
      },
    });
  }
}

export async function sendInvitationApi(fields) {
  const userData = token();
  const token_value = userData?.authToken;
  const graphqlQuery = {
    query: `
           mutation RegisterUser {
  registerUser(
    input: {
        clientMutationId: "RegisterUser",
        firstName: "${fields.firstName}",
        lastName: "${fields.lastName}",
        email: "${fields.email}",
        username: "${fields.email}",
        phone: "${fields.phone}",
        department: "${fields.department}",
        memberID: "${fields.employeeId}",
        employmentStartDate: "${fields.dateOfJoining}",
        managerID: ${fields.reportingManager || null},
        isInvitationSent: true,
        invitationUrl: "${window.location.origin + "/onboarding-started"}",
        onboardingStatus: "inprogress",
        onboardingStep:"1",
        userRole:"${fields?.userRole}",
        userDesignation:"${fields?.userDesignation}",
        companyId:${fields?.companyId},
    }) {
    user {
      id
      name
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
  return res;
}

export async function onboardingOnStepCountHandler (id,setCount){
  const userData = onboarding_token();
  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
    mutation UpdateUser {
            updateUser(
              input: {
              id:${id},
              onboardingStep:"${setCount}"
              }
            ) {
              user {
                id
                onboardingStep
              }
            }
          }
`,
  };
  const res= await axios.post(config.API_LOGIN_URL,graphqlQuery,{
    headers: {
      Authorization: `Bearer ${token_value}`,
      "Content-Type": "application/json",
    },
  });
  return res
}

export async function getSingleEmployeeOnboardingData(user_id) {

  const userData = onboarding_token();

  const token_value = userData?.authToken;

  const graphqlQuery = {
      query: `
        query NewQuery {
        user(id:"${user_id}") {
                  id
                  userId
                  onboardingStatus
                  onboardingStep
                  userSalutation
                  firstName
                  lastName
                  phone
                  email
                  dateOfBirth
                  employmentType
                  gender
                  memberID  
                  slackUserId           
                  userRole
                  profileImage
                  countryOfOrigin
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
                  addressPhone
                  isSameAsPermanent
                  presentAddress
                  presentAddressStreet
                  presentAddressArea
                  presentAddressCity
                  presentAddressPin
                  presentAddressPhone
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
    const res= await axios.post(config.API_LOGIN_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });
    if(res?.data?.data?.user){
      store.dispatch(setOnboardingEmployeeData(res?.data?.data?.user))
      return res?.data?.data?.user
    }
    if(res?.data?.errors){
      store.dispatch(setOnboardingEmployeeData({}));
      tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
      return {}
    }
}

export async function getOnboardingCountryData() {
  const userData = onboarding_token();
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
          const res= await axios.post(config.API_LOGIN_URL,graphqlQuery,{
            headers: {
              Authorization: `Bearer ${token_value}`,
              "Content-Type": "application/json",
            },
          });
          if(res?.data?.data?.getCountries){
            store.dispatch(setOnboardingCountryData(res?.data?.data?.getCountries));
          }
          if(res?.data?.errors){
            store.dispatch(setOnboardingCountryData([]));
            tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
          }
}

export async function onboardingStatusUpdateCompleteHandler (id,setCount,status="completed"){
  const userData = onboarding_token();
  const token_value = userData?.authToken;
  const graphqlQuery = {
    query: `
    mutation UpdateUser {
            updateUser(
              input: {
              id:${id},
              onboardingStep:"${setCount}",
              onboardingStatus:"${status}"
              }
            ) {
              user {
                id
                onboardingStep
              }
            }
          }
`,
  };
  const res= await axios.post(config.API_LOGIN_URL,graphqlQuery,{
    headers: {
      Authorization: `Bearer ${token_value}`,
      "Content-Type": "application/json",
    },
  });
  return res
}

export async function personalInformationOnboardingApi(userId, fields) {
  const userData = onboarding_token();
  const qualifications = fields.qualification;
  const qualificationString = qualifications
    .map(
      (q) => `
    {
      degree: "${q.degree}", 
      institute: "${q.institute}", 
      from_year:"${q.from_year}", 
      to_year:"${q.to_year}"
    }
  `,
    )
    .join(",");

  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
      mutation UpdateUser {
        updateUser(
          input: {
            id: "${userId}", 
            bloodGroup: "${fields.bloodGroup}", 
            personalEmail: "${fields.personalEmail}", 
            dateOfBirth: "${fields.dateOfBirth}",
            gender: "${fields.gender}",
            fatherName: "${fields.fatherName}", 
            maritalStatus: "${fields.maritalStatus}", 
            marriageDate: "${fields.marriageDate}", 
            spouseName: "${fields.spouseName}", 
            countryOfOrigin:"${fields?.countryOfOrigin}",
            userNationality: "${fields.userNationality}", 
            isInternationalEmployee: ${fields.isInternationalEmployee}, 
            isPhysicallyChallenged: ${fields.isPhysicallyChallenged}, 
            disabilityType: "${fields.disabilityType}",     
            address: "${fields.address}", 
            addressStreet: "${fields.addressStreet}", 
            addressArea: "${fields.addressArea}", 
            addressCity: "${fields.addressCity}", 
            userCountry: "${fields.userCountry}", 
            userState: "${fields.userState}", 
            addressPin: "${fields.addressPin}", 
            addressPhone:"${fields?.addressPhone}",
            isSameAsPermanent: ${fields.isSameAsPermanent}, 
            presentAddress: "${fields.presentAddress}", 
            presentAddressStreet: "${fields.presentAddressStreet}", 
            presentAddressArea: "${fields.presentAddressArea}", 
            presentAddressCity: "${fields.presentAddressCity}", 
            presentAddressCountry: "${fields.presentAddressCountry}",
            presentAddressState: "${fields.presentAddressState}",
            presentAddressPin: "${fields.presentAddressPin}",
            presentAddressPhone:"${fields?.presentAddressPhone}",
            emergencyContactName: "${fields.emergencyContactName}",
            emergencyContact: "${fields.emergencyContact}", 
            emergencyContactRelationship: "${fields.emergencyContactRelationship}", 
            qualification: [${qualificationString}]
          }
        ) {
          user {
            id
          }
        }
      }
    `,
  };

  const res = await axios.post(config.API_LOGIN_URL, graphqlQuery, {
    headers: {
      Authorization: `Bearer ${token_value}`,
      "Content-Type": "application/json",
    },
  });

  if (res?.data?.data) {
    return res;
  }

  if (res?.data?.errors) {
    tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
    return res;
  }
}

export async function previousEmployementOnboardingApi(userId, fields) {
  const userData = onboarding_token();
  const token_value = userData?.authToken;

  const previousEmploymentString = fields
    .map(
      (emp) => `
    {
      company_name: "${emp.company_name}",
      designation: "${emp.designation}",
      from_date: "${emp.from_date}",
      to_date: "${emp.to_date}",
      company_address: "${emp.company_address}"
    }
  `,
    )
    .join(",");
  const graphqlQuery = {
    query: `
      mutation UpdateUser {
  updateUser(
    input: {
      id: ${userId}
      previousEmployment: [  ${previousEmploymentString}
      ]
    }
  ) {
    user {
      id
    }
  }
}

        `,
  };

  const res = await axios.post(config.API_LOGIN_URL, graphqlQuery, {
    headers: {
      Authorization: `Bearer ${token_value}`,
      "Content-Type": "application/json",
    },
  });
  return res;
}

export async function accountStatuoryOnboardingApi(userId, fields) {
  const userData = onboarding_token();
  const token_value = userData?.authToken;

  const graphqlQuery = {
    query: `
  mutation UpdateUser {
  updateUser(
    input: {id: ${userId},
    bankName:"${fields?.bankName}",
    bankBranchName:"${fields?.bankBranchName}",
    bankCountry: "${fields.bankCountry}", 
    bankAccountNumber: "${fields.bankAccountNumber}", 
    bankCode: "${fields.bankCode}", 
    nameOnBankAcc: "${fields.nameOnBankAcc}", 
    accountType: "${fields.accountType}", 
    pfAccountDetails: "${fields?.pfAccountDetails}", 
    pfUan: "${fields.pfUan}", 
    panNumber: "${fields?.panNumber}",
    panName: "${fields.panName}", 
    aadharNumber: "${fields.aadharNumber}", 
    aadharName: "${fields.aadharName}", 
    passportNumber: "${fields.passportNumber}", 
    passportName: "${fields.passportName}", 
    passportExpiryDate: "${fields.passportExpiryDate}" 
    }
  ) {
    user {
      id
    }
  }
}
        `,
  };


  const res = await axios.post(config.API_LOGIN_URL, graphqlQuery, {
    headers: {
      Authorization: `Bearer ${token_value}`,
      "Content-Type": "application/json",
    },
  });
  return res;
}

export async function familyMemberOnboardingApi(userId, fields) {
  const userData = onboarding_token();
  const token_value = userData?.authToken;
  const familyDetailsString = fields
    .map(
      (member) => `
  {
    name: "${member.name}",
    relationship: "${member.relationship}",
    date_of_birth: "${member.date_of_birth}",
    gender: "${member.gender}",
    blood_group: "${member.blood_group}",
    nationality: "${member.nationality}",
    is_minor: ${member.is_minor ? true : false}, 
    has_mental_illness: ${member.has_mental_illness ? true : false}, 
    illness_type: "${member.illness_type}",
    mobile: "${member.mobile}"
  }
`,
    )
    .join(",");

  const graphqlQuery = {
    query: `
 mutation UpdateUser {
  updateUser(
    input: {
      id: ${userId}
      familyDetails: [ 
        ${familyDetailsString}
      ]
    }
  ) {
    user {
      id  
    }
  }
}

        `,
  };

  const res = await axios.post(config.API_LOGIN_URL, graphqlQuery, {
    headers: {
      Authorization: `Bearer ${token_value}`,
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function nominationOnboardingApi( id,fields) {
  const userData = onboarding_token();
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
    const res= await axios.post(config.API_LOGIN_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      }})
  return res
}


export async function getAttachmentsOnboardingData(user_id) {

  const userData = onboarding_token();
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
    const res= await axios.post(config.API_LOGIN_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    });
    if(res?.data?.errors){
      store.dispatch(setOnboardingAttachmentsData([]));
      tokenExpireLogoutHandler(res?.data?.errors?.[0]?.message);
      return {}
    }
    if(res?.data?.data?.mediaItems){
      store.dispatch(setOnboardingAttachmentsData(res?.data?.data?.mediaItems));
      return res
    }
}

