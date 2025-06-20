import React, { useRef, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglePopupMenuStatus } from "../../features/general/generalSlice";
import config from "../../config/config";
import { NavLink } from "react-router-dom";


const MainSidebar = ({ activeSidebar }) => {
  const showPopupMenu = useSelector((state) => state?.general?.showPopupMenu);
  const redux_setting_data = useSelector((state) => state?.settings);
  const setting_data = redux_setting_data?.setting_general;

  const user_details = useSelector(store => store?.auth?.data);

  const dispatch = useDispatch();

     const mainSidebarData = [
         { 
           title: "Dashboard", 
           path: "/dashboard", 
           image: config.PUBLIC_URL + "/assets/images/amdital/sidebaricons/sidebar_dashboard_new_icon.svg", 
           display:true,
         },
         { 
           title: "Work", 
           path: "/resourceplanner", 
           image: config.PUBLIC_URL + "/assets/images/amdital/sidebaricons/sidebar_work_new_icon.svg", 
           display:true, 
         }
       ];




        const sidebarRef = useRef(null);
        const tooltipElementsRef = useRef({});
        const [tooltipPositions, setTooltipPositions] = useState({});
        const updateTooltipRefs = () => {
          tooltipElementsRef.current = {};
        };
        const saveTooltipRef = (item, element) => {
          if (element) {
            tooltipElementsRef.current[item.title] = element;
          }
        };

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    <>
      <section
        className={`bg-[#200E3D] fixed h-screen overflow-y-auto overflow-x-hidden
        ${showPopupMenu
            ? `min-w-[50px] max-w-[50px]`
            : `min-w-[250px] max-w-[250px] min-[1400px]:min-w-[278px] min-[1400px]:max-w-[278px]`
          }`}
        ref={sidebarRef}
      >
        {/* Logo Header */}
        <div
          className={`z-[100] fixed bg-[#200E3D] min-h-[56px] flex items-center ${showPopupMenu
            ? `min-w-[50px] max-w-[50px]`
            : `min-w-[250px] max-w-[250px] min-[1400px]:min-w-[278px] min-[1400px]:max-w-[278px]`
            }`}
        >
          <div
            onClick={()=>{dispatch(togglePopupMenuStatus());}}
            className="relative cursor-pointer flex justify-center items-center min-w-[50px] max-w-[50px] min-h-[56px]"
          >
            <img src={config.PUBLIC_URL + "/assets/images/amdital/hamburg_icon_white.svg"} alt="" />
          </div>
          {!showPopupMenu && (
            <div className=" px-6 relative flex items-center min-w-[200px] max-w-[200px] min-[1400px]:min-w-[228px] min-[1400px]:max-w-[228px] min-h-[56px]">
              <img
                className=" relative cursor-pointer  w-auto  min-h-[26px]  max-h-[26px] object-fill"
                src={setting_data?.companyLogo || config.PUBLIC_URL + "/assets/images/amdital/amdital_logo_white.svg"}
                alt=""
              />
            </div>
          )}
        </div>

        {/* Sidebar Menu */}
        <div
          className={`${showPopupMenu
              ? `min-w-[50px] max-w-[50px]`
              : `min-w-[250px] max-w-[250px] min-[1400px]:min-w-[278px] min-[1400px]:max-w-[278px]`
            } flex min-h-screen mt-[56px]`}
        >
          <ul className="w-full flex flex-col gap-[2px] list-none relative pb-10">
            {mainSidebarData.map((menu, index) => {
               const top = tooltipPositions[menu?.title];

              return menu?.display && (
                <NavLink
                  key={index}
                  to={menu.path}
                  className={`relative group flex items-center min-h-[50px] max-h-[50px] w-full hover:bg-[#806BFF] ${activeSidebar === menu.title ? "bg-[#806BFF]" : ""
                    }`}
                    ref={(el) => saveTooltipRef(menu, el)}
                >
                  <div  className="relative group flex justify-center items-center">
                    <div className="relative min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px] flex justify-center items-center">
                      <div
                        className={`${activeSidebar === menu.title ? "bg-[#FF845C]" : ""
                          } w-[4px] min-h-[50px] max-h-[50px] left-0 absolute  group-hover:bg-[#FF845C] `}
                      ></div>
                      <img src={menu.image} alt="" className="relative" />
                    </div>

                    {showPopupMenu && (
                      <div
                        className="hidden group-hover:block custom-shadow z-[1000] fixed left-[60px]"
                        style={{ top: `${top +10}px` }}
                      >
                        <div className="absolute w-3.5 h-3.5 mt-[9px] -ml-[6.5px] border-b border-l border-[#806BFF] rotate-45 bg-[#806BFF]"></div>
                        <div className="border-[#806BFF] whitespace-nowrap border rounded relative min-w-[71px] h-8 bg-[#806BFF] flex px-2 justify-center items-center">
                          <p className="whitespace-nowrap text-xs leading-5 font-normal text-[#FFFFFF]">
                            {menu.title}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {!showPopupMenu && (
                    <div className="w-full relative min-h-[50px] max-h-[50px] flex items-center px-6 py-[15.5px] text-base text-[#FFFFFF] font-normal leading-[100%] tracking-[0%]">
                      {menu.title}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default MainSidebar;
