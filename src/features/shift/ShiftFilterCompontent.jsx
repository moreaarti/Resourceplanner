import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import SelectBoxDropdown from '../emplyee/SelectBoxDropdown';
import EmployeeDropDownFilterNew from '../emplyee/EmployeeDropDownFilterNew';
import { useDispatch } from 'react-redux';
import { setEmployeeDropDownFilterValue } from '../../general/generalSlice';




export default function ShiftFilterCompontent({onClose, departmentDropdown,roleDropdown, employmentTypeDropdown,filterSubmitHandler}) {

  const employeeDropdownData = useSelector(store=>store?.general?.employee_dropdown_filter_value);

  const location = useLocation();
  const dispatch = useDispatch();
  
  const searchParams = new URLSearchParams(location.search);
  const employment_type  = searchParams.get("employment_type");
  const department_type  = searchParams.get("department_type");
  const role_type  = searchParams.get("role_type");
  const user_type = searchParams.get("user_type");

  const employmentValue =  employment_type ? employment_type : "All";
  const departmentValue = department_type? department_type : "All";
  const roleValue = role_type ? role_type : "All";
  const userEmail = user_type? user_type : "All";

  const settings_data  = useSelector(store => store?.general?.settingDropDown);

  
  const employment_options = settings_data?.employmentTypes?.nodes
  ? [{ id: 0.1, name: "All", value: "All" }, ...settings_data.employmentTypes.nodes.map(item => ({
      id: item?.employmentTypeId,
      name: item?.name,
      value: item?.name
    }))]
  : [{ id: 0.1, name: "All", value: "All" }];

  const role_options = [
                        { id: 0.1, name: "All", value: "All" },
                        { id: 0.2, name: "Admin", value: "Admin" },
                        { id: 0.3, name: "Employee", value: "Employee" },
                        { id: 0.4, name: "Manager", value: "Manager" }
                      ]

  const department_options = settings_data?.projectDepartments?.nodes
  ? [{ id: 0.1, name: "All", value: "All" }, ...settings_data.projectDepartments.nodes.map(item => ({
      id: item?.projectDepartmentId,
      name: item?.name,
      value: item?.name
    }))]
  : [{ id: 0.1, name: "All", value: "All" }];



  const employmentTypeCurrent = employment_options?.filter((item)=>{
    if(item?.name === employmentValue){
      return item
    }
  })

  const roleTypeCurrent = role_options?.filter((item)=>{
    if(item?.name === roleValue){
      return item
    }
  })

  const departmentTypeCurrent = department_options?.filter((item)=>{
    if(item?.name === departmentValue){
      return item
    }
  }); 
 

  const [filterValue,setFilterValue] = useState({
                                              employment_type:employmentValue,
                                              department_type:departmentValue,
                                              role_type: roleValue,
                                              user_type:userEmail,

                                          })

  const filterOnChangeHandler = (labelName,item)=>{

    switch(labelName){

      case "Department":
      setFilterValue({...filterValue,department_type:item?.value})
      break;

      case "Role":
      setFilterValue({...filterValue,role_type:item?.value})
      break;

      case "Employment Type":
      setFilterValue({...filterValue,employment_type:item?.value})
      break;
      case "User Type":
        setFilterValue({...filterValue,user_type:item?.value})
        break;

      default:
        setFilterValue({
          employment_type:employmentValue,
          department_type:departmentValue,
          role_type: roleValue,
          user_type:userEmail,
        })
    }


  }

  const applyHandler = (item)=>{
    filterSubmitHandler(item)
  }

  const  employeeHandler =(item)=>{
    if(item?.id === "all"){
      dispatch(setEmployeeDropDownFilterValue(item))
      filterOnChangeHandler("User Type",{item});
    }
    if(item?.id !== "all"){
      dispatch(setEmployeeDropDownFilterValue({ id:item?.userId, name:item?.firstName + " " + item?.lastName, profileImage:item?.profileImage,userDesignation:item?.userDesignation }));
      filterOnChangeHandler("User Type",{...item,value:item?.email});
    }
  }


  return (
   <>
       <div className=' bg-[#FFFFFF] flex  justify-between flex-col w-full h-full '>
        <div className=' flex flex-col gap-4 '>
          <div className=' text-[#26212E] text-base font-semibold leading-5 ' >Filters</div>
          <div className=' flex flex-col gap-4 '>
            { 
             departmentDropdown && <SelectBoxDropdown
                labelName="Department"
                dropDownClassName = { ` min-h-[190px] max-h-[230px] `}
                dropDownHeight = {300}
                options={department_options}
                current_value={departmentTypeCurrent?.[0]?.name}
                current_id={departmentTypeCurrent?.[0]?.id}  
                onChangeHandler={filterOnChangeHandler}            
              />
            }
            { 
             roleDropdown && <SelectBoxDropdown
                labelName="Role"
                value="Manager"
                dropDownClassName = { ` min-h-[130px] max-h-[150px] `}
                dropDownHeight = {300}
                options={role_options}
                current_value={roleTypeCurrent?.[0]?.name}
                current_id={roleTypeCurrent?.[0]?.id} 
                onChangeHandler={filterOnChangeHandler}              
              />
            }
            
            { 
             employmentTypeDropdown && <SelectBoxDropdown
                labelName="Employment Type"
                value="All"
                dropDownClassName = { ` min-h-[180px] max-h-[200px] `}
                dropDownHeight = {300}
                options={employment_options}
                current_value={employmentTypeCurrent?.[0]?.name}
                current_id={employmentTypeCurrent?.[0]?.id}
                onChangeHandler={filterOnChangeHandler}              
              />
            }
            { 
             employmentTypeDropdown && <EmployeeDropDownFilterNew
                managerHandler={employeeHandler}
                labelName="Employee"
                selectPlaceholder="Select employee"
                searchPlaceholder="Search"
                currentValueData={employeeDropdownData}            
                wrapperClass={" min-h-8 !bg-[#FFFFFF] "}
            />
            }
          </div>
        </div>
        <div className=' flex justify-between gap-4 text-base font-semibold leading-4 tracking-[4%] mt-4  '>
          <div onClick={()=>{onClose();
          dispatch(setEmployeeDropDownFilterValue({id: "all",name: "All" ,profileImage: "",userDesignation:"All"}))
          }} className=' border border-[#FF845C] h-10 w-full flex justify-center items-center rounded text-[#FF845C]  cursor-pointer'>Cancel</div>
          <div onClick={()=>{applyHandler(filterValue)}} className=' bg-[#FF845C] flex justify-center items-center w-full h-10 rounded  text-[#FFFFFF] cursor-pointer '>Apply</div>
        </div>
       </div>
   
   
   </>
  )
}
