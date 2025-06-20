import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SelectBoxDropdown from './SelectBoxDropdown';
import { useLocation } from 'react-router-dom';
import he from 'he';
import { useSnackbar } from "notistack";
import EmployeeDropDownNew from './EmployeeDropDownNew';

export default function FilterCompontent({onClose,employeeDropdown, timeTypeDropdown, projectDropdown, departmentDropdown,roleDropdown, statusDropdown, genderDropdown, employmentTypeDropdown,filterSubmitHandler}) {

  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = new URLSearchParams(location.search);
  const employment_type  = searchParams.get("employment_type");
  const department_type  = searchParams.get("department_type");
  const role_type  = searchParams.get("role_type");
  const status_type  = searchParams.get("status_type");
  const gender_type  = searchParams.get("gender_type");

  const employmentValue =  employment_type ? employment_type : "All";
  const departmentValue = department_type? department_type : "All";
  const roleValue = role_type ? role_type : "All";
  const statusValue = status_type ? status_type : "Active";
  const genderValue = gender_type ? gender_type : "All";

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
  
  const status_options = [
                        { id: 0.1, name: "Active", value: "Active" },
                        { id: 0.2, name: "Inactive", value: "Inactive" },
                      ]

  const gender_options = [
                        { id: 0.1, name: "All", value: "All" },
                        { id: 0.2, name: "Male", value: "Male" },
                        { id: 0.3, name: "Female", value: "Female" },
                        { id: 0.4, name: "Others", value: "Others" },
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
  })

  const statusTypeCurrent = status_options?.filter((item)=>{
    if(item?.name === statusValue){
      return item
    }
  })

  const genderTypeCurrent = gender_options?.filter((item)=>{
    if(item?.name === genderValue){
      return item
    }
  })


  const [filterValue,setFilterValue] = useState({
                                              employment_type:employmentValue,
                                              department_type:departmentValue,
                                              role_type: roleValue,
                                              status_type: statusValue,
                                              gender_type: genderValue,
                                          })

  const filterOnChangeHandler = (labelName,item)=>{

    switch(labelName){

      case "Department":
      setFilterValue({...filterValue,department_type:item?.value})
      break;

      case "Role":
      setFilterValue({...filterValue,role_type:item?.value})
      break;

      case "Status":
      setFilterValue({...filterValue,status_type:item?.value})
      break;

      case "Gender":
      setFilterValue({...filterValue,gender_type:item?.value})
      break;

      case "Employment Type":
      setFilterValue({...filterValue,employment_type:item?.value})
      break;

      default:
        setFilterValue({
          employment_type:employmentValue,
          department_type:departmentValue,
          role_type: roleValue,
          status_type: statusValue,
          gender_type: genderValue,
        })
    }


  }

  const applyHandler = (item)=>{
    // if( filterValue?.employment_type === "All" && filterValue?.department_type  === "All" && filterValue?.role_type ===  "All" && filterValue?.status_type === "Active" && filterValue?.gender_type === "All" ){
    //    const errorMessage = he.decode("Please select at least one option.");
    //           const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
    //           enqueueSnackbar(message, {
    //             variant: 'error',
    //             autoHideDuration: 1500,
    //             anchorOrigin: {
    //               vertical: 'top',
    //               horizontal: 'right',
    //             },
    //             style:{
    //               background:"#FF0000",
    //               size:"16px",
    //               fontWeight:"500",
    //               color:"#FFFFFF"
    //             },
    //           });    

    //   return false
    // }
    filterSubmitHandler(item)
  }

  const project_options = [
    { id: 0.1, name: "All", value: "All" },
    { id: 0.2, name: "Project name goes here", value: "Project name goes here" },
    { id: 0.3, name: "Project name goes here", value: "Project name goes here" },
    { id: 0.4, name: "Project name goes here", value: "Project name goes here" },
  ]

