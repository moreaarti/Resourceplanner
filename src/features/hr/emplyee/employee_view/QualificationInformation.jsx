import React, { useEffect, useState } from 'react'
import config from '../../../../config/config';
import ButtonNew from '../../../../components/elements/amdital/ButtonNew';
import EmployeeImagePreview from './EmployeeImagePreview';
import SelectHtml from '../../../../components/elements/amdital/SelectHtml';
import Input from '../../../projects_new/Reusable/Input';
import CustomDateSelector from '../../../../components/elements/amdital/CustomDate/CustomDateInput';
import VaildationSelectionBox from '../../../../components/elements/amdital/VaildationSelectionBox';
import { fileDeleteHandler, fileUploadedHandler, getSingalEmployeeData, sourceUrlConvertToImageName, updateQualificationInformation } from './employeeFunction';
import { useSnackbar } from 'notistack';
import EmployeeImageEdit from './EmployeeImageEdit';
import EmployeeInputAttachementFile from './EmployeeInputAttachementFile';

export default function QualificationInformation({employee_data,params_id, attachments_data,editComponent}){

  const [editView,setEditView] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [buttonClicked,setButtonClicked]= useState(false);

  const [qualification,setQualification] = useState([{
    id:1,
    degree:"",
    institute:"",
    from_year:"",
    to_year:"",
  }]);

  useEffect(()=>{
    if(employee_data?.qualification?.length > 0 ){
    const qualification_data = employee_data?.qualification?.map((item,index)=>{
      return {...item,id:index+1}
    });
    setQualification(qualification_data);
  }
  },[employee_data])


   const [validationError,setValidationError] = useState({fromYearArray:[],toYearArray:[]});

  const onSubmitHandler =async (e)=>{
    e.preventDefault();
    setButtonClicked(true);
    const from_date_emty = qualification?.filter(item => item?.from_year === "");
    if(from_date_emty?.length > 0){
      setValidationError(prevState => ({
        ...prevState,
        fromYearArray: from_date_emty?.map(item => item?.id)
      }));
      setButtonClicked(false);
      return false;
    }
    const to_date_emty = qualification?.filter(item => item?.to_year === "");
    if(to_date_emty?.length > 0){
      setValidationError(prevState => ({
        ...prevState,
        toYearArray: to_date_emty?.map(item => item?.id)
      }));
      setButtonClicked(false);
      return false;
    }
    const response = await updateQualificationInformation(params_id,qualification,enqueueSnackbar);
    const employee_data = await getSingalEmployeeData(params_id);
          if( response?.data?.data?.updateUser){
            setEditView(!editView)
          }
          setButtonClicked(false);
  }

  const onChangeHandler= (e, id) => {
    const { name, value } = e.target;
    setQualification(prevFields =>
      prevFields.map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };


  const addEducation =(count)=>{

      setQualification([...qualification,{
        id:count+1,
        degree:"",
        institute:"",
        from_year:"",
        to_year:"",
      }])
  }

  const removeItem = (id)=>{
      const qualification_data =  qualification?.filter(value => value?.id !== id);
      setQualification(qualification_data);
  }

  const onChangeFromHandelr = (e, id) => {
    const { name, value } = e.target;
    setQualification(prevFields =>
      prevFields.map(item =>
        item.id === id ? { ...item,from_year: value } : item
      )
    );
  };

  const onChangeToHandelr = (e, id) => {
    const { name, value } = e.target;
    setQualification(prevFields =>
      prevFields.map(item =>
        item.id === id ? { ...item,to_year: value } : item
      )
    );
  };

     useEffect(()=>{
       if(validationError?.toYearArray || validationError?.fromYearArray ){
         setTimeout(()=>{
          setValidationError({...validationError,toYearArray:false,fromYearArray:false});
         },700)
       }
     },[validationError]);


       const [qualificationAttachments,setQualificationAttachments]=useState([]);

     
       useEffect(()=>{
         if(attachments_data?.edges?.length > 0){
           const qualificationData = attachments_data?.edges?.filter((image)=>{
             if(image?.node?.altText === "qualification"){
               return image
             }
           });
           setQualificationAttachments(qualificationData)
         }
     
       },[attachments_data])

  return (
    <>
      <div className=' relative border border-[#E1DCFF] rounded p-6  w-full '>
        <div className=' flex justify-between items-center'>
          <div  className=' text-[20px] font-semibold text-[#26212E] tracking-[0%] leading-[100%] flex  whitespace-nowrap '>
            3.<span className=' ml-2'>Qualifications</span>
          </div>
         { !editView && <img onClick={()=>{setEditView(!editView)}} src={config.PUBLIC_URL + "/assets/images/amdital/edit_icon_gray_color.svg"} alt='' className={`  cursor-pointer ${ !editComponent && ` hidden`} `}/>}
        </div>
        <div className=' mt-6 '>
          {
            editView ? 
            <div> 
              <form onSubmit={onSubmitHandler}>
                <div className=' relative '>
                  <div className=' relative w-full flex flex-col gap-6 mt-6 '>
                    {
                      qualification?.map((item,index)=>{
                        return <>
                               <div className={` w-full   ${index !== 0 ? ` block `: ` hidden`}`}>
                                  <hr className=' w-full '/>
                                   <div className=' mt-2 w-full flex justify-end'>
                                    <img
                                        src={
                                          config.PUBLIC_URL +
                                          "/assets/images/amdital/onboarding/close_icon.svg"
                                        }
                                        alt=""
                                        className=' w-fit h-fit  cursor-pointer '
                                        onClick={()=>{removeItem(item?.id)}}
                                      />
                                   </div>
                                                          
                                </div>
                              <div className=' relative w-full grid  grid-cols-3 min-[1400px]:grid-cols-3 gap-x-8 gap-y-6 '>
                                
                                <SelectHtml
                                    id="degree"
                                    name="degree"
                                    value={item?.degree} 
                                    onChange={(e)=>{onChangeHandler(e,item?.id)}}
                                    autoComplete="autoComplete"
                                    classInput=" w-full h-10 "
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
                                  />  
                                 
                                  <div className=' relative w-full  '>
                                    <CustomDateSelector
                                          label=" From Year"
                                          inputWidth="100%"
                                          inputHeight="40px"
                                          labelWidth="120px"
                                          value={item?.from_year ? item?.from_year : item?.from_year}
                                          onChange={(e)=>{onChangeFromHandelr(e,item?.id)}}
                                          required={true}
                                          placeholder="YYYY/MM/DD"
                                        /> 
                                { validationError?.fromYearArray?.length > 0 && validationError?.fromYearArray?.includes(item?.id) && (
                                      <div className="absolute flex justify-center w-full">
                                              <VaildationSelectionBox />
                                      </div>
                                )}
                          </div>
                          <div className=' relative w-full  '>
                            <CustomDateSelector
                                  label="To Year"
                                  inputWidth="100%"
                                  inputHeight="40px"
                                  labelWidth="120px"
                                  value={item?.from_year ? item?.to_year : item?.from_year}
                                  onChange={(e)=>{onChangeToHandelr(e,item?.id)}}
                                  required={true}
                                  placeholder="YYYY/MM/DD"
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
                                  onChange={(e)=>{onChangeHandler(e,item?.id)}}
                                  autoComplete="autoComplete"
                                  placeholder="Enter institute"
                                  classInput=" w-full h-10 "
                                  labelName={"Institute"}
                                  required={"required"}
                                />                                             

                              </div>
                        </>
                      })
                    }

                  {
                    <div className=' w-full relative mt-6 '>
                      <div className=' w-full relative grid grid-cols-2 gap-8'>
                        {
                          qualificationAttachments?.map((item)=>{
                            return <EmployeeImageEdit onDelete={()=>{fileDeleteHandler(item?.node?.mediaItemId,params_id)}}  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                            fileUrl={item?.node?.mediaItemUrl}  />
                          })
                        }
                        <EmployeeInputAttachementFile name="qualification" onChange={(e)=>{fileUploadedHandler(e,params_id,"qualification",enqueueSnackbar)}}/>
                      </div>
                          
                    </div>
                  }
                    <button
                    type='button'
                      onClick={()=>{addEducation(qualification?.length)}}
                      className="mx-auto flex w-fit items-center gap-2 text-base font-bold leading-5 text-[#806BFF]"
                    >
                      <div className="flex size-[18px] items-center justify-center rounded-full border-[1.5px] border-[#806BFF] text-sm font-semibold leading-[18px] text-[#806BFF]">
                        +{" "}
                      </div>
                      Add Another Education
                    </button>

                  </div>
                </div>
                <div className=' w-full flex justify-end items-center gap-4 '>
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
            <div className=' relative'> 
              {
               employee_data?.qualification?.length > 0 ? employee_data?.qualification?.map((item)=>{
                  return  <div className=' relative w-full mt-6 '>
                  <div className=' mt-2 relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                    <div className=' relative flex flex-col gap-1 '>
                      <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Qualification</div>
                      <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{item?.degree || "N/A"}</div>
                    </div>
                    <div className=' relative flex flex-col gap-1 '>
                      <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>From Year</div>
                      <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{item?.from_year || "N/A"}</div>
                    </div>
                    <div className=' relative flex flex-col gap-1 '>
                      <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>To Year</div>
                      <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{item?.to_year || "N/A"}</div>
                    </div>
                    <div className=' relative flex flex-col gap-1 '>
                      <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Institute</div>
                      <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate  capitalize'>{item?.institute  || "N/A"}</div>
                    </div>
                  </div>
                </div>
                }) : <div className=' relative w-full mt-6 text-center '>
                    No Data Available
              </div>
                
              }
              { qualificationAttachments?.length > 0 && <div className=' mt-6 w-full relative grid grid-cols-2 gap-8 '>
                    {
                      qualificationAttachments?.map((item)=>{
                        return <EmployeeImagePreview  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                        fileUrl={item?.node?.mediaItemUrl}  />
                      })
                    }
                </div>}
            </div>
          }

        </div>
      </div>
    </>
  )
}