import React, { useEffect, useState } from "react";
import SelectHtml from "../../../components/elements/amdital/SelectHtml";
import Input from "../../projects_new/Reusable/Input";
import config from "../../../config/config";
import ButtonNew from "../../../components/elements/amdital/ButtonNew";
import CustomDateInput from "../../../components/elements/amdital/CustomDate/CustomDateInput";
import VaildationSelectionBox from "../../../components/elements/amdital/VaildationSelectionBox";
import axios from "axios";
import { useSelector } from "react-redux";
import { getSingleEmployeeOnboardingData, onboardingOnStepCountHandler, personalInformationOnboardingApi } from "./OnboardingNewApi";
import { useNavigate } from "react-router-dom";
import { errorMessageHandler, successfullMessageHandler } from "../../../components/elements/amdital/toastyMessage";
import { useSnackbar } from "notistack";
import SelectBoxDropdownNonOutside from "../emplyee/SelectBoxDropdownNonOutside";


const PersonalInformation = ({ isEditing=false,countryData,optionData,employee_data_redux}) => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
    const onboarding_redux = useSelector(store=>store?.onboarding)
      const token_details =onboarding_redux?.onboarding_employee_authentication_data;
      const token =token_details?.authToken;
      const graphqlId = token_details?.user?.id;
      const user_id = token_details?.user?.userId;

  const [buttonClicked,setButtonClicked] = useState(false);

  const [fields,setFields] = useState({
    bloodGroup:"",
    personalEmail:"",
    dateOfBirth:"",
    gender:"",
    fatherName:"",
    maritalStatus:"",
    marriageDate:"",
    spouseName:"",
    countryOfOrigin:"",
    userNationality:"",
    isInternationalEmployee:employee_data_redux.isInternationalEmployee || false,
    isPhysicallyChallenged: employee_data_redux.isPhysicallyChallenged || false,
    disabilityType:"",
    address:"",
    addressStreet:"",
    addressArea:"",
    addressCity:"",
    userCountry:"",
    userState:"",
    addressPin:"",
    addressPhone:"",
    isSameAsPermanent: employee_data_redux.isSameAsPermanent  || false,
    presentAddress:"",
    presentAddressStreet:"",
    presentAddressArea:"",
    presentAddressCity:"",
    presentAddressCountry:"",
    presentAddressState:"",
    presentAddressPin:"",
    presentAddressPhone:"",
    emergencyContactName:"",
    emergencyContact:"",
    emergencyContactRelationship:"",
    qualification:[{
      id:1,
      degree:"",
      institute:"",
      from_year:"",
      to_year:"",
    }]
  });
  const [validationError,setValidationError] = useState({
    bloodGroup:false,
    emergencyContactRelationship:false,
    gender:false,
    maritalStatus:false,
    dateOfBirth:false,
    marriageDate:false,
    disabilityType:false,
    qualification:[],
    toYearArray:[],
    fromYearArray:[],

  });

  console.log("validationError",validationError)

    const [stateList,setStateList]=useState([]);
    const [presentStateList,setPresentStateList]=useState([]);

  const countryOptions = countryData?.map((item)=>{
    return {id:item?.code,name:item?.name}
  });



  const onChangeHandler = (e) => {
    const {name, value} = e?.target;
    setFields(prevFields => ({...prevFields, [name]: value}));
  }



  const setpermanentDataHandelr =(e)=>{
    const {checked} = e.target;
    if(checked){
      setFields({...fields,
        isSameAsPermanent:checked, 
        presentAddress:fields?.address,
        presentAddressStreet:fields?.addressStreet,
        presentAddressArea:fields?.addressArea,
        presentAddressCity:fields?.addressCity,
        presentAddressCountry:fields?.userCountry,
        presentAddressState:fields?.userState,
        presentAddressPin:fields?.addressPin,
        presentAddressPhone:fields?.addressPhone
      })
    }
    else{
      setFields({...fields,
      isSameAsPermanent:checked, 
      presentAddress:employee_data_redux?.presentAddress || "",
      presentAddressStreet:employee_data_redux?.presentAddressStreet || "",
      presentAddressArea:employee_data_redux?.presentAddressArea || "",
      presentAddressCity:employee_data_redux?.presentAddressCity || "",
      presentAddressCountry:employee_data_redux?.presentAddressCountry || "",
      presentAddressState:employee_data_redux?.presentAddressState || "",
      presentAddressPin:employee_data_redux?.presentAddressPin || "",
      presentAddressPhone:employee_data_redux?.presentAddressPhone || ""
    })
    }
  }

  const addEducation =(count)=>{

    setFields({...fields,qualification:[...fields?.qualification,{
      id:count+1,
      degree:"",
      institute:"",
      from_year:"",
      to_year:"",
    }]})
}

const removeItem = (id)=>{
    const qualification_data =  fields?.qualification?.filter(value => value?.id !== id);
    setFields({...fields,qualification:qualification_data});
}

