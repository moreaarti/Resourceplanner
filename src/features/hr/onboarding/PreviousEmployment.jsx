import React, { useEffect, useState } from "react";
import SelectHtml from "../../../components/elements/amdital/SelectHtml";
import Input from "../../projects_new/Reusable/Input";
import InputDate from "../../projects_new/Reusable/InputDate";
import InputTextArea from "../../../components/elements/amdital/InputTextArea";
import config from "../../../config/config";
import ButtonNew from "../../../components/elements/amdital/ButtonNew";
import { getSingleEmployeeOnboardingData, onboardingOnStepCountHandler, previousEmployementOnboardingApi } from "./OnboardingNewApi";
import { useSelector } from "react-redux";
import VaildationSelectionBox from "../../../components/elements/amdital/VaildationSelectionBox";
import CustomDateInput from "../../../components/elements/amdital/CustomDate/CustomDateInput";
import { errorMessageHandler, successfullMessageHandler } from "../../../components/elements/amdital/toastyMessage";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";


const PreviousEmployment = ({isEditing=false}) => {

  const navigate = useNavigate();
   const { enqueueSnackbar } = useSnackbar();
    const onboarding_redux = useSelector(store=>store?.onboarding)
    const  token_details =onboarding_redux?.onboarding_employee_authentication_data;
    const token =token_details?.authToken;
    const graphqlId = token_details?.user?.id;
    const user_id = token_details?.user?.userId;
    const employee_data_redux = onboarding_redux?.onboarding_employee_data;

 

  const [buttonClicked,setButtonClicked] = useState(false);

    const [previousEmployement,setPreviousEmployement] = useState([{
      id:1,
      company_name:"",
      designation:"",
      from_date:"",
      to_date:"",
      company_address:""
    }]);

    useEffect(()=>{
      if( employee_data_redux?.previousEmployment?.length > 0 ){
          const previous_employement_data = employee_data_redux?.previousEmployment
          ?.map((item,index)=>{
            return {...item,id:index+1}
          });
          setPreviousEmployement(previous_employement_data);
      }
    },[employee_data_redux])

       const [validationError,setValidationError] = useState({fromYearArray:[],toYearArray:[]});
    
      const onSubmitHandler =async (e)=>{
        e.preventDefault();
        setButtonClicked(true);
        // const from_date_emty = previousEmployement?.filter(item => item?.from_date === "");
        // if(from_date_emty?.length > 0){
        //   setValidationError(prevState => ({
        //     ...prevState,
        //     fromYearArray: from_date_emty?.map(item => item?.id)
        //   }));
        //   setButtonClicked(false);
        //   return false;
        // }
        // const to_date_emty = previousEmployement?.filter(item => item?.to_date === "");
    
        // if(to_date_emty?.length > 0){
        //   setValidationError(prevState => ({
        //     ...prevState,
        //     toYearArray: to_date_emty?.map(item => item?.id)
        //   }));
        //   setButtonClicked(false);
        //   return false;
        // }
        const response_previous = await previousEmployementOnboardingApi(user_id,previousEmployement)
         if(response_previous?.data?.data?.updateUser?.user?.id){
                if(isEditing){
                  navigate("/onboarding/onboarding-form/information-summary/8");
                  return

                }
                else{
                  const countUpdate = await onboardingOnStepCountHandler(user_id,4);
                    const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
                      successfullMessageHandler(enqueueSnackbar,"Successfully updated. Continue to the next step!");
                      navigate("/onboarding/onboarding-form/4");
                      return
                }
            }
            if(response_previous?.data?.errors){
              errorMessageHandler(enqueueSnackbar,response_previous?.data?.errors?.[0]?.message)
        
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
               },1500)
             }
           },[validationError]);


  return (
    <>
      <form onSubmit={onSubmitHandler}>

        <div className=' relative '>
        <div className=' relative w-full flex flex-col gap-6  mt-6 '>
        {
                                 previousEmployement?.map((item,index)=>{
                                   return <>
                                        <div className=' gap-6'>
                                          <div className={` w-full `}>
                                            <div className=' mb-2 text-base font-medium  leading-[100%] tracking-[0%]'>{( index + 1)+ " Previous Employment "}</div>
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
                                         <div className='  relative w-full grid grid-cols-4 grid-rows-1 gap-x-8 gap-y-6 '>
                                             <Input
                                             id="company_name" 
                                             type="text" 
                                             name="company_name"
                                             value={item?.company_name} 
                                             onChange={(e)=>{onChangeHandler(e,item?.id)}}
                                             autoComplete="autoComplete"
                                             placeholder="Enter company name"
                                             classInput=" w-full h-10 !bg-[#FFFFFF] "
                                             labelName={"Company Name"}
                                            //  required={"required"}
                                           /> 
                                            <Input
                                             id="designation" 
                                             type="text" 
                                             name="designation"
                                             value={item?.designation} 
                                             onChange={(e)=>{onChangeHandler(e,item?.id)}}
                                             autoComplete="autoComplete"
                                             placeholder="Enter designation"
                                             classInput=" w-full h-10 !bg-[#FFFFFF] "
                                             labelName={"Designation"}
                                            //  required={"required"}
                                           /> 
                                             <div className=' relative w-full  '>
                                                <CustomDateInput
                                                      label=" From Date"
                                                      inputWidth="100%"
                                                      inputHeight="40px"
                                                      labelWidth="120px"
                                                      value={item?.from_date}
                                                      onChange={(e)=>{onChangeFromHandelr(e,item?.id)}}
                                                      required={false}
                                                      placeholder="YYYY/MM/DD"
                                                      wrapperClass="mt-1"
                                                      inputClass="!bg-[#FFFFFF] "
                                                    /> 
                                              { validationError?.fromYearArray?.length > 0 && validationError?.fromYearArray?.includes(item?.id) && (
                                                      <div className="absolute flex justify-center w-full">
                                                        <VaildationSelectionBox />
                                                      </div>
                                                    )}
                                            </div>
                                    <div className=' relative w-full  '>
                                      <CustomDateInput
                                            label="To Date"
                                            inputWidth="100%"
                                            inputHeight="40px"
                                            labelWidth="120px"
                                            value={item?.to_date}
                                            onChange={(e)=>{onChangeToHandelr(e,item?.id)}}
                                            required={false}
                                            placeholder="YYYY/MM/DD"
                                            wrapperClass="mt-1"
                                            inputClass="!bg-[#FFFFFF] "
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
                                                 classInput=" w-full h-[77px] !bg-[#FFFFFF] "
                                                 labelName={"Company Address"}
                                                 wrapperClass={"mt-6"}
                                                //  required
                                               />
                                      </div>  
                                   </>
                                 })
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
          <div className=" flex justify-center mt-[64px] gap-4 tracking-[5%] ">
              <ButtonNew
                        type="button"
                        buttonName= "Back"
                        buttonClassName = {` w-[83px] bg-[#FFFFFF] hover:bg-[#FFF2ED]  border-[#FF845C] border-2 text-[#FF845C] h-10  outline-none text-sm leading-[100%] tracking-[5%]  font-semibold   `}
                        spanClassName = " border-[#FFFFFF] "
                        isLoading= {buttonClicked}
                        onClick={async()=>{
                          if(isEditing){
                            
                          }
                          else{
                            const countUpdate = await onboardingOnStepCountHandler(user_id,2);
                            const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
                            navigate("/onboarding/onboarding-form/2");
                          }
                        }}
                      />
              
                                                 <ButtonNew
                                                   type="submit"
                                                   buttonName= "Save and Next"
                                                   buttonClassName = {` ${ buttonClicked ? ` bg-[#F36A3D]  w-[170px] ` : ` w-[149px]  bg-[#FF845C] hover:bg-[#F36A3D] `} h-10  outline-none text-base leading-3 font-semibold text-[#FFFFFF]  `}
                                                   spanClassName = " border-[#FFFFFF] "
                                                   isLoading= {buttonClicked}
                                                 />
                    
        </div>                   
      </form>
      
    </>
  );
};

export default PreviousEmployment;

