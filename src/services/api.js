
export function getUserData() {
  let data = localStorage.getItem("data") !== null ? JSON.parse(localStorage.getItem("data")) : null;
  return data;
}
export function getToken() {
  let data = getUserData();
  return data ? data.token : null;
}


const controller = new AbortController();
const signal = controller.signal;
let lastRequestUrl = null;
let lastRequestMethod = null;
let lastRequestData = null;
export async function request(url, data, method) {

  let jsonData = JSON.stringify(data);

  if(lastRequestUrl===url && lastRequestMethod===method && lastRequestData===jsonData){
     return false;
  }
  lastRequestUrl = url;
  lastRequestMethod = method;
  lastRequestData = jsonData

  let token = getToken();


  if (token === null) return Promise.reject("No token");


  if (method === 'GET') {
    // convert object to url string
    var searchParams = new URLSearchParams();
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var param = data[key];
        searchParams.set(key, param);
      }
    }
    searchParams = searchParams.toString();
    url = url + "?" + searchParams;
  }

  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token);



  var requestOptions = {
    signal:signal,
    method: method,
    headers: headers,
    redirect: 'follow'
  };
  if (method !== 'GET') {

    let raw = JSON.stringify(data);
    requestOptions.body = raw;
  }
  


  const res = await fetch(
    url
    , requestOptions);
    
  if (!res.ok) return res.json();

  const list_of_data =res.headers.get('X-Wp-Total');
  const total_pages = res.headers.get('X-Wp-Totalpages')
  return  res.json();
}
/////////////////

export async function request_with_headers(url, data, method) {

  let jsonData = JSON.stringify(data);

  if(lastRequestUrl===url && lastRequestMethod===method && lastRequestData===jsonData){
     return false;
  }
  lastRequestUrl = url;
  lastRequestMethod = method;
  lastRequestData = jsonData

  let token = getToken();


  if (token === null) return Promise.reject("No token");


  if (method === 'GET') {
    // convert object to url string
    var searchParams = new URLSearchParams();
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var param = data[key];
        searchParams.set(key, param);
      }
    }
    searchParams = searchParams.toString();
    url = url + "?" + searchParams;
  }

  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token);



  var requestOptions = {
    signal:signal,
    method: method,
    headers: headers,
    redirect: 'follow'
  };
  if (method !== 'GET') {

    let raw = JSON.stringify(data);
    requestOptions.body = raw;
  }



  const res = await fetch(
    url
    , requestOptions);

  if (!res.ok) return res.json();

  const result= await res.json()
  const list_of_data =res.headers.get('X-Wp-Total');
  const total_pages = res.headers.get('X-Wp-Totalpages')
  return  {data:result,total_entries:list_of_data,total_pages:total_pages};
}

//////





export async function post(url, data, custom_headers) {
  return await request(url, data, 'POST', custom_headers);
}
export async function get(url, data) {
  return await request(url, data, 'GET');
}
export async function get_with_headers(url, data) {
  return await request_with_headers(url, data, 'GET');
}
export async function put(url, data) {
  return await request(url, data, 'PUT');
}
export async function del(url, data) {
  return await request(url, data, 'DELETE');
}
export async function mediaUpload(url, file) {
  if (!file) {
    return;
  }


  let token = getToken();


  if (token === null) return Promise.reject("No token");

  var formdata = new FormData();
  formdata.append("file", file, file.name);

  let headers = new Headers();
  // headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token);


  // 👇 Uploading the file using the fetch API to the server
  return await fetch(url, {
    method: 'POST',
    body: formdata,
    headers: headers,
  }).then((r) => r.json())
}





export async function request_for_freescount(url, data, method, custom_headers) {

  let token = getToken();


  if (token === null) return Promise.reject("No token");


  if (method === 'GET') {
    // convert object to url string
    var searchParams = new URLSearchParams();
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var param = data[key];
        searchParams.set(key, param);
      }
    }
    searchParams = searchParams.toString();
    url = searchParams ? url + "?" + searchParams : url;
  }

  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token);




  var requestOptions = {
    method: method,
    headers: headers,
    redirect: 'follow'
  };
  if (method !== 'GET') {

    let raw = JSON.stringify(data);
    requestOptions.body = raw;
  }


  const res = await fetch(
    url
    , requestOptions);

  if (!res.ok) return res.json();

  return await res.json();
}

export async function post_freescout(url, data) {
  return await request_for_freescount(url, data, 'POST');
}
export async function put_freescout(url, data) {
  return await request_for_freescount(url, data, 'PUT');
}
export async function get_freescout(url, data) {
  return await request_for_freescount(url, data, 'GET');
}




export async function reruest_for_accepting(url, data, method) {

  let jsonData = JSON.stringify(data);

  if(lastRequestUrl===url && lastRequestMethod===method && lastRequestData===jsonData){
     return false;
  }
  lastRequestUrl = url;
  lastRequestMethod = method;
  lastRequestData = jsonData


  if (method === 'GET') {
    // convert object to url string
    var searchParams = new URLSearchParams();
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var param = data[key];
        searchParams.set(key, param);
      }
    }
    searchParams = searchParams.toString();
    url = url + "?" + searchParams;
  }

  let headers = new Headers();
  headers.append("Content-Type", "application/json");



  var requestOptions = {
    signal:signal,
    method: method,
    headers: headers,
    redirect: 'follow'
  };
  if (method !== 'GET') {

    let raw = JSON.stringify(data);
    requestOptions.body = raw;
  }



  const res = await fetch(
    url
    , requestOptions);


    
  if (!res.ok) return res.json();
  return  res.json();
}

export async function post_accepting(url, data) {
  return await reruest_for_accepting(url, data, 'POST');
}



export async function request_without_token(url, data, method) {

  let jsonData = JSON.stringify(data);

  if(lastRequestUrl===url && lastRequestMethod===method && lastRequestData===jsonData){
     return false;
  }
  lastRequestUrl = url;
  lastRequestMethod = method;
  lastRequestData = jsonData


  if (method === 'GET') {
    // convert object to url string
    var searchParams = new URLSearchParams();
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var param = data[key];
        searchParams.set(key, param);
      }
    }
    searchParams = searchParams.toString();
    url = url + "?" + searchParams;
  }

  let headers = new Headers();
  headers.append("Content-Type", "application/json");



  var requestOptions = {
    signal:signal,
    method: method,
    headers: headers,
    redirect: 'follow'
  };
  if (method !== 'GET') {

    let raw = JSON.stringify(data);
    requestOptions.body = raw;
  }



  const res = await fetch(
    url
    , requestOptions);


    
  if (!res.ok) return res.json();
  return  res.json();
}

export async function post_without_token(url, data) {
  return await request_without_token(url, data, 'POST');
}
