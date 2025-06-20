import React, { useEffect, useState } from "react";



export const SecondsConvertToTimeNavbar = ({ seconds,blinkCondition }) => {

  

    // const [blink, setBlink] = useState(true);

    // useEffect(() => {
    //   if (seconds > 0) {
    //     const interval = setInterval(() => {
    //       setBlink((prev) => !prev); 
    //     }, 500); 
    //     return () => clearInterval(interval); 
    //   } else {
    //     setBlink(false); 
    //   }
    // }, [seconds]);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
  
    const hoursFormate = hours.toString().padStart(2, "0");
    const minutesFormate = minutes.toString().padStart(2, "0");
    const formattedSeconds =secs.toString().padStart(2, "0");

    return <div className=" flex gap-0.5 ">
                <span>{hoursFormate}</span>
                    {blinkCondition ? (
                      <span className="w-1 blink">:</span>
                    ) : (
                      <span className="w-1">:</span>
                    )}
                <span>{minutesFormate}</span>
                {/* <span>{formattedSeconds}</span> */}

            </div>;
};
