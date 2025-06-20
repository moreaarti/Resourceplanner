import React, { useState } from "react";
import DashboardTable from "../tables/DashboardTable";
import { useSelector } from "react-redux";

export default function DashboardTask() {
  const showPopupMenu = useSelector((state) => state.general.showPopupMenu);

  const [selectDropDownValue, setSelectDropDownValue] = useState("");

  const onChangeSelectHandler = () => {};

  const columns = [
    {
      name: "Project Code",
      selector: (row) => row.project_code,
      minWidth: "130px",
    },
    {
      name: "Task Name",
      selector: (row) => row.project_task,
      minWidth: "210px",
    },
    {
      name: "Tags",
      selector: (row) => row.project_tag,
      cell: (row) => {
        return (
          <div
            className={` h-[20px] whitespace-nowrap rounded-[50px] px-[10px] py-[2px] text-xs font-semibold leading-4 text-[#FFFFFF] ${
              row.project_tag === "Low"
                ? ` bg-[#00B656] `
                : row.project_tag === "High"
                ? ` bg-[#FF845C] `
                : ` bg-[#EADE08]`
            }`}
          >
            {row.project_tag}
          </div>
        );
      },
      width: "100px",
    },
    {
      name: "Status",
      selector: (row) => row.project_status,
      cell: (row) => {
        return (
          <div className=" flex items-center gap-1 whitespace-nowrap ">
            <div
              className={` h-[7px] w-[7px] rounded-full ${
                row.project_status === "To do"
                  ? ` bg-[#EADE08] `
                  : row.project_status === "Doing"
                  ? ` bg-[#2051F9] `
                  : row.project_status === "Testing"
                  ? ` bg-[#D900FF] `
                  : row.project_status === "Incompleted"
                  ? ` bg-[#FF0000] `
                  : ` bg-[#7BEEB1]`
              } `}
            ></div>
            <div>{row.project_status}</div>
          </div>
        );
      },
    },
    {
      name: "Due Date",
      selector: (row) => row.project_due_date,
    },
  ];

  const data = [
    {
      id: 1,
      project_code: "WCP-25",
      project_task: "Create the user interface",
      project_tag: "Low",
      project_status: "To do",
      project_due_date: "18-Dec",
    },
    {
      id: 2,
      project_code: "ABC-24",
      project_task: "Storyboards, process flows",
      project_tag: "Medium",
      project_status: "Doing",
      project_due_date: "11-Dec",
    },
    {
      id: 3,
      project_code: "DEF-28",
      project_task: "Evaluating user requiremen",
      project_tag: "High",
      project_status: "Testing",
      project_due_date: "29 Nov",
    },
    {
      id: 4,
      project_code: "GHI-49",
      project_task: "Collaboration with Product",
      project_tag: "High",
      project_status: "Incompleted",
      project_due_date: "20 Dec",
    },
    {
      id: 5,
      project_code: "JKL-48",
      project_task: "storyboards, process flows",
      project_tag: "Medium",
      project_status: "Complete",
      project_due_date: "10 Nov",
    },
  ];

  return (
    <div
      className={` rounded-lg border border-[#E1DCFF] bg-[#FFFFFF]  ${
        showPopupMenu
          ? ` w-[50%] `
          : ` lg:w-[490px] min-[1300px]:w-[630px]  2xl:w-full min-[1600px]:w-[50%] `
      }  min-h-[300px]  `}
    >
      <div className=" flex h-[50px] items-center justify-between px-4 ">
        <div className=" text-base font-semibold leading-5 text-[#26212E] ">
          My Task
        </div>
        <div className=" flex gap-[10px]">
          <select
            id={"type"}
            className={` custom-select h-8 w-[137px] rounded border border-[#DCD6FF] bg-[#F8F7FC] px-4 text-sm font-normal leading-[25px] text-[#26212E] placeholder:text-[#9F9F9F] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] `}
            name={"type"}
            onChange={onChangeSelectHandler}
            value={selectDropDownValue}
          >
            <option>Today</option>
            <option>Yesterday</option>
            <option>This Week</option>
            <option>Last Week</option>
            <option>Last 2 Weeks</option>
            <option>Last 14 Days</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 30 Days</option>
          </select>
        </div>
      </div>
      <div className="">
        <DashboardTable
          TablecolumData={data}
          headerData={columns}
          entireRowClicked={true}
          // tableallselectcheckbox={"selectableRows"}
          // pagination
        />
      </div>
    </div>
  );
}
