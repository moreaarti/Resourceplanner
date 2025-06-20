import React, { useEffect, useState } from 'react'
import  config  from '../../config/config';
import Input from '../../components/elements/amdital/Input';
import SelectHtml from '../../components/elements/amdital/SelectHtml';
import InputDate from '../../components/elements/amdital/InputDate';
import InputTextArea from '../../components/elements/amdital/InputTextArea';
import Button from '../../components/elements/amdital/ButtonNew';
import ChangePassword from './ChangePassword';
import ImageFilesListView from './ImageFilesListView';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import he from 'he';
import { getUserData } from '../hr/emplyee/employeeData';
import { useNavigate } from 'react-router-dom';
import { attachProfile } from './uploadImage';
import ImageUpload from './ImageUpload';
import EmployeeDropdown from '../hr/attendance/EmployeeDropdown';
import EmployeeDropDownNew from '../hr/emplyee/EmployeeDropDownNew';
import SelectBoxDropdown from '../hr/emplyee/SelectBoxDropdown';
import SelectBoxDropdownNonOutside from '../hr/emplyee/SelectBoxDropdownNonOutside';

export default function Profile() {

  const { enqueueSnackbar } = useSnackbar();
  const data = Cookies.get('token');
  const user_details = data ?  JSON?.parse(data) : "";
  const token = user_details?.authToken;
  const userId = user_details?.user?.userId;
  const navigate = useNavigate();
  const userDateRedux = useSelector((state) => state?.employee?.user_details);
  const profile_image =userDateRedux?.profileImage;
  const FirstName = userDateRedux?.firstName;
  const LastName = userDateRedux?.lastName;
  const empName = FirstName + " " + LastName;
  const empId = userDateRedux?.memberID;
  const empRole = userDateRedux?.userRole;
  const profile_name = userDateRedux?.firstName?.toUpperCase();
  const profile_first_letter = profile_name? profile_name?.split("") : "";

  const settings_data  = useSelector(store => store?.general?.settingDropDown);

  const userDocumentDummy = userDateRedux?.userDocuments?.length > 0 ? 
                            userDateRedux?.userDocuments?.map((item)=>{
                              const url = item;
                              const ids = url.match(/id=(\d+)/)?.[1];
                              return ids
                            }) 
                            :[]                                                   

  const [fields,setFields]=useState({
    first_name:userDateRedux?.firstName,
    last_name:userDateRedux?.lastName,
    email:userDateRedux?.email,
    gender:userDateRedux?.gender,
    marital_status:userDateRedux?.maritalStatus,
    phone:userDateRedux?.phone,
    member_id:userDateRedux?.memberID,
    user_role:userDateRedux?.userRole,
    employee_type:userDateRedux?.employmentType,
    department:userDateRedux?.department,
    date_of_birth:userDateRedux?.dateOfBirth,
    emergency_contact1:userDateRedux?.emergencyContact,
    skills:userDateRedux?.skills || [],
    address:userDateRedux?.address,
    about:userDateRedux?.aboutInfo,
    employment_start:userDateRedux?.employmentStartDate,
    employment_contract_end:userDateRedux?.employmentEndDate,
    managerID:userDateRedux?.managerID,
    managerDate:userDateRedux?.manager,
    salary:userDateRedux?.salary,
    last_promotion_date:userDateRedux?.lastPromotionDate,
    next_performance_review:userDateRedux?.nextPerformanceReview,
    documentsImageUrl:userDateRedux?.userDocuments,
    userDocumentIds:userDocumentDummy,
    notes:userDateRedux?.userNotes?.[0],
    dataBaseUserId:userDateRedux?.userId
  });


  const [userProfileImage,setUserProfileImage] = useState(profile_image)

  const [buttonClicked,setButtonClicked]= useState(false)

  const [editProfile,setEditProfile]=useState(true);

  const [changePassword,setChangePassword]=useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChangeHandler = (e) => {
    const{name, value}=e.target;
  setFields({...fields,[name]:value})
}

  const handleRemoveSkill = (skillToRemove) => {
    const new_array = fields?.skills.filter((skill) => skill !== skillToRemove)
    setFields({...fields,skills:new_array});
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newSkill = e.target.value.trim();

      if (newSkill && !fields?.skills.includes(newSkill)) {
        setFields({...fields,skills: [...fields?.skills, newSkill]});
        e.target.value = ""; 
      }
    }
  };
  const showChangePasswordHandler = ()=>{
    setChangePassword(!changePassword)
  }

  const updateEmployeeHandler = async (e,user_details) =>{

    e.preventDefault();

    setButtonClicked(true);

    const {
      first_name,
      last_name,
      gender,
      marital_status,
      phone,
      member_id,
      user_role,
      employee_type,
      department,
      date_of_birth,
      emergency_contact1,
      skills,
      address,
      about,
      employment_start,
      employment_contract_end,
      managerID,
      salary,
      last_promotion_date,
      next_performance_review,
      notes,
      userDocumentIds,
      dataBaseUserId
     }= user_details
 
    const graphqlQuery = {
      query: `
          mutation UpdateUser($input: UpdateUserInput!) {
            updateUser(input: $input) {
              user {
                id
                 userDocuments
              }
            }
          }
        `,
    variables: {
      input: {
       "id": dataBaseUserId,
       "firstName":first_name,
       "lastName":last_name,
        "phone":phone,
        "memberID":member_id,
        "gender":gender,
        "userRole":user_role,
        "employmentType":employee_type,
        "department":department,
        "dateOfBirth":date_of_birth,
        "employmentStartDate":employment_start,
        "emergencyContact":emergency_contact1,
        "address":address,
        "skills":skills,
        "aboutInfo":about,
        "managerID":managerID,
        "maritalStatus": marital_status,
        "userDocuments":userDocumentIds,
        "userNotes":[notes],
        "salary":salary,
        "employmentEndDate":employment_contract_end,
        "lastPromotionDate":last_promotion_date,
        "nextPerformanceReview":next_performance_review,
      },
    },
  };                            
  try {
    const res = await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    } );
      await getUserData(navigate);
    // const attendance_data = await getEmployeeData();

    if (res.data.errors) {
          const errorMessage = he.decode(res.data.errors[0]?.message || "Network error occurred");
          const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
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
          }); setButtonClicked(false);
    } 
  if (res.data.data?.updateUser?.user) {
    const errorMessage = he.decode("Successfully Updated");
    const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
    enqueueSnackbar(message, {
      variant: 'error',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      style:{
        background:"#FFFFFF",
        size:"16px",
        fontWeight:"600",
        lineHeight:"20px",
        color:"#26212E"
      },
    });
    setButtonClicked(false);

    }                            
  } catch (error) {    
    setButtonClicked(false);    
  }; 

}

