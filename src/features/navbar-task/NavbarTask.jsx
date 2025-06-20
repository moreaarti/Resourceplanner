import React from 'react'

export default function NavbarTask() {
  return (
    <div>NavbarTask</div>
  )
}


// import React, { useEffect, useRef, useState } from 'react';
// import config from '../../config/config';
// import { SecondsToTime } from '../project/SecondsToTime';
// import { useSelector, useDispatch } from 'react-redux';
// // import { togglePopupTimer, updateTaskData, updateTimer } from '../project/projectSingleView/task/taskSlice';
// import useGroupedTasks from './useGroupedTasks';
// // import { DisplayTime } from '../project/DisplayTime';
// import formatDateWithDayLabel from './formatDateWithDayLabel';
// import TaskNavbarTooltip from './TaskNavbarTooltip';

// const NavbarTask = (props) => {

//   const tasks = useSelector((state) => state.task.task_data);

//   const timer_redux = useSelector((state) => state?.task?.timer);

//   const [selectedValue,setSelectedValue] = useState(null)

//   const temp_array = timer_redux?.timer_id === null ? 0 : tasks?.filter( (item)=>{

//                                     if(item?.tasK_id === timer_redux?.timer_id ){
//                                      return item; 
//                                     }

//                                 });

//   const temp_add_time = temp_array === 0 ? 0 : temp_array.map(item=>item?.task_time)?.[0]

//   const temp_timer_data = temp_array === 0 ? [] : temp_array[0];

//   const groupedTasks = useGroupedTasks();

//   const allWeeks = groupedTasks;

//   const dispatch = useDispatch();

//   const completedHoursRef = useRef(0);
//   const [intervalId, setIntervalId] = useState(null);


//   useEffect(() => {
//     // Sync ref with Redux state on mount
//     completedHoursRef.current = timer_redux?.completed_hours || 0;
//   }, [timer_redux?.completed_hours]);

//   const toggleTimer = () => {
//     dispatch(togglePopupTimer());
//   };

//   // const increment = (currentValue, incrementBy = 1) => currentValue + incrementBy;

//   const timerHandler = (e, row, timer_word) => {
//     if (row?.tasK_id !== timer_redux?.timer_id) {
//       dispatch(
//         updateTaskData({
//           taskId: timer_redux?.timer_id,
//           completedHours: completedHoursRef.current,
//         })
//       );
//     }

//     if (timer_word === 'starting') {
//       dispatch(updateTimer({ field: 'timer_id', value: row?.tasK_id }));
//       dispatch(updateTimer({ field: 'timer_task', value: true }));
//       dispatch(updateTimer({ field: 'completed_hours', value: 0 }));

//       const id = setInterval(() => {
//         completedHoursRef.current += 1;
//         dispatch(updateTimer({ field: 'completed_hours', value: completedHoursRef.current }));
//       }, 1000);

//       setIntervalId(id);
//     }

//     if (timer_word === 'stoping') {
//       if (timer_redux.timer_task && timer_redux.timer_id === row?.tasK_id) {
//         dispatch(
//           updateTaskData({
//             taskId: row?.tasK_id,
//             completedHours: completedHoursRef.current,
//           })
//         );

//         clearInterval(intervalId);
//         setIntervalId(null);

//         dispatch(updateTimer({ field: 'timer_id', value: null }));
//         dispatch(updateTimer({ field: 'timer_task', value: false }));
//         dispatch(updateTimer({ field: 'completed_hours', value: 0 }));
//       }
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [intervalId]);

