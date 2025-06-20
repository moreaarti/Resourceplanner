import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config/config";
import axios from "axios";
import { setApiCallCompanyDetails, setRemeber, updatAuthCredentials } from "./authSlice";
import Button from "../../components/elements/amdital/ButtonNew";
import he from 'he';
import { closeSnackbar, useSnackbar } from "notistack";
import Input from "../../components/elements/amdital/Input";
import Password from "../../components/elements/amdital/Password";
import Logo from "../../components/elements/amdital/Logo";
import { getEmployeeDropdownList, getUserData } from "../hr/emplyee/employeeData";
import getDropDownValue from "../hr/emplyee/settingFetchApi";
import { setOnboardingAuthenticationData } from "../hr/onboarding/OnboardingSlice";
import { getSettingIntegration } from "../settings/settingFunction";

const Login = () => {
  const stored_email = useSelector((state) => state.auth.email);
  const [email, setEmailAddress] = useState(stored_email);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [rememberMe, setRememberMe] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleSubmit = async (e) => {
    setButtonClicked(true);
    e.preventDefault();

    if (!email || !password) {
      setButtonClicked(false);
      return;
    }

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
        username: email,
        password: password
      }
    };
    const loginUrl = config.API_LOGIN_URL;
    
    try {      
      const res = await axios.post(loginUrl, graphqlQuery);
     
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

      if(res?.data?.data?.login?.user?.sites?.length <= 1 && res?.data?.data?.login?.user?.sites?.length > 0 ){        
        const siteUrl = res?.data?.data?.login?.user?.sites?.[0]?.url;
        dispatch(setApiCallCompanyDetails({
          apiCompanyUrl: siteUrl,
          companyId: res?.data?.data?.login?.user?.companyId
        }));
        localStorage.setItem("api_call_company_details", JSON.stringify({
          apiCompanyUrl: siteUrl,
          companyId: res?.data?.data?.login?.user?.companyId
        }));
          const login_details = res?.data?.data?.login;
          if(login_details?.user?.onboardingStatus === "inprogress"){
            dispatch(setOnboardingAuthenticationData(login_details));
            const step = parseInt(login_details?.user?.onboardingStep);
            
            if(step <= 7){
              navigate(`/onboarding/onboarding-form/${step}`);
              return false;
            }
            if(step === 8){
              navigate(`/onboarding/onboarding-form/information-summary/${step}`);
              return false;
            }
            if(step === 9){
              navigate(`/onboarding/onboarding-form/confirmation/${step}`);
              return false;
            }
          }
        if(login_details?.user?.onboardingStatus === "completed"  || login_details?.user?.userRole?.toLowerCase() === "owner"){
          dispatch(updatAuthCredentials({login_details, rememberMe}));
          setTimeout(async () => {
            navigate(`/dashboard`);
            try {
              const [userData, settingApi, dropdownUsers, integration] = await Promise.all([
                getUserData(navigate),
                getDropDownValue(),
                getEmployeeDropdownList(login_details?.user?.companyId, true),
                getSettingIntegration(login_details?.user?.companyId)
              ]);
            } catch (error) {
              console.error("Error loading initial data:", error);
            }
          }, 100);
          
          return false;
        }
      }
      // if(res?.data?.data?.login?.user?.sites?.length <= 2 && res?.data?.data?.login?.user?.sites?.length > 1 ){

      //   console.log("222  res?.data?.data?.login?.user?.sites",res?.data?.data?.login)

      //   const siteUrl = res?.data?.data?.login?.user?.sites?.[1]?.url;
      //   dispatch(setApiCallCompanyDetails({
      //     apiCompanyUrl: siteUrl,
      //     companyId: res?.data?.data?.login?.user?.companyId
      //   }));
      //   localStorage.setItem("api_call_company_details", JSON.stringify({
      //     apiCompanyUrl: siteUrl,
      //     companyId: res?.data?.data?.login?.user?.companyId
      //   }));
      //     const login_details = res?.data?.data?.login;
      //     if(login_details?.user?.onboardingStatus === "inprogress"){
      //       dispatch(setOnboardingAuthenticationData(login_details));
      //       const step = parseInt(login_details?.user?.onboardingStep);
            
      //       if(step <= 7){
      //         navigate(`/onboarding/onboarding-form/${step}`);
      //         return false;
      //       }
      //       if(step === 8){
      //         navigate(`/onboarding/onboarding-form/information-summary/${step}`);
      //         return false;
      //       }
      //       if(step === 9){
      //         navigate(`/onboarding/onboarding-form/confirmation/${step}`);
      //         return false;
      //       }
      //     }
      //   if(login_details?.user?.onboardingStatus === "completed" || login_details?.user?.userRole?.toLowerCase() === "owner"){
      //     dispatch(updatAuthCredentials({login_details, rememberMe}));
      //     setTimeout(async () => {
      //       navigate(`/dashboard`);
      //       try {
      //         const [userData, settingApi, dropdownUsers, integration] = await Promise.all([
      //           getUserData(navigate),
      //           getDropDownValue(),
      //           getEmployeeDropdownList(login_details?.user?.companyId, true),
      //           getSettingIntegration(login_details?.user?.companyId)
      //         ]);
      //       } catch (error) {
      //         console.error("Error loading initial data:", error);
      //       }
      //     }, 100);
          
      //     return false;
      //   }
      // }
      
      if(res?.data?.data?.login?.user?.sites?.length >= 2){
        const login_details = res?.data?.data?.login;
        dispatch(updatAuthCredentials({login_details, rememberMe}));
        dispatch(setRemeber({rememberMe,password}))
        if(login_details?.user?.onboardingStatus === "inprogress"){
          dispatch(setOnboardingAuthenticationData(login_details));
          const step = parseInt(login_details?.user?.onboardingStep);
          
          if(step <= 7){
            navigate(`/onboarding/onboarding-form/${step}`);
            return false;
          }
          if(step === 8){
            navigate(`/onboarding/onboarding-form/information-summary/${step}`);
            return false;
          }
          if(step === 9){
            navigate(`/onboarding/onboarding-form/confirmation/${step}`);
            return false;
          }
        }
        navigate(`/branchs-list`)

        return false;
      }

    } catch (error) {
      console.error("Login error:", error);
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
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-[100vh] flex-col items-center background_color py-20 max-lg:py-10 custom-shadow">
      <div className="mx-auto flex max-w-[85%] lg:w-[440px] flex-col items-center">
        <Logo/>
        <div className=" flex w-full flex-col items-center rounded border border-[#EAEAEA] bg-[#FFFFFF] p-10 max-sm:p-7">
          <div className="mb-10 flex flex-col items-center text-center">
            <p className=" headline_h1 ">
              Sign in to your account
            </p>
            <p className=" subtitle_s4  mt-1 ">
            Enter your credentials to access your account.
            </p>
          </div>
          <form
            className="flex w-full flex-col items-center"
            onSubmit={handleSubmit}
          >

          <Input
            id="email_address" 
            type="text" 
            name="email"
            value={email} 
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
            required="required"
            autoComplete="autoComplete"
            placeholder="Enter the email ID"
            classInput=" w-full h-10 "
            labelName={"Email or Username"}
            star_icon={true}            
          />
            <Password
              label="Password"
              id="password"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Enter the password"}
              classInput=" w-full  h-10 "
              wrapperClass="mt-4 mb-4"
              required="required"
              star_icon={true}
              autoComplete="autoComplete"
              // pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$"
              title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            />
            <div className=" flex w-full items-center justify-between">
              <label
                htmlFor="checkbox"
                className="flex cursor-pointer items-center place-self-start text-xs font-medium"
              >
                <div className="relative flex h-5 items-center custom-table ">
                  <input
                    type="checkbox"
                    id="checkbox"
                    className=" mr-3   cursor-pointer  rounded-[3px] border  "
                    onChange={(e)=>{setRememberMe(e?.target?.checked)}}
                  />
                  {/* <img
                    src={
                      config.PUBLIC_URL + "/assets/images/check_checkbox.svg"
                    }
                    alt=""
                    className="absolute inset-x-1 inset-y-2 w-2 opacity-0 peer-checked:opacity-100"
                  /> */}
                </div>
                <p className=" content_c3 ">Remember me</p>
              </label>
              <Link
                  to="/reset-password"
                  className="text-end link_l1 border-b border-transparent hover:border-[#6048F1] hover:text-[#6048F1]"
                  onClick={() => {
                    const login_details ={email: email}
                    dispatch(updatAuthCredentials({login_details}));
                  }}
                >
                  Forgot your password?
                </Link>
            </div>

            <div className=" mt-10 mb-4 flex w-full max-sm:justify-center">
                <Button
                  type="submit"
                  buttonName= "Sign In"
                  buttonClassName = {` ${ buttonClicked ? ` bg-[#6048F1] ` : ` bg-[#806BFF] hover:bg-[#6048F1] `} w-full h-11  outline-none text-base leading-3 font-semibold text-[#FFFFFF]  `}
                  spanClassName = " border-[#FFFFFF] "
                  isLoading= {buttonClicked}
                  disabled={buttonClicked}
                />
            </div>
            <p className="text-center subtitle_s4     ">
              Don't have a Amdital account? {}
              <Link to="/register" className="link_l1 border-b border-transparent hover:border-[#6048F1]  hover:text-[#6048F1]">
                Sign up
              </Link>
            </p>
          </form>
        </div>
        <p className=" mt-[15px] text-[12px] leading-4 font-semibold text-[#FFFFFF] opacity-[70%]">
          © Amdital • Privacy & Terms
        </p>
      </div>
    </div>
  );
};
export default Login;