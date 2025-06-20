import React, { useState } from "react";
import DashboardTable from "../tables/DashboardTable";
import { useSelector } from "react-redux";

export default function TimesheetDashboard() {
  const showPopupMenu = useSelector((state) => state.general.showPopupMenu);

  const [selectDropDownValue, setSelectDropDownValue] = useState("");

  const onChangeSelectHandler = (event) => {
    setSelectDropDownValue(event.target.value);
  };

  const columns = [
    {
      name: "Project Code",
      selector: (row) => row.projectCode,
      cell: (row) => (
        <div className=" whitespace-nowrap text-sm font-semibold leading-4">
          <span className={`mr-2 ${row.color} text-lg`}>●</span>
          {row.projectCode}
        </div>
      ),
      minWidth: "150px",
    },
    {
      name: (
        <div className=" flex flex-col items-center gap-1">
          <div>Mon</div>
          <div className=" text-sm font-normal leading-4 text-[#26212E] ">
            25 Nov
          </div>
        </div>
      ),
      selector: (row) => row.mon,
      center: true,
      minWidth: "80px",
    },
    {
      name: (
        <div className=" flex flex-col items-center gap-1">
          <div>Tue</div>
          <div className=" text-sm font-normal leading-4 text-[#26212E] ">
            26 Nov
          </div>
        </div>
      ),
      selector: (row) => row.tue,
      center: true,
      minWidth: "80px",
    },
    {
      name: (
        <div className=" flex flex-col items-center gap-1">
          <div>Wed</div>
          <div className=" text-sm font-normal leading-4 text-[#26212E] ">
            27 Nov
          </div>
        </div>
      ),
      selector: (row) => row.wed,
      center: true,
      minWidth: "80px",
    },
    {
      name: (
        <div className=" flex flex-col items-center gap-1">
          <div>Thu</div>
          <div className=" text-sm font-normal leading-4 text-[#26212E] ">
            28 Nov
          </div>
        </div>
      ),
      selector: (row) => row.thu,
      center: true,
      minWidth: "80px",
    },
    {
      name: (
        <div className=" flex flex-col items-center gap-1">
          <div>Fri</div>
          <div className=" text-sm font-normal leading-4 text-[#26212E] ">
            29 Nov
          </div>
        </div>
      ),
      selector: (row) => row.fri,
      center: true,
      minWidth: "80px",
    },
    {
      name: (
        <div className=" flex flex-col items-center gap-1">
          <div>Sat</div>
          <div className=" text-sm font-normal leading-4 text-[#26212E] ">
            30 Nov
          </div>
        </div>
      ),
      selector: (row) => row.sat,
      center: true,
      minWidth: "80px",
    },
    {
      name: (
        <div className=" flex flex-col items-center gap-1">
          <div>Sun</div>
          <div className=" text-sm font-normal leading-4 text-[#26212E] ">
            1 Dec
          </div>
        </div>
      ),
      selector: (row) => row.sun,
      center: true,
      minWidth: "80px",
    },
  ];

  const data = [
    {
      id: 1,
      projectCode: "QA – WCP-25",
      color: "text-red-500",
      mon: "6:00",
      tue: "7:00",
      wed: "3:00",
      thu: "2:00",
      fri: "4:00",
      sat: "-",
      sun: "-",
    },
    {
      id: 2,
      projectCode: "QA – WCP-25",
      color: "text-yellow-500",
      mon: "-",
      tue: "-",
      wed: "1:00",
      thu: "2:00",
      fri: "1:00",
      sat: "-",
      sun: "-",
    },
    {
      id: 3,
      projectCode: "QA – WCP-25",
      color: "text-yellow-400",
      mon: "1:00",
      tue: "00:30",
      wed: "2:00",
      thu: "2:00",
      fri: "2:00",
      sat: "-",
      sun: "-",
    },
  ];

  return (
    <div
      className={` rounded-lg border border-[#E1DCFF] bg-[#FFFFFF] ${
        showPopupMenu
          ? ` w-full  `
          : ` lg:w-[640px] min-[1300px]:w-[800px]  2xl:w-full `
      }  h-[255.25px]  `}
    >
      <div className=" flex h-[50px] items-center justify-between px-4 ">
        <div className=" text-base font-semibold leading-5 text-[#26212E] ">
          TimeSheet
        </div>
        <div>
          <select
            id="type"
            className="custom-select h-8 w-[137px] rounded border border-[#DCD6FF] bg-[#F8F7FC] px-4 text-sm font-normal leading-[25px] text-[#26212E] placeholder:text-[#9F9F9F] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
            name="type"
            onChange={onChangeSelectHandler}
            value={selectDropDownValue}
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this_week">This Week</option>
            <option value="last_week">Last Week</option>
            <option value="last_2_weeks">Last 2 Weeks</option>
            <option value="last_14_days">Last 14 Days</option>
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="last_30_days">Last 30 Days</option>
          </select>
        </div>
      </div>
      <div className="">
        <DashboardTable
          TablecolumData={data}
          headerData={columns}
          entireRowClicked={true}
          tableallselectcheckbox={"selectableRows"}
        />
      </div>
    </div>
  );
}
