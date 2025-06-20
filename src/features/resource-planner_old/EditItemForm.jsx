import React, { useEffect, useState } from "react";
import closeIcon from "./icon/close-icon.svg";
import moment from "moment";
import EmployeeDropDownNew from "../hr/emplyee/EmployeeDropDownNew";
import CustomDateInput from "../../components/elements/amdital/CustomDate/CustomDateInput";
import {
  deleteResourcePlannerApi,
  updateResourcePlannerDataApi,
} from "./resourcesPlannerApi";

import { useDispatch } from "react-redux";
// import ButtonNew from "../../components/elements/amdital/ButtonNew";
// import DeletePopUp from "./DeletePopUp";
import {
  errorMessageHandler,
  successfullMessageHandler,
} from "../../components/elements/amdital/toastyMessage";
import { enqueueSnackbar } from "notistack";

const EditItemForm = ({
  item,
  fetchHandler,
  onUpdate,
  onCancel,
  onDelete,
  onCloseHandler,
  setOpen,
  setSelectedItem,
}) => {
  const [formData, setFormData] = useState({ ...item });
  const mentorsList = [
    { value: "1", label: "Saurabh Pote" },
    { value: "2", label: "Bharat Chavan" },
    { value: "3", label: "Prasad Pansare" },
  ];
  const customStyles = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 4px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: #DCD6FF;
    border-radius: 8px;
  }
