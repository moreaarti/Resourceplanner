import "./ripple.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import config from "../../config/config";
import moment from "moment";
import { useEffect, useState } from "react";

const ItemRender = ({ item, events }) => {
  console.log("ItemRender received:", { item, events });

  // Ensure we have consistent data structure
  const eventData = {
    id: item.id,
    task: item.task || item.title || "Untitled",
    member: item.member || "Unknown Member",
    assignment_type: item.assignment_type || "task",
    leave_type: item.leave_type || item.LeaveType || "",
    total_tracked_time: item.total_tracked_time || "0",
    totalHours: item.totalHours || item.total_hours || 0,
    created_by: item.created_by || "Unknown",
    start: item.start,
    end: item.end || item.eventDetails?.end,
    ...item,
  };

  let backgroundColor = eventData.selected
    ? eventData.dragging
      ? "red"
      : eventData.selectedBgColor
    : eventData.bgColor;

  const borderColor = eventData.resizing ? "red" : eventData.color;

  // Calculate working hours dynamically
  const workingHours = calculateWorkingHours(
    new Date(eventData.start),
    new Date(eventData.end),
    eventData,
  );

  const progress = calculateProgress(
    new Date(eventData.start),
    new Date(eventData.end),
  );
  const progressBarWidth = `${progress}%`;

  const calculateDurationDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return Math.max(daysDiff, 1); // Minimum 1 day
  };

  const durationDays = calculateDurationDays(eventData.start, eventData.end);

  // Get display text based on assignment type and duration
  const getDisplayText = () => {
    if (eventData.assignment_type === "leave") {
      return eventData.leave_type || "Planned Leave";
    }

    const words = (eventData.task || "Untitled").split(" ");
    const limitedText = words.slice(0, durationDays < 4 ? 2 : 3).join(" ");
    return durationDays < 4 && words.length > 2
      ? `${limitedText}...`
      : limitedText;
  };

  // Format tracked time consistently
  const formatTrackedTime = (time) => {
    if (!time || time === "0") return "0";
    // Handle both hour and minute formats
    if (typeof time === "string" && time.includes("m")) {
      const minutes = parseInt(time.replace("m", ""));
      return (minutes / 60).toFixed(1);
    }
    return time.toString();
  };

  return (
    <>
      <div
        data-tooltip-id={`tooltip-${eventData.id}`}
        style={{
          backgroundColor,
          color: eventData.color,
          borderColor,
          borderRadius: 4,
          position: "relative",
          border: "none",
        }}
      >
        {/* Full week display (40 hours) */}
        {/* {eventData.className === "full" && ( */}
        <div
          // className={ripple text-[#00B656]}
          // className="ripple text-[#00B656]"
          style={{
            top: "50%",
            right: "0",
            height: "40px",
            display: "flex",
            flexDirection: "column",
            background:
              eventData.assignment_type === "leave" ? "#F7908B" : "#CFC7FF", //leave red and task blue
            borderRadius: "100px",
            justifyContent: "center",

            padding: "0 20px",
          }}
        >
          <span style={{ fontWeight: 600 }}>{getDisplayText()}</span>
          <p
            style={{
              color: "#1E40AF",
              fontWeight: 600,
              fontSize: "12px",
            }}
          >
            {" "}
            {formatTrackedTime(eventData.total_tracked_time)}m of {workingHours}
            h
          </p>
        </div>
        {/* // )} */}
        {/* not Full week display (xx hours) */}
        {/* {eventData.className !== "full" && (
          <div
            // className={ripple text-[#00B656]}
            style={{
              top: "50%",
              right: "0",
              height: "55px",
              display: "flex",
              background:
                eventData.assignment_type === "leave" ? "#F7908B" : "#CAF1DC",
              borderRadius: "100px",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 20px",
            }}
          >
            <span style={{ fontWeight: 600 }}>{getDisplayText()}</span>
          </div>
        )} */}
        {/* {eventData.className !== "full" && (
          <div
            className={`ripple text-[#CAF1DC]`}
            // className={`ripple bg-[#E1DCFF]`}
            style={{
              top: "50%",
              right: "0",
              height: "55px",
              display: "flex",
              background:
                eventData.assignment_type === "leave" ? "#F7908B" : "#CAF1DC",
              borderRadius: "100px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <span>
              {(() => {
                const startDate = new Date(item.start);
                const endDate = new Date(item.eventDetails.end);
                const timeDiff = endDate.getTime() - startDate.getTime();
                const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                console.log("daysDiff55", daysDiff);
                const words = (item.task || "Untitled").split(" ");
                const limitedText = words.slice(0, 2).join(" ");
                return daysDiff < 4 ? `${limitedText}...` : limitedText;
              })()}
              {daysDiff}
            </span>
            <p>
              {" "}
              {formatTrackedTime(eventData.total_tracked_time)}hiii of{" "}
              {workingHours}h
            </p>
          </div>
        )} */}
        {/* Hours badge - only show for non-leave items */}
        {/* {eventData.assignment_type !== "leave" && ( //1234 */}
        <div
          className={`${
            eventData.className === "full"
              ? "flext-col justify-center border-2  border-[#260B6A] bg-[#806BFF] text-[20px] text-white"
              : "border-2 border-[#260B6A] bg-[#806BFF] text-white"
          }`}
          style={{
            position: "absolute",
            top: "0",
            right: "0%",
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "100%",
            width: "34px",
            height: "34px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 0,
          }}
        >
          {workingHours}h
          {/* small div Progress bar for non-leave items do it letter
            {eventData.assignment_type !== "leave" && (
              <div
                style={{
                  width: progressBarWidth,
                  height: "10px",
                  borderStartStartRadius: "100px",
                  borderBottomLeftRadius: "100px",
                  backgroundColor: "#6366F1", 
                }}
              />
            )} */}
        </div>
        {/* )} */}
        {/* Partial week display */}
        {/* {eventData.assignment_type && eventData.className !== "full" && (
          <div
            style={{
              top: "50%",
              left: "20px",
              right: "0",
              height: "55px",
              display: "flex",
              background:
                eventData.assignment_type === "leave" ? "#F7908B" : "#E1DCFF",
              borderRadius: "100px",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 20px",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontWeight: 600,
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                alignItems: "flex-start",
              }}
            >
              <span>{getDisplayText()}</span>

              {eventData.assignment_type !== "leave" && (
                <span
                  style={{
                    color: "#1E40AF",
                    fontWeight: 600,
                    fontSize: "12px",
                  }}
                >
                  {formatTrackedTime(eventData.total_tracked_time)}h of{" "}
                  {workingHours}h
                </span>
              )}
            </span>
          </div>
        )} */}
      </div>

      <Tooltip
        id={`tooltip-${eventData.id}`}
        style={{ backgroundColor: "#000", color: "#fff", zIndex: 9999 }}
      >
        <div className="px-5 py-3">
          {/* Lock message for leave items */}
          {eventData.assignment_type === "leave" && (
            <div className="mb-2 flex items-center gap-[10px] border-b-2 border-white pb-2">
              <img
                src={`${config.PUBLIC_URL}/assets/images/amdital/timesheet/lock_icon.svg`}
                alt=""
              />
              <p className="text-start text-[11px] font-semibold leading-4">
                You can't edit time off <br /> (Only {eventData.created_by} can
                edit)
              </p>
            </div>
          )}
          <div className="mb-2 flex items-center gap-[10px] border-b-2 border-white pb-2">
            <img
              src={`${config.PUBLIC_URL}/assets/images/amdital/timesheet/lock_icon.svg`}
              alt=""
            />
            <p className="text-start text-[11px] font-semibold leading-4">
              You can't edit time off <br /> (Only {eventData.created_by} can
              edit)
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold leading-4">Member:</p>
              <p className="text-start text-[11px] font-normal leading-4">
                {eventData.member}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold leading-4">
                {eventData.assignment_type === "leave"
                  ? "Leave Type:"
                  : "Task Name:"}
              </p>
              <p className="text-start text-[11px] font-normal leading-4">
                {eventData.assignment_type === "leave"
                  ? eventData.leave_type || "Leave"
                  : eventData.task}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold leading-4">
                Assignment Type:
              </p>
              <p className="text-[11px] font-normal leading-4">
                {eventData.assignment_type}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold leading-4">Period:</p>
              <p className="text-[11px] font-normal leading-4">
                {moment(eventData.start).format("DD MMM YYYY")} to{" "}
                {moment(eventData.end).format("DD MMM YYYY")}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold leading-4">Duration:</p>
              <p className="text-[11px] font-normal leading-4">
                {durationDays}D ({workingHours}h total)
              </p>
            </div>

            {eventData.assignment_type !== "leave" && (
              <div className="flex items-center gap-1">
                <p className="text-[11px] font-semibold leading-4">Progress:</p>
                <p className="text-[11px] font-normal leading-4">
                  {formatTrackedTime(eventData.total_tracked_time)}h /{" "}
                  {workingHours}h
                </p>
              </div>
            )}

            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold leading-4">Created By:</p>
              <p className="text-[11px] font-normal leading-4">
                {eventData.created_by}
              </p>
            </div>
          </div>
        </div>
      </Tooltip>
    </>
  );
};

