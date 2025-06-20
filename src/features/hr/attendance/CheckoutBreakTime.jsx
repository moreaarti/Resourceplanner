import React, { useEffect, useState } from 'react'
import { SecondsConvertToTimeNavbar } from '../../../components/elements/amdital/SecondsConvertToTimeNavbar';
import { useSelector } from 'react-redux';
import { SecondsToHoursNavbar } from '../../../components/elements/amdital/SecondsToHoursNavbar';



export default function CheckoutBreakTime() {
   
  const attendance =  useSelector(state=>state?.general);
  
  const attendance_data = attendance?.attendance_data?.length > 0 ? attendance?.attendance_data?.filter((item,index,arr)=>{
    if(index === arr?.length -1){
      return item
    }
  })?.[0] : {};

const attendance_last_activity = attendance_data?.last_activity_type;

  const total_break = attendance_data?.total_break*60;

  const break_logs = attendance_data?.break_logs?.length > 0 ? attendance_data?.break_logs.filter(item => item?.break_end_time === null).map(item=>item)?.[0] : null;

  const lost_break_log = break_logs?.break_start_time

  
  const calculateTimeDifference = (currentDate, checkinDate) => {
      const timeDifferenceInSeconds = Math.floor((currentDate - checkinDate) / 1000);
      return timeDifferenceInSeconds;
    };
  
    const [breakTimeSecond, setBreakTimeSecond] = useState(0);
  
    useEffect(() => {
      let intervalId;
      if (attendance_last_activity === 'check_in' || attendance_last_activity === 'break_end') {
          setBreakTimeSecond(total_break);
      }
      if (attendance_last_activity === 'break_start') {

        const lost_break_date = lost_break_log ? new Date(lost_break_log) : null;

        if (lost_break_date) {
          intervalId = setInterval(() => {
            const current_date = new Date();
            const breakSeconds = calculateTimeDifference(current_date, lost_break_date);
            const total_seconds =  breakSeconds + total_break
            setBreakTimeSecond(total_seconds);
          }, 1000);
        }
        }
      return () => {
        clearInterval(intervalId);
      };
    }, [attendance_last_activity, attendance_data]);

    return (
      <>
        <SecondsToHoursNavbar  seconds={breakTimeSecond} />
      </>
    );
}