`;
  const [deleteToggle, setDeleteToggle] = useState(false);
  useEffect(() => {
    if (item) {
      setFormData({ ...item });
      setStart(moment(item.start).format("YYYY-MM-DD"));
      setEnd(moment(item.end).format("YYYY-MM-DD"));
      setTaskProject(item.taskProject || "");
      setMember(item.member || "");
      setNotes(item.notes || "");
    }
  }, [item]);

  // const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [activeTab, setActiveTab] = useState("task");
  const [start, setStart] = useState(
    moment().format("YYYY-MM-DD") || moment().format("YYYY-MM-DD"),
  );
  const [end, setEnd] = useState(moment().format("YYYY-MM-DD"));
  const [taskProject, setTaskProject] = useState("");
  const [member, setMember] = useState("");
  const [hoursDays, setHoursDays] = useState(8);
  const [totalHours, setTotalHours] = useState("");
  const [notes, setNotes] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const toggleSwitch = () => setIsChecked(!isChecked);
  useEffect(() => {
    const calculateTotalHours = () => {
      if (start && end && hoursDays) {
        const startDate = moment(start);
        const endDate = moment(end);
        const durationInDays = endDate.diff(startDate, "days") + 1;
        const total = durationInDays * parseFloat(hoursDays);
        setTotalHours(total.toFixed());
      }
    };

    calculateTotalHours();
  }, [start, end, hoursDays]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // calculate total_days and total_hours
    const startDate = moment(start);
    const endDate = moment(end);
    const durationInDays = endDate.diff(startDate, "days") + 1;
    const totalHoursCalculated = durationInDays * parseFloat(hoursDays);

    // final payload
    const updatedData = {
      id: formData?.id,
      assignment_type: activeTab === "task" ? "task" : "leave",
      leave_type: activeTab === "leave" ? taskProject : "",
      project_name: activeTab === "task" ? formData.title : "",
      from_date: moment(start).format("YYYY-MM-DD"),
      to_date: moment(end).format("YYYY-MM-DD"),
      total_days: durationInDays,
      total_hours: totalHoursCalculated,
      count_weekends: isChecked,
      notes: notes,
      notify_to: member,
    };

    try {
      const response = await updateResourcePlannerDataApi(updatedData);

      if (response?.assignment) {
        // Call parent onUpdate to update UI state if needed
        // onUpdate(response.assignment);
        onUpdate(updatedData);
        // Optional: show success message or close modal
        setSelectedItem(null); // you already have this prop
        enqueueSnackbar("Resource updated successfully", {
          variant: "success",
        });
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteResourcePlannerApi(item.id);

      const deleteResult = response?.data?.data?.deleteEmployeeAssignment;

      if (deleteResult?.success) {
        onDelete(item.id);

        setOpen(false);
        fetchHandler();
        enqueueSnackbar("Resource deleted successfully", {
          variant: "success",
        });
      } else if (response?.data?.errors) {
        enqueueSnackbar(response?.data?.errors?.[0]?.message, {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Failed to delete resource", { variant: "error" });
      }
    } catch (err) {
      console.error("Delete API Error:", err);
      enqueueSnackbar("Something went wrong while deleting", {
        variant: "error",
      });
    }
  };

  return (
    <div className=" flex items-center justify-center ">
      <div className="w-[605px] rounded-lg border bg-white">
        <div
          className="flex items-center  justify-between px-[28px]
            pb-[20px] pt-[26px]"
        >
          <h4 className="text-lg font-semibold text-[#FF845C]">
            Edit Assignment
          </h4>
          <button onClick={() => setSelectedItem(null)}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <div className="flex flex-col gap-[26px] px-7">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("task");
              }}
              className={`w-full  rounded border-2 bg-[#F8F7FC] p-3 text-sm  font-bold leading-4 ${
                activeTab === "task"
                  ? "border-[#806BFF] text-[#806BFF]"
                  : "border-[#DCD6FF] text-[#260B6A]"
              }`}
            >
              Project or Task
            </button>
            <button
              onClick={() => {
                setActiveTab("leave");
              }}
              className={`w-full  rounded border-2 bg-[#F8F7FC] p-3 text-sm font-bold leading-4 ${
                activeTab === "leave"
                  ? "border-[#806BFF] text-[#806BFF]"
                  : " border-[#DCD6FF] text-[#260B6A]"
              } `}
            >
              Leave
            </button>
          </div>

          {activeTab === "task" && (
            <>
              <div className="scrollbar-thin flex h-[200px] flex-col gap-[26px] overflow-hidden overflow-y-auto 2xl:h-[350px] min-[1700px]:h-full">
                <style>{customStyles}</style>
                <div className="flex flex-col gap-[10px]">
                  <label
                    htmlFor="task-project"
                    className="text-base font-semibold leading-[19px]"
                  >
                    Select Task
                  </label>
                  <input
                    type="text"
                    id="task-project"
                    value={formData.title}
                    name="title"
                    onChange={handleChange}
                    placeholder="Project name goes here"
                    className="leading-[100 5] h-[50px] rounded-lg border border-[#E1DCFF]
                  px-[10px] py-2 text-base font-normal text-[#26212E] transition-shadow placeholder:text-[#74689280] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <EmployeeDropDownNew
                    labelName={"Member"}
                    wrapperClass={"bg-white gap-2"}
                    required={true}
                    value={member}
                    currentValueData={formData.member}
                    managerHandler={(item) => setMember(item.userId)}
                  />
                </div>
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Start Date */}
                  <div className="flex flex-col gap-[10px]">
                    <CustomDateInput
                      label="Start Date"
                      inputWidth="100%"
                      inputHeight="40px"
                      labelWidth="120px"
                      required={true}
                      placeholder="YYYY/MM/DD"
                      inputClass="w-full h-10 !bg-white"
                      value={moment(formData.start).format("YYYY-MM-DD")}
                      onChange={handleChange}
                    />
                  </div>
                  {/* End Date */}
                  <div className="flex flex-col gap-[10px]">
                    <CustomDateInput
                      label="End Date"
                      inputWidth="100%"
                      inputHeight="40px"
                      labelWidth="120px"
                      required={true}
                      placeholder="YYYY/MM/DD"
                      inputClass="w-full h-10 !bg-white"
                      value={moment(formData.end).format("YYYY-MM-DD")}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex w-full flex-col gap-[10px]">
                    <label
                      htmlFor="hours-days"
                      className="text-base font-semibold leading-[19px]"
                    >
                      Hours / Days
                    </label>
                    <input
                      type="text"
                      id="hours-days"
                      value={hoursDays}
                      readOnly
                      onChange={handleChange}
                      className="h-10 rounded-lg border border-[#E1DCFF] px-[10px] py-4 text-sm font-normal leading-5 text-[#26212E] transition-shadow placeholder:text-gray-400  focus:outline-none"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-[10px]">
                    <label
                      htmlFor="total-hours"
                      className="text-base font-semibold leading-[19px]"
                    >
                      Total Hours
                    </label>
                    <input
                      type="text"
                      id="total-hours"
                      value={totalHours}
                      onChange={handleChange}
                      readOnly
                      className="h-10 rounded-lg border border-[#E1DCFF] px-[10px] py-4 text-sm font-normal leading-5 text-[#26212E] transition-shadow placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col gap-[10px]">
                  <label
                    htmlFor="notes"
                    className="text-base font-semibold leading-[19px]"
                  >
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="h-[60px] rounded-lg border border-[#E1DCFF] px-[10px] py-4 text-base font-normal leading-5 text-[#26212E] transition-shadow placeholder:text-gray-400  focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === "leave" && (
            <>
              <div className="scrollbar-thin flex h-[200px] flex-col gap-[26px] overflow-hidden overflow-y-auto 2xl:h-[350px] min-[1700px]:h-full">
                <style>{customStyles}</style>
                <div className="flex flex-col gap-[10px]">
                  <label
                    htmlFor="member"
                    className="text-base font-semibold leading-[100%]"
                  >
                    Type of leave
                  </label>
                  <select
                    id="task-project"
                    value={taskProject}
                    required
                    onChange={(e) => setTaskProject(e.target.value)}
                    className="
      h-[40px]
      rounded-sm
      border
      border-[#E1DCFF]
      px-[10px]
      py-2
      text-sm
      font-normal
      leading-[100%]
   
      transition-colors
      duration-200
      
     
      hover:cursor-pointer
      hover:border-[#806BFF]
      focus:border-[#806BFF]
      focus:outline-none
    "
                  >
                    <option value="" disabled>
                      Select type leave
                    </option>
                    <option value={"Planned Leave"}>{"Planned Leave"}</option>
                    <option value={"Emergency Leave"}>
                      {"Emergency Leave"}
                    </option>
                  </select>
                </div>

                {/* <div className="flex flex-col gap-[10px]">
                  <label
                    htmlFor="member"
                    className="text-base font-semibold leading-[100%]"
                  >
                    Type of leave
                  </label>
                  <select
                    id="task-project"
                    value={taskProject}
                    required
                    onChange={(e) => setTaskProject(e.target.value)}
                    className="h-[50px] rounded-lg border border-[#E1DCFF] px-[10px] py-2 text-sm font-normal leading-[100%] text-[#26212E] transition-shadow placeholder:text-[#74689280] focus:outline-none"
                  >
                    <option value="" disabled>
                      Select type leave
                    </option>
                    <option value={"Planned Leave"}>{"Planned Leave"}</option>
                    <option value={"Emergency Leave"}>
                      {"Emergency Leave"}
                    </option>
                  </select>
                </div> */}
                <div className="flex flex-col gap-[10px]">
                  <EmployeeDropDownNew
                    labelName={"Member"}
                    wrapperClass={"bg-white gap-2"}
                    required={true}
                    value={member}
                    currentValueData={formData.member}
                    managerHandler={(item) => setMember(item.userId)}
                  />
                </div>
                {/* <div className="flex flex-col gap-[10px]"> */}
                {/* <label
                    htmlFor="member"
                    className="text-base font-semibold leading-[19px]"
                  >
                    Member
                  </label>
                  <select
                    id="member"
                    value={member}
                    onChange={(e) => setMember(e.target.value)}
                    className="h-[50px] rounded-lg border border-[#E1DCFF] px-[10px] py-2 text-base font-normal leading-5 text-[#26212E] transition-shadow placeholder:text-gray-400  focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a mentor..........................
                    </option>
                    {mentorsList.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select> */}
                {/* </div> */}
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-[4px]">
                    {/* Start Date */}
                    {/* <div className="flex flex-col gap-[10px]"> */}
                    <div className="relative w-full">
                      <CustomDateInput
                        label="Start Date"
                        inputWidth="100%"
                        inputHeight="40px"
                        labelWidth="120px"
                        required={true}
                        placeholder="YYYY/MM/DD"
                        inputClass="w-full h-10 !bg-white"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                      />
                    </div>
                    {/* </div> */}
                    <div className="custom-table mt-2 flex items-center gap-[6px]">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="h-[14px] w-[14px] !bg-[#FFFFFF]"
                      />
                      <p className="text-sm font-normal leading-4 text-[#26212E]">
                        Count Weekends
                      </p>
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F8F7FC] text-xs text-[#806BFF]">
                        i
                      </div>
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="flex flex-col gap-[10px]">
                    <CustomDateInput
                      label="End Date"
                      inputWidth="100%"
                      inputHeight="40px"
                      labelWidth="120px"
                      required={true}
                      placeholder="YYYY/MM/DD"
                      inputClass="w-full h-10 !bg-white"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex w-full flex-col gap-[10px]">
                    <label
                      htmlFor="hours-days"
                      className="text-base font-semibold leading-[19px]"
                    >
                      Hours / Days
                    </label>
                    <input
                      type="text"
                      id="hours-days"
                      value={hoursDays}
                      onChange={(e) => setHoursDays(e.target.value)}
                      className="h-10 rounded-lg border  border-[#E1DCFF] px-[10px] py-4 text-sm font-normal leading-5 text-[#26212E] transition-shadow placeholder:text-gray-400  focus:outline-none"
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <label className="relative inline-block h-[14px] w-7">
                      <input
                        type="checkbox"
                        className="h-0 w-0 opacity-0"
                        checked={isChecked}
                        onChange={toggleSwitch}
                      />
                      <span
                        className={`absolute bottom-0 left-0 right-0 top-0 cursor-pointer rounded-full border-[1.5px] border-[#74689280] transition-all duration-300 ${
                          isChecked ? "" : ""
                        }`}
                      >
                        <span
                          className={`block h-2 w-2 translate-y-[2.5px] transform rounded-full bg-[#74689280] transition-all duration-300 ${
                            isChecked ? "translate-x-[16px]" : "translate-x-1"
                          }`}
                        ></span>
                      </span>
                    </label>
                    <p className="text-sm font-normal leading-4">Custom</p>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-[10px]">
                  <label
                    htmlFor="notes"
                    className="text-base font-semibold leading-[19px]"
                  >
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="h-[60px] rounded-lg border border-[#E1DCFF] px-[10px] py-4 text-base font-normal leading-5 text-[#26212E] placeholder:text-gray-400 focus:outline-none "
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="btn-group mt-7 flex items-center gap-5 bg-[#F8F7FC] px-8 pb-[17px] pt-[15px]">
          <button
            onClick={handleSubmit}
            className="rounded bg-[#FF845C] px-[60px] py-4 text-center text-base font-bold leading-4 text-white hover:bg-[#F36A3D]"
          >
            Update
          </button>
          {/* <ButtonNew
            type="button"
            buttonName="Delete"
            buttonClassName={` ${` w-[100px] `}  cursor-pointer  h-10 hover:bg-[#D80000]  outline-none bg-[#FF0000] text-sm leading-3 font-semibold text-[#FFFFFF]  `}
            spanClassName=" border-[#FFFFFF] "
            onClick={() => {
              setDeleteToggle(!deleteToggle);
            }}
          /> */}
          <button
            onClick={handleDelete}
            className="rounded border border-[#FF0000] px-[26px] py-4 text-center text-base font-bold leading-4 text-[#FF0000] hover:bg-[#D80000] hover:text-[#FFFFFF]"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className=" text-center text-base font-bold leading-4 text-[#74689280] hover:text-[#988FB1]"
          >
            Cancel
          </button>
          {/* {deleteToggle && (
            <div className="fixed left-0 top-0 z-[1100] flex h-full w-full justify-center ">
              <div className=" z-[1100]  mt-20 h-fit ">
                <DeletePopUp
                  buttonDeleteName="Delete"
                  buttonCLoseName="Cancel"
                  cancelHandler={() => {
                    setDeleteToggle(false);
                  }}
                  deleteHandler={() => {
                    deleteHandler(item.id);
                  }}
                  buttonLoader={deleteButtonClicked}
                />
              </div>
              {deleteToggle && (
                <div
                  className="fixed inset-0 z-[1000] cursor-pointer bg-[#150C2CB2] "
                  onClick={() => {
                    setDeleteToggle(false);
                  }}
                ></div>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default EditItemForm;
