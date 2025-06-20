import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import ReactDOM from "react-dom/client";
import "react-calendar-timeline/lib/Timeline.css";
import "./style.css";

import AddItemsForm from "./AddItemsForm";
import EditItemForm from "./EditItemForm";

import config from "../../config/config";
import FilterCompontent from "../hr/emplyee/FilterCompontent";
import FullCalendar from "@fullcalendar/react";

import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import PerformanceCustomDateDropdown from "./PerformanceCustomDateDropdownnew";
import HeaderResoursePlanner from "./HeaderResoursePlanner";
import { useSelector } from "react-redux";
import {
  getResourcePlannerApi,
  updateResourcePlannerDataApi,
  updateResourcePlannersavefortask,
} from "./resourcesPlannerApi";
import UpdatePopUp from "./UpdatePopUp";
import AssignedAssignment from "./AssignedAssignment";
import ItemRender from "./itemRender";

const Calendar = () => {
  const calendarRef = useRef(null);

  const [currentMonthYear, setCurrentMonthYear] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const user_details = useSelector(
    (store) => store?.auth?.api_call_company_details,
  );
  const companyID = user_details?.companyId;
  useEffect(() => {
    updateHeaderTitle();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await getResourcePlannerApi(companyID);

    const users = response?.data?.data?.users?.nodes || [];
    setData(response);
    console.log("data", data);
    setUsersList(users);
    let allAssignments = [];

    users.forEach((user) => {
      let member = user?.assignmentsRecords?.resourcesPlanner_list?.map(
        (r) => `${r.firstName} ${r.lastName}`,
      );

      // console.log("dadadad", user);

      const assignments = user.assignmentsRecords || [];
      assignments.forEach((assignment) => {
        allAssignments.push({
          id: assignment.id,
          // title: assignment.project_name || "", //chnaged.
          title: assignment.task_name || "", //chnaged
          start: assignment.from_date || "2025-06-01",
          totalHours: assignment.totalHours,
          end: assignment.to_date || "2025-010-01",
          resourceId: assignment.user_id,
          LeaveType: assignment.project_name, //show on UI
          assignment_type: assignment.assignment_type,
          total_tracked_time: assignment.total_tracked_time || "0",
          leave_type: assignment.leave_type,
          created_by: assignment.created_by,
          member: `${user.firstName} ${user.lastName}`,
        });
      });
    });

    setEvents(allAssignments);
    setEventsList(
      allAssignments.reduce((acc, event) => {
        acc[event.id] = event;
        return acc;
      }, {}),
    );
  }

  const resourcePlannerData = useSelector((state) => state.resourcesPlanner);
  const { resourcesPlanner_list } = resourcePlannerData;

  const calendarResources = resourcesPlanner_list.map((item) => ({
    id: item.userId,
    title: `${item.firstName ?? ""} ${item.lastName ?? ""}`,
    profileUrl: item.profileImage,

    designation: item.userDesignation,
  }));

  const [visibleRange, setVisibleRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [filterShow, setFilterShow] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD"),
  );
  const y19 = new Date();
  const [events, setEvents] = useState([]);
  const [eventsList, setEventsList] = useState({});

  const [items, setItems] = useState([
    {
      id: 1,
      group: 1,
      title: "Confirm",

      start: moment(y19),
      end: moment(y19).add(1, "week"),
      canMove: true,
      canResize: false,
      canChangeGroup: false,
    },
    {
      id: 2,
      group: 2,
      title: "Assign",
      notes: "additional information",
      selectedBgColor: "rgba(225, 166, 244, 1)",
      start: moment(y19).hours(9).minutes(0).seconds(0),
      end: moment(y19).add(4, "days").hours(17).minutes(0).seconds(0),
    },

    {
      id: 3,
      group: 3,
      title: "Pending",
      start: moment(y19).add(1, "week"),
      end: moment(y19).add(2, "week"),
    },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);

  const [openAssigned, setOpenAssigned] = useState(false);

  const handleDelete = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);

    setSelectedItem(null);
  };

  const handleItemUpdate = (updatedItem) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) => {
        if (event.id === updatedItem.id) {
          return {
            ...event,
            title: updatedItem.project_name || event.title,
            start: updatedItem.from_date
              ? moment(updatedItem.from_date).toISOString()
              : event.start,

            end: updatedItem.to_date
              ? moment(updatedItem.to_date).toISOString()
              : event.end,
            extendedProps: {
              ...event.extendedProps,
              total_days: updatedItem.total_days,
              total_hours: updatedItem.total_hours,
              notes: updatedItem.notes,
              notify_to: updatedItem.notify_to,
              count_weekends: updatedItem.count_weekends,
              assignment_type: updatedItem.assignment_type,
              leave_type: updatedItem.leave_type,
            },
          };
        } else {
          return event;
        }
      });

      return updatedEvents;
    });

    setSelectedItem(null);
  };

  const addItemHandler = ({ taskProject, member, start, end, notes }) => {
    const newEvent = {
      id:
        1 + events.reduce((max, value) => (value.id > max ? value.id : max), 0),
      title: taskProject,
      start: moment(start).format("YYYY-MM-DDTHH:mm:ss"),
      end: moment(end).format("YYYY-MM-DDTHH:mm:ss"),
      resourceId: member,

      // type: activeTab,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);

    setOpen(false);
  };

  const handlePrev = () => {
    const calendarApi = calendarRef.current?.getApi?.();
    if (calendarApi) {
      calendarApi.prev();
    }
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi?.();
    if (calendarApi) {
      calendarApi.next();
    }
  };

  const handleToday = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  };

  // const handleEventDrop = async (info) => {
  //   const { event } = info;

  //   const originalEvents = [...events];

  //   const updatedEvents = events.map((e) => {
  //     if (e.id === event.id) {
  //       return {
  //         ...e,
  //         start: event.startStr,
  //         end: event.endStr,
  //         resourceId: event.getResources()[0]?.id || e.resourceId,
  //       };
  //     }
  //     return e;
  //   });

  //   setEvents(updatedEvents);

  //   // Calculate estimate (total days * 8)
  //   const startDate = new Date(event.startStr);
  //   const endDate = new Date(event.endStr);
  //   const diffTime = endDate.getTime() - startDate.getTime();
  //   const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  //   const estimatedHours = totalDays * 8;

  //   const payload = {
  //     id: event.id,
  //     from_date: event.startStr,
  //     to_date: event.endStr,
  //     estimate: estimatedHours,
  //     resourceId: event.getResources()[0]?.id,
  //   };
  //   console.log("payload", payload);
  //   try {
  //     await updateResourcePlannerDataApi(payload);
  //     await fetchData();
  //   } catch (err) {
  //     console.error("Failed to update event", err);
  //     setEvents(originalEvents);
  //   }
  // };
  const handleEventDrop = (info) => {
    setPopupInfo(info);
    setShowPopup(true);
  };
  const confirmDrop = async () => {
    const { event, revert } = popupInfo;
    const originalEvents = [...events];

    const updatedEvents = events.map((e) => {
      if (e.id === event.id) {
        return {
          ...e,
          start: event.startStr,
          end: event.endStr,
          resourceId: event.getResources()[0]?.id || e.resourceId,
        };
      }
      return e;
    });
    ////////////////////////////////////
    setEvents(updatedEvents);

    const startDate = new Date(event.startStr);
    const endDate = new Date(event.endStr);
    const totalDays =
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const estimatedHours = totalDays * 8;

    const payload = {
      id: event.id,
      from_date: event.startStr,
      to_date: event.endStr,
      estimate: estimatedHours,
      resourceId: event.getResources()[0]?.id,
    };

    try {
      await updateResourcePlannerDataApi(payload);
      await fetchData();
    } catch (err) {
      console.error("Failed to update event", err);
      setEvents(originalEvents);
      if (revert) revert();
    } finally {
      setShowPopup(false);
      setPopupInfo(null);
    }
  };
  const cancelDrop = () => {
    if (popupInfo?.revert) popupInfo.revert();
    setShowPopup(false);
    setPopupInfo(null);
  };

  const handleEventResize = (info) => {
    setPopupInfo({ ...info, type: "resize" }); // Tag the type
    setShowPopup(true);
  };
  const confirmUpdateresize = async () => {
    const { event, revert, type } = popupInfo;
    const originalEvents = [...events];

    const updatedEvents = events.map((e) => {
      if (e.id === event.id) {
        return {
          ...e,
          start: event.startStr,
          end: event.endStr,
          resourceId: event.getResources()[0]?.id || e.resourceId,
        };
      }
      return e;
    });

    setEvents(updatedEvents);

    const startDate = new Date(event.startStr);
    const endDate = new Date(event.endStr);
    const totalDays =
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const estimatedHours = totalDays * 8;

    const payload = {
      id: event.id,
      from_date: event.startStr,
      to_date: event.endStr,
      estimate: estimatedHours,
      resourceId: event.getResources()[0]?.id,
    };

    try {
      await updateResourcePlannerDataApi(payload);
      await fetchData();
    } catch (err) {
      console.error(`Failed to update ${type} event`, err);
      setEvents(originalEvents);
      if (revert) revert();
    } finally {
      setShowPopup(false);
      setPopupInfo(null);
    }
  };
  const cancelUpdateresize = () => {
    if (popupInfo?.revert) popupInfo.revert();
    setShowPopup(false);
    setPopupInfo(null);
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setOpen(true);
    setSelectedUser(info?.resource?._resource.id);
  };

  // const customEventRender = (eventInfo) => {
  //   console.log("eventInfo", eventInfo.event.total_tracked_time);
  //   const title = eventInfo.event.title;
  //   const assignmentType = eventInfo.event.extendedProps.assignment_type;
  //   const leave_type1 = eventInfo.event.extendedProps.leave_type;
  //   const totalTrackedTime = eventInfo.event.extendedProps.total_tracked_time; // ✅ Define this first

  //   const item = {
  //     ...eventInfo.event.extendedProps,
  //     start: eventInfo.event.start,
  //     end: eventInfo.event.end,
  //     assignment_type: assignmentType,
  //     total_tracked_time: totalTrackedTime,
  //     task: title,
  //     leave_type: leave_type1,
  //   };
  //   // console.log("itemevents", item);
  //   // Create DOM container for React component
  //   const container = document.createElement("div");

  //   // Use React 18 createRoot
  //   const root = ReactDOM.createRoot(container);
  //   root.render(<ItemRender item={item} />);

  //   // Return DOM node to FullCalendar
  //   return { domNodes: [container] };
  // };

  // Replace your customTaskRender function in Calendar component with this:

  const customTaskRender = (eventInfo) => {
    const eventDetails = eventsList[eventInfo.event.id] || {};

    // Ensure we have all necessary data
    const item = {
      id: eventInfo.event.id,
      title: eventInfo.event.title,
      task: eventInfo.event.title,
      start: eventInfo.event.start,
      end: eventInfo.event.end,

      // Get data from eventDetails (from your API)
      member: eventDetails.member || "Unknown Member",
      assignment_type: eventDetails.assignment_type || "task",
      leave_type: eventDetails.leave_type || eventDetails.LeaveType,
      total_tracked_time: eventDetails.total_tracked_time || "0",
      totalHours: eventDetails.totalHours || 0,
      created_by: eventDetails.created_by || "Unknown",

      // Get data from event's extendedProps (backup)
      ...eventInfo.event.extendedProps,

      // Merge with eventDetails for complete data
      ...eventDetails,

      // Ensure these critical fields are available
      eventDetails: eventDetails,
    };

    console.log("Rendering item:", item);

    return <ItemRender item={item} events={events} />;
  };

  const handleEventClick = (clickInfo) => {
    console.log("clickInfo", clickInfo);
    const event = clickInfo.event;
    setSelectedItem({
      id: event.id,
      title: event.title,

      start: event?._instance?.range?.start,
      end: event?._instance?.range?.end,
      ...event.extendedProps,
    });
  };

  const handleDateChange = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
  };

  // const handleDateChange = useCallback((startDate, endDate, option) => {
  //   // setStartDate(startDate);
  //   // setEndDate(endDate);

  //   const calendarApi = calendarRef.current?.getApi();
  //   if (calendarApi) {
  //     calendarApi.gotoDate(startDate);

  //     // Control view based on dropdown option
  //     switch (option) {
  //       case "Today":
  //       case "Yesterday":
  //         calendarApi.changeView("timeGridDay");
  //         break;

  //       case "This week":
  //       case "Last week":
  //         calendarApi.changeView("timeGridWeek");
  //         break;

  //       case "This month":
  //       case "Last month":
  //       case "Last 30 days":
  //         calendarApi.changeView("dayGridMonth");
  //         break;

  //       default:
  //         calendarApi.changeView("dayGridMonth");
  //         break;
  //     }
  //   }
  // }, []);

  // const handleDatesSet = (arg) => {
  //   setVisibleRange({
  //     startDate: arg.startStr,
  //     endDate: arg.endStr,
  //   });
  // };
  const handleDatesSet = (arg) => {
    setVisibleRange({
      startDate: arg.start || "2025-06-10",
      endDate: arg.end || "2025-06-10",
    });
  };

  // Prepare Events

  useEffect(() => {
    if (!resourcesPlanner_list.length) return;

    const newEvents = [];

    resourcesPlanner_list?.forEach((user) => {
      const resourceId = user.userId;
      user.assignmentsRecords?.forEach((assignment) => {
        newEvents.push({
          id: assignment.id,
          title:
            assignment.assignment_type === "leave"
              ? assignment.leave_type
              : assignment.project_name,
          start: `${assignment.from_date}T10:00:00`,
          end: `${assignment.to_date}T12:00:00`,
          resourceId: resourceId,
        });
      });
    });

    // Merge new events with existing events safely
    setEvents((prevEvents) => [...prevEvents, ...newEvents]);
  }, [resourcesPlanner_list]);
  const updateHeaderTitle = () => {
    const calendarApi = calendarRef.current?.getApi?.();
    if (calendarApi) {
      const currentDate = calendarApi.getDate();
      const options = { year: "numeric", month: "long" };
      const formattedDate = currentDate.toLocaleDateString("en-US", options);
      setCurrentMonthYear(formattedDate);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b border-[#E1DCFF] bg-[#F8F7FC] px-6 py-4">
        <div className="relative">
          <PerformanceCustomDateDropdown
            handleToday={handleToday}
            handleNext={handleNext}
            handlePrev={handlePrev}
            datesOptions={[
              "Today",
              "Yesterday",
              "This week",
              "Last week",
              "Last 2 week",
              // "Last 14 week",
              "This Month",
              // "Last Month",
              "Last 30 days",
              "Custom",
            ]}
            defaultSelectDate={"Today"}
            onChangeDatehandler={handleDateChange}
          />
        </div>

        <div className="flex items-center gap-[15px]">
          <button
            onClick={() => {
              setFilterShow(!filterShow);
            }}
            className="decoration-skip-ink-none flex h-[32px] items-center justify-center gap-[10px] rounded rounded-e border border-[#DCD6FF] bg-white px-4 text-center text-[14px] font-[700] leading-[16px] tracking-[0.05em] text-[#260B6A] hover:bg-[#EEEBFF]"
          >
            <img
              src={
                config.PUBLIC_URL +
                "/assets/images/amdital/contracts/filter.svg"
              }
              alt=""
            />
            Filter
          </button>
          <button
            onClick={() => {
              setOpenAssigned(true);
            }}
            className="decoration-skip-ink-none flex h-[32px] items-center justify-center gap-[10px] rounded bg-[#FF845C]  px-4 text-center text-[14px] font-[600] leading-[16px] tracking-[0.05em] text-white hover:bg-[#F36A3D]"
          >
            Assigne Task
          </button>
        </div>
      </div>
      <div className="resource-planner mt-4">
        {visibleRange && (
          <HeaderResoursePlanner
            startDate={visibleRange.startDate}
            endDate={visibleRange.endDate}
          />
        )}
        <div className="resource-planner">
          <FullCalendar
            resourceAreaWidth="300px"
            datesSet={handleDatesSet}
            slotLabelDidMount={(arg) => {
              const date = arg.date;
              const dayOfWeek = date.getDay();

              // Set background color for full label row
              arg.el.style.backgroundColor = "#F8F7FC";

              // Keep today's text color as before
              const today = new Date();
              if (date.toDateString() === today.toDateString()) {
                arg.el.style.color = "#806BFF";
              }
            }}
            slotLaneDidMount={(arg) => {
              const day = arg.date.getDay();
              if (day === 0 || day === 6) {
                arg.el.style.backgroundColor = "#F8F7FC";
              }
            }}
            slotLaneContent={(arg) => {
              const day = arg.date.getDay();
              if (day === 0 || day === 6) {
                return (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      backgroundColor: "#F8F7FC",
                    }}
                  ></div>
                );
              }
              return null;
            }}
            slotLabelContent={(arg) => {
              const date = arg.date;
              const day = date.getDate();
              const weekday = date
                .toLocaleDateString("en-US", { weekday: "short" })
                .charAt(0);

              return (
                <div
                  style={{
                    fontFamily: "'Albert Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: "normal",
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  {day} {weekday}
                </div>
              );
            }}
            slotLaneClassNames={(arg) => {
              const day = arg.date.getDay();
              if (day === 0 || day === 6) {
                return "weekend-bg"; //
              }
              return "";
            }}
            plugins={[resourceTimelinePlugin, interactionPlugin]}
            initialView="resourceTimelineMonth"
            resources={calendarResources}
            events={events}
            eventColor="transparent"
            eventBorderColor="transparent"
            eventTextColor="black"
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            ref={calendarRef}
            // eventContent={customEventRender}
            eventContent={customTaskRender}
            editable={true}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            headerToolbar={false}
            // resourceAreaHeaderContent="Members"
            resourceAreaHeaderContent={() => (
              <div className="flex h-full w-full items-center border-r border-[#E1DCFF] bg-[#F8F7FC] pl-5 text-left text-base font-semibold text-[#26212E]">
                Members
              </div>
            )}
            // height="auto"
            // resourceLabelContent={(arg) => {
            //   const resource = arg.resource._resource;
            //   return (
            //     <div
            //       style={{ display: "flex", alignItems: "center", gap: "10px" }}
            //     >
            //       {resource.extendedProps.profileUrl ? (
            //         <img
            //           src={resource.extendedProps.profileUrl}
            //           alt={resource.title}
            //           style={{ width: 50, height: 50, borderRadius: "50%" }}
            //         />
            //       ) : (
            //         <div
            //           style={{
            //             width: 50,
            //             height: 50,
            //             borderRadius: "50%",
            //             background: "#ccc",
            //             display: "flex",
            //             alignItems: "center",
            //             justifyContent: "center",
            //             fontSize: 16,
            //           }}
            //         >
            //           {resource.title[0]}
            //         </div>
            //       )}
            //       <div>
            //         <div style={{ fontWeight: "bold" }}>{resource.title}</div>
            //         <div style={{ fontSize: "12px", color: "#666" }}>
            //           {resource.extendedProps.designation}
            //         </div>
            //       </div>
            //     </div>
            //   );
            // }}
            // resourceLabelContent={(arg) => {
            //   const resource = arg.resource._resource;

            //   const handleClick = () => {
            //     const selectedMember = {
            //       userId: Number(resource.id), // ensure number if your dropdown uses number
            //       firstName: resource.title.split(" ")[0],
            //       lastName: resource.title.split(" ")[1] || "",
            //       profileImage: resource.extendedProps.profileUrl || "",
            //       userDesignation: resource.extendedProps.designation || "",
            //     };

            //     console.log("Selected user:", selectedMember);
            //     setSelectedUser(selectedMember);
            //     setOpen(true);
            //   };

            //   return (
            //     <div
            //       onClick={handleClick}
            //       className="flex cursor-pointer items-center gap-2"
            //     >
            //       {resource.extendedProps.profileUrl ? (
            //         <img
            //           src={resource.extendedProps.profileUrl}
            //           alt={resource.title}
            //           className="h-[36px] w-[36px] rounded-full"
            //         />
            //       ) : (
            //         <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#ccc] text-sm">
            //           {resource.title[0]}
            //         </div>
            //       )}
            //       <div>
            //         <p className="font-bold">{resource.title}</p>
            //         <p className="text-xs text-gray-500">
            //           {resource.extendedProps.designation}
            //         </p>
            //       </div>
            //     </div>
            //   );
            // }}
            resourceLabelContent={(arg) => {
              const resource = arg.resource._resource;

              return (
                <div className="flex cursor-pointer items-center gap-2">
                  {resource.extendedProps.profileUrl ? (
                    <img
                      src={resource.extendedProps.profileUrl}
                      alt={resource.title}
                      className="h-[36px] w-[36px] rounded-full"
                    />
                  ) : (
                    <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#ccc] text-sm">
                      {resource.title[0]}
                    </div>
                  )}
                  <div>
                    <p className="font-bold">{resource.title}</p>
                    <p className="text-xs text-gray-500">
                      {resource.extendedProps.designation}
                    </p>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
      {selectedItem && (
        <div className="fixed left-0 top-0 z-[1100] flex h-full w-full items-center justify-center ">
          <div className=" z-[1100]  mt-10 h-fit rounded-lg ">
            <EditItemForm
              setOpen={setOpen}
              open={selectedItem}
              item={selectedItem}
              onUpdate={handleItemUpdate}
              onCancel={() => setSelectedItem(null)}
              onDelete={handleDelete}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              fetchHandler={fetchData}
              selectedUser={selectedUser}
            />
          </div>
          {selectedItem && (
            <div
              className="fixed inset-0 z-[1000] cursor-pointer bg-[#150C2CB2] "
              onClick={() => setSelectedItem(null)}
            ></div>
          )}
        </div>
      )}

      {open && (
        <div className="fixed left-0 top-0 z-[1100] flex h-full w-full items-center justify-center ">
          <div className=" z-[1100]  mt-10 h-fit rounded-lg ">
            <AddItemsForm
              open={open}
              setOpen={setOpen}
              canvasTime={selectedDate}
              onAddItem={addItemHandler}
              fetchHandler={fetchData}
              selectedUser={selectedUser}
            />
          </div>
          {/* {open && (
            <div
              className="fixed inset-0 z-[1000] cursor-pointer bg-[#150C2CB2] "
              onClick={() => setOpen(false)}
            ></div>
          )} */}
        </div>
      )}
      {openAssigned && (
        <div className="fixed left-0 top-0 z-[1100] flex h-full w-full items-center justify-center">
          <div className="z-[1100] mt-10 h-fit rounded-lg ">
            <AssignedAssignment
              open={openAssigned}
              setOpen={setOpenAssigned}
              canvasTime={selectedDate}
              // onAddItem={addItemHandler} //Assigned
              fetchHandler={fetchData}
            />
          </div>
          {/* {open && (
            <div
              className="fixed inset-0 z-[1000] cursor-pointer bg-[#150C2CB2] "
              onClick={() => setOpen(false)}
            ></div>
          )} */}
        </div>
      )}
      {/* {showPopup && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-30">
          <UpdatePopUp
            cancelHandler={cancelDrop}
            deleteHandler={confirmDrop}
            buttonCLoseName="Cancel"
            buttonDeleteName="Update"
            text="Do you want to update the task dates?"
          />
        </div>
      )} */}
      {showPopup && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-30">
          <UpdatePopUp
            cancelHandler={cancelUpdateresize}
            deleteHandler={confirmUpdateresize}
            buttonCLoseName="Cancel"
            buttonDeleteName="Update"
            text={
              popupInfo?.type === "resize"
                ? "Do you want to update the task duration?"
                : "Do you want to update the task dates??"
            }
          />
        </div>
      )}

      {filterShow && (
        <div
          className="fixed right-0 top-0 z-[1100]  h-full
                              overflow-y-scroll border-l border-[#DCD6FF] bg-[#FFFFFF] p-4 lg:w-[300px]"
        >
          <FilterCompontent
            onClose={() => {
              setFilterShow(!filterShow);
            }}
            departmentDropdown={true}
            filterSubmitHandler={() => {
              setFilterShow(!filterShow);
            }}
            employeeDropdown={true}
            timeTypeDropdown={true}
            projectDropdown={true}
          />
        </div>
      )}
      {filterShow && (
        <div
          className=" fixed inset-0 z-[1000] h-full w-full  opacity-70"
          onClick={() => {
            setFilterShow(!filterShow);
          }}
        ></div>
      )}
    </>
  );
};

export default Calendar;
