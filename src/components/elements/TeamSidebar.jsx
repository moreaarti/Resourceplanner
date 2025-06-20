import { React,} from "react";
import { useDispatch,  } from "react-redux";

import { togglePopupMenuStatus } from "../../features/general/generalSlice";

import { NavLink,} from "react-router-dom";

import config from "../../config/config";
import { useSelector } from "react-redux";



const TeamSidebar = (props) => {

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
      // {
      //   title:"Chat",
      //   path: `/chats`,
      //   src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_chat.svg",
      //   owner:true,
      //   manager:true,
      //   team_member:true,
      //   client:true
      // },
      // { title: "Projects",
      //   path: `/projects`,
      //   src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_project.svg",
      //   owner:true,
      //   manager:true,
      //   team_member:true,
      //   client:true
      // },
      // { title: "Timesheet",
      //   path: `/timesheet`,
      //   src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_timesheet.svg",
      //   owner:true,
      //   manager:true,
      //   team_member:true,
      //   client:true
      // },
      // { title: "Resource Planner",
      //   path: `/resourceplanner`,
      //   src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_resource_planner.svg",
      //   owner:true,
      //   manager:true,
      //   team_member:true,
      //   client:true
      // },
      // { title: "Timeline",
      //   path: `/timeline`,
      //   src:config.PUBLIC_URL + "/assets/images/amdital/side_bar_timeline.svg",
      //   owner:true,
      //   manager:true,
      //   team_member:true,
      //   client:true
      // },
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
          src:config.PUBLIC_URL + "/assets/images/amdital/holiday.svg",
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
          title:"Team",
          path: `/team`,
          src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_team_icon.svg",
          owner:true,
          manager:true,
          team_member:true,
          client:true
        },
        {
          path: `/team`,
           wrapperclass: "hidden",
               submenu_items: [
                 {
                   title: "Team",
                   path: `/team`,
                   src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_team_icon.svg",
                   classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
                   classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
                   show:true,
                   activate:props?.activate
                 },                     
               ],
        },
        // {
        //                     title:"Leave",
        //                     path: `/leave/leave-apply`,
        //                     src:config.PUBLIC_URL + "/assets/images/amdital/siderbar_leave.svg",
        //                     owner:true,
        //                     manager:true,
        //                     team_member:true,
        //                     client:true
        //         },
        //   {
                
        //     title:"LMS",
        //     path: `/learning-management-system`,
        //     src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_lms.svg",  
        //     owner:true,
        //     manager:true,
        //     team_member:true,
        //     client:true
        //   },
        // {
        //           title:"Finance",
        //           path: `/finance/tickets`,
        //           src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_finance.svg",
        //           owner:true,
        //           manager:true,
        //           team_member:true,
        //           client:true
        // },
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
          path: `/settings`,
          src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_setting.svg",
          owner:true,
          manager:true,
          team_member:true,
          client:true
        },
        {
          path: `/settings/integrations`,
           wrapperclass: "hidden",
               submenu_items: [
                 {
                   title: "Integrations",
                   path: `/settings/integrations`,
                   src:config.PUBLIC_URL + "/assets/images/amdital/setting_integration.svg",
                   classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
                   classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
                   show:true,
                   activate:props?.activate
                 },
                //  {
                //   title: "Notifications",
                //   path: `/settings/notifications`,
                //   src:config.PUBLIC_URL + "/assets/images/amdital/setting_notification.svg",
                //   classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
                //   classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
                //   show:true
                // },

                {
                  title: "General",
                  path: `/settings/General`,
                  src:config.PUBLIC_URL + "/assets/images/amdital/general.svg",
                  classActive:  ` bg-[#806BFF] text-[#FFFFFF]  `,
                  classInactive: ` hover:bg-[#806BFF] text-[#FFFFFF]  `,
                  show:true,
                  activate:props?.activate
                },
                 
               ],


        },
        // {
        //   title:"Manage Users",
        //   path: `/manage-users`,
        //   src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_manage_users.svg",
        //   owner:true,
        //   manager:true,
        //   team_member:true,
        //   client:true
        // },
        {
          title:"My Profile",
          path: `/profile`,
          src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_profile.svg",
          owner:true,
          manager:true,
          team_member:true,
          client:true
        },
          // {
          //   title:"Help",
          //   path: `/help`,
          //   src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_help.svg",
          //   owner:true,
          // manager:true,
          // team_member:true,
          // client:true
          // },
          {
            title:"Sign Out",
            path: `/signout`,
            src:config.PUBLIC_URL + "/assets/images/amdital/sidebar_signout.svg",
            owner:true,
          manager:true,
          team_member:true,
          client:true
          }
      // {
      //   title: "Tasks",
      //   path: `/workspace/${current_workspace_id}/task`,
      //   icon: "task",
      //   src:config.PUBLIC_URL + "/assets/images/task_icon_new.svg",
      //   owner:true,
      //   manager:true,
      //   team_member:true,
      //   client:true
      // },
      // {
      //   title: "Manage Users",
      //   path: `/workspace/${current_workspace_id}/manage-users`,
      //   src:config.PUBLIC_URL + "/assets/images/workspace_04_2024_icon_new.svg",
      //   owner:true,
      //   manager:true,
      //   team_member:true,
      //   client:false
      // },
     
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
             
              <div className="">
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
                      
                      {<div className={` absolute custom-shadow  hidden group-hover:block left-[61px] z-[1000] `}>
                            <div className={ ` absolute z-50  w-3.5 h-3.5 mt-[9px] -ml-[6.5px] border-b border-l  border-[#806BFF]  rotate-45  bg-[#806BFF]  ` }> </div>
                            <div  className={ `   border-[#806BFF] whitespace-nowrap border rounded relative  min-w-[71px] h-8 bg-[#806BFF] flex px-2 justify-center items-center  ` } > <p className="z-[1000] whitespace-nowrap  text-xs leading-5 font-normal text-[#FFFFFF] "> {item?.title}</p> </div> </div>}
                    </NavLink>
                  </li>
                  </div>
                );
                })}
                </ul>
              </div>
            </div>
                  
            <div className={` min-h-screen w-full   bg-gradient-to-b from-[rgba(31,14,58,0.9)] to-[rgba(38,11,106,0.9)]   min-[1024px]:${showPopupMenu ? " min-[1024px]:hidden  " : " block "}   `}>
              <div className="  text-sm leading-4 font-medium ">
                <ul className="flex flex-col gap-2 py-4 ">
                  {sidebar_details?.menu_items[7]?.submenu_items?.map(
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
                                ? `  active w-full h-10 flex ${sub_item?.classActive}  gap-2   items-center  px-6 py-[10px] `
                                : ` ${sub_item?.title === sub_item?.activate && ` bg-[#806BFF] `} inactive w-full h-10 flex  ${sub_item?.classInactive} gap-2    items-center px-6 py-[10px]  `
                            }
                          >
                            <div className="w-5 h-5 relative flex justify-center items-center">
                              <img src={sub_item?.src} alt="subitem-icon" className=""/>
                            </div>
                            <div className="  ">{sub_item?.title}</div>
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
export default TeamSidebar;
