// config.js
let dynamicApiUrl = "";

// Initialize API URL from localStorage on module load
const initializeApiUrl = () => {
  const localData = localStorage.getItem("api_call_company_details");
  const parsedData = localData ? JSON.parse(localData) : null;
  const storedApiUrl = parsedData?.apiCompanyUrl || "";
  dynamicApiUrl = storedApiUrl;
};

// Run initialization immediately
initializeApiUrl();

// Set up interval to keep it updated
setInterval(initializeApiUrl, 1000);

// Function to get the current API URL (can be called directly before use)
const getCurrentApiUrl = () => {
  // Re-check localStorage to get most recent value
  const localData = localStorage.getItem("api_call_company_details");
  const parsedData = localData ? JSON.parse(localData) : null;
  return parsedData?.apiCompanyUrl || dynamicApiUrl;
};

export const config = {
  get PUBLIC_URL() {
    return import.meta.env.VITE_PUBLIC_URL;
  },
  get API_URL() {
    return `${getCurrentApiUrl()}/api/v1`;
  },
  get API_UPLOAD_FILE_URL() {
    return `${getCurrentApiUrl().replace(/\/wp$/, '')}/wp-json/wp/v2/media`;
  },
  get API_ATTENDENCE_URL() {
    return `${getCurrentApiUrl().replace(/\/wp$/, '')}`;
  },
  get API_LOGIN_URL() {
    return `${import.meta.env.VITE_API_URL}/api/v1`;
  },
   get API_UPLOAD_FILE_URL_STATIC() {
    const baseUrl = import.meta.env.VITE_API_URL.replace(/\/wp$/, '');
    return `${baseUrl}/wp-json/wp/v2/media`;
  },
};

export default config;