const onChangeHandlerQualification = (id,name,value) => {

  console.log("id,name,value",id,name,value)
  // const { value } = e.target;
  setFields(prevFields => ({
    ...prevFields,
    qualification: prevFields.qualification.map(item =>
      item.id === id ? { ...item, [name]: value } : item
    )
  }));
};

const onSubmitHandler = async (e)=>{
  e.preventDefault();
   if(fields?.bloodGroup === ""){
    setValidationError({...validationError,bloodGroup:true});
    return false;
  }
  if(fields?.dateOfBirth === ""){
    setValidationError({...validationError,dateOfBirth:true});
    return false;
  }
   if(fields?.gender === ""){
    setValidationError({...validationError,gender:true});
    return false;
  }
  if(fields?.maritalStatus === ""){
    setValidationError({...validationError,maritalStatus:true});
    return false;
  }
  if(fields?.marriageDate === "" && fields?.maritalStatus === "Married"){
    setValidationError({...validationError,marriageDate:true});
    return false
  }
   if(fields?.disabilityType === "" && fields?.isPhysicallyChallenged){
    setValidationError({...validationError,disabilityType:true});
    return false;
  }
  if(fields?.emergencyContactRelationship === ""){
    setValidationError({...validationError,emergencyContactRelationship:true});
    return false;
  }
    const qualification = fields?.qualification?.filter(item => item?.degree === "");
  if(qualification?.length > 0){
    setValidationError(prevState => ({
      ...prevState,
      qualification: qualification?.map(item => item?.id)
    }));
    return false;
  }
  const from_date_emty = fields?.qualification?.filter(item => item?.from_year === "");
  if(from_date_emty?.length > 0){
    setValidationError(prevState => ({
      ...prevState,
      fromYearArray: from_date_emty?.map(item => item?.id)
    }));
    return false;
  }
  const to_date_emty = fields?.qualification?.filter(item => item?.to_year === "");
  if(to_date_emty?.length > 0){
    setValidationError(prevState => ({
      ...prevState,
      toYearArray: to_date_emty?.map(item => item?.id)
    }));
    return false;
  }
  setButtonClicked(true);
  try{
    const  response_profile = await personalInformationOnboardingApi(graphqlId,fields);
    setButtonClicked(false);
    if(response_profile?.data?.data?.updateUser?.user?.id){
      if(isEditing){
        navigate("/onboarding/onboarding-form/information-summary/8");
        return
      }
     else{
      const countUpdate = await onboardingOnStepCountHandler(user_id,3);
      const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
      successfullMessageHandler(enqueueSnackbar,"Successfully updated. Continue to the next step!");
      navigate("/onboarding/onboarding-form/3");
      return
     }
    }
    if(response_profile?.data?.errors){
      errorMessageHandler(enqueueSnackbar,response_profile?.data?.errors?.[0]?.message)

    }
  }
  catch(e){
    setButtonClicked(false);
  }
}


