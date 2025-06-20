import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import config from '../../../config/config';
import ButtonNew from './ButtonNew';
import axios from 'axios';
import he from 'he';
import { useSnackbar } from 'notistack';
import { setApiCallCompanyDetails, setRemeber, updatAuthCredentials } from '../../../features/login/authSlice';
import { getEmployeeDropdownList, getUserData } from '../../../features/hr/emplyee/employeeData';
import getDropDownValue from '../../../features/hr/emplyee/settingFetchApi';
import { getSettingIntegration } from '../../../features/settings/settingFunction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function MultiSitesListView() {

      const { enqueueSnackbar } = useSnackbar();
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const userDetails = useSelector(store => store?.auth);

    // const userDetails = useSelector(store => store?.auth?.data?.user);
    // const token_value = useSelector(store => store?.auth?.data?.authToken);

    const [buttonClicked, setButtonClicked] = useState({buttonName:"",buttonLoader:false});

    const viewReLoignHandler = async(apiCompanyUrl)=>{

        setButtonClicked({buttonName:apiCompanyUrl,buttonLoader:true});
        
        
        const graphqlQuery = {
          query: `
            mutation LoginUser($username: String!, $password: String!) {
              login(input: {
                clientMutationId: "asdww",
                username: $username,
                password: $password
              }) {
                authToken
                user {
                  id
                  name
                  email
                  userId
                  roles {
                    nodes {
                      name
                    }
                  }
                  onboardingStatus
                  onboardingStep
                  companyId
                  firstName
                  lastName
                  userDesignation
                  userRole
                  profileImage
                  memberID
                  department
                  slackUserId
                  sites{
                    blogId
                    domain
                    url
                  }
                }
              }
            }
          `,
          variables: {
            username:userDetails?.data?.user?.email,
            password:userDetails?.remember_me_login?.password
          }
        };
            try {      
              const res = await axios.post(apiCompanyUrl+"/api/v1", graphqlQuery);
              setButtonClicked(false);
              if (res.data.errors) {
                const errorMessage = he.decode(res.data.errors[0]?.message || "Network error occurred");
                const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />;
                enqueueSnackbar(message, {
                  variant: 'error',
                  autoHideDuration: 1500,
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                  },
                  style:{
                    background:"#FF0000",
                    size:"16px",
                    fontWeight:"500",
                    color:"#FFFFFF"
                  },
                });        
                return;
              }
              if(res?.data?.data){
                const login_details = res?.data?.data?.login;
                dispatch(setRemeber({}))
                dispatch(updatAuthCredentials({login_details,rememberMe:userDetails?.remember_me_login?.rememberMe}));
                const siteUrl = apiCompanyUrl;
                dispatch(setApiCallCompanyDetails({
                  apiCompanyUrl: siteUrl,
                  companyId: res?.data?.data?.login?.user?.companyId
                }));
                localStorage.setItem("api_call_company_details", JSON.stringify({
                  apiCompanyUrl: siteUrl,
                  companyId: res?.data?.data?.login?.user?.companyId
                }));
                setTimeout(async () => {
                    navigate(`/dashboard`);
                    try {
                      const [userData, settingApi, dropdownUsers, integration] = await Promise.all([
                        getUserData(navigate),
                        getDropDownValue(),
                        getEmployeeDropdownList(res?.data?.data?.login?.user?.companyId, true),
                        getSettingIntegration(res?.data?.data?.login?.user?.companyId)
                      ]);
                    } catch (error) {
                      console.error("Error loading initial data:", error);
                    }
                  }, 100);
              }
        
            } catch (error) {
              setButtonClicked(false);
              const errorMessage = error.response?.data?.message || 
                                  error.message || 
                                  "Login failed. Please check your credentials and try again.";      
              enqueueSnackbar(he.decode(errorMessage), {
                variant: 'error', 
                autoHideDuration: 1500, 
                anchorOrigin: {
                  vertical: 'top',    
                  horizontal: 'right',
                },
              });
            }

    }




  return (
    <>
        <div className=' p-8  mt-10 flex flex-wrap gap-6  '>

            {
                userDetails?.data?.user?.sites?.map((item,index)=>{

                    return <div key={index+1}  className=' flex items-center justify-between bg-[#FFFFFF] border border-[#E1DCFF] min-w-[350px]  max-w-[350px]  min-h-[100px]  rounded p-4   shadow-lg '>
                            <div className='   min-w-[150px] max-w-[150px]  '>
                                 <img  className={` relative cursor-pointer w-auto min-h-[26px]  max-h-[26px]   `} 
                                                            src={config.PUBLIC_URL + "/assets/images/amdital/amdital_dark_blue_logo.svg"} alt=""/>
                            </div>
                            <div className=' relative w-full  gap-4 flex flex-col items-end '>
                                <div  className=' w-[166px] text-base font-normal leading-[100%] tracking-[0%]  block truncate overflow-hidden '>{item?.domain}</div>
                                 <ButtonNew
                                    type="button"
                                    buttonName= "View"
                                    buttonClassName = {` ${ buttonClicked?.buttonName === item?.url ? ` bg-[#F36A3D]  w-[110px] ` : ` w-[100px] bg-[#FF845C] hover:bg-[#F36A3D] `}  h-9  outline-none text-base leading-3 border-transparent font-semibold text-[#FFFFFF]   `}
                                    spanClassName = " border-[#FFFFFF] "
                                    isLoading= {buttonClicked?.buttonName === item?.url}
                                    disabled={buttonClicked?.buttonLoader}
                                    onClick={()=>{viewReLoignHandler(item?.url)}}
                                />         
                            </div>
                        </div>

                })

            }

        </div>
    </>
  )
}
