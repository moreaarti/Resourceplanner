import config from "../../config/config";
import Cookies from 'js-cookie';


const tokenValue = ()=>{
    const data = Cookies.get('token');
    const user_details = data ?  JSON?.parse(data) : "";
    const token = user_details;
    return token;
}

const onboarding_token = () => {
  const data = localStorage.getItem("onboarding_employee_authentication_data");
  const user_data = JSON.parse(data);
  return user_data;
};

export async function mediaUpload(file) {
  const userData = tokenValue();
  const token_value = userData?.authToken;
  if (!file) {
    return;
  }
  let token = token_value;
  if (token === null) return Promise.reject("No token");

  var formdata = new FormData();
  formdata.append("file", file, file.name);

  let headers = new Headers();
  headers.append("Authorization", "Bearer " + token);

  // Append the query string to the API URL
  const uploadUrl = `${config.API_UPLOAD_FILE_URL}`;

  // Uploading the file using the fetch API to the server
  return await fetch(uploadUrl, {
    method: 'POST',
    body: formdata,
    headers: headers,
  }).then((r) => r.json());
}


export async function uploadFile(file){
    const data = await mediaUpload(file);
    return data;
  }


  export async function mediaUploadProfilePic(file, params = {}) {
    const userData = tokenValue();
    const token_value = userData?.authToken;
  
    if (!file) {
      return;
    }
  
    let token = token_value;
  
    if (token === null) return Promise.reject("No token");
  
    var formdata = new FormData();
    formdata.append("file", file, file.name);
  
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
  
    // Construct the query string from the `params` object
    const queryString = new URLSearchParams(params).toString();
  
    // Append the query string to the API URL
    const uploadUrl = `${config.API_UPLOAD_FILE_URL}?${queryString}`;
  
    // Uploading the file using the fetch API to the server
    return await fetch(uploadUrl, {
      method: 'POST',
      body: formdata,
      headers: headers,
    }).then((r) => r.json());
  }
  
 export async function attachProfile(file,user_id) {

    const params = { set_avatar: true, user_id: user_id };

    const res =  await mediaUploadProfilePic (file,params); 
    return res
    
 }
 export async function attachOnnboardProfile(file,user_id) {

    const params = { set_avatar: true, user_id: user_id };

    const res =  await mediaUploadOnboardingStaticUrl (file,'profile_image','profileImage',params); 
    return res
    
 }
  export async function mediaUploadOnboardingStaticUrl(file,title,alt_text,params ={}) {
  const userData =onboarding_token();
  const token_value = userData?.authToken;
  if (!file) {
    return;
  }
  let token = token_value;
  if (token === null) return Promise.reject("No token");

  var formdata = new FormData();
  formdata.append("file", file, file.name);
  formdata.append("title", title);
  formdata.append("alt_text", alt_text);
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + token);

  // Append the query string to the API URL
  const queryString = new URLSearchParams(params).toString();
  const uploadUrl = `${config.API_UPLOAD_FILE_URL_STATIC}?${queryString}`;

  // Uploading the file using the fetch API to the server
  return await fetch(uploadUrl, {
    method: 'POST',
    body: formdata,
    headers: headers,
  }).then((r) => r.json());
}
 export async function deleteMediaOnboardingStaticUrl(id) {
  const userData =onboarding_token();
  const token_value = userData?.authToken;
  if (!id) {
    return;
  }
  let token = token_value;
  if (token === null) return Promise.reject("No token");

  let headers = new Headers();
  headers.append("Authorization", "Bearer " + token);

  const deleteUrl = `${config.API_UPLOAD_FILE_URL_STATIC}/${id}?force=true`;

  return await fetch(deleteUrl, {
    method: 'DELETE',
    headers: headers,
  }).then((r) => r.json());
}

 export async function mediaUploadOnboarding(file,title,alt_text,params ={}) {
  const userData =onboarding_token();
  const token_value = userData?.authToken;
  if (!file) {
    return;
  }
  let token = token_value;
  if (token === null) return Promise.reject("No token");

  var formdata = new FormData();
  formdata.append("file", file, file.name);
  formdata.append("title", title);
  formdata.append("alt_text", alt_text);
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + token);

  // Append the query string to the API URL
  const queryString = new URLSearchParams(params).toString();
  const uploadUrl = `${config.API_UPLOAD_FILE_URL}?${queryString}`;

  // Uploading the file using the fetch API to the server
  return await fetch(uploadUrl, {
    method: 'POST',
    body: formdata,
    headers: headers,
  }).then((r) => r.json());
}
 export async function deleteMediaOnboarding(id) {
  const userData =onboarding_token();
  const token_value = userData?.authToken;
  if (!id) {
    return;
  }
  let token = token_value;
  if (token === null) return Promise.reject("No token");

  let headers = new Headers();
  headers.append("Authorization", "Bearer " + token);

  const deleteUrl = `${config.API_UPLOAD_FILE_URL}/${id}?force=true`;

  return await fetch(deleteUrl, {
    method: 'DELETE',
    headers: headers,
  }).then((r) => r.json());
}


export async function mediaUploadOnboardingEmployee(file,title,alt_text,params ={}) {
  const userData = tokenValue();
  const token_value = userData?.authToken;
  if (!file) {
    return;
  }
  let token = token_value;
  if (token === null) return Promise.reject("No token");

  var formdata = new FormData();
  formdata.append("file", file, file.name);
  formdata.append("title", title);
  formdata.append("alt_text", alt_text);
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + token);

  // Append the query string to the API URL
  const queryString = new URLSearchParams(params).toString();
  const uploadUrl = `${config.API_UPLOAD_FILE_URL}?${queryString}`;

  // Uploading the file using the fetch API to the server
  return await fetch(uploadUrl, {
    method: 'POST',
    body: formdata,
    headers: headers,
  }).then((r) => r.json());
}

export async function deleteMediaOnboardingEmployee(id) {
  const userData = tokenValue();
  const token_value = userData?.authToken;
  if (!id) {
    return;
  }
  let token = token_value;
  if (token === null) return Promise.reject("No token");

  let headers = new Headers();
  headers.append("Authorization", "Bearer " + token);

  const deleteUrl = `${config.API_UPLOAD_FILE_URL}/${id}?force=true`;

  return await fetch(deleteUrl, {
    method: 'DELETE',
    headers: headers,
  }).then((r) => r.json());
}
