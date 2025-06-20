import React, { useEffect, useState } from "react";
import Input from "../../projects_new/Reusable/Input";
import InputDate from "../../projects_new/Reusable/InputDate";
import SelectHtml from "../../../components/elements/amdital/SelectHtml";
import ButtonNew from "../../../components/elements/amdital/ButtonNew";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import EmployeeDropDownNew from "../emplyee/EmployeeDropDownNew";
import VaildationSelectionBox from "../../../components/elements/amdital/VaildationSelectionBox";
import { errorMessageHandler } from "../../../components/elements/amdital/toastyMessage";
import { sendInvitationHandler } from "./OnboardingNewApi";
import SelectBoxDropdownNonOutside from "../emplyee/SelectBoxDropdownNonOutside";
import CustomDateInput from "../../../components/elements/amdital/CustomDate/CustomDateInput";

const SendInvitation = ({onClose,fetchHandler}) => {
  const settings_data = useSelector((store) => store?.general?.settingDropDown);
  const redux_setting_data = useSelector((state) => state?.settings);
  const setting_data = redux_setting_data?.setting_general; 


  const [buttonClicked, setButtonClicked] = useState(false);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    employeeId: "",
    dateOfJoining: "",
    reportingManager: "",
    userDesignation:"",
    userRole:"employee",
    companyId:setting_data?.id || ""
  });

  const designation_options = settings_data?.jobDesignations ? settings_data?.jobDesignations?.nodes?.map((item)=>{
    return {id:item?.name,name:item?.name}
  }):[];

  const [reportValidation,setReportValidation] = useState({department:false,dateOfJoining:false,userDesignation:false,userRole:false})

  
  const { enqueueSnackbar } = useSnackbar();

  const department_options = settings_data?.projectDepartments ? settings_data?.projectDepartments?.nodes?.map((item)=>{
    return {id:item?.name,name:item?.name}
  }):[];

  const submitHandler = async (e) => {
    e.preventDefault();

   
       if(fields?.dateOfJoining === ""){
        setReportValidation((prev)=>({...prev,dateOfJoining:true}))
        return ;
      }
       if(fields?.department === ""){
        setReportValidation((prev)=>({...prev,department:true}))
        return ;
      }
       if(fields?.userDesignation === ""){
        setReportValidation((prev)=>({...prev,userDesignation:true}))
        return ;
      }
        if(fields?.userRole === ""){
        setReportValidation((prev)=>({...prev,userRole:true}))
        return ;
      }
    setButtonClicked(true);
      if(fields?.companyId === ""){
        errorMessageHandler(enqueueSnackbar,"Please create a company account before adding a member to the Amdital website.")
      }
      else{
        const response = await sendInvitationHandler(fields, enqueueSnackbar);
          if(response?.data?.data?.registerUser){
            const employeeData = await fetchHandler();
            setButtonClicked(false);
            onClose();
          }
          else{
            setButtonClicked(false);
          }

      }
    setButtonClicked(false);
  };
  const managerHandler = (item) => {
    setFields({ ...fields, reportingManager: item?.userId });
  };
  // useEffect(()=>{
  //   if(reportValidation){
  //     setTimeout(()=>{
  //       setReportValidation(false)
  //     },700)
  //   }
  // },[reportValidation])
  return (
    <>
      <div className=" flex w-full  items-start justify-center  ">
        <div className=" w-full  min-h-screen border border-[#E1DCFF] bg-white">
          <div className="flex flex-col gap-8 p-7">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-center text-[24px] font-bold leading-[100%] text-[#26212E]">
                  Send Invitations For Onboarding New Employee
                </h1>
                <h6 className="text-center text-base font-normal leading-[100%] text-[#26212E]">
                  Please fill the below information to send invitation
                </h6>
              </div>
              <form onSubmit={submitHandler}>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Input
                    id="firstName"
                    type="text"
                    name="firstName"
                    autoComplete="autoComplete"
                    placeholder="Enter First Name"
                    classInput=" w-full h-10 bg-white"
                    labelName={"First Name"}
                    value={fields.firstName}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[A-Za-z\s]*$/.test(value)) {
                        setFields((prev) => ({
                          ...prev,
                          firstName: value,
                        }));
                      }
                    }}
                    required={"required"}
                  />
                  <Input
                    id="lastName"
                    type="text"
                    name="Enter Last Name"
                    autoComplete="autoComplete"
                    placeholder="Enter Last Name"
                    classInput=" w-full h-10 bg-white"
                    labelName={"Last Name"}
                    value={fields.lastName}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[A-Za-z\s]*$/.test(value)) {
                        setFields((prev) => ({
                          ...prev,
                          lastName: value,
                        }));
                      }
                    }}
                    required={"required"}
                  />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="autoComplete"
                    placeholder="Enter Email"
                    classInput=" w-full h-10 !bg-white"
                    labelName={"Email"}
                    value={fields.email}
                    onChange={(e) => {
                      setFields((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                    required={"required"}
                  />
                  <div className=' relative w-full  '>
                            <CustomDateInput
                                  label="Date of Joining"
                                  inputWidth="100%"
                                  inputHeight="40px"
                                  labelWidth="120px"
                                  value={fields.dateOfJoining}
                                   onChange={(e) => {
                                          setFields((prev) => ({
                                            ...prev,
                                            dateOfJoining: e.target.value,
                                          }));
                                          setReportValidation((prev)=>({...prev,dateOfJoining:false}))

                                        }}
                                  required={true}
                                  placeholder="YYYY/MM/DD"
                                  inputClass="w-full h-10 !bg-white"
                                /> 
                        { reportValidation?.dateOfJoining &&
                                  <div className="absolute flex justify-center w-full">
                                      <VaildationSelectionBox />
                                  </div>
                        }
                </div>
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
                    value={fields.phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setFields((prev) => ({
                          ...prev,
                          phone: value,
                        }));
                      }
                    }}
                    required={"required"}
                  />
                  {/* <InputDate
                    id="date_of_birth"
                    type="date"
                    name="date_of_birth"
                    autoComplete="bday"
                    placeholder="Enter date of birth"
                    classInput="w-full h-10 !bg-white"
                    labelName="Date of Birth"
                    max={new Date().toISOString().split("T")[0]}
                    value={fields.dateOfBirth}
                    onChange={(e) => {
                      setFields((prev) => ({
                        ...prev,
                        dateOfBirth: e.target.value,
                      }));
                    }}
                  /> */}
                  <Input
                    id="employeeId"
                    type="text"
                    name="employeeId"
                    autoComplete="autoComplete"
                    classInput=" w-full h-10 !bg-white"
                    labelName={"Employee ID"}
                    value={fields.employeeId}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFields((prev) => ({
                        ...prev,
                        employeeId: value,
                      }));
                    }}
                    required={"required"}
                     placeholder="employee ID"
                  />
                  {/* <SelectHtml
                    id="department"
                    name="department"
                    autoComplete="autoComplete"
                    classInput=" w-full h-10 bg-white"
                    labelName={"Department"}
                    placeholder={"Select"}
                    value={fields.department}
                    optionData={department_options}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFields((prev) => ({
                        ...prev,
                        department: value,
                      }));
                    }}
                    required={"required"}
                  /> */}
                  <div className=" relative">
                      <SelectBoxDropdownNonOutside
                        mainWrapperClass={`gap-1`}
                        labelClassName={` font-medium`}
                        labelName="Department"
                        dropDownClassName = { `  max-h-[300px] mt-2 `}
                        dropDownHeight = {300}
                        options={department_options}
                        onChangeHandler={(labelName,item)=>{setFields({...fields,department:item?.id});setReportValidation((prev)=>({...prev,department:false}))}}  
                        wrapperClass= {` w-full h-10   `} 
                        bgClassName= {` bg-[#FFFFFF] `}  
                        searchPlaceholder={"Search department"}
                        required
                      /> 
                      { reportValidation?.department && <div className=" absolute flex justify-center  w-full ">
                      <VaildationSelectionBox/>
                    </div>}
                  </div>              
                  {/* <InputDate
                    id="date_of_joining"
                    type="date"
                    name="date_of_joining"
                    autoComplete="autoComplete"
                    placeholder="Enter date of joining"
                    classInput=" w-full h-10 !bg-white"
                    labelName={"Date of Joining"}
                    // min={new Date().toISOString().split("T")[0]}
                    value={fields.dateOfJoining}
                    onChange={(e) => {
                      setFields((prev) => ({
                        ...prev,
                        dateOfJoining: e.target.value,
                      }));
                    }}
                    required={"required"}
                  /> */}
                
                <div className=" relative">
                  <EmployeeDropDownNew
                    labelName={"Reporting Manager"}
                    managerHandler={managerHandler}
                    wrapperClass={"bg-white gap-2"}
                    currentValueData={{
                      id: fields?.managerDate?.id,
                      name: fields?.managerDate?.name,
                      profileImage: fields?.managerDate?.profile_image,
                      userDesignation:fields?.managerDate?.userDesignation
                    }}
                    required={false}
                  />
                  {/* { reportValidation && <div className=" absolute flex justify-center  w-full ">
                    <VaildationSelectionBox/>
                  </div>} */}
                </div>
                {/* <SelectHtml
                  id="designation"
                  name="userDesignation"
                  value={fields?.userDesignation} 
                  onChange={(e) => {
                    setFields((prev) => ({
                      ...prev,
                      userDesignation: e.target.value,
                    }));
                  }}
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 !bg-white "
                  labelName={"Designation"}
                  optionData={designation_options}
                  required
                  placeholder={"Select designation"}
                /> */}

                 <div className=" relative">
                      <SelectBoxDropdownNonOutside
                        mainWrapperClass={`gap-1`}
                        labelClassName={` font-medium`}
                        labelName="Designation"
                        dropDownClassName = { `  max-h-[300px] mt-2 `}
                        dropDownHeight = {300}
                        options={designation_options}
                        onChangeHandler={(labelName,item)=>{setFields({...fields,userDesignation:item?.id});setReportValidation((prev)=>({...prev,userDesignation:false}))}}  
                        wrapperClass= {` w-full h-10   `} 
                        bgClassName= {` bg-[#FFFFFF] `}  
                        searchPlaceholder={"Search designation"}   
                        required
                      /> 
                      { reportValidation?.userDesignation && <div className=" absolute flex justify-center  w-full ">
                      <VaildationSelectionBox/>
                    </div>}
                  </div>  
                {/* <SelectHtml
                  
                  id="type"
                  name="userRole"
                  value={fields?.userRole} 
                  onChange={(e) => {
                    setFields((prev) => ({
                      ...prev,
                      userRole: e.target.value,
                    }));
                  }}
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 !bg-white "
                  labelName={"User Role"}
                  optionData={[{id:"employee",name:"Employee"},{id:"admin",name:"Admin"},{id:"manager",name:"Manager"}]}
                  placeholder={"Select user role"}
                  required
                /> */}
                 <div className=" relative">
                      <SelectBoxDropdownNonOutside
                        mainWrapperClass={`gap-1`}
                        labelClassName={` font-medium`}
                        labelName="User Role"
                        dropDownClassName = { `  max-h-[300px] mt-2 `}
                        dropDownHeight = {300}
                        options={[{id:"employee",name:"Employee"},{id:"admin",name:"Admin"},{id:"manager",name:"Manager"}]}
                        onChangeHandler={(labelName,item)=>{setFields({...fields,userRole:item?.id});setReportValidation((prev)=>({...prev,userRole:false}))}}  
                        wrapperClass= {` w-full h-10   `} 
                        bgClassName= {` bg-[#FFFFFF] `}  
                        searchPlaceholder={"Search user role"}   
                        current_value={fields?.userRole}
                        current_id={fields?.userRole ? fields?.userRole?.toLowerCase() : ""}
                        required
                      /> 
                      { reportValidation?.userRole && <div className=" absolute flex justify-center  w-full ">
                      <VaildationSelectionBox/>
                    </div>}
                  </div>  
                                                
                </div>
                <div className="mt-8 flex justify-end  gap-4">
                  <ButtonNew
                    type="submit"
                    buttonName="Send Invitation"
                    
                    buttonClassName={` ${
                      buttonClicked
                        ? `  bg-[#F36A3D] w-[165px] `
                        : ` bg-[#FF845C] hover:bg-[#F36A3D] w-[155px] `
                    } h-11  outline-none text-sm leading-4 tracking-wider font-semibold text-[#FFFFFF]  `}
                    spanClassName=" border-[#FFFFFF] "
                    isLoading={buttonClicked}
                  />
                  <ButtonNew
                    type="button"
                    buttonName="Cancel"
                    buttonClassName={` w-[100px] hover:bg-[#FFF2ED] border-[#FF845C] border w-[155px] h-11  text-sm leading-[100%] font-semibold text-[#FF845C]  `}
                    spanClassName=" border-[#FFFFFF] "
                    onClick={onClose}

                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default SendInvitation;
