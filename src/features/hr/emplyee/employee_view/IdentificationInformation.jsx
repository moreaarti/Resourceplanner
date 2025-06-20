import React, { useEffect, useState } from 'react'
import config from '../../../../config/config';
import ButtonNew from '../../../../components/elements/amdital/ButtonNew';
import EmployeeImagePreview from './EmployeeImagePreview';
import SelectHtml from '../../../../components/elements/amdital/SelectHtml';
import { useSelector } from 'react-redux';
import Input from '../../../projects_new/Reusable/Input';
import CustomDateSelector from '../../../../components/elements/amdital/CustomDate/CustomDateInput';
import VaildationSelectionBox from '../../../../components/elements/amdital/VaildationSelectionBox';
import { useSnackbar } from 'notistack';
import { fileDeleteHandler, fileUploadedHandler, getSingalEmployeeData, sourceUrlConvertToImageName, updateAccountIdentificationInformation } from './employeeFunction';
import EmployeeImageEdit from './EmployeeImageEdit';
import EmployeeInputAttachementFile from './EmployeeInputAttachementFile';

export default function IdentificationInformation({employee_data,attachments_data,params_id, editComponent}){

  const [editView,setEditView] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [buttonClicked,setButtonClicked]= useState(false);
    const storeRedux =useSelector(store =>store);

  const countryReduxData = storeRedux?.general.country_data
  const stateReduxData = storeRedux?.general.state_data

  const countryOptions = countryReduxData?.map((item)=>{
    return {id:item?.code,name:item?.name}
  });

  const [fields,setFields] = useState({
    bankCountry:"",
    bankAccountNumber:"",
    bankBranchName:"",
    bankName:"",
    bankCode:"",
    nameOnBankAcc:"",
    accountType:"",
    pfAccountDetails:"",
    pfUan:"",
    panNumber:"",
    panName:"",
    aadharNumber:"",
    aadharName:"",
    passportNumber:"",
    passportName:"",
    passportExpiryDate:"",
  })
  const [validationError,setValidationError] = useState({passportExpiryDate:false});


useEffect(()=>{

  setFields({
    bankCountry:employee_data?.bankCountry || "",
    bankAccountNumber:employee_data?.bankAccountNumber || "",
    bankBranchName:employee_data?.bankBranchName || "",
    bankName:employee_data?.bankName || "",
    bankCode:employee_data?.bankCode || "",
    nameOnBankAcc:employee_data?.nameOnBankAcc || "",
    accountType:employee_data?.accountType || "",
    pfAccountDetails:employee_data?.pfAccountDetails || "",
    pfUan:employee_data?.pfUan || "",
    panNumber:employee_data?.panNumber || "",
    panName:employee_data?.panName || "",
    aadharNumber:employee_data?.aadharNumber || "",
    aadharName:employee_data?.aadharName || "",
    passportNumber:employee_data?.passportNumber || "",
    passportName:employee_data?.passportName || "",
    passportExpiryDate:employee_data?.passportExpiryDate || "",
  })

},[employee_data])

  const onSubmitHandler =async (e)=>{
    e.preventDefault();
    setButtonClicked(true);
    if(fields?.passportExpiryDate === ""){
      setValidationError({...validationError,passportExpiryDate:true});
      setButtonClicked(false);
      return false
    }
       const response = await updateAccountIdentificationInformation(params_id,fields,enqueueSnackbar);
        const employee_data = await getSingalEmployeeData(params_id);
        if( response?.data?.data?.updateUser){
                setEditView(!editView)
              }
              setButtonClicked(false);
  }

  const onChangeHandler =(e)=>{
    const {name,value} = e.target;
    setFields({...fields,[name]:value})
  }
  const onChangeExpireHandler =(e)=>{
   
    setFields({...fields,passportExpiryDate:e.target.value})
  }

       useEffect(()=>{
         if(validationError?.passportExpiryDate ){
           setTimeout(()=>{
            setValidationError({...validationError,passportExpiryDate:false});
           },700)
         }
       },[validationError]);



      const [bankAccountDetailsAttachments,setBankAccountDetailsAttachments]=useState([]);
      const [permanentAccountNumberAttachments,setPermanentAccountNumberAttachments]=useState([]);
      const [aadharCardAttachments,setAadharCardAttachments]=useState([]);
      const [passPortAttachments,setPassPortAttachments]=useState([]);

       
            
              useEffect(()=>{
                if(attachments_data?.edges?.length > 0){
                  const attachmentBankData = attachments_data?.edges?.filter((image)=>{
                    if(image?.node?.altText === "bankAccountDetails"){
                      return image
                    }
                  });
                  const attachmentPermanentAccountNumberData = attachments_data?.edges?.filter((image)=>{
                    if(image?.node?.altText === "permanentAccountNumber"){
                      return image
                    }
                  });
                  const attachmentAadharCardData = attachments_data?.edges?.filter((image)=>{
                    if(image?.node?.altText === "aadharCard"){
                      return image
                    }
                  });
                  const attachmentPassPortData = attachments_data?.edges?.filter((image)=>{
                    if(image?.node?.altText === "passPort"){
                      return image
                    }
                  });
                  setBankAccountDetailsAttachments(attachmentBankData);
                  setPermanentAccountNumberAttachments(attachmentPermanentAccountNumberData);
                  setAadharCardAttachments(attachmentAadharCardData);
                  setPassPortAttachments(attachmentPassPortData)
                }
            
              },[attachments_data]);


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
            5.<span className=' ml-2'>Identification</span>
          </div>
         { !editView && <img onClick={()=>{setEditView(!editView)}} src={config.PUBLIC_URL + "/assets/images/amdital/edit_icon_gray_color.svg"} alt='' className={`  cursor-pointer ${ !editComponent && ` hidden`} `}/>}
        </div>
        <div className=' mt-6 '>
          {
            editView ? 
            <div> 
              <form onSubmit={onSubmitHandler} className=' flex flex-col gap-6'>
                <div className=' relative '>
                  <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Bank Account Details</h1>
                  <div className=' relative w-full grid  grid-cols-3 min-[1400px]:grid-cols-3 gap-x-8 gap-y-6 mt-2 '>
                        <SelectHtml
                        id="bankCountry"
                        name="bankCountry"
                        value={fields?.bankCountry} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        classInput=" w-full h-10 "
                        labelName={"Country"}
                        optionData={countryOptions}
                        required
                        placeholder={"Select country of origin"}
                      />
                       <Input
                        id="bankAccountNumber" 
                        type="text" 
                        name="bankAccountNumber"
                        value={fields?.bankAccountNumber} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        placeholder="Enter bank account number"
                        classInput=" w-full h-10 "
                        labelName={"Bank Account Number"}
                        required={"required"}
                      /> 
                      <Input
                        id="bankCode" 
                        type="text" 
                        name="bankCode"
                        value={fields?.bankCode} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        placeholder="Enter bank code"
                        classInput=" w-full h-10 "
                        labelName={"Bank Code"}
                        required={"required"}
                      />
                      <Input
                        id="bankName" 
                        type="text" 
                        name="bankName"
                        value={fields?.bankName} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        placeholder="Enter bank name"
                        classInput=" w-full h-10 "
                        labelName={"Bank Name"}
                        required={"required"}
                      />
                      <Input
                        id="bankBranchName" 
                        type="text" 
                        name="bankBranchName"
                        value={fields?.bankBranchName} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        placeholder="Enter bank branch name"
                        classInput=" w-full h-10 "
                        labelName={"Bank Branch"}
                        required={"required"}
                      />
                      <Input
                        id="nameOnBankAcc" 
                        type="text" 
                        name="nameOnBankAcc"
                        value={fields?.nameOnBankAcc} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        placeholder="Enter name on bank account"
                        classInput=" w-full h-10 "
                        labelName={"Name as per Bank Account"}
                        required={"required"}
                      /> 
                      <SelectHtml
                        id="accountType"
                        name="accountType"
                        value={fields?.accountType} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        classInput=" w-full h-10 "
                        labelName={"Account Type"}
                        optionData={[
                          { id: "Savings Account", name: "Savings Account" },
                          { id: "Current Account", name: "Current Account" },
                          { id: "Fixed Deposit Account", name: "Fixed Deposit Account" },
                          { id: "Recurring Deposit Account", name: "Recurring Deposit Account" },
                          {
                            id: "NRE (Non-Resident External)",
                            name: "NRE (Non-Resident External)",
                          },
                          {
                            id: "NRO (Non-Resident Ordinary)",
                            name: "NRO (Non-Resident Ordinary)",
                          },
                        ]}
                        required
                        placeholder={"Select account type"}
                      />          
                     
                    </div>
                    {
                    <div className=' w-full relative mt-6 '>
                      <div className=' w-full relative grid grid-cols-2 gap-8'>
                        {
                          bankAccountDetailsAttachments?.map((item)=>{
                            return <EmployeeImageEdit onDelete={()=>{fileDeleteHandler(item?.node?.mediaItemId,params_id)}}  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                            fileUrl={item?.node?.mediaItemUrl}  />
                          })
                        }
                        <EmployeeInputAttachementFile name="bankAccountDetails" onChange={(e)=>{fileUploadedHandler(e,params_id,"bankAccountDetails",enqueueSnackbar)}}/>
                      </div>
                          
                    </div>
                  }
                </div>
                <div className=' relative  '>
                  <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Pf Account Details</h1>
                  <div className=' relative w-full grid  grid-cols-3 min-[1400px]:grid-cols-3 gap-x-8 gap-y-6 mt-2 '>
                        
                       <Input
                        id="pfAccountDetails" 
                        type="text" 
                        name="pfAccountDetails"
                        value={fields?.pfAccountDetails} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        placeholder="Enter pf account details"
                        classInput=" w-full h-10 "
                        labelName={"PF Account Number"}
                        required={"required"}
                      /> 
                      <Input
                        id="pfUan" 
                        type="text" 
                        name="pfUan"
                        value={fields?.pfUan} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        placeholder="Enter pfUan"
                        classInput=" w-full h-10 "
                        labelName={"UAN"}
                        required={"required"}
                      />
                      
                     
                    </div>
                </div>
                <div className=' relative  '>
                  <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Pan Account Details</h1>
                  <div className=' relative w-full grid  grid-cols-3 min-[1400px]:grid-cols-3 gap-x-8 gap-y-6 mt-2 '>
                        
                       <Input
                        id="panNumber" 
                        type="text" 
                        name="panNumber"
                        value={fields?.panNumber} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        placeholder="Enter pan number"
                        classInput=" w-full h-10 "
                        labelName={"PF Account Number"}
                        required={"required"}
                      /> 
                      <Input
                        id="panName" 
                        type="text" 
                        name="panName"
                        value={fields?.panName} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        placeholder="Enter pan name"
                        classInput=" w-full h-10 "
                        labelName={"Name In PAN"}
                        required={"required"}
                      />
                      
                     
                    </div>
                    {
                    <div className=' w-full relative mt-6 '>
                      <div className=' w-full relative grid grid-cols-2 gap-8'>
                        {
                          permanentAccountNumberAttachments?.map((item)=>{
                            return <EmployeeImageEdit onDelete={()=>{fileDeleteHandler(item?.node?.mediaItemId,params_id)}}  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                            fileUrl={item?.node?.mediaItemUrl}  />
                          })
                        }
                        <EmployeeInputAttachementFile name="permanentAccountNumber" 
                        onChange={(e)=>{fileUploadedHandler(e,params_id,"permanentAccountNumber",enqueueSnackbar)}}/>
                      </div>
                          
                    </div>
                  }
                </div>
                <div className=' relative  '>
                  <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Aadhaar</h1>
                  <div className=' relative w-full grid  grid-cols-3 min-[1400px]:grid-cols-3 gap-x-8 gap-y-6 mt-2 '>
                        
                       <Input
                        id="aadharNumber" 
                        type="text" 
                        name="aadharNumber"
                        value={fields?.aadharNumber} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        placeholder="Enter aadhar number"
                        classInput=" w-full h-10 "
                        labelName={"Aadhaar Number"}
                        required={"required"}
                      /> 
                      <Input
                        id="aadharName" 
                        type="text" 
                        name="aadharName"
                        value={fields?.aadharName} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        placeholder="Enter aadhar name"
                        classInput=" w-full h-10 "
                        labelName={"Name In Aadhaar"}
                        required={"required"}
                      />
                                          
                    </div>
                    {
                    <div className=' w-full relative mt-6 '>
                      <div className=' w-full relative grid grid-cols-2 gap-8'>
                        {
                          aadharCardAttachments?.map((item)=>{
                            return <EmployeeImageEdit onDelete={()=>{fileDeleteHandler(item?.node?.mediaItemId,params_id)}}  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                            fileUrl={item?.node?.mediaItemUrl}  />
                          })
                        }
                        <EmployeeInputAttachementFile name="aadharCard" onChange={(e)=>{fileUploadedHandler(e,params_id,"aadharCard",enqueueSnackbar)}}/>
                      </div>
                          
                    </div>
                  }
                </div>
                <div className=' relative  '>
                  <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>PAssport</h1>
                  <div className=' relative w-full grid  grid-cols-3 min-[1400px]:grid-cols-3 gap-x-8 gap-y-6 mt-2 '>
                        
                       <Input
                        id="passportNumber" 
                        type="text" 
                        name="passportNumber"
                        value={fields?.passportNumber} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        placeholder="Enter passport number"
                        classInput=" w-full h-10 "
                        labelName={"Passport Number"}
                        required={"required"}
                      /> 
                      <Input
                        id="passportName" 
                        type="text" 
                        name="passportName"
                        value={fields?.passportName} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        placeholder="Enter passport name"
                        classInput=" w-full h-10 "
                        labelName={"Name In Passport"}
                        required={"required"}
                      />
                      <div className=' relative w-full  '>
                          <CustomDateSelector
                              label=" Expiry Date"
                                inputWidth="100%"
                                          inputHeight="40px"
                                          labelWidth="120px"
                                          value={fields?.passportExpiryDate}
                                          onChange={onChangeExpireHandler}
                                          required={true}
                                          placeholder="YYYY/MM/DD"
                                        /> 
                          { validationError?.passportExpiryDate && (
                                      <div className="absolute flex justify-center w-full">
                                              <VaildationSelectionBox />
                                      </div>
                                )}
                          </div>
                                          
                    </div>
                    {
                    <div className=' w-full relative mt-6 '>
                      <div className=' w-full relative grid grid-cols-2 gap-8'>
                        {
                          passPortAttachments?.map((item)=>{
                            return <EmployeeImageEdit onDelete={()=>{fileDeleteHandler(item?.node?.mediaItemId,params_id)}}  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                            fileUrl={item?.node?.mediaItemUrl}  />
                          })
                        }
                        <EmployeeInputAttachementFile name="passPort" onChange={(e)=>{fileUploadedHandler(e,params_id,"passPort",enqueueSnackbar)}}/>
                      </div>
                          
                    </div>
                  }
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
            <div className=' relative w-full mt-6  flex flex-col gap-6 '>

             <div className=' relative w-full'>
                <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Bank Account Details</h1>
                <div className=' mt-2 relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Country</div>
                    <div className=' text-[#26212E] block truncate text-base font-medium tracking-[0%] leading-[100%] '>{countryNameDisplay(employee_data?.bankCountry) || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Bank Account Number</div>
                    <div className=' text-[#26212E] text-base  block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.bankAccountNumber || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Bank Code</div>
                    <div className=' text-[#26212E] text-base block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.bankCode || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Bank Name</div>
                    <div className=' text-[#26212E] text-base block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.bankName || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Bank Branch</div>
                    <div className=' text-[#26212E] text-base block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.bankBranchName || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Name as per Bank Account</div>
                    <div className=' text-[#26212E] text-base block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.nameOnBankAcc || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Account Type</div>
                    <div className=' text-[#26212E] text-base block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.accountType || "N/A"}</div>
                  </div>
                </div>
                { bankAccountDetailsAttachments?.length > 0 && <div className=' mt-6 w-full relative grid grid-cols-2 gap-8 '>
                    {
                      bankAccountDetailsAttachments?.map((item)=>{
                        return <EmployeeImagePreview  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                        fileUrl={item?.node?.mediaItemUrl}  />
                      })
                    }
                </div>}
              </div>

              <div className=' relative w-full'>
                <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Pf Account Details</h1>
                <div className=' mt-2 relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>PF Account Number</div>
                    <div className=' text-[#26212E] text-base block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.pfAccountDetails || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>UAN</div>
                    <div className=' text-[#26212E] text-base  block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.pfUan || "N/A"}</div>
                  </div>
                </div>
              </div>

              <div className=' relative w-full'>
                <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Pan Account Details</h1>
                <div className=' mt-2 relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>PAN Number</div>
                    <div className=' text-[#26212E] text-base block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.panNumber || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Name In PAN</div>
                    <div className=' text-[#26212E] text-base block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.panName || "N/A"}</div>
                  </div>
                </div>
                { permanentAccountNumberAttachments?.length > 0 && <div className=' mt-6 w-full relative grid grid-cols-2 gap-8 '>
                    {
                      permanentAccountNumberAttachments?.map((item)=>{
                        return <EmployeeImagePreview  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                        fileUrl={item?.node?.mediaItemUrl}  />
                      })
                    }
                </div>}
              </div>

              <div className=' relative w-full'>
                <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Aadhaar</h1>
                <div className=' mt-2 relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Aadhaar Number</div>
                    <div className=' text-[#26212E] text-base block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.aadharNumber || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Name In Aadhaar</div>
                    <div className=' text-[#26212E] text-base block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.aadharName || "N/A"}</div>
                  </div>
                </div>
                { aadharCardAttachments?.length > 0 && <div className=' mt-6 w-full relative grid grid-cols-2 gap-8 '>
                    {
                      aadharCardAttachments?.map((item)=>{
                        return <EmployeeImagePreview  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                        fileUrl={item?.node?.mediaItemUrl}  />
                      })
                    }
                </div>}
              </div>

              <div className=' relative w-full'>
                <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Passport</h1>
                <div className=' mt-2 relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Passport Number</div>
                    <div className=' text-[#26212E] text-base block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.passportNumber || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Name In Passport</div>
                    <div className=' text-[#26212E] text-base block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.passportName || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Expiry Date</div>
                    <div className=' text-[#26212E] text-base block truncate font-medium tracking-[0%] leading-[100%] '>{employee_data?.passportExpiryDate || "N/A"}</div>
                  </div>
                </div>
                { passPortAttachments?.length > 0 && <div className=' mt-6 w-full relative grid grid-cols-2 gap-8 '>
                    {
                      passPortAttachments?.map((item)=>{
                        return <EmployeeImagePreview  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                        fileUrl={item?.node?.mediaItemUrl}  />
                      })
                    }
                </div>}
              </div>


          </div>
          }

        </div>
      </div>
    </>
  )
}