// ✅ Calculation logic
const calculateProgress = (startTime, endTime) => {
  const now = new Date();

  if (now < startTime) return 0; // Task hasn't started
  if (now > endTime) return 100; // Task is complete

  const totalDuration = endTime - startTime;
  const elapsedTime = now - startTime;
  const progress = (elapsedTime / totalDuration) * 100;
  return Math.min(Math.max(progress, 0), 100);
};

const calculateWorkingHours = (startTime, endTime, item) => {
  if (!startTime || !endTime || endTime <= startTime) return "0";

  const msInDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((endTime - startTime) / msInDay) + 1;
  const workingHours = totalDays * 8; // ✅ every day = 8 hrs

  // Set className based on full week (40 hours)
  if (item) {
    item.className = workingHours >= 40 ? "full" : "";
  }

  return workingHours.toString();
};

export default ItemRender;

// import "./ripple.css";
// import { Tooltip } from "react-tooltip";
// import "react-tooltip/dist/react-tooltip.css";
// import config from "../../config/config";
// import moment from "moment";
// import { useEffect, useState } from "react";

// const ItemRender = ({ item, events }) => {
//   // console.log("item", item, "events", events, "item.task", item.task);

//   const [extnedOneDay, setExtnedOneDay] = useState();

//   let backgroundColor = item.selected
//     ? item.dragging
//       ? "red"
//       : item.selectedBgColor
//     : item.bgColor;

