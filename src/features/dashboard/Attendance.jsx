import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip";


const Attendance = () => {
  const data = [
    { name: "Office", value: 30, color: "#CAF1DC" },
    { name: "Leave", value: 10, color: "#F7908B" },
    { name: "Half Day", value: 10, color: "#FFD4C6" },
    { name: "Remote", value: 50, color: "#CBD7FF" },
  ];

  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0); // Calculate total



  return (
    <div className=" min-w-[336.59px] border rounded-lg bg-[#FFFFFF] border-[#E1DCFF] " >
      <div className=" flex items-center justify-between px-3 py-2 border-b border-[#DCD6FF] ">
        <div className=" font-semibold text-base  leading-5 ">Attendance</div>
        <select 
        className={ ` h-8 custom-select px-4 min-w-[126px] max-w-[126px] border border-[#DCD6FF] rounded bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] `} 
        >
           <option>Today</option>
<option>Yesterday</option>
<option>This Week</option>
<option>Last Week</option>
<option>Last 2 Weeks</option>
<option>Last 14 Days</option>
<option>This Month</option>
<option>Last Month</option>
<option>Last 30 Days</option>
        </select>
      </div>

      <div className="  w-full  min-h-[310px] flex justify-center items-center p-4  gap-5 ">
        <PieChart width={180} height={180} >
            <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={53}
            outerRadius={90}
            dataKey="value"
            id="tooltip"
            >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            </Pie>
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14px"
                fontWeight="normal"
                lineHeight="16px"
                fill="#26212E"
            >
            {`${totalValue}%`}
            </text>
            <Tooltip  content={<CustomTooltip />}/>
        </PieChart>
        <div className=" flex flex-col gap-4 " >
            {data.map((item, index) => (
             <div key={index} className=" flex items-center gap-2 " >
                <div style={{backgroundColor: item.color}} className={` w-[10px] h-[10px] rounded-full `}></div>
                <div className=" text-base font-normal leading-3 text-[#26212E] ">{item.name}</div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
