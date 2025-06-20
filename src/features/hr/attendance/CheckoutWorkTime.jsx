
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SecondsToHoursNavbar } from '../../../components/elements/amdital/SecondsToHoursNavbar';




export default function CheckoutWorkTime() {
    
  const attendance =  useSelector(state=>state?.general);
  
  const attendance_data = attendance?.attendance_data?.length > 0 ? attendance?.attendance_data?.filter((item,index,arr)=>{
    if(index === arr?.length -1){
      return item
    }
  })?.[0] : {};

const attendance_last_activity = attendance_data?.last_activity_type;

  const total_break = attendance_data?.total_break*60

  const calculateTimeDifference = (currentDate, checkinDate) => {
    const timeDifferenceInSeconds = Math.floor((currentDate - checkinDate) / 1000);
    return timeDifferenceInSeconds;
  };

  const [workingTimeSecond, setWorkingTimeSecond] = useState(0);

  useEffect(() => {
    let intervalId;
    if (attendance_last_activity === 'check_in' || attendance_last_activity === 'break_end') {
      const checkin_date = attendance_data?.check_in_time ? new Date(attendance_data.check_in_time) : null;
      if (checkin_date) {
        intervalId = setInterval(() => {
          const current_date = new Date();
          const checkinSeconds = calculateTimeDifference(current_date, checkin_date);
          const total_seconds = checkinSeconds - total_break
          setWorkingTimeSecond(total_seconds);
        }, 1000);
      }
    }
    if (attendance_last_activity === null || attendance_last_activity === 'break_start' || attendance_last_activity === undefined ) {
        const checkin_date = attendance_data?.check_in_time ? new Date(attendance_data.check_in_time) : null;
        const current_date = new Date();
        const checkinSeconds = calculateTimeDifference(current_date, checkin_date);
        const total_seconds = checkinSeconds - total_break
        setWorkingTimeSecond(total_seconds);
      }
    return () => {
      clearInterval(intervalId);
    };
  }, [attendance_last_activity, attendance_data]);

  return (
    <>
      <SecondsToHoursNavbar seconds={workingTimeSecond} />
    </>
  );
}

