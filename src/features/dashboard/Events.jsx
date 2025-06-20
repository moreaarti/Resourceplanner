import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css"; // Custom Tailwind CSS styles for calendar
import { enUS } from "date-fns/locale";
import { useSelector } from "react-redux";

const locales = {enUS};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Weekly Scrum",
    start: new Date(2024, 11, 2, 9, 0),
    end: new Date(2024, 11, 2, 10, 0),
    color: "#CBD7FF",
  },
  {
    title: "Project Kickoff",
    start: new Date(2024, 11, 4, 12, 0),
    end: new Date(2024, 11, 4, 13, 0),
    color: "#FFF200",
  },
  {
    title: "Christmas",
    start: new Date(2024, 11, 25),
    end: new Date(2024, 11, 25),
    color: "#CBD7FF",
  },
  {
    title: "New Year",
    start: new Date(2024, 11, 31),
    end: new Date(2024, 11, 31),
    color: "#FFF200",
  },
  {
    title: "Assign task",
    start: new Date(2024, 11, 31),
    end: new Date(2024, 11, 31),
    color: "#FFF200",
  },
  {
    title: "Task Due",
    start: new Date(2024, 11, 31),
    end: new Date(2024, 11, 31),
    color: "#A8FCFF",
  },
  {
    title: "Assign task",
    start: new Date(2024, 11, 29),
    end: new Date(2024, 11, 31),
    color: "#FFF200",
  },
  {
    title: "Task Due",
    start: new Date(2024, 11, 25),
    end: new Date(2024, 11, 31),
    color: "#A8FCFF",
  },
];



const Events = () => {
  const showPopupMenu = useSelector((state) => state.general.showPopupMenu);

  const [view, setView] = useState("month");

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color || "blue",
        padding: "5px",
      },
    };
  };

  return (
    <div className={` relative dashboard_event  ${showPopupMenu ? ` w-full ` : ` w-[760px]  2xl:w-full `} h-fit  border border-[#E1DCFF] rounded-[4px] `}>

      <div className=" px-5 pt-4 text-base font-semibold leading-5 text-[#26212E]  ">Events</div>
        
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "500px" }}
        views={["month"]}
        defaultView={view}
        eventPropGetter={eventStyleGetter}
        onView={(newView) => setView(newView)}
      />
    </div>
  );
};

export default Events;
