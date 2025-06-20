import React, { useEffect, useState } from 'react'
import config from '../../../../config/config'
import ButtonNew from '../../../../components/elements/amdital/ButtonNew'
import Input from '../../../../components/elements/amdital/Input';
import SelectHtml from '../../../../components/elements/amdital/SelectHtml';
import CustomDateSelector from '../../../../components/elements/amdital/CustomDate/CustomDateInput';
import VaildationSelectionBox from '../../../../components/elements/amdital/VaildationSelectionBox';
import { useSelector } from 'react-redux';
import { countryNameDisplay, getSingalEmployeeData, updatePersonalInformation } from './employeeFunction';
import { useSnackbar } from 'notistack';

export default function PersonalInformationView({employee_data,params_id,editComponent}) {

   const storeRedux =useSelector(store =>store);

   const { enqueueSnackbar } = useSnackbar();

  const countryReduxData = storeRedux?.general.country_data

  const countryOptions = countryReduxData?.map((item)=>{
    return {id:item?.code,name:item?.name}
  });

  const [editView,setEditView] = useState(false);

  const [buttonClicked,setButtonClicked]= useState(false);

  const [fields,setFields] = useState({
    bloodGroup:employee_data?.bloodGroup || "",
    personalEmail:employee_data?.personalEmail || "",
    fatherName:employee_data?.fatherName || "",
    maritalStatus:employee_data?.maritalStatus || "",
    marriageDate:employee_data?.marriageDate || "",
    spouseName:employee_data?.spouseName || "",
    userCountry:employee_data?.userCountry|| "",
    countryOfOrigin:employee_data?.countryOfOrigin || "",
    userNationality:employee_data?.userNationality || "",
    isInternationalEmployee:employee_data?.isInternationalEmployee ? true : false ,
    isPhysicallyChallenged:employee_data?.isPhysicallyChallenged ? true : false ,
    disabilityType:employee_data?.disabilityType || "",
    emergencyContactName:employee_data?.emergencyContactName || "",
    emergencyContact:employee_data?.emergencyContact || "",
    emergencyContactRelationship:employee_data?.emergencyContactRelationship || "",
  });
  const [validationError,setValidationError]=useState({marriageDateValidation:false});

  const onSubmitHandler =async (e)=>{
    e.preventDefault();
    setButtonClicked(true);

    if( fields?.maritalStatus ==="Married" && fields?.marriageDate === ""){
        setValidationError({...validationError,marriageDateValidation:true});
        setButtonClicked(false)
        return false
    }
    
    const response = await updatePersonalInformation(params_id,fields,enqueueSnackbar);
    const employee_data = await getSingalEmployeeData(params_id);
    if( response?.data?.data?.updateUser){
            setEditView(!editView)
          }
          setButtonClicked(false);

  }

  useEffect(()=>{

   setFields({
      bloodGroup:employee_data?.bloodGroup || "",
      personalEmail:employee_data?.personalEmail || "",
      fatherName:employee_data?.fatherName || "",
      maritalStatus:employee_data?.maritalStatus || "",
      marriageDate:employee_data?.marriageDate || "",
      spouseName:employee_data?.spouseName || "",
      countryOfOrigin:employee_data?.countryOfOrigin || "",
      userNationality:employee_data?.userNationality || "",
      isInternationalEmployee:employee_data?.isInternationalEmployee ? true : false ,
      isPhysicallyChallenged:employee_data?.isPhysicallyChallenged ? true : false ,
      disabilityType:employee_data?.disabilityType || "",
      emergencyContactName:employee_data?.emergencyContactName || "",
      emergencyContact:employee_data?.emergencyContact || "",
      emergencyContactRelationship:employee_data?.emergencyContactRelationship || "",
    })
  },[employee_data])


  const onChangeHandler =(e)=>{
    const {name,value} = e.target;
    setFields({...fields,[name]:value})
  }


     useEffect(()=>{
       if(validationError?.marriageDateValidation){
         setTimeout(()=>{
          setValidationError({...validationError,marriageDateValidation:false});
         },700)
       }
     },[validationError]);


  const martialStatusHandler =(e)=>{
      const {name, value} = e.target;
      setFields({...fields,maritalStatus:value,marriageDate:"",spouseName:""});
  }

  const isPhysicallyChallengedHandler = (e)=>{
    const {name, value} = e.target;
    setFields({...fields,isPhysicallyChallenged:value === "true" ? true : false,disabilityType:""});
  };


 const  countryNameDisplay = (countryCode)=>{
      if(countryCode){
          const countryName =countryReduxData?.length > 0 ? countryReduxData?.filter(item=>item?.code === countryCode)?.map(item=>item?.name): ["N/A"]
          return countryName?.[0]
      }
      return "N/A";
  }

  return (
    <>
      <div className=' relative border border-[#E1DCFF] rounded p-6  w-full '>
        <div className=' flex justify-between items-center'>
          <div  className=' text-[20px] font-semibold text-[#26212E] tracking-[0%] leading-[100%] flex  whitespace-nowrap '>
            1.<span className=' ml-2'>Personal Information</span>
          </div>
         {  !editView   && <img onClick={()=>{setEditView(!editView)}} src={config.PUBLIC_URL + "/assets/images/amdital/edit_icon_gray_color.svg"} alt='' 
         className={`  cursor-pointer ${ !editComponent && ` hidden`} `}/>}
        </div>
        <div className=' mt-6 '>
          {
            editView ? 
            <div> 
              <form onSubmit={onSubmitHandler}>
                <div className=' relative'>
                  <div className=' relative'>
                    <div className=' relative w-full grid  grid-cols-2 min-[1400px]:grid-cols-3 gap-x-8 gap-y-6 mt-6 '>
                      <SelectHtml
                        id="bloodGroup"
                        name="bloodGroup"
                        value={fields?.bloodGroup} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        classInput=" w-full h-10 "
                        labelName={"Blood Group"}
                        optionData={[
                          { id: "A+", name: "A+" },
                          { id: "A-", name: "A-" },
                          { id: "B+", name: "B+" },
                          { id: "B-", name: "B-" },
                          { id: "AB+", name: "AB+" },
                          { id: "AB-", name: "AB-" },
                          { id: "O+", name: "O+" },
                          { id: "O-", name: "O-" },
                        ]}
                        required
                        placeholder={"Select blood group"}
                      />      
                      <Input
                          id="personalEmail" 
                          type="email" 
                          name="personalEmail"
                          value={fields?.personalEmail} 
                          onChange={onChangeHandler}
                          autoComplete="autoComplete"
                          placeholder="Enter your personal email"
                          classInput=" w-full h-10 "
                          labelName={"Personal Email"}
                          required={"required"}
                        />                
                        <Input
                          id="fatherName" 
                          type="text" 
                          name="fatherName"
                          value={fields?.fatherName} 
                          onChange={onChangeHandler}
                          autoComplete="autoComplete"
                          placeholder="Enter your father name"
                          classInput=" w-full h-10 "
                          labelName={"Father Name"}
                          required={"required"}
                        />
                         <SelectHtml
                        id="maritalStatus"
                        name="maritalStatus"
                        value={fields?.maritalStatus} 
                        onChange={martialStatusHandler}
                        autoComplete="autoComplete"
                        classInput=" w-full h-10 "
                        labelName={"Marital Status"}
                        optionData={[
                          { id: "Single", name: "Single" },
                          { id: "Married", name: "Married" },
                          { id: "Divorced", name: "Divorced" },
                          { id: "Widowed", name: "Widowed" },
                          { id: "Separated", name: "Separated" },
                        ]}
                        required
                        placeholder={"Select marital status"}
                      />  
                      {
                        fields?.maritalStatus === "Married" && <div className=' relative w-full  '>
                          <CustomDateSelector
                                label="Marriage Date"
                                inputWidth="100%"
                                inputHeight="40px"
                                labelWidth="120px"
                                value={fields?.marriageDate}
                                onChange={(e)=>{setFields({...fields,marriageDate:e?.target?.value})}}
                                required={true}
                                placeholder="YYYY/MM/DD"
                              /> 
                          { validationError?.marriageDateValidation && <div className=" absolute flex justify-center  w-full ">
                                            <VaildationSelectionBox />
                                          </div>}
                        </div>  
                      }  
                      {
                        fields?.maritalStatus === "Married" && 
                            <Input
                              id="spouseName" 
                              type="text" 
                              name="spouseName"
                              value={fields?.spouseName} 
                              onChange={onChangeHandler}
                              autoComplete="autoComplete"
                              placeholder="Spouse name"
                              classInput=" w-full h-10 "
                              labelName={"Spouse Name"}
                              allowWrapperClass={true}
                              required
                            />  
                      } 
                        <SelectHtml
                        id="countryOfOrigin"
                        name="countryOfOrigin"
                        value={fields?.countryOfOrigin} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        classInput=" w-full h-10 "
                        labelName={"Country Of Origin"}
                        optionData={countryOptions}
                        required
                        placeholder={"Select country of origin"}
                      /> 
                         <SelectHtml
                        id="userNationality"
                        name="userNationality"
                        value={fields?.userNationality} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        classInput=" w-full h-10 "
                        labelName={"Nationality"}
                        optionData={countryOptions}
                        required
                        placeholder={"Select nationality"}
                      />
                      <SelectHtml
                        id="isInternationalEmployee"
                        name="isInternationalEmployee"
                        value={fields?.isInternationalEmployee} 
                        onChange={(e)=>{setFields({...fields,isInternationalEmployee:e.target?.value === "true" ? true : false})}}
                        autoComplete="autoComplete"
                        classInput=" w-full h-10 "
                        labelName={"International Employee"}
                        optionData={[
                          {
                            id: false,
                            name: "No",
                          },
                          {
                            id: true,
                            name: "Yes",
                          },
                        ]}
                        required
                        placeholder={"Select employee international"}
                      />
                       <SelectHtml
                        id="isPhysicallyChallenged"
                        name="isPhysicallyChallenged"
                        value={fields?.isPhysicallyChallenged} 
                        onChange={isPhysicallyChallengedHandler}
                        autoComplete="autoComplete"
                        classInput=" w-full h-10 "
                        labelName={"Physically Challenged"}
                        optionData={[
                          {
                            id: false,
                            name: "No",
                          },
                          {
                            id: true,
                            name: "Yes",
                          },
                        ]}
                        required
                        placeholder={"Select Physically Challenged"}
                      />
                      {fields?.isPhysicallyChallenged &&<SelectHtml
                        disabled={fields?.isPhysicallyChallenged=== false || fields?.isPhysicallyChallenged=== ""}
                        id="disabilityType"
                        name="disabilityType"
                        value={fields?.disabilityType} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        classInput=" w-full h-10 "
                        labelName={"Disability Type"}
                        optionData={[
                          { id: "Physical Disability", name: "Physical Disability" },
                          { id: "Visual Impairment", name: "Visual Impairment" },
                          { id: "Hearing Impairment", name: "Hearing Impairment" },
                          { id: "Intellectual Disability", name: "Intellectual Disability" },
                          { id: "Autism Spectrum Disorder", name: "Autism Spectrum Disorder" },
                          { id: "Mental Health Condition", name: "Mental Health Condition" },
                          { id: "Learning Disability", name: "Learning Disability" },
                          { id: "Other", name: "Other" },
                        ]}
                        required
                        placeholder={"Select disability type"}
                      /> }
                      <Input
                          id="emergencyContactName" 
                          type="text" 
                          name="emergencyContactName"
                          value={fields?.emergencyContactName} 
                          onChange={(e) => {
                            const { name, value } = e.target;
                              const onlyText = value.replace(/[0-9]/g, ''); // remove numbers
                              setFields((prev) => ({ ...prev, [name]: onlyText }));
                          }}
                          autoComplete="autoComplete"
                          placeholder="Enter emergency contact name"
                          classInput=" w-full h-10 "
                          labelName={"Emergency Contact Name"}
                          required={"required"}
                        />
                        <Input
                          id="emergencyContact" 
                          type="phone"
                          name="emergencyContact"
                          value={fields?.emergencyContact} 
                          onChange={(e)=>{
                              const { name, value } = e.target;
                              if (name === 'emergencyContact') {
                                const onlyNumbers = value.replace(/\D/g, ''); // remove non-digits
                                setFields((prev) => ({ ...prev, [name]: onlyNumbers }));
                              }
                          }}
                          autoComplete="autoComplete"
                          placeholder="Enter emergency contact number" 
                          classInput=" w-full h-10 "
                          labelName={"Emergency Contact Number"}
                          required={"required"}
                          minLength={10}
                          maxLength={10}
                        />
                         <SelectHtml
                        id="emergencyContactRelationship"
                        name="emergencyContactRelationship"
                        value={fields?.emergencyContactRelationship} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        classInput=" w-full h-10 "
                        labelName={"Emergency Contact Relationship"}
                        optionData={ [
                          { id: "Father", name: "Father" },
                          { id: "Mother", name: "Mother" },
                          { id: "Spouse", name: "Spouse" },
                          { id: "Sibling", name: "Sibling" },
                          { id: "Friend", name: "Friend" },
                          { id: "Guardian", name: "Guardian" },
                          { id: "Relative", name: "Relative" },
                          { id: "Colleague", name: "Colleague" },
                          { id: "Other", name: "Other" },
                        ]}
                        required
                        placeholder={"Select relationship "}
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
            <div className=' relative w-full '> 
              <div className=' relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Blood Group</div>
                  <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.bloodGroup || "-"}</div>
                </div>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Personal Email</div>
                  <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.personalEmail || "-"}</div>
                </div>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Father Name</div>
                  <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.fatherName || "-"}</div>
                </div>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Marital Status</div>
                  <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.maritalStatus || "-"}</div>
                </div>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Marriage Date</div>
                  <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.marriageDate || "-"}</div>
                </div>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Spouse Name</div>
                  <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.spouseName || "-"}</div>
                </div>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Country Of Origin</div>
                  {}
                  <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{countryNameDisplay(employee_data?.countryOfOrigin)  || "-"}</div>
                </div>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Nationality</div>
                  <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{ countryNameDisplay(employee_data?.userNationality)  || "-"}</div>
                </div>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>International Employee</div>
                  <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.isInternationalEmployee ? "Yes" : "No" || "-"}</div>
                </div>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Physically Challenged</div>
                  <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.isPhysicallyChallenged ? "Yes": "No" || "-"}</div>
                </div>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Disability Type</div>
                  <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.disabilityType || "-"}</div>
                </div>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Emergency Contact Name</div>
                  <div className=' text-[#26212E] block   whitespace-nowrap truncate text-base font-medium tracking-[0%] leading-[100%] '>{employee_data?.emergencyContactName || "-"}</div>
                </div>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Emergency Contact Mobile</div>
                  <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.emergencyContact || "-"}</div>
                </div>
                <div className=' relative flex flex-col gap-1 '>
                  <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] whitespace-nowrap '>Emergency Contact Relationship</div>
                  <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.emergencyContactRelationship || "-"}</div>
                </div>

              </div>
              
            </div>
          }

        </div>
      </div>
    </>
  )
}