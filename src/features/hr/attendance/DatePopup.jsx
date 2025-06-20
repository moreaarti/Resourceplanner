import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./datePopup.css";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DatePopup = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  onClose,
  onSubmit,
}) => {
  const [selectedDates, setSelectedDates] = useState({ start: new Date(startDate), end: new Date(endDate) });
  const [leftCalendarDate, setLeftCalendarDate] = useState(new Date());
  const [rightCalendarDate, setRightCalendarDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1))
  );
  const [isVisible, setIsVisible] = useState(true);

  // Reset all data when popup opens
  useEffect(() => {
    setSelectedDates({ start: new Date(startDate), end: new Date(endDate) });
    setLeftCalendarDate(new Date());
    setRightCalendarDate(new Date(new Date().setMonth(new Date().getMonth() + 1)));
    setIsVisible(true);
  }, []);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDateClick = (date) => {
    const normalizeDate = (d) => {
      const utcDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      return utcDate;
    };

    

    const normalizedDate = normalizeDate(date);
    const { start, end } = selectedDates;

    if (!start || (start && end)) {
      // Start a new selection
      setSelectedDates({ start: normalizedDate, end: null });
    } else {
      // Set the end date
      const newEndDate = normalizedDate;
      setSelectedDates({ start, end: newEndDate });
      
      // Update parent and hide only when both dates are selected
      handleStartDateChange({ target: { value: start.toISOString().split("T")[0] } });
      handleEndDateChange({ target: { value: newEndDate.toISOString().split("T")[0] } });
      onClose();

      setIsVisible(false);
    }
  };


  const navigateLeftCalendar = (direction) => {
    setLeftCalendarDate(
      new Date(leftCalendarDate.setMonth(leftCalendarDate.getMonth() + direction))
    );
  };

  const navigateRightCalendar = (direction) => {
    setRightCalendarDate(
      new Date(rightCalendarDate.setMonth(rightCalendarDate.getMonth() + direction))
    );
  };

  const isDateInRange = (date) => {
    const { start, end } = selectedDates;
    const normalizedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return start && end && normalizedDate >= start && normalizedDate <= end;
  };

  const isStartOrEndDate = (date) => {
    const { start, end } = selectedDates;
    const normalizedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return (
      normalizedDate.getTime() === start?.getTime() || normalizedDate.getTime() === end?.getTime()
    );
  };

  if (!isVisible) return null;


  const getCalendarValue = () => {
    const { start, end } = selectedDates;
    if (start && end) {
      return [start, end];
    }
    if (start) {
      return start;
    }
    return null;
  };


  return (
    <div
      className="absolute top-14  z-[1200] flex items-center justify-center"
      onClick={handleBackgroundClick}
    >
      <div
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center gap-1">
          {/* Left Calendar */}
          <div className="calendar-container border rounded-lg p-4 bg-white shadow-[2px_4px_4px_0px_#260B6A1A]">
            <div className="flex items-center justify-between mb-2">
              <button
                className="text-[#806BFF] font-semibold"
                onClick={() => navigateLeftCalendar(-1)}
              >
                {"<"}
              </button>
              <button
                className="text-[#806BFF] font-semibold"
                onClick={() => navigateLeftCalendar(1)}
              >
                {">"}
              </button>
              <div className="calendar-header text-center text-[#806BFF] font-semibold">
                {months[leftCalendarDate.getMonth()]} - {leftCalendarDate.getFullYear()}
              </div>
              <div className="calendar-header text-center text-[#806BFF] font-semibold">
                From
              </div>
             
            </div>
            <Calendar
              value={getCalendarValue()}
              onClickDay={handleDateClick}
              showNeighboringMonth={false}
              minDetail="month"
              activeStartDate={leftCalendarDate}
              tileClassName={({ date }) =>
                isStartOrEndDate(date)
                  ? "bg-[#806BFF] text-white rounded-full"
                  : isDateInRange(date)
                  ? "bg-[#E1DCFF] text-[#26212E]"
                  : ""
              }
            />
          </div>

          {/* Right Calendar */}
          <div className="calendar-container border rounded-lg p-4 bg-white shadow-[2px_4px_4px_0px_#260B6A1A]">
            <div className="flex items-center justify-between mb-2">
              <div className="calendar-header text-center text-[#806BFF] font-semibold">
                To
              </div>
              <div className="calendar-header text-center text-[#806BFF] font-semibold">
                {months[rightCalendarDate.getMonth()]} - {rightCalendarDate.getFullYear()}
              </div>
              <button
                className="text-[#806BFF] font-semibold"
                onClick={() => navigateRightCalendar(-1)}
              >
                {"<"}
              </button>
              <button
                className="text-[#806BFF] font-semibold"
                onClick={() => navigateRightCalendar(1)}
              >
                {">"}
              </button>
            </div>
            <Calendar
              value={getCalendarValue()}
              onClickDay={handleDateClick}
              showNeighboringMonth={false}
              minDetail="month"
              activeStartDate={rightCalendarDate}
              tileClassName={({ date }) =>
                isStartOrEndDate(date)
                  ? "bg-[#806BFF] text-white rounded-full"
                  : isDateInRange(date)
                  ? "bg-[#E1DCFF] text-[#26212E]"
                  : ""
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePopup;