import { React,} from "react";
import { useDispatch,  } from "react-redux";

import { togglePopupMenuStatus } from "../../features/general/generalSlice";

import { NavLink,} from "react-router-dom";

import config from "../../config/config";
import { useSelector } from "react-redux";

const SubSidebar = (props) => {

  const showPopupMenu = useSelector((state) => state?.general?.showPopupMenu);
   
  const dispatch = useDispatch();

  const toggleMenu = () => {
    dispatch(togglePopupMenuStatus());
  };

  let sidebar_details = {
    menu_items: [
      {
        title:"Dashboard",
        path: `/dashboard`,
        src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_dashboard.svg",
        owner:true,
        manager:true,
        team_member:true,
        client:true
      },
      {
        title:"Chat",
        path: `/chats`,
        src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_chat.svg",
        owner:true,
        manager:true,
        team_member:true,
        client:true
      },
      { title: "Projects",
        path: `/projects`,
        src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_project.svg",
        owner:true,
        manager:true,
        team_member:true,
        client:true
      },
      { title: "Task",
        path: `/task`,
        src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_task.svg",
        owner:true,
        manager:true,
        team_member:true,
        client:true
      },
      {
        path: `/projects/overview/:project_name`,
        wrapperclass: "hidden",
        submenu_items: [
          {
            title: "Overview",
            path: `/projects/overview/:project_name`,
            icon: "overview-new",
            src:config.PUBLIC_URL + "/assets/images/amdital/subsidebar_icon/subsidebar_overview.svg",
            classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
            classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
            show:true
          },
          {
            title: "Task",
            path: `/projects/task/:project_name`,
            icon: "overview-new",
            src:config.PUBLIC_URL + "/assets/images/amdital/subsidebar_icon/subsidebar_task.svg",
            classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
            classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
            show:true
          },
          {
            title: "Timesheets",
            path: `/projects/timesheets/:project_name`,
            icon: "overview-new",
            src:config.PUBLIC_URL + "/assets/images/amdital/subsidebar_icon/subsidebar_timesheet.svg",
            classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
            classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
            show:true
          },
          {
            title: "Activity",
            path: `/projects/activity/:project_name`,
            icon: "overview-new",
            src:config.PUBLIC_URL + "/assets/images/amdital/subsidebar_icon/subsidebar_activity.svg",
            classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
            classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
            show:true
          },
          {
            title: "Contracts",
            path: `/projects/contracts/:project_name`,
            icon: "overview-new",
            src:config.PUBLIC_URL + "/assets/images/amdital/subsidebar_icon/subsidebar_contracts.svg",
            classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
            classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
            show:true,
            active:props.sub_tile

          },
          {
            title: "Files",
            path: `/projects/files/:project_name`,
            icon: "overview-new",
            src:config.PUBLIC_URL + "/assets/images/amdital/subsidebar_icon/subsidebar_files.svg",
            classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
            classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
            show:true
          },
          {
            title: "Milestones",
            path: `/projects/milestones/:project_name`,
            icon: "overview-new",
            src:config.PUBLIC_URL + "/assets/images/amdital/subsidebar_icon/subsidebar_milestone.svg",
            classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
            classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
            show:true
          },
          {
            title: "Tickets",
            path: `/projects/tickets/:project_name`,
            icon: "overview-new",
            src:config.PUBLIC_URL + "/assets/images/amdital/subsidebar_icon/subsidebar_tickets.svg",
            classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
            classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
            show:true,
            active:props.sub_tile
          },          
          {
            title: "Invoice",
            path: `/projects/invoice/:project_name`,
            icon: "overview-new",
            src:config.PUBLIC_URL + "/assets/images/amdital/subsidebar_icon/subsidebar_invoice.svg",
            classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
            classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
            show:true,
            active:props?.activeBackgroundColor

          },
          {
            title: "Payments",
            path: `/projects/payments/:project_name`,
            icon: "overview-new",
            src:config.PUBLIC_URL + "/assets/images/amdital/subsidebar_icon/subsidebar_payment.svg",
            classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
            classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
            show:true
          },
          {
            title: "Expenses",
            path: `/projects/expenses/:project_name`,
            icon: "overview-new",
            src:config.PUBLIC_URL + "/assets/images/amdital/subsidebar_icon/subsidebar_expenses.svg",
            classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
            classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
            show:true,
            active:props?.activeBackgroundColor

          },
        ],
      },
      { title: "Timesheet",
        path: `/timesheet`,
        src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_timesheet.svg",
        owner:true,
        manager:true,
        team_member:true,
        client:true
      },
      { title: "Resource Planner",
        path: `/resourceplanner`,
        src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_resource_planner.svg",
        owner:true,
        manager:true,
        team_member:true,
        client:true
      },
      { title: "Timeline",
        path: `/timeline`,
        src:config.PUBLIC_URL + "/assets/images/amdital/side_bar_timeline.svg",
        owner:true,
        manager:true,
        team_member:true,
        client:true
      },
      {
        title:"Wiki",
        path: `/wiki`,
        src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_wiki.svg",
        owner:true,
        manager:true,
        team_member:true,
        client:true
        },
        {
          title:"Employees",
          path: `/employees`,
          src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_employee.svg",
          owner:true,
          manager:true,
          team_member:true,
          client:true
        },
        {
          title:"Attendance",
          path: `/attendance`,
          src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_attendance.svg",
          owner:true,
          manager:true,
          team_member:true,
          client:true
        },
        {
          title:"Holidays",
          path: `/holidays`,
          src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_holiday.svg",
          owner:true,
          manager:true,
          team_member:true,
          client:true
        },
        {
          title:"Shifts",
          path: `/shifts`,
          src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_shifts.svg",
          owner:true,
          manager:true,
          team_member:true,
          client:true
        },
        {
                    title:"Leave",
                    path: `/leave/leave-apply`,
                    src:config.PUBLIC_URL + "/assets/images/amdital/siderbar_leave.svg",
                    owner:true,
                    manager:true,
                    team_member:true,
                    client:true
        },
        {
                  title:"LMS",
                  path: `/learning-management-system`,
                  src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_lms.svg",
                  owner:true,
                  manager:true,
                  team_member:true,
                  client:true
        },
        {
          title:"Finance",
          path: `/finance/tickets`,
          src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_finance.svg",
          owner:true,
          manager:true,
          team_member:true,
          client:true
        },
        {
          title:"Performance",
          path: `/performance/overview`,
          src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_performance.svg",
          owner:true,
          manager:true,
          team_member:true,
          client:true
        },
        {
                  title:"Settings",
                  path: `/settings/integrations`,
                  src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_setting.svg",
                  owner:true,
                  manager:true,
                  team_member:true,
                  client:true
                },
        {
          title:"My Profile",
          path: `/profile`,
          src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_profile.svg",
          owner:true,
          manager:true,
          team_member:true,
          client:true
        },
          {
            title:"Sign Out",
            path: `/signout`,
            src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_signout.svg",
            owner:true,
          manager:true,
          team_member:true,
          client:true
          }     
    ],
  };







  return (
    <>
      <section
     
             className={` h-full relative  overflow-y-auto  pb-[50px]   ${showPopupMenu ? ` w-[50px] ` : `   w-[250px] ` } `}
     
           >
              { <div className="fixed cursor-pointer rounded top-4 bg-[#F7F7F8] custom-shadow w-10 h-10 max-[1024px]:flex justify-center items-center z-[1400] right-4  hidden hover:[#D8F3E4] " onClick={toggleMenu}>
               <img className=" w-8 h-8 " src={config.PUBLIC_URL + "/assets/images/cross_icon_new.svg"}  alt="close icon"/>
             </div>}
     
             { 
               <div className=" flex  ">
                 <div className="min-h-screen min-w-[50px] max-w-[50px] flex-col sidebar_color py-4 ">
                  
                   <div className=" ">
                     <ul className="flex flex-col gap-1 ">
                     {sidebar_details?.menu_items.map((item, index) => {
                      return item.owner && (
                       <div key={index} className="group relative">
                       <li
                           onClick={() => {
                             if (window.innerWidth < 1024) {
                               toggleMenu();
                             }
                           }}
                       >
                          <NavLink
                           to={item?.path}
                           target={item?.isExternal ? "_blank" : undefined}
                           className="nav_menu relative flex items-center justify-center w-full h-10 "
                         >
                           <div className=" side_border  w-[4px] h-full bg-[#FF845C] left-0 absolute "></div>
                           
                           <div className="w-10 h-10 relative flex justify-center items-center">
                             <img src={item?.src} alt="sidebar-menu-icons" />
                           </div>
                           
                           {<div className={` ${ showPopupMenu ? ` fixed left-[50px]   top-14 ` : ` absolute  custom-shadow   ${ item?.title === "Resource Planner" ? ` -right-[125px] ` : `-right-[84px] `}  z-[1000]`}  hidden group-hover:block `}>
                                 { !showPopupMenu &&<div className={ ` absolute z-50  w-3.5 h-3.5 mt-[9px] -ml-[6.5px] border-b border-l  border-[#806BFF]  rotate-45  bg-[#806BFF]  ` }> </div>}
                                 <div  className={ `   border-[#806BFF] whitespace-nowrap border rounded relative  min-w-[71px] h-8 bg-[#806BFF] flex px-2 justify-center items-center  ` } > <p className={` ${showPopupMenu?` text-sm leading-5 font-medium `: ` text-xs leading-5 font-normal `}z-[1000] whitespace-nowrap   text-[#FFFFFF] `}> {item?.title}</p> </div> </div>}
                         </NavLink>
                       </li>
                       </div>
                     );
                     })}
                     </ul>
                   </div>
                 </div>
                       
                 <div className={` min-h-screen  bg-gradient-to-b from-[rgba(31,14,58,0.9)] to-[rgba(38,11,106,0.9)]  w-full   min-[1024px]:${showPopupMenu ? " min-[1024px]:hidden  " : " block "}   `}>
                   <div className="  text-sm leading-4 font-medium ">
                     <ul className="flex flex-col gap-2 py-4 ">
                       {sidebar_details?.menu_items[4]?.submenu_items?.map(
                         (sub_item,i) => (
                           
                           sub_item?.show &&  <li
                             className="  "
                             key={i}
                             onClick={() => {
                               if (window.innerWidth < 1024) {
                                 toggleMenu();
                               }
                             }}
                           >
                             {sub_item?.path ? (
                               <NavLink
                                 to={sub_item?.path}
                                 className={({ isActive }) =>
                                   isActive
                                     ? ` ${ sub_item?.active === sub_item?.title && ` bg-[#806BFF] `}  active w-full h-10 flex ${sub_item?.classActive}  gap-2   items-center  px-6 py-[10px] `
                                     : ` ${ sub_item?.active === sub_item?.title && ` bg-[#806BFF] `} inactive w-full h-10 flex  ${sub_item?.classInactive} gap-2    items-center px-6 py-[10px]  `
                                 }
                               >
                                 <div className="w-5 h-5 relative flex justify-center items-center">
                                   <img src={sub_item?.src} alt="subitem-icon" className=""/>
                                 </div>
                                 <div className=" text-sm font-normal  leading-5 ">{sub_item?.title}</div>
                               </NavLink>
                             ) : (
                               <div
                               className={` flex  w-full h-10 ${sub_item?.classInactive}  gap-3 items-center rounded `}
                               onClick={sub_item.onClick}
                             >
                               <div className="w-10 h-10 relative flex justify-center items-center">
                                <img src={sub_item?.src} alt="subitem-icon" className=" "/>
                               </div>
                               <div className="  ">{sub_item?.title}</div>
                             </div>
                             )}
                           </li>
                         ),
                       )}
                     </ul>
                   </div>
                 </div>
               </div>
             }
           </section>
    </>
  );
};
export default SubSidebar;
