import React, { useState, useEffect } from "react";

import config from "../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendanceRecords } from "./attendanceThunks";
import DatePopup from "./DatePopup";
import CustomDropdown from "./CustomDropdown";
import EmployeeDropdown from "./EmployeeDropdown";
import { useLocation, useNavigate } from "react-router-dom";

const options = [
  "Today",
  "Yesterday",
  "This week",
  "Last week",
  "Last 2 week",
  "Last 14 days",
  "This Month",
  "Last Month",
  "Last 30 days",
  "Custom",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Attendance = () => {
  const dispatch = useDispatch();

  const user_deatils = useSelector(store=>store?.auth?.api_call_company_details);
  const companyID = user_deatils?.companyId;

  const api_call_Attandance = useSelector(
    (state) => state?.attendance?.toggle_api_call,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { records, loading, error } = useSelector(
    (state) => state.attendance || [],
  );



  const data = useSelector((store) => store.general.settingDropDown) || {};

  const projectDepartmentNames =
    data?.projectDepartments?.nodes?.map((department) => department.name) || [];
  const holidayMonthNames =
    data?.holidayMonths?.nodes?.map((month) => month.name) || [];
  const holidayYearNames =
    data?.holidayYears?.nodes?.map((year) => year.name) || [];
  const jobDesignationNames =
    data?.jobDesignations?.nodes?.map((designation) => designation.name) || [];

    const userData = (records || [])?.reduce((acc, record) => {
      const userId = record?.userId;
    
      let userEntry = acc.find((u) => u.id === btoa(`user:${userId}`));
    
      if (!userEntry) {
        userEntry = {
          name: `${record?.firstName} ${record?.lastName}`.trim() || "null null",
          id: btoa(`user:${userId}`),
          avatar: record?.profileImage,
          role: record?.userDesignation,
          attendance: [],
        };
        acc.push(userEntry);
      }
    
      // Add each attendance record separately
      if (Array.isArray(record?.attendanceRecords)) {
        userEntry.attendance.push(...record.attendanceRecords);
      }
    
      return acc;
    }, []);
  

  const [selectedOption, setSelectedOption] = useState("Today");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCustomPopupOpen, setIsCustomPopupOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fixedEmployeeID, setFixedEmployeeID] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Initialize all filter states from URL params
  const [selectedEmployee, setSelectedEmployee] = useState(
    queryParams.get("employee") || "All",
  );

  useEffect(() => {
    setFixedEmployeeID(selectedEmployee);
  }, [selectedEmployee]);

  const [selectedDepartment, setSelectedDepartment] = useState(
    queryParams.get("department") || "All",
  );
  const [selectedStatus, setSelectedStatus] = useState(
    queryParams.get("status") || "All",
  );
  const [selectedMonth, setSelectedMonth] = useState(
    queryParams.get("month") || "Select Month",
  );
  const [selectedYear, setSelectedYear] = useState(
    queryParams.get("year") || "Select Year",
  );

  const updateURLParams = () => {
    const params = new URLSearchParams();
    if (selectedEmployee !== "All") params.set("employee", selectedEmployee);
    if (selectedDepartment !== "All")
      params.set("department", selectedDepartment);
    if (selectedStatus !== "All") params.set("status", selectedStatus);
    if (selectedMonth !== "Select Month") params.set("month", selectedMonth);
    if (selectedYear !== "Select Year") params.set("year", selectedYear);

    navigate({ search: params.toString() });
  };

  const handleEmployeeSelect = (employee) => {

    setSelectedEmployee(employee?.email);
  
    if (employee.userId !== "All") {
      // Find the employee's record from the attendance data
      const selectedEmployeeRecord = records.find(
        (record) => record.userId === employee.userId );
  
      if (selectedEmployeeRecord) {
        const employeeDepartment = selectedEmployeeRecord.department || "All"; 
        const employeeDesignation = selectedEmployeeRecord.userDesignation || "All";
  
        setSelectedDepartment(employeeDepartment);
        setSelectedStatus(employeeDesignation);
      } else {
        setSelectedDepartment("All");
        setSelectedStatus("All");
      }
    } else {
      setSelectedDepartment("All");
      setSelectedStatus("All");
    }
  };

  const handleDropdownChange = (value, type) => {
    switch (type) {
      case "Department":
        setSelectedDepartment(value);
        break;
      case "Status":
        setSelectedStatus(value);
        break;
      case "Month":
        setSelectedMonth(value);
        if (value !== "Select Month" && selectedYear !== "Select Year") {
          setErrorMessage("");
        }
        break;
      case "Year":
        setSelectedYear(value);
        if (value !== "Select Year" && selectedMonth !== "Select Month") {
          setErrorMessage("");
        }
        break;
      default:
        break;
    }
  };

  const handleFilter = () => {
    const isMonthSelected = selectedMonth !== "Select Month";
    const isYearSelected = selectedYear !== "Select Year";

    // Validation: Check if both month and year are selected
    if (!isMonthSelected || !isYearSelected) {
      setErrorMessage("Please select both Month and Year.");
      return;
    }

    setErrorMessage(""); // Reset error message

    const filterData = {
      user_id:
        selectedEmployee !== "All" && !isNaN(selectedEmployee)
          ? Number(selectedEmployee)
          : null,
      department: selectedDepartment !== "All" ? selectedDepartment : null,
      designation: selectedStatus !== "All" ? selectedStatus : null,
      startDate:
        selectedMonth && selectedYear
          ? `${selectedYear}-${String(
              new Date(`${selectedMonth} 1`).getMonth() + 1,
            ).padStart(2, "0")}-01 00:00:00`
          : null,
      endDate:
        selectedMonth && selectedYear
          ? `${selectedYear}-${String(
              new Date(`${selectedMonth} 1`).getMonth() + 1,
            ).padStart(2, "0")}-${new Date(
              selectedYear,
              new Date(`${selectedMonth} 1`).getMonth() + 1,
              0,
            ).getDate()} 23:59:59`
          : null,
    };

    updateURLParams();

    dispatch(fetchAttendanceRecords(filterData, {}, fixedEmployeeID,companyID));
    setIsFilterOpen(false);
  };

  const handleCancel = () => {
    setIsFilterOpen(false);
    navigate({ search: "" });
    // Reset all filter states
    setSelectedEmployee("All");
    setSelectedDepartment("All");
    setSelectedStatus("All");
    setSelectedMonth("Select Month");
    setSelectedYear("Select Year");
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (option === "Custom") {
      setIsCustomPopupOpen(true);
    }
  };

  const isValidDate = (date) => !isNaN(new Date(date).getTime());

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    if (!isValidDate(date)) {
      setStartDate(null);
      return;
    }
    const formattedDate = new Date(date).toISOString().split("T")[0];
    setStartDate(formattedDate);
  };

  const handleEndDateChange = (e) => {
    const date = e.target.value;
    if (!isValidDate(date)) {
      
      setEndDate(null);
      return;
    }
    const formattedDate = new Date(date).toISOString().split("T")[0];
    setEndDate(formattedDate);
  };

  useEffect(() => {
    if (startDate && endDate) {
      validateAndDispatchDates(startDate, endDate);
    }
  }, [startDate, endDate]);

  const validateAndDispatchDates = (start, end) => {
    if (!isValidDate(start) || !isValidDate(end)) {
      
      return;
    }

    if (new Date(start) > new Date(end)) {
     
      return;
    }

    dispatch(
      fetchAttendanceRecords(
        "Custom",
        { startDate: start, endDate: end },
        fixedEmployeeID,
        companyID
      ),
    );
    setIsCustomPopupOpen(false);
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const calculateTotal = (attendance, type) => {
    const toSeconds = (time) => {
      if (!time) return 0;
      const [hours, minutes, seconds] = time.split(":").map(Number);
      return hours * 3600 + minutes * 60 + (seconds || 0);
    };

    const toTimeFormat = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${String(hours).padStart(2, "0")}h  ${String(minutes).padStart(
        2,
        "0",
      )}m`;
    };

    const totalSeconds = attendance.reduce((sum, entry) => {
      let timeInSeconds = 0;

      if (type === "total_break") {
        timeInSeconds = entry[type] * 60;
      } else if (type === "worked_time" || type === "total_time") {
        timeInSeconds = toSeconds(entry[type]);
      }

      return sum + (isNaN(timeInSeconds) ? 0 : timeInSeconds);
    }, 0);

    return toTimeFormat(totalSeconds);
  };

  const handleNext = () => {
    if (currentIndex < options.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(options[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(options[currentIndex - 1]);
    }
  };

  useEffect(() => {
    dispatch(fetchAttendanceRecords(selectedOption, {}, fixedEmployeeID,companyID));
  }, [dispatch, selectedOption, fixedEmployeeID, api_call_Attandance]);

  // useEffect(() => {
  //   if(api_call_Attandance){
  //     dispatch(fetchAttendanceRecords(selectedOption, {}, fixedEmployeeID));
  //   }
  // }, [dispatch, selectedOption, fixedEmployeeID,api_call_Attandance]);

  useEffect(() => {
    const data = [...userData];
    setFilteredData(data);
  }, [selectedOption, records]);

  const groupByDate = (entries) => {
    return entries.reduce((acc, entry) => {
      const date = new Date(entry.check_in_time).toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
    }, {});
  };

  useEffect(() => {
    const isSelectDesabled = () => {
      return selectedEmployee !== "All" && selectedEmployee !== "all";
    };

    const result = isSelectDesabled();
    setIsSelectDisabled(result); // This updates the state with the boolean value
  }, [selectedEmployee]);

  return (
    <div className="flex flex-col gap-[16px] ">
      {/* Attendance header */}
      <div className="relative flex flex-wrap items-center justify-between border border-[#E1DCFF] bg-[#F8F7FC] px-[18px] py-[14px]">
        <div className="flex justify-center gap-3">
          <div className="flex flex-nowrap">
            <button
              onClick={handleNext}
              disabled={currentIndex === options.length - 1}
              className={`group rounded-s-[4px] border border-[#DCD6FF] bg-white px-[12px] py-[10px] text-[#260B6A] hover:bg-[#6048F1] hover:text-white ${
                currentIndex === options.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              <img
                src={
                  config.PUBLIC_URL + "/assets/images/amdital/left_arrow.svg"
                }
                alt=""
                className="rotate-90  group-hover:invert"
              />
            </button>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`group rounded-e-[4px] border border-[#DCD6FF] bg-white px-[14.5px] py-[10px] text-[#260B6A] hover:bg-[#6048F1] hover:text-white ${
                currentIndex === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <img
                src={`${config.PUBLIC_URL}/assets/images/amdital/right_arrow.svg`}
                alt=""
                className="transition-all group-hover:invert"
              />
            </button>
          </div>

          <div className="relative lg:w-52">
            {/* Selected Option */}
            <button
              onClick={toggleDropdown}
              className="flex min-w-[126px] items-center justify-between rounded-[4px] border border-[#DCD6FF] bg-white px-4 py-[6.5px] text-[14px] font-semibold text-[#260B6A] shadow-sm focus:outline-none"
            >
              {selectedOption}
              <span className="ml-2 text-[#260B6A]">
                <img
                  src={
                    config.PUBLIC_URL + "/assets/images/amdital/down_arrow.svg"
                  }
                  alt=""
                />
              </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute z-[1100] mt-1 min-w-[156px] rounded-md border border-gray-300 bg-white shadow-lg">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`flex w-full items-center justify-between px-4 py-2 text-left text-[14px] ${
                      selectedOption === option
                        ? "font-medium text-[#26212E]"
                        : "text-[#26212E]"
                    }`}
                  >
                    {option}
                    {selectedOption === option && (
                      <img
                        src={
                          config.PUBLIC_URL +
                          "/assets/images/amdital/tick_icon_black.svg"
                        }
                        alt=""
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
            {isOpen && (
              <div
                className=" fixed inset-0 z-[1000] h-full w-full"
                onClick={() => {
                  setIsOpen(false);
                }}
              ></div>
            )}
          </div>
        </div>
        {isCustomPopupOpen && (
          <>
            <DatePopup
              startDate={startDate}
              endDate={endDate}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              onClose={() => setIsCustomPopupOpen(false)}
            />
            <div
              className="fixed inset-0 h-full w-full"
              onClick={() => setIsCustomPopupOpen(false)}
            ></div>
          </>
        )}
        <div className="relative ">
          <button
            className="flex items-center justify-center gap-1 rounded-[4px] border border-[#DCD6FF] bg-white px-4 py-[0.29rem] text-[14px] font-semibold text-[#260B6A]"
            onClick={() => setIsFilterOpen(true)}
          >
            <img
              src={config.PUBLIC_URL + "/assets/images/amdital/filter.svg"}
              alt="filterIcon"
            />
            Filter
          </button>

          {isFilterOpen && (
            <div className="fixed right-0 top-12 z-[100] min-h-[70vh] w-[264px] border border-[#DCD6FF] bg-white  ">
              <div className="flex max-h-[94svh] min-h-[94svh] w-full flex-col items-center  justify-between overflow-y-auto">
                <div className="flex w-full flex-col items-center justify-center p-4 ">
                  <h1 className="w-full self-start font-semibold text-[#26212E]">
                    <span className="mb-2">Filters</span>
                    <br />
                  </h1>
                  <h1 className="mt-2 w-full">
                    <hr />
                  </h1>
                  <EmployeeDropdown
                   onSelect={handleEmployeeSelect}
                    labelName="Employee"
                    selectedValue={selectedEmployee}
                  />
                  <CustomDropdown
                    label="Department"
                    options={["All", ...projectDepartmentNames]}
                    onChange={(value) =>
                      handleDropdownChange(value, "Department")
                    }
                    selectedValue={selectedDepartment}
                    isDisabled={isSelectDisabled}
                  />
                  <CustomDropdown
                    label="Designation"
                    options={["All", ...jobDesignationNames]}
                    onChange={(value) => handleDropdownChange(value, "Status")}
                    selectedValue={selectedStatus}
                    isDisabled={isSelectDisabled}
                  />
                  <CustomDropdown
                    label="Month"
                    options={["Select Month", ...holidayMonthNames]}
                    onChange={(value) => handleDropdownChange(value, "Month")}
                    selectedValue={selectedMonth}
                  />
                  <CustomDropdown
                    label="Year"
                    options={["Select Year", ...holidayYearNames]}
                    onChange={(value) => handleDropdownChange(value, "Year")}
                    selectedValue={selectedYear}
                  />
                  {errorMessage && (
                    <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                  )}
                </div>
                <div className="flex w-full justify-between p-4  ">
                  <button
                    className="rounded-[4px] border-2 border-[#FF845C] bg-white px-8 py-2 text-sm font-medium text-[#FF845C] "
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded-[4px] bg-[#FF845C] px-8 py-2 text-sm font-medium text-white "
                    onClick={() => handleFilter()}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
          {isFilterOpen && (
            <div
              className=" fixed inset-0 z-[99] h-full w-full"
              onClick={() => {
                setIsFilterOpen(false);
              }}
            ></div>
          )}
        </div>
      </div>

      {/* Attendance Table */}
      <div className="h-[85svh] overflow-x-auto overflow-y-auto">
        <table className="w-full min-w-full border-collapse border border-gray-200">
          <thead className="bg-[#F8F7FC] text-[16px] font-semibold text-[#26212E]">
            <tr>
              <th className="text-nowrap px-10  py-6 text-left font-semibold">
                Name
              </th>
              <th className="text-nowrap px-4  py-5 text-center font-semibold">
                Check In
              </th>
              <th className="text-nowrap px-4  py-5 text-center font-semibold">
                Clock Out
              </th>
              <th className="text-nowrap px-4  py-5 text-center font-semibold">
                Break
              </th>
              <th className="text-nowrap px-4 py-5 text-center font-semibold">
                Worked
              </th>
              <th className="text-nowrap px-4 py-5 text-center font-semibold">
                Total
              </th>
              <th className="text-nowrap px-4 py-5 text-start font-semibold">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((person) => {
                const formatTime = (time) => {
                  if (!time) return "-";
                  const [hours, minutes] = time.split(":");
                  return `${hours.padStart(2, "0")}:${minutes.padStart(
                    2,
                    "0",
                  )}`;
                };

                const checkInTimeRaw = person.attendance[0]?.check_in_time;
                const CheckInTime = checkInTimeRaw
                  ? new Date(checkInTimeRaw).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "-"; // Return an empty string if check_in_time is null or undefined

                // Check if check_out_time is null or undefined
                const checkOutTimeRaw = person.attendance[0]?.check_out_time;
                const CheckOutTime = checkOutTimeRaw
                  ? new Date(checkOutTimeRaw).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "-";

                  const formatBreakTime = (breakMinutes) => {
                    if (breakMinutes < 0) {
                      return "-";
                    }
                    if (breakMinutes < 60) {
                      return `${breakMinutes}m`;
                    } else {
                      const hours = Math.floor(breakMinutes / 60);
                      const minutes = breakMinutes % 60;
                      return `${hours}h${minutes > 0 ? ` ${String(minutes).padStart(2, "0")}m` : ""}`;
                    }
                  };

                const breakTime = person.total_break
                  ? formatBreakTime(person.total_break)
                  : "-";

                return (
                  <React.Fragment key={person.id}>
                    {/* Main Row */}
                    <tr
                      className="cursor-pointer bg-white text-[#26212E]"
                      onClick={() => toggleRow(person.id)}
                    >
                      <td className="flex items-center space-x-4 border-t border-[#E1DCFF] px-4 py-3">
                        <span
                          className={`transform transition-transform ${
                            expandedRow === person.id
                              ? "rotate-0"
                              : "-rotate-90"
                          }`}
                        >
                          <img
                            src={
                              config.PUBLIC_URL +
                              "/assets/images/amdital/down_arrow.svg"
                            }
                            alt=""
                          />
                        </span>
                        <div className="flex items-center justify-between gap-2 text-[#26212E]">
                          <div className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border bg-[#806BFF]">
                            {person?.avatar ? (
                              <img
                                src={person.avatar}
                                alt={person.name}
                                onError={(e) => {
                                  e.target.onerror = null; // Prevent infinite loop if the fallback image also fails
                                  e.target.src = ""; // Clear the src to avoid showing the broken image icon
                                }}
                              />
                            ) : (
                              <div className="items-center justify-center">
                                <p className="text-center capitalize text-white">
                                  {person?.name[0]}
                                </p>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium capitalize">
                              {person?.name || "unknown"}
                            </p>
                            <p className="text-sm capitalize">
                              {person?.role || "unknown role"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Check-in Time */}
                      <td className="border border-[#E1DCFF] px-4 py-3 text-center text-sm">
                        {expandedRow !== person.id &&
                        person.attendance.length === 1
                          ? CheckInTime
                          : "-"}
                      </td>

                      {/* Check-out Time */}
                      <td className="border border-[#E1DCFF] px-4 py-3 text-center text-sm">
                        {expandedRow !== person.id &&
                        person.attendance.length === 1
                          ? CheckOutTime
                          : "-"}
                      </td>

                      {/* Break Time */}
                      <td className="border border-[#E1DCFF] px-4 py-3 text-center text-sm">
                        {expandedRow !== person.id &&
                        person.attendance.length === 1 && formatBreakTime(person.attendance[0]?.total_break) !== "0m"
                          ? formatBreakTime(person.attendance[0]?.total_break)
                          : "-"}
                      </td>

                      {/* Worked Time */}
                      <td className="border border-[#E1DCFF] px-4 py-3 text-center text-sm">
                        {expandedRow !== person.id &&
                        person.attendance.length === 1
                          ? formatTime(person.attendance[0]?.worked_time)
                          : "-"}
                      </td>

                      {/* Total Time */}
                      <td className="border border-[#E1DCFF] px-4 py-3 text-center text-sm">
                        {expandedRow !== person.id &&
                        person.attendance.length === 1
                          ? formatTime(person.attendance[0]?.total_time)
                          : "-"}
                      </td>

                      {/* Notes */}
                      <td className="max-w-24 text-wrap border border-[#E1DCFF] px-4 py-3 text-sm">
                        {expandedRow !== person.id &&
                        person.attendance.length === 1
                          ? person.attendance[0]?.checkout_notes
                          : "-"}
                      </td>
                    </tr>

                    {/* Expanded Rows */}
                    {expandedRow === person.id &&
                      (() => {
                        // Group data by date
                        const groupedData = groupByDate(person.attendance);

                        return Object.entries(groupedData).map(
                          ([date, entries]) => (
                            <React.Fragment key={date}>
                              {entries.map((entry, index) => {
                                const dateObject = new Date(
                                  entry.check_in_time,
                                );

                                const dayOfWeek = dateObject.toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "short",
                                  },
                                ); // e.g., "Wed"
                                const formattedDate =
                                  dateObject.toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }); // e.g., "08 Jan 2025"

                                const formattedTime = dateObject
                                  ? dateObject.toLocaleTimeString("en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })
                                  : "-";

                                const checkOutTimeRaw = entry?.check_out_time;
                                const formattedCheckout = checkOutTimeRaw
                                  ? new Date(
                                      checkOutTimeRaw,
                                    ).toLocaleTimeString("en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })
                                  : "-";

                                const formatTime = (time) => {
                                  if (!time) return "";
                                  const [hours, minutes] = time.split(":");
                                  return `${hours.padStart(2, "0")}:${minutes}`;
                                };

                                const formattedTotalTime = entry.total_time
                                  ? formatTime(entry.total_time)
                                  : "";
                                const formattedWorkedTime = entry.worked_time
                                  ? formatTime(entry.worked_time)
                                  : "";

                                  const formatBreakTime = (breakMinutes) => {
                                    if (breakMinutes < 0) {
                                      return "-";
                                    }
                                    if (breakMinutes < 60) {
                                      return `${breakMinutes}m`;
                                    } else {
                                      const hours = Math.floor(breakMinutes / 60);
                                      const minutes = breakMinutes % 60;
                                      return `${hours}h${minutes > 0 ? ` ${String(minutes).padStart(2, "0")}m` : ""}`;
                                    }
                                  };

                                const breakTime = entry.total_break
                                  ? formatBreakTime(entry.total_break)
                                  : "";

                                return (
                                  <tr
                                    key={`${date}-${index}`}
                                    className="bg-white text-[#26212E]"
                                  >
                                    {/* Row-spanning cell */}
                                    {index === 0 && (
                                      <td
                                        className=" border-t border-[#E1DCFF] px-4 py-3"
                                        rowSpan={entries.length}
                                      >
                                        <div className="flex items-center justify-start gap-7">
                                          <span className="min-w-10 text-sm font-semibold">
                                            {dayOfWeek}
                                          </span>
                                          <span className="text-sm font-normal">
                                            {formattedDate}
                                          </span>
                                          {entry.leave && (
                                            <span className="flex items-center justify-center rounded-full bg-[#F7908B] px-5 text-[10px] text-[#26212E]">
                                              {entry.leave}
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {/* Other cells */}
                                    <td className="border border-[#E1DCFF] px-4 py-3 text-center text-sm">
                                      {formattedTime || "-"}
                                    </td>
                                    <td className="border border-[#E1DCFF] px-4 py-3 text-center text-sm">
                                      {formattedCheckout || "-"}
                                    </td>
                                    <td className="border border-[#E1DCFF] px-4 py-3 text-center text-sm">
                                      {breakTime || "-"}
                                    </td>
                                    <td className="border border-[#E1DCFF] px-4 py-3 text-center text-sm">
                                      {formattedWorkedTime || "-"}
                                    </td>
                                    <td className="border border-[#E1DCFF] px-4 py-3 text-center text-sm">
                                      {formattedTotalTime || "-"}
                                    </td>
                                    <td className="max-w-24 text-wrap border border-[#E1DCFF] px-4 py-3 text-sm">
                                      {entry.checkout_notes || "-"}
                                    </td>
                                  </tr>
                                );
                              })}
                            </React.Fragment>
                          ),
                        );
                      })()}

                    {expandedRow === person.id && (
                      <tr className="border-b-none  bg-[#F8F7FC] text-sm font-semibold text-[#26212E]">
                        <td className="border-b-none border-t border-[#E1DCFF] px-4 py-3 ">
                          Total
                        </td>
                        <td className="border border-[#E1DCFF] px-4 py-3 text-center"></td>
                        <td className="border border-[#E1DCFF] px-4 py-3 text-center"></td>
                        <td className="border border-[#E1DCFF] px-4 py-3 text-center">
                          {calculateTotal(person.attendance, "total_break")}
                        </td>
                        <td className="border border-[#E1DCFF] px-4 py-3 text-center">
                          {calculateTotal(person.attendance, "worked_time")}
                        </td>
                        <td className="border border-[#E1DCFF] px-4 py-3 text-center">
                          {calculateTotal(person.attendance, "total_time")}
                        </td>
                        <td className="border border-[#E1DCFF] px-4 py-3 text-center"></td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="border border-[#E1DCFF] px-4 py-5 text-center"
                >
                  No data available for the selected filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
