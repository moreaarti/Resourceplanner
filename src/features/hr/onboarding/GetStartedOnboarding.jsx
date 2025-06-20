import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSnackbar } from "notistack";
import { attachOnnboardProfile } from "../../profile/uploadImage";
import Logo from "../../../components/elements/amdital/Logo";
import Password from "../../../components/elements/amdital/Password";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { errorMessageHandler, successfullMessageHandler } from "../../../components/elements/amdital/toastyMessage";
import { useSelector } from "react-redux";
import axios from "axios";
import he from 'he';
import { useDispatch } from "react-redux";
import { setOnboardingAuthenticationData } from "./OnboardingSlice";
import { getSingleEmployeeOnboardingData, onboardingOnStepCountHandler } from "./OnboardingNewApi";

const GetStartedOnboarding = () => {

  const [searchParams] = useSearchParams();
  const invitationToken = searchParams.get("invitationToken");
  const email = searchParams.get("email");

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const onboarding_redux = useSelector(store=>store?.onboarding)
  const  token_details =onboarding_redux?.onboarding_employee_authentication_data;
  const token =token_details?.authToken;
  const graphqlId = token_details?.user?.id;
  const user_id = token_details?.user?.userId;

  const employee_data_redux = onboarding_redux?.onboarding_employee_data;

  const [buttonClicked,setButtonClicked] = useState(false)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const[fields,setFields] = useState({
    password:"",
    confirmPassword:"",
  });

  const fileOnChangeHandler = async (e) => {
    const file = e.target.files[0];
    const response = await attachOnnboardProfile(file,user_id);
    const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
    if(response?.id){
      successfullMessageHandler(enqueueSnackbar,"Your profile image has been successfully updated!");
      return;
    }else{
      errorMessageHandler(enqueueSnackbar,response?.message)
    }
  };
  useEffect(() => {
    fetchHandler(email,invitationToken)
  }, [email, invitationToken]);


  const fetchHandler = async(email,invitationToken)=>{
    setIsLoading(true)

      const graphqlQuery = {
        query: `
              mutation LoginUser {
                login( input: {
                  clientMutationId: "invitation",
                  username: "${email}",
                  password: "${invitationToken}"
                } ) {
                  authToken
                  refreshToken
                  user {
                    id
                    userId
                  }
                }
              }
            `,
      };
      const res = await axios.post(config.API_LOGIN_URL, graphqlQuery);
      if (res?.data?.data?.login) {
        dispatch(setOnboardingAuthenticationData(res.data.data.login));
        const employeeData = await getSingleEmployeeOnboardingData(res?.data?.data?.login?.user?.id);
        setIsLoading(false);
        return res;
      }
      if(res?.data?.errors){
        const rawHtmlMessage = res?.data?.errors?.[0]?.message;
        const decodedHtml = he.decode(rawHtmlMessage);
        const plainTextMessage = decodedHtml.replace(/<[^>]+>/g, '');
        if(plainTextMessage?.includes("Lost your password?")){
          errorMessageHandler(enqueueSnackbar,"Please login with your new password to continue onboarding.")
          navigate(`/login`)
        } 
        setIsLoading(false);
        return res;
      }
    }
  
  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    setButtonClicked(true)
    if (fields.password !== fields.confirmPassword) {
      setFields({ ...fields, confirmPassword: "" });
      errorMessageHandler(enqueueSnackbar, "The Confirm Password must match the password.");
      setButtonClicked(false)
      return;
    }
    const graphqlQuery = {
      query: `
      mutation UpdateUser {
              updateUser(
                input: {id:${user_id}, 
                password:"${fields?.password}",
                onboardingStep:"2"
                }
              ) {
                user {
                  id
                }
              }
            }
  `,
    };
    try{
    const res= await axios.post(config.API_LOGIN_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
    setButtonClicked(false)
    if(res?.data?.errors){
      errorMessageHandler(enqueueSnackbar,res?.data?.errors?.[0]?.message)
    }
    if(res?.data?.data?.updateUser){
      const countUpdate = await onboardingOnStepCountHandler(user_id,2)
      successfullMessageHandler(enqueueSnackbar,"Successfully updated!");
       navigate("/onboarding/onboarding-form/2");
    }}
    catch(e){
      setButtonClicked(false);
      errorMessageHandler(enqueueSnackbar,e?.message)

    }
  }

  return (
    <>
      <div className="flex min-h-[100vh] flex-col items-center background_color py-20 max-lg:py-10 custom-shadow">  
        <div className="mx-auto flex max-w-[85%] lg:w-[440px] flex-col items-center">
            <Logo/>
          <div className=" flex w-full flex-col items-center rounded border border-[#EAEAEA] bg-[#FFFFFF] p-10 max-sm:p-7">
            <div className="flex flex-col items-center text-center">
              {
                isLoading ? <Skeleton width={"228px"} height={34}/> : <div className=" capitalize leading-[100%] tracking-[0%] text-[28px] font-bold  w-full  mx-auto  text-center block break-all   ">
                Hi, {employee_data_redux.firstName} {employee_data_redux.lastName}
                </div>
              }
            </div>
            <div className=" mt-6 ">
           { isLoading ? <div className=" flex justify-center "><Skeleton className="min-h-[64px] min-w-[64px] max-h-[64px] max-w-[64px] rounded-full mx-auto" /></div> :<div className=" relative min-h-[64px] min-w-[64px] max-h-[64px] max-w-[64px] rounded-full mx-auto ">
                {employee_data_redux?.profileImage ?<img src={employee_data_redux?.profileImage} alt=""  className="  relative  min-h-[64px] min-w-[64px] max-h-[64px] max-w-[64px] rounded-full object-cover " />
                : <div className=" text-[#FFFFFF] relative min-h-[64px] min-w-[64px] max-h-[64px] max-w-[64px] rounded-full bg-[#806BFF] flex justify-center items-center text-2xl capitalize font-bold ">
                    {employee_data_redux.firstName?.charAt(0) || ''}
                  </div>}
                <div className=" rounded-full flex justify-center items-center absolute bg-[#00B656] w-6 h-6 bottom-0 right-0 ">
                  <img src={config.PUBLIC_URL + "/assets/images/amdital/camera_icon.svg"} alt="" className=""/>
                  <input onChange={fileOnChangeHandler} type="file" accept=".jpg,.jpeg,.png,"  className=" absolute w-full h-full   opacity-0"/>
                </div>
              </div>}
             {!isLoading && <div className=" text-center mt-2 text-[#26212E] text-base font-normal tracking-[0%] leading-[100%] ">Upload your profile picture here</div>}
            </div>
            <form
              className="flex w-full flex-col items-center gap-6 mt-6"
              onSubmit={onSubmitHandler}
            >
             {isLoading ? <div  className=" w-full h-10 "><Skeleton width={"100%"} className="w-full h-10 rounded " /></div>  : <Password
                label="Password"
                labelClass={` text-base font-semibold`}
                id="password"
                name="Password"
                value={fields?.password}
                onChange={(e) => setFields({...fields,password:e?.target?.value})}
                placeholder={"Enter password"}
                classInput=" w-full  h-10 "
                wrapperClass=""
                star_icon={false}
                autoComplete="autoComplete"
                required={"required"}
                title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
              />}
              {isLoading ? <div  className=" w-full h-10 "><Skeleton width={"100%"} className="w-full h-10 rounded " /></div>  :<Password
                label="Confirm Password"
                id="password"
                name="Password"
                labelClass={` text-base font-semibold`}
                value={fields?.confirmPassword}
                onChange={(e) => setFields({...fields,confirmPassword:e?.target?.value})}
                placeholder={"Enter confirm password"}
                classInput=" w-full  h-10 "
                wrapperClass=""
                required="required"
                star_icon={false}
                autoComplete="autoComplete"
                // pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$"
                title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
              />}
             {isLoading ? <div  className=" w-full h-10 "><Skeleton width={"100%"} className="w-full h-10 rounded " /></div>  : <button
                type="submit"
                className={` ${buttonClicked ? ` pointer-events-none `: ` `} flex w-full h-[42px] hover:bg-[#F36A3D] items-center justify-center gap-2 rounded bg-[#FF845C] text-base font-semibold leading-[100%] tracking-[0%] text-white`}
              >
                Let’s Get Started
                <img
                  src={
                    config.PUBLIC_URL +
                    "/assets/images/amdital/onboarding/right_arrow.svg"
                  }
                  alt=""
                />
                {buttonClicked && <span className={` button-loader w-[18px]  h-[18px] border-2 border-r-transparent rounded-full border-[#FFFFFF] `  } ></span>}
              </button>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStartedOnboarding;
