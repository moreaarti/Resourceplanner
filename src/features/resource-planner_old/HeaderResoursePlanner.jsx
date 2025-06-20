import moment from "moment";
import React from "react";

const HeaderResoursePlanner = ({ startDate, endDate }) => {
  const start = moment(startDate);

  // Show only the month of the startDate
  const currentMonth = start.format("MMMM YYYY");
  //   if (!startDate || !endDate) {
  //     return null; // wait for valid dates
  //   }
  // const start = moment(startDate).startOf("day");
  const end = moment(endDate).startOf("day");

  const dayCount = end.diff(start, "days") + 1;

  // Generate all dates for day row
  const days = Array.from({ length: dayCount }, (_, i) =>
    moment(start).add(i, "days"),
  );

  // Generate month-year spans
  const monthSpans = [];
  let current = moment(start);
  while (current.isSameOrBefore(end, "month")) {
    const monthStart = moment.max(current.clone().startOf("month"), start);
    const monthEnd = moment.min(current.clone().endOf("month"), end);
    const daysInMonth = monthEnd.diff(monthStart, "days") + 1;

    monthSpans.push({
      name: monthStart.format("MMMM YYYY"), // Shows both month and year
      days: daysInMonth,
    });

    current = current.clone().add(1, "month");
  }
  // console.log("monthSpans:", monthSpans);
  // console.log("StartDate:", startDate, "EndDate:", endDate);

  return (
    <>
      <div className="timeline-header mt-0 flex flex-col border-b-2 border-[#E1DCFF] bg-[#F8F7FC]">
        {/* Top Row: Month + Year Headers */}
        <div className="flex h-[32px] w-full">
          <div className="min-w-[200px] max-w-[280px] border-[#E1DCFF]" />
          <div className="flex flex-1">
            <div className="flex flex-1 items-center justify-center border-r border-[#E1DCFF] text-center text-base font-semibold text-[#26212E]">
              {currentMonth}
            </div>
          </div>
        </div>
      </div>
    </>
    // <>
    //   <div className="timeline-header mt-0 flex flex-col border-b-2 border-[#E1DCFF] bg-[#F8F7FC]">
    //     {/* Top Row: Month + Year Headers */}

    //     <div className="flex h-[32px] w-full">
    //       <div className="min-w-[200px] max-w-[280px] border-[#E1DCFF]" />
    //       <div className="flex flex-1">
    //         {monthSpans.map((month, index) => (
    //           <div
    //             key={index}
    //             className="flex items-center justify-center border-r border-[#E1DCFF] text-center text-base font-semibold text-[#26212E]"
    //             style={{ flex: month.days }}
    //           >
    //             {month.name}
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //     {/* Bottom Row: Day Headers */}
    //     {/* <div className="flex h-[31px] w-full">
    //       {days.map((date, i) => {
    //         const isToday = date.isSame(moment(), "day");
    //         return (
    //           <div
    //             key={i}
    //             className={`relative flex items-center justify-center text-center ${
    //               isToday
    //                 ? "text-sm font-semibold text-[#806BFF]"
    //                 : "text-sm font-normal text-[#26212E]"
    //             }`}
    //             style={{ flex: 1 }}
    //           >
    //             {date.format("ddd DD")}
    //             {isToday && (
    //               <div className="absolute bottom-[1px] left-0 right-0 h-[2px] bg-[#806BFF]"></div>
    //             )}
    //           </div>
    //         );
    //       })}
    //     </div> */}
    //   </div>
    // </>
  );
};

export default HeaderResoursePlanner;
