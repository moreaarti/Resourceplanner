import React, { useEffect, useState } from "react";
import SelectHtml from "../../../components/elements/amdital/SelectHtml";
import Input from "../../projects_new/Reusable/Input";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { updateNominationInformation } from "../emplyee/employee_view/employeeFunction";
import { updateNominationInformationApi } from "../emplyee/employeeData";
import ButtonNew from "../../../components/elements/amdital/ButtonNew";
import { fa } from "@faker-js/faker";
import { getSingleEmployeeOnboardingData, nominationOnboardingApi, onboardingOnStepCountHandler } from "./OnboardingNewApi";
import { useNavigate } from "react-router-dom";
import { errorMessageHandler, successfullMessageHandler } from "../../../components/elements/amdital/toastyMessage";
import SelectBoxDropdownNonOutside from "../emplyee/SelectBoxDropdownNonOutside";

const NominationDetails = ({employee_data_redux,isEditing=false}) => {

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [buttonClicked,setButtonClicked]= useState(false);
  const onboarding_redux = useSelector(store=>store?.onboarding)
  const  token_details =onboarding_redux?.onboarding_employee_authentication_data;
  const token =token_details?.authToken;
  const graphqlId = token_details?.user?.id;
  const user_id = token_details?.user?.userId;

  const familyOptions = employee_data_redux?.familyDetails?.map((item,index)=>{return {...item,id:item?.name,uniqueId:index+1}})


  const [fields, setFields] = useState({
    epfNomination: [{ id: 1, name: "", relationship: "", nomination_percentage: "" }],
    epsNomination: [{ id: 1, name: "", relationship: "", nomination_percentage: "" }],
    esiNomination: [{ id: 1, name: "", relationship: "", nomination_percentage: "" }],
    gravityNomination: [{ id: 1, name: "", relationship: "", nomination_percentage: "" }]
  });

  const addNominee = () => {
    setFields((prevFields) => ({
      ...prevFields,
      epfNomination: [
        ...prevFields.epfNomination,
        {
          id: fields?.epfNomination?.length +1, // unique ID
          name: "",
          relationship: "",
          nomination_percentage: ""
        }
      ]
    }));
  };
  
  const removeNominee = (id) => {
    setFields((prev) => ({
      ...prev,
      epfNomination: prev.epfNomination.filter((nominee) => nominee.id !== id)
    }));
  };
  

  const addGravityNominee = () => {
    setFields((prevFields) => ({
      ...prevFields,
      gravityNomination: [
        ...prevFields.gravityNomination,
        {
          id: fields?.gravityNomination?.length +1, // unique ID
          name: "",
          relationship: "",
          nomination_percentage: ""
        }
      ]
    }));
  };

  const removeGravityNominee =(id) => {
    setFields((prev) => ({
      ...prev,
      gravityNomination: prev.gravityNomination.filter((nominee) => nominee.id !== id)
    }));
  };

  const onChangeHandlerEpfNomination = (e, nomineeId) => {
    const { value } = e.target;

   const familyDetails = familyOptions?.filter(item=>item?.name===value);
  
    setFields((prevFields) => ({
      ...prevFields,
      epfNomination: prevFields.epfNomination.map((nominee) =>
        nominee.id === nomineeId ? { ...nominee, name: value,nomination_percentage:"",relationship: familyDetails?.length > 0 ? familyDetails?.[0]?.relationship :"" } : nominee
      )
    }));
  };

  const onChangeHandlerGravityNomination = (e, nomineeId) => {
    const { value } = e.target;

   const familyDetails = familyOptions?.filter(item=>item?.name===value);
  
    setFields((prevFields) => ({
      ...prevFields,
      gravityNomination: prevFields.gravityNomination.map((nominee) =>
        nominee.id === nomineeId ? { ...nominee, name: value,nomination_percentage:"",relationship: familyDetails?.length > 0 ? familyDetails?.[0]?.relationship :"" } : nominee
      )
    }));
  };


    useEffect(() => {
      if (employee_data_redux) {
        setFields({
          epfNomination: employee_data_redux.epfNomination?.length > 0 ? employee_data_redux.epfNomination?.map((item, index) => ({
            id: index + 1, // Assigns ID based on index
            ...item
          })) : [{ id: 1, name: "", relationship: "", nomination_percentage: "" }],
    
          epsNomination: employee_data_redux.epsNomination?.length > 0 ? employee_data_redux.epsNomination?.map((item, index) => ({
            id: index + 1,
            ...item
          })) : [{ id: 1, name: "", relationship: "", nomination_percentage: "" }],
    
          esiNomination: employee_data_redux.esiNomination?.length> 0 ? employee_data_redux.esiNomination?.map((item, index) => ({
            id: index + 1,
            ...item
          })) : [{ id: 1, name: "", relationship: "", nomination_percentage: "" }],
    
          gravityNomination: employee_data_redux.gravityNomination?.length > 0 ? employee_data_redux.gravityNomination?.map((item, index) => ({
            id: index + 1,
            ...item
          })) : [{ id: 1, name: "", relationship: "", nomination_percentage: "" }]
        });
      }
    }, [employee_data_redux]);


      const onSubmitHandler =async (e)=>{
        e.preventDefault();
        setButtonClicked(true);
        const response = await nominationOnboardingApi(user_id,{
        epfNomination:fields?.epfNomination.map(({ id, ...rest }) => rest),
        epsNomination: fields?.epsNomination.map(({ id, ...rest }) => rest),
        esiNomination: fields?.esiNomination.map(({ id, ...rest }) => rest),
        gravityNomination: fields?.gravityNomination.map(({ id, ...rest }) => rest)});
        setButtonClicked(false);

         if(response?.data?.data?.updateUser?.user?.id){
          if(isEditing){
            navigate("/onboarding/onboarding-form/information-summary/8");
            return
          }
         else{
                      const countUpdate = await onboardingOnStepCountHandler(user_id,7);
                      const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
                        successfullMessageHandler(enqueueSnackbar,"Successfully updated. Continue to the next step!");
                        navigate("/onboarding/onboarding-form/7");}
                    }
                    if(response?.data?.errors){
                      errorMessageHandler(enqueueSnackbar,response?.data?.errors?.[0]?.message)
                
                    }
                setButtonClicked(false);
            
      }


  return (
    <>
      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl font-semibold leading-6 text-[#26212E]">
            1. Nominations
          </h1>
          <h6 className="border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            EPF Nomination
          </h6>
          {fields?.epfNomination?.map((nominee, index) => {
            return (
              <>
                <h6 className="flex items-center justify-between border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
                  Nominee {index + 1}
                  { index !== 0 &&<button
                    onClick={() => {
                      removeNominee(nominee.id);
                    }}
                  >
                    <img
                      src="/assets/images/amdital/onboarding/close_icon.svg"
                      alt="Remove"
                    />
                  </button>}
                </h6>
                <div className="grid grid-cols-3 gap-6">
                  
                    {/* <SelectHtml
                      id={`name-${nominee.id}`}
                      name="name"
                      autoComplete="autoComplete"
                      classInput=" w-full h-10 bg-white"
                      optionData={familyOptions}
                      labelName={"Name"}
                      placeholder={"Select nominee"}
                      value={nominee.name}
                      onChange={(e)=>{onChangeHandlerEpfNomination(e,nominee?.id)}}
                    /> */}
                    <div className=" relative w-full">
                                        <SelectBoxDropdownNonOutside
                                          mainWrapperClass={`gap-1`}
                                          labelClassName={` font-medium `}
                                          labelName="Name"
                                          dropDownClassName = { `  max-h-[300px] mt-2 `}
                                          dropDownHeight = {300}
                                          options={familyOptions}
                                          current_value={nominee.name}
                                          current_id={nominee.name ? nominee.name : ""} 
                                          onChangeHandler={(labelName,family)=>{onChangeHandlerEpfNomination({target:{name:"name",value:family?.id}},nominee?.id)}}  
                                          wrapperClass= {` w-full h-10  `} 
                                          bgClassName= {` bg-[#FFFFFF] `}  
                                          searchPlaceholder={"Select nominee"}   
                                          required={false}
                                        />  
                          
                        </div>

                    <Input
                      id={`nomination_percentage-${nominee.id}`}
                      type="text"
                      name="nomination_percentage"
                      autoComplete="autoComplete"
                      classInput="w-full h-10 bg-white"
                      labelName={"Nomination %"}
                      placeholder={"Enter percentage"}
                      value={nominee.nomination_percentage}
                      maxLength={5} // allow for decimals like 99.99
                      onChange={(e) => {
                        let value = e.target.value;
                        const percentageRegex =
                          /^(100(\.0{1,2})?|[0-9]{1,2}(\.\d{1,2})?)?$/;

                        if (percentageRegex.test(value)) {
                          setFields((prev) => ({
                            ...prev,
                            epfNomination: prev.epfNomination.map((item) =>
                              item.id === nominee.id
                                ? { ...item, nomination_percentage: value }
                                : item
                            ),
                          }));
                        }
                      }}
                    />

                    
                </div>
              </>
            );
          })}
        </div>
        <button
          onClick={addNominee}
          className="mx-auto flex w-fit items-center gap-2 text-base font-bold leading-5 text-[#806BFF]"
        >
          <div className="flex size-[18px] items-center justify-center rounded-full border-[1.5px] border-[#806BFF] text-sm font-semibold leading-[18px] text-[#806BFF]">
            +
          </div>
          Add Another Nominee
        </button>
        <div className="flex flex-col gap-6">
          <h6 className="border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            EPS Nomination
          </h6>
          <h6 className="flex items-center justify-between border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            Nominee 1
            <button>
              <img
                src="/assets/images/amdital/onboarding/close_icon.svg"
                alt="Remove"
              />
            </button>
          </h6>
          <div className="grid grid-cols-3 items-end gap-6">
          {/* <SelectHtml
            id={`name`}
            name="name"
            autoComplete="autoComplete"
            classInput="w-full h-10 bg-white"
            labelName={"Name"}
            optionData={familyOptions}
            placeholder={"Select"}
            value={fields?.epsNomination?.[0]?.name}
            onChange={(e) => {
              const { value } = e.target;
              
              setFields((prev) => ({
                ...prev,
                epsNomination: [
                  {
                    ...prev.epsNomination[0],
                    name: value
                  }
                ]
              }));
            }}
          /> */}

          <div className=" relative w-full">
                                        <SelectBoxDropdownNonOutside
                                          mainWrapperClass={`gap-1`}
                                          labelClassName={` font-medium `}
                                          labelName="Name"
                                          dropDownClassName = { `  max-h-[300px] mt-2 `}
                                          dropDownHeight = {300}
                                          options={familyOptions}
                                          current_value={fields?.epsNomination?.[0]?.name}
                                          current_id={fields?.epsNomination?.[0]?.name ? fields?.epsNomination?.[0]?.name : ""} 
                                          onChangeHandler={(labelName,e) => {                                                      
                                                      setFields((prev) => ({
                                                        ...prev,
                                                        epsNomination: [
                                                          {
                                                            ...prev.epsNomination[0],
                                                            name: e.id
                                                          }
                                                        ]
                                                      }));
                                                    }} 
                                          wrapperClass= {` w-full h-10  `} 
                                          bgClassName= {` bg-[#FFFFFF] `}  
                                          searchPlaceholder={"Select"}   
                                          required={false}
                                        />  
                          
                        </div>

            </div>
        </div>
        <div className="flex flex-col gap-6">
          <h6 className="border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            ESI Nomination
          </h6>
          <h6 className="flex items-center justify-between border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            Nominee 1
            <button>
              <img
                src="/assets/images/amdital/onboarding/close_icon.svg"
                alt="Remove"
              />
            </button>
          </h6>
          <div className="grid grid-cols-3 items-end gap-6">
            {/* <SelectHtml
              id={`name`}
              name="name"
              autoComplete="autoComplete"
              classInput=" w-full h-10 bg-white"
              labelName={"Name"}
              optionData={familyOptions}
              placeholder={"Select"}
              value={fields?.esiNomination?.[0]?.name}
              onChange={(e) => {
                const { value } = e.target;
                setFields((prev) => ({
                  ...prev,
                  esiNomination: [
                    {
                      ...prev.esiNomination[0],
                      name: value
                    }
                  ]
                }));
              }}
            /> */}
            <div className=" relative w-full">
                                        <SelectBoxDropdownNonOutside
                                          mainWrapperClass={`gap-1`}
                                          labelClassName={` font-medium `}
                                          labelName="Name"
                                          dropDownClassName = { `  max-h-[300px] mt-2 `}
                                          dropDownHeight = {300}
                                          options={familyOptions}
                                          current_value={fields?.esiNomination?.[0]?.name}
                                          current_id={fields?.esiNomination?.[0]?.name ? fields?.esiNomination?.[0]?.name : ""} 
                                          onChangeHandler={(labelName,e) => {
                                                                                                           
                                                     setFields((prev) => ({
                                                              ...prev,
                                                              esiNomination: [
                                                                {
                                                                  ...prev.esiNomination[0],
                                                                  name: e.id
                                                                }
                                                              ]
                                                            }));
                                                    }} 
                                          wrapperClass= {` w-full h-10  `} 
                                          bgClassName= {` bg-[#FFFFFF] `}  
                                          searchPlaceholder={"Select"}   
                                          required={false}
                                        />  
                          
                        </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h6 className="border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
            Gravity Nomination
          </h6>
          {fields?.gravityNomination?.map((nominee, index) => {
            return (
              <>
                <h6 className="flex items-center justify-between border-b border-[#E1DCFF] pb-1 text-base font-medium leading-5 text-[#26212E]">
                  Nominee {index + 1}
                  {index !==0 &&<button
                    onClick={() => {
                      removeGravityNominee(nominee.id);
                    }}
                  >
                    <img
                      src="/assets/images/amdital/onboarding/close_icon.svg"
                      alt="Remove"
                    />
                  </button>}
                </h6>
                <div className="grid grid-cols-3 gap-6">
                  {/* <SelectHtml
                    id={`name-${nominee.id}`}
                    name="name"
                    autoComplete="autoComplete"
                    classInput=" w-full h-10 bg-white"
                    labelName={"Name"}
                    optionData={familyOptions}
                    placeholder={"Select"}
                    value={nominee.name}
                    onChange={(e)=>{onChangeHandlerGravityNomination(e,nominee?.id)}}
                  /> */}
                  <div className=" relative w-full">
                                        <SelectBoxDropdownNonOutside
                                          mainWrapperClass={`gap-1`}
                                          labelClassName={` font-medium `}
                                          labelName="Name"
                                          dropDownClassName = { `  max-h-[300px] mt-2 `}
                                          dropDownHeight = {300}
                                          options={familyOptions}
                                          current_value={nominee.name}
                                          current_id={nominee.name ? nominee.name : ""} 
                                          onChangeHandler={(labelName,family)=>{onChangeHandlerGravityNomination({target:{name:"name",value:family?.id}},nominee?.id)}}  
                                          wrapperClass= {` w-full h-10  `} 
                                          bgClassName= {` bg-[#FFFFFF] `}  
                                          searchPlaceholder={"Select  nominee"}   
                                          required={false}
                                        />  
                          
                        </div>
                  <Input
                    id={`nomination_percentage-${nominee.id}`}
                    type="text"
                    name="nomination_percentage"
                    autoComplete="autoComplete"
                    classInput="w-full h-10 bg-white"
                    labelName={"Nomination %"}
                    value={nominee.nomination_percentage}
                    placeholder={"Enter percentage"}
                    maxLength={5} // Prevents numbers like 1000
                    onChange={(e) => {
                      let value = e.target.value;
                      const percentageRegex =
                        /^(100(\.0{1,2})?|[0-9]{1,2}(\.\d{1,2})?)?$/;

                      if (percentageRegex.test(value)) {
                        setFields((prev) => ({
                          ...prev,
                          gravityNomination: prev.gravityNomination.map((item) =>
                            item.id === nominee.id
                              ? { ...item, nomination_percentage: value }
                              : item
                          ),
                        }));
                      }
                    }}
                  />
                  
                </div>
              </>
            );
          })}
        </div>
        <button
          onClick={addGravityNominee}
          className="mx-auto flex w-fit items-center gap-2 text-base font-bold leading-5 text-[#806BFF]"
        >
          <div className="flex size-[18px] items-center justify-center rounded-full border-[1.5px] border-[#806BFF] text-sm font-semibold leading-[18px] text-[#806BFF]">
            +
          </div>
          Add Another Nominee
        </button>
      </div>
      <div className=" flex justify-center mt-[64px] gap-4 tracking-[5%] ">
                                        <ButtonNew
                                                  type="button"
                                                  buttonName= "Back"
                                                  buttonClassName = {` w-[83px] bg-[#FFFFFF] hover:bg-[#FFF2ED]  border-[#FF845C] border-2 text-[#FF845C] h-10  outline-none text-sm leading-[100%] tracking-[5%]  font-semibold   `}
                                                  spanClassName = " border-[#FFFFFF] "
                                                  onClick={async()=>{
                                                    if(isEditing){
                                                      
                                                    }
                                                    else{
                                                      const countUpdate = await onboardingOnStepCountHandler(user_id,5);
                                                      const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
                                                      navigate("/onboarding/onboarding-form/5");
                                                    }
                                                  }}
                                                />
                                        <ButtonNew
                                                type="button"
                                                buttonName= "Save and Next"
                                                buttonClassName = {` ${ buttonClicked ? ` bg-[#F36A3D]  w-[170px] ` : ` w-[149px]  bg-[#FF845C] hover:bg-[#F36A3D] `} h-10  outline-none text-base leading-3 font-semibold text-[#FFFFFF]  `}
                                                spanClassName = " border-[#FFFFFF] "
                                                isLoading= {buttonClicked}
                                                onClick={onSubmitHandler}
                                              />
                        </div>
    </>
  );
};

export default NominationDetails;