//   const borderColor = item.resizing ? "red" : item.color;

//   // Calculate working hours dynamically
//   const workingHours = calculateWorkingHours(
//     new Date(item.start),
//     new Date(item.eventDetails.end),
//     item,
//   );

//   let newWorkingFours = parseInt(workingHours) - 8;

//   const progress = calculateProgress(
//     new Date(item.start),
//     new Date(item.eventDetails.end),
//   );
//   const progressBarWidth = `${progress}%`;
//   const calculateDurationDays = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     // const timeDiff = end - start;

//     // Convert ms to days
//     // const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end day
//     const timeDiff = end.getTime() - start.getTime();
//     const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
//     console.log("daysDiff", daysDiff);
//     return daysDiff;
//   };
//   const endDate = item.eventDetails?.end; // || item.end || new Date()
//   const durationDays = calculateDurationDays(item.start, endDate);
//   console.log("durationDays", durationDays);
//   return (
//     <>
//       <div
//         data-tooltip-id={`tooltip-${item.id}`}
//         style={{
//           backgroundColor,
//           color: item.color,
//           borderColor,
//           borderRadius: 4,
//           position: "relative",
//           border: "none",
//         }}
//       >
// {item.className === "full" && (
//   <div
//     className={`ripple text-[#00B656]`}
//     style={{
//       top: "50%",
//       right: "0",
//       height: "55px",
//       display: "flex",
//       background:
//         item.assignment_type === "leave" ? "#F7908B" : "#CAF1DC",
//       borderRadius: "100px",
//       justifyContent: "center",
//       alignItems: "center",
//     }}
//   >
//     {" "}
//     <span>
//       {(() => {
//         const startDate = new Date(item.start);
//         const endDate = new Date(item.eventDetails.end);
//         const timeDiff = endDate.getTime() - startDate.getTime();
//         const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//         console.log("daysDiff55", daysDiff);
//         const words = (item.task || "Untitled").split(" ");
//         const limitedText = words.slice(0, 2).join(" ");
//         return daysDiff < 4 ? `${limitedText}...` : limitedText;
//       })()}
//       {/* {daysDiff} */}
//     </span>
//   </div>
// )}
//         {/* {item.className === "full" && (
//           <div
//             className={`ripple text-[#00B656]`}
//             style={{
//               top: "50%",
//               right: "0",
//               height: "55px",
//               display: "flex",
//               background:
//                 item.assignment_type === "leave" ? "#F7908B" : "#CAF1DC",
//               borderRadius: "100px",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             {item.assignment_type === "leave" ? LeaveType : item.task}
//           </div>
//         )} */}
//         {/* ////////////////////////////////////////// */}

