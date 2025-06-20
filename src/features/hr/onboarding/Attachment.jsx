import React, { useEffect, useState } from "react";
import AttachmentCard from "./AttachmentCard";
import InputAttachementFile from "./InputAttachementFile";
import {
  deleteMediaOnboarding,
  deleteMediaOnboardingStaticUrl,
  mediaUploadOnboarding,
  mediaUploadOnboardingStaticUrl,
} from "../../profile/uploadImage";
import { useSelector } from "react-redux";
import { getAttachmentsOnboardingData, getSingleEmployeeOnboardingData, onboardingOnStepCountHandler } from "./OnboardingNewApi";
import { errorMessageHandler, successfullMessageHandler } from "../../../components/elements/amdital/toastyMessage";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import ButtonNew from "../../../components/elements/amdital/ButtonNew";

const Attachment = ({isEditing=false,employee_data_redux}) => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
       const [buttonClicked, setButtonClicked] = useState(false);

  const onboarding_redux = useSelector(store=>store?.onboarding)
    const  token_details =onboarding_redux?.onboarding_employee_authentication_data;
    const token =token_details?.authToken;
    const graphqlId = token_details?.user?.id;
    const user_id = token_details?.user?.userId;

  const employee_data_attachment = onboarding_redux?.onboarding_employee_attachments;


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

  const [attachmentErrors,setAttachmentErrors] = useState({})

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
 

  const deleteAttachment = async (id) => {
    try {
      const response = await deleteMediaOnboardingStaticUrl(id);
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


  function getFileNameFromUrl(url) {
    return url?.split("/").pop();
  }


  const getAttchment = async () => {
    const employee_response = await getAttachmentsOnboardingData(graphqlId)
  };

  const fileOnChangeHandler = async (e, title, altText) => {
    const file = e.target.files[0];
    const response = await mediaUploadOnboardingStaticUrl(file, graphqlId, altText);  
    setAttachmentErrors({})
    if(response?.id){
          successfullMessageHandler(enqueueSnackbar,"Image uploaded successfully!.")
          const employee_response = await getAttachmentsOnboardingData(graphqlId)
          return false;
        }
        else{
          errorMessageHandler(enqueueSnackbar,response?.message)
          return response;
        }
  };

  useEffect(() => {
    getAttchment();
  },[]);

  const onsubmitHandler = async(e)=>{

    e.preventDefault();

    if(attachment?.qualification?.length === 0){

      setAttachmentErrors({...attachmentErrors,qualification:true})

      return false;

    }
    if(employee_data_redux?.previousEmployment?.length > 0 &&  employee_data_redux?.previousEmployment?.[0]?.company_name){
      if(attachment?.previousEmployment?.length === 0){
        setAttachmentErrors({...attachmentErrors,previousEmployment:true})
        return false
      }
    }
    if(attachment?.bankAccountDetails?.length === 0){
      setAttachmentErrors({...attachmentErrors,bankAccountDetails:true})
      return false
    }
    if(attachment?.permanentAccountNumber?.length === 0 ){
      setAttachmentErrors({...attachmentErrors,permanentAccountNumber:true})
      return false

    }
    if(attachment?.aadharCard?.length === 0){
      setAttachmentErrors({...attachmentErrors,aadharCard:true})
      return false
    }
    setButtonClicked(true)
 const countUpdate = await onboardingOnStepCountHandler(user_id,8);
 const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
 successfullMessageHandler(enqueueSnackbar,"Successfully updated. Continue to the next step!");
 setButtonClicked(false)
  navigate("/onboarding/onboarding-form/information-summary/8");

  }


  // useEffect(() => {
  //   if (attachmentErrors?.qualification || attachmentErrors?.previousEmployment || attachmentErrors?.bankAccountDetails || attachmentErrors?.permanentAccountNumber || attachmentErrors?.aadharCard ) {
  //     setTimeout(() => {
  //       setAttachmentErrors({})
  //     }, 5000);
  //   }
  // }, [attachmentErrors]);

  return (
    <>
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl font-semibold leading-6 text-[#26212E]">
            1. Attachments
          </h1>
          <h6 className="flex items-center justify-between border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            Address - Permanent Address
            <div className="flex items-center gap-2">
              <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
                !
              </div>
              <p className="text-sm font-normal leading-4 text-[#26212E]">
                For proof attach one of the following aadhaar card/ driving
                license/ passport/ electricity bill, water bill/ bank pass book.
              </p>
            </div>
          </h6>
          <div className="grid grid-cols-3 gap-6">
            { attachment?.permanentAddress?.length > 0 && attachment?.permanentAddress.map((data, index) => {
              return (
                <AttachmentCard
                  name={
                    getFileNameFromUrl(data?.guid?.rendered) ||
                    getFileNameFromUrl(data.node.mediaItemUrl)
                  }
                  type={data.mime_type || data.node.mimeType}
                  size={data.media_details?.filesize || data?.node?.fileSize}
                  onDelete={() => deleteAttachment(data?.node?.mediaItemId, "permanentAddress")}
                  fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                />
              );
            })}
            <div>
              <InputAttachementFile
                name="permanent_address_file"
                // onChange={(e) => handleFileChange(e, "permanentAddress")}
                onChange={(e) =>
                  fileOnChangeHandler(e, "onboarding doc", "permanentAddress")
                }
              />
             
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
              !
            </div>
            <p className="text-sm font-normal leading-4 text-[#26212E]">
              Only pdf, doc, docx, jpg, & png. Max 10MB
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h6 className="flex items-center justify-between border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            Address - Present Address
            <div className="flex items-center gap-2">
              <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
                !
              </div>
              <p className="text-sm font-normal leading-4 text-[#26212E]">
                For proof attach one of the following aadhaar card/ driving
                license/ passport/ electricity bill, water bill/ bank pass book.
              </p>
            </div>
          </h6>
          <div className="grid grid-cols-3 gap-6">
            {attachment?.presentAddress?.length > 0 && attachment?.presentAddress.map((data, index) => {
              return (
                <AttachmentCard
                  name={
                    getFileNameFromUrl(data?.guid?.rendered) ||
                    getFileNameFromUrl(data.node.mediaItemUrl)
                  }
                  type={data.mime_type || data.node.mimeType}
                  size={data.media_details?.filesize || data?.node?.fileSize}
                  onDelete={() => deleteAttachment(data?.node?.mediaItemId, "presentAddress")}
                  fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                />
              );
            })}
            <div>
              <InputAttachementFile
                name="present_address_file"
                // onChange={(e) => handleFileChange(e, "presentAddress")}
                onChange={(e) =>
                  fileOnChangeHandler(e, "onboarding doc", "presentAddress")
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
              !
            </div>
            <p className="text-sm font-normal leading-4 text-[#26212E]">
              Only pdf, doc, docx, jpg, & png. Max 10MB
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h6 className="flex items-center justify-between border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            Qualification - Degree
            <div className="flex items-center gap-2">
              <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
                !
              </div>
              <p className="text-sm font-normal leading-4 text-[#26212E]">
                For proof attach certificate (mandatory) and marksheet
                (mandatory)
              </p>
            </div>
          </h6>
          <div className="grid grid-cols-3 gap-6">
            {attachment?.qualification?.length > 0 && attachment?.qualification.map((data, index) => {
              return (
                <AttachmentCard
                name={
                  getFileNameFromUrl(data?.guid?.rendered) ||
                  getFileNameFromUrl(data.node.mediaItemUrl)
                }
                  type={data.mime_type || data.node.mimeType}
                  size={data.media_details?.filesize || data?.node?.fileSize}
                  fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                  onDelete={() => deleteAttachment(data?.node?.mediaItemId, "qualification")}
                />
              );
            })}
            <div>
              <InputAttachementFile
                name="qualification_file"
                // onChange={(e) => handleFileChange(e, "qualification")}
                onChange={(e) =>
                  fileOnChangeHandler(e, "onboarding doc", "qualification")
                }
              />
              {attachmentErrors.qualification && (
                <span className="text-sm font-normal leading-4 text-[#FF0000]">
                  Attach at least one file
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
              !
            </div>
            <p className="text-sm font-normal leading-4 text-[#26212E]">
              Only pdf, doc, docx, jpg, & png. Max 10MB
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl font-semibold leading-6 text-[#26212E]">
            2. Previous Employments
          </h1>
          <h6 className="flex items-center justify-between border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            Previous Employment
            <div className="flex items-center gap-2">
              <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
                !
              </div>
              <p className="text-sm font-normal leading-4 text-[#26212E]">
                For proof attach latest pay slip (mandatory) and one of the
                following offer letter/appointment letter/ company relieving/
                experience letter/ from 16.
              </p>
            </div>
          </h6>
          <div className="grid grid-cols-3 gap-6">
            {attachment?.previousEmployment?.length > 0 && attachment?.previousEmployment.map((data, index) => {
              return (
                <AttachmentCard
                name={
                  getFileNameFromUrl(data?.guid?.rendered) ||
                  getFileNameFromUrl(data.node.mediaItemUrl)
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
            <div>
              <InputAttachementFile
                name="previous_employement_file"
                // onChange={(e) => handleFileChange(e, "previousEmployment")}
                onChange={(e) =>
                  fileOnChangeHandler(e, "onboarding doc", "previousEmployment")
                }
              />
              {attachmentErrors.previousEmployment && (
                <span className="text-sm font-normal leading-4 text-[#FF0000]">
                  Attach at least one file
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
              !
            </div>
            <p className="text-sm font-normal leading-4 text-[#26212E]">
              Only pdf, doc, docx, jpg, & png. Max 10MB
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl font-semibold leading-6 text-[#26212E]">
            3. Account & Statutory
          </h1>
          <h6 className="flex items-center justify-between border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            Bank Account Details
            <div className="flex items-center gap-2">
              <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
                !
              </div>
              <p className="text-sm font-normal leading-4 text-[#26212E]">
                For proof attach passbook/ cancelled check
              </p>
            </div>
          </h6>
          <div className="grid grid-cols-3 gap-6">
            {attachment?.bankAccountDetails?.length > 0 && attachment?.bankAccountDetails.map((data, index) => {
              return (
                <AttachmentCard
                name={
                  getFileNameFromUrl(data?.guid?.rendered) ||
                  getFileNameFromUrl(data.node.mediaItemUrl)
                }
                type={data.mime_type || data.node.mimeType}
                size={data.media_details?.filesize || data?.node?.fileSize}
                fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                onDelete={() => deleteAttachment(data?.node?.mediaItemId,'bankAccountDetails')}
              />
               
              );
            })}
            <div>
            <InputAttachementFile
              name="bank_account_details_file"
              // onChange={(e) => handleFileChange(e, "bankAccountDetails")}
              onChange={(e) =>
                fileOnChangeHandler(e, "onboarding doc", "bankAccountDetails")
              }
            />
              {
              attachmentErrors.bankAccountDetails &&  <span className="text-sm font-normal leading-4 text-[#FF0000]">
             Attach at least one file
            </span>
            }
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
              !
            </div>
            <p className="text-sm font-normal leading-4 text-[#26212E]">
              Only pdf, doc, docx, jpg, & png. Max 10MB
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h6 className="flex items-center justify-between border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            Permanent Account Number
            <div className="flex items-center gap-2">
              <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
                !
              </div>
              <p className="text-sm font-normal leading-4 text-[#26212E]">
                For proof attach PAN card
              </p>
            </div>
          </h6>
          <div className="grid grid-cols-3 gap-6">
            {attachment?.permanentAccountNumber?.length > 0 && attachment?.permanentAccountNumber.map((data, index) => {
              return (
                <AttachmentCard
                name={
                  getFileNameFromUrl(data?.guid?.rendered) ||
                  getFileNameFromUrl(data.node.mediaItemUrl)
                }
                type={data.mime_type || data.node.mimeType}
                size={data.media_details?.filesize || data?.node?.fileSize}
                fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                onDelete={() => deleteAttachment(data?.node?.mediaItemId,'permanentAccountNumber')}
              />
              
              );
            })}
            <div>
            <InputAttachementFile
              name="permanent_account_number_file"
              // onChange={(e) => handleFileChange(e, "permanentAccountNumber")}
              onChange={(e) =>
                fileOnChangeHandler(e, "onboarding doc", "permanentAccountNumber")
              }
            />
              {
              attachmentErrors.permanentAccountNumber &&  <span className="text-sm font-normal leading-4 text-[#FF0000]">
             Attach at least one file
            </span>
            }
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
              !
            </div>
            <p className="text-sm font-normal leading-4 text-[#26212E]">
              Only pdf, doc, docx, jpg, & png. Max 10MB
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h6 className="flex items-center justify-between border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            Aadhaar
            <div className="flex items-center gap-2">
              <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
                !
              </div>
              <p className="text-sm font-normal leading-4 text-[#26212E]">
                For proof attach aadhaar card
              </p>
            </div>
          </h6>
          <div className="grid grid-cols-3 gap-6">
            {attachment?.aadharCard?.length > 0 && attachment?.aadharCard.map((data, index) => {
              return (
                <AttachmentCard
                name={
                  getFileNameFromUrl(data?.guid?.rendered) ||
                  getFileNameFromUrl(data.node.mediaItemUrl)
                }
                type={data.mime_type || data.node.mimeType}
                size={data.media_details?.filesize || data?.node?.fileSize}
                fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                onDelete={() => deleteAttachment(data?.node?.mediaItemId,'aadharCard')}
              />
               
              );
            })}
<div>
            <InputAttachementFile
              name="aadhar_card_file"
              // onChange={(e) => handleFileChange(e, "aadharCard")}
              onChange={(e) =>
                fileOnChangeHandler(e, "onboarding doc", "aadharCard")
              }
            />
              {
              attachmentErrors.aadharCard &&  <span className="text-sm font-normal leading-4 text-[#FF0000]">
             Attach at least one file
            </span>
            }
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
              !
            </div>
            <p className="text-sm font-normal leading-4 text-[#26212E]">
              Only pdf, doc, docx, jpg, & png. Max 10MB
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h6 className="flex items-center justify-between border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            Passport
            <div className="flex items-center gap-2">
              <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
                !
              </div>
              <p className="text-sm font-normal leading-4 text-[#26212E]">
                For proof attach passport
              </p>
            </div>
          </h6>
          <div className="grid grid-cols-3 gap-6">
            {attachment?.passPort?.length > 0 && attachment?.passPort.map((data, index) => {
              return (
                <AttachmentCard
                name={
                  getFileNameFromUrl(data?.guid?.rendered) ||
                  getFileNameFromUrl(data.node.mediaItemUrl)
                }
                type={data.mime_type || data.node.mimeType}
                size={data.media_details?.filesize || data?.node?.fileSize}
                fileUrl={data.guid?.raw || data?.node?.mediaItemUrl}
                onDelete={() => deleteAttachment(data?.node?.mediaItemId,'passPort')}
              />
          
              );
            })}
          <div>
            <InputAttachementFile
              name="passport_file"
              // onChange={(e) => handleFileChange(e, "passPort")}
              onChange={(e) =>
                fileOnChangeHandler(e, "onboarding doc", "passPort")
              }
            />
             
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FF845C] text-xs font-bold text-white">
              !
            </div>
            <p className="text-sm font-normal leading-4 text-[#26212E]">
              Only pdf, doc, docx, jpg, & png. Max 10MB
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className=" flex justify-center mt-[64px] gap-4 tracking-[5%] ">
                    <ButtonNew
                                            type="button"
                                            buttonName= "Back"
                                            buttonClassName = {` w-[83px] bg-[#FFFFFF] hover:bg-[#FFF2ED]  border-[#FF845C] border-2 text-[#FF845C] h-10  outline-none text-sm leading-[100%] tracking-[5%]  font-semibold   `}
                                            spanClassName = " border-[#FFFFFF] "
                                            onClick={async()=>{
                                              if(isEditing){
                                                
                                              }
                                              else{
                                                const countUpdate = await onboardingOnStepCountHandler(user_id,6);
                                                const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
                                                navigate("/onboarding/onboarding-form/6");
                                              }
                                            }}
                                          />
                                  <ButtonNew
                                          type="button"
                                          buttonName= "Save and Next"
                                          buttonClassName = {` ${ buttonClicked ? ` bg-[#F36A3D]  w-[170px] ` : ` w-[149px]  bg-[#FF845C] hover:bg-[#F36A3D] `} h-10  outline-none text-base leading-3 font-semibold text-[#FFFFFF]  `}
                                          spanClassName = " border-[#FFFFFF] "
                                          isLoading= {buttonClicked}
                                          onClick={onsubmitHandler}
                                        />                
                  </div>
    </>
  );
};

export default Attachment;
