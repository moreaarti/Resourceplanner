import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import AttachmentCard from "./AttachmentCard";
import { useNavigate } from "react-router-dom";
import SubmitPopup from "./SubmitPopup";
import { useSelector } from "react-redux";
import {
  attachOnnboardProfile,
  deleteMediaOnboarding,
} from "../../profile/uploadImage";
import Skeleton from "react-loading-skeleton";
import { getAttachmentsOnboardingData, getOnboardingCountryData, getSingleEmployeeOnboardingData, onboardingOnStepCountHandler } from "./OnboardingNewApi";
import { errorMessageHandler, successfullMessageHandler } from "../../../components/elements/amdital/toastyMessage";
import { useSnackbar } from "notistack";
import ButtonNew from "../../../components/elements/amdital/ButtonNew";

const InformationSummary = () => {

    const onboarding_redux = useSelector(store=>store?.onboarding)
    const  token_details =onboarding_redux?.onboarding_employee_authentication_data;
    const token =token_details?.authToken;
    const graphqlId = token_details?.user?.id;
    const user_id = token_details?.user?.userId;
    const employee_data_redux = onboarding_redux?.onboarding_employee_data;
    const country_data_redux = onboarding_redux?.onboarding_country_data;
    const employee_data_attachment = onboarding_redux?.onboarding_employee_attachments;

      const { enqueueSnackbar } = useSnackbar();
   
  const [isLoading, setIsLoading] = useState(false);


    const [attachment,setAttachment] = useState({
      permanentAddress:[],
      presentAddress:[],
      qualification:[],
      previousEmployment:[],
      bankAccountDetails:[],
      permanentAccountNumber:[],
      aadharCard:[],
      passPort:[]
    });

    useEffect(()=>{
    
      if(employee_data_attachment?.edges?.length > 0 ){
        const  permanentAddress = employee_data_attachment?.edges?.filter(item=>item?.node?.altText === "permanentAddress");
        const  presentAddress = employee_data_attachment?.edges?.filter(item=>item?.node?.altText === "presentAddress");
        const  qualification = employee_data_attachment?.edges?.filter(item=>item?.node?.altText === "qualification");
        const  previousEmployment = employee_data_attachment?.edges?.filter(item=>item?.node?.altText === "previousEmployment");
        const  bankAccountDetails = employee_data_attachment?.edges?.filter(item=>item?.node?.altText === "bankAccountDetails");
        const  permanentAccountNumber = employee_data_attachment?.edges?.filter(item=>item?.node?.altText === "permanentAccountNumber");
        const  aadharCard = employee_data_attachment?.edges?.filter(item=>item?.node?.altText === "aadharCard");
        const  passPort = employee_data_attachment?.edges?.filter(item=>item?.node?.altText === "passPort");
        setAttachment(
          {
            permanentAddress:permanentAddress,
            presentAddress:presentAddress,
            qualification:qualification,
            previousEmployment:previousEmployment,
            bankAccountDetails:bankAccountDetails,
            permanentAccountNumber:permanentAccountNumber,
            aadharCard:aadharCard,
            passPort:passPort
          }
        )
      }
    },[employee_data_attachment])


  const navigate = useNavigate();

  const handleNavigate = (index) => {
    navigate(`/onboarding/onboarding-form/?index=${index}&isediting=true`);
  };

 
  function getFileNameFromUrl(url) {
    return url?.split("/").pop();
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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

  const  countryNameDisplay = (countryCode)=>{
        if(countryCode){
            const countryName =country_data_redux?.length > 0 ? country_data_redux?.filter(item=>item?.code === countryCode)?.map(item=>item?.name): ["N/A"]
            return countryName?.[0]
        }
        return "N/A";
    }

    const fetchHandler = async()=>{
      setIsLoading(true)
      try{
          const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
          const employee_response = await getAttachmentsOnboardingData(graphqlId)
         const country_data = await getOnboardingCountryData();
         setIsLoading(false);
      }
      catch(e){
        setIsLoading(false);
        navigate("/logout")
      }
    }
  
    useEffect(()=>{
      fetchHandler();
    },[]);


  const deleteAttachment = async (id) => {
        try {
          const response = await deleteMediaOnboarding(id);
          if(response?.deleted){
            const employee_response = await getAttachmentsOnboardingData(graphqlId);
            successfullMessageHandler(enqueueSnackbar,"Image uploaded successfully!.")
            return response;
          }
          else{
            errorMessageHandler(enqueueSnackbar,response?.message);
            return response;
          }     
        } catch (error) {
          errorMessageHandler(enqueueSnackbar,error?.message)
        }
      };
      const [submitPopup,setSubmitPopup] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-10 p-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-center text-[28px] font-bold leading-8 text-[#26212E]">
            {isLoading ? (
              <Skeleton width={"70%"} height={"40px"} className="mx-auto" />
            ) : (
              <>
                Hi, {employee_data_redux?.firstName} {employee_data_redux?.lastName}
              </>
            )}
          </h1>
          <p className="text-center text-xs font-normal leading-5 text-[#26212E]">
            Provide all your employment information
          </p>
        </div>
        {isLoading ? (
          <div className="mx-auto w-[70%]">
            <Skeleton height={"97px"} width={"100%"} />
          </div>
        ) : (
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
                             onChange={fileOnChangeHandler}
                             accept=".jpg,.jpeg,.png," 
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
                Point of contact : {employee_data_redux?.manager?.id === 0 ? "N/A" : employee_data_redux?.manager?.name}
              </h6>
              <h6 className="text-base font-semibold leading-5 text-[#26212E]">
                Department : {employee_data_redux?.department}
              </h6>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="text-base font-semibold leading-5 text-[#26212E]">
                Location :  <span className="font-normal">Pune, Maharashtra</span>
              </h6>
              <h6 className="text-base font-semibold leading-5 text-[#26212E]">
                Designation : {employee_data_redux?.userDesignation}
              </h6>
            </div>
          </div>
        )}

        <h1 className="text-center text-[28px] font-bold leading-8 text-[#26212E]">
          Information Summary
        </h1>
        <div className="relative flex items-start gap-8">
          <div className="flex w-[400px] flex-col gap-6 rounded bg-[#F8F7FC] p-8">
            <button className="w-fit text-xl font-medium leading-6 text-[#26212E]">
              Personal Information
            </button>
            <button className="w-fit text-xl font-medium leading-6 text-[#26212E]">
              Previous Employment
            </button>
            <button className="w-fit text-xl font-medium leading-6 text-[#26212E]">
              Accounts & Statutory
            </button>
            <button
              // onClick={() => {
              //   document.getElementById("familyDetails").scrollIntoView({
              //     behavior: "smooth",
              //   });
              // }}
              className="w-fit text-xl font-medium leading-6 text-[#26212E]"
            >
              Family Details
            </button>
            <button
              // onClick={() => {
              //   document.getElementById("nominationDetails").scrollIntoView({
              //     behavior: "smooth",
              //   });
              // }}
              className="w-fit text-xl font-medium leading-6 text-[#26212E]"
            >
              Nomination Details
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 rounded border border-[#E1DCFF] p-6">
                <h1 className="flex items-center justify-between text-xl font-semibold leading-6 text-[#26212E]">
                  1. Personal Information
                  <button
                    onClick={() => {
                      handleNavigate(2);
                    }}
                  >
                    <img
                      src={
                        config.PUBLIC_URL +
                        "/assets/images/amdital/onboarding/edit.svg"
                      }
                      alt=""
                      className="size-[18px]"
                    />
                  </button>
                </h1>
                <div className="grid grid-cols-3 gap-6">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Blood Group
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{  employee_data_redux?.bloodGroup || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Personal Email
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.personalEmail || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Father Name
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.fatherName || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Marital Status
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.maritalStatus || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Marriage Date
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.marriageDate || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Spouse Name
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.spouseName || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Country Of Origin
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{countryNameDisplay(employee_data_redux?.countryOfOrigin) || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Nationality
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{countryNameDisplay(employee_data_redux?.userNationality) || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      International Employee
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>
                          {employee_data_redux?.isInternationalEmployee
                            ? "Yes"
                            : "No"}
                        </>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Physically Challenged
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>
                          {employee_data_redux?.isPhysicallyChallenged
                            ? "Yes"
                            : "No"}
                        </>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Disability Type
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.disabilityType || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Emergency Contact Name
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.emergencyContactName  || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                    Emergency Contact Mobile
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.emergencyContact || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                    Emergency Contact Relationship
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.emergencyContactRelationship || "-"}</>
                      )}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="rounded border border-[#E1DCFF] p-6">
                <h1 className="mb-6 flex items-center justify-between text-xl font-semibold leading-6 text-[#26212E]">
                  2. Address
                  <button
                    onClick={() => {
                      handleNavigate(2);
                    }}
                  >
                    <img
                      src={
                        config.PUBLIC_URL +
                        "/assets/images/amdital/onboarding/edit.svg"
                      }
                      alt=""
                      className="size-[18px]"
                    />
                  </button>
                </h1>
                <h5 className="mb-2 text-sm font-bold leading-4 text-[#26212E]">
                  Permanent Address
                </h5>
                <div className="mb-6 grid grid-cols-3 items-end gap-6">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Address
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.address || "-"}</>
                      )}
                    </h6>
                  </div>

                  {/* <div className="flex flex-col gap-1 text-base font-medium leading-5 text-[#26212E]">
                    {isLoading ? (
                      <Skeleton height={"20px"} width={"70%"} />
                    ) : (
                      <>{employee_data_redux?.addressStreet || "-"}</>
                    )}
                  </div> */}
                  <div className="flex flex-col gap-1 text-base font-medium leading-5 text-[#26212E]">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                    Street
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.addressStreet || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1 text-base font-medium leading-5 text-[#26212E]">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                    Area
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.addressArea || "-"}</>
                      )}
                    </h6>
                  </div>
                  {/* <div className="flex flex-col gap-1 text-base font-medium leading-5 text-[#26212E]">
                    {isLoading ? (
                      <Skeleton height={"20px"} width={"70%"} />
                    ) : (
                      <>{employee_data_redux?.addressArea || "-"}</>
                    )}
                  </div> */}
                  <div className="flex flex-col gap-1 text-base font-medium leading-5 text-[#26212E]">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      City
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.addressCity || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Country
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{countryNameDisplay(employee_data_redux?.userCountry) || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      State
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.userState || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Pin
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.addressPin || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Phone
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.addressPhone || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="col-span-3 flex w-[50%] flex-col gap-6">
                    {isLoading ? (
                      <Skeleton height={"56px"} width={"70%"} />
                    ) : (
                      <>
                        {attachment?.permanentAddress.map((data) => {
                          return (
                            <AttachmentCard
                              cardSize="small"
                              name={
                                getFileNameFromUrl(data?.guid?.rendered) ||
                                getFileNameFromUrl(data.node?.mediaItemUrl)
                              }
                              type={data.mime_type || data.node.mimeType}
                              size={data.media_details?.filesize || data?.node?.fileSize}
                              fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                              onDelete={() =>
                                deleteAttachment(data?.node?.mediaItemId, "permanentAddress")
                              }
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
                <h5 className="mb-2 text-sm font-bold leading-4 text-[#26212E]">
                  Present Address
                </h5>
                <div className="grid grid-cols-3 items-end gap-6">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Address
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.presentAddress || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                    Street
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.presentAddressStreet || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                    Area
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.presentAddressArea || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      City
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.presentAddressCity || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Country
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{countryNameDisplay(employee_data_redux?.presentAddressCountry) || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      State
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.presentAddressState || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Pin
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.presentAddressPin || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Phone
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.presentAddressPhone || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div></div>
                  <div className="col-span-3 flex w-[50%] flex-col gap-6">
                    {isLoading ? (
                      <Skeleton height={"56px"} width={"70%"} />
                    ) : (
                      <>
                        {attachment?.presentAddress.map((data) => {
                          return (
                            <AttachmentCard
                              cardSize="small"
                              name={
                                getFileNameFromUrl(data?.guid?.rendered) ||
                                getFileNameFromUrl(data.node?.mediaItemUrl)
                              }
                              type={data.mime_type || data.node.mimeType}
                              size={data.media_details?.filesize || data?.node?.fileSize}
                              fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                              onDelete={() =>
                                deleteAttachment(data?.node?.mediaItemId, "presentAddress")
                              }
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 rounded border border-[#E1DCFF] p-6">
                <h1 className="flex items-center justify-between text-xl font-semibold leading-6 text-[#26212E]">
                  3. Qualifications
                  <button
                    onClick={() => {
                      handleNavigate(2);
                    }}
                  >
                    <img
                      src={
                        config.PUBLIC_URL +
                        "/assets/images/amdital/onboarding/edit.svg"
                      }
                      alt=""
                      className="size-[18px]"
                    />
                  </button>
                </h1>
                <div className=" flex flex-col gap-6 ">
                  {employee_data_redux?.qualification?.map((edu, index) => {
                    return (
                      <>
                        <div className=" flex flex-col gap-4">
                           <div>Qualification {index+1}</div>
                          <div className=" grid grid-cols-3 w-full gap-6 ">
                            <div className="flex flex-col gap-1">
                              <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                                Qualification
                              </h3>
                              <h6 className="text-base font-medium leading-5 text-[#26212E]">
                                {isLoading ? (
                                  <Skeleton height={"20px"} width={"70%"} />
                                ) : (
                                  <>{edu?.degree || "-"}</>
                                )}
                              </h6>
                            </div>
                            <div className="flex flex-col gap-1">
                              <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                                From Year
                              </h3>
                              <h6 className="text-base font-medium leading-5 text-[#26212E]">
                                {isLoading ? (
                                  <Skeleton height={"20px"} width={"70%"} />
                                ) : (
                                  <>{edu?.from_year || "-"}</>
                                )}
                              </h6>
                            </div>
                            <div className="flex flex-col gap-1">
                              <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                                To Year
                              </h3>
                              <h6 className="text-base font-medium leading-5 text-[#26212E]">
                                {isLoading ? (
                                  <Skeleton height={"20px"} width={"70%"} />
                                ) : (
                                  <>{edu?.to_year || "-"}</>
                                )}
                              </h6>
                            </div>
                            <div className="flex flex-col gap-1">
                              <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                                Institute
                              </h3>
                              <h6 className="text-base font-medium leading-5 text-[#26212E]">
                                {isLoading ? (
                                  <Skeleton height={"20px"} width={"70%"} />
                                ) : (
                                  <>{edu?.institute || "-"}</>
                                )}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  <div className="col-span-3 flex w-[50%] flex-col gap-6">
                    {isLoading ? (
                      <Skeleton height={"56px"} width={"70%"} />
                    ) : (
                      <>
                        {attachment?.qualification?.map((data) => {
                          return (
                            <AttachmentCard
                              cardSize="small"
                              name={
                                getFileNameFromUrl(data?.guid?.rendered) ||
                                getFileNameFromUrl(data.node?.mediaItemUrl)
                              }
                              type={data.mime_type || data.node.mimeType}
                              size={data.media_details?.filesize || data?.node?.fileSize}
                              fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                              onDelete={() =>
                                deleteAttachment(data?.node?.mediaItemId, "qualification")
                              }
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 rounded border border-[#E1DCFF] p-6">
                <h1 className="flex items-center justify-between text-xl font-semibold leading-6 text-[#26212E]">
                  4. Previous Employment
                  <button
                    onClick={() => {
                      handleNavigate(3);
                    }}
                  >
                    <img
                      src={
                        config.PUBLIC_URL +
                        "/assets/images/amdital/onboarding/edit.svg"
                      }
                      alt=""
                      className="size-[18px]"
                    />
                  </button>
                </h1>
                <div className="flex flex-col gap-6">
                  {employee_data_redux?.previousEmployment?.map(
                    (employment, index) => {
                      return (
                        employment?.company_name && <>
                      <div className=" flex flex-col gap-4">
                           <div>Previous Employment {index+1}</div>
                        <div className=" grid grid-cols-3 w-full gap-6 ">
                          <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                              Company Name
                            </h3>
                            <h6 className="text-base font-medium leading-5 text-[#26212E]">
                              {isLoading ? (
                                <Skeleton height={"20px"} width={"70%"} />
                              ) : (
                                <>{employment?.company_name || "-"}</>
                              )}
                            </h6>
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                              Designation
                            </h3>
                            <h6 className="text-base font-medium leading-5 text-[#26212E]">
                              {isLoading ? (
                                <Skeleton height={"20px"} width={"70%"} />
                              ) : (
                                <>{employment?.designation || "-"}</>
                              )}
                            </h6>
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                              From Date
                            </h3>
                            <h6 className="text-base font-medium leading-5 text-[#26212E]">
                              {isLoading ? (
                                <Skeleton height={"20px"} width={"70%"} />
                              ) : (
                                <> {formatDate(employment?.from_date) || "-"}</>
                              )}
                            </h6>
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                              To Year
                            </h3>
                            <h6 className="text-base font-medium leading-5 text-[#26212E]">
                              {isLoading ? (
                                <Skeleton height={"20px"} width={"70%"} />
                              ) : (
                                <> {formatDate(employment?.to_date) || "-"}</>
                              )}
                            </h6>
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                              Company Address
                            </h3>
                            <h6 className="text-base font-medium leading-5 text-[#26212E]">
                              {isLoading ? (
                                <Skeleton height={"20px"} width={"70%"} />
                              ) : (
                                <> {employment?.company_address || "-"}</>
                              )}
                            </h6>
                          </div>
                        </div>
                      </div>
                        </>
                      );
                    },
                  )}
                  <div className="col-span-3 flex w-[50%] flex-col gap-6">
                    {isLoading ? (
                      <Skeleton height={"56px"} width={"70%"} />
                    ) : (
                      <>
                        {" "}
                        {attachment?.previousEmployment.map((data) => {
                          return (
                            <AttachmentCard
                              cardSize="small"
                              name={
                                getFileNameFromUrl(data?.guid?.rendered) ||
                                getFileNameFromUrl(data.node?.mediaItemUrl)
                              }
                              type={data.mime_type || data.node.mimeType}
                              size={data.media_details?.filesize || data?.node?.fileSize}
                              fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                              onDelete={() =>
                                deleteAttachment(data?.node?.mediaItemId, "previousEmployement")
                              }
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 rounded border border-[#E1DCFF] p-6">
                <h1 className="flex items-center justify-between text-xl font-semibold leading-6 text-[#26212E]">
                  5. Identification
                  <button
                    onClick={() => {
                      handleNavigate(4);
                    }}
                  >
                    <img
                      src={
                        config.PUBLIC_URL +
                        "/assets/images/amdital/onboarding/edit.svg"
                      }
                      alt=""
                      className="size-[18px]"
                    />
                  </button>
                </h1>
                <div className="grid grid-cols-3 items-end gap-6">
                  <div className="flex flex-col gap-1">
                    <h4 className="mb-1 text-sm font-bold uppercase leading-4 text-[#26212E]">
                      Bank Account Details
                    </h4>

                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Country
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <> {countryNameDisplay(employee_data_redux?.bankCountry) || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Bank Account Number
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <> {employee_data_redux?.bankAccountNumber || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Bank Code
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <> {employee_data_redux?.bankCode || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Bank Name
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <> {employee_data_redux?.bankName || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Bank Branch
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <> {employee_data_redux?.bankBranchName || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Name as per Bank Account
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <> {employee_data_redux?.nameOnBankAcc || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Account Type
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <> {employee_data_redux?.accountType || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div></div>
                  <div className="col-span-3 flex w-[50%] flex-col gap-6">
                    {isLoading ? (
                      <Skeleton height={"56px"} width={"70%"} />
                    ) : (
                      <>
                        {" "}
                        {attachment?.bankAccountDetails.map((data) => {
                          return (
                            <AttachmentCard
                              cardSize="small"
                              name={
                                getFileNameFromUrl(data?.guid?.rendered) ||
                                getFileNameFromUrl(data.node?.mediaItemUrl)
                              }
                              type={data.mime_type || data.node.mimeType}
                              size={data.media_details?.filesize || data?.node?.fileSize}
                              fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                              onDelete={() =>
                                deleteAttachment(data?.node?.mediaItemId, "bankAccountDetails")
                              }
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="mb-1 text-sm font-bold uppercase leading-4 text-[#26212E]">
                      PF Account Details
                    </h4>
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      PF Account Number
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.pfAccountDetails || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      UAN
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.pfUan || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div></div>
                  <div className="flex flex-col gap-1">
                    <h4 className="mb-1 text-sm font-bold uppercase leading-4 text-[#26212E]">
                      Pan Account Details
                    </h4>
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      PAN Number
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>{employee_data_redux?.panNumber || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Name In PAN
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <> {employee_data_redux?.panName || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="col-span-3 flex w-[50%] flex-col gap-6">
                    {isLoading ? (
                      <Skeleton height={"56px"} width={"70%"} />
                    ) : (
                      <>
                        {" "}
                        {attachment?.permanentAccountNumber.map((data) => {
                          return (
                            <AttachmentCard
                              cardSize="small"
                              name={
                                getFileNameFromUrl(data?.guid?.rendered) ||
                                getFileNameFromUrl(data.node?.mediaItemUrl)
                              }
                              type={data.mime_type || data.node.mimeType}
                              size={data.media_details?.filesize || data?.node?.fileSize}
                              fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                              onDelete={() =>
                                deleteAttachment(
                                  data?.node?.mediaItemId,
                                  "permanentAccountNumber",
                                )
                              }
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="mb-1 text-sm font-bold uppercase leading-4 text-[#26212E]">
                      Aadhaar
                    </h4>

                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Aadhaar Number
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <> {employee_data_redux?.aadharNumber || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Name In Aadhaar
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <> {employee_data_redux?.aadharName || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="col-span-3 flex w-[50%] flex-col gap-6">
                    {isLoading ? (
                      <Skeleton height={"56px"} width={"70%"} />
                    ) : (
                      <>
                        {" "}
                        {attachment?.aadharCard?.map((data) => {
                          return (
                            <AttachmentCard
                              cardSize="small"
                              name={
                                getFileNameFromUrl(data?.guid?.rendered) ||
                                getFileNameFromUrl(data.node?.mediaItemUrl)
                              }
                              type={data.mime_type || data.node.mimeType}
                              size={data.media_details?.filesize || data?.node?.fileSize}
                              fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                              onDelete={() =>
                                deleteAttachment(data?.node?.mediaItemId, "aadharCard")
                              }
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="mb-1 text-sm font-bold uppercase leading-4 text-[#26212E]">
                      Passport
                    </h4>

                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Passport Number
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <> {employee_data_redux?.panNumber || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Name In Passport
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <> {employee_data_redux?.passportName || "-"}</>
                      )}
                    </h6>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                      Expiry Date
                    </h3>
                    <h6 className="text-base font-medium leading-5 text-[#26212E]">
                      {isLoading ? (
                        <Skeleton height={"20px"} width={"70%"} />
                      ) : (
                        <>
                          {" "}
                          {formatDate(employee_data_redux?.passportExpiryDate) ||
                            "-"}
                        </>
                      )}
                    </h6>
                  </div>
                  <div className="col-span-3 flex w-[50%] flex-col gap-6">
                    {isLoading ? (
                      <Skeleton height={"56px"} width={"70%"} />
                    ) : (
                      <>
                        {" "}
                        {attachment?.passPort.map((data) => {
                          return (
                            <AttachmentCard
                              cardSize="small"
                              name={
                                getFileNameFromUrl(data?.guid?.rendered) ||
                                getFileNameFromUrl(data.node?.mediaItemUrl)
                              }
                              type={data.mime_type || data.node.mimeType}
                              size={data.media_details?.filesize || data?.node?.fileSize}
                              fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                              onDelete={() =>
                                deleteAttachment(data?.node?.mediaItemId, "passPort")
                              }
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div id="familyDetails" className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 rounded border border-[#E1DCFF] p-6">
                <h1 className="flex items-center justify-between text-xl font-semibold leading-6 text-[#26212E]">
                  6. Family Details
                  <button
                    onClick={() => {
                      handleNavigate(5);
                    }}
                  >
                    <img
                      src={
                        config.PUBLIC_URL +
                        "/assets/images/amdital/onboarding/edit.svg"
                      }
                      alt=""
                      className="size-[18px]"
                    />
                  </button>
                </h1>

                {employee_data_redux?.familyDetails?.map((member, index) => {
                  return (
                  <div className=" flex flex-col gap-6">
                     <div>Member {index+1}</div>
                    <div key={index} className="grid grid-cols-3 gap-6">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                          Name
                        </h3>
                        <h6 className="text-base font-medium leading-5 text-[#26212E]">
                          {isLoading ? (
                            <Skeleton height={"20px"} width={"70%"} />
                          ) : (
                            <> {member?.name || "-"}</>
                          )}
                        </h6>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                          Relationship
                        </h3>
                        <h6 className="text-base font-medium leading-5 text-[#26212E]">
                          {isLoading ? (
                            <Skeleton height={"20px"} width={"70%"} />
                          ) : (
                            <> {member?.relationship || "-"}</>
                          )}
                        </h6>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                          Date Of Birth
                        </h3>
                        <h6 className="text-base font-medium leading-5 text-[#26212E]">
                          {isLoading ? (
                            <Skeleton height={"20px"} width={"70%"} />
                          ) : (
                            <> {formatDate(member.date_of_birth) || "-"}</>
                          )}
                        </h6>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                          Gender
                        </h3>
                        <h6 className="text-base font-medium leading-5 text-[#26212E]">
                          {isLoading ? (
                            <Skeleton height={"20px"} width={"70%"} />
                          ) : (
                            <> {member.gender || "-"}</>
                          )}
                        </h6>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                          Blood Group
                        </h3>
                        <h6 className="text-base font-medium leading-5 text-[#26212E]">
                          {isLoading ? (
                            <Skeleton height={"20px"} width={"70%"} />
                          ) : (
                            <> {member.blood_group || "-"}</>
                          )}
                        </h6>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                          Nationality
                        </h3>
                        <h6 className="text-base font-medium leading-5 text-[#26212E]">
                          {isLoading ? (
                            <Skeleton height={"20px"} width={"70%"} />
                          ) : (
                            <> {countryNameDisplay(member.nationality) || "-"}</>
                          )}
                        </h6>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                          Minor
                        </h3>
                        <h6 className="text-base font-medium leading-5 text-[#26212E]">
                          {isLoading ? (
                            <Skeleton height={"20px"} width={"70%"} />
                          ) : (
                            <> {member.is_minor ? "Yes" : "No"}</>
                          )}
                        </h6>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                          Mental Illness
                        </h3>
                        <h6 className="text-base font-medium leading-5 text-[#26212E]">
                          {isLoading ? (
                            <Skeleton height={"20px"} width={"70%"} />
                          ) : (
                            <> {member.has_mental_illness ? "Yes" : "No"}</>
                          )}
                        </h6>
                      </div>

                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                          Mobile
                        </h3>
                        <h6 className="text-base font-medium leading-5 text-[#26212E]">
                          {isLoading ? (
                            <Skeleton height={"20px"} width={"70%"} />
                          ) : (
                            <> {member.mobile || "-"}</>
                          )}
                        </h6>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
            <div id="nominationDetails" className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 rounded border border-[#E1DCFF] p-6">
                <h1 className="flex items-center justify-between text-xl font-semibold leading-6 text-[#26212E]">
                  7. Nominations
                  <button
                    onClick={() => {
                      handleNavigate(6);
                    }}
                  >
                    <img
                      src={
                        config.PUBLIC_URL +
                        "/assets/images/amdital/onboarding/edit.svg"
                      }
                      alt=""
                      className="size-[18px]"
                    />
                  </button>
                </h1>
                <div className=" flex flex-col gap-6 ">
                  <div className=" flex flex-col gap-4">
                            <h4 className="mb-1 text-sm font-bold uppercase leading-4 text-[#26212E]">
                              EPF Nomination
                            </h4>
                  
                  {employee_data_redux?.epfNomination?.map((data, index) => {
                    return (
                      <div className=" flex gap-40">

                        <div className="flex flex-col gap-1">
                         
                          <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                            Name
                          </h3>
                          <h6 className="text-base font-medium leading-5 text-[#26212E]">
                            {isLoading ? (
                              <Skeleton height={"20px"} width={"70%"} />
                            ) : (
                              <> {data.name}</>
                            )}
                          </h6>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                            Nomination %
                          </h3>
                          <h6 className="text-base font-medium leading-5 text-[#26212E]">
                            {isLoading ? (
                              <Skeleton height={"20px"} width={"70%"} />
                            ) : (
                              <> {data.nomination_percentage}</>
                            )}
                          </h6>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                  <div className=" flex flex-col gap-4">
                  <h4 className="mb-1 text-sm font-bold uppercase leading-4 text-[#26212E]">
                              EPs Nomination
                            </h4>
                    {employee_data_redux?.epsNomination?.map((data) => {
                      return (
                        <>
                          <div className="col-span-2 flex flex-col gap-1">
                            <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                              Name
                            </h3>
                            <h6 className="text-base font-medium leading-5 text-[#26212E]">
                              {isLoading ? (
                                <Skeleton height={"20px"} width={"70%"} />
                              ) : (
                                <> {data?.name}</>
                              )}
                            </h6>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className=" flex flex-col gap-4">
                  <h4 className="mb-1 text-sm font-bold uppercase leading-4 text-[#26212E]">
                            ESi Nomination
                          </h4>
                  {employee_data_redux?.esiNomination?.map((data) => {
                    return (
                      <>
                        <div className="col-span-2 flex flex-col gap-1">
                          
                          <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                            Name
                          </h3>
                          <h6 className="text-base font-medium leading-5 text-[#26212E]">
                            {isLoading ? (
                              <Skeleton height={"20px"} width={"70%"} />
                            ) : (
                              <> {data?.name}</>
                            )}
                          </h6>
                        </div>
                      </>
                    );
                  })}
                  </div>
                  <div className=" flex flex-col gap-4">
                              <h4 className="mb-1 text-sm font-bold uppercase leading-4 text-[#26212E]">
                                Gratuity Nomination
                              </h4>
                    {employee_data_redux?.gravityNomination?.map((data, index) => {
                      return (
                        <div className=" flex gap-40 ">
                          <div className="flex flex-col gap-1">
                            

                            <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                              Name
                            </h3>
                            <h6 className="text-base font-medium leading-5 text-[#26212E]">
                              {isLoading ? (
                                <Skeleton height={"20px"} width={"70%"} />
                              ) : (
                                <> {data?.name}</>
                              )}
                            </h6>
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-medium leading-4 text-[#26212E]">
                              Nomination %
                            </h3>
                            <h6 className="text-base font-medium leading-5 text-[#26212E]">
                              {isLoading ? (
                                <Skeleton height={"20px"} width={"70%"} />
                              ) : (
                                <> {data.nomination_percentage}</>
                              )}
                            </h6>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
            <div className=" flex justify-center mt-[20px] gap-4 tracking-[5%] ">
                            <ButtonNew
                            type="button"
                            buttonName= "Back"
                            buttonClassName = {` w-[83px] bg-[#FFFFFF] hover:bg-[#FFF2ED]  border-[#FF845C] border-2 text-[#FF845C] h-10  outline-none text-sm leading-[100%] tracking-[5%]  font-semibold   `}
                            spanClassName = " border-[#FFFFFF] "
                            onClick={async()=>{
                                const countUpdate = await onboardingOnStepCountHandler(user_id,7);
                                const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
                                navigate("/onboarding/onboarding-form/7");
                       
                            }}
                          />
                          <ButtonNew
                          type="button"
                          buttonName= "Save and Next"
                          buttonClassName = {`  bg-[#F36A3D]  w-[170px]  w-[149px]  bg-[#FF845C] hover:bg-[#F36A3D] h-10  outline-none text-base leading-3 font-semibold text-[#FFFFFF]  `}
                          spanClassName = " border-[#FFFFFF] "
                          onClick={() => {
                            setSubmitPopup(true);
                          }}
                        />                                                 
                                                                                        
          </div>
      </div>
      {submitPopup && (
        <div className="fixed left-0 top-0 z-[1100] flex h-full w-full justify-center ">
          <div className=" z-[1100]  mt-20 h-fit ">
            <SubmitPopup
              onCancel={() => setSubmitPopup(false)}
              onSubmit={async()=>{
                  const res = await onboardingOnStepCountHandler(user_id,9)
                  navigate("/onboarding/onboarding-form/confirmation/9");                
              }}
            />
          </div>
          {submitPopup && (
            <div
              className="fixed inset-0 z-[1000] cursor-pointer bg-[#150C2CB2] "
              onClick={() => {
                setSubmitPopup(false);
              }}
            ></div>
          )}
        </div>
      )}
    </>
  );
};

export default InformationSummary;