const type_off_options = [
    { id: 0.1, name: "All", value: "All" },
    { id: 0.2, name: "Sick", value: "Sick" },
    { id: 0.3, name: "Paid", value: "Paid" },
    { id: 0.4, name: "Casual", value: "Casual" },
    { id: 0.5, name: "Public Holiday", value: "Public Holiday" },
    { id: 0.6, name: "Maternity", value: "Maternity" },
    { id: 0.7, name: "Marriage", value: "Marriage" },
    { id: 0.8, name: "Unpaid", value: "Unpaid" },
    
  ]

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
                dropDownHeight = {230}
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
                dropDownClassName = { ` min-h-[150px] max-h-[150px] `}
                dropDownHeight = {130}
                options={role_options}
                current_value={roleTypeCurrent?.[0]?.name}
                current_id={roleTypeCurrent?.[0]?.id} 
                onChangeHandler={filterOnChangeHandler}              
              />
            }
            { 
             statusDropdown && <SelectBoxDropdown
                labelName="Status"
                value="Active"
                dropDownClassName = { ` min-h-[122px] max-h-[150px] `}
                dropDownHeight = {60}
                options={status_options}
                current_value={statusTypeCurrent?.[0]?.name}
                current_id={statusTypeCurrent?.[0]?.id} 
                onChangeHandler={filterOnChangeHandler}              
              />
            }
            { 
             genderDropdown && <SelectBoxDropdown
                labelName="Gender"
                value="Female"
                dropDownClassName = { ` min-h-[130px] max-h-[150px] `}
                dropDownHeight = {130}
                options={gender_options}
                current_value={genderTypeCurrent?.[0]?.name}
                current_id={genderTypeCurrent?.[0]?.id}
                onChangeHandler={filterOnChangeHandler}              
              />
            }
            { 
             employmentTypeDropdown && <SelectBoxDropdown
                labelName="Employment Type"
                value="All"
                dropDownClassName = { ` min-h-[180px] max-h-[200px] `}
                dropDownHeight = {180}
                options={employment_options}
                current_value={employmentTypeCurrent?.[0]?.name}
                current_id={employmentTypeCurrent?.[0]?.id}
                onChangeHandler={filterOnChangeHandler}              
              />
            }
            {
             employeeDropdown &&<EmployeeDropDownNew
             wrapperClass= {` bg-[#FFFFFF] `}
                                  //  managerHandler={managerHandler}
                                  //  currentValueData={{id:fields?.reporting_to?.id,name:fields?.reporting_to?.name,profileImage:fields?.reporting_to?.profile_image}}
                labelName={"Members"}
                                />
            }

            { 
                    projectDropdown &&        <SelectBoxDropdown
                            labelName="Project"
                            current_value={project_options?.[0]?.name}
                            current_id={project_options?.[0]?.id} 
                            dropDownClassName = { ` min-h-[130px] max-h-[150px] `}
                            dropDownHeight = {130}
                            options={project_options}
                            onChangeHandler={filterOnChangeHandler}              
                          />
                        }
                        {  timeTypeDropdown &&
                         <SelectBoxDropdown
                            labelName="Time Off Types"
                            dropDownClassName = { ` min-h-[130px] max-h-[150px] `}
                            dropDownHeight = {130}
                            current_value={type_off_options?.[0]?.name}
                            current_id={type_off_options?.[0]?.id} 
                            options={type_off_options}
                            onChangeHandler={filterOnChangeHandler}              
                          />
                        }
          </div>
        </div>
        <div className=' flex justify-between gap-4 text-base font-semibold leading-4 tracking-[4%] mt-4  '>
          <div onClick={()=>{onClose()}} className=' border border-[#FF845C] h-10 w-full flex justify-center items-center rounded text-[#FF845C]  cursor-pointer'>Cancel</div>
          <div onClick={()=>{applyHandler(filterValue)}} className=' bg-[#FF845C] flex justify-center items-center w-full h-10 rounded  text-[#FFFFFF] cursor-pointer '>Apply</div>
        </div>
       </div>
   
   
   </>
  )
}
