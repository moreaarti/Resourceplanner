import React, { useEffect, useState } from "react";
import SelectHtml from "../../../components/elements/amdital/SelectHtml";
import Input from "../../projects_new/Reusable/Input";
import CustomDateInput from "../../../components/elements/amdital/CustomDate/CustomDateInput";
import ButtonNew from "../../../components/elements/amdital/ButtonNew";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { accountStatuoryOnboardingApi, getSingleEmployeeOnboardingData, onboardingOnStepCountHandler } from "./OnboardingNewApi";
import { errorMessageHandler, successfullMessageHandler } from "../../../components/elements/amdital/toastyMessage";
import SelectBoxDropdownNonOutside from "../emplyee/SelectBoxDropdownNonOutside";
import VaildationSelectionBox from "../../../components/elements/amdital/VaildationSelectionBox";

const AccountStatutory = ({isEditing=false,countryData,optionData,employee_data_redux}) => {

   const navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();
      const onboarding_redux = useSelector(store=>store?.onboarding)
      const  token_details =onboarding_redux?.onboarding_employee_authentication_data;
      const token =token_details?.authToken;
      const graphqlId = token_details?.user?.id;
      const user_id = token_details?.user?.userId;

      const countryOptions = countryData?.map((item)=>{
        return {id:item?.code,name:item?.name}
      });


      const [buttonClicked,setButtonClicked] = useState(false);

  const [fields,setFields] = useState({
    bankCountry:"",
    bankAccountNumber:"",
    conformatiomBankAccountNumber:"",
    bankBranchName:"",
    bankName:"",
    bankCode:"",
    nameOnBankAcc:"",
    accountType:"",
    pfAccountDetails:"",
    pfUan:"",
    panNumber:"",
    panName:"",
    aadharNumber:"",
    aadharName:"",
    passportNumber:"",
    passportName:"",
    passportExpiryDate:"",
  })

  useEffect(()=>{
    setFields({
      bankCountry:employee_data_redux?.bankCountry || "",
      bankAccountNumber:employee_data_redux?.bankAccountNumber || "",
      conformatiomBankAccountNumber:employee_data_redux?.bankAccountNumber || "",
      bankBranchName:employee_data_redux?.bankBranchName || "",
      bankName:employee_data_redux?.bankName || "",
      bankCode:employee_data_redux?.bankCode || "",
      nameOnBankAcc:employee_data_redux?.nameOnBankAcc || "",
      accountType:employee_data_redux?.accountType || "",
      pfAccountDetails:employee_data_redux?.pfAccountDetails || "",
      pfUan:employee_data_redux?.pfUan || "",
      panNumber:employee_data_redux?.panNumber || "",
      panName:employee_data_redux?.panName || "",
      aadharNumber:employee_data_redux?.aadharNumber || "",
      aadharName:employee_data_redux?.aadharName || "",
      passportNumber:employee_data_redux?.passportNumber || "",
      passportName:employee_data_redux?.passportName || "",
      passportExpiryDate:employee_data_redux?.passportExpiryDate || "",
    })
  
  },[employee_data_redux]);


      const [validationError,setValidationError] = useState({
      accountType:false
    });

    const onChangeHandler =(e)=>{
      const {name,value} = e.target;
      setFields({...fields,[name]:value})
    }
    const onChangeExpireHandler =(e)=>{
      setFields({...fields,passportExpiryDate:e.target.value})
    }


  const onSubmitHandler =async (e)=>{
    e.preventDefault();
    if(fields?.conformatiomBankAccountNumber !== fields?.bankAccountNumber){
      setFields({...fields,conformatiomBankAccountNumber:""})
      return false
    }
     if(fields?.accountType === ""){
      setValidationError({...validationError,accountType:true})
      return false
    }
    
     try{
       const  response_profile = await accountStatuoryOnboardingApi(user_id,fields);
       setButtonClicked(false);
       if(response_profile?.data?.data?.updateUser?.user?.id){
        if(isEditing){
          navigate("/onboarding/onboarding-form/information-summary/8");
          return
        } else{
         const countUpdate = await onboardingOnStepCountHandler(user_id,5);
           const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
           successfullMessageHandler(enqueueSnackbar,"Successfully updated. Continue to the next step!");
           navigate("/onboarding/onboarding-form/5");
          }
       }
       if(response_profile?.data?.errors){
         errorMessageHandler(enqueueSnackbar,response_profile?.data?.errors?.[0]?.message)
       }
     }
     catch(e){
      errorMessageHandler(enqueueSnackbar,e?.message)
       setButtonClicked(false);
     }


  }



  return (
  <form onSubmit={onSubmitHandler}>
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold leading-6 text-[#26212E]">
          1. Identifications
        </h1>
        <h6 className="border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
          Bank Account Details
        </h6>
        <div className="grid grid-cols-3 gap-6">
            <SelectHtml
              id="bankCountry"
              name="bankCountry"
              autoComplete="autoComplete"
              classInput=" w-full h-10 bg-white"
              labelName={"Country"}
              placeholder={"Select country"}
              optionData={countryOptions}
              value={fields?.bankCountry}
              onChange={onChangeHandler}
              required
            />
          <Input
              id="bankName"
              type="text"
              name="bankName"
              classInput=" w-full h-10 bg-white"
              labelName={"Bank Name"}
              value={fields?.bankName}
              onChange={(e) => {
                const { name, value } = e.target;
                
                // Allow only letters and spaces
                const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
              
                setFields((prev) => ({
                  ...prev,
                  [name]: filteredValue,
                }));
              }}
              placeholder={"Enter bank name"}
              required
            />
          <Input
              id="bankBranchName"
              type="text"
              name="bankBranchName"
              classInput=" w-full h-10 bg-white"
              labelName={"Branch Name"}
              value={fields?.bankBranchName}
              onChange={(e) => {
                const { name, value } = e.target;
                
                // Allow only letters and spaces
                const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
              
                setFields((prev) => ({
                  ...prev,
                  [name]: filteredValue,
                }));
              }}
              placeholder={"Enter branch name"}
              required
            />
            <Input
              id="bankAccountNumber"
              type="text"
              name="bankAccountNumber"
              classInput=" w-full h-10 bg-white"
              labelName={"Bank Account Number"}
              value={fields?.bankAccountNumber}
              onChange={(e) => {
                const { name, value } = e.target;
              
                let filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
              
                setFields((prev) => ({
                  ...prev,
                  [name]: filteredValue,
                }));
              }}
              placeholder={"Enter account number"}
              required
            />
            <Input
              id="conformatiomBankAccountNumber"
              type="text"
              name="conformatiomBankAccountNumber"
              classInput=" w-full h-10 bg-white"
              labelName={"Confirm Bank Account Number"}
              value={fields?.conformatiomBankAccountNumber}
              onChange={(e) => {
                const { name, value } = e.target;
              
                let filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
              
                setFields((prev) => ({
                  ...prev,
                  [name]: filteredValue,
                }));
              }}
              placeholder="Confirm Bank Number"
              required
            />
            <div className=' relative w-full  '>
            <SelectBoxDropdownNonOutside
                              mainWrapperClass={`gap-1`}
                              labelClassName={` font-medium `}
                              labelName="Account Type"
                              dropDownClassName = { `  max-h-[300px] mt-2 `}
                              dropDownHeight = {300}
                              options={optionData.bankAccountTypes}
                              current_value={fields?.accountType}
                              current_id={fields?.accountType ? fields?.accountType : ""} 
                              onChangeHandler={(labelName,item)=>{setFields(prevFields => ({...prevFields,accountType:item?.id})); setValidationError({...validationError,accountType:false})}}  
                              wrapperClass= {` w-full h-10  `} 
                              bgClassName= {` bg-[#FFFFFF] `}  
                              searchPlaceholder={"Select account type"}   
                              required={true}
                            />  
                            {validationError?.accountType && <div className=" absolute flex justify-center  w-full ">
                                                            <VaildationSelectionBox/>
                                                          </div>}                                       
            
                          </div>
            {/* <SelectHtml
              id="accountType"
              name="accountType"
              autoComplete="autoComplete"
              classInput=" w-full h-10 bg-white"
              labelName={"Account Type"}
              placeholder={"Select account type"}
              optionData={optionData.bankAccountTypes}
              value={fields?.accountType}
              onChange={onChangeHandler}
              required
            /> */}
        </div>
        <div className="grid grid-cols-3 items-center gap-6">
          
            <Input
              id="bankCode"
              type="text"
              name="bankCode"
              autoComplete="autoComplete"
              classInput=" w-full h-10 bg-white"
              labelName={"Bank Code"}
              value={fields?.bankCode}
              onChange={(e) => {
                const { name, value } = e.target;
              
                let filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
              
                setFields((prev) => ({
                  ...prev,
                  [name]: filteredValue,
                }));
              }}
              placeholder="Enter bankcode / ifsc code"
              required
            />
            <Input
              id="nameOnBankAcc"
              type="text"
              name="nameOnBankAcc"
              autoComplete="autoComplete"
              classInput=" w-full h-10 bg-white"
              labelName={"Name as per Bank Account"}
              value={fields?.nameOnBankAcc}
              onChange={(e) => {
                const { name, value } = e.target;
                
                // Allow only letters and spaces
                const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
              
                setFields((prev) => ({
                  ...prev,
                  [name]: filteredValue,
                }));
              }}
              placeholder="Enter name as per bank account"
              required
            />
        </div>
       
        <h6 className="border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
          PF Account Details
        </h6>
        <div className="grid grid-cols-3 items-start gap-6">
          <Input
            id="pfAccountDetails"
            name="pfAccountDetails"
            type="text"
            autoComplete="autoComplete"
            classInput="w-full h-10 bg-white"
            labelName={"PF Account Details"}
            value={fields?.pfAccountDetails}
            onChange={(e) => {
              const { name, value } = e.target;
            
              let filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
            
              setFields((prev) => ({
                ...prev,
                [name]: filteredValue,
              }));
            }}
            placeholder="Enter pf account details"
            required
          />
        <Input
          id="pfUan"
          name="pfUan"
          type="text"
          autoComplete="autoComplete"
          classInput="w-full h-10 bg-white"
          labelName={"UAN"}
          value={fields?.pfUan}
          onChange={(e) => {
            const { name, value } = e.target;
          
            let filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
          
            setFields((prev) => ({
              ...prev,
              [name]: filteredValue,
            }));
          }}
          placeholder="Enter UAN number"
          required
        />
      </div>

        <h6 className="border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
          Permanent Account Number
        </h6>
        <div className="grid grid-cols-3 items-start gap-6">
          
            <Input
              id="panNumber"
              name="panNumber"
              type="text"
              autoComplete="autoComplete"
              classInput=" w-full h-10 bg-white"
              labelName={"PAN Number"}
              value={fields?.panNumber}
              onChange={(e) => {
                const { name, value } = e.target;
              
                let filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
              
                setFields((prev) => ({
                  ...prev,
                  [name]: filteredValue,
                }));
              }}
              placeholder="Enter pan number"
              required
            />
            <Input
              id="panName"
              name="panName"
              type="text"
              autoComplete="autoComplete"
              classInput=" w-full h-10 bg-white"
              labelName={"Name in PAN"}
              value={fields?.panName}
              onChange={(e) => {
                const { name, value } = e.target;
                const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
              
                setFields((prev) => ({
                  ...prev,
                  [name]: filteredValue,
                }));
              }}
              placeholder="Enter pan name"
              required
            />
        </div>
        <h6 className="border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
          Aadhaar
        </h6>
        <div className="grid grid-cols-3 items-start gap-6">
            <Input
              id="aadharNumber"
              name="aadharNumber"
              type="text"
              autoComplete="autoComplete"
              classInput=" w-full h-10 bg-white"
              labelName={"Aadhaar Number"}
              maxLength={12}
              value={fields?.aadharNumber}
              onChange={(e) => {
                const { name, value } = e.target;
              
                let filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
              
                setFields((prev) => ({
                  ...prev,
                  [name]: filteredValue,
                }));
              }}
              placeholder="Enter aadhaar number"
              required
            />
            <Input
              id="aadharName"
              name="aadharName"
              type="text"
              autoComplete="autoComplete"
              classInput=" w-full h-10 bg-white"
              labelName={"Name in Aadhaar"}
              value={fields?.aadharName}
              onChange={(e) => {
                const { name, value } = e.target;
                const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
              
                setFields((prev) => ({
                  ...prev,
                  [name]: filteredValue,
                }));
              }}
              placeholder="Enter aadhar name"
              required

            />
        </div>
        <h6 className="border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
          Passport
        </h6>
        <div className="grid grid-cols-3 items-start gap-6">
          <Input
            id="passportNumber"
            name="passportNumber"
            type="text"
            autoComplete="autoComplete"
            classInput="w-full h-10 bg-white"
            labelName={"Passport Number"}
            value={fields?.passportNumber}
            onChange={(e) => {
              const { name, value } = e.target;
            
              let filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
            
              setFields((prev) => ({
                ...prev,
                [name]: filteredValue,
              }));
            }}
            placeholder="Enter passport number"
          />
          <Input
            id="passportName"
            name="passportName"
            type="text"
            autoComplete="autoComplete"
            classInput="w-full h-10 bg-white"
            labelName={"Name in Passport"}
            value={fields?.passportName}
            onChange={(e) => {
              const { name, value } = e.target;
              const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
            
              setFields((prev) => ({
                ...prev,
                [name]: filteredValue,
              }));
            }}
            placeholder="Enter passport name"
          />
          <div className=' relative w-full  '>
                          <CustomDateInput
                              label=" Expiry Date"
                                inputWidth="100%"
                                          inputHeight="40px"
                                          labelWidth="120px"
                                          value={fields?.passportExpiryDate}
                                          onChange={onChangeExpireHandler}
                                          placeholder="YYYY/MM/DD"
                                          wrapperClass="mt-1"
                                          required={false}
                                          inputClass="!bg-[#FFFFFF] "
                                        /> 
                         
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
                            isLoading= {buttonClicked}
                            onClick={async()=>{
                              if(isEditing){
                                
                              }
                              else{
                                const countUpdate = await onboardingOnStepCountHandler(user_id,3);
                                const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
                                navigate("/onboarding/onboarding-form/3");
                              }
                            }}
                          />
                             <ButtonNew
                               type="submit"
                               buttonName= "Save and Next"
                               buttonClassName = {` ${ buttonClicked ? ` bg-[#F36A3D]  w-[170px] ` : ` w-[149px]  bg-[#FF845C] hover:bg-[#F36A3D] `} h-10  outline-none text-base leading-3 font-semibold text-[#FFFFFF]  `}
                               spanClassName = " border-[#FFFFFF] "
                               isLoading= {buttonClicked}
                             />
            </div> 
  </form>
  );
};

export default AccountStatutory;