useEffect(()=>{
  const stateApiCallingHandler = async(code)=>{
    const graphqlQuery = {
        query: `
            query {
              getStates(countryCode:"${code}") {
                code
                name
              }
            }
        `,
      };
            const res= await axios.post(config.API_LOGIN_URL,graphqlQuery,{
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
      return res
  }
  if(fields?.userCountry){
    async function stateApi(){
      const presentStateResponse = await stateApiCallingHandler(fields?.userCountry);
      setStateList(presentStateResponse?.data?.data?.getStates ? presentStateResponse?.data?.data?.getStates : [])
    }
    stateApi();
  }
  if(fields?.presentAddressCountry){
    async function stateApi(){
      const presentStateResponse = await stateApiCallingHandler(fields?.presentAddressCountry);
      setPresentStateList(presentStateResponse?.data?.data?.getStates ? presentStateResponse?.data?.data?.getStates : [])
    }
    stateApi();
  }
},[fields?.userCountry,fields?.presentAddressCountry,token]);


useEffect(() => {
  if(validationError?.emergencyContactRelationship || validationError?.disabilityType || validationError?.bloodGroup || validationError?.maritalStatus || validationError?.gender || validationError?.dateOfBirth || validationError?.marriageDate || 
     validationError?.fromYearArray?.length > 0 || validationError?.toYearArray?.length > 0 || validationError?.qualification?.length > 0) {
    const timer = setTimeout(() => {
      setValidationError(prev => ({...prev,emergencyContactRelationship:false,disabilityType:false, maritalStatus:false, gender:false, bloodGroup:false, dateOfBirth: false, marriageDate: false, qualification:[], toYearArray: [], fromYearArray: []}));
    }, 2500);
    return () => clearTimeout(timer);
  }
}, [validationError?.disabilityType, validationError?.bloodGroup, validationError?.maritalStatus, validationError?.gender, validationError?.dateOfBirth, validationError?.marriageDate, validationError?.emergencyContactRelationship,
    validationError?.fromYearArray?.length, validationError?.toYearArray?.length,validationError?.qualification?.length]);


    useEffect(() => {
      if (employee_data_redux?.id) {
        setFields({
          bloodGroup: employee_data_redux.bloodGroup || "",
          personalEmail: employee_data_redux.personalEmail || "",
          dateOfBirth: employee_data_redux.dateOfBirth || "",
          gender: employee_data_redux.gender || "",
          fatherName: employee_data_redux.fatherName || "",
          maritalStatus: employee_data_redux.maritalStatus || "",
          marriageDate: employee_data_redux.marriageDate || "",
          spouseName: employee_data_redux.spouseName || "",
          countryOfOrigin:employee_data_redux?.countryOfOrigin || "",
          userNationality: employee_data_redux.userNationality || "",
          isInternationalEmployee: employee_data_redux.isInternationalEmployee || false,
          isPhysicallyChallenged: employee_data_redux.isPhysicallyChallenged || false,
          disabilityType: employee_data_redux.disabilityType || "",
          address: employee_data_redux.address || "",
          addressStreet: employee_data_redux.addressStreet || "",
          addressArea: employee_data_redux.addressArea || "",
          addressCity: employee_data_redux.addressCity || "",
          userCountry: employee_data_redux.userCountry || "",
          userState: employee_data_redux.userState || "",
          addressPin: employee_data_redux.addressPin || "",
          addressPhone:employee_data_redux?.addressPhone || "",
          isSameAsPermanent: employee_data_redux.isSameAsPermanent || false,
          presentAddress: employee_data_redux.presentAddress || "",
          presentAddressStreet: employee_data_redux.presentAddressStreet || "",
          presentAddressArea: employee_data_redux.presentAddressArea || "",
          presentAddressCity: employee_data_redux.presentAddressCity || "",
          presentAddressCountry: employee_data_redux.presentAddressCountry || "",
          presentAddressState: employee_data_redux.presentAddressState || "",
          presentAddressPin: employee_data_redux.presentAddressPin || "",
          presentAddressPhone:employee_data_redux?.presentAddressPhone||"",
          emergencyContactName: employee_data_redux.emergencyContactName || "",
          emergencyContact: employee_data_redux.emergencyContact || "",
          emergencyContactRelationship: employee_data_redux.emergencyContactRelationship || "",
          qualification: employee_data_redux.qualification?.length > 0
            ? employee_data_redux?.qualification?.map((item,index)=>{
              return {...item,id:index+1}
            })
            : [{
                id: 1,
                degree: "",
                institute: "",
                from_year: "",
                to_year: ""
              }]
        });
      }
    }, [employee_data_redux]);
    

  return (
    <> 
      <form onSubmit={onSubmitHandler}>
        <div  className="  flex flex-col gap-6 ">
            <h1 className="text-xl font-semibold leading-6 text-[#26212E]">
              1. Personal Information
            </h1>
          <div className="flex flex-col gap-6">
            <h6 className="border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
              Personal Information
            </h6>
            <div className="grid grid-cols-3 gap-6">
              <div className=" relative w-full">
                <SelectBoxDropdownNonOutside
                  mainWrapperClass={`gap-1`}
                  labelClassName={` font-medium `}
                  labelName="Blood Group"
                  dropDownClassName = { `  max-h-[300px] mt-2 `}
                  dropDownHeight = {300}
                  options={optionData.bloodGroups}
                  current_value={fields?.bloodGroup}
                  current_id={fields?.bloodGroup ? fields?.bloodGroup : ""} 
                  onChangeHandler={(labelName,item)=>{setFields(prevFields => ({...prevFields,bloodGroup:item?.id}));}}  
                  wrapperClass= {` w-full h-10  `} 
                  bgClassName= {` bg-[#FFFFFF] `}  
                  searchPlaceholder={"Select blood group"}   
                  required={true}
                />  
                {validationError?.bloodGroup && <div className=" absolute flex justify-center  w-full ">
                                                <VaildationSelectionBox/>
                                              </div>}                                       

              </div>
                {/* <SelectHtml
                  id="bloodGroup"
                  name="bloodGroup"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  labelName={"Blood Group"}
                  placeholder={"Select blood group"}
                  optionData={optionData.bloodGroups}
                  value={fields?.bloodGroup}
                  onChange={onChangeHandler}
                  required
                /> */}
                <Input
                  id="personalEmail"
                  type="email"
                  name="personalEmail"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  labelName={"Personal Email"}
                  value={fields?.personalEmail}
                  placeholder={"Enter personal email"}
                  onChange={onChangeHandler}
                  required
                />
                <div className=' relative w-full  '>
                  <CustomDateInput
                    label="Date Of Birth"
                    inputWidth="100%"
                    inputHeight="40px"
                    labelWidth="120px"
                    value={fields?.dateOfBirth}
                    onChange={(e)=>{setFields({...fields,dateOfBirth:e.target.value})}}
                    required={true}
                    inputClass="!bg-[#FFFFFF] "
                    placeholder="YYYY/MM/DD"
                    wrapperClass="mt-1"
                  />               
                  { validationError?.dateOfBirth && <div className=" absolute flex justify-center  w-full ">
                                                <VaildationSelectionBox/>
                                              </div>}
                </div>
                <div className=" relative w-full">
                  <SelectBoxDropdownNonOutside
                    mainWrapperClass={`gap-1`}
                    labelName="Gender"
                    labelClassName={` font-medium `}
                    dropDownClassName = { `  max-h-[300px] mt-2 `}
                    dropDownHeight = {300}
                    options={[{id:"male",name:"Male"},{id:"female",name:"Female"},{id:"other",name:"Other"}]}
                    current_value={fields?.gender}
                    current_id={fields?.gender ? fields?.gender : ""} 
                    onChangeHandler={(labelName,item)=>{setFields(prevFields => ({...prevFields,gender:item?.id}));}}  
                    wrapperClass= {` w-full h-10  `} 
                    bgClassName= {` bg-[#FFFFFF] `}  
                    searchPlaceholder={"Select gender"}   
                    required={true}
                  />  
                  {validationError?.gender && <div className=" absolute flex justify-center  w-full ">
                                                <VaildationSelectionBox/>
                                              </div>}                                       
              </div>
                {/* <SelectHtml
                  id="type"
                  name="gender"
                  value={fields?.gender} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 !bg-[#FFFFFF] "
                  labelName={"Gender"}
                  optionData={[{id:"male",name:"Male"},{id:"female",name:"Female"},{id:"other",name:"Other"}]}
                  placeholder={"Select gender"} 
                  required                  
                  />  */}
                <Input
                  id="fatherName"
                  type="text"
                  name="fatherName"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  labelName={"Father Name"}
                  value={fields?.fatherName}
                  onChange={onChangeHandler}
                  placeholder={"Enter your father name"}
                  required
                />
                <div className=" relative w-full">
                  <SelectBoxDropdownNonOutside
                    mainWrapperClass={`gap-1`}
                    labelName="Marital Status"
                    labelClassName={` font-medium `}
                    dropDownClassName = { `  max-h-[300px] mt-2 `}
                    dropDownHeight = {300}
                    options={optionData.maritalStatus}
                    current_value={fields?.maritalStatus}
                    current_id={fields?.maritalStatus ? fields?.maritalStatus : ""} 
                    onChangeHandler={(labelName,item)=>{setFields({...fields,maritalStatus:item?.id,marriageDate:"",spouseName:""})}}  
                    wrapperClass= {` w-full h-10  `} 
                    bgClassName= {` bg-[#FFFFFF] `}  
                    searchPlaceholder={"Select marital status"}   
                    required={true}
                  />  
                  {validationError?.maritalStatus && <div className=" absolute flex justify-center  w-full ">
                                                <VaildationSelectionBox/>
                                              </div>}                                       
              </div>
                {/* <SelectHtml
                  id="maritalStatus"
                  name="maritalStatus"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  labelName={"Marital Status"}
                  placeholder={"Select marital status"}
                  optionData={optionData.maritalStatus}
                  value={fields?.maritalStatus}
                  onChange={(e)=>{
                    setFields({...fields,maritalStatus:e?.target?.value,marriageDate:"",spouseName:""})
                  }}
                  required
                /> */}
              {fields?.maritalStatus ===
                "Married" &&  <div className=' relative w-full  '>
                <CustomDateInput
                  label="Marriage Date"
                  inputWidth="100%"
                  inputHeight="40px"
                  labelWidth="120px"
                  value={fields?.marriageDate}
                  onChange={(e)=>{setFields({...fields,marriageDate:e.target.value})}}
                  required={true}
                  inputClass="!bg-[#FFFFFF] "
                  placeholder="YYYY/MM/DD"
                  wrapperClass="mt-1"
                />               
                { validationError?.marriageDate && <div className=" absolute flex justify-center  w-full ">
                                              <VaildationSelectionBox/>
                                            </div>}
              </div>}
              {fields?.maritalStatus ===
                "Married" && (
                <Input
                  id="spouseName"
                  type="text"
                  name="spouseName"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 !bg-white"
                  labelName={"Spouse Name"}
                  value={fields?.spouseName}
                  placeholder={"Enter your spouse name"}
                  onChange={onChangeHandler}
                  required
                />
                )}
                <SelectHtml
                  id="countryOfOrigin"
                  name="countryOfOrigin"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  labelName={"Country Of Origin"}
                  placeholder={"Select country"}
                  optionData={countryOptions}
                  value={fields?.countryOfOrigin}
                  onChange={onChangeHandler}
                  required
                />
                <SelectHtml
                  id="userNationality"
                  name="userNationality"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  labelName={"Nationality"}
                  placeholder={"Select nationality"}
                  optionData={countryOptions}
                  value={fields?.userNationality}
                  onChange={onChangeHandler}
                  required
                />
                <div className=" relative w-full">
                  <SelectBoxDropdownNonOutside
                    mainWrapperClass={`gap-1`}
                    labelName="International Employee"
                    labelClassName={` font-medium `}
                    dropDownClassName = { `  max-h-[300px] mt-2 `}
                    dropDownHeight = {300}
                    options={optionData.internationEmployee}
                    current_value={( fields?.isInternationalEmployee) ? "Yes" : "No"}
                    current_id={ fields?.isInternationalEmployee} 
                    onChangeHandler={(labelName,item)=>{setFields({...fields,isInternationalEmployee:item?.id ? true : false})}}  
                    wrapperClass= {` w-full h-10  `} 
                    bgClassName= {` bg-[#FFFFFF] `}  
                    searchPlaceholder={"Select international employee"}   
                    // required={true}
                  />  
                  {/* {validationError?.isInternationalEmployee && <div className=" absolute flex justify-center  w-full ">
                                                <VaildationSelectionBox/>
                                              </div>}                                        */}
                </div>
                {/* <SelectHtml
                  id="isInternationalEmployee"
                  name="isInternationalEmployee"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  labelName={"International Employee"}
                  placeholder={"Select international employee"}
                  optionData={optionData.internationEmployee}
                  value={fields?.isInternationalEmployee ? true : false}
                  onChange={(e)=>{setFields({...fields,isInternationalEmployee:e.target.value ==="true" ? true : false})}}
                  required
                /> */}
                {console.log("isPhysicallyChallenged",fields?.isPhysicallyChallenged)}
                <div className=" relative w-full">
                  <SelectBoxDropdownNonOutside
                    mainWrapperClass={`gap-1`}
                    labelName="Physically Challenged"
                    labelClassName={` font-medium `}
                    dropDownClassName = { `  max-h-[300px] mt-2 `}
                    dropDownHeight = {300}
                    options={optionData.internationEmployee}
                    current_value={  fields?.isPhysicallyChallenged ? "Yes" : "No" }
                    current_id={ fields?.isPhysicallyChallenged ? true : false } 
                    onChangeHandler={(labelName,item)=>{setFields({...fields,isPhysicallyChallenged:item?.id,disabilityType:""})}}  
                    wrapperClass= {` w-full h-10  `} 
                    bgClassName= {` bg-[#FFFFFF] `}  
                    searchPlaceholder={"Select"}   
                  /> 
                </div>
                {/* <SelectHtml
                  id="isPhysicallyChallenged"
                  name="isPhysicallyChallenged"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  labelName={"Physically Challenged"}
                  placeholder={"Select"}
                  optionData={optionData.internationEmployee}
                  value={fields?.isPhysicallyChallenged ? true : false}
                  onChange={(e)=>{setFields({...fields,isPhysicallyChallenged:e.target.value ==="true" ? true : false})}}
                  required
                /> */}
              {/* {fields?.isPhysicallyChallenged && (
                <SelectHtml
                  id="disabilityType"
                  name="disabilityType"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  labelName={"Disability Type"}
                  placeholder={"Select disability type"}
                  optionData={optionData.disabilityTypeOptions}
                  value={fields?.disableType}
                  onChange={onChangeHandler}
                  required
                />
              )} */}

              {fields?.isPhysicallyChallenged &&<div className=" relative w-full">
                  <SelectBoxDropdownNonOutside
                    mainWrapperClass={`gap-1`}
                    labelName="Disability Type"
                    labelClassName={` font-medium `}
                    dropDownClassName = { `  max-h-[300px] mt-2 `}
                    dropDownHeight = {300}
                    options={optionData.disabilityTypeOptions}
                    current_value={fields?.disabilityType}
                    current_id={fields?.disabilityType ?  fields?.disabilityType : ""} 
                    onChangeHandler={(labelName,item)=>{setFields({...fields,disabilityType:item?.id})}}  
                    wrapperClass= {` w-full h-10  `} 
                    bgClassName= {` bg-[#FFFFFF] `}  
                    searchPlaceholder={"Select disability type"}   
                    required={true}
                  />  
                  {validationError?.disabilityType && <div className=" absolute flex justify-center  w-full ">
                                                <VaildationSelectionBox/>
                                              </div>}                                       
                </div>}
          </div>
          </div>
          <div className="flex flex-col gap-6 ">
            <h1 className="text-xl font-semibold leading-6 text-[#26212E]">
              2. Address
            </h1>
            <h6 className="border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
              Permanent Address
            </h6>
            <div className="grid grid-cols-3 items-end gap-6">
                <Input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 !bg-white"
                  labelName={"Address"}
                  value={fields?.address}
                  placeholder={"Enter address"}
                  onChange={onChangeHandler}
                  required
                />
                <Input
                  id="addressStreet"
                  type="text"
                  name="addressStreet"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  placeholder="Street"
                  value={fields?.addressStreet}
                  onChange={onChangeHandler}
                />
                <Input
                  id="addressArea"
                  type="text"
                  name="addressArea"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  placeholder="Area"
                  value={fields?.addressArea}
                  onChange={onChangeHandler}
                />
                <Input
                  id="addressCity"
                  type="text"
                  name="addressCity"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  labelName={"City"}
                  value={fields?.addressCity}
                  onChange={onChangeHandler}
                  placeholder={"Enter the city name"}
                  required
                />
                <SelectHtml
                  id="userCountry"
                  name="userCountry"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  labelName={"Country"}
                  placeholder={"Select country"}
                  optionData={countryOptions}
                  value={fields?.userCountry}
                  onChange={onChangeHandler}
                  required
                />
                <SelectHtml
                  id="userState"
                  name="userState"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  labelName={"State"}
                  placeholder={"Select state"}
                  optionData={stateList}
                  value={fields?.userState}
                  onChange={onChangeHandler}
                  required
                />
                <Input
                  id="addressPin"
                  type="text"
                  name="addressPin"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  labelName={"Pin"}
                  maxLength={6}
                  value={fields?.addressPin}
                  onChange={onChangeHandler}
                  placeholder={"Enter pincode"}
                  required
                />
                <Input
                id="addressPhone"
                type="phone"
                name="addressPhone"
                maxLength={10}
                minLength={10}
                autoComplete="autoComplete"
                placeholder="Enter phone number"
                classInput=" w-full h-10 !bg-white"
                labelName={"Phone"}
                value={fields.addressPhone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setFields((prev) => ({
                      ...prev,
                      addressPhone: value,
                    }));
                  }
                }}
                required={"required"}
              />
                                    
            </div>
          </div>
          <div className="flex flex-col gap-6 ">
            <h6 className="border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
              Present Address
            </h6>
            <label className={` cursor-pointer flex items-center space-x-2 pb-2 custom-table`}>
                  <input
                          type="checkbox"                                         
                          className="min-w-5 min-h-5"
                          checked={fields?.isSameAsPermanent}
                          onChange={setpermanentDataHandelr}
                        />         
                <p className="whitespace-nowrap text-sm font-normal text-[#26212E] ">
                          {"Same as Permanent"}
                        </p>         
            </label>
            <div className="grid grid-cols-3 items-end gap-6">
                <Input
                  id="presentAddress"
                  name="presentAddress"
                  type="text"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 !bg-white"
                  labelName={"Address"}
                  disabled={fields?.isSameAsPermanent}
                  value={fields.isSameAsPermanent ? fields?.address : fields.presentAddress }
                  onChange={onChangeHandler}
                  placeholder={"Enter the address"}
                  required
                />
                <Input
                  id="presentAddressStreet"
                  type="text"
                  name="presentAddressStreet"
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 bg-white"
                  placeholder="Street"
                  // labelName={'Street'}
                  disabled={fields?.isSameAsPermanent}
                  value={fields.isSameAsPermanent ? fields?.addressStreet : fields.presentAddressStreet }
                  onChange={onChangeHandler}
                /> 
              <Input
                id="presentAddressArea"
                type="text"
                name="presentAddressArea"
                autoComplete="autoComplete"
                classInput=" w-full h-10 bg-white"
                placeholder="Area"
                disabled={fields?.isSameAsPermanent}
                value={fields.isSameAsPermanent ? fields?.addressArea : fields.presentAddressArea }
                onChange={onChangeHandler}
              />
              <Input
                id="presentAddressCity"
                type="text"
                name="presentAddressCity"
                autoComplete="autoComplete"
                classInput=" w-full h-10 bg-white"
                labelName="City"
                placeholder={"Enter the city name"}
                disabled={fields?.isSameAsPermanent}
                  value={fields.isSameAsPermanent ? fields?.addressCity : fields.presentAddressCity }
                onChange={onChangeHandler}
                required
              />
              <SelectHtml
                id="presentAddressCountry"
                name="presentAddressCountry"
                autoComplete="autoComplete"
                classInput=" w-full h-10 bg-white"
                labelName={"Country"}
                placeholder={"Select country"}
                optionData={countryOptions}
                disabled={fields?.isSameAsPermanent}
                value={fields.isSameAsPermanent ? fields?.userCountry : fields.presentAddressCountry }
                onChange={onChangeHandler}
                required
              />
              <SelectHtml
                id="presentAddressState"
                name="presentAddressState"
                autoComplete="autoComplete"
                classInput=" w-full h-10 bg-white"
                labelName={"State"}
                placeholder={"Select state"}
                optionData={presentStateList}
                disabled={fields?.isSameAsPermanent}
                value={fields.isSameAsPermanent ? fields?.userState : fields.presentAddressState }
                onChange={onChangeHandler}
                required
              />
              <Input
                id="presentAddressPin"
                type="text"
                name="presentAddressPin"
                autoComplete="autoComplete"
                classInput=" w-full h-10 bg-white"
                labelName={"Pin"}
                maxLength={6}
                disabled={fields?.isSameAsPermanent}
                  value={fields.isSameAsPermanent ? fields?.addressPin : fields.presentAddressPin }
                onChange={onChangeHandler}
                required
                placeholder="Enter pincode"
              />
              <Input
                id="phone"
                type="phone"
                name="phone"
                maxLength={10}
                minLength={10}
                autoComplete="autoComplete"
                placeholder="Enter phone number"
                classInput=" w-full h-10 !bg-white"
                labelName={"Phone"}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setFields((prev) => ({
                      ...prev,
                      presentAddressPhone: value,
                    }));
                  }
                }}
                disabled={fields?.isSameAsPermanent}
                value={fields.isSameAsPermanent ? fields?.addressPhone : fields.presentAddressPhone }
                required={"required"}
              />
            </div>
            <h6 className="border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
              Emergency Contact/Address
            </h6>
            <div className="grid grid-cols-3 gap-6 ">
              <Input
                id="emergencyContactName"
                name="emergencyContactName"
                type="text"
                autoComplete="autoComplete"
                classInput=" w-full h-10 bg-white"
                labelName={"Name"}
                value={fields?.emergencyContactName}
                onChange={(e) => {
                  const { name, value } = e.target;
                  
                  // Allow only letters and spaces
                  const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
                
                  setFields((prev) => ({
                    ...prev,
                    [name]: filteredValue,
                  }));
                }
                }
                required
                placeholder={"Enter name"}
              />
              <Input
                id="emergencyContact"
                name="emergencyContact"
                type="text"
                autoComplete="autoComplete"
                classInput=" w-full h-10 bg-white"
                labelName={"Mobile"}
                maxLength={10}
                value={fields?.emergencyContact}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setFields((prev) => ({
                      ...prev,
                      emergencyContact: value,
                    }));
                  }
                }}
                placeholder={"Enter mobile number"}
                required
              />
              <div className=" relative w-full">
                <SelectBoxDropdownNonOutside
                  mainWrapperClass={`gap-1`}
                  labelClassName={` font-medium `}
                  labelName="Relationship"
                  dropDownClassName = { `  max-h-[300px] mt-2 `}
                  dropDownHeight = {300}
                  options={optionData.relationshipOptions}
                  current_value={fields?.emergencyContactRelationship}
                  current_id={fields?.emergencyContactRelationship ? fields?.emergencyContactRelationship : ""} 
                  onChangeHandler={(labelName,item)=>{setFields(prevFields => ({...prevFields,emergencyContactRelationship:item?.id}));}}  
                  wrapperClass= {` w-full h-10  `} 
                  bgClassName= {` bg-[#FFFFFF] `}  
                  searchPlaceholder={"Select relationship"}   
                  required={true}
                />  
                {validationError?.emergencyContactRelationship && <div className=" absolute flex justify-center  w-full ">
                                                <VaildationSelectionBox/>
                                              </div>}                                       

              </div>
              {/* <SelectHtml
                id="emergencyContactRelationship"
                name="emergencyContactRelationship"
                autoComplete="autoComplete"
                classInput=" w-full h-10 bg-white"
                labelName={"Relationship"}
                placeholder={"Select relationship"}
                optionData={optionData.relationshipOptions}
                value={fields?.emergencyContactRelationship}
                onChange={onChangeHandler}
                required
              /> */}
          </div>
          </div>
          <div className="flex flex-col gap-6">
          <h1 className="text-xl font-semibold leading-6 text-[#26212E]">
            3. Qualifications
          </h1>
          {
            fields?.qualification?.map((item,index)=>{
                        return <>
                               <div className={` relative flex flex-col gap-2  w-full `}>
                                  <div className =" flex justify-between">
                                    <div className="text-base  font-medium leading-[100%] tracking-[0%] text-[#26212E] ">Education {index+1}</div>
                                      <img
                                          src={
                                            config.PUBLIC_URL +
                                            "/assets/images/amdital/onboarding/close_icon.svg"
                                          }
                                          alt=""
                                          className={` w-fit h-fit  cursor-pointer  ${index===0 ?`hidden`:`block`}`}
                                          onClick={()=>{removeItem(item?.id)}}
                                        />
                                </div>
                                  <hr className=' w-full '/>                                                          
                                </div>
                              <div className=' relative w-full grid  grid-cols-3 min-[1400px]:grid-cols-3 gap-x-8 gap-y-6 '>

                                <div className=" relative w-full">
                                  <SelectBoxDropdownNonOutside
                                    mainWrapperClass={`gap-1`}
                                    labelClassName={` font-medium `}
                                    labelName="Qualification"
                                    dropDownClassName = { `  max-h-[300px] mt-2 `}
                                    dropDownHeight = {300}
                                    options={ [
                                      { id: "High School", name: "High School" },
                                      { id: "Diploma", name: "Diploma" },
                                      { id: "Bachelor's Degree", name: "Bachelor's Degree" },
                                      { id: "Master's Degree", name: "Master's Degree" },
                                      { id: "PhD", name: "PhD" },
                                      { id: "Other", name: "Other" },
                                    ]}
                                    current_value={item?.degree}
                                    current_id={item?.degree ? item?.degree : ""} 
                                    onChangeHandler={(labelName,degree)=>{onChangeHandlerQualification(item?.id,"degree",degree?.name)}}  
                                    wrapperClass= {` w-full h-10  `} 
                                    bgClassName= {` bg-[#FFFFFF] `}  
                                    searchPlaceholder={"Select qualification"}   
                                    required={true}
                                  />  
                                 { validationError?.qualification?.length > 0 && validationError?.qualification?.includes(item?.id) && (
                                      <div className="absolute flex justify-center w-full">
                                              <VaildationSelectionBox />
                                      </div>
                                )}                                       

                                </div>
                                {/* <SelectHtml
                                    id="degree"
                                    name="degree"
                                    value={item?.degree} 
                                    onChange={(e)=>{onChangeHandlerQualification(e,item?.id,"degree")}}
                                    autoComplete="autoComplete"
                                    classInput=" w-full h-10 !bg-[#FFFFFF] "
                                    labelName={"Qualification"}
                                    optionData={ [
                                      { id: "High School", name: "High School" },
                                      { id: "Diploma", name: "Diploma" },
                                      { id: "Bachelor's Degree", name: "Bachelor's Degree" },
                                      { id: "Master's Degree", name: "Master's Degree" },
                                      { id: "PhD", name: "PhD" },
                                      { id: "Other", name: "Other" },
                                    ]}
                                    required
                                    placeholder={"Select qualification"}
                                  />   */}
                                 
                                  <div className=' relative w-full  '>
                                    <CustomDateInput
                                          label=" From Year"
                                          inputWidth="100%"
                                          inputHeight="40px"
                                          labelWidth="120px"
                                          value={item?.from_year ? item?.from_year : item?.from_year}
                                          onChange={(e)=>{onChangeHandlerQualification(item?.id,"from_year",e.target?.value)}}
                                          required={true}
                                          placeholder="YYYY/MM/DD"
                                          wrapperClass="mt-1"
                                          inputClass="!bg-[#FFFFFF] "

                                        /> 
                                { validationError?.fromYearArray?.length > 0 && validationError?.fromYearArray?.includes(item?.id) && (
                                      <div className="absolute flex justify-center w-full">
                                              <VaildationSelectionBox />
                                      </div>
                                )}
                          </div>
                          <div className=' relative w-full  '>
                            <CustomDateInput
                                  label="To Year"
                                  inputWidth="100%"
                                  inputHeight="40px"
                                  labelWidth="120px"
                                  value={item?.from_year ? item?.to_year : item?.from_year}
                                  onChange={(e)=>{onChangeHandlerQualification(item?.id,"to_year",e.target?.value)}}
                                  required={true}
                                   wrapperClass="mt-1"
                                  placeholder="YYYY/MM/DD"
                                  inputClass="!bg-[#FFFFFF] "
                                /> 
                        { validationError?.toYearArray?.length > 0 && validationError?.toYearArray?.includes(item?.id) && (
                                  <div className="absolute flex justify-center w-full">
                                      <VaildationSelectionBox />
                                  </div>
                        )}
                        
                          </div>  
                          <Input
                                  id="institute" 
                                  type="text" 
                                  name="institute"
                                  value={item?.institute} 
                                  onChange={(e)=>{onChangeHandlerQualification(item?.id,"institute",e.target?.value)}}
                                  autoComplete="autoComplete"
                                  placeholder="Enter institute"
                                  classInput=" w-full h-10  !bg-[#FFFFFF] "
                                  labelName={"Institute"}
                                  required={"required"}
                                />                                             

                              </div>
                        </>
                      })
                    }
          <button
              type="button"
               onClick={()=>{addEducation(fields?.qualification?.length)}}
              className="mx-auto flex w-fit items-center gap-2 text-base font-bold leading-5 text-[#806BFF]"
            >
              <div className="flex size-[18px] items-center justify-center rounded-full border-[1.5px] border-[#806BFF] text-sm font-semibold leading-[18px] text-[#806BFF]">
                +{" "}
              </div>
              Add Another Education
            </button>
          </div>
        </div>
        <div  className=" mt-[64px] flex justify-center ">
                       
                             <ButtonNew
                               type="submit"
                               buttonName= "Save and Next"
                               buttonClassName = {` ${ buttonClicked ? ` bg-[#F36A3D]  w-[170px] ` : ` w-[149px]  bg-[#FF845C] hover:bg-[#F36A3D] `} h-10  outline-none text-base leading-3 font-semibold text-[#FFFFFF]  `}
                               spanClassName = " border-[#FFFFFF] "
                               isLoading= {buttonClicked}
                             />
        </div>
        

      </form>
     
    </>
  );
};

export default PersonalInformation;

















 {/* <div className="mt-5 flex items-center justify-center gap-4">
          {isEditing ? (
            ""
          ) : (
           parseInt(activeStep) !== 2 && <button
              onClick={handlePrev}
              disabled={parseInt(activeStep)  === 2}
              className="rounded border-2 border-[#FF845C] px-6 py-3 text-sm font-semibold leading-4 tracking-wider text-[#FF845C] hover:bg-[#FFF2ED] disabled:opacity-50"
            >
              Back
            </button>
          )}

          {activeStep === 7 ? (
            <button
              onClick={handleNext}
              // to={'/onboarding/onboarding-form/information-summary'}
              className="bg-[border-2 rounded border-2 border-[#FF845C] bg-[#FF845C] px-6 py-3 text-sm font-semibold leading-4 tracking-wider text-white hover:bg-[#F36A3D] disabled:opacity-50"
            >
              Save and Next
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-[border-2 rounded border-2 border-[#FF845C] bg-[#FF845C] px-6 py-3 text-sm font-semibold leading-4 tracking-wider text-white hover:bg-[#F36A3D] disabled:opacity-50"
            >
              Save and Next
            </button>
          )}
        </div> */}