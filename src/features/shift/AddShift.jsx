import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import InputTextArea from "../../../components/elements/amdital/InputTextArea";
import Input from "../../../components/elements/amdital/Input";
import Button from "../../../components/elements/amdital/ButtonNew";
import CustomDateSelector from "../../../components/elements/amdital/CustomDate/CustomDateInput";
import EmployeeDropDownNew from "../emplyee/EmployeeDropDownNew";
import VaildationSelectionBox from "../../../components/elements/amdital/VaildationSelectionBox";
import { errorMessageHandler, successfullMessageHandler } from "../../../components/elements/amdital/toastyMessage";
import { useSnackbar } from "notistack";
import { AddShiftDataApi } from "./shiftApi";
import ButtonNew from "../../../components/elements/amdital/ButtonNew";
import TaskMultiEmployeeDropDownNew from "../../project_single_task/TaskMultiEmployeeDropDownNew";
import MultiEmployeeDropDownNew from "../../projects_new/components/MultiEmployeeDropDownNew";



const AddShift = ({ onCloseHandler,fetchHandler }) => {
  const { enqueueSnackbar } = useSnackbar();

  const today = new Date().toISOString().split("T")[0];

  const [shiftDetails, setShiftDetails] = useState({
    shiftType: "Office",
    member: [],
    startDate: today,
    endDate: today,
    totalDays: 0,
    fullDay: true,
    halfDay: false,
    notes: "",
  });

  const [validationError, setValidationError] = useState({ assignee: false });
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleCheckboxChange = (key) => {
    if (key === "fullDay") {
      setShiftDetails({ ...shiftDetails, fullDay: true, halfDay: false });
    } else if (key === "halfDay") {
      setShiftDetails({ ...shiftDetails, fullDay: false, halfDay: true });
    }
  };

  const getDifferenceInWeekdays = (date1, date2) => {
    const start = new Date(date1);
    const end = new Date(date2);

    let count = 0;
    let current = new Date(start);

    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return count;
  };

  useEffect(() => {
    const start = new Date(shiftDetails.startDate);
    const end = new Date(shiftDetails.endDate);
    if (isNaN(start) || isNaN(end)) {
      errorMessageHandler(enqueueSnackbar, "Invalid date format.");
      return;
    }
    if (start > end) {
      errorMessageHandler(enqueueSnackbar, "Start date cannot be after end date.");
      return;
    }
    const weekdays = getDifferenceInWeekdays(shiftDetails.startDate, shiftDetails.endDate);
    setShiftDetails((prev) => ({ ...prev, totalDays: weekdays }));
  }, [shiftDetails.startDate,shiftDetails.endDate,enqueueSnackbar]);

  const onSubmitShiftHandler = async (e) => {
    e.preventDefault();

    if (shiftDetails.member?.length === 0 ) {
      setValidationError({ ...validationError, assignee: true });
      return;
    }

    const start = new Date(shiftDetails.startDate);
    const end = new Date(shiftDetails.endDate);

    if (start > end) {
      errorMessageHandler(enqueueSnackbar, "Start date cannot be after end date.");
      return;
    }
    if (shiftDetails?.totalDays === 0) {
      errorMessageHandler(enqueueSnackbar,"The selected start and end dates fall only on weekends (Saturday and Sunday), so a shift cannot be created.");
      return;
    }
    setButtonClicked(true)

    const shift_response = await AddShiftDataApi(shiftDetails);
    setButtonClicked(false);
    if(shift_response?.data?.data){
      fetchHandler();
      successfullMessageHandler(enqueueSnackbar,"Successfully created shitfs!");
      onCloseHandler();
    }
    if(shift_response?.data?.errors){
      errorMessageHandler(enqueueSnackbar,shiftDetails?.data?.errors?.[0]?.message);
      return;
    }
  };

  const memberHandler = (item) => {
    const userIds = item?.map(item=> item?.userId)
    setValidationError({ ...validationError, assignee: false });

    setShiftDetails({ ...shiftDetails, member: userIds});
  };

  return (
    <div className="w-[650px] rounded bg-[#FFFFFF] overflow-y-auto">
      <div className="flex justify-between px-8 pt-8 pb-4">
        <h3 className="text-[18px] font-semibold text-[#FF845C]">Shift</h3>
        <button type="button" onClick={onCloseHandler} className="p-1">
          <img src={config.PUBLIC_URL + "/assets/images/amdital/cross_icon_blue.svg"} alt="close_icon" />
        </button>
      </div>
      <div className="max-h-[73vh]">
        <form onSubmit={onSubmitShiftHandler}>
          <div className="flex flex-col gap-5 px-8">
          <div className="flex justify-between text-sm font-bold text-[#260B6A]">
              <div
                  onClick={() => setShiftDetails({ ...shiftDetails, shiftType: "Remote" })}
                  className={`cursor-pointer h-[42px] flex justify-center items-center w-[173px] border-[2px] rounded
                     hover:border-[#F5D8E7] hover:bg-[#F6EDF2] hover:text-[#D65594]
                    ${shiftDetails.shiftType?.toLocaleLowerCase() === "remote" ? 'border-[#F5D8E7] bg-[#F6EDF2] text-[#D65594]' : 'border-[#DCD6FF] bg-[#F8F7FC]'}
                  `}
                >
                  Remote
                </div>
                <div
                  onClick={() => setShiftDetails({ ...shiftDetails, shiftType: "Office" })}
                  className={`cursor-pointer h-[42px] flex justify-center items-center w-[173px] border-[2px] rounded hover:border-[#CAF1DC] hover:bg-[#EBF5EF] hover:text-[#40A266]
                    ${shiftDetails.shiftType?.toLocaleLowerCase() === "office" ? 'border-[#CAF1DC] bg-[#EBF5EF] text-[#40A266]': 'border-[#DCD6FF] bg-[#F8F7FC]'}
                  `}
                >
                  Office  
                </div>
                <div
                 
                  onClick={() => setShiftDetails({ ...shiftDetails, shiftType: "Leave" })}
                  className={`cursor-pointer h-[42px] flex justify-center items-center w-[173px] border-[2px] rounded hover:border-[#FEE4DB] hover:bg-[#FCF5F5] hover:text-[#FF845C]
                    ${shiftDetails.shiftType?.toLocaleLowerCase() === "leave" ? 'border-[#FEE4DB] bg-[#FCF5F5] text-[#FF845C]'
                    : 'border-[#DCD6FF] bg-[#F8F7FC]'}
                  `}
                >
                  Leave
                </div>
            </div>

            <div className="relative w-full">
              <MultiEmployeeDropDownNew
                labelName="Member"
                selectPlaceholder="Select member"
                searchPlaceholder="Search"
                managerHandler={memberHandler}
                wrapperClass={" gap-2  !bg-[#FFFFFF]"}
                required={true}
                      
                      />
              {validationError.assignee && (
                <div className="absolute flex justify-center w-full">
                  <VaildationSelectionBox />
                </div>
              )}
            </div>

            <div className="flex justify-between gap-8">
              <CustomDateSelector
                label="Start Date"
                inputWidth="100%"
                inputHeight="40px"
                labelWidth="100px"
                value={shiftDetails.startDate}
                onChange={(e) => setShiftDetails({ ...shiftDetails, startDate: e.target.value })}
                required={true}
                placeholder="DD/MM/YYYY"
                disableWeekends={true}
                inputClass="!bg-[#FFFFFF]"
              />
              <CustomDateSelector
                label="End Date"
                inputWidth="100%"
                inputHeight="40px"
                labelWidth="100px"
                value={shiftDetails.endDate}
                onChange={(e) => setShiftDetails({ ...shiftDetails, endDate: e.target.value })}
                required={true}
                placeholder="DD/MM/YYYY"
                disableWeekends={true}
                inputClass="!bg-[#FFFFFF]"
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="grid grid-cols-3 gap-2.5">
                <Input
                  labelName="Hours / Day"
                  value={`${shiftDetails.fullDay ? 8 : shiftDetails.halfDay ? 4 : 8}h`}
                  classInput="!bg-[#FFFFFF] cursor-not-allowed"
                  disabled
                />
                <Input
                  labelName="Total Days"
                  value={`${shiftDetails.totalDays}d`}
                  classInput="!bg-[#FFFFFF] cursor-not-allowed"
                  disabled
                />
                <Input
                  labelName="Total Hours"
                  value={`${shiftDetails.totalDays * (shiftDetails.fullDay ? 8 : shiftDetails.halfDay ? 4 : 8)}h`}
                  classInput="!bg-[#FFFFFF] cursor-not-allowed"
                  disabled
                />
              </div>
              <div className="flex gap-5 dashboard-table">
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shiftDetails.fullDay}
                    onChange={() => handleCheckboxChange("fullDay")}
                    className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  Full Day
                </label>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shiftDetails.halfDay}
                    onChange={() => handleCheckboxChange("halfDay")}
                    className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  Half Day
                </label>
              </div>
            </div>

            <InputTextArea
              labelName="Notes"
              classInput="!bg-[#FFFFFF]"
              placeholder="Put notes here..."
              value={shiftDetails.notes}
              onChange={(e) => setShiftDetails({ ...shiftDetails, notes: e.target.value })}
            />
          </div>

          <div className="mt-8  flex justify-between rounded bg-[#F8F7FC] p-5">
            <button
              onClick={onCloseHandler}
              className="font-semibold h-10 w-[96px] hover:bg-[#FFF2ED] rounded border-2 border-[#FF845C]  text-base text-[#FF845C]"
              type="button"
            >
              Cancel
            </button>
            <ButtonNew
              type="submit"
              buttonName= "Save"
              buttonClassName = {` ${ buttonClicked ? ` w-[100px] ` : ` w-[82px] ` }  cursor-pointer  h-10 hover:bg-[#F36A3D]  outline-none bg-[#FF845C] text-sm leading-3 font-semibold text-[#FFFFFF]  `}
              spanClassName = " border-[#FFFFFF] "
              isLoading= {buttonClicked}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShift;
