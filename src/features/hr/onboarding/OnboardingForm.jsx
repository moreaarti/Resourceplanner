import React, {  useEffect, useState } from "react";
import config from "../../../config/config";
import PersonalInformation from "./PersonalInformation";
import PreviousEmployment from "./PreviousEmployment";
import AccountStatutory from "./AccountStatutory";
import Attachment from "./Attachment";
import FamilyDetails from "./FamilyDetails";
import NominationDetails from "./NominationDetails";
import { useLocation, useNavigate, useParams,} from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { attachOnnboardProfile } from "../../profile/uploadImage";
import { getOnboardingCountryData, getSingleEmployeeOnboardingData } from "./OnboardingNewApi";
import { errorMessageHandler, successfullMessageHandler } from "../../../components/elements/amdital/toastyMessage";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OnboardingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const onboarding_redux = useSelector(store=>store?.onboarding)
  const  token_details =onboarding_redux?.onboarding_employee_authentication_data;
  const token =token_details?.authToken;
  const graphqlId = token_details?.user?.id;
  const user_id = token_details?.user?.userId;

   const searchParams = new URLSearchParams(location.search);
   const index_params = searchParams.get("index");
   const editing = searchParams.get("isediting");

   const employee_data_redux = onboarding_redux?.onboarding_employee_data;

   const country_data_redux = onboarding_redux?.onboarding_country_data;

   const index =  index_params ? parseInt(index_params) : employee_data_redux?.onboardingStep

  const [loader,setLoader] = useState(false);

  const [activeStep, setActiveStep] = useState(index);


  const [optionData] = useState({
       bloodGroups: [
         { id: "A+", name: "A+" },
         { id: "A-", name: "A-" },
         { id: "B+", name: "B+" },
         { id: "B-", name: "B-" },
         { id: "AB+", name: "AB+" },
         { id: "AB-", name: "AB-" },
         { id: "O+", name: "O+" },
         { id: "O-", name: "O-" },
       ],
       maritalStatus: [
         { id: "Single", name: "Single" },
         { id: "Married", name: "Married" },
         { id: "Divorced", name: "Divorced" },
         { id: "Widowed", name: "Widowed" },
         { id: "Separated", name: "Separated" },
       ],
       internationEmployee: [
         {
           id: false,
           name: "No",
         },
         {
           id: true,
           name: "Yes",
         },
       ],
       disabilityTypeOptions: [
         { id: "Physical Disability", name: "Physical Disability" },
         { id: "Visual Impairment", name: "Visual Impairment" },
         { id: "Hearing Impairment", name: "Hearing Impairment" },
         { id: "Intellectual Disability", name: "Intellectual Disability" },
         { id: "Autism Spectrum Disorder", name: "Autism Spectrum Disorder" },
         { id: "Mental Health Condition", name: "Mental Health Condition" },
         { id: "Learning Disability", name: "Learning Disability" },
         { id: "Other", name: "Other" },
       ],
       qualificationOptions: [
         { id: "High School", name: "High School" },
         { id: "Diploma", name: "Diploma" },
         { id: "Bachelor's Degree", name: "Bachelor's Degree" },
         { id: "Master's Degree", name: "Master's Degree" },
         { id: "PhD", name: "PhD" },
         { id: "Other", name: "Other" },
       ],
       relationshipOptions: [
         { id: "Father", name: "Father" },
         { id: "Mother", name: "Mother" },
         { id: "Spouse", name: "Spouse" },
         { id: "Sibling", name: "Sibling" },
         { id: "Friend", name: "Friend" },
         { id: "Guardian", name: "Guardian" },
         { id: "Relative", name: "Relative" },
         { id: "Colleague", name: "Colleague" },
         { id: "Other", name: "Other" },
       ],
       bankAccountTypes: [
        { id: "Savings Account", name: "Savings Account" },
        { id: "Current Account", name: "Current Account" },
        { id: "Fixed Deposit Account", name: "Fixed Deposit Account" },
        { id: "Recurring Deposit Account", name: "Recurring Deposit Account" },
        {
          id: "NRE (Non-Resident External)",
          name: "NRE (Non-Resident External)",
        },
        {
          id: "NRO (Non-Resident Ordinary)",
          name: "NRO (Non-Resident Ordinary)",
        },
      ],
      gender: [
        { id: "Male", name: "Male" },
        { id: "Female", name: "Female" },
        { id: "Other", name: "Other" },
      ],
     });

  const steps = [
    {
      step: 2,
      label: "Personal Information",
      icon: "/assets/images/amdital/onboarding/personal_information.svg",
      content: (
        <PersonalInformation isEditing={editing?true:false} countryData={country_data_redux} optionData={optionData} employee_data_redux={employee_data_redux} />
      ),
    },
    {
      step: 3,
      label: "Previous Employment",
      icon: "/assets/images/amdital/onboarding/previous_employment.svg",
      content: (
        <PreviousEmployment isEditing={editing?true:false} employee_data_redux={employee_data_redux} />
      ),
    },
    {
      step: 4,
      label: "Account & Statutory",
      icon: "/assets/images/amdital/onboarding/account_statutory.svg",
      description: "Finalize your profile.",
      content: (
        <AccountStatutory isEditing={editing?true:false} countryData={country_data_redux} optionData={optionData} employee_data_redux={employee_data_redux} />
      ),
    },
    {
      step: 5,
      label: "Family Details",
      icon: "/assets/images/amdital/onboarding/family_details.svg",
      description: "Finalize your profile.",
      content: (
        <FamilyDetails isEditing={editing?true:false}  countryData={country_data_redux} optionData={optionData} employee_data_redux={employee_data_redux} />
      ),
    },
    {
      step: 6,
      label: "Nomination Details",
      icon: "/assets/images/amdital/onboarding/nomination_details.svg",
      description: "Finalize your profile.",
      content: (
        <NominationDetails  isEditing={editing?true:false} employee_data_redux={employee_data_redux} />
      ),
    },
    {
      step: 7,
      label: "Attachments",
      icon: "/assets/images/amdital/onboarding/attachement.svg",
      description: "Finalize your profile.",
      content: (
        <Attachment  isEditing={editing?true:false}  employee_data_redux={employee_data_redux}  />
      ),
    },
  ];
 

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

  const fetchHandler = async()=>{
    setLoader(true)
    try{
        const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
       const country_data = await getOnboardingCountryData();
       setLoader(false);
    }
    catch(e){
      setLoader(false);
      navigate("/logout")
    }
     
     
  }

  useEffect(()=>{
    fetchHandler();
  },[]);


  useEffect(()=>{
    if(employee_data_redux?.id){
      setActiveStep(index_params ? parseInt(index_params) : employee_data_redux?.onboardingStep)
    }
    window.scrollTo(0, 0);
  },[employee_data_redux,index_params])

  return (
   loader? <div className="w-full h-full flex flex-col items-center justify-center p-10">
              <div  className=" w-full h-20 "><Skeleton width={"100%"} className="w-full h-20 rounded " /></div>
              <div className=' mt-10 flex justify-between gap-x-8 gap-y-6 flex-wrap   w-full'>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                          
              </div>
            </div>
  : <div className="flex flex-col gap-10 p-10   ">
      <div className="flex flex-col gap-1">
        <h1 className="text-center text-[28px] font-bold leading-8 text-[#26212E]">
          Hi, {employee_data_redux?.firstName} {employee_data_redux?.lastName}
        </h1>
        <p className="text-center text-xs font-normal leading-5 text-[#26212E]">
          Provide all your employment information
        </p>
      </div>
      <div className="mx-auto flex w-4/5 items-center justify-between rounded-lg border border-[#E1DCFF] bg-[#F8F7FC] p-4">
        <div className="flex items-center gap-6">
          <div className=" relative mx-auto max-h-[64px] min-h-[64px] min-w-[64px] max-w-[64px] rounded-full ">
            {employee_data_redux?.profileImage ? (
              <img
                src={employee_data_redux?.profileImage}
                alt=""
                className="  relative  max-h-[64px] min-h-[64px] min-w-[64px] max-w-[64px] rounded-full object-cover "
              />
            ) : (
              <div className=" relative flex max-h-[64px] min-h-[64px] min-w-[64px] max-w-[64px] items-center justify-center rounded-full bg-[#806BFF] text-2xl font-bold capitalize text-[#FFFFFF] ">
                {employee_data_redux?.firstName?.charAt(0) || ""}
              </div>
            )}
            <div className=" absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#00B656] ">
              <img
                src={
                  config.PUBLIC_URL + "/assets/images/amdital/camera_icon.svg"
                }
                alt=""
                className=""
              />
              <input
              accept=".jpg,.jpeg,.png," 
                onChange={fileOnChangeHandler}
                type="file"
                className=" absolute h-full w-full   opacity-0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold leading-6 text-[#26212E]">
              {employee_data_redux?.firstName} {employee_data_redux?.lastName}
            </h3>
            <h6 className="text-sm font-normal leading-4 text-[#26212E]">
              Member ID - {employee_data_redux?.memberID}
            </h6>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h6 className="text-base font-semibold leading-5 text-[#26212E]">
            Point of contact : {employee_data_redux?.manager?.id ===0 ? "N/A" :employee_data_redux?.manager?.name}
          </h6>
          <h6 className="text-base font-semibold leading-5 text-[#26212E]">
            Department : {employee_data_redux?.department}
          </h6>
        </div>
        <div className="flex flex-col gap-1">
          <h6 className="text-base font-semibold leading-5 text-[#26212E]">
            Location : <span className="font-normal">Pune, Maharashtra</span>
          </h6>
          <h6 className="text-base font-semibold leading-5 text-[#26212E]">
            Designation : {employee_data_redux?.userDesignation}
          </h6>
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <div className="relative flex w-full justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-1 flex-col items-center"
            >
              <div
                className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full text-lg font-semibold transition-all
                ${
                  parseInt(activeStep)===step?.step ?` bg-[#FF845C] text-[#FF845C]` : step?.step <  parseInt(activeStep) ? ` bg-[#806BFF] `: ` bg-[#E1DCFF] `
                }`}
              >
                <img
                  src={config.PUBLIC_URL + step.icon}
                  alt=""
                  className={`${
                     parseInt(activeStep)===step?.step ?` brightness-0 invert ` :step?.step <  parseInt(activeStep) ? ` brightness-0 invert `: `  `
                  }`}
                />
              </div>
              <div className="mt-4 text-center">
                <p
                  className={`text-base leading-5 ${
                    parseInt(activeStep)===step?.step ?`  text-[#FF845C] font-semibold ` :step?.step <  parseInt(activeStep) ? ` text-[#806BFF] font-semibold `: ` font-normal text-[#26212E] `
                  }`}
                >
                  {step.label}
                </p>
              </div>
              {step?.step !== 7 && (
                <div className="absolute left-full top-10 h-1 w-full -translate-x-1/2 -translate-y-1/2 transform bg-[#E1DCFF]"></div>
              )}
            </div>
          ))}
        </div>
        <div className="h-[2px] bg-[#E1DCFF]"></div>

        {steps.find((item) => item.step === parseInt(activeStep))?.content}
      </div>
    </div>
  );
};

export default OnboardingForm;
