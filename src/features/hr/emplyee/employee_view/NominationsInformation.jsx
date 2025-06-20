import React, { useEffect, useState } from 'react'
import config from '../../../../config/config';
import ButtonNew from '../../../../components/elements/amdital/ButtonNew';
import Input from '../../../projects_new/Reusable/Input';
import SelectHtml from '../../../../components/elements/amdital/SelectHtml';
import { getSingalEmployeeData, updateNominationInformation } from './employeeFunction';
import { useSnackbar } from 'notistack';

export default function NominationsInformation({employee_data,params_id,editComponent}){


  const [editView,setEditView] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [buttonClicked,setButtonClicked]= useState(false);

  const [fields, setFields] = useState({
    epfNomination: [{ id: 1, name: "", relationship: "", nomination_percentage: "" }],
    epsNomination: [{ id: 1, name: "", relationship: "", nomination_percentage: "" }],
    esiNomination: [{ id: 1, name: "", relationship: "", nomination_percentage: "" }],
    gravityNomination: [{ id: 1, name: "", relationship: "", nomination_percentage: "" }]
  });
  
  useEffect(() => {
    if (employee_data) {
      setFields({
        epfNomination: employee_data.epfNomination?.length > 0 ? employee_data.epfNomination?.map((item, index) => ({
          id: index + 1, // Assigns ID based on index
          ...item
        })) : [{ id: 1, name: "", relationship: "", nomination_percentage: "" }],
  
        epsNomination: employee_data.epsNomination?.length > 0 ? employee_data.epsNomination?.map((item, index) => ({
          id: index + 1,
          ...item
        })) : [{ id: 1, name: "", relationship: "", nomination_percentage: "" }],
  
        esiNomination: employee_data.esiNomination?.length> 0 ? employee_data.esiNomination?.map((item, index) => ({
          id: index + 1,
          ...item
        })) : [{ id: 1, name: "", relationship: "", nomination_percentage: "" }],
  
        gravityNomination: employee_data.gravityNomination?.length > 0 ? employee_data.gravityNomination?.map((item, index) => ({
          id: index + 1,
          ...item
        })) : [{ id: 1, name: "", relationship: "", nomination_percentage: "" }]
      });
    }
  }, [employee_data]);
  

  const onSubmitHandler =async (e)=>{
    e.preventDefault();
    setButtonClicked(true);
    const response = await updateNominationInformation(params_id,{
    epfNomination:fields?.epfNomination.map(({ id, ...rest }) => rest),
    epsNomination: fields?.epsNomination.map(({ id, ...rest }) => rest),
    esiNomination: fields?.esiNomination.map(({ id, ...rest }) => rest),
    gravityNomination: fields?.gravityNomination.map(({ id, ...rest }) => rest)},enqueueSnackbar);
        const employee_data = await getSingalEmployeeData(params_id);
    if( response?.data?.data?.updateUser){
            setEditView(!editView)
        }
    setButtonClicked(false);
  }

  const onChangeEpfNominationHandler = (e, id) => {
    const { name, value } = e.target;
  
    setFields(prevFields => ({
      ...prevFields,
      epfNomination: prevFields.epfNomination.map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    }));
  };


  const onChangeEpsNominationHandler = (e, id) => {
    const { name, value } = e.target;
  
    setFields(prevFields => ({
      ...prevFields,
      epsNomination: prevFields.epsNomination.map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    }));
  };

  const onChangeEsiNominationHandler = (e, id) => {
    const { name, value } = e.target;
  
    setFields(prevFields => ({
      ...prevFields,
      esiNomination: prevFields.esiNomination.map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    }));
  };

  
  const onChangeGravityNominationHandler = (e, id) => {
    const { name, value } = e.target;
    setFields(prevFields => ({
      ...prevFields,
      gravityNomination: prevFields.gravityNomination.map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    }));
  };
  
  
  
  
  


const removeItem = (id, nominationKey) => {
  setFields(prevFields => ({
    ...prevFields,
    [nominationKey]: prevFields[nominationKey].filter(item => item.id !== id)
  }));
  
};



  return (
    <>
      <div className=' relative border border-[#E1DCFF] rounded p-6  w-full '>
        <div className=' flex justify-between items-center'>
          <div  className=' text-[20px] font-semibold text-[#26212E] tracking-[0%] leading-[100%] flex  whitespace-nowrap '>
            7.<span className=' ml-2'>Nominations</span>
          </div>
         { !editView && <img onClick={()=>{setEditView(!editView)}} src={config.PUBLIC_URL + "/assets/images/amdital/edit_icon_gray_color.svg"} alt='' className={`  cursor-pointer ${ !editComponent && ` hidden`} `}/>}
        </div>
        <div className=' mt-6 '>
          {
            editView ? 
            <div> 
              <form onSubmit={onSubmitHandler}>
                <div className=' relative w-full flex flex-col gap-6 '>
                  <div className=' relative w-full '>
                    <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>EPF Nomination</h1>
                    {
                        fields?.epfNomination?.map((item,index)=>{
                                   return <>
                                        <div className=' gap-6 mt-3'>
                                         <div className='  relative w-full grid grid-cols-3 grid-rows-1 gap-x-8 gap-y-6 '>
                                             <Input
                                                id="name" 
                                                type="text" 
                                                name="name"
                                                value={item?.name} 
                                                onChange={(e)=>{onChangeEpfNominationHandler(e,item?.id)}}
                                                autoComplete="autoComplete"
                                                placeholder="Enter  name"
                                                classInput=" w-full h-10 "
                                                labelName={"Name"}
                                                required={"required"}
                                              /> 
                                              <Input
                                                id="nomination_percentage" 
                                                type="text" 
                                                name="nomination_percentage"
                                                value={item?.nomination_percentage} 
                                                onChange={(e)=>{onChangeEpfNominationHandler(e,item?.id)}}
                                                autoComplete="autoComplete"
                                                placeholder="Enter nomination percentage"
                                                classInput=" w-full h-10 "
                                                labelName={"Nomination %"}
                                                required={"required"}
                                              /> 
                                              <SelectHtml
                                                 id="relationship"
                                                 name="relationship"
                                                 value={fields?.relationship} 
                                                 onChange={(e)=>{onChangeEpfNominationHandler(e,item?.id)}}
                                                 autoComplete="autoComplete"
                                                 classInput=" w-full h-10 "
                                                 labelName={"Relationship"}
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
                                   </>
                                 })
                               }
                  </div>
                  <div className=' relative w-full '>
                    <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>EPS Nomination</h1>
                    {
                        fields?.epsNomination?.map((item,index)=>{
                                   return <>
                                        <div className=' gap-6 mt-3'>
                                          {/* <div className={` w-full `}>
                                            <div className=' mb-2 text-base font-medium  leading-[100%] tracking-[0%]'>{( index + 1)+" Nominations"}</div>
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
                                          </div> */}
                                         <div className='  relative w-full grid grid-cols-3 grid-rows-1 gap-x-8 gap-y-6 '>
                                             <Input
                                                id="name" 
                                                type="text" 
                                                name="name"
                                                value={item?.name} 
                                                onChange={(e)=>{onChangeEpsNominationHandler(e,item?.id)}}
                                                autoComplete="autoComplete"
                                                placeholder="Enter  name"
                                                classInput=" w-full h-10 "
                                                labelName={"Name"}
                                                required={"required"}
                                              /> 
                                              <Input
                                                id="nomination_percentage" 
                                                type="text" 
                                                name="nomination_percentage"
                                                value={item?.nomination_percentage} 
                                                onChange={(e)=>{onChangeEpsNominationHandler(e,item?.id)}}
                                                autoComplete="autoComplete"
                                                placeholder="Enter nomination percentage"
                                                classInput=" w-full h-10 "
                                                labelName={"Nomination %"}
                                                required={"required"}
                                              /> 
                                              <SelectHtml
                                                 id="relationship"
                                                 name="relationship"
                                                 value={fields?.relationship} 
                                                 onChange={(e)=>{onChangeEpsNominationHandler(e,item?.id)}}
                                                 autoComplete="autoComplete"
                                                 classInput=" w-full h-10 "
                                                 labelName={"Relationship"}
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
                                   </>
                                 })
                               }
                  </div>
                  <div className=' relative w-full '>
                    <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>ESI Nomination</h1>
                    {
                        fields?.esiNomination?.map((item,index)=>{
                                   return <>
                                        <div className=' gap-6 mt-3'>
                                          {/* <div className={` w-full `}>
                                            <div className=' mb-2 text-base font-medium  leading-[100%] tracking-[0%]'>{( index + 1)+" Nominations"}</div>
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
                                          </div> */}
                                         <div className='  relative w-full grid grid-cols-3 grid-rows-1 gap-x-8 gap-y-6 '>
                                             <Input
                                                id="name" 
                                                type="text" 
                                                name="name"
                                                value={item?.name} 
                                                onChange={(e)=>{onChangeEsiNominationHandler(e,item?.id)}}
                                                autoComplete="autoComplete"
                                                placeholder="Enter  name"
                                                classInput=" w-full h-10 "
                                                labelName={"Name"}
                                                required={"required"}
                                              /> 
                                              <Input
                                                id="nomination_percentage" 
                                                type="text" 
                                                name="nomination_percentage"
                                                value={item?.nomination_percentage} 
                                                onChange={(e)=>{onChangeEsiNominationHandler(e,item?.id)}}
                                                autoComplete="autoComplete"
                                                placeholder="Enter nomination percentage"
                                                classInput=" w-full h-10 "
                                                labelName={"Nomination %"}
                                                required={"required"}
                                              /> 
                                              <SelectHtml
                                                 id="relationship"
                                                 name="relationship"
                                                 value={fields?.relationship} 
                                                 onChange={(e)=>{onChangeEsiNominationHandler(e,item?.id,"esiNomination")}}
                                                 autoComplete="autoComplete"
                                                 classInput=" w-full h-10 "
                                                 labelName={"Relationship"}
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
                                   </>
                                 })
                               }
                  </div>
                  <div className=' relative w-full '>
                    <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Gravity Nomination</h1>
                    {
                        fields?.gravityNomination?.map((item,index)=>{
                                   return <>
                                        <div className=' gap-6 mt-3'>
                                          {/* <div className={` w-full `}>
                                            <div className=' mb-2 text-base font-medium  leading-[100%] tracking-[0%]'>{( index + 1)+" Nominations"}</div>
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
                                          </div> */}
                                         <div className='  relative w-full grid grid-cols-3 grid-rows-1 gap-x-8 gap-y-6 '>
                                             <Input
                                                id="name" 
                                                type="text" 
                                                name="name"
                                                value={item?.name} 
                                                onChange={(e)=>{onChangeGravityNominationHandler(e,item?.id)}}
                                                autoComplete="autoComplete"
                                                placeholder="Enter  name"
                                                classInput=" w-full h-10 "
                                                labelName={"Name"}
                                                required={"required"}
                                              /> 
                                              <Input
                                                id="nomination_percentage" 
                                                type="text" 
                                                name="nomination_percentage"
                                                value={item?.nomination_percentage} 
                                                onChange={(e)=>{onChangeGravityNominationHandler(e,item?.id)}}
                                                autoComplete="autoComplete"
                                                placeholder="Enter nomination percentage"
                                                classInput=" w-full h-10 "
                                                labelName={"Nomination %"}
                                                required={"required"}
                                              /> 
                                              <SelectHtml
                                                 id="relationship"
                                                 name="relationship"
                                                 value={fields?.relationship} 
                                                 onChange={(e)=>{onChangeGravityNominationHandler(e,item?.id)}}
                                                 autoComplete="autoComplete"
                                                 classInput=" w-full h-10 "
                                                 labelName={"Relationship"}
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
                                   </>
                                 })
                               }
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
            <div className=' relative w-full flex flex-col gap-6 '> 
             <div className=' relative w-full '>
                <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>EPF Nomination</h1>
                <div className=' mt-2 relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Name</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%] block truncate '>{(employee_data?.epfNomination?.[0]?.name || "N/A") + `(${employee_data?.epfNomination?.[0]?.relationship || "N/A"})`}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Nomination %</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%] block truncate '>{employee_data?.epfNomination?.[0]?.nomination_percentage || "No percentage"}</div>
                  </div>
                </div>
              </div>
              <div className=' relative w-full'>
                <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>EPS Nomination</h1>
                <div className=' mt-2 relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Name</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%] block truncate '>{(employee_data?.epsNomination?.[0]?.name || "N/A") +  `(${employee_data?.epsNomination?.[0]?.relationship || "N/A"})`}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Nomination %</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%] block truncate '>{employee_data?.epsNomination?.[0]?.nomination_percentage || "No percentage"}</div>
                  </div>
                </div>
              </div>
              <div className=' relative w-full'>
                <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>EsI Nomination</h1>
                <div className=' mt-2 relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Name</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%] block truncate '>{(employee_data?.esiNomination?.[0]?.name || "N/A") +  `(${employee_data?.esiNomination?.[0]?.relationship || "N/A"})`}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Nomination %</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%] block truncate  '>{employee_data?.esiNomination?.[0]?.nomination_percentage || "No percentage"}</div>
                  </div>
                </div>
              </div>
              <div className=' relative w-full'>
                <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Gratuity Nomination</h1>
                <div className=' mt-2 relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Name</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%] block truncate '>{(employee_data?.gravityNomination?.[0]?.name || "N/A") + " " + `(${employee_data?.gravityNomination?.[0]?.relationship || "N/A"})`}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Nomination %</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%] block truncate '>{employee_data?.gravityNomination?.[0]?.nomination_percentage || "No percentage"}</div>
                  </div>
                </div>
              </div>
            </div>
          }

        </div>
      </div>
    </>
  )
}
