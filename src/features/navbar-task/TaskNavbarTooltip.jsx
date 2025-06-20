import React, { useState } from 'react';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import { SecondsToTime } from '../project/SecondsToTime';

export default function TaskNavbarTooltip(props) {

    const [daysWithHours,setDaysWithHours] = useState(
                                                     {
                                                        day_one:"Mon",
                                                        day_one_value:"-",
                                                        day_two:"Tue",
                                                        day_two_value:"-",
                                                        day_three:"Wed",
                                                        day_three_value:"-",
                                                        day_four:"Thu",
                                                        day_four_value:"-",
                                                        day_five:"Fri",
                                                        day_five_value:"-",
                                                      }
                                                    )
    
    // console.log("props",props)


    const tooltipData =""
  return (
            <>
                <div className=" flex gap-1 cursor-pointer "   data-tooltip-id="my-tooltip" >
                    {[1, 2, 3, 4, 5].map((_, idx) => (
                            <div key={idx} className="w-1 h-1 rounded-full bg-[#806BFF]"></div>
                    ))}
                </div>
                <Tooltip id="my-tooltip" style={{zIndex:1100}}>
                    <div className=' min-w-[200px] px-[15px] py-[9px] flex gap-[11px] justify-center ' >
                        <div className=' flex flex-col items-center gap-[5px]'>
                            <div className=' text-xs leading-4 font-normal text-[#9F9F9F] '>{daysWithHours?.day_one}</div>
                            <div className=' text-sm font-normal leading-4 text-[#FFFFFF] '>
                            {daysWithHours?.day_one_value === "-" ? daysWithHours?.day_one_value : <SecondsToTime seconds ={daysWithHours?.day_one_value}/>}
                            </div>
                        </div>
                        <div className=' flex flex-col items-center gap-[5px]'>
                            <div className=' text-xs leading-4 font-normal text-[#9F9F9F] '>{daysWithHours?.day_two}</div>
                            <div className=' text-sm font-normal leading-4 text-[#FFFFFF] '>{daysWithHours?.day_two_value}</div>
                        </div>
                        <div className=' flex flex-col items-center gap-[5px]'>
                            <div className=' text-xs leading-4 font-normal text-[#9F9F9F] '>{daysWithHours?.day_three}</div>
                            <div className=' text-sm font-normal leading-4 text-[#FFFFFF] '>{daysWithHours?.day_three_value}</div>
                        </div>
                        <div className=' flex flex-col items-center gap-[5px]'>
                            <div className=' text-xs leading-4 font-normal text-[#9F9F9F] '>{daysWithHours?.day_four}</div>
                            <div className=' text-sm font-normal leading-4 text-[#FFFFFF] '>{daysWithHours?.day_four_value}</div>
                        </div>
                        <div className=' flex flex-col items-center gap-[5px]'>
                            <div className=' text-xs leading-4 font-normal text-[#9F9F9F] '>{daysWithHours?.day_five}</div>
                            <div className=' text-sm font-normal leading-4 text-[#FFFFFF] '>{daysWithHours?.day_five_value}</div>
                        </div>
                    </div>
                </Tooltip>
            </>
  )
}
