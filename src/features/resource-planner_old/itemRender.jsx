import "./ripple.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import config from "../../config/config";
import moment from "moment";

const ItemRender = ({ item }) => {
  console.log("item", item);
  let mytask = item.task;
  console.log("mytask", mytask);
  let backgroundColor = item.selected
    ? item.dragging
      ? "red"
      : item.selectedBgColor
    : item.bgColor;

  const borderColor = item.resizing ? "red" : item.color;

  // Calculate working hours dynamically
  const workingHours = calculateWorkingHours(
    new Date(item.start),
    new Date(item.end),
    item,
  );
  const progress = calculateProgress(new Date(item.start), new Date(item.end));
  const progressBarWidth = `${progress}%`;
  const calculateDurationDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate time difference in ms
    const timeDiff = end - start;

    // Convert ms to days
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end day

    return daysDiff;
  };

  const durationDays = calculateDurationDays(item.start, item.end);

  return (
    <>
      <div
        data-tooltip-id={`tooltip-${item.id}`}
        style={{
          backgroundColor,
          color: item.color,
          borderColor,
          borderRadius: 4,
          position: "relative",
          border: "none",
        }}
      >
        {item.className === "full" && (
          <div
            className={`ripple text-[#00B656]`}
            style={{
              top: "50%",
              right: "0",
              height: "55px",
              display: "flex",
              background:
                item.assignment_type === "leave" ? "#F7908B" : "#CAF1DC",
              borderRadius: "100px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Full
          </div>
        )}

        {/* <div
          className={`${
            item.className === "full"
              ? "border-2 border-[#00B656] bg-white text-[#00B656]"
              : "border-2 border-[#260B6A] bg-[#806BFF] text-white"
          }`}
          style={{
            position: "absolute",
            top: "0",
            right: "0%",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "100%",
            width: "55px",
            height: "55px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {workingHours}
        </div> */}

        {item.assignment_type !== "leave" && (
          <div
            className={`${
              item.className === "full"
                ? "border-2 border-[#00B656] bg-white text-[#00B656]"
                : "border-2 border-[#260B6A] bg-[#806BFF] text-white"
            }`}
            style={{
              position: "absolute",
              top: "0",
              right: "0%",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "100%",
              width: "55px",
              height: "55px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {workingHours}
          </div>
        )}

        {/* {item.className !== "full" && (
          <div
            style={{
              top: "50%",
              left: "20px",
              right: "0",
              height: "55px",
              display: "flex",
              background:
                item.assignment_type === "leave" ? "#F7908B" : "#E1DCFF",
              borderRadius: "100px",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 20px", // Add horizontal padding for spacing
              whiteSpace: "nowrap", // Prevent text wrap
            }}
          >
            <span
              style={{
                fontWeight: 600,
                display: "inline-flex",
                gap: "6px",
                alignItems: "center",
              }}
            >
              {item.task || "Untitled"}
              {item.assignment_type !== "leave" && (
                <span style={{ color: "#1E40AF", fontWeight: 600 }}>
                  {item.total_tracked_time}m of {workingHours}h
                </span>
              )}
            </span>

            <div
              style={{
                width: progressBarWidth,
                height: "10px",
                borderStartStartRadius: "100px",
                borderBottomLeftRadius: "100px",
                // backgroundColor: "#6366F1", // Optional: add color for visibility
              }}
            />
          </div>
        )} */}
        {item.className !== "full" && (
          <div
            style={{
              top: "50%",
              left: "20px",
              right: "0",
              height: "55px",
              display: "flex",
              background:
                item.assignment_type === "leave" ? "#F7908B" : "#E1DCFF",
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
              <span>
                {(() => {
                  const startDate = new Date(item.start);
                  const endDate = new Date(item.end);
                  const timeDiff = endDate.getTime() - startDate.getTime();
                  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                  const words = (item.task || "Untitled").split(" ");
                  const limitedText = words.slice(0, 3).join(" ");
                  return daysDiff < 4 ? `${limitedText}...` : limitedText;
                })()}
              </span>

              {item.assignment_type !== "leave" && (
                <span style={{ color: "#1E40AF", fontWeight: 600 }}>
                  {item.total_tracked_time}m of {workingHours}h
                </span>
              )}
            </span>

            <div
              style={{
                width: progressBarWidth,
                height: "10px",
                borderStartStartRadius: "100px",
                borderBottomLeftRadius: "100px",
              }}
            />
          </div>
        )}
      </div>

      <Tooltip
        id={`tooltip-${item.id}`}
        style={{ backgroundColor: "#000", color: "#fff", zIndex: 1100 }}
      >
        <div className="px-5 py-3">
          <div className="flex items-center gap-[10px] border-b-2 border-white pb-2">
            <img
              src={`${config.PUBLIC_URL}/assets/images/amdital/timesheet/lock_icon.svg`}
              alt=""
            />
            <p className="text-start text-[11px] font-semibold leading-4">
              You can’t edit time off <br /> (Only admin can edit)
            </p>
          </div>

          <div className="mt-1">
            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold leading-4">Member :</p>
              <p className="text-start text-[11px] font-normal leading-4">
                {item.task || "Task name"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold leading-4">
                Task Name :{mytask}
              </p>
              {/* <p className="text-start text-[18px] font-normal leading-4 text-white">
                {item.task || "Untitled"}
              </p> */}
            </div>

            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold leading-4">
                Assignment Type :
              </p>
              <p className="text-[11px] font-normal leading-4">
                {item.assignment_type}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold leading-4">Period :</p>
              <p className="text-[11px] font-normal leading-4">
                {moment(item.start).format("DD MMM YYYY")} to{" "}
                {moment(item.end).format("DD MMM YYYY")}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold leading-4">Duration :</p>
              <p className="text-[11px] font-normal leading-4">
                {durationDays}D (8h per day)
              </p>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold leading-4">
                Created By :
              </p>
              <p className="text-[11px] font-normal leading-4">Dinesh Jain</p>
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
  const totalDuration = endTime - startTime;
  const elapsedTime = now - startTime;
  const progress = (elapsedTime / totalDuration) * 100;
  return Math.min(Math.max(progress, 0), 100);
};

const calculateWorkingHours = (startTime, endTime, item) => {
  if (endTime <= startTime) return "0";
  const msInDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((endTime - startTime) / msInDay) + 1;
  const workingHours = totalDays * 8; // ✅ every day = 8 hrs
  item.className = workingHours === 40 ? "full" : "";
  return workingHours.toString();
};

export default ItemRender;
