import React, { useState, useRef, useEffect } from "react";
import "./datePopup.css";
import config from "../../../../config/config";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const CustomDateInput = ({
  label = "Select Date",
  inputWidth = "200px",
  inputHeight = "40px",
  labelWidth = "100px",
  value,
  onChange,
  required = true,
  placeholder = "YYYY/MM/DD",
  inputClass,
  wrapperClass,
  dropDownPostion,
  disableWeekends = false // ⬅️ NEW PROP
}) => {
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const [displayYear, setDisplayYear] = useState(new Date().getFullYear());
  const [displayMonth, setDisplayMonth] = useState(new Date().getMonth());
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDirection, setCalendarDirection] = useState("down");
  const calendarRef = useRef(null);
  const inputRef = useRef(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    setSelectedDate(value ? new Date(value) : null);
  }, [value]);

  const handleInputClick = () => {
    setShowCalendar(true);
    if (selectedDate) {
      setDisplayMonth(selectedDate.getMonth());
      setDisplayYear(selectedDate.getFullYear());
    }

    setTimeout(() => {
      const inputRect = inputRef.current?.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const calendarHeight = 300;
      if (inputRect && inputRect.bottom + calendarHeight > windowHeight) {
        setCalendarDirection("up");
      } else {
        setCalendarDirection("down");
      }
    }, 0);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    const formattedDate = formatDate(date);
    if (onChange) {
      onChange({ target: { value: formattedDate } });
    }
  };

  const handlePrevMonth = () => {
    setDisplayMonth(prev => {
      if (prev === 0) {
        setDisplayYear(prevYear => prevYear - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setDisplayMonth(prev => {
      if (prev === 11) {
        setDisplayYear(prevYear => prevYear + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleMonthChange = (e) => {
    setDisplayMonth(parseInt(e.target.value, 10));
  };

  const handleYearChange = (e) => {
    setDisplayYear(parseInt(e.target.value, 10));
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(displayYear, displayMonth);
    const daysBefore = [];
    const daysAfter = [];
    const currentMonthDays = [];

    const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay() || 7;
    const daysFromPrevMonth = firstDayOfMonth - 1;

    if (daysFromPrevMonth > 0) {
      const prevMonthDays = getDaysInMonth(displayYear, displayMonth - 1);
      for (let i = 0; i < daysFromPrevMonth; i++) {
        const day = prevMonthDays - daysFromPrevMonth + i + 1;
        const date = new Date(displayYear, displayMonth - 1, day);
        daysBefore.push({ day, date, currentMonth: false });
      }
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(displayYear, displayMonth, i);
      currentMonthDays.push({ day: i, date, currentMonth: true });
    }

    const totalDaysShown = 42;
    const nextMonthDays = totalDaysShown - daysBefore.length - currentMonthDays.length;

    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(displayYear, displayMonth + 1, i);
      daysAfter.push({ day: i, date, currentMonth: false });
    }

    return [...daysBefore, ...currentMonthDays, ...daysAfter];
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target) && !inputRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);
  const calendarDays = generateCalendarDays();

  return (
    <div className="custom-date-selector w-full" style={{ position: "relative", display: "inline-block" }}>
      <label style={{ display: "block", width: labelWidth, marginBottom: "2px" }} className="text-[#26212E] text-sm font-medium whitespace-nowrap">
        {label} <span className="text-[#FF0000]">{required && "*"}</span>
      </label>
      <div className={`relative w-full ${wrapperClass ? wrapperClass : `mt-2`}`} style={{ width: inputWidth }}>
        <input
          type="text"
          ref={inputRef}
          value={formatDate(selectedDate)}
          onClick={handleInputClick}
          readOnly
          placeholder={placeholder}
          required={required}
          className={"bg-[#F8F7FC] border border-[#DCD6FF] rounded text-[#26212E] text-sm w-full outline:none focus:outline-none font-normal placeholder:text-[#9F9F9F] placeholder:text-sm px-4 py-2 focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] " + (inputClass ? ` ${inputClass}` : "")}
          style={{ height: inputHeight, cursor: "pointer" }}
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <img src={config.PUBLIC_URL + "/assets/images/amdital/date_image.svg"} alt="date-icon" />
        </span>
      </div>
      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute calendar-popup"
          style={{
            zIndex: 1200,
            right: dropDownPostion ? dropDownPostion : 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            width: "280px",
            padding: "8px",
          }}
        >
          <div className="custom-calendar-header flex items-center justify-between p-2 border-b">
            <button type="button" onClick={handlePrevMonth} className="text-[#806BFF] hover:text-[#7C3AED]">&lt;</button>
            <div className="flex items-center space-x-2">
              <select value={displayMonth} onChange={handleMonthChange} className="bg-[#F8F7FC] border border-[#DCD6FF] rounded px-2 py-1 text-sm focus:outline-none">
                {months.map((month, index) => (
                  <option key={index} value={index}>{month}</option>
                ))}
              </select>
              <select value={displayYear} onChange={handleYearChange} className="bg-[#F8F7FC] border border-[#DCD6FF] rounded px-2 py-1 text-sm focus:outline-none">
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <button type="button" onClick={handleNextMonth} className="text-[#806BFF] hover:text-[#7C3AED]">&gt;</button>
          </div>

          <div className="grid grid-cols-7 gap-1 mt-2 mb-1">
            {days.map((day) => (
              <div key={day} className="text-center font-medium text-[#806BFF] text-sm py-1">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((item, index) => {
              const itemDateNoTime = new Date(item.date);
              itemDateNoTime.setHours(0, 0, 0, 0);
              const isToday = isSameDay(itemDateNoTime, today);
              const isSelected = selectedDate && isSameDay(itemDateNoTime, selectedDate);

              const dayOfWeek = itemDateNoTime.getDay(); // 0 = Sunday, 6 = Saturday
              const isWeekend = disableWeekends && (dayOfWeek === 0 || dayOfWeek === 6);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => !isWeekend && handleDateSelect(item.date)}
                  disabled={isWeekend}
                  className={`
                    h-8 w-8 flex items-center justify-center rounded-full text-sm
                    ${!item.currentMonth ? 'text-gray-400' : 'text-gray-800'}
                    ${isSelected ? 'bg-[#806BFF] text-white' : ''}
                    ${isToday && !isSelected ? 'bg-[#FF7849] text-white' : ''}
                    ${!isToday && !isSelected ? 'hover:bg-[#F8F7FC]' : ''}
                    ${isWeekend ? 'cursor-not-allowed text-gray-300' : ''}
                  `}
                >
                  {item.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDateInput;
