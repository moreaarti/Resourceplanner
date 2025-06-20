import React, { useEffect, useState } from 'react'
import config from '../../../../config/config';
import ButtonNew from '../../../../components/elements/amdital/ButtonNew';
import Input from '../../../projects_new/Reusable/Input';
import SelectHtml from '../../../../components/elements/amdital/SelectHtml';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import {  fileDeleteHandler, fileUploadedHandler, getSingalEmployeeData, sourceUrlConvertToImageName, updateAddressInformation } from './employeeFunction';
import { useSnackbar } from 'notistack';
import EmployeeImagePreview from './EmployeeImagePreview';
import EmployeeImageEdit from './EmployeeImageEdit';
import EmployeeInputAttachementFile from './EmployeeInputAttachementFile';

export default function AddressInformation({employee_data,attachments_data,params_id,editComponent}){

  const { enqueueSnackbar } = useSnackbar();

    const storeRedux =useSelector(store =>store);
    const data = Cookies.get('token');
    const user_details = data ?  JSON?.parse(data) : "";
    const token = user_details?.authToken;
  
    const countryReduxData = storeRedux?.general.country_data;

    const countryOptions = countryReduxData?.map((item)=>{
      return {id:item?.code,name:item?.name}
    });


  const [editView,setEditView] = useState(false);

  const [buttonClicked,setButtonClicked]= useState(false);

  const [fields,setFields] = useState({
    address:employee_data?.address || "",
    addressStreet:employee_data?.addressStreet || "",
    addressArea:employee_data?.addressArea || "",
    addressCity:employee_data?.addressCity || "",
    userCountry:employee_data?.userCountry || "",
    userState:employee_data?.userState || "",
    addressPin:employee_data?.addressPin || "",
    addressPhone:employee_data?.addressPhone || "",
    isSameAsPermanent:employee_data?.isSameAsPermanent ? true : false || false,
    presentAddress:employee_data?.presentAddress || "",
    presentAddressStreet:employee_data?.presentAddressStreet || "",
    presentAddressArea:employee_data?.presentAddressArea || "",
    presentAddressCity:employee_data?.presentAddressCity || "",
    presentAddressCountry:employee_data?.presentAddressCountry || "",
    presentAddressState:employee_data?.presentAddressState || "",
    presentAddressPin:employee_data?.presentAddressPin || "",
    presentAddressPhone:employee_data?.presentAddressPhone||"",
  });

  const onChangeHandler =(e)=>{
    const {name,value} = e.target;
    setFields({...fields,[name]:value})
  }

  const onSubmitHandler =async (e)=>{
    e.preventDefault();
    setButtonClicked(true)
     const response = await updateAddressInformation(params_id,fields,enqueueSnackbar);
          const employee_data = await getSingalEmployeeData(params_id);
          if( response?.data?.data?.updateUser){
            setEditView(!editView)
          }
          setButtonClicked(false);
  }

  const [stateList,setStateList]=useState([]);
  const [presentListView,setPresentListView]=useState([]);

  useEffect(()=>{
    if(fields?.userCountry){
      async function stateApi(){
        const presentStateResponse = await stateApiCallingHandler(fields?.userCountry);
        setStateList(presentStateResponse?.data?.data?.getStates ? presentStateResponse?.data?.data?.getStates : [])
      }
      stateApi();
    }
    if(fields?.presentAddressCountry){
      async function stateApi(){
        const presentStateResponse = await stateApiCallingHandler(fields?.presentAddressCountry);
        setPresentListView(presentStateResponse?.data?.data?.getStates ? presentStateResponse?.data?.data?.getStates : [])
      }
      stateApi();
    }
  },[fields?.userCountry,fields?.presentAddressCountry]);

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
      return res
  }

  const setpermanentDataHandelr =(e)=>{
    const {name, value,checked} = e.target;
    if(checked){
      setFields({...fields,
        isSameAsPermanent:checked, 
        presentAddress:fields?.address,
        presentAddressStreet:fields?.addressStreet,
        presentAddressArea:fields?.addressArea,
        presentAddressCity:fields?.addressCity,
        presentAddressCountry:fields?.userCountry,
        presentAddressState:fields?.userState,
        presentAddressPin:fields?.addressPin,
        presentAddressPhone:fields?.addressPhone,
      })
    }
    else{
      setFields({...fields,
        isSameAsPermanent:checked, 
      presentAddress:employee_data?.presentAddress || "",
      presentAddressStreet:employee_data?.presentAddressStreet || "",
      presentAddressArea:employee_data?.presentAddressArea || "",
      presentAddressCity:employee_data?.presentAddressCity || "",
      presentAddressCountry:employee_data?.presentAddressCountry || "",
      presentAddressState:employee_data?.presentAddressState || "",
      presentAddressPin:employee_data?.presentAddressPin || "",
      presentAddressPhone:employee_data?.presentAddressPhone||"",
    })
    }
  }

  useEffect(()=>{
    setFields({ 
      address:employee_data?.address || "",
      addressStreet:employee_data?.addressStreet || "",
      addressArea:employee_data?.addressArea || "",
      addressCity:employee_data?.addressCity || "",
      userCountry:employee_data?.userCountry || "",
      userState:employee_data?.userState || "",
      addressPin:employee_data?.addressPin || "",
      addressPhone:employee_data?.addressPhone || "",
      isSameAsPermanent:employee_data?.isSameAsPermanent ? true : false || false,
      presentAddress:employee_data?.presentAddress || "",
      presentAddressStreet:employee_data?.presentAddressStreet || "",
      presentAddressArea:employee_data?.presentAddressArea || "",
      presentAddressCity:employee_data?.presentAddressCity || "",
      presentAddressCountry:employee_data?.presentAddressCountry || "",
      presentAddressState:employee_data?.presentAddressState || "",
      presentAddressPin:employee_data?.presentAddressPin || "",
      presentAddressPhone:employee_data?.presentAddressPhone||"",})
  },[employee_data])

  const [presentAddressAttachments,setPresentAddressAttachments]=useState([]);
  const [permanentAddressAttachments,setPermanentAddressAttachments]=useState([]);
 

  useEffect(()=>{
    if(attachments_data?.edges?.length > 0){
      const presentAddress = attachments_data?.edges?.filter((image)=>{
        if(image?.node?.altText === "presentAddress"){
          return image
        }
      });
      const permanentAddress = attachments_data?.edges?.filter((image)=>{
        if(image?.node?.altText === "permanentAddress"){
          return image
        }
      })
      setPresentAddressAttachments(presentAddress);
      setPermanentAddressAttachments(permanentAddress);
    }
    else{
      setPresentAddressAttachments([]);
      setPermanentAddressAttachments([]);
    }

  },[attachments_data])


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
            2.<span className=' ml-2'>Address</span>
          </div>
         { !editView && <img onClick={()=>{setEditView(!editView)}} src={config.PUBLIC_URL + "/assets/images/amdital/edit_icon_gray_color.svg"} alt='' className={`  cursor-pointer ${ !editComponent && ` hidden`} `}/>}
        </div>
        <div className=' mt-6 '>
          {
            editView ? 
            <div> 
              <form onSubmit={onSubmitHandler}>
                <div>
                  <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Present Address</h1>
                  <div className=' relative w-full grid  grid-cols-2 min-[1400px]:grid-cols-3 gap-x-8 gap-y-6 mt-6 '>     
                      <Input
                          id="address" 
                          type="text" 
                          name="address"
                          value={fields?.address} 
                          onChange={onChangeHandler}
                          autoComplete="autoComplete"
                          placeholder="Enter your address"
                          classInput=" w-full h-10 "
                          labelName={"Address"}
                          required={"required"}
                        />                
                        <Input
                          id="addressStreet" 
                          type="text" 
                          name="addressStreet"
                          value={fields?.addressStreet} 
                          onChange={onChangeHandler}
                          autoComplete="autoComplete"
                          placeholder="Enter your address street"
                          classInput=" w-full h-10 "
                          labelName={"Street"}
                          required={"required"}
                        />
                        <Input
                          id="addressArea" 
                          type="text" 
                          name="addressArea"
                          value={fields?.addressArea} 
                          onChange={onChangeHandler}
                          autoComplete="autoComplete"
                          placeholder="Enter your address Area"
                          classInput=" w-full h-10 "
                          labelName={"Area"}
                          required={"required"}
                        />
                        <Input
                          id="city" 
                          type="text" 
                          name="addressCity"
                          value={fields?.addressCity} 
                          onChange={onChangeHandler}
                          autoComplete="autoComplete"
                          placeholder="Enter your father name"
                          classInput=" w-full h-10 "
                          labelName={"City"}
                          required={"required"}
                        />                          
                        <SelectHtml
                        id="userCountry"
                        name="userCountry"
                        value={fields?.userCountry} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        classInput=" w-full h-10 "
                        labelName={"Country"}
                        optionData={countryOptions}
                        required
                        placeholder={"Select country of origin"}
                      />
                      <SelectHtml
                       id="state"
                       name="userState"
                       value={fields?.userState} 
                       onChange={onChangeHandler}
                       autoComplete="autoComplete"
                       classInput=" w-full h-10 "
                       labelName={"State"}                    
                       placeholder={"Select state"}
                       optionData={stateList}
                     />  
                      <Input
                          id="pin" 
                          type="text" 
                          name="addressPin"
                          value={fields?.addressPin} 
                          onChange={onChangeHandler}
                          autoComplete="autoComplete"
                          placeholder="Enter pin"
                          classInput=" w-full h-10 "
                          labelName={"Pin"}
                          required={"required"}
                        /> 
                        <Input
                        id="addressPhone"
                        type="phone"
                        name="addressPhone"
                        maxLength={10}
                        minLength={10}
                        autoComplete="autoComplete"
                        placeholder="Enter phone number"
                        classInput=" w-full h-10 !bg-white"
                        labelName={"Phone"}
                        value={fields.addressPhone}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setFields((prev) => ({
                              ...prev,
                              addressPhone: value,
                            }));
                          }
                        }}
                        required={"required"}
                      />
                                                                
                  </div>
                  {
                    <div className=' w-full relative mt-6 '>
                      <div className=' w-full relative grid grid-cols-2 gap-8'>
                        {
                          presentAddressAttachments?.map((item)=>{
                            return <EmployeeImageEdit onDelete={()=>{fileDeleteHandler(item?.node?.mediaItemId,params_id)}}  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                            fileUrl={item?.node?.mediaItemUrl}  />
                          })
                        }
                        <EmployeeInputAttachementFile name="presentAddress" onChange={(e)=>{fileUploadedHandler(e,params_id,"presentAddress",enqueueSnackbar)}}/>
                      </div>
                          
                    </div>
                  }
                  <label className={` cursor-pointer my-6 flex items-center space-x-2 pb-2 custom-table`}>
                      <input
                        type="checkbox"                                         
                        className="min-w-5 min-h-5"
                        checked={fields?.isSameAsPermanent}
                        onChange={setpermanentDataHandelr}
                      />
                      <p className="whitespace-nowrap text-sm font-normal text-[#26212E] ">
                        {"Same as Permanent"}
                      </p>
                    </label>
                    <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>
                      Permanent Address</h1>
                  <div className=' relative w-full grid  grid-cols-2 min-[1400px]:grid-cols-3 gap-x-8 gap-y-6 mt-6 '>     
                      <Input
                          id="presentAddress" 
                          type="text" 
                          name="presentAddress"
                          value={fields?.presentAddress} 
                          onChange={onChangeHandler}
                          autoComplete="autoComplete"
                          placeholder="Enter your address"
                          classInput=" w-full h-10 "
                          labelName={"presentAddress"}
                          required={"required"}
                        />                
                        <Input
                          id="presentAddressStreet" 
                          type="text" 
                          name="presentAddressStreet"
                          value={fields?.presentAddressStreet} 
                          onChange={onChangeHandler}
                          autoComplete="autoComplete"
                          placeholder="Enter your street"
                          classInput=" w-full h-10 "
                          labelName={"Street"}
                          required={"required"}
                        />
                        <Input
                          id="presentAddressArea" 
                          type="text" 
                          name="presentAddressArea"
                          value={fields?.presentAddressArea} 
                          onChange={onChangeHandler}
                          autoComplete="autoComplete"
                          placeholder="Enter your address area"
                          classInput=" w-full h-10 "
                          labelName={"Area"}
                          required={"required"}
                        />

                        <Input
                          id="presentAddressCity" 
                          type="text" 
                          name="presentAddressCity"
                          value={fields?.presentAddressCity} 
                          onChange={onChangeHandler}
                          autoComplete="autoComplete"
                          placeholder="Enter your city"
                          classInput=" w-full h-10 "
                          labelName={"City"}
                          required={"required"}
                        />                        
                        <SelectHtml
                        id="presentAddressCountry"
                        name="presentAddressCountry"
                        value={fields?.presentAddressCountry} 
                        onChange={onChangeHandler}
                        autoComplete="autoComplete"
                        classInput=" w-full h-10 "
                        labelName={"Country"}
                        optionData={countryOptions}
                        required
                        placeholder={"Select country"}
                      />
                      <SelectHtml
                       id="presentAddressState"
                       name="presentAddressState"
                       value={fields?.presentAddressState} 
                       onChange={onChangeHandler}
                       autoComplete="autoComplete"
                       classInput=" w-full h-10 "
                       labelName={"State"}                    
                       placeholder={"Select state"}
                       optionData={presentListView}
                     />  
                      <Input
                          id="presentAddressPin" 
                          type="text" 
                          name="presentAddressPin"
                          value={fields?.presentAddressPin} 
                          onChange={onChangeHandler}
                          autoComplete="autoComplete"
                          placeholder="Enter pin"
                          classInput=" w-full h-10 "
                          labelName={"Pin"}
                          required={"required"}
                        />  

                        <Input
                        id="phone"
                        type="phone"
                        name="phone"
                        maxLength={10}
                        minLength={10}
                        autoComplete="autoComplete"
                        placeholder="Enter phone number"
                        classInput=" w-full h-10 !bg-white"
                        labelName={"Phone"}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setFields((prev) => ({
                              ...prev,
                              presentAddressPhone: value,
                            }));
                          }
                        }}
                        value={fields.presentAddressPhone }
                        required={"required"}
                      /> 
                                                                                        
                  </div>
                  {
                    <div className=' w-full relative mt-6 '>
                      <div className=' w-full relative grid grid-cols-2 gap-8'>
                        {
                          permanentAddressAttachments?.map((item)=>{
                            return  <EmployeeImageEdit onDelete={()=>{fileDeleteHandler(item?.node?.mediaItemId,params_id)}}  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                            fileUrl={item?.node?.mediaItemUrl}  />
                          })
                        }
                        <EmployeeInputAttachementFile name="permanentAddress" onChange={(e)=>{fileUploadedHandler(e,params_id,"permanentAddress",enqueueSnackbar)}}/>
                      </div>
                          
                    </div>
                  }
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
            <div className=' relative w-full  flex flex-col gap-4 '> 
             <div className=' relative w-full mt-6 '>
                <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Present Address</h1>
                <div className=' mt-2 relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Address</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.address || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Street</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.addressStreet || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Area</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.addressArea || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>City</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.addressCity || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Country</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{countryNameDisplay(employee_data?.userCountry) || "N/A"}</div>
                  </div>
                  { <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>State</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>
                      {employee_data?.userState || "N/A"}
                    </div>
                  </div>}
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Pin</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.addressPin || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Phone</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.addressPhone || "N/A"}</div>
                  </div>
                </div>
               { presentAddressAttachments?.length > 0 && <div className=' mt-6 w-full relative grid grid-cols-2 gap-8 '>
                    {
                      presentAddressAttachments?.map((item)=>{
                        return <EmployeeImagePreview  name={sourceUrlConvertToImageName(item?.node?.mediaItemUrl)} type={item?.node?.mimeType} size={10000} 
                        fileUrl={item?.node?.mediaItemUrl }  />
                      })
                    }
                </div>}
              </div>
              
              <div className=' relative w-full '>
                <h1 className=' text-[#26212E] text-sm font-bold tracking-[0%] leading-[100%] uppercase '>Permanent Address</h1>
                <div className=' mt-2 relative w-full  grid grid-cols-3   2xl:gap-x-[56px] gap-y-6'>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Address</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.presentAddress || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Street</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.presentAddressStreet || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Area</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.presentAddressArea || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>City</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.presentAddressCity || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Country</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{countryNameDisplay(employee_data?.presentAddressCountry) || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>State</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.presentAddressState || "N/A"}</div>
                  </div>
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Pin</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.presentAddressPin || "N/A"}</div>
                  </div>  
                  <div className=' relative flex flex-col gap-1 '>
                    <div className=' text-[#26212E] text-sm font-medium tracking-[0%] leading-[100%] '>Phone</div>
                    <div className=' text-[#26212E] text-base font-medium tracking-[0%] leading-[100%]  block truncate '>{employee_data?.presentAddressPhone || "N/A"}</div>
                  </div>                 
                </div>
                { permanentAddressAttachments?.length > 0 && <div className=' mt-6 w-full relative grid grid-cols-2 gap-8 '>
                    {
                      permanentAddressAttachments?.map((item)=>{
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