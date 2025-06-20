import React, { useEffect } from "react";
import config from "../../../config/config";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSingleEmployeeOnboardingData, onboardingStatusUpdateCompleteHandler } from "./OnboardingNewApi";
// import { onStepStatusUpdateHandler } from "./OnboardingApi";

const OnboardingConfirmation = () => {
  
   const navigate = useNavigate();

     const onboarding_redux = useSelector(store=>store?.onboarding)
       const  token_details =onboarding_redux?.onboarding_employee_authentication_data;
       const token =token_details?.authToken;
       const graphqlId = token_details?.user?.id;
       const user_id = token_details?.user?.userId;
       const employee_data_redux = onboarding_redux?.onboarding_employee_data;



    const fetchHandler = async()=>{
        try{
            const employeeData = await getSingleEmployeeOnboardingData(graphqlId)
        }
        catch(e){
          navigate("/logout")
        }
      }
    
      useEffect(()=>{
        window.scrollTo(0, 0);
        fetchHandler();
      },[]);

  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      <img
        src={
          config.PUBLIC_URL + "/assets/images/amdital/onboarding/thumb_up.svg"
        }
        alt=""
        className="h-14 w-[47px]"
      />
      <div className="flex flex-col gap-1">
        <h1 className="text-center text-[28px] font-bold leading-8 text-[#26212E]">
          Well Done, {employee_data_redux?.firstName} {employee_data_redux?.lastName}
        </h1>
        <p className="text-center text-xs font-normal leading-4 text-[#26212E]">
          Congratulations on setting up Employee Self Service Portal! To explore
          your ESS, sign out and sign in again
        </p>
      </div>
      <button onClick={async()=>{
         await onboardingStatusUpdateCompleteHandler(user_id,0,"completed")
        navigate(`/logout`)

      }} type="button" className="h-10 rounded border-2 border-[#FF845C] px-6 text-sm font-semibold leading-4 text-[#FF845C] flex justify-center items-center">
        Sign out to explore ESS
        </button>
    </div>
  );
};

export default OnboardingConfirmation;
