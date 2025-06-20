import React, { useEffect, useState } from "react";
import config from "../../../../config/config";
import ButtonNew from "../../../../components/elements/amdital/ButtonNew";
import Input from "../../../projects_new/Reusable/Input";
import SelectHtml from "../../../../components/elements/amdital/SelectHtml";
import CustomDateSelector from "../../../../components/elements/amdital/CustomDate/CustomDateInput";
import VaildationSelectionBox from "../../../../components/elements/amdital/VaildationSelectionBox";
import { useSelector } from "react-redux";
import {
  getSingalEmployeeData,
  updateAccountIdentificationInformation,
  updateFamilyInformation,
} from "./employeeFunction";
import { useSnackbar } from "notistack";

export default function FamilyDetailsInformation({
  employee_data,
  params_id,
  editComponent,
}) {
  const [editView, setEditView] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [buttonClicked, setButtonClicked] = useState(false);

  const storeRedux = useSelector((store) => store);

  const countryReduxData = storeRedux?.general.country_data;

  const countryOptions = countryReduxData?.map((item) => {
    return { id: item?.code, name: item?.name };
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
  const [validationError, setValidationError] = useState({ dateOfBirthId: [] });

  useEffect(() => {
    if (employee_data?.familyDetails?.length > 0) {
      const family_data = employee_data?.familyDetails?.map((item, index) => {
        return { ...item, id: index + 1 };
      });
      setFamilyDetails(family_data);
    }
  }, [employee_data]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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
    const updatedFamilyDetails = familyDetails.map(({ id, ...rest }) => rest);
    const response = await updateFamilyInformation(
      params_id,
      updatedFamilyDetails,
      enqueueSnackbar,
    );
    const employee_data = await getSingalEmployeeData(params_id);
    if (response?.data?.data?.updateUser) {
      setEditView(!editView);
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
    if (validationError?.dateOfBirthId) {
      setTimeout(() => {
        setValidationError({ ...validationError, dateOfBirthId: [] });
      }, 700);
    }
  }, [validationError]);

  const countryNameDisplay = (countryCode) => {
    if (countryCode) {
      const countryName =
        countryReduxData?.length > 0
          ? countryReduxData
              ?.filter((item) => item?.code === countryCode)
              ?.map((item) => item?.name)
          : ["N/A"];
      return countryName?.[0];
    }
    return "N/A";
  };

  return (
    <>
      <div className=" relative w-full rounded border border-[#E1DCFF]  p-6 ">
        <div className=" flex items-center justify-between">
          <div className=" flex whitespace-nowrap text-[20px] font-semibold leading-[100%] tracking-[0%]  text-[#26212E] ">
            6.<span className=" ml-2">Family Details</span>
          </div>
          {!editView && (
            <img
              onClick={() => {
                setEditView(!editView);
              }}
              src={
                config.PUBLIC_URL +
                "/assets/images/amdital/edit_icon_gray_color.svg"
              }
              alt=""
              className={`  cursor-pointer ${!editComponent && ` hidden`} `}
            />
          )}
        </div>
        <div className=" mt-6 ">
          {editView ? (
            <div>
              <form onSubmit={onSubmitHandler}>
                {familyDetails?.map((item, index) => {
                  return (
                    <>
                      <div className={` w-full `}>
                        <div className=" mb-2 text-base font-medium  leading-[100%] tracking-[0%]">
                          {"Member " + (index + 1)}
                        </div>
                        <div
                          className={` w-full  ${
                            index !== 0 ? ` block ` : ` hidden`
                          } `}
                        >
                          <hr className=" w-full " />
                          <div className=" mt-2 flex w-full justify-end ">
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
                            onChangeHandler(e, item?.id);
                          }}
                          autoComplete="autoComplete"
                          placeholder="Enter Name"
                          classInput=" w-full h-10 "
                          labelName={"Name"}
                          required={"required"}
                        />
                        <SelectHtml
                          id="relationship"
                          name="relationship"
                          value={item?.relationship}
                          onChange={(e) => {
                            onChangeHandler(e, item?.id);
                          }}
                          autoComplete="autoComplete"
                          classInput=" w-full h-10 "
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
                        />

                        <div className=" relative w-full  ">
                          <CustomDateSelector
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
                            />
                          {validationError?.dateOfBirthId?.[index] ===
                            item?.id && (
                            <div className=" absolute flex w-full  justify-center ">
                              <VaildationSelectionBox />
                            </div>
                          )}
                        </div>
                        <SelectHtml
                          id="gender"
                          name="gender"
                          value={item?.gender}
                          onChange={(e) => {
                            onChangeHandler(e, item?.id);
                          }}
                          autoComplete="autoComplete"
                          classInput=" w-full h-10 "
                          labelName={"Gender"}
                          optionData={[
                            { id: "Male", name: "Male" },
                            { id: "Female", name: "Female" },
                            { id: "Other", name: "Other" },
                          ]}
                          required
                          placeholder={"Select gender"}
                        />
                        <SelectHtml
                          id="blood_group"
                          name="blood_group"
                          value={item?.blood_group}
                          onChange={(e) => {
                            onChangeHandler(e, item?.id);
                          }}
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
                        <SelectHtml
                          id="nationality"
                          name="nationality"
                          value={item?.nationality}
                          onChange={(e) => {
                            onChangeHandler(e, item?.id);
                          }}
                          autoComplete="autoComplete"
                          classInput=" w-full h-10 "
                          labelName={"Nationality"}
                          optionData={countryOptions}
                          placeholder={"Select nationality"}
                        />
                        <div>
                          <label className=" dashboard-table flex cursor-pointer items-center gap-1 text-sm font-medium leading-[100%] tracking-[0%] ">
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
                          <label className=" dashboard-table flex cursor-pointer items-center gap-1 text-sm font-medium leading-[100%] tracking-[0%] ">
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
                              className={` h-10 w-full rounded border border-[#DCD6FF] bg-[#F8F7FC] px-4 py-2 text-sm font-normal leading-[25px] text-[#26212E] placeholder:text-[#9F9F9F] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] `}
                              placeholder="Type Illness"
                            />
                          )}
                        </div>
                        <Input
                          id="mobile"
                          type="text"
                          name="mobile"
                          value={item?.mobile}
                          onChange={(e) => {
                            onChangeHandler(e, item?.id);
                          }}
                          autoComplete="autoComplete"
                          placeholder="Enter mobile"
                          classInput=" w-full h-10 "
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
                <div className=" mt-6 flex w-full items-center justify-end gap-4 ">
                  <ButtonNew
                    type="button"
                    buttonName=" Cancel"
                    buttonClassName={`  cursor-pointer w-[97px]  rounded h-10 hover:bg-[#FF845C]  outline-none border-[#FF845C] text-sm leading-3 font-semibold text-[#FF845C] hover:text-[#FFFFFF]   `}
                    spanClassName=" border-[#FFFFFF] "
                    onClick={(e) => {
                      setEditView(!editView);
                    }}
                  />
                  <ButtonNew
                    type="submit"
                    buttonName="Save"
                    buttonClassName={` ${
                      buttonClicked ? ` w-[100px] ` : ` w-[82px] `
                    }  cursor-pointer  h-10 hover:bg-[#F36A3D]  outline-none bg-[#FF845C] text-sm leading-3 font-semibold text-[#FFFFFF]  `}
                    spanClassName=" border-[#FFFFFF] "
                    isLoading={buttonClicked}
                  />
                </div>
              </form>
            </div>
          ) : (
            <div className=" relative flex w-full flex-col gap-6 ">
              {employee_data?.familyDetails?.length > 0 ? (
                employee_data?.familyDetails?.map((item, index) => {
                  return (
                    <>
                      <div className={` w-full `}>
                        <div className=" mb-2 text-base font-medium  leading-[100%] tracking-[0%]">
                          {"Member " + (index + 1)}
                        </div>
                        <div className={` w-full  `}>
                          <hr className=" w-full " />
                        </div>
                      </div>

                      <div className=" relative mt-2 grid  w-full grid-cols-3   gap-y-6 2xl:gap-x-[56px]">
                        <div className=" relative flex flex-col gap-1 ">
                          <div className=" text-sm font-medium leading-[100%] tracking-[0%] text-[#26212E] ">
                            Name
                          </div>
                          <div className=" block truncate text-base font-medium leading-[100%]  tracking-[0%] text-[#26212E] ">
                            {item?.name}
                          </div>
                        </div>
                        <div className=" relative flex flex-col gap-1 ">
                          <div className=" text-sm font-medium leading-[100%] tracking-[0%] text-[#26212E] ">
                            Relationship
                          </div>
                          <div className=" block truncate text-base font-medium leading-[100%]  tracking-[0%] text-[#26212E] ">
                            {item?.relationship || "N/A"}
                          </div>
                        </div>
                        <div className=" relative flex flex-col gap-1 ">
                          <div className=" text-sm font-medium leading-[100%] tracking-[0%] text-[#26212E] ">
                            Date Of Birth
                          </div>
                          <div className=" block truncate text-base font-medium leading-[100%]  tracking-[0%] text-[#26212E] ">
                            {item?.date_of_birth || "N/A"}
                          </div>
                        </div>
                        <div className=" relative flex flex-col gap-1 ">
                          <div className=" text-sm font-medium leading-[100%] tracking-[0%] text-[#26212E] ">
                            Gender
                          </div>
                          <div className=" block truncate text-base font-medium leading-[100%]  tracking-[0%] text-[#26212E] ">
                            {item?.gender || "N/A"}
                          </div>
                        </div>
                        <div className=" relative flex flex-col gap-1 ">
                          <div className=" text-sm font-medium leading-[100%] tracking-[0%] text-[#26212E] ">
                            Blood Group
                          </div>
                          <div className=" block truncate text-base font-medium leading-[100%]  tracking-[0%] text-[#26212E] ">
                            {item?.blood_group || "N/A"}
                          </div>
                        </div>
                        <div className=" relative flex flex-col gap-1 ">
                          <div className=" text-sm font-medium leading-[100%] tracking-[0%] text-[#26212E] ">
                            Nationality
                          </div>
                          <div className=" block truncate text-base font-medium leading-[100%]  tracking-[0%] text-[#26212E] ">
                            {countryNameDisplay(item?.nationality) || "N/A"}
                          </div>
                        </div>
                        <div className=" relative flex flex-col gap-1 ">
                          <div className=" text-sm font-medium leading-[100%] tracking-[0%] text-[#26212E] ">
                            Minor
                          </div>
                          <div className=" block truncate text-base font-medium leading-[100%]  tracking-[0%] text-[#26212E] ">
                            {item?.is_minor ? "Yes" : "No"}
                          </div>
                        </div>
                        <div className=" relative flex flex-col gap-1 ">
                          <div className=" text-sm font-medium leading-[100%] tracking-[0%] text-[#26212E] ">
                            Mental Illness
                          </div>
                          <div className=" block truncate text-base font-medium leading-[100%]  tracking-[0%] text-[#26212E] ">
                            {item?.has_mental_illness ? "Yes" : "No"}
                          </div>
                        </div>
                        {item?.has_mental_illness && (
                          <div className=" relative flex flex-col gap-1 ">
                            <div className=" text-sm font-medium leading-[100%] tracking-[0%] text-[#26212E] ">
                              Mental Illness Type
                            </div>
                            <div className=" block truncate text-base font-medium leading-[100%]  tracking-[0%] text-[#26212E] ">
                              {item?.illness_type || "N/A"}
                            </div>
                          </div>
                        )}
                        <div className=" relative flex flex-col gap-1 ">
                          <div className=" text-sm font-medium leading-[100%] tracking-[0%] text-[#26212E] ">
                            Mobile
                          </div>
                          <div className=" block truncate text-base font-medium leading-[100%]  tracking-[0%] text-[#26212E] ">
                            {item?.mobile || "N/A"}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className=" relative w-full  text-center ">
                  No Data Available
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