//   const task_data = allWeeks?.map((item, index, arr) => (
//     <div
//       key={index}
//       className={`flex py-4 flex-col min-h-[59px] relative border-[#E1DCFF] ${
//         index === arr?.length - 1 ? '' : 'border-b'
//       }`}
//     >
//       <div className="flex items-center gap-[15px]">
//         <img onClick={()=>{setSelectedValue( selectedValue === item?.weekRange ? null : item?.weekRange )}} src={config.PUBLIC_URL + '/assets/images/amdital/right_arrow_blue_color.svg'} alt="" className=' cursor-pointer ' />
//         <div className="text-[#26212E] text-base font-semibold leading-5">{item?.weekRange}</div>
//           <TaskNavbarTooltip  data={item} />
//         <div className="text-sm leading-4 font-semibold text-[#26212E]">
//           <DisplayTime seconds={item?.completed_hours || 18000} />
//         </div>
//       </div>
//       { selectedValue === item?.weekRange &&<div>
//         {Object.entries(item.tasks).map(([day, childData]) => (
//           <div key={day}>
//             <div className="bg-[#EEEBFF] w-full h-[46px] mt-[15px] rounded flex items-center px-5 py-[10px] gap-5">
//               <div className="border border-[#806BFF] w-fit h-[26px] rounded-full bg-[#FFFFFF] px-[15px] py-[5px] flex items-center justify-center text-[#26212E] text-sm font-semibold leading-4">
//                 <DisplayTime seconds={childData?.total_task_time || 18000} />
//               </div>
//               <div className="text-sm font-normal leading-4 text-[#26212E]">{formatDateWithDayLabel(day)}</div>
//             </div>
//             <div>
//               {childData?.tasks?.map((subChild) => (
//                 <div key={subChild?.tasK_id} className="flex justify-between pt-[15px] pl-[46px] pr-[5px] group">
//                   <div className="flex items-center gap-5">
//                     <div className="text-sm font-normal leading-4 text-[#26212E]">
//                       <DisplayTime seconds={subChild?.task_time} />
//                     </div>
//                     <div className="w-[7px] h-[7px] rounded-full bg-[#00B656]"></div>
//                     <div className="flex flex-col gap-[5px]">
//                       <div className="text-sm leading-4 font-normal text-[#26212E]">{subChild?.task_name}</div>
//                       <div className="text-xs text-[#9F9F9F] leading-3 font-normal">{subChild?.project_name}</div>
//                     </div>
//                   </div>
//                   <div>
//                     {timer_redux?.timer_task && subChild?.tasK_id === timer_redux?.timer_id ? (
//                       <div
//                         onClick={(e) => timerHandler(e, subChild, 'stoping')}
//                         className="bg-[#FF0000] w-[22px] h-[22px] rounded-full flex justify-center items-center"
//                       >
//                         <img src={config.PUBLIC_URL + '/assets/images/amdital/pause _icon.svg'} alt="" />
//                       </div>
//                     ) : (
//                       <div
//                         className="hidden group-hover:block cursor-pointer"
//                         onClick={(e) => timerHandler(e, subChild, 'starting')}
//                       >
//                         <div className="w-[118px] h-8 rounded bg-[#00B656] flex justify-center items-center gap-[10px]">
//                           <img src={config.PUBLIC_URL + '/assets/images/amdital/play_icon.svg'} alt="" />
//                           <div className="text-sm font-semibold leading-4 text-[#FFFFFF]">Start Time</div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>}
//     </div>
//   ));

//   return (
//     <div className="relative h-full">
//       <div
//         className={`absolute w-4 h-4 bg-white border-t border-l border-[#E1DCFF] transform rotate-45 top-[-7px]`}
//         style={{
//           left: '66%',
//         }}
//       />
//       <div className="relative bg-white z-10 min-w-[750px] max-w-[750px] h-full overflow-scroll">
//         <div className="w-full h-full px-[30px] py-6">
//           <div className="flex justify-between items-center">
//             <div className="text-lg font-semibold leading-5 text-[#FF845C]">Task</div>
//             <img
//               onClick={toggleTimer}
//               className="cursor-pointer"
//               src={config.PUBLIC_URL + '/assets/images/amdital/cross_close_icon.svg'}
//               alt="close"
//             />
//           </div>
//           <div className="border border-[#E1DCFF] w-full h-[50px] rounded-lg mt-6 flex">
//             <input
//               className="input-with-icon p-[9px] w-full outline-none rounded-lg font-normal text-sm leading-4 placeholder:text-[#74689280]"
//               placeholder="Type to Find Task"
//             />
//             <div
//               onClick={(e) => timerHandler(e, temp_timer_data, 'stoping')}
//               className={`m-[9px] w-[111.78px] h-8 rounded ${
//                 timer_redux?.timer_task ? 'bg-[#FF0000] cursor-pointer' : 'bg-[#FFCFCD]'
//               } flex justify-between py-2 px-4 items-center gap-2 text-sm font-semibold leading-4 text-[#FFFFFF]`}
//             >
//               {timer_redux?.timer_task ? (
//                 <img src={config.PUBLIC_URL + '/assets/images/amdital/pause _icon.svg'} alt="" />
//               ) : (
//                 <img src={config.PUBLIC_URL + '/assets/images/amdital/play_icon.svg'} alt="" />
//               )}
//               <SecondsToTime seconds={temp_add_time+ timer_redux?.completed_hours} />
//             </div>
//           </div>
//           <div className="mt-1">{task_data}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavbarTask;
