import { useEffect, useState } from "react";
import Input from "../../projects_new/Reusable/Input";
import InputDate from "../../projects_new/Reusable/InputDate";
import SelectHtml from "../../../components/elements/amdital/SelectHtml";
import ButtonNew from "../../../components/elements/amdital/ButtonNew";
import { familyMemberOnboardingApi, getSingleEmployeeOnboardingData, onboardingOnStepCountHandler } from "./OnboardingNewApi";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import CustomDateInput from "../../../components/elements/amdital/CustomDate/CustomDateInput";
import config from "../../../config/config";
import VaildationSelectionBox from "../../../components/elements/amdital/VaildationSelectionBox";
import { errorMessageHandler, successfullMessageHandler } from "../../../components/elements/amdital/toastyMessage";
import SelectBoxDropdownNonOutside from "../emplyee/SelectBoxDropdownNonOutside";

const FamilyDetails = ({isEditing=false,optionData,countryData,employee_data_redux}) => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
       const [buttonClicked, setButtonClicked] = useState(false);
        const onboarding_redux = useSelector(store=>store?.onboarding)
        const  token_details =onboarding_redux?.onboarding_employee_authentication_data;
        const token =token_details?.authToken;
        const graphqlId = token_details?.user?.id;
        const user_id = token_details?.user?.userId;
  
        const countryOptions = countryData?.map((item)=>{
          return {id:item?.code,name:item?.name}
        });

 const [familyDetails, setFamilyDetails] = useState([
    {
      id: 1,
      blood_group: "",
      date_of_birth: "",
      gender: "",
      has_mental_illness: false,
      illness_type: "",
      is_minor: false,
      mobile: "",
      name: "",
      nationality: "",
      relationship: "",
    },
  ]);
  const [validationError, setValidationError] = useState({ dateOfBirthId: [],bloodGroups:[],gender:[],relationship:[] });

  useEffect(() => {
    if (employee_data_redux?.familyDetails?.length > 0) {
      const family_data = employee_data_redux?.familyDetails?.map((item, index) => {
        return { ...item, id: index + 1 };
      });
      setFamilyDetails(family_data);
    }
  }, [employee_data_redux]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const data_relationship = familyDetails?.filter(
      (item) => item?.relationship === "",
    );
    if (data_relationship?.length > 0) {
      setValidationError({
        ...validationError,
        relationship: data_relationship?.map((item) => item?.id),
      });
      setButtonClicked(false);
      return false;
    }
  
    const date_emty = familyDetails?.filter(
      (item) => item?.date_of_birth === "",
    );
    if (date_emty?.length > 0) {
      setValidationError({
        ...validationError,
        dateOfBirthId: date_emty?.map((item) => item?.id),
      });
      setButtonClicked(false);
      return false;
    }

        const data_blood_groups = familyDetails?.filter(
      (item) => item?.blood_group === "",
    );

                const data_gender = familyDetails?.filter(
      (item) => item?.gender === "",
    );
    if (data_gender?.length > 0) {
      setValidationError({
        ...validationError,
        gender: data_gender?.map((item) => item?.id),
      });
      setButtonClicked(false);
      return false;
    }

    if (data_blood_groups?.length > 0) {
      setValidationError({
        ...validationError,
        bloodGroups: data_blood_groups?.map((item) => item?.id),
      });
      setButtonClicked(false);
      return false;
    }



    setButtonClicked(true);
    const updatedFamilyDetails = familyDetails.map(({ id, ...rest }) => rest);
    const response_family = await familyMemberOnboardingApi(user_id,updatedFamilyDetails)
             if(response_family?.data?.data?.updateUser?.user?.id){
              if(isEditing){
                navigate("/onboarding/onboarding-form/information-summary/8");
                return
              }else{
                  const countUpdate = await onboardingOnStepCountHandler(user_id,6);
                  const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
                    successfullMessageHandler(enqueueSnackbar,"Successfully updated. Continue to the next step!");
                    navigate("/onboarding/onboarding-form/6");
                  }
                }
                if(response_family?.data?.errors){
                  errorMessageHandler(enqueueSnackbar,response_family?.data?.errors?.[0]?.message)
            
                }
            setButtonClicked(false);
  };

  const onChangeHandler = (e, id) => {
    const { name, value } = e.target;
    setFamilyDetails((prevFields) =>
      prevFields.map((item) =>
        item.id === id ? { ...item, [name]: value } : item,
      ),
    );
  };

  const onChangeDateHandler = (e, id) => {
    const { name, value } = e.target;
    setFamilyDetails((prevFields) =>
      prevFields.map((item) =>
        item.id === id ? { ...item, date_of_birth: value } : item,
      ),
    );
  };

  const onChangeMinorHandler = (e, id) => {
    const { checked } = e.target;
    setFamilyDetails((prevFields) =>
      prevFields.map((item) =>
        item.id === id ? { ...item, is_minor: checked } : item,
      ),
    );
  };
  const onChangeMentalHandler = (e, id) => {
    const { checked } = e.target;
    setFamilyDetails((prevFields) =>
      prevFields.map((item) =>
        item.id === id ? { ...item, has_mental_illness: checked } : item,
      ),
    );
    setFamilyDetails((prevFields) =>
      prevFields.map((item) =>
        item.id === id ? { ...item, illness_type: "" } : item,
      ),
    );

  };

  const addFamilyDetails = (count) => {
    setFamilyDetails([
      ...familyDetails,
      {
        id: count + 1,
        blood_group: "",
        date_of_birth: "",
        gender: "",
        has_mental_illness: false,
        illness_type: "",
        is_minor: false,
        mobile: "",
        name: "",
        nationality: "",
        relationship: "",
      },
    ]);
  };
  const removeItem = (id) => {
    const family_detail_data = familyDetails?.filter(
      (value) => value?.id !== id,
    );
    setFamilyDetails(family_detail_data);
  };

  useEffect(() => {
    if (validationError?.dateOfBirthId?.length > 0 || validationError?.bloodGroups?.length > 0 || validationError?.gender?.length > 0 || validationError?.relationship?.length > 0) {
      setTimeout(() => {
        setValidationError({ ...validationError, dateOfBirthId: [],bloodGroups: [] ,gender: [],relationship: [] });
      }, 2500);
    }
  }, [validationError?.dateOfBirthId,validationError?.bloodGroups,validationError?.gender,validationError?.relationship]);

  return (
    <form onSubmit={onSubmitHandler}>

        <h1 className="text-xl font-semibold leading-6 text-[#26212E] mb-[22px]">
                5. Family Details
              </h1> 
                {familyDetails?.map((item, index) => {
                  return (
                    <>
                      <div className={` w-full `}>
                        <div className=" mb-2 text-base font-medium  leading-[100%] tracking-[0%]">
                          {"Member " + (index + 1)}
                        </div>
                        <hr className=' w-full mb-6 '/>
                        <div
                          className={` w-full  ${
                            index !== 0 ? ` block ` : ` hidden`
                          } `}
                        >
                          {/* <hr className=" w-full " /> */}
                          <div className="  flex w-full justify-end ">
                            <img
                              src={
                                config.PUBLIC_URL +
                                "/assets/images/amdital/onboarding/close_icon.svg"
                              }
                              alt=""
                              className=" h-fit w-fit  cursor-pointer "
                              onClick={() => {
                                removeItem(item?.id);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className=" relative grid w-full  grid-cols-3 gap-x-8 gap-y-6 min-[1400px]:grid-cols-3 ">
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          value={item?.name}
                          onChange={(e) => {
                            const { name, value } = e.target;
                            const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
                            
                            // Create a new event-like object with filtered value
                            onChangeHandler(
                              {
                                target: {
                                  name,
                                  value: filteredValue,
                                },
                              },
                              item?.id
                            );
                          }}
                          autoComplete="autoComplete"
                          placeholder="Enter Name"
                          classInput=" w-full h-10 !bg-[#FFFFFF] "
                          labelName={"Name"}
                          required={"required"}
                        />
                        {/* <SelectHtml
                          id="relationship"
                          name="relationship"
                          value={item?.relationship}
                          onChange={(e) => {
                            onChangeHandler(e, item?.id);
                          }}
                          autoComplete="autoComplete"
                          classInput=" w-full h-10  !bg-[#FFFFFF] "
                          labelName={"Relationship"}
                          optionData={[
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
                        /> */}

                        <div className=" relative w-full">
                                        <SelectBoxDropdownNonOutside
                                          mainWrapperClass={`gap-1`}
                                          labelClassName={` font-medium `}
                                          labelName="Relationship"
                                          dropDownClassName = { `  max-h-[300px] mt-2 `}
                                          dropDownHeight = {300}
                                          options={optionData.relationshipOptions}
                                          current_value={item?.relationship}
                                          current_id={item?.relationship ? item?.relationship : ""} 
                                          onChangeHandler={(labelName,relationship)=>{onChangeHandler({target:{name:"relationship",value:relationship?.id}},item?.id)}}  
                                          wrapperClass= {` w-full h-10  `} 
                                          bgClassName= {` bg-[#FFFFFF] `}  
                                          searchPlaceholder={"Select relationship"}   
                                          required={true}
                                        />  
                          {validationError?.relationship?.[index] ===
                            item?.id && (
                            <div className=" absolute flex w-full  justify-center ">
                              <VaildationSelectionBox />
                            </div>
                          )}                                       
                        
                        </div>

                        <div className=" relative w-full  ">
                          <CustomDateInput
                            label="Date Of Birth"
                            inputWidth="100%"
                            inputHeight="40px"
                            labelWidth="120px"
                            value={item?.date_of_birth}
                            onChange={(e) => {
                              onChangeDateHandler(e, item?.id);
                            }}
                            required={"required"}
                            placeholder="YYYY/MM/DD"
                             wrapperClass="mt-1"
                            inputClass="!bg-[#FFFFFF] "
                            />
                          {validationError?.dateOfBirthId?.[index] ===
                            item?.id && (
                            <div className=" absolute flex w-full  justify-center ">
                              <VaildationSelectionBox />
                            </div>
                          )}
                        </div>
                        {/* <SelectHtml
                          id="gender"
                          name="gender"
                          value={item?.gender}
                          onChange={(e) => {
                            onChangeHandler(e, item?.id);
                          }}
                          autoComplete="autoComplete"
                          classInput=" w-full h-10  !bg-[#FFFFFF] "
                          labelName={"Gender"}
                          optionData={[
                            { id: "Male", name: "Male" },
                            { id: "Female", name: "Female" },
                            { id: "Other", name: "Other" },
                          ]}
                          required
                          placeholder={"Select gender"}
                        /> */}
                        <div className=" relative w-full">
                                        <SelectBoxDropdownNonOutside
                                          mainWrapperClass={`gap-1`}
                                          labelClassName={` font-medium `}
                                          labelName="Gender"
                                          dropDownClassName = { `  max-h-[300px] mt-2 `}
                                          dropDownHeight = {300}
                                          options={optionData.gender}
                                          current_value={item?.gender}
                                          current_id={item?.gender ? item?.gender : ""} 
                                          onChangeHandler={(labelName,gender)=>{onChangeHandler({target:{name:"gender",value:gender?.id}},item?.id)}}  
                                          wrapperClass= {` w-full h-10  `} 
                                          bgClassName= {` bg-[#FFFFFF] `}  
                                          searchPlaceholder={"Select gender"}   
                                          required={true}
                                        />  
                          {validationError?.gender?.[index] ===
                            item?.id && (
                            <div className=" absolute flex w-full  justify-center ">
                              <VaildationSelectionBox />
                            </div>
                          )}                                       
                        
                        </div>
                         <div className=" relative w-full">
                                        <SelectBoxDropdownNonOutside
                                          mainWrapperClass={`gap-1`}
                                          labelClassName={` font-medium `}
                                          labelName="Blood Group"
                                          dropDownClassName = { `  max-h-[300px] mt-2 `}
                                          dropDownHeight = {300}
                                          options={optionData.bloodGroups}
                                          current_value={item?.blood_group}
                                          current_id={item?.blood_group ? item?.blood_group : ""} 
                                          onChangeHandler={(labelName,group)=>{onChangeHandler({target:{name:"blood_group",value:group?.id}},item?.id)}}  
                                          wrapperClass= {` w-full h-10  `} 
                                          bgClassName= {` bg-[#FFFFFF] `}  
                                          searchPlaceholder={"Select blood group"}   
                                          required={true}
                                        />  
                          {validationError?.bloodGroups?.[index] ===
                            item?.id && (
                            <div className=" absolute flex w-full  justify-center ">
                              <VaildationSelectionBox />
                            </div>
                          )}                                       
                        
                                      </div>
                        {/* <SelectHtml
                          id="blood_group"
                          name="blood_group"
                          value={item?.blood_group}
                          onChange={(e) => {
                            onChangeHandler(e, item?.id);
                          }}
                          autoComplete="autoComplete"
                          classInput=" w-full h-10  !bg-[#FFFFFF] "
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
                        /> */}
                        <SelectHtml
                          id="nationality"
                          name="nationality"
                          value={item?.nationality}
                          onChange={(e) => {
                            onChangeHandler(e, item?.id);
                          }}
                          autoComplete="autoComplete"
                          classInput=" w-full h-10  !bg-[#FFFFFF] "
                          labelName={"Nationality"}
                          optionData={countryOptions}
                          placeholder={"Select nationality"}
                          required
                        />
                        <div className=" relative w-full  ">
                          <label className=" w-fit dashboard-table flex cursor-pointer items-center gap-1 text-sm font-medium leading-[100%] tracking-[0%] ">
                            <input
                              onChange={(e) => {
                                onChangeMinorHandler(e, item?.id);
                              }}
                              type="checkbox"
                              className=" min-h-5 min-w-5"
                            />
                            Minor
                          </label>
                        </div>

                        <div className=" flex flex-col gap-2">
                          <label className=" w-fit dashboard-table flex cursor-pointer items-center gap-1 text-sm font-medium leading-[100%] tracking-[0%] ">
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                onChangeMentalHandler(e, item?.id);
                              }}
                              className=" min-h-5 min-w-5"
                            />
                            Mental Illness
                          </label>
                          {item?.has_mental_illness && (
                            <input
                              name="illness_type"
                              value={item?.illness_type}
                              onChange={(e) => {
                                onChangeHandler(e, item?.id);
                              }}
                              type="text"
                              required
                              className={`  !bg-[#FFFFFF] h-10 w-full rounded border border-[#DCD6FF]  px-4 py-2 text-sm font-normal leading-[25px] text-[#26212E] placeholder:text-[#9F9F9F] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] `}
                              placeholder="Type Illness"
                            />
                          )}
                        </div>
                        <Input
                          id="mobile"
                          type="text"
                          name="mobile"
                          value={item?.mobile}
                          maxLength={10}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              onChangeHandler(e, item?.id);
                            }
                          }}
                          autoComplete="autoComplete"
                          placeholder="Enter mobile"
                          classInput=" w-full h-10  !bg-[#FFFFFF] "
                          labelName={"Mobile"}
                          required={"required"}
                        />
                      </div>
                    </>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    addFamilyDetails(familyDetails?.length);
                  }}
                  className="mx-auto mt-6 flex w-fit items-center gap-2 text-base font-bold leading-5 text-[#806BFF]"
                >
                  <div className="flex size-[18px] items-center justify-center rounded-full border-[1.5px] border-[#806BFF] text-sm font-semibold leading-[18px] text-[#806BFF]">
                    +{" "}
                  </div>
                  Add Another Member
                </button>
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
                                                const countUpdate = await onboardingOnStepCountHandler(user_id,4);
                                                const employeeData = await getSingleEmployeeOnboardingData(graphqlId);
                                                navigate("/onboarding/onboarding-form/4");
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
  );
};

export default FamilyDetails;
