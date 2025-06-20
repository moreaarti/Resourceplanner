import { useState, useEffect } from "react";
import closeIcon from "./icon/close-icon.svg";
import moment from "moment";

import CustomDateInput from "../../components/elements/amdital/CustomDate/CustomDateInput";

import {
  AddEmployeeAssignmentApi,
  getResourcePlannerApi,
  updateResourcePlannersavefortask,
} from "./resourcesPlannerApi";
import {
  errorMessageHandler,
  successfullMessageHandler,
} from "../../components/elements/amdital/toastyMessage";
import { enqueueSnackbar } from "notistack";
import EmployeeDropDownNew from "./EmployeeDropDownNew";
import GetTasksList from "./GetTasksList";
import GetTasksListDD from "./GetTasksList";
// import GetTaskMembersDD from "./GetTaskMembersDD";
// import { GetTaskMembersDD } from "./GetTaskMembersDD";
import GetTaskMembersDDcompo from "./GetTaskMembersDD";
import GetProjectListDD from "./GetProjectList";

const AssignedAssignment = ({
  onAddItem,
  open,
  setOpen,
  canvasTime,
  // activeTab,
  fetchHandler,

  // setActiveTab,
}) => {
  // return <>i am aatiii</>;
  const [start, setStart] = useState(
    moment(canvasTime).format("YYYY-MM-DD") || moment().format("YYYY-MM-DD"),
  );

  const [activeTab, setActiveTab] = useState("task");

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTask2, setSelectedTask2] = useState(null);

  const [projectList, setProjectList] = useState(null);
  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    console.log("selectedTask", selectedTask);
  };
  const [end, setEnd] = useState(
    moment(canvasTime).format("YYYY-MM-DD") || moment().format("YYYY-MM-DD"),
  );
  const [taskProject, setTaskProject] = useState("");

  const [member, setMember] = useState("");
  const [hoursDays, setHoursDays] = useState(8);
  const [totalHours, setTotalHours] = useState("");
  const [notes, setNotes] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const customStyles = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 4px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: #DCD6FF;
    border-radius: 8px;
  }
