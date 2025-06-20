import React, { useEffect, useState } from 'react'
import config from '../../../../config/config'
import Input from '../../../../components/elements/amdital/Input';
import ButtonNew from '../../../../components/elements/amdital/ButtonNew';
import SelectHtml from '../../../../components/elements/amdital/SelectHtml';
import { useSelector } from 'react-redux';
import CustomDateSelector from '../../../../components/elements/amdital/CustomDate/CustomDateInput';
import EmployeeDropDownNew from '../EmployeeDropDownNew';
import Cookies from 'js-cookie';
import { attachProfile } from '../../../profile/uploadImage';
import { getUserData, } from '../employeeData';
import { useNavigate } from 'react-router-dom';
import { getSingalEmployeeData, updateProfileInformation } from './employeeFunction';
import VaildationSelectionBox from '../../../../components/elements/amdital/VaildationSelectionBox';
import { useSnackbar } from 'notistack';
import CustomDateInput from '../../../../components/elements/amdital/CustomDate/CustomDateInput';
import SelectCustomHtml from '../../../../components/elements/amdital/SelectCustomHtml';

export default function ProfileInformation({employee_data,attachments_data,params_id, editComponent}) {

  
      const employee_redux_data = useSelector(store=>store?.employee);
  
      const list_user_id = employee_redux_data?.employee_single_view?.userId

    const data = Cookies.get('token');
      const { enqueueSnackbar } = useSnackbar();
     const navigate = useNavigate();
    const user_details = data ?  JSON?.parse(data) : "";
    const token = user_details?.authToken;
    const userId = user_details?.user?.userId;
    const user_role = user_details?.user?.userRole;

    const [editView,setEditView] = useState(false);

    const [buttonClicked,setButtonClicked]= useState(false);

    const settings_data  = useSelector(store => store?.general?.settingDropDown);

    const [fields,setFields] = useState({
      firstName:employee_data?.firstName || "",
      lastName:employee_data?.lastName || "",
      memberID:employee_data?.memberID || "",
      email:employee_data?.email       || "",
      phone:employee_data?.phone || "",
      userDesignation:employee_data?.userDesignation || "",
      employmentType:employee_data?.employmentType || "",
      department:employee_data?.department || "",
      userRole:employee_data?.userRole || "",
      managerID:employee_data?.manager?.id || "",
      dateOfBirth:employee_data?.dateOfBirth || "",
      profileImage:employee_data?.profileImage || "",
      manager_details:employee_data?.manager || "",
      // slackUserId:employee_data?.slackUserId || "",
      location:"Pune, Maharashtra"
    });
    const [validationError,setValidationError] = useState({reportValidation:false,dateOfBirthValidation:false})

    const onChangeHandler =(e)=>{
      const {name, value} = e.target;
      setFields({...fields,[name]:value});
    }
    const onChangeManageHandler =(manager)=>{
      setFields({...fields,managerID:manager?.userId});
    }
    const onChangeDateHandler =(date)=>{
      setFields({...fields,dateOfBirth:date?.target?.value});
    }
    const onSubmitHandler =async (e)=>{
      e.preventDefault();
      setButtonClicked(true)
      // if(fields?.managerID === ""){
      //   setValidationError({...validationError,reportValidation:true});
      //   setButtonClicked(false);
      //   return false;
      // }
      if(fields?.dateOfBirth === ""){
        setValidationError({...validationError,dateOfBirthValidation:true});
        setButtonClicked(false);
        return false;
      }

      const response = await updateProfileInformation(params_id,fields,enqueueSnackbar);
      const employee_data = await getSingalEmployeeData(params_id);
      if( response?.data?.data?.updateUser){
        setEditView(!editView)
      }
      setButtonClicked(false);
    }

    const designation_options = settings_data?.jobDesignations ? settings_data?.jobDesignations?.nodes?.map((item)=>{
      return {id:item?.name,name:item?.name}
    }):[];
  
    const department_options = settings_data?.projectDepartments ? settings_data?.projectDepartments?.nodes?.map((item)=>{
      return {id:item?.name,name:item?.name}
    }):[];
    
  const employee_type_options = settings_data?.employmentTypes ? settings_data?.employmentTypes?.nodes?.map((item)=>{
    return {id:item?.name,name:item?.name}
  }):[];

  const fileOnChangeHandler = async(e)=>{
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFields({...fields,profileImage:imageUrl});
    }
    const res = await  attachProfile(file,employee_data?.userId);
     const response = await getSingalEmployeeData(params_id);
    if(employee_data?.userId === userId ){
      await getUserData(navigate);
    }
  }

  useEffect(()=>{
    updateValue(employee_data);
  },[employee_data]);

  const updateValue =(employee_data)=>{
    setFields({
      firstName:employee_data?.firstName || "",
      lastName:employee_data?.lastName || "",
      email:employee_data?.email       || "",
      phone:employee_data?.phone || "",
      dateOfBirth:employee_data?.dateOfBirth || "",
      department:employee_data?.department || "",
      memberID:employee_data?.memberID || "",
      managerID:employee_data?.manager?.id || "",
      userRole:employee_data?.userRole || "",
      userDesignation:employee_data?.userDesignation || "",
      employmentType:employee_data?.employmentType || "",
      profileImage:employee_data?.profileImage || "",
      location:"Pune, Maharashtra",
      manager_details:employee_data?.manager || "",
      // slackUserId:employee_data?.slackUserId || "",
    });
  }

   useEffect(()=>{
     if(validationError?.reportValidation || validationError?.dateOfBirthValidation ){
       setTimeout(()=>{
        setValidationError({...validationError,reportValidation:false,dateOfBirthValidation:false});
       },700)
     }
   },[validationError]);


  return (

    <div className=' border border-[#FF845C] bg-[#FCF5F5] rounded-lg w-full h-full p-6  '>
      <div className=' flex justify-between'>
        <div className='text-[#26212E] text-[18px] font-semibold tracking-[0%] leading-[100%]'>Basic Information</div>
       {(user_role?.toLowerCase() === "owner" || list_user_id === userId )&& <div onClick={()=>{setEditView(!editView)}} className={` ${(editView || !editComponent) && ` hidden `} cursor-pointer  w-fit h-fit `}>
          <img src={config.PUBLIC_URL + "/assets/images/amdital/edit_icon_orange.svg"} alt=''/>
        </div>}
      </div>
      <div className=' mt-6 '>
                {
                  editView ? 
                  <div> 
                    <form onSubmit={onSubmitHandler}>
                      <div className=' relative'>
                        <div className=' relative'>
                          <div className='relative flex  gap-4 items-center '>
                            <div className=' relative min-w-12 min-h-12 max-w-12 max-h-12  rounded-full  bg-[#806BFF] flex justify-center items-center'>
                              {
                                fields?.profileImage ? <img src={fields?.profileImage} alt='' className=' absolute w-full h-full rounded-full  object-fill '/>:<div className=' text-2xl text-[#FFFFFF] font-bold tracking-[0%] leading-[100%] '>{fields?.firstName?.charAt(0) || fields?.lastName?.charAt(0)}</div>

                              }
                              <div className=' cursor-pointer min-w-6 min-h-6 absolute bg-[#00B656] rounded-full bottom-0 right-0  flex justify-center items-center'>
                                  <img src={config.PUBLIC_URL + "/assets/images/amdital/camera_icon.svg"}  alt=''/>
                                  <input onChange={fileOnChangeHandler} type='file' accept=".jpg,.jpeg,.png," className='absolute w-full h-full  rounded-full opacity-0 cursor-pointer '/>
                              </div>
                            </div>
                            <div  className=' flex gap-4  items-center '>
                              <div className=' flex flex-col gap-2'>
                                <div className=' text-xl font-semibold leading-[100%] tracking-[0%] text-[#26212E] capitalize'>{(employee_data?.firstName || "No" ) + " " + (employee_data?.lastName  || "Employee Name")}</div>
                                <div className=' text-[#26212E] font-normal leading-[100%] tracking-[0%] text-sm '>Employee ID - <span>{employee_data?.memberID || "No member Id "}</span></div>
                             </div>
                              <div className=' h-6  px-[10px] py-4 text-sm font-medium leading-4 tracking-[0%] text-[#FFFFFF] bg-[#FF845C] flex justify-center items-center rounded-full capitalize '>{employee_data?.userRole || "No user role"}</div>
                            </div>
                          </div>
                          <div className=' relative w-full grid grid-cols-4 gap-x-8 gap-y-6 mt-6 '>
                            <Input
                              id="firstName" 
                              type="text" 
                              name="firstName"
                              value={fields?.firstName} 
                              onChange={onChangeHandler}
                              autoComplete="autoComplete"
                              placeholder="Enter your first name"
                              classInput=" w-full h-10 "
                              labelName={"First Name"}
                              required={"required"}
                            />
                            <Input
                              id="lastName" 
                              type="text" 
                              name="lastName"
                              value={fields?.lastName} 
                              onChange={onChangeHandler}
                              autoComplete="autoComplete"
                              placeholder="Enter your last name"
                              classInput=" w-full h-10 "
                              labelName={"Last Name"}
                              required={"required"}
                            />
                            <Input
                              id="member_id" 
                              type="text" 
                              name="memberID"
                              value={fields?.memberID} 
                              onChange={onChangeHandler}
                              autoComplete="autoComplete"
                              placeholder="Employee ID"
                              classInput=" w-full h-10 "
                              labelName={"Member / Employee ID"}
                              allowWrapperClass={true}
                              required
                            />
                                                
                            <Input
                              id="email" 
                              type="text" 
                              name="email"
                              value={fields?.email} 
                              onChange={onChangeHandler}
                              autoComplete="autoComplete"
                              placeholder="Enter your email"
                              classInput=" w-full h-10 "
                              labelName={"Email"}
                              required={"required"}
                              disabled
                            />
                            {/* <Input
                              id="slackUserId" 
                              type="text" 
                              name="slackUserId"
                              value={fields?.slackUserId} 
                              onChange={onChangeHandler}
                              autoComplete="autoComplete"
                              placeholder="Enter your slack id"
                              classInput=" w-full h-10 "
                              labelName={"Slack ID"}
                              // required={"required"}
                              // disabled
                            /> */}
                            <Input
                              id="phone" 
                              type="phone" 
                              name="phone"
                              value={fields?.phone} 
                              onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    setFields((prev) => ({
                                      ...prev,
                                      phone: value,
                                    }));
                                  }
                                }}
                              autoComplete="autoComplete"
                              placeholder="Enter phone number"
                              classInput=" w-full h-10 "
                              labelName={"Phone"}
                              required
                              minLength={10}
                              maxLength={10}
                            />
                            {/* <SelectCustomHtml
                            labelName="Department"
                            inputClass=" w-12 "

                            /> */}
                            <SelectHtml
                              id="department"
                              name="department"
                              value={fields?.department} 
                              onChange={onChangeHandler}
                              autoComplete="autoComplete"
                              classInput=" w-full h-10 "
                              labelName={"Department"}
                              optionData={department_options}
                              required
                              placeholder={"Select department"}
                            />    
                                                
                            <SelectHtml
                               id="designation"
                               name="userDesignation"
                               value={fields?.userDesignation} 
                               onChange={onChangeHandler}
                               autoComplete="autoComplete"
                               classInput=" w-full h-10 "
                               labelName={"Designation"}
                               optionData={designation_options}
                               required
                               placeholder={"Select designation"}
                             /> 
                             <SelectHtml
                              id="employee_type"
                              name="employmentType"
                              value={fields?.employmentType} 
                              onChange={onChangeHandler}
                              autoComplete="autoComplete"
                              classInput=" w-full h-10 "
                              labelName={"Employee Type"}
                              optionData={employee_type_options}
                              required
                              placeholder={"Select employee type"}
                            /> 
                            <SelectHtml
                              id="type"
                              name="userRole"
                              value={fields?.userRole} 
                              onChange={onChangeHandler}
                              autoComplete="autoComplete"
                              classInput=" w-full h-10 "
                              labelName={"User Role"}
                              optionData={ fields.userRole?.toLowerCase() === "owner" || fields.userRole === "administrator" ?[{id:"owner",name:"Owner"},{id:"administrator",name:"Administrator"},{id:"employee",name:"Employee"},{id:"admin",name:"Admin"},{id:"manager",name:"Manager"}] :[{id:"employee",name:"Employee"},{id:"admin",name:"Admin"},{id:"manager",name:"Manager"}]}
                              placeholder={"Select user role"}
                              required
                              disabled={ fields.userRole?.toLowerCase() === "owner" || fields.userRole === "administrator"}
                            />
                            {/* {console.log("manager_details",fields)} */}
                          <div className=' relative '>
                            <EmployeeDropDownNew
                              managerHandler={onChangeManageHandler}
                              currentValueData={{id:fields?.manager_details?.id,name:fields?.manager_details?.name,profileImage:fields?.manager_details?.profile_image,userDesignation:fields?.manager_details?.designation}}
                              labelName={"Reporting To"}
                              required={false}
                            />
                            {/* { validationError?.reportValidation && <div className=" absolute flex justify-center  w-full ">
                                                <VaildationSelectionBox/>
                                              </div>} */}
                          </div>
                          <div className=' relative w-full  '>
                            <CustomDateInput
                                  label="Date Of Birth"
                                  inputWidth="100%"
                                  inputHeight="40px"
                                  labelWidth="120px"
                                  value={fields?.dateOfBirth}
                                  onChange={onChangeDateHandler}
                                  required={true}
                                  placeholder="YYYY/MM/DD"
                                /> 
                              { validationError?.dateOfBirthValidation && <div className=" absolute flex justify-center  w-full ">
                                                <VaildationSelectionBox/>
                                              </div>}
                          </div>           

                             
                              <Input
                              id="location" 
                              type="text" 
                              name="location"
                              value={fields?.location} 
                              onChange={onChangeHandler}
                              autoComplete="autoComplete"
                              placeholder="Enter location"
                              classInput=" w-full h-10 "
                              labelName={"Location"}
                              required
                              disabled
                            />                 

                          </div>



                        </div>
                      </div>
                      <div className=' w-full flex justify-end items-center gap-4 mt-6 '>
                        <ButtonNew
                          type="button"
                          buttonName= " Cancel"
                          buttonClassName = {`  cursor-pointer w-[97px]  rounded h-10 hover:bg-[#FF845C]  outline-none border-[#FF845C] text-sm leading-3 font-semibold text-[#FF845C] hover:text-[#FFFFFF]   `}
                          spanClassName = " border-[#FFFFFF] "
                          onClick={(e)=>{setEditView(!editView)}}
                        />            
                        <ButtonNew
                          type='submit'
                          buttonName= "Save"
                          buttonClassName = {` ${ buttonClicked ? ` w-[100px] ` : ` w-[82px] ` }  cursor-pointer  h-10 hover:bg-[#F36A3D]  outline-none bg-[#FF845C] text-sm leading-3 font-semibold text-[#FFFFFF]  `}
                          spanClassName = " border-[#FFFFFF] "
                          isLoading= {buttonClicked}
                        />           
                      </div>
                    </form>
                  </div>: 
                  <div className=' flex flex-col gap-8  mt-8 '> 
                      <div className=' relative flex gap-4 items-center '>
                        <div className=' relative min-w-12 min-h-12 max-w-12 max-h-12  rounded-full  bg-[#806BFF] flex justify-center items-center'>
                          {
                            employee_data?.profileImage ? <img src={employee_data?.profileImage} alt='' className=' rounded-full w-full h-full object-fill  absolute'/>:<div className=' text-2xl text-[#FFFFFF] font-bold tracking-[0%] leading-[100%] uppercase '>
                              {employee_data?.firstName?.charAt(0) || employee_data?.lastName?.charAt(0)}
                            </div>
                          }
                        </div>
                        <div className=' flex flex-col gap-1'>
                          <div className=' text-xl font-semibold leading-[100%] tracking-[0%] text-[#26212E] capitalize'>{(employee_data?.firstName || "No" ) + " " + (employee_data?.lastName  || "Employee Name")}</div>
                          <div className=' text-[#26212E] font-normal leading-[100%] tracking-[0%] text-sm '>Employee ID - <span>{employee_data?.memberID || "No member Id "}</span></div>
                        </div>
                        <div className=' h-6 px-[10px] py-4 text-sm font-medium leading-4 tracking-[0%] text-[#FFFFFF] bg-[#FF845C] flex justify-center items-center rounded-full capitalize '>{employee_data?.userRole || "No user role"}</div>
                      </div>
                      <div className=' grid grid-cols-4 grid-rows-3 gap-x-8 gap-y-6 '>
                        <div className=' flex flex-col gap-1 '>
                          <div className='  relative text-sm font-semibold leading-[100%] tracking-[0%] whitespace-nowrap '>Full Name</div>
                          <div className=' relative text-base block truncate font-normal leading-[100%] tracking-[0%] capitalize '>{(employee_data?.firstName ) + " " + (employee_data?.lastName  || "Employee Name")}</div>
                        </div>
                        <div className=' flex flex-col gap-1 '>
                          <div className='  relative text-sm font-semibold leading-[100%] tracking-[0%] whitespace-nowrap '>Member / Employee ID</div>
                          <div className=' relative text-base block truncate font-normal leading-[100%] tracking-[0%] '>{employee_data?.memberID || "N/A"}</div>
                        </div>
                        <div className=' flex flex-col gap-1 '>
                          <div className='  relative text-sm font-semibold leading-[100%] tracking-[0%] whitespace-nowrap '>Email</div>
                          <div className=' relative text-base  font-normal leading-[100%] tracking-[0%] block truncate '>{employee_data?.email || "N/A"}</div>
                        </div>
                        <div className=' flex flex-col gap-1 '>
                          <div className='  relative text-sm font-semibold leading-[100%] tracking-[0%] whitespace-nowrap '>Slack ID</div>
                          <div className=' relative text-base block truncate font-normal leading-[100%] tracking-[0%] '>{employee_data?.slackUserId || "-"}</div>
                        </div>
                        <div className=' flex flex-col gap-1 '>
                          <div className='  relative text-sm font-semibold leading-[100%] tracking-[0%] whitespace-nowrap '>Phone</div>
                          <div className=' relative text-base block truncate font-normal leading-[100%] tracking-[0%] '>{employee_data?.phone || "No phone number"}</div>
                        </div>
                        <div className=' flex flex-col gap-1 '>
                          <div className='  relative text-sm font-semibold leading-[100%] tracking-[0%] whitespace-nowrap '>Department</div>
                          <div className=' relative text-base block truncate font-normal leading-[100%] tracking-[0%] '>{employee_data?.department || "No department"}</div>
                        </div>
                        <div className=' flex flex-col gap-1 '>
                          <div className='  relative text-sm font-semibold leading-[100%] tracking-[0%] whitespace-nowrap '>Designation</div>
                          <div className=' relative text-base block truncate font-normal leading-[100%] tracking-[0%] '>{employee_data?.userDesignation || "N/A"}</div>
                        </div>
                        <div className=' flex flex-col gap-1 '>
                          <div className='  relative text-sm font-semibold leading-[100%] tracking-[0%] whitespace-nowrap '>Employment Type</div>
                          <div className=' relative text-base block truncate font-normal leading-[100%] tracking-[0%] '>{employee_data?.employmentType || "N/A"}</div>
                        </div>
                        <div className=' flex flex-col gap-1 '>
                          <div className='  relative text-sm font-semibold leading-[100%] tracking-[0%] whitespace-nowrap '>Manager</div>
                         {     employee_data?.manager?.id === 0  ? <div className='relative text-base font-normal leading-[100%] tracking-[0%] '>No Manager</div>:<div className=' flex  gap-[14px] items-center '>
                            <div className=' relative min-w-10 min-h-10 max-w-10 max-h-10  rounded-full  bg-[#806BFF] flex justify-center items-center'>
                              {
                              employee_data?.manager?.profile_image
                                
                                 ? <img src={ employee_data?.manager?.profile_image} alt=''  className=' w-full h-full absolute rounded-full object-fill '/>:<div className=' text-xl text-[#FFFFFF] font-bold tracking-[0%] leading-[100%] uppercase '>{employee_data?.manager?.name?.charAt(0) || "N/A"}</div>
                              }
                            </div>
                            <div className=' flex flex-col gap-1 '>
                              <div className='  relative text-sm font-semibold leading-[100%] tracking-[0%] whitespace-nowrap '>{employee_data?.manager?.name || "N/A"}</div>
                              <div className=' relative text-base font-normal leading-[100%] tracking-[0%] '>{employee_data?.manager?.designation || "No Designation"}</div>
                            </div>
                          </div> 
                          }
                        </div>
                        <div className=' flex flex-col gap-1 '>
                          <div className=' flex gap-2 items-center relative text-sm font-semibold leading-[100%] tracking-[0%] whitespace-nowrap '>Date Of Birth <img src={config.PUBLIC_URL +"/assets/images/amdital/notification_icon_date_of_birth.svg"} alt=''/></div>
                          <div className=' relative text-base font-normal leading-[100%] tracking-[0%] '>{employee_data?.dateOfBirth || "00/00/0000"}</div>
                        </div>
                        <div className=' flex flex-col gap-1 '>
                          <div className='  relative text-sm font-semibold leading-[100%] tracking-[0%] whitespace-nowrap '>Location</div>
                          <div className=' relative text-base font-normal leading-[100%] tracking-[0%] '>{employee_data?.location || "Pune, Maharashtra"}</div>
                        </div>
                      </div>
                  </div>
                }
      </div>
    </div>
  )
}