const userProfileOnChangeHandler = async(e,dataBaseUserId)=>{

  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setUserProfileImage(imageUrl);
  }
  const res = await attachProfile(file,dataBaseUserId);

  if(userId === dataBaseUserId ){
    await getUserData(navigate);
  }
}

const userDocumentsHandler = (item)=>{
    setFields({...fields,userDocumentIds:item})
}

const department_options = settings_data?.projectDepartments ? settings_data?.projectDepartments?.nodes?.map((item)=>{
  return {id:item?.name,name:item?.name}
}):[];

const employee_type_options = settings_data?.employmentTypes ? settings_data?.employmentTypes?.nodes?.map((item)=>{
  return {id:item?.name,name:item?.name}
}):[];

const managerHandler = (item)=>{
  setFields({...fields,managerID:item?.userId})
}

  return (
    <>
      <div className=' px-6 py-8  w-full '>
        <div className=' border border-[#DCD6FF] rounded  w-full p-4 '>
          {/* profiel info */}
          <div className=' flex justify-between items-center '>
            <div className=' flex gap-6 items-center '>
              <div className=' w-[62px] h-[62px] relative  rounded-full  '>
               { userProfileImage === ""  ? <div className=' w-full h-full bg-[#806BFF] rounded-full flex justify-center items-center text-[40px] font-bold text-[#FFFFFF] '>{profile_first_letter?.[0]}</div> : <img className='w-full h-full relative rounded-full ' src={userProfileImage} alt=''/>}
               {!editProfile && <div className=' cursor-pointer min-w-6 min-h-6 absolute bg-[#00B656] rounded-full bottom-0 right-0  flex justify-center items-center'>
                  <img src={config.PUBLIC_URL + "/assets/images/amdital/camera_icon.svg"}  alt=''/>
                  <input onChange={(e)=>{userProfileOnChangeHandler(e,fields?.dataBaseUserId)}} type='file' accept=".jpg,.jpeg,.png," className='absolute w-full h-full  rounded-full opacity-0 cursor-pointer '/>
                </div>}
              </div>
              <div className=' flex  gap-7 items-center'>
                <div className='  flex flex-col gap-1 '>
                  <div className=' text-[20px] font-semibold leading-6 text-[#26212E] capitalize '>{empName}</div>
                  <div className=' text-sm font-normal  leading-4 text-[#26212E] capitalize '>{empRole}</div>
                </div>
                <div className=' flex flex-col gap-1 '>
                  <div className=' text-sm font-semibold leading-4 text-[#26212E] '>Member ID</div>
                  <div className=' text-sm font-normal  leading-4 text-[#26212E] capitalize '>{empId}</div>
                </div>
              </div>
              </div>
              <div className=' flex gap-2 '>
                 <div onClick={()=>{setEditProfile(!editProfile)}} className=' border hover:bg-[#FFF2ED] cursor-pointer border-[#FF845C] h-8 w-[175px] rounded flex items-center justify-center gap-[10px] '>
                    <img src={config.PUBLIC_URL + "/assets/images/amdital/edit_icon_orange.svg"} alt=''/>
                    {!editProfile ? <div className=' text-[#FF845C]  text-[14px] leading-4 tracking-wider font-semibold '>Cancel Editing</div> :<div className=' text-[#FF845C]  text-[14px] leading-4 tracking-wider font-semibold '>Edit Your Profile</div>}
                 </div>
                 <div onClick={showChangePasswordHandler} className=' border hover:bg-[#F36A3D] cursor-pointer bg-[#FF845C] h-8 w-[183px] rounded flex items-center justify-center gap-[10px] '>
                    <img src={config.PUBLIC_URL + "/assets/images/amdital/lock_icon_white.svg"} alt=''/>
                    <div className=' text-[#FFFFFF]  text-[14px] leading-4 tracking-wider font-semibold '>Change Password</div>
                 </div>
              </div>
          </div>
          {/* input fields */}
          <div className=' mt-10 '>
              <div className=' text-[#26212E] text-lg font-semibold leading-6  '>Basic Information</div>
              <form  className=' grid grid-cols-3 gap-6 mt-4'>
                <Input
                  id="first_name" 
                  type="text" 
                  name="first_name"
                  value={fields?.first_name} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  placeholder="Enter your first name"
                  classInput=" w-full h-10 "
                  labelName={"First Name"}
                  disabled={editProfile}
                />
                <Input
                  id="last_name" 
                  type="text" 
                  name="last_name"
                  value={fields?.last_name} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  placeholder="Enter your last name"
                  classInput=" w-full h-10 "
                  labelName={"Last Name"}
                  disabled={editProfile}
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
                  disabled={true}
                />

                <SelectBoxDropdownNonOutside
                 mainWrapperClass={`gap-1`}
                 labelClassName={` font-medium `}
                  labelName="Gender"
                  dropDownClassName = { `  max-h-[160px] mt-2 `}
                  dropDownHeight = {180}
                  options={[{id:"male",name:"Male"},{id:"female",name:"Female"},{id:"other",name:"Other"}]}
                  current_value={fields?.gender}
                  current_id={fields?.gender? fields?.gender?.toLowerCase() : ""} 
                  onChangeHandler={(labelName,item)=>{setFields({...fields,gender:item?.id})}}  
                  wrapperClass= {` w-full h-10 ${editProfile?`  pointer-events-none `:` `}  `} 
                  bgClassName= {` bg-[#F8F7FC] `}     
                              />             
                {/* <SelectHtml
                 id="type"
                 name="gender"
                 value={fields?.gender} 
                 onChange={onChangeHandler}
                 autoComplete="autoComplete"
                 classInput=" w-full h-10 "
                 labelName={"Gender"}
                 disabled={editProfile}
                 optionData={[{id:"male",name:"Male"},{id:"female",name:"Female"},{id:"other",name:"Other"}]}
                 placeholder={"Select gender"}                   
                />   */}
                {/* <SelectHtml
                 id="marital_status"
                 name="marital_status"
                 value={fields?.marital_status} 
                 onChange={onChangeHandler}
                 autoComplete="autoComplete"
                 classInput=" w-full h-10 "
                 labelName={"Marital Status"}
                 disabled={editProfile}
                 optionData={[{id:"married",name:"Married"},{id:"single",name:"Single"}]}
                 placeholder={"Select marital status"}
                 
               />   */}

                <SelectBoxDropdownNonOutside
                 mainWrapperClass={`gap-1`}
                  labelName="Marital Status"
                  dropDownClassName = { `  max-h-[160px] mt-2 `}
                  dropDownHeight = {160}
                  options={[{id:"married",name:"Married"},{id:"single",name:"Single"}]}
                  current_value={fields?.marital_status}
                  current_id={fields?.marital_status ? fields?.marital_status?.toLowerCase() : ""} 
                  onChangeHandler={(labelName,item)=>{setFields({...fields,marital_status:item?.id})}}  
                  wrapperClass= {` w-full h-10 ${editProfile?`  pointer-events-none `:` `}  `} 
                  bgClassName= {` bg-[#F8F7FC] `}  
                  searchPlaceholder={"Search marital status"}   
                              />                
                {/* <SelectHtml
                  id="employee_type"
                  name="employee_type"
                  value={fields?.employee_type} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  classInput=" w-full h-10 "
                  labelName={"Employee Type"}
                  disabled={editProfile}
                  optionData={employee_type_options}
                  placeholder={"Select employee type"}
                />      */}
                 <SelectBoxDropdownNonOutside
                  mainWrapperClass={`gap-1`}
                  labelName="Employee Type"
                  dropDownClassName = { `  max-h-[300px] mt-2 `}
                  dropDownHeight = {300}
                  options={employee_type_options}
                  current_value={fields?.employee_type}
                  current_id={fields?.employee_type ? fields?.employee_type?.toLowerCase() : ""} 
                  onChangeHandler={(labelName,item)=>{setFields({...fields,employee_type:item?.name})}}  
                  wrapperClass= {` w-full h-10 ${editProfile?`  pointer-events-none `:` `}  `} 
                  bgClassName= {` bg-[#F8F7FC] `}  
                  searchPlaceholder={"Select employee type"}   
                              />           
                 <Input
                  id="phone" 
                  type="text" 
                  name="phone"
                  value={fields?.phone} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  placeholder="Enter phone"
                  classInput=" w-full h-10 "
                  labelName={"Phone"}
                  disabled={editProfile}
                  minLength={10}
                  maxLength={10}
                />
                <Input
                  id="member_id" 
                  type="text" 
                  name="member_id"
                  value={fields?.member_id} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  placeholder="Enter member Id"
                  classInput=" w-full h-10 "
                  labelName={"Member Id"}
                  disabled={editProfile}
                />
                 {/* <SelectHtml
                   id="type"
                   name="user_role"
                   value={fields?.user_role} 
                   onChange={onChangeHandler}
                   autoComplete="autoComplete"
                   classInput=" w-full h-10 "
                   labelName={"User Role"}
                   optionData={fields?.user_role === "owner"?[{id:"owner",name:"Owner"},{id:"employee",name:"Employee"},{id:"admin",name:"Admin"},{id:"manager",name:"Manager"}]:[{id:"employee",name:"Employee"},{id:"admin",name:"Admin"},{id:"manager",name:"Manager"}]}
                   disabled={editProfile}
     
                   placeholder={"Select user role"}
                 />    */}
                 <SelectBoxDropdownNonOutside
                  mainWrapperClass={`gap-1`}
                  labelName="User Role"
                  dropDownClassName = { `  max-h-[300px] mt-2 `}
                  dropDownHeight = {180}
                  options={fields?.user_role === "owner"?[{id:"owner",name:"Owner"},{id:"employee",name:"Employee"},{id:"admin",name:"Admin"},{id:"manager",name:"Manager"}]:[{id:"employee",name:"Employee"},{id:"admin",name:"Admin"},{id:"manager",name:"Manager"}]}
                  current_value={fields?.user_role}
                  current_id={fields?.user_role ? fields?.user_role?.toLowerCase() : ""} 
                  onChangeHandler={(labelName,item)=>{setFields({...fields,user_role:item?.name})}}  
                  wrapperClass= {` w-full h-10 ${editProfile?`  pointer-events-none `:` `}  `} 
                  bgClassName= {` bg-[#F8F7FC] `}  
                  searchPlaceholder={"Select user role"}   
                              />                         
                {/* <SelectHtml
                   id="department"
                   name="department"
                   value={fields?.department} 
                   onChange={onChangeHandler}
                   autoComplete="autoComplete"
                   classInput=" w-full h-10 "
                   labelName={"Department"}
                   disabled={editProfile}
                   optionData={department_options}
                   placeholder={"Select department"}
                 />   */}
                 <SelectBoxDropdownNonOutside
                  mainWrapperClass={`gap-1`}
                  labelName="Department"
                  dropDownClassName = { `  max-h-[300px] mt-2 `}
                  dropDownHeight = {60}
                  options={department_options}
                  current_value={fields?.department}
                  current_id={fields?.department ? fields?.department?.toLowerCase() : ""} 
                  onChangeHandler={(labelName,item)=>{setFields({...fields,department:item?.name})}}  
                  wrapperClass= {` w-full h-10 ${editProfile?`  pointer-events-none `:` `}  `} 
                  bgClassName= {` bg-[#F8F7FC] `}  
                  searchPlaceholder={"Select department"}   
                              />               
                <InputDate
                  id="date_of_birth" 
                  type="date" 
                  name="date_of_birth"
                  value={fields?.date_of_birth} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  placeholder="Enter date of birth"
                  classInput=" w-full h-10 "
                  labelName={"Date of Birth"}
                  disabled={editProfile}
                />
                <Input
                  id="emergency_contact1" 
                  type="text" 
                  name="emergency_contact1"
                  value={fields?.emergency_contact1} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  placeholder="Emergency contact 1"
                  classInput=" w-full h-10 "
                  labelName={"Emergency Contact 1"}
                  disabled={editProfile}
                  minLength={10}
                  maxLength={10}
                />
                <div className={` ${editProfile && ` pointer-events-none ` }  text-xs font-normal leading-4 text-[#26212E] `}>
                          <label className="block text-sm font-medium mb-1 outline-none">
                            Skills
                          </label>
                          <div className="border rounded p-2 border-[#DCD6FF] bg-[#F8F7FC]">
                            {/* Display the list of skills */}
                            <div className="flex flex-wrap items-center">
                              {fields?.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className=" flex items-center bg-[#E1DCFF] pr-6 pl-2 py-1 rounded mr-2 mb-2 relative"
                                >
                                  {skill}
                                  <button
                                    className="absolute right-1 top-1 bg-transparent border-0 outline-none"
                                    onClick={() => handleRemoveSkill(skill)} // Call remove function
                                  >
                                    <img
                                      src={config.PUBLIC_URL +"/assets/images/amdital/cross_close_icon.svg"} 
                                      alt="Remove"
                                      className="w-3 h-3  "
                                    />
                                  </button>
                                </span>
                              ))}
                            </div>
                            {/* Input field to add a new skill */}
                            <div className="mt-2">
                              <input
                                type="text"
                                className="border rounded p-2 w-full border-[#DCD6FF] bg-[#F8F7FC] outline-none"
                                placeholder="Add a skill"
                                onKeyDown={handleAddSkill} // Handle adding skill on Enter key
                              />
                            </div>
                          </div>
                        </div>
                <InputTextArea
                  id="address" 
                  type="text" 
                  name="address"
                  value={fields?.address} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  placeholder="Enter address"
                  classInput=" w-full h-[77px] "
                  labelName={"Address"}
                  disabled={editProfile}
                />
                <InputTextArea
                  id="about"
                  name="about"
                  value={fields?.about} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  placeholder="Enter about"
                  classInput=" w-full h-[77px] "
                  labelName={"About"}
                  disabled={editProfile}
                />
              </form>
              <div className=' mt-10 text-[#26212E] text-lg font-semibold leading-6  '>Employment Details</div>
              <form className=' grid grid-cols-3 gap-6 mt-4'>
              <InputDate
                  id="employment_start" 
                  type="date" 
                  name="employment_start"
                  value={fields?.employment_start} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  placeholder="Enter employment start"
                  classInput=" w-full h-10 "
                  labelName={"Employment Start"}
                  disabled={editProfile}
                />
                 <InputDate
                  id="employment_contract_end" 
                  type="date" 
                  name="employment_contract_end"
                  value={fields?.employment_contract_end} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  placeholder="Enter employment contract end"
                  classInput=" w-full h-10 "
                  labelName={"Employment Contract End"}
                  disabled={editProfile}
                />
                 <div className={` ${editProfile && `pointer-events-none `} `}>
                  <EmployeeDropDownNew
                        labelName={"Reporting To"}
                        managerHandler={managerHandler}
                        currentValueData={{id:fields?.managerDate?.id,name:fields?.managerDate?.name,profileImage:fields?.managerDate?.profile_image}}
                    />
                 </div>                
                <Input
                  id="salary" 
                  type="text" 
                  name="salary"
                  value={fields?.salary} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  placeholder="Enter salary"
                  classInput=" w-full h-10 "
                  labelName={"Salary"}
                  disabled={editProfile}
                />
                 <InputDate
                  id="last_promotion_date" 
                  type="date" 
                  name="last_promotion_date"
                  value={fields?.last_promotion_date} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  placeholder="Enter last promotion date"
                  classInput=" w-full h-10 "
                  labelName={"Last Promotion Date"}
                  disabled={editProfile}
                />
                <InputDate
                  id="next_performance_review" 
                  type="date" 
                  name="next_performance_review"
                  value={fields?.next_performance_review} 
                  onChange={onChangeHandler}
                  autoComplete="autoComplete"
                  placeholder="Enter next performance review"
                  classInput=" w-full h-10 "
                  labelName={"Next Performance Review"}
                  disabled={editProfile}
                />
              </form>
              <div className=' flex gap-6 '>
                <div >
                  <div className=' mt-10 text-[#26212E] text-lg font-semibold leading-6  '>Documents</div>
                      <div className=' flex gap-6 flex-col mt-4 '>
                        <ImageUpload  editProfile={editProfile} formData={fields} userDocumentsHandler={userDocumentsHandler} />
                      </div>                             
                </div>
                <div className=' w-full '>
                  <div className=' mt-10 text-[#26212E] text-lg font-semibold leading-6  '>Notes</div>
                      <div className=' flex gap-6 flex-col mt-4 w-full '>
                          <textarea 
                              id={"notes"}
                              value={fields?.notes} 
                              name={"notes"} 
                              className={ ` w-full h-[126px] px-4 py-2 border border-[#DCD6FF] rounded bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] resize-none `} 
                              placeholder={"Type notes here"}  
                              disabled={editProfile} 
                              onChange={onChangeHandler}
                            />
                      </div>                             
                </div>
                  
              
              </div>
             

          </div>
          {/* submit */}
        { !editProfile && <div className=' w-full flex justify-end mt-10 '>
          <Button
              type="button"
              buttonName= "Save Profile"
              buttonClassName = {` ${ buttonClicked ? ` w-[140px] ` : ` w-[116px] ` }  cursor-pointer  h-8 hover:bg-[#F36A3D]  outline-none bg-[#FF845C] text-sm leading-3 font-semibold text-[#FFFFFF]  `}
              spanClassName = " border-[#FFFFFF] "
              isLoading= {buttonClicked}
              onClick={(e)=>{updateEmployeeHandler(e,fields)}}
            />
        </div>}
        </div>
      </div>
      {
          changePassword && <div className='fixed w-full h-full top-0 left-0 flex justify-center items-center z-[1100] '>
                                  <div className="   h-fit rounded-lg z-[1100] ">
                                    <ChangePassword  formData={fields}  closeHandler={showChangePasswordHandler} />
                                  </div>
              {changePassword && <div className='bg-[#150C2CB2] inset-0 fixed z-[1000] cursor-pointer '  onClick={showChangePasswordHandler} ></div>}
          </div>
      }
    </>
  )
}