//         {/* <div
//           className={`${
//             item.className === "full"
//               ? "border-2 border-[#00B656] bg-white text-[#00B656]"
//               : "border-2 border-[#260B6A] bg-[#806BFF] text-white"
//           }`}
//           style={{
//             position: "absolute",
//             top: "0",
//             right: "0%",
//             fontSize: "16px",
//             fontWeight: "bold",
//             borderRadius: "100%",
//             width: "55px",
//             height: "55px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {workingHours}
//         </div> */}

//         {item.assignment_type !== "leave" && (
//           <div
//             className={`${
//               item.className === "full"
//                 ? "border-2 border-[#00B656] bg-white text-[#00B656]"
//                 : "border-2 border-[#260B6A] bg-[#806BFF] text-white"
//             }`}
//             style={{
//               position: "absolute",
//               top: "0",
//               right: "0%",
//               fontSize: "16px",
//               fontWeight: "bold",
//               borderRadius: "100%",
//               width: "55px",
//               height: "55px",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             {newWorkingFours}h
//           </div>
//         )}

//         {item.assignment_type && item.className !== "full" && (
//           <div
//             style={{
//               top: "50%",
//               left: "20px",
//               right: "0",
//               height: "55px",
//               display: "flex",
//               background:
//                 item.assignment_type === "leave" ? "#F7908B" : "#E1DCFF",
//               borderRadius: "100px",
//               justifyContent: "space-between",
//               alignItems: "center",
//               padding: "0 20px",
//               whiteSpace: "nowrap",
//             }}
//           >
//             <span
//               style={{
//                 fontWeight: 600,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "2px",
//                 alignItems: "flex-start",
//               }}
//             >
//               {/* <span>
//                 {(() => {
//                   const startDate = new Date(item.start);
//                   const endDate = new Date(item.end);
//                   const timeDiff = endDate.getTime() - startDate.getTime();
//                   const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

//                   const words = (item.task || "Untitled").split(" ");
//                   const limitedText = words.slice(0, 3).join(" ");
//                   return daysDiff < 4 ? `${limitedText}...` : limitedText;
//                 })()}

//               </span> */}
//               {item.assignment_type === "leave" ? "Planned Leave" : item.task}

//               {item.assignment_type !== "leave" && (
//                 <span style={{ color: "#1E40AF", fontWeight: 600 }}>
//                   {item.total_tracked_time}h of {workingHours}h
//                 </span>
//               )}
//             </span>

//             <div
//               style={{
//                 width: progressBarWidth,
//                 height: "10px",
//                 borderStartStartRadius: "100px",
//                 borderBottomLeftRadius: "100px",
//               }}
//             />
//           </div>
//         )}
//       </div>

