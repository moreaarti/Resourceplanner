import React, { useState } from "react";
import DashboardTable from "../tables/DashboardTable";
import { useSelector } from "react-redux";

export default function TeamLeave() {
  const showPopupMenu = useSelector((state) => state.general.showPopupMenu);

  const [selectDropDownValue, setSelectDropDownValue] = useState("");

  const onChangeSelectHandler = () => {};

  const columns = [
    {
      name: "Member",
      selector: (row) => row.member,
    },
    {
      name: "Leave Date",
      selector: (row) => row.leave_date,
      minWidth: "140px",
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
      minWidth: "100px",
    },
    {
      name: "Leave Status",
      selector: (row) => row.leave_status,
      cell: (row) => {
        return (
          <div className=" flex items-center ">
            <div
              className={`mr-2 ${
                row.leave_status === "Approved"
                  ? `text-[#7BEEB1]`
                  : `text-[#FF0000]`
              } text-lg`}
            >
              ●
            </div>
            {row.leave_status}
          </div>
        );
      },
      minWidth: "130px",
    },
    {
      name: "Leave Type",
      selector: (row) => row.leave_type,
      cell: (row) => {
        return (
          <div className=" rounded-[20px] bg-[#FFEFEF] px-[10px] py-[2px] text-xs font-semibold leading-4 text-[#FF0000] ">
            {row.leave_type}
          </div>
        );
      },
    },
    {
      name: "Paid/Unpaid",
      selector: (row) => row.Leave_payment,
      cell: (row) => {
        return (
          <div
            className={` px-[10px] py-[2px] ${
              row.Leave_payment === "Paid"
                ? ` bg-[#CAF1DC] text-[#00B656] `
                : ` bg-[#FFF2ED] text-[#FF845C] `
            }  rounded-[20px]  text-xs font-semibold leading-4  `}
          >
            {row.Leave_payment}
          </div>
        );
      },
    },
  ];

  const data = [
    {
      id: 1,
      member: "Yoshio SaiduRoy Pan",
      leave_date: "15 Nov",
      duration: "Half Day",
      leave_status: "Approved",
      leave_type: "Sick",
      Leave_payment: "Paid",
    },
    {
      id: 2,
      member: "David RichardsAmit Baloyi",
      leave_date: "20 Nov",
      duration: "Half Day",
      leave_status: "Approved",
      leave_type: "Sick",
      Leave_payment: "Paid",
    },
    {
      id: 3,
      member: "Grace WaltersToshio Maas",
      leave_date: "22 Nov - 22 Apr",
      duration: "Full Day",
      leave_status: "Approved",
      leave_type: "Maternity ",
      Leave_payment: "Paid",
    },
    {
      id: 4,
      member: "Blessing Santos",
      leave_date: "13 Dec",
      duration: "Full Day",
      leave_status: "Rejected",
      leave_type: "Casual",
      Leave_payment: "Unpaid",
    },
    {
      id: 5,
      member: "Helga OkonYing Zhong",
      leave_date: "31 Dec - 20 Jan",
      duration: "Full Day",
      leave_status: "Approved",
      leave_type: "Marriage",
      Leave_payment: "Paid",
    },
  ];

  return (
    <div
      className={` rounded-lg border border-[#E1DCFF] bg-[#FFFFFF] ${
        showPopupMenu
          ? ` w-full `
          : ` lg:w-[600px] min-[1300px]:w-[740px]  2xl:w-full `
      }  min-h-[300px]  `}
    >
      <div className=" flex h-[50px] items-center justify-between px-4 ">
        <div className=" text-base font-semibold leading-5 text-[#26212E] ">
          Team On Leave
        </div>
        <div className=" flex gap-[10px]">
          <select
            id={"type"}
            className={` custom-select h-8 w-[131px] rounded border border-[#DCD6FF] bg-[#F8F7FC] px-4 text-sm font-normal leading-[25px] text-[#26212E] placeholder:text-[#9F9F9F] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] `}
            name={"type"}
            onChange={onChangeSelectHandler}
            value={selectDropDownValue}
          >
            <option>All</option>
            <option>Design</option>
            <option>Sales</option>
            <option>Human Resources</option>
            <option>Development</option>
            <option>Finance</option>
            <option>Marketing</option>
            <option>Quality Assurance</option>
          </select>
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
          tableallselectcheckbox={"selectableRows"}
          // pagination
        />
      </div>
    </div>
  );
}
