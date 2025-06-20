import React, { useEffect, useState } from 'react'
import Input from '../../../components/elements/amdital/Input';
import SelectHtml from '../../../components/elements/amdital/SelectHtml';
import config from '../../../config/config';
import InputDate from '../../../components/elements/amdital/InputDate';
import InputTextArea from '../../../components/elements/amdital/InputTextArea';
import Button from '../../../components/elements/amdital/ButtonNew';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCountryData, getEmployeeDropdownList, getSingleEmployeeData, getUserData } from './employeeData';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import he from 'he';
import { useDispatch } from 'react-redux';
import { setStateData } from '../../general/generalSlice';
import { attachProfile } from '../../profile/uploadImage';
import Password from '../../../components/elements/amdital/Password';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EmployeeDropdown from '../attendance/EmployeeDropdown';
import EmployeeDropDownNew from './EmployeeDropDownNew';
import CustomDateSelector from '../../../components/elements/amdital/CustomDate/CustomDateInput';



const AccountDetailsForm = () => {

    const { enqueueSnackbar } = useSnackbar();
    const data = Cookies.get('token');
    const user_details = data ?  JSON?.parse(data) : "";
    const token = user_details?.authToken;
    const userId = user_details?.user?.userId;
    const dispatch = useDispatch();
      const navigate = useNavigate();

   const [showSkeleton,setShowSkeleton] =useState(true)

   const settings_data  = useSelector(store => store?.general?.settingDropDown);

  const location = useLocation();

  const { user_id } = useParams();

  const storeRedux =useSelector(store =>store);

  const [fields,setFields]=useState({
    member_id:"",
    salutation:"",
    first_name:"",
    last_name:"",
    email:"",
    designation:"",
    department:"",
    country:"",
    state:"",
    phone:"",
    gender:"",
    joining_date:"",
    date_of_birth:"",
    reporting_to:"",
    managerID:"",
    user_role:"",
    language:[],
    address:"",
    about:"",
    login_allowed:true,
    receive_email_notifications:true,
    hourly_rate:"",
    skills:[],
    probation_end_date:"",
    notice_period_start_date:"",
    notice_period_end_date:"",
    employee_type:"",
    marital_status:"",
    emergency_contact:"",
    dataBaseUserId:"",
    password:"",
    employment_end_date:"",
    salary:"",
    last_promotion_date:"",
    next_performance_review:""
  });

  const [profileImage,setProfileImage] = useState("")

  const countryReduxData = storeRedux?.general.country_data
  const stateReduxData = storeRedux?.general.state_data

  const countryOptions = countryReduxData?.map((item)=>{
    return {id:item?.code,name:item?.name}
  }) 
  const stateOptions = stateReduxData?.map((item)=>{
    return {id:item?.code,name:item?.name}
  }) 
  useEffect(()=>{
    if(fields?.country?.length > 0){
      stateApiCallingHandler(fields?.country);
    }
  },[fields?.country]);

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
            const res= await axios.post(config.API_URL,graphqlQuery,{
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
            if(res?.data?.data?.getStates){
              dispatch(setStateData(res?.data?.data?.getStates));
            }
            if(res?.data?.errors){
              dispatch(setStateData([]));
            }

  }

  




  const [buttonClicked,setButtonClicked]=useState(false);

   const [editProfile,setEditProfile]=useState(true);

   const [addEmployee,setAddEmployee]=useState(false)

   const [designationDropdown,setDesignationDropdown]=useState(false);



   const handleRemoveLanguage = (languageToRemove) => {
    const new_array = fields?.language.filter((language) => language !== languageToRemove)
    setFields({...fields,language:new_array});
  };

  const handleAddLanguage = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newLanguage = e.target.value.trim();

      if (newLanguage && !fields?.language.includes(newLanguage)) {
        setFields({...fields,language: [...fields?.language, newLanguage]});
        e.target.value = ""; 
      }
    }
  };

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
 
  useEffect(() => {
    window.scrollTo(0, 0);
    getCountryData()

    getDataHandler();
  },[]);


  const getDataHandler = async()=>{

    setShowSkeleton(true);
    const res = await getSingleEmployeeData(user_id);

    if(res){
      const {aboutInfo,userState,address,dateOfBirth,department,email,emergencyContact,employmentStartDate,employmentType
        ,firstName,gender,lastName,manager,memberID,phone,profileImage,
         skills,userCountry,userDesignation,userHourlyRate,userLanguages,userLoginAllowed,userNoticePeriodEndDate,userNoticePeriodStartDate,userProbationEndDate,userReceiveEmailNotifications,userRole,userSalutation,maritalStatus ,userId

      } = res;
      setFields({
        member_id:memberID,
        salutation:userSalutation,
        first_name:firstName,
        last_name:lastName,
        email:email,
        designation:userDesignation,
        department:department,
        profile_image:profileImage,
        country:userCountry,
        state:userState,
        phone:phone,
        gender:gender,
        joining_date:employmentStartDate,
        date_of_birth:dateOfBirth,
        reporting_to:manager,
        user_role:userRole,
        language:userLanguages || [],
        address:address,
        about:aboutInfo,
        login_allowed:userLoginAllowed,
        receive_email_notifications:userReceiveEmailNotifications,
        hourly_rate:userHourlyRate,
        skills:skills || [],
        probation_end_date:userProbationEndDate,
        notice_period_start_date:userNoticePeriodStartDate,
        notice_period_end_date:userNoticePeriodEndDate,
        employee_type:employmentType,
        marital_status:maritalStatus,
        emergency_contact:emergencyContact,
        dataBaseUserId:userId
      })
      setProfileImage(profileImage)
    }

    setShowSkeleton(false);
  }
 
  const onChangeHandler = (e) => {
      const{name, value}=e.target;
    setFields({...fields,[name]:value})
  }

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/employees/add-employee")) {
      setEditProfile(false);
      setAddEmployee(true);
    }
    if(path.includes("/employees/edit-employee")){
      setEditProfile(false);
    }
  }, [location.pathname]);



  const updateEmployeeHandler = async (e,user_details) =>{

    e.preventDefault();

    setButtonClicked(true);

    const {
    member_id ,salutation , first_name, last_name , designation, department ,country ,state ,  phone, gender,
    joining_date, date_of_birth, reporting_to, managerID, user_role, language, address, about, login_allowed, receive_email_notifications,
    hourly_rate, skills, probation_end_date, notice_period_start_date, notice_period_end_date,
    employee_type, marital_status, emergency_contact, dataBaseUserId }= user_details
 
    const graphqlQuery = {
      query: `
          mutation UpdateUser($input: UpdateUserInput!) {
            updateUser(input: $input) {
              user {
                id
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
        "employmentStartDate":joining_date,
        "emergencyContact":emergency_contact,
        "address":address,
        "skills":skills,
        "aboutInfo":about,
        "managerID":managerID,
        "maritalStatus": marital_status,
        "userSalutation":salutation,
        "userDesignation":designation,
        "userCountry":country,
        "userState":state,
        "userLanguages":language,
        "userLoginAllowed":login_allowed,
        "userReceiveEmailNotifications":receive_email_notifications,
        "userHourlyRate":hourly_rate,
        "userProbationEndDate":probation_end_date,
        "userNoticePeriodStartDate":notice_period_start_date,
        "userNoticePeriodEndDate":notice_period_end_date,
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

    if(userId === dataBaseUserId ){
      await getUserData(navigate);
    }
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

const fileOnChangeHandler = async(e,dataBaseUserId)=>{

  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  }
  const res = await  attachProfile(file,dataBaseUserId);

  if(userId === dataBaseUserId ){
    await getUserData(navigate);
  }
}

const  addEmployeeHandler =  async (e,user_details) =>{

            e.preventDefault();

            setButtonClicked(true);

            const {
            member_id ,salutation , first_name, last_name , designation, department ,country ,state ,  phone, gender,
            joining_date,email, date_of_birth, reporting_to,managerID, user_role, language, address, about, login_allowed, receive_email_notifications,
            hourly_rate, skills, probation_end_date, notice_period_start_date, notice_period_end_date,
            employee_type, marital_status, emergency_contact,password,employment_end_date,salary,last_promotion_date,next_performance_review }= user_details
            
            if(managerID === ""){
                  const message = "Please choose the reporting to"
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
            // return false
            const graphqlQuery = {
              query: `
                        mutation RegisterUser {
          registerUser(
            input: {
                clientMutationId: "new employee",
                username: "${email}",
                password: "${password}",
                email: "${email}",
                firstName: "${first_name}",
                lastName: "${last_name}",
                phone: "${phone}",
                memberID: "${member_id}",
                gender: "${gender}",
                userRole: "${user_role}",
                employmentType: "${employee_type}",
                department: "${department}",
                dateOfBirth: "${date_of_birth}",
                emergencyContact: "${emergency_contact}",
                address: "${address}",
                skills: "${skills}",
                aboutInfo: "${about}",
                employmentStartDate:"${joining_date}",
                employmentEndDate: "${employment_end_date}",
                managerID:${managerID},
                salary:"${salary}",
                lastPromotionDate: "${last_promotion_date}",
                nextPerformanceReview: "${next_performance_review}",
                maritalStatus:"${marital_status}",
                userSalutation:"${salutation}",
                userDesignation:"${designation}",
                userCountry: "${country}",
                userState: "${state}",
                userLanguages: "${language}",
                userLoginAllowed: ${login_allowed},
                userReceiveEmailNotifications: ${receive_email_notifications},
                userHourlyRate:"${hourly_rate}",
                userProbationEndDate: "${probation_end_date}",
                userNoticePeriodStartDate: "${notice_period_start_date}",
                userNoticePeriodEndDate:"${notice_period_end_date}",
              }) {
                   user {
                        id
                        name
                      }
                    }
                  }
                `,
           
          };                            
          try {
            const res = await axios.post(config.API_URL,graphqlQuery,{
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            } );

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
          if (res.data.data?.registerUser?.user) {
            const errorMessage = he.decode("User Added Successfully");
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
            navigate("/employees")

            }                            
          } catch (error) {    
            setButtonClicked(false);    
          }; 

          }

  // const [designationArray,setDesignationArray]=useState(["Trainee","Team Lead","Senior","Junior","Project Manager"])
  // const [addDesignationInput,setDesignationInput]=useState("");
  // const pushDesignationHandler = (item) =>{
  //          designationArray.push(item);
  //         }



  const designation_options = settings_data?.jobDesignations ? settings_data?.jobDesignations?.nodes?.map((item)=>{
    return {id:item?.name,name:item?.name}
  }):[];

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
    <div>
      <form onSubmit={(e)=>{ 
          if(addEmployee){
            addEmployeeHandler(e,fields)
          }
        else{
          updateEmployeeHandler(e,fields)
        }
        }} className="w-full px-6 py-4">
       {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>: <h2 className="text-[18px] text-lg font-semibold mb-4">
          Account Details
        </h2>}
        <div className='flex gap-[30px]'>
            <div className='grid grid-cols-4 grid-rows-2 w-full gap-x-[30px] gap-y-[25px]'>
                
                {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>:  <SelectHtml
                    id="salutation"
                    name="salutation"
                    value={fields?.salutation} 
                    onChange={onChangeHandler}
                    autoComplete="autoComplete"
                    classInput=" min-w-[130px] h-10 "
                    allowWrapperClass={true}
                    labelName={"Salutation"}
                    disabled={editProfile}
                    optionData={[{id:"mr",name:"Mr."},{id:"mrs",name:"Mrs."},{id:"ms",name:"Ms."},{id:"dr",name:"Dr."}]}
                    placeholder={"Select salutation"}
                  />}
                {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>:  <Input
                    id="first_name" 
                    type="text" 
                    name="first_name"
                    value={fields?.first_name} 
                    onChange={onChangeHandler}
                    autoComplete="autoComplete"
                    placeholder="Enter your first name"
                    classInput=" w-full h-10 "
                    labelName={"First Name"}
                    required
                    disabled={editProfile}
                  /> }
                  {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>:<Input
                    id="last_name" 
                    type="text" 
                    name="last_name"
                    value={fields?.last_name} 
                    onChange={onChangeHandler}
                    autoComplete="autoComplete"
                    placeholder="Enter your last name"
                    classInput=" w-full h-10 "
                    labelName={"Last Name"}
                    required
                    disabled={editProfile}
                  />}
                  {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <Input
                    id="email" 
                    type="email" 
                    name="email"
                    value={fields?.email} 
                    onChange={onChangeHandler}
                    autoComplete="autoComplete"
                    placeholder="Enter email"
                    classInput=" w-full h-10 "
                    labelName={"Email"}
                    required="required"
                    disabled={ addEmployee ? false :true}
                  />}
                 {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <div className={` ${editProfile && ` pointer-events-none `} w-full flex flex-col gap-1`}>
                      <SelectHtml
                      id="designation"
                      name="designation"
                      value={fields?.designation} 
                      onChange={onChangeHandler}
                      autoComplete="autoComplete"
                      classInput=" w-full h-10 "
                      labelName={"Designation"}
                      disabled={editProfile}
                      optionData={designation_options}
                      required
                      placeholder={"Select designation"}
                    />
                  {/* <label className={` flex flex-row text-sm leading-4 font-medium text-[#26212E] `}>Designation <span className='text-[#EA4242]'>*</span></label> */}
                  {/* <div className='relative'>
                    <div className={` ${designationDropdown ? ` border-2 border-[#806BFF] ` :  ` border border-[#DCD6FF] `}   rounded bg-[#F8F7FC] w-full h-10 flex items-center justify-between px-[18px] py-[11px] cursor-pointer `} onClick={()=>setDesignationDropdown(!designationDropdown)}>
                      <div className={`  ${ fields?.designation ? ` text-[#26212E] ` : ` text-[#9F9F9F] `  } text-sm leading-6 font-normal `}>{fields?.designation ? fields?.designation : "Select Designation"}</div>
                      <img src={config.PUBLIC_URL + "/assets/images/amdital/left_arrow.svg"} alt=''/>
                    </div>
                    {
                      designationDropdown && <div className='bg-[#FFFFFF] border border-[#E1DCFF] rounded w-full absolute min-h-[230px] mt-2 z-[1100]'>
                          <div className='flex border border-[#E1DCFF] h-[38px] justify-between m-4 rounded items-center'>
                            <input  className='border-none rounded-l text-[#26212E] text-sm w-[90%] font-medium leading-4 outline-none placeholder:text-[#74689280] px-4 py-1' type='text'
                            placeholder='Add new designation'
                            onChange={(e)=>setDesignationInput(e.target.value)} value={addDesignationInput}
                            />
                            <button onClick={()=>{pushDesignationHandler(addDesignationInput); setDesignationInput("")}} type='button' className={` ${addDesignationInput?.length > 0  ? ` ` : ` opacity-40 pointer-events-none `} hover:bg-[#806BFF] hover:text-[#FFFFFF] cursor-pointer m-1 rounded w-[45px] h-[30px] bg-[#DCD6FF] text-sm font-normal leading-6 text-[#26212E] `}>Add</button>
                          </div>
                        {
                            <div className='flex flex-col h-full w-full'>
                              {
                                designationArray.map((item,index)=>(
                                  <div onClick={()=>{ setFields({...fields,designation:item}); setDesignationDropdown(!designationDropdown) }} key={index} className={` cursor-pointer  px-4 py-2 ${fields?.designation === item && ` bg-[#E1DCFF] ` }  hover:bg-[#E1DCFF] `}>
                                    <div className='text-[#26212E] text-sm block font-normal leading-4 overflow-hidden px-4 truncate'>{item}</div>
                                  </div>
                                ))
                              }


                            </div>
                        }
                      </div>
                    }
                   { designationDropdown &&  <div className='fixed inset-0 z-[1000]' onClick={()=>setDesignationDropdown(!designationDropdown)}></div>}

                  </div> */}
              </div> }
              {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <SelectHtml
                id="department"
                name="department"
                value={fields?.department} 
                onChange={onChangeHandler}
                autoComplete="autoComplete"
                classInput=" w-full h-10 "
                labelName={"Department"}
                disabled={editProfile}
                optionData={department_options}
                required
                placeholder={"Select department"}
              />}
              {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>:<SelectHtml
                id="country"
                name="country"
                value={fields?.country} 
                onChange={onChangeHandler}
                autoComplete="autoComplete"
                classInput=" w-full h-10 "
                labelName={"Country"}
                disabled={editProfile}
                placeholder={"Select country"}
                optionData={countryOptions}
              />}
              {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>:<SelectHtml
                id="state"
                name="state"
                value={fields?.state} 
                onChange={onChangeHandler}
                autoComplete="autoComplete"
                classInput=" w-full h-10 "
                labelName={"State"}
                disabled={editProfile}
                placeholder={"Select state"}
                optionData={stateOptions}
              />}
            </div>
           {   showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: !addEmployee && <div>
              <div className='flex flex-col gap-1'>
                <label className='flex text-[#26212E] text-sm font-medium leading-6'>Profile Picture {<img src={config.PUBLIC_URL + "/assets/images/amdital/question_mark_icon_orange.svg"} alt=''/>}</label>
                <div className='flex flex-col bg-[#F8F7FC] border border-[#DCD6FF] h-[130px] justify-center rounded w-[110px] gap-1 items-center relative'>
               {profileImage && <img src={profileImage} alt='' className='h-full w-full absolute'/>}
                  <img src={config.PUBLIC_URL + "/assets/images/amdital/choose_file_icon.svg"} alt=''/>
                  <p className='text-[#9F9F9F] text-sm font-normal leading-6'>Choose a file</p>
                  <input onChange={(e)=>{fileOnChangeHandler(e,fields?.dataBaseUserId)}} type='file' disabled={editProfile} className='h-full w-full absolute opacity-0 z-10'/>
                </div>
              </div>
            </div>}
        </div>
        <div className='grid grid-cols-3 gap-x-[30px] gap-y-[25px] mt-6'>

        {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>:  (
          
          <>
            {/* <InputDate
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
              wrapperClass={"mt-1"}
            /> */}
            
      <CustomDateSelector
        label="date_of_birth"
        inputWidth="100%"
        inputHeight="40px"
        labelWidth="120px"
        value={fields?.date_of_birth}
        onChange={onChangeHandler}
        required={true}
        placeholder="YYYY/MM/DD"
      />
          </>
        )
            
            
            
            
            }
           {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <Input
                    id="phone" 
                    type="phone" 
                    name="phone"
                    value={fields?.phone} 
                    onChange={onChangeHandler}
                    autoComplete="autoComplete"
                    placeholder="Enter phone number"
                    classInput=" w-full h-10 "
                    labelName={"Phone"}
                    required
                    disabled={editProfile}
                  />}
                 {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <SelectHtml
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
                  />}
                {   showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: addEmployee && <Password
                    label="Password"
                    id="password"
                    name="password"
                    value={fields?.password}
                    onChange={onChangeHandler}
                    placeholder={"Enter the password"}
                    classInput=" w-full  h-10 "
                    wrapperClass=""
                    required="required"
                    autoComplete="autoComplete"
                  />}
                  {   showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: addEmployee && <InputDate
                    id="employment_end_date" 
                    type="date" 
                    name="employment_end_date"
                    value={fields?.employment_end_date} 
                    onChange={onChangeHandler}
                    autoComplete="autoComplete"
                    placeholder="Enter date of birth"
                    classInput=" w-full h-10 "
                    labelName={"Employment End Date"}
                  />}
                 {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: addEmployee && <Input
                    id="salary" 
                    type="text" 
                    name="salary"
                    value={fields?.salary} 
                    onChange={onChangeHandler}
                    autoComplete="autoComplete"
                    placeholder="Enter salary"
                    classInput=" w-full h-10 "
                    labelName={"Salary"}
                  />}
                  {   showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: addEmployee && <InputDate
                    id="last_promotion_date" 
                    type="date" 
                    name="last_promotion_date"
                    value={fields?.last_promotion_date} 
                    onChange={onChangeHandler}
                    autoComplete="autoComplete"
                    placeholder="Enter date of birth"
                    classInput=" w-full h-10 "
                    labelName={"Last Promotion Date"}
                  />}
                  {   showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: addEmployee && <InputDate
                    id="next_performance_review" 
                    type="date" 
                    name="next_performance_review"
                    value={fields?.next_performance_review} 
                    onChange={onChangeHandler}
                    autoComplete="autoComplete"
                    placeholder="Enter date of birth"
                    classInput=" w-full h-10 "
                    labelName={"Next Performance Review"}
                  />}

                { showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>:  <div className={` ${editProfile && ` pointer-events-none `} `}>
                  <EmployeeDropDownNew
                     managerHandler={managerHandler}
                     currentValueData={{id:fields?.reporting_to?.id,name:fields?.reporting_to?.name,profileImage:fields?.reporting_to?.profile_image}}
                    labelName={"Reporting To"}
                  />
                </div>}
                {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <InputDate
                    id="joining_date" 
                    type="date" 
                    name="joining_date"
                    value={fields?.joining_date} 
                    required
                    onChange={onChangeHandler}
                    autoComplete="autoComplete"
                    placeholder="Select joining date"
                    classInput=" w-full h-10 "
                    labelName={"Joining Date"}
                    disabled={editProfile}
                  />}

{  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <SelectHtml
              id="type"
              name="user_role"
              value={fields?.user_role} 
              onChange={onChangeHandler}
              autoComplete="autoComplete"
              classInput=" w-full h-10 "
              labelName={"User Role"}
              optionData={[{id:"employee",name:"Employee"},{id:"administrator",name:"App Administrator"},{id:"manager",name:"Manager"}]}
              disabled={editProfile}

              placeholder={"Select user role"}
            />   } 
         {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={77}/>: <InputTextArea
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
          />}
         {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={77}/>: <InputTextArea
            id="about"
            name="about"
            value={fields?.about} 
            onChange={onChangeHandler}
            autoComplete="autoComplete"
            placeholder="Enter about"
            classInput=" w-full h-[77px] "
            labelName={"About"}
            disabled={editProfile}
          /> }
         {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>:  <div className={` ${editProfile && ` pointer-events-none ` }  text-xs font-normal leading-4 text-[#26212E] `}>
                                     
           <label className="text-sm block font-medium mb-1 outline-none">
           Language
            </label>
            <div className="bg-[#F8F7FC] border border-[#DCD6FF] p-2 rounded">
                                       {/* Display the list of skills */}
                                       <div className="flex flex-wrap items-center">
                                         {fields?.language.map((language, index) => (
                                           <span
                                             key={index}
                                             className="flex bg-[#E1DCFF] rounded items-center mb-2 mr-2 pl-2 pr-6 py-1 relative"
                                           >
                                             {language}
                                             <button
                                             type='button'
                                               className="bg-transparent border-0 absolute outline-none right-1"
                                               onClick={() => handleRemoveLanguage(language)} // Call remove function
                                             >
                                               <img
                                                 src={config.PUBLIC_URL +"/assets/images/amdital/cross_close_icon.svg"} 
                                                 alt="Remove"
                                                 className="h-3 w-3"
                                               />
                                             </button>
                                           </span>
                                         ))}
                                       </div>
                                       {/* Input field to add a new skill */}
                                       <div className="mt-2">
                                         <input
                                           type="text"
                                           className="bg-[#F8F7FC] border border-[#DCD6FF] p-2 rounded text-[#26212E] text-sm w-full font-normal leading-6 outline-none placeholder:text-[#9F9F9F]"
                                           placeholder="Add a new language"
                                           onKeyDown={handleAddLanguage} // Handle adding skill on Enter key
                                         />
                                       </div>
                                     </div>
                                   </div>     }                         

        </div>
        <div className='mt-10' >
        {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>:  <h2 className="text-[18px] text-lg font-semibold mb-4">
            Other Details
          </h2>}
          <div className='grid grid-cols-4 gap-x-[30px] gap-y-[25px]'>

          {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>:  <div  className={` ${editProfile && ` pointer-events-none`}`}>
              <label className='text-sm font-medium leading-6'>Login Allowed?</label>
              <div className='flex text-sm font-normal gap-4 items-center leading-[25px]'>
                <label className='flex cursor-pointer gap-1 items-center'>
                  <input
                    type="radio"
                    checked={fields?.login_allowed === true}
                    onChange={(e)=>{setFields({...fields,login_allowed:true})}}
                    className="appearance-none cursor-pointer w-4 h-4 rounded-full border-2 border-[#C4C0DC] outline-none 
                    checked:border-4 checked:border-[#806BFF] checked:bg-white"
                  />Yes
                </label>
                <label className='flex cursor-pointer gap-1 items-center'>
                 <input
                    type="radio"
                    checked={fields?.login_allowed === false }
                    onChange={(e)=>{setFields({...fields,login_allowed:false})}}
                    className="appearance-none cursor-pointer w-4 h-4 rounded-full border-2 border-[#C4C0DC] outline-none 
                    checked:border-4 checked:border-[#806BFF] checked:bg-white"
                  />
                  No
                </label>
              </div>

            </div>}

            {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <div className={` ${editProfile && ` pointer-events-none`}`}>
              <label className='text-sm font-medium leading-6'>Receive email notifications?</label>
              <div className='flex text-sm font-normal gap-4 items-center leading-[25px]'>
                <label className='flex cursor-pointer gap-1 items-center'>
                  <input
                    type="radio"
                    checked={fields?.receive_email_notifications === true}
                    onChange={(e)=>{setFields({...fields,receive_email_notifications:true})}}
                    className="appearance-none cursor-pointer w-4 h-4 rounded-full border-2 border-[#C4C0DC] outline-none 
                    checked:border-4 checked:border-[#806BFF] checked:bg-white"
                  />Yes
                </label>
                <label className='flex cursor-pointer gap-1 items-center'>
                 <input
                    type="radio"
                    checked={fields?.receive_email_notifications === false }
                    onChange={(e)=>{setFields({...fields,receive_email_notifications:false})}}
                    className="appearance-none cursor-pointer w-4 h-4 rounded-full border-2 border-[#C4C0DC] outline-none 
                    checked:border-4 checked:border-[#806BFF] checked:bg-white"
                  />
                  No
                </label>
              </div>

            </div>}

            {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <Input
              id="hourly_rate" 
              type="text" 
              name="hourly_rate"
              value={fields?.hourly_rate} 
              onChange={onChangeHandler}
              autoComplete="autoComplete"
              placeholder="$"
              classInput=" w-full h-10 "
              labelName={"Hourly Rate"}
             
              disabled={editProfile}
            />    }    
           {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <Input
                    id="member_id" 
                    type="text" 
                    name="member_id"
                    value={fields?.member_id} 
                    onChange={onChangeHandler}
                    autoComplete="autoComplete"
                    placeholder="Member Id"
                    classInput=" w-full h-10 "
                    labelName={"Member Id"}
                    allowWrapperClass={true}
                    required
                    disabled={editProfile}
                  />}

            

          </div>

          {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <div className='w-full mt-6'>
             <div className={` ${editProfile && ` pointer-events-none ` }  text-xs font-normal leading-4 text-[#26212E] `}>
                                    <label className="text-sm block font-medium mb-1 outline-none">
                                      Skills
                                    </label>
                                    <div className="bg-[#F8F7FC] border border-[#DCD6FF] p-2 rounded">
                                      {/* Display the list of skills */}
                                      <div className="flex flex-wrap items-center">
                                        {fields?.skills.map((skill, index) => (
                                          <span
                                            key={index}
                                            className="flex bg-[#E1DCFF] rounded items-center mb-2 mr-2 pl-2 pr-6 py-1 relative"
                                          >
                                            {skill}
                                            <button
                                              className="bg-transparent border-0 absolute outline-none right-1"
                                              onClick={() => handleRemoveSkill(skill)} // Call remove function
                                            >
                                              <img
                                                src={config.PUBLIC_URL +"/assets/images/amdital/cross_close_icon.svg"} 
                                                alt="Remove"
                                                className="h-3 w-3"
                                              />
                                            </button>
                                          </span>
                                        ))}
                                      </div>
                                      {/* Input field to add a new skill */}
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          className="bg-[#F8F7FC] border border-[#DCD6FF] p-2 rounded w-full outline-none"
                                          placeholder="Add a skill"
                                          onKeyDown={handleAddSkill} // Handle adding skill on Enter key
                                        />
                                      </div>
                                    </div>
                                  </div>
          </div>}

          <div className='grid grid-cols-4 gap-x-[30px] gap-y-[25px] mt-6'>

          {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <InputDate
              id="joining_date" 
              type="date" 
              name="joining_date"
              value={fields?.joining_date} 
              onChange={onChangeHandler}
              autoComplete="autoComplete"
              questionMarkIcon={true}
              classInput=" w-full h-10 "
              labelName={"Probation Start Date"}
              disabled={editProfile}
            />}
           {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <InputDate
              id="probation_end_date" 
              type="date" 
              name="probation_end_date"
              value={fields?.probation_end_date} 
              onChange={onChangeHandler}
              autoComplete="autoComplete"
              questionMarkIcon={true}
              classInput=" w-full h-10 "
              labelName={"Probation End Date"}
              disabled={editProfile}
            /> }  

{  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <InputDate
              id="notice_period_start_date" 
              type="date" 
              name="notice_period_start_date"
              value={fields?.notice_period_start_date} 
              onChange={onChangeHandler}
              autoComplete="autoComplete"
              questionMarkIcon={true}
              classInput=" w-full h-10 "
              labelName={"Notice Period Start Date "}
              disabled={editProfile}
            />}

{  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <InputDate
              id="notice_period_end_date" 
              type="date" 
              name="notice_period_end_date"
              value={fields?.notice_period_end_date} 
              onChange={onChangeHandler}
              autoComplete="autoComplete"
              questionMarkIcon={true}
              classInput=" w-full h-10 "
              labelName={"Notice Period End Date "}
              disabled={editProfile}
            />}

{  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>: <SelectHtml
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
              />  }

{  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>:  <SelectHtml
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
              />  }

{  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={"100%"}  height={40}/>:   <Input
                    id="emergency_contact" 
                    type="text" 
                    name="emergency_contact"
                    value={fields?.emergency_contact} 
                    onChange={onChangeHandler}
                    autoComplete="autoComplete"
                    placeholder="Enter emergency contact"
                    classInput=" w-full h-10 "
                    labelName={"Emergency Contact"}
                    required
                    disabled={editProfile}
                  />}
          </div>

        </div>
        

        {/* Buttons */}
       { !editProfile && <div className="flex flex-row gap-5 items-center mt-[35px]">
        {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>: <Button
            type="submit"
            buttonName={addEmployee ? "Save" :"Save"}
            buttonClassName = {` w-[160px] h-11 hover:bg-[#F36A3D]  outline-none bg-[#FF845C] text-base leading-3 font-semibold text-[#FFFFFF]  `}
            spanClassName = " border-[#FFFFFF] "
            isLoading= {buttonClicked}
          />   }             
          {/* input */}
          {  showSkeleton ? <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>: <Link to={`/employees`}><button  type='button' className="text-[#74689280] text-base font-bold hover:text-[#988FB1] leading-4">
            Cancel
          </button></Link>}
        </div>}
      </form>
    </div>
  );
};

export default AccountDetailsForm;