//       <Tooltip
//         id={`tooltip-${item.id}`}
//         style={{ backgroundColor: "#000", color: "#fff", zIndex: 1100 }}
//       >
//         <div className="px-5 py-3">
//           <div className="flex items-center gap-[10px] border-b-2 border-white pb-2">
//             <img
//               src={`${config.PUBLIC_URL}/assets/images/amdital/timesheet/lock_icon.svg`}
//               alt=""
//             />
//             <p className="text-start text-[11px] font-semibold leading-4">
//               You can’t edit time off <br /> (Only {item.created_by} can edit)
//             </p>
//           </div>

//           <div className="mt-1">
//             <div className="flex items-center gap-1">
//               <p className="text-[11px] font-semibold leading-4">Member :</p>
//               <p className="text-start text-[11px] font-normal leading-4">
//                 {item.task || "Task name"}
//               </p>
//             </div>
//             <div className="flex items-center gap-1">
//               <p className="text-[11px] font-semibold leading-4">
//                 Task Name :{item.task}
//               </p>
//               {/* <p className="text-start text-[18px] font-normal leading-4 text-white">
//                 {item.task || "Untitled"}
//               </p> */}
//             </div>

//             <div className="flex items-center gap-1">
//               <p className="text-[11px] font-semibold leading-4">
//                 Assignment Type :
//               </p>
//               <p className="text-[11px] font-normal leading-4">
//                 {item.assignment_type}
//               </p>
//             </div>

//             <div className="flex items-center gap-1">
//               <p className="text-[11px] font-semibold leading-4">Period :</p>
//               <p className="text-[11px] font-normal leading-4">
//                 {moment(item.start).format("DD MMM YYYY")} to{" "}
//                 {/* {moment(item.end).format("DD MMM YYYY")} */}
//                 {moment(item.eventDetails.end).format("DD MMM YYYY")}
//               </p>
//             </div>

//             <div className="flex items-center gap-1">
//               {/* <p className="text-[11px] font-semibold leading-4">Duration :</p>
//               <p className="text-[11px] font-normal leading-4">
//                 {durationDays}D (8h per day)
//               </p> */}
//               <span> {durationDays}D (8h per day)</span>
//             </div>

//             <div className="flex items-center gap-1">
//               <p className="text-[11px] font-semibold leading-4">
//                 Created By : {item.created_by}
//               </p>
//               {/* <p className="text-[11px] font-normal leading-4">
//                 {item.created_by}
//               </p> */}
//             </div>
//           </div>
//         </div>
//       </Tooltip>
//     </>
//   );
// };

// // ✅ Calculation logic
// const calculateProgress = (startTime, endTime) => {
//   const now = new Date();

//   const totalDuration = endTime - startTime;
//   const elapsedTime = now - startTime;
//   const progress = (elapsedTime / totalDuration) * 100;
//   return Math.min(Math.max(progress, 0), 100);
// };

// const calculateWorkingHours = (startTime, endTime, item) => {
//   if (endTime <= startTime) return "0";
//   const msInDay = 1000 * 60 * 60 * 24;
//   let totalDays = Math.floor((endTime - startTime) / msInDay);
//   // totalDays = totalDays + 1; //changed to corect div

//   const workingHours = totalDays * 8; // ✅ every day = 8 hrs
//   item.className = workingHours === 40 ? "full" : "";
//   return workingHours.toString();
// };
// // const calculateWorkingDaysfordiv = (startTime, endTime, item) => {
// //   if (endTime <= startTime) return "0";
// //   const msInDay = 1000 * 60 * 60 * 24;
// //   let totalDays = Math.floor((endTime - startTime) / msInDay);
// //   // totalDays = totalDays + 1; //changed to corect div

// //   const workingHours = totalDays * 8; // ✅ every day = 8 hrs
// //   item.className = workingHours === 40 ? "full" : "";
// //   return workingDays.toString();
// // };

// export default ItemRender;
