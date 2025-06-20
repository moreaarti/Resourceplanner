import React, { useEffect, useState } from 'react'
import EmployeeData from './EmployeeData';
import Cards from './Cards';
import Birthdays from './Birthdays';
import TimesheetDashboard from './TimesheetDashboard';
import TeamLeave from './TeamLeave';
import Attendance from './Attendance';
import DashBoardProject from './DashBoardProject';
import DashboardTask from './DashboardTask';
import Events from './Events';
import Appreciations from './Appreciations';
import MyActivity from './MyActivity';
import { useSelector } from 'react-redux';
import { use } from 'react';
import { getDashboardData } from './DashboardFunctions';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Dashboard() {

  const user_deatils = useSelector(store=>store?.auth?.api_call_company_details);
  const companyID = user_deatils?.companyId;


  const [showSkeleton, setShowSkeleton] = useState(true);
  const userDateRedux = useSelector((state) => state?.auth?.data?.user);
  const FirstName = userDateRedux?.firstName;
  const LastName = userDateRedux?.lastName;
  const empName = FirstName + " " + LastName;
  const reduxDashboardData = useSelector((state) => state?.dashboard);
    const card_details = [
                            {
                              label:"Tasks",
                              image:"/assets/images/amdital/dashboard_task.svg",
                              sub_label_one:"Total",
                              sub_label_two:"Inprogress",
                              sub_value_one:"07",
                              sub_value_two:"04"
                            },
                            {
                              label:"Projects",
                              image:"/assets/images/amdital/dashboard_project.svg",
                              sub_label_one:"Open",
                              sub_label_two:"Overdue",
                              sub_value_one:"06",
                              sub_value_two:"05"
                            }
                        ]
                       
useEffect(() => {
    window.scrollTo(0, 0);
    const month = new Date().getMonth() + 1;
    if (companyID) {
      fetchHandler(month, companyID);
    } else {
      setShowSkeleton(false);
    }
  }, [companyID]);                       
                                                
  const fetchHandler = async (month, companyID) => {
    setShowSkeleton(true);
    try {
      await getDashboardData(month, companyID);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setShowSkeleton(false);
    }
  };                     
                        

  const cards_data = card_details.map((card)=>{

    return <Cards card={card}/>
  })

  return (
   <>
      <div className='p-6'>
        {showSkeleton ?<Skeleton
            baseColor="#E0E0E0"
            highlightColor="#C8C8C8"
            width={"50%"}
            height={40}
                 />:<div className=' text-lg font-semibold leading-5 text-[#26212E]  capitalize '>Welcome, {empName}</div>}
        {/* first row  */}
        <div className=' flex flex-wrap lg:flex-nowrap gap-4 justify-between  mt-6'>
          {showSkeleton ?<Skeleton
            baseColor="#E0E0E0"
            highlightColor="#C8C8C8"
            width={300}
            height={120}
                 /> : <EmployeeData  />}
          {/* {cards_data} */}
        </div>
        {/*  second row */}
        <div className=' mt-4 flex gap-4 '>
          {showSkeleton ? <Skeleton
            baseColor="#E0E0E0"
            highlightColor="#C8C8C8"
            width={300}
            height={200}
                 /> :<Birthdays birthDayData={reduxDashboardData?.birth_day_data} />}
          {/* <TimesheetDashboard /> */}
        </div>

        {/* <div className=' mt-4 flex gap-4 '>
          <TeamLeave />
          <Attendance />
        </div> */}
        
        {/* <div className=' mt-4 flex gap-4 '>
          <DashBoardProject />
          <DashboardTask />
        </div>

        <div className=' mt-4 flex gap-4 '>
          <Events />
          <div className=' min-w-[340px] max-w-[340px] flex flex-col gap-6 '>
            <Appreciations/>
            <MyActivity/>
          </div>
        </div> */}



















      </div>
   </>
  )
}
