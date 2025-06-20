import React, { useState, useEffect } from "react";
import config from "../../config/config";
import DatePopup from "../hr/attendance/DatePopup";

export default function PerformanceCustomDateDropdown({
  onChangeDatehandler,
  datesOptions,
  defaultSelectDate,
  handleToday,
  handleNext,
  handlePrev,
}) {
  const [selectedOption, setSelectedOption] = useState("Today");
  const [baseOption, setBaseOption] = useState("Today");
  const [isCustomPopupOpen, setIsCustomPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [options, setOptions] = useState([
    "Today",
    "Yesterday",
    "This week",
    "Last week",
    "Last 2 weeks",
    "Last 14 days",
    "This month",
    "Last month",
    "Last 30 days",
    "Custom",
  ]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setBaseOption(option);

    if (option === "Custom") {
      setIsCustomPopupOpen(true);
      return;
    }

    const [start, end] = getDateRangeByOption(option);
    updateDates(start, end, false);
    onChangeDatehandler(formatDate(start), formatDate(end), option); // >>>
    setIsOpen(false);
  };
  // useEffect(() => {
  //   if (startDate && endDate) {
  //     onChangeDatehandler(startDate, endDate, selectedOption);
  //   }
  // }, [startDate, endDate]);

  const getDateRangeByOption = (option) => {
    const today = new Date();
    let start = new Date(),
      end = new Date();

    switch (option) {
      case "Today": {
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      }
      case "Yesterday": {
        start.setDate(today.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(today.getDate() - 1);
        end.setHours(23, 59, 59, 999);
        break;
      }
      case "This week": {
        const day = today.getDay();
        const diffToMonday = (day === 0 ? -6 : 1) - day;
        start.setDate(today.getDate() + diffToMonday);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        break;
      }
      case "Last week": {
        const day = today.getDay();
        const diffToMonday = (day === 0 ? -6 : 1) - day;
        start.setDate(today.getDate() + diffToMonday - 7);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        break;
      }
      case "Last 2 weeks":
      case "Last 14 days": {
        start.setDate(today.getDate() - 13);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      }
      case "This month": {
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      }
      case "Last month": {
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      }
      case "Last 30 days": {
        start.setDate(today.getDate() - 29);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      }
      default:
        break;
    }

    return [start, end];
  };

  const updateDates = (start, end, allowAutoDetect = true) => {
    const newStart = formatDate(start);
    const newEnd = formatDate(end);

    if (newStart !== startDate || newEnd !== endDate) {
      // onChangeDatehandler(newStart, newEnd);
      setStartDate(newStart);
      setEndDate(newEnd);
    }

    if (allowAutoDetect) {
      let matched = false;
      for (const option of options) {
        if (option === "Custom") continue;
        const [optStart, optEnd] = getDateRangeByOption(option);
        if (areDatesEqual(optStart, start) && areDatesEqual(optEnd, end)) {
          setSelectedOption(option);
          setBaseOption(option);
          matched = true;
          break;
        }
      }
      if (!matched) {
        setSelectedOption("Custom");
      }
    }
  };

  const areDatesEqual = (d1, d2) => {
    return d1.toDateString() === d2.toDateString();
  };

  const previousHandler = () => {
    const shift = getShiftByOption(baseOption, -1);
    shiftDates(shift);
  };

  const nextHandler = () => {
    const shift = getShiftByOption(baseOption, 1);
    shiftDates(shift);
  };

  const shiftDates = (shift) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setDate(start.getDate() + shift);
    end.setDate(end.getDate() + shift);
    updateDates(start, end);
  };

  const getShiftByOption = (option, direction) => {
    switch (option) {
      case "Today":
      case "Yesterday":
        return direction;
      case "Last week":
      case "This week":
        return direction * 7;
      case "Last 2 weeks":
      case "Last 14 days":
        return direction * 14;
      case "This month":
      case "Last month":
      case "Last 30 days":
        return direction * 30;
      default:
        return (
          (direction * (new Date(endDate) - new Date(startDate))) /
            (1000 * 60 * 60 * 24) +
          1
        );
    }
  };

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    if (datesOptions) {
      setOptions(datesOptions);
      handleSelect(defaultSelectDate);
      setSelectedOption(defaultSelectDate);
      setBaseOption(defaultSelectDate);
    } else {
      setOptions([
        "Today",
        "Yesterday",
        "This week",
        "Last week",
        "Last 2 weeks",
        "Last 14 days",
        "This month",
        "Last month",
        "Last 30 days",
        "Custom",
      ]);
      handleSelect("Today");
      setSelectedOption("Today");
      setBaseOption("Today");
    }
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      onChangeDatehandler(startDate, endDate);
    }
  }, [startDate, endDate]);

  function formatDateToLongUS(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  }

  return (
    <>
      <div className="relative flex items-center gap-4">
        <div className="flex h-[32px] w-[69px] rounded border border-[#DCD6FF] bg-[#FFFFFF] outline-none">
          <div
            // onClick={previousHandler}
            onClick={previousHandler}
            className="group relative flex h-[32px] w-[50%] cursor-pointer items-center justify-center rounded-l border-r border-[#DCD6FF] hover:bg-[#806BFF]"
          >
            <img
              src={config.PUBLIC_URL + "/assets/images/amdital/left_side.svg"}
              alt=""
              className="relative group-hover:brightness-0 group-hover:invert"
            />
          </div>
          <div
            onClick={nextHandler}
            className="group relative flex h-[32px] w-[50%] cursor-pointer items-center justify-center rounded-r hover:bg-[#806BFF]"
          >
            <img
              src={config.PUBLIC_URL + "/assets/images/amdital/right_arrow.svg"}
              alt=""
              className="relative group-hover:brightness-0 group-hover:invert"
            />
          </div>
        </div>
        <div className="relative h-8">
          <button
            onClick={toggleDropdown}
            className="flex h-8 min-w-[126px] items-center justify-between rounded-[4px] border border-[#DCD6FF] bg-white px-4 py-[8px] text-[14px] font-semibold text-[#260B6A] shadow-sm focus:outline-none"
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
              className="fixed inset-0 z-[1000] h-full w-full"
              onClick={() => setIsOpen(false)}
            ></div>
          )}
        </div>

        {/* <div className="flex items-center">
          <div className="text-sm font-semibold leading-[16px] tracking-[5%] text-[#260B6A]">
            { formatDateToLongUS(startDate)} - {formatDateToLongUS(endDate)}
          </div>
        </div> */}
      </div>

      {isCustomPopupOpen && (
        <>
          <DatePopup
            startDate={startDate}
            endDate={endDate}
            onClose={() => {
              setIsCustomPopupOpen((prev) => !prev);
              setIsOpen(false);
            }}
            handleStartDateChange={(e) =>
              setStartDate(formatDate(new Date(e?.target?.value)))
            }
            handleEndDateChange={(e) =>
              setEndDate(formatDate(new Date(e?.target?.value)))
            }
          />
          <div
            className="fixed inset-0 h-full w-full"
            onClick={() => setIsCustomPopupOpen(false)}
          ></div>
        </>
      )}
    </>
  );
}
