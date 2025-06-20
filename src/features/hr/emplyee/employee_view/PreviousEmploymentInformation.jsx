import React, { useEffect, useState } from 'react'
import ButtonNew from '../../../../components/elements/amdital/ButtonNew';
import config from '../../../../config/config';
import EmployeeImagePreview from './EmployeeImagePreview';
import SelectHtml from '../../../../components/elements/amdital/SelectHtml';
import CustomDateSelector from '../../../../components/elements/amdital/CustomDate/CustomDateInput';
import Input from '../../../projects_new/Reusable/Input';
import InputTextArea from '../../../../components/elements/amdital/InputTextArea';
import VaildationSelectionBox from '../../../../components/elements/amdital/VaildationSelectionBox';
import { fileDeleteHandler, fileUploadedHandler, getSingalEmployeeData, sourceUrlConvertToImageName, updatePreviousEmploymentInformation } from './employeeFunction';
import { useSnackbar } from 'notistack';
import EmployeeInputAttachementFile from './EmployeeInputAttachementFile';
import EmployeeImageEdit from './EmployeeImageEdit';

export default function PreviousEmploymentInformation({employee_data,params_id,editComponent,attachments_data}){

  const [editView,setEditView] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [buttonClicked,setButtonClicked]= useState(false);

  const [previousEmployement,setPreviousEmployement] = useState([{
    id:1,
    company_name:"",
    designation:"",
    from_date:"",
    to_date:"",
    company_address:""
  }]);

    useEffect(()=>{
      if( employee_data?.previousEmployment?.length > 0 ){
      const previous_employement_data = employee_data?.previousEmployment
      ?.map((item,index)=>{
        return {...item,id:index+1}
      });
      setPreviousEmployement(previous_employement_data);
    }
    },[employee_data])

   const [validationError,setValidationError] = useState({fromYearArray:[],toYearArray:[]});

  const onSubmitHandler =async (e)=>{
    e.preventDefault();
    setButtonClicked(true);
    const from_date_emty = previousEmployement?.filter(item => item?.from_date === "");
    if(from_date_emty?.length > 0){
      setValidationError(prevState => ({
        ...prevState,
        fromYearArray: from_date_emty?.map(item => item?.id)
      }));
      setButtonClicked(false);
      return false;
    }
    const to_date_emty = previousEmployement?.filter(item => item?.to_date === "");

    if(to_date_emty?.length > 0){
      setValidationError(prevState => ({
        ...prevState,
        toYearArray: to_date_emty?.map(item => item?.id)
      }));
      setButtonClicked(false);
      return false;
    }
    const response = await updatePreviousEmploymentInformation(params_id,previousEmployement,enqueueSnackbar);
    const employee_data = await getSingalEmployeeData(params_id);
    if( response?.data?.data?.updateUser){
        setEditView(!editView)
    }
    setButtonClicked(false);
  }

  const onChangeHandler= (e, id) => {
    const { name, value } = e.target;
    setPreviousEmployement(prevFields =>
      prevFields.map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const removeItem = (id)=>{
      const qualification_data =  previousEmployement?.filter(value => value?.id !== id);
      setPreviousEmployement(qualification_data);
  }

  const onChangeFromHandelr = (e, id) => {
    const { name, value } = e.target;
    setPreviousEmployement(prevFields =>
      prevFields.map(item =>
        item.id === id ? { ...item,from_date: value } : item
      )
    );
  };

  const onChangeToHandelr = (e, id) => {
    const { name, value } = e.target;
    setPreviousEmployement(prevFields =>
      prevFields.map(item =>
        item.id === id ? { ...item,to_date: value } : item
      )
    );
  };

  const addEducation =(count)=>{

    setPreviousEmployement([...previousEmployement,{
        id:count+1,
        company_name:"",
        designation:"",
        from_date:"",
        to_date:"",
        company_address:""
      }])
  }

       useEffect(()=>{
         if(validationError?.toYearArray || validationError?.fromYearArray ){
           setTimeout(()=>{
            setValidationError({...validationError,toYearArray:false,fromYearArray:false});
           },700)
         }
       },[validationError]);


       const [previousEmployementAttachments,setPreviousEmployementAttachments]=useState([]);

     
       useEffect(()=>{
         if(attachments_data?.edges?.length > 0){
           const attachmentData = attachments_data?.edges?.filter((image)=>{
             if(image?.node?.altText === "previousEmployement"){
               return image
             }
           });
           setPreviousEmployementAttachments(attachmentData)
         }
     
       },[attachments_data])

  return (
    <>
      <div className=' relative border border-[#E1DCFF] rounded p-6  w-full '>
        <div className=' flex justify-between items-center'>
          <div  className=' text-[20px] font-semibold text-[#26212E] tracking-[0%] leading-[100%] flex  whitespace-nowrap '>
            4.<span className=' ml-2'>Previous Employment</span>
          </div>
         { !editView && <img onClick={()=>{setEditView(!editView)}} src={config.PUBLIC_URL + "/assets/images/amdital/edit_icon_gray_color.svg"} alt='' className={`  cursor-pointer ${ !editComponent && ` hidden`} `}/>}
        </div>
        <div className=' mt-6 '>
          {
            editView ? 
           <div> 
                         <form onSubmit={onSubmitHandler}>
                           <div className=' relative '>
                             <div className=' relative w-full flex flex-col gap-6  mt-6 '>
                               {
                                 previousEmployement?.map((item,index)=>{
                                   return <>
                                        <div className=' gap-6'>
                                          <div className={` w-full `}>
                                            <div className=' mb-2 text-base font-medium  leading-[100%] tracking-[0%]'>{" Previous Employment "+( index + 1)}</div>
                                            <div className={` w-full  ${index !== 0 ? ` block `: ` hidden`} `}>
                                             <hr className=' w-full '/>
                                              <div className=' mt-2 w-full flex justify-end '>
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
                                          </div>
                                         <div className='  relative w-full grid grid-cols-3 grid-rows-1 gap-x-8 gap-y-6 '>
                                             <Input
                                             id="company_name" 
                                             type="text" 
                                             name="company_name"
                                             value={item?.company_name} 
                                             onChange={(e)=>{onChangeHandler(e,item?.id)}}
                                             autoComplete="autoComplete"
                                             placeholder="Enter company name"
                                             classInput=" w-full h-10 "
                                             labelName={"Company Name"}
                                             required={"required"}
                                           /> 
                                            <Input
                                             id="designation" 
                                             type="text" 
                                             name="designation"
                                             value={item?.designation} 
                                             onChange={(e)=>{onChangeHandler(e,item?.id)}}
                                             autoComplete="autoComplete"
                                             placeholder="Enter designation"
                                             classInput=" w-full h-10 "
                                             labelName={"Designation"}
                                             required={"required"}
                                           /> 
                                             <div className=' relative w-full  '>
                                                <CustomDateSelector
                                                      label=" From Date"
                                                      inputWidth="100%"
                                                      inputHeight="40px"
                                                      labelWidth="120px"
                                                      value={item?.from_date}
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
                                            label="To Date"
                                            inputWidth="100%"
                                            inputHeight="40px"
                                            labelWidth="120px"
                                            value={item?.to_date}
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
                                         </div>
                                         <InputTextArea
                                                 id="company_address" 
                                                 type="text" 
                                                 name="company_address"
                                                 value={item?.company_address} 
                                                 onChange={(e)=>{onChangeHandler(e,item?.id)}}
                                                 autoComplete="autoComplete"
                                                 placeholder="Enter company address"
                                                 classInput=" w-full h-[77px] "
                                                 labelName={"Company Address"}
                                                 wrapperClass={"mt-6"}
                                                 required
                                               />
                                      </div>  
                                   </>
                                 })
                               }

                            {
                              <div className=' w-full relative mt-6 '>
                                        <div className=' w-full relative grid grid-cols-2 gap-8'>
                                          {
                                            previousEmployementAttachments?.map((item)=>{
                                              return <EmployeeImageEdit onDelete={()=>{fileDeleteHandler(item?.node?.mediaItemId,params_id)}}  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                                              fileUrl={item?.node?.mediaItemUrl}  />
                                            })
                                          }
                                          <EmployeeInputAttachementFile name="qualification" onChange={(e)=>{fileUploadedHandler(e,params_id,"previousEmployement",enqueueSnackbar)}}/>
                                        </div>
                                            
                                      </div>
                              }
           
                               <button
                               type='button'
                                 onClick={()=>{addEducation(previousEmployement?.length)}}
                                 className="mx-auto mt-6 flex w-fit items-center gap-2 text-base font-bold leading-5 text-[#806BFF]"
                               >
                                 <div className="flex size-[18px] items-center justify-center rounded-full border-[1.5px] border-[#806BFF] text-sm font-semibold leading-[18px] text-[#806BFF]">
                                   +{" "}
                                 </div>
                                 Add Another Employment
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
                 employee_data?.previousEmployment?.length > 0 ? employee_data?.previousEmployment?.map((item,index)=>{
                  return  <div className=' relative w-full mt-6 '>
                     <div className=' mb-2 text-base font-medium  leading-[100%] tracking-[0%]'>{" Previous Employment "+( index + 1)}</div>
                  <div className=' mt-2 relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                    <div className=' relative flex flex-col gap-1 '>
                      <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Company Name</div>
                      <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{item?.company_name ||  "N/A"}</div>
                    </div>
                    <div className=' relative flex flex-col gap-1 '>
                      <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Designation</div>
                      <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{item?.designation || "N/A"}</div>
                    </div>
                    <div className=' relative flex flex-col gap-1 '>
                      <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>From Date</div>
                      <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{item?.from_date || "N/A"}</div>
                    </div>
                    <div className=' relative flex flex-col gap-1 '>
                      <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>To Date</div>
                      <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{item?.to_date || "N/A"}</div>
                    </div>
                    <div className=' relative flex flex-col gap-1 '>
                      <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Company Address</div>
                      <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{item?.company_address || "N/A"}</div>
                    </div>
                  </div>
                  
                </div>
                }):
                <div className=' relative w-full mt-6 text-center '>
                    No Data Available
                </div>

              }
              { previousEmployementAttachments?.length > 0 && <div className=' mt-6 w-full relative grid grid-cols-2 gap-8 '>
                    {
                      previousEmployementAttachments?.map((item)=>{
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
