import { useEffect, useState } from "react";
import moment from "moment";
import Timeline from "react-calendar-timeline";
import leftArrow from "./icon/left-arrow.svg";
import rightArrow from "./icon/right-arrow.svg";
import filterIcon from "./icon/filter.svg";
import "react-calendar-timeline/lib/Timeline.css";
import "./style.css";
// import itemRender from "./itemRender";
import AddItemsForm from "./AddItemsForm";
import EditItemForm from "./EditItemForm";
import groupRender from "./groupRender";
import config from "../../config/config";
import FilterCompontent from "../hr/emplyee/FilterCompontent";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      title: "Sample Event",
      start: "2025-06-15T10:00:00",
      end: "2025-06-15T12:00:00",
    },
  ]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filterShow, setFilterShow] = useState(false);
  const [groups] = useState([
    {
      id: 1,
      title: "Saurabh Pote",
      designation: "Web Developer Intern",
      profileUrl: "",
    },
    {
      id: 2,
      title: "Bharat Chavan",
      designation: "Junior Web Developer",
      profileUrl: "",
    },
    {
      id: 3,
      title: "Prasad Pansare",
      designation: "Web Developer Intern",
      profileUrl: "",
    },
    {
      id: 4,
      title: "rahul gite",
      designation: "HR",
      profileUrl: "",
    },
    {
      id: 5,
      title: "sonam raje",
      designation: "project manager Developer",
      profileUrl: "",
    },
    {
      id: 6,
      title: "vinay jain",
      designation: "buisness",
      profileUrl: "",
    },
    {
      id: 7,
      title: "kavita kadam",
      designation: "HR",
      profileUrl: "",
    },
    {
      id: 8,
      title: "harsh gore",
      designation: "project manager Developer",
      profileUrl: "",
    },
    {
      id: 9,
      title: "pallavi khairnar",
      designation: "Buisness",
      profileUrl: "",
    },
    {
      id: 10,
      title: "arav derle",
      designation: "Buisness",
      profileUrl: "",
    },
  ]);
  const y19 = new Date();
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
  const [visibleTimeStart, setVisibleTimeStart] = useState(
    moment().startOf("day").add(-10, "days").valueOf(),
  );
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(
    moment().startOf("day").add(3, "week").valueOf(),
  );
  const keys = {
    groupIdKey: "id",
    groupTitleKey: "title",
    groupRightTitleKey: "rightTitle",
    itemIdKey: "id",
    itemTitleKey: "title",
    itemDivTitleKey: "title",
    itemGroupKey: "group",
    itemTimeStartKey: "start",
    itemTimeEndKey: "end",
    groupLabelKey: "title",
  };
  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              start: moment(dragTime)
                .startOf("day")
                .set({ hour: 9, minute: 0, second: 0 })
                .valueOf(),
              end: moment(dragTime + (item.end - item.start))
                .endOf("day")
                .set({ hour: 17, minute: 0, second: 0 }) // 17:00 for 5 PM
                .valueOf(),

              group: groups[newGroupOrder].id,
            }
          : item,
      ),
    );
    // console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  const handleItemResize = (itemId, time, edge) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              start:
                edge === "left"
                  ? moment(time)
                      .startOf("day")
                      .set({ hour: 9, minute: 0, second: 0 })
                      .valueOf() // 9 AM for left edge
                  : item.start,
              end:
                edge === "right"
                  ? moment(time)
                      .endOf("day")
                      .set({ hour: 17, minute: 0, second: 0 })
                      .valueOf() // 5 PM for right edge
                  : item.end,
            }
          : item,
      ),
    );
    // console.log("Resized", itemId, time, edge);
  };

  const handleDelete = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
    // console.log(`Deleted item with id: ${id}`);
    setSelectedItem(null);
  };

  const handleItemEditClick = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    setSelectedItem(item);
  };

  const handleItemUpdate = (updatedItem) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item,
      );
      setSelectedItem(null);
      return updatedItems;
    });
  };
  const addItemHandler = ({
    taskProject,
    member,
    start,
    end,
    hoursDays,
    totalHours,
    notes,
  }) => {
    const newItem = {
      id:
        1 + items.reduce((max, value) => (value.id > max ? value.id : max), 0),
      group: member,
      title: taskProject,
      start: moment(start)
        .startOf("day")
        .set({ hour: 9, minute: 0, second: 0 }), // 9 AM for the start
      end: moment(end).endOf("day").set({ hour: 17, minute: 0, second: 0 }), // 5 PM for the end
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };
  const handlePrev = () => {
    const duration = visibleTimeEnd - visibleTimeStart;
    setVisibleTimeStart(visibleTimeStart - duration);
    setVisibleTimeEnd(visibleTimeEnd - duration);
  };

  const handleNext = () => {
    const duration = visibleTimeEnd - visibleTimeStart;
    setVisibleTimeStart(visibleTimeStart + duration);
    setVisibleTimeEnd(visibleTimeEnd + duration);
  };

  const handleToday = () => {
    const startOfToday = moment().startOf("day").valueOf();
    // const endOfToday = moment().endOf("day").valueOf();
    setVisibleTimeStart(startOfToday);
    setVisibleTimeEnd(startOfToday + (visibleTimeEnd - visibleTimeStart));
  };

  const handleCanvas = (groupId, time) => {
    // console.log(time);
    setOpen(true);
  };
  const handleEventResize = (info) => {
    const updatedEvents = [...events];
    const eventIndex = updatedEvents.findIndex(
      (event) => event.title === info.event.title,
    );
    if (eventIndex !== -1) {
      updatedEvents[eventIndex] = {
        ...updatedEvents[eventIndex],
        end: info.event.end,
      };
      setEvents(updatedEvents);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-[#DCD6FF] bg-[#F8F7FC] px-4 py-4">
        <div className="flex items-center gap-[13px]">
          <div className="flex items-center">
            <button
              onClick={handlePrev}
              className="group flex h-8 w-8 items-center justify-center rounded-s border border-[#DCD6FF] bg-white hover:bg-[#806BFF]"
            >
              <img
                src={
                  config.PUBLIC_URL + "/assets/images/amdital/left_arrow.svg"
                }
                alt="Previous"
                className=" rotate-90 group-hover:hidden"
              />
              <img
                src={
                  config.PUBLIC_URL +
                  "/assets/images/amdital/left_arrow_white_color.svg"
                }
                alt="Previous"
                className=" hidden rotate-90 group-hover:block"
              />
            </button>
            <button
              onClick={handleNext}
              className="group flex h-8 w-8 items-center justify-center rounded-e border border-l-0 border-[#DCD6FF] bg-white hover:bg-[#806BFF]"
            >
              <img
                src={
                  config.PUBLIC_URL + "/assets/images/amdital/right_arrow.svg"
                }
                alt="Next"
                className=" group-hover:hidden "
              />
              <img
                src={
                  config.PUBLIC_URL +
                  "/assets/images/amdital/left_arrow_white_color.svg"
                }
                alt="Previous"
                className=" hidden -rotate-90 group-hover:block "
              />
            </button>
          </div>

          <button
            onClick={handleToday}
            className="from-font decoration-none h-[32px] rounded border border-[#DCD6FF] bg-white px-4 py-1 text-left text-sm font-semibold leading-4 tracking-wide text-[#260B6A] hover:bg-[#806BFF] hover:text-[#FFFFFF]"
          >
            Today
          </button>
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
              setOpen(true);
            }}
            className="decoration-skip-ink-none flex h-[32px] items-center justify-center gap-[10px] rounded bg-[#FF845C]  px-4 text-center text-[14px] font-[600] leading-[16px] tracking-[0.05em] text-white hover:bg-[#F36A3D]"
          >
            Create Assignment
          </button>
        </div>
      </div>
      <div className="resource-planner mt-4">
        <Timeline
          keys={keys}
          groups={groups}
          items={items}
          sidebarContent={"Member"}
          lineHeight={70}
          // itemRenderer={itemRender}
          groupRenderer={groupRender}
          sidebarWidth={300}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          onCanvasClick={handleCanvas}
          fullUpdate
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          showCursorLine
          canMove={true}
          canResize={"both"}
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          onItemClick={handleItemEditClick}
        />
        {/* <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          editable={true}
          droppable={true}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
        /> */}
      </div>
      {selectedItem && (
        <div className="fixed left-0 top-0 z-[1100] flex h-full w-full items-center justify-center ">
          <div className=" z-[1100]  mt-10 h-fit rounded-lg ">
            <EditItemForm
              item={selectedItem}
              onUpdate={handleItemUpdate}
              onCancel={() => setSelectedItem(null)}
              onDelete={handleDelete}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
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
              onAddItem={addItemHandler}
              open={open}
              setOpen={setOpen}
            />
          </div>
          {open && (
            <div
              className="fixed inset-0 z-[1000] cursor-pointer bg-[#150C2CB2] "
              onClick={() => setOpen(false)}
            ></div>
          )}
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
