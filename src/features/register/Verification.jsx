import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import { enqueueSnackbar } from "notistack";
import Button from "../../components/elements/amdital/ButtonNew";
import axios from "axios";
import he from 'he';
import { setApiCallCompanyDetails, updatAuthCredentials } from "../login/authSlice";
import SpinerLoader from "../../components/elements/amdital/SpinerLoader";
import Logo from "../../components/elements/amdital/Logo";
import { getUserData } from "../hr/emplyee/employeeData";
import getDropDownValue from "../hr/emplyee/settingFetchApi";
import { addCompanyDetails, updateCompanyIdToOwnerAccount } from "../settings/settingFunction";


const Verification = (props) => {
  const navigate = useNavigate();
  const register_data = useSelector((state) => state.register.data);
  const [buttonClickedApiCall,setButtonClickedApiCall]=useState(false);
  const [rememberMe,setRememberMe]=useState(false);
  const [resendLoad,setResendLoad]=useState(false)

  const [fields] = useState(register_data);

  const field_1 = useRef(null);
  const field_2 = useRef(null);
  const field_3 = useRef(null);
  const field_4 = useRef(null);
  const field_5 = useRef(null);
  const field_6 = useRef(null);

  const [otp, setOtp] = useState({
    field_1: "",
    field_2: "",
    field_3: "",
    field_4: "",
    field_5: "",
    field_6: "",
  });

  if (register_data.isVerificationScreen === false) {
    setTimeout(() => {
      navigate("/register");
    }, 0);
  }

  const dispatch = useDispatch();

  async function handleSubmit(e) {

    setButtonClickedApiCall(true);

    e.preventDefault();

    if (
      otp.field_1 === "" ||
      otp.field_2 === "" ||
      otp.field_3 === "" ||
      otp.field_4 === "" ||
      otp.field_5 === "" ||
      otp.field_6 === ""
    ) {
      enqueueSnackbar("Please enter OTP", {
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
      setButtonClickedApiCall(false);
      return;
    }

    let new_otp =
      otp.field_1 +
      otp.field_2 +
      otp.field_3 +
      otp.field_4 +
      otp.field_5 +
      otp.field_6;


      const graphqlQuery  = {
        query:`
        mutation RegisterUser {
        registerUser(
          input: {
            clientMutationId: "RegisterUser",
            username:"${fields?.email}",
            password:"${fields?.password}",
            email:"${fields?.email}",
            firstName:"${fields?.firstName}",
            lastName:"${fields?.lastName}",
            phone:"${fields?.phone}",
            userRole:"owner",
            otp:"${new_otp}"
            onboardingStatus: "completed",
            onboardingStep:"0",
          })
          {
            user {
              id
              onboardingStatus
              onboardingStep
              name
              email
              userId
              roles {
                nodes {
                  name
                }
              }
              jwtAuthToken
              jwtRefreshToken
            }
          }
      }
        `,
      };
  
      try {
        const res = await axios.post(config.API_LOGIN_URL,graphqlQuery);
  
        setButtonClickedApiCall(false);
    
        // Check if GraphQL returned errors
        if (res.data.errors) {
          const errorMessage = he.decode(res.data.errors[0]?.message || "Network error occurred");
          const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
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
          setMinutes(0);
          setSeconds(0);
          return  ;
        }
        const  login_details = {
          authToken: res?.data?.data?.registerUser?.user?.jwtAuthToken,
          user:{
            id:res?.data?.data?.registerUser?.user?.id,
            name:res?.data?.data?.registerUser?.user?.name,
            email:res?.data?.data?.registerUser?.user?.email,
            userId:res?.data?.data?.registerUser?.user?.userId,  
            roles:res?.data?.data?.registerUser?.user?.roles
          }
        }
        dispatch(setApiCallCompanyDetails({
                  apiCompanyUrl: import.meta.env.VITE_API_URL,
                  companyId:0
                }));
                localStorage.setItem("api_call_company_details", JSON.stringify({
                  apiCompanyUrl:import.meta.env.VITE_API_URL,
                  companyId: 0
                }));
        dispatch(updatAuthCredentials({login_details,rememberMe}));
        const conpmayDetails = await addCompanyDetails({userId:res?.data?.data?.registerUser?.user?.userId,
          companyName:fields?.companyName,
          companyWebsite:"",
          companyEmail:res?.data?.data?.registerUser?.user?.email,
          companyPhone: "",
          companyLogo:"",
          moduleVisibility: "",});
        const updateCompanyId = await updateCompanyIdToOwnerAccount(res?.data?.data?.registerUser?.user?.userId,conpmayDetails?.data?.data?.addCompanySettings?.companySettings?.id);
        if(updateCompanyId?.data?.data?.updateUser?.user){
          const updatedUser = {
              ...login_details.user,
              companyId: updateCompanyId?.data?.data?.updateUser?.user?.companyId,
              onboardingStatus: updateCompanyId?.data?.data?.updateUser?.user?.onboardingStatus,
              onboardingStep: updateCompanyId?.data?.data?.updateUser?.user?.onboardingStep,
            };

            const updatedLoginDetails = {
              ...login_details,
              user: updatedUser,
            };
            dispatch(updatAuthCredentials({ login_details: updatedLoginDetails, rememberMe }));
            dispatch(setApiCallCompanyDetails({
              apiCompanyUrl: import.meta.env.VITE_API_URL,
              companyId:updateCompanyId?.data?.data?.updateUser?.user?.companyId
            }));
            localStorage.setItem("api_call_company_details", JSON.stringify({
              apiCompanyUrl: import.meta.env.VITE_API_URL,
              companyId:updateCompanyId?.data?.data?.updateUser?.user?.companyId
            }));
        }  
      navigate(`/dashboard`);
        const data = await getUserData(navigate);
        const settingApi = await getDropDownValue();
      } catch (error) {
  
        setButtonClickedApiCall(false);
        const errorMessage = he.decode( "error occurred");
        enqueueSnackbar(errorMessage, {
          variant: 'error', 
          autoHideDuration: 1500, 
          anchorOrigin: {
            vertical: 'top',    
            horizontal: 'right',
          },
        });
      
    };
  }

  function setOTPs(field, value) {
    if (field_1.current.value !== "" && field === "field_1") {
      field_2.current.focus();
    } else if (field_2.current.value !== "" && field === "field_2") {
      field_3.current.focus();
    } else if (field_3.current.value !== "" && field === "field_3") {
      field_4.current.focus();
    } else if (field_4.current.value !== "" && field === "field_4") {
      field_5.current.focus();
    } else if (field_5.current.value !== "" && field === "field_5") {
      field_6.current.focus();
    } else if (field_6.current.value !== "" && field === "field_6") {
      field_6.current.focus();
    }

    if (field_1.current.value === "" && field === "field_1") {
      field_1.current.focus();
    } else if (field_2.current.value === "" && field === "field_2") {
      field_1.current.focus();
    } else if (field_3.current.value === "" && field === "field_3") {
      field_2.current.focus();
    } else if (field_4.current.value === "" && field === "field_4") {
      field_3.current.focus();
    } else if (field_5.current.value === "" && field === "field_5") {
      field_4.current.focus();
    } else if (field_6.current.value === "" && field === "field_6") {
      field_5.current.focus();
    }

    setOtp((prev) => {
      return { ...prev, [field]: value };
    });
  }

   const [Minutes,setMinutes] =useState(0);
   const [Seconds,setSeconds] =useState(59);
   useEffect(()=>{

    const interval = setInterval(()=>{

        if(Seconds>0){
          setSeconds(Seconds - 1);
        }
        if(Seconds===0){
          clearInterval(interval);
        }

    },1000)
        
    return ()=>{
      clearInterval(interval)
    }

   },[Seconds] );


  return (
    <div className="flex min-h-[100vh] flex-col items-center background_color py-20 max-lg:py-10">
      <div className="mx-auto flex max-w-[85%] flex-col items-center">
      <Logo/>
        <div className=" flex w-full flex-col items-center rounded-lg border border-[#EAEAEA] bg-[#FFFFFF] p-10 max-sm:p-7">
          <div className=" mb-10 flex flex-col items-center text-center">
            <p className=" mb-1 headline_h1 ">Verify your account</p>
            <span className="  subtitle_s4 text-wrap-all w-full md:w-[312px]">
              We have sent a code to:
              <span className="ml-1  border-b-[1.5px] border-[#1C1C1C] ">
                {fields.email}
              </span>
            </span>
            <span className= "subtitle_s4 text-center  text-wrap-all break-all">
              Please check your email and enter the code we sent.
            </span>
          </div>
          
          <form
            className="flex w-full flex-col items-center "
            onSubmit={handleSubmit}
          >
            <div
              id="otp"
              className="mb-10 w-full gap-1 md:gap-3 flex flex-wrap items-center max-md:text-sm"
            >
              <input
                className="form-control h-10  w-10  md:w-[46px] border border-[#DCD6FF] rounded  bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] text-center  "
                type="text"
                id="first"
                maxLength="1"
                ref={field_1}
                placeholder="9"
                name="field_1"
                onChange={(e) => setOTPs(e.target.name, e.target.value)}
                value={otp.field_1}
                onPaste={(e) => {
                  var types, pastedData;

                  if (
                    e &&
                    e.clipboardData &&
                    e.clipboardData.types &&
                    e.clipboardData.getData
                  ) {
                    types = e.clipboardData.types;

                    if (
                      (types instanceof DOMStringList &&
                        types.contains("text/plain")) ||
                      (types.indexOf && types.indexOf("text/plain") !== -1)
                    ) {
                      pastedData = e.clipboardData.getData("text/plain");

                      if (isNaN(pastedData)) {
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                      }

                      if (pastedData.length > 1) {
                        pastedData
                          ?.trim()
                          ?.split("")
                          ?.forEach((item, index) => {
                            setOTPs("field_" + (index + 1), item);
                            field_6.current.focus();
                          });
                      }
                      e.stopPropagation();
                      e.preventDefault();
                      return false;
                    }
                  }
                }}
              />
              <input
                className="form-control h-10  w-10  md:w-[46px] border border-[#DCD6FF] rounded  bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] text-center "
                type="text"
                id="second"
                placeholder="9"
                maxLength="1"
                ref={field_2}
                name="field_2"
                onChange={(e) => setOTPs(e.target.name, e.target.value)}
                value={otp.field_2}
              />
              
              <input
                className="form-control h-10  w-10  md:w-[46px] border border-[#DCD6FF] rounded  bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] text-center "
                type="text"
                id="third"
                placeholder="9"
                maxLength="1"
                ref={field_3}
                name="field_3"
                onChange={(e) => setOTPs(e.target.name, e.target.value)}
                value={otp.field_3}
              />{" "}
              <span className="text-[#999999] font-normal leading-6 text-base">-</span>
              <input
                className="form-control h-10  w-10  md:w-[46px] border border-[#DCD6FF] rounded  bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] text-center "
                type="text"
                id="fourth"
                placeholder="9"
                maxLength="1"
                ref={field_4}
                name="field_4"
                onChange={(e) => setOTPs(e.target.name, e.target.value)}
                value={otp.field_4}
              />{" "}
             
              <input
                className="form-control h-10  w-10  md:w-[46px] border border-[#DCD6FF] rounded  bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] text-center "
                type="text"
                id="fifth"
                maxLength="1"
                placeholder="9"
                ref={field_5}
                name="field_5"
                onChange={(e) => setOTPs(e.target.name, e.target.value)}
                value={otp.field_5}
              />
              
              <input
                className="form-control h-10  w-10  md:w-[46px] border border-[#DCD6FF] rounded  bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] text-center "
                type="text"
                id="sixth"
                placeholder="9"
                maxLength="1"
                ref={field_6}
                name="field_6"
                onChange={(e) => setOTPs(e.target.name, e.target.value)}
                value={otp.field_6}
              />
            </div>
                <Button
                  type="submit"
                  buttonName= "Verify Account "
                  buttonClassName = {` ${buttonClickedApiCall ? ` bg-[#6048F1] ` : ` bg-[#806BFF] hover:bg-[#6048F1] ` }  w-full h-11  outline-none  text-base leading-3 font-semibold text-[#FFFFFF] mb-4 `}
                  spanClassName = " border-[#FFFFFF] "
                  isLoading= {buttonClickedApiCall}
                />
            <div className="text-center subtitle_s4  ">
              <span>You didn't receive our email with verification code?</span>
              <p className="flex items-center justify-center">
                Please check spam or
                {Seconds !== 0 ?<span>
                    <span className={` ml-2  ${Seconds < 30 && Minutes ===0 ? "text-red-400":""} `}>
                      {Minutes<10?`0${Minutes}`:Minutes}:{Seconds<10?`0${Seconds}`:Seconds}
                    </span>
                  </span>:<span
                  className={` cursor-pointer w-fit flex gap-2 items-center h-10 link_l1 hover:text-[#6048F1] ml-1 ${resendLoad && ` pointer-events-none `} `}
                  onClick={async () => { 
                    setResendLoad(true);
                    const graphqlQuery  = {
                      "query": `
                        mutation SendVerificationOtp($email: String!, $newRegistration: Boolean!) { 
                          sendVerificationOtp(input: { email: $email, newRegistration: $newRegistration }) { 
                            success 
                            message 
                          } 
                        }
                      `,
                      "variables": {
                        "email": fields?.email,
                        "newRegistration": true
                      }
                    };
                        try {
                          const res = await axios.post(config.API_LOGIN_URL,graphqlQuery);

                          if (res?.data?.data?.sendVerificationOtp?.success === false) {
                            const errorMessage = he.decode(res?.data?.data?.sendVerificationOtp?.message || "Network error occurred");
                            const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
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
                            setMinutes(0);
                            setSeconds(59);
                            setResendLoad(false);
                            return ;
                          }
                          if (res?.data?.data?.sendVerificationOtp?.success === true){
                            
                            const errorMessage = he.decode(res?.data?.data?.sendVerificationOtp?.message);
                            const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
                            enqueueSnackbar(message, {
                              variant: 'success',
                              autoHideDuration: 1500,
                              anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right',
                              },
                              style:{
                                background:"#00B656",
                                size:"16px",
                                fontWeight:"500",
                                color:"#FFFFFF"
                              },
                            });
                            setMinutes(0);
                            setSeconds(59);
                            setResendLoad(false);
                          }
                        } catch (error) {
                          const errorMessage = he.decode( "error occurred");
                          enqueueSnackbar(errorMessage, {
                            variant: 'error', 
                            autoHideDuration: 1500, 
                            anchorOrigin: {
                              vertical: 'top',    
                              horizontal: 'right',
                            },
                          });
                          setResendLoad(false);
                      };
                  }}
                >Resend {resendLoad && <SpinerLoader
                      spanClassName = " border-[#806BFF] "
                />}
                </span>} 
                
              </p>
            </div>
          </form>

        </div>
        <p className=" mt-[15px] text-[12px] leading-4 font-semibold text-[#FFFFFF] opacity-[70%]">
          © Amdital • Privacy & Terms
        </p>
      </div>
    </div>
  );
};

export default Verification;