`;

  const toggleSwitch = () => setIsChecked(!isChecked);
  useEffect(() => {
    const calculateTotalHours = () => {
      if (start && end && hoursDays) {
        const startDate = moment(start);
        const endDate = moment(end);
        const durationInDays = endDate.diff(startDate, "days") + 1;
        const total = durationInDays * parseFloat(hoursDays);
        setTotalHours(total.toFixed(0));
      }
    };

    calculateTotalHours();
  }, [start, end, hoursDays]);

  ////////////////////////old////////////////////////////////
  // const handleSave = async () => {
  //   const fields = {
  //     member: [parseInt(member)],
  //     assignmentType: activeTab === "task" ? "task" : "leave",
  //     leaveType: activeTab === "leave" ? taskProject : "",
  //     // projectName: activeTab === "task" ? taskProject : "",
  //     projectName: taskProject,
  //     startDate: start,
  //     endDate: end,
  //     totalDays: parseInt(hoursDays) || 0,
  //     totalHours: parseInt(totalHours) || 0,
  //     countWeekends: isChecked,
  //     notes: notes,
  //     notifyTo: 0,
  //   };

  //   const res = await AddEmployeeAssignmentApi(fields);

  //   if (res?.data?.errors) {
  //     errorMessageHandler(enqueueSnackbar, "Failed to add assignment.");
  //     return;
  //   }

  //   successfullMessageHandler(
  //     enqueueSnackbar,
  //     "Successfully created Assignment !",
  //   );

  //   fetchHandler();

  //   setOpen(false);
  // };
  ////////////////////////old////////////////////////////////
  // const handleSave = async () => {
  //   console.log("savingggg", "activeTab........", activeTab);
  //   if (activeTab === "task") {
  //     // Make sure you have selectedTask and assigned members
  //     if (!selectedTask2?.id) {
  //       errorMessageHandler(enqueueSnackbar, "Please select a task.");
  //       return;
  //     }
  //     if (!selectedTask2?.firstName) {
  //       errorMessageHandler(
  //         enqueueSnackbar,
  //         "Please select at least one member.",
  //       );
  //       return;
  //     }

  //     // Prepare fields for GraphQL mutation
  //     const fields = {
  //       id: selectedTask2.id,
  //       assignedTo: selectedTask2.members.map((member) =>
  //         String(member.userId),
  //       ), // convert to string array
  //     };
  //     console.log("fields", fields);
  //     const res = await updateResourcePlannersavefortask(fields);
  //     console.log("res>>>>>>>>>>>>>>>", res);
  //     if (!res) {
  //       errorMessageHandler(
  //         enqueueSnackbar,
  //         "Failed to update task assignment.",
  //       );
  //       return;
  //     }

  //     successfullMessageHandler(
  //       enqueueSnackbar,
  //       "Task assignment updated successfully!",
  //     );
  //     fetchHandler();
  //     setOpen(false);
  //   } else if (activeTab === "leave") {
  //     // keep your existing leave logic as-is
  //     const fields = {
  //       member: [parseInt(member)],
  //       assignmentType: "leave",
  //       leaveType: taskProject,
  //       projectName: taskProject,
  //       startDate: start,
  //       endDate: end,
  //       totalDays: parseInt(hoursDays) || 0,
  //       totalHours: parseInt(totalHours) || 0,
  //       countWeekends: isChecked,
  //       notes: notes,
  //       notifyTo: 0,
  //     };

  //     const res = await AddEmployeeAssignmentApi(fields);

  //     if (res?.data?.errors) {
  //       errorMessageHandler(enqueueSnackbar, "Failed to add assignment.");
  //       return;
  //     }

  //     successfullMessageHandler(
  //       enqueueSnackbar,
  //       "Successfully created leave assignment!",
  //     );

  //     fetchHandler();
  //     setOpen(false);
  //   }
  // };
  const handleSave = async () => {
    console.log("savingggg", "activeTab........", activeTab);

    if (activeTab === "task") {
      // Validate task selection
      if (!selectedTask?.id) {
        errorMessageHandler(enqueueSnackbar, "Please select a task.");
        return;
      }

      // Validate member selection
      if (!selectedTask2?.userId) {
        errorMessageHandler(enqueueSnackbar, "Please select a member.");
        return;
      }

      // Prepare fields for GraphQL mutation
      const fields = {
        id: selectedTask2.id,
        assignedTo: [String(selectedTask2.userId)], // convert userId to string inside an array
      };

      // console.log("fields", fields);
      const res = await updateResourcePlannersavefortask(fields);
      // console.log("res>>>>>>>>>>>>>>>", res);

      if (!res) {
        errorMessageHandler(
          enqueueSnackbar,
          "Failed to update task assignment.",
        );
        return;
      }
      onAddItem();
      successfullMessageHandler(
        enqueueSnackbar,
        "Task assignment updated successfully!",
      );
      fetchHandler();
      setOpen(false);
    } else if (activeTab === "leave") {
      // Existing leave logic
      const fields = {
        member: [parseInt(member)],
        assignmentType: "leave",
        leaveType: taskProject,
        projectName: "",
        startDate: start,
        endDate: end,
        totalDays: parseInt(hoursDays) || 0,
        totalHours: parseInt(totalHours) || 0,
        countWeekends: isChecked,
        notes: notes,
        notifyTo: 0,
      };
      console.log("fields", fields);
      const res = await AddEmployeeAssignmentApi(fields);
      console.log("resadd", res);

      if (res?.data?.errors) {
        errorMessageHandler(enqueueSnackbar, "Failed to add assignment.");
        return;
      }

      successfullMessageHandler(
        enqueueSnackbar,
        "Successfully created leave assignment!",
      );
      fetchHandler();

      setOpen(false);
    }
  };

  return (
    <>
      {open && (
        <div className=" justify-cente flex h-[639.27px] items-center">
          <div className="w-[600px] rounded-lg border bg-white">
            <div
              className="flex items-center justify-between px-[28px]
            pb-[20px] pt-[26px]"
            >
              <h4
                className="text-lg font-semibold leading-[100%] 
              text-[#FF845C] "
              >
                Assigned Assignment
              </h4>
              <button onClick={() => setOpen(false)}>
                <img src={closeIcon} alt="Close" />
              </button>
            </div>

            <div className="flex flex-col gap-[26px] ">
              <div className="">
                <div className="flex items-center gap-3 px-7">
                  <button
                    onClick={() => {
                      setActiveTab("task");
                      console.log("in task");
                    }}
                    className={`h-[42px] w-full  rounded border-2 bg-[#F8F7FC] p-3 text-sm  font-bold leading-[100%] ${
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
                      console.log("in leave");
                    }}
                    className={`h-[42px]  w-full rounded border-2 bg-[#F8F7FC] p-3 text-sm font-bold leading-[100%] ${
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
                    <div className="scrollbar-thin flex h-[200px] flex-col gap-[26px] overflow-hidden overflow-y-auto px-7 2xl:h-[350px] min-[1700px]:h-full">
                      <style>{customStyles}</style>
                      <div className="flex flex-col gap-[10px] px-7">
                        {/* <label
                          htmlFor="task-project"
                          className="mt-[26px] text-base font-semibold leading-[100%]"
                        >
                          Task / Project
                        </label>
                        <input
                          type="text"
                          id="task-project"
                          value={taskProject}
                          required
                          onChange={(e) => setTaskProject(e.target.value)}
                          placeholder="Project name goes here"
                          className="h-[50px]  rounded-lg border border-[#E1DCFF] px-[10px] py-2 text-sm font-normal leading-[100%] text-[#26212E] transition-shadow placeholder:text-[#74689280]  focus:outline-none"
                        /> */}
                      </div>
                      <div className="flex flex-col gap-[10px] px-7">
                        {/* <EmployeeDropDownNew
                          labelName={"Member"}
                          wrapperClass={"bg-white gap-2"}
                          required={true}
                          value={member}
                          // onChange={(selectedValue) => setMember(selectedValue)}
                          managerHandler={(item) => setMember(item.userId)}
                        /> */}
                        <GetProjectListDD
                          selectPlaceholder="Choose a project"
                          searchPlaceholder="Search by title"
                          projectHandler={(project) => {
                            setProjectList(project);
                            console.log("projectList", projectList);
                          }}
                        />
                        <GetTasksListDD //working
                          labelName="Select Task"
                          selectPlaceholder="Project name goes here"
                          searchPlaceholder="Search tasks..."
                          taskHandler={handleTaskSelect}
                          required={true}
                          projectId={projectList?.projectId}
                        />

                        <GetTaskMembersDDcompo
                          selectedTask={selectedTask}
                          memberHandler={(member) => {
                            setSelectedTask2(member);
                            console.log("selectedTask2", selectedTask2);
                          }}
                        />
                      </div>
                      {/* <div className="mb-4 grid grid-cols-1 gap-4 px-7 md:grid-cols-2">
                      
                        <div className="flex flex-col gap-[10px]">
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
                        </div>
                   
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
                      </div> */}
                      {/* <div className="flex items-center gap-5 px-7">
                        <div className="flex w-full flex-col gap-[10px]">
                          <label
                            htmlFor="hours-days"
                            className="text-base font-semibold leading-[19px]"
                          >
                            Hours / Daysvbbbbbbbbbbv
                          </label>
                          <input
                            type="text"
                            id="hours-days"
                            required
                            readOnly
                            value={hoursDays}
                            onChange={(e) => setHoursDays(e.target.value)}
                            className="h-10 rounded-lg border border-[#E1DCFF] px-[10px]  py-4 text-sm font-normal leading-5 text-[#26212E] transition-shadow placeholder:text-gray-400 focus:outline-none"
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
                            required
                            onChange={(e) => setTotalHours(e.target.value)}
                            readOnly
                            className="h-10 rounded-lg border border-[#E1DCFF] px-[10px] py-4 text-sm font-normal leading-5 text-[#26212E] transition-shadow placeholder:text-gray-400  focus:outline-none"
                          />
                        </div>
                      </div> */}
                      {/* <div className="flex w-full flex-col gap-[10px] px-7">
                        <label
                          htmlFor="notes"
                          className="text-base font-semibold leading-[19px]"
                        >
                          Notes
                        </label>
                        <textarea
                          id="notes"
                          value={notes}
                          required
                          onChange={(e) => setNotes(e.target.value)}
                          className="h-[60px] rounded-lg border border-[#E1DCFF] px-[10px] py-4 text-base font-normal leading-5 text-[#26212E] transition-shadow placeholder:text-gray-400  focus:outline-none"
                        />
                      </div> */}
                    </div>
                  </>
                )}

                {activeTab === "leave" && (
                  <>
                    <div className="scrollbar-thin flex h-[200px] flex-col gap-[26px] overflow-hidden overflow-y-auto px-7 2xl:h-[350px] min-[1700px]:h-full">
                      <style>{customStyles}</style>

                      <div className="mt-[26px] flex flex-col gap-[10px]">
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
                          <option value={"Planned Leave"}>
                            {"Planned Leave"}
                          </option>
                          <option value={"Emergency Leave"}>
                            {"Emergency Leave"}
                          </option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-[10px]">
                        <EmployeeDropDownNew
                          labelName={"Member"}
                          wrapperClass={"bg-white gap-2"}
                          required={true}
                          value={member}
                          // onChange={(selectedValue) => setMember(selectedValue)}
                          managerHandler={(item) => setMember(item.userId)}
                        />
                      </div>
                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-[10px]">
                          {/* Start Date */}
                          <div className="flex flex-col gap-[10px]">
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
                          </div>
                          <div className="custom-table mt-2 flex items-center gap-[6px] ">
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
                            className="h-10 rounded-lg border border-[#E1DCFF] px-[10px] py-4 text-sm font-normal leading-5 text-[#26212E] transition-shadow placeholder:text-gray-400  focus:outline-none"
                          />
                        </div>
                        <div className="custom-table mt-2 flex items-center gap-2">
                          {/* <label className="custom-table relative inline-block h-[14px]  w-7 ">
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
                                className={`block h-2 w-2 translate-y-[1.5px] transform rounded-full bg-[#74689280] transition-all duration-300 ${
                                  isChecked
                                    ? "translate-x-[16px]"
                                    : "translate-x-1"
                                }`}
                              ></span>
                            </span>
                          </label> */}
                          {/* <p className="text-sm font-normal leading-4">
                            Custom
                          </p> */}
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
                          className="h-[60px] rounded-lg border border-[#E1DCFF] px-[10px] py-4 text-base font-normal leading-5 text-[#26212E] transition-shadow placeholder:text-gray-400  focus:outline-none"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="btn-group mt-7 flex items-center gap-5 rounded-b bg-[#F8F7FC] px-8 pb-[17px] pt-[15px]">
                <button
                  onClick={handleSave}
                  className="h-[48px] rounded bg-[#FF845C] px-[60px] py-4 text-center text-base font-bold leading-[100%] text-white hover:bg-[#F36A3D]"
                >
                  Save
                </button>
                {/* <button className="rounded border border-[#FF845C] px-[26px] py-4 text-center text-base font-bold leading-4 text-[#FF845C]">
                  Save and Add Another
                </button> */}
                <button
                  onClick={() => setOpen(false)}
                  className=" text-center text-base font-bold leading-4 text-[#74689280] hover:text-[#988FB1]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignedAssignment;
