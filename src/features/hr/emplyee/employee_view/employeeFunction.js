import { errorMessageHandler, successfullMessageHandler } from "../../../../components/elements/amdital/toastyMessage";
import store from "../../../../store";
import { deleteMediaOnboardingEmployee, mediaUploadOnboarding, mediaUploadOnboardingEmployee } from "../../../profile/uploadImage";
import { getSingleEmployeeAttachmentsData, getSingleEmployeeData, updateAccountIdentificationInformationApi, updateAddressInformationApi, updateFamilyInformationApi, updateNominationInformationApi, updatePersonalInformationApi, updatePreviousEmploymentInformationApi, updateProfileInformationApi, updateQualificationInformationApi } from "../employeeData";

const storeReduxData = store.getState();


export async function getSingalEmployeeData(user_id) {
    const data = await getSingleEmployeeData(user_id);
    return data; 
}

export async function updateProfileInformation(id,fields,enqueueSnackbar) {
  try {
    const response = await updateProfileInformationApi(id,fields);
    if (response?.data?.data?.updateUser) {   
        successfullMessageHandler(enqueueSnackbar,"Successfully updated!")   
    }
    if (response?.data?.errors) {
        errorMessageHandler(enqueueSnackbar,response.data.errors[0]?.message || "Network error occurred");
    }
   return response
  } catch (error) {
    errorMessageHandler(enqueueSnackbar, "An unexpected error occurred");
  }
}

export async function updatePersonalInformation(id,fields,enqueueSnackbar) {
    try {
      const response = await updatePersonalInformationApi(id,fields);
      if (response?.data?.data?.updateUser) {   
          successfullMessageHandler(enqueueSnackbar,"Successfully updated!")   
      }
      if (response?.data?.errors) {
          errorMessageHandler(enqueueSnackbar,response.data.errors[0]?.message || "Network error occurred");
      }
     return response
    } catch (error) {
      errorMessageHandler(enqueueSnackbar, "An unexpected error occurred");
    }
  }

export async function updateAddressInformation(id,fields,enqueueSnackbar) {
    try {
      const response = await updateAddressInformationApi(id,fields);
      if (response?.data?.data?.updateUser) {   
          successfullMessageHandler(enqueueSnackbar,"Successfully updated!")   
      }
      if (response?.data?.errors) {
          errorMessageHandler(enqueueSnackbar,response.data.errors[0]?.message || "Network error occurred");
      }
     return response
    } catch (error) {
      errorMessageHandler(enqueueSnackbar, "An unexpected error occurred");
    }
  }

export async function updateQualificationInformation(id,fields,enqueueSnackbar) {
  
    const qualification = fields?.map((item)=>{
        return {
            degree:item?.degree,
            institute:item?.institute,
            from_year:item?.from_year,
            to_year:item?.to_year,
          }
    })
    
    try {
      const response = await updateQualificationInformationApi(id,qualification);
      if (response?.data?.data?.updateUser) {   
          successfullMessageHandler(enqueueSnackbar,"Successfully updated!")   
      }
      if (response?.data?.errors) {
          errorMessageHandler(enqueueSnackbar,response.data.errors[0]?.message || "Network error occurred");
      }
     return response
    } catch (error) {
      errorMessageHandler(enqueueSnackbar, "An unexpected error occurred");
    }
  }

export async function updatePreviousEmploymentInformation(id,fields,enqueueSnackbar) {

    const previous_employeement = fields?.map((item)=>{
        return {
            company_name:item?.company_name,
            designation:item?.designation,
            from_date:item?.from_date,
            to_date:item?.to_date,
            company_address:item?.company_address
          }
    })
    try {
      const response = await updatePreviousEmploymentInformationApi(id,previous_employeement);
      if (response?.data?.data?.updateUser) {   
          successfullMessageHandler(enqueueSnackbar,"Successfully updated!")   
      }
      if (response?.data?.errors) {
          errorMessageHandler(enqueueSnackbar,response.data.errors[0]?.message || "Network error occurred");
      }
     return response
    } catch (error) {
      errorMessageHandler(enqueueSnackbar, "An unexpected error occurred");
    }
  }

export async function updateAccountIdentificationInformation(id,fields,enqueueSnackbar) {

    try {
      const response = await updateAccountIdentificationInformationApi(id,fields);
      if (response?.data?.data?.updateUser) {   
          successfullMessageHandler(enqueueSnackbar,"Successfully updated!")   
      }
      if (response?.data?.errors) {
          errorMessageHandler(enqueueSnackbar,response.data.errors[0]?.message || "Network error occurred");
      }
     return response
    } catch (error) {
      errorMessageHandler(enqueueSnackbar, "An unexpected error occurred");
    }
  }

export async function updateFamilyInformation(id,fields,enqueueSnackbar) {

    try {
      const response = await updateFamilyInformationApi(id,fields);
      if (response?.data?.data?.updateUser) {   
          successfullMessageHandler(enqueueSnackbar,"Successfully updated!")   
      }
      if (response?.data?.errors) {
          errorMessageHandler(enqueueSnackbar,response.data.errors[0]?.message || "Network error occurred");
      }
     return response
    } catch (error) {
      errorMessageHandler(enqueueSnackbar, "An unexpected error occurred");
    }
  }

export async function updateNominationInformation(id,fields,enqueueSnackbar) {

    try {
      const response = await updateNominationInformationApi(id,fields);
      if (response?.data?.data?.updateUser) {   
          successfullMessageHandler(enqueueSnackbar,"Successfully updated!")   
      }
      if (response?.data?.errors) {
          errorMessageHandler(enqueueSnackbar,response.data.errors[0]?.message || "Network error occurred");
      }
     return response
    } catch (error) {
      errorMessageHandler(enqueueSnackbar, "An unexpected error occurred");
    }
  }


export  function countryNameDisplay (countryCode){
    if(countryCode){
        const countryData = storeReduxData?.general.country_data;
        const countryName = countryData?.length > 0 ? countryData?.filter(item=>item?.code === countryCode)?.map(item=>item?.name): ["N/A"]
        return countryName?.[0]
    }
    return "N/A";
}

export function sourceUrlConvertToImageName(url) {
  const filenameWithExt = url ?  url?.split("/")?.pop() : "";
  const [filename, extension] = filenameWithExt?  filenameWithExt?.split(/\.(?=[^\.]+$)/) :"";
  return filename;
}
  
export async function fileUploadedHandler (e,params_id,altText,enqueueSnackbar){
    const file = e.target.files[0];
    const response = await mediaUploadOnboardingEmployee(file, params_id, altText);
    if(response?.id){
      successfullMessageHandler(enqueueSnackbar,"Image uploaded successfully!.")
      const attachmentData = await getSingleEmployeeAttachmentsData(params_id);
      return false;
    }
    errorMessageHandler(enqueueSnackbar,response?.message)
     return response;
  };

  export async function fileDeleteHandler (imageId,params_id){
    const response = await deleteMediaOnboardingEmployee(imageId);
     const attachmentData = await getSingleEmployeeAttachmentsData(params_id);
  };