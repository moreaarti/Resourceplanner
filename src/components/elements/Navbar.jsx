import { React, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config/config";
import { toggleCustomerSupport, toggleGlobalSearch, togglePopupMenuStatus} from "../../features/general/generalSlice";
import NavIcons from "./NavIcons";
import ProfileDropdown from "./ProfileDropdown";
import "react-loading-skeleton/dist/skeleton.css";
import AttendanceNavbar from "./amdital/AttendanceNavbar";
import CustomerSupport from "../../features/customer suppoert/CustomerSupport";
import GlobalSearch from "../../features/global-search/GlobalSearch";
import getAttendanceRecords from "../../features/hr/attendance/attendence";
import { use } from "react";
import { getCustomUserRole, getSettingdetails } from "../../features/settings/settingFunction";
import { useLocation } from "react-router-dom";


const Navbar = (props) => {
   const reduxUser = useSelector(state=>state?.auth?.data?.user);
  const userDateRedux = useSelector((state) => state?.auth?.data?.user);
  const profile_image =userDateRedux?.profileImage;
  const dispatch = useDispatch();
  const FirstName = userDateRedux?.firstName;
  const LastName = userDateRedux?.lastName;
  const profile_name = FirstName + " " + LastName
  const profile_first_letter = profile_name ? profile_name?.split("") : "";
  const email =  userDateRedux?.userDesignation;
  const location = useLocation();



 
                        
  let nav_details = {
    nav_icons: [
      {
        title: "Search",
        img: config.PUBLIC_URL + "/assets/images/amdital/search_main.svg",
        show: true,
        component:<GlobalSearch
                    onClick={() => {
                      dispatch(toggleGlobalSearch());
                    }}
                    title= "Search"
                    img = {config.PUBLIC_URL + "/assets/images/amdital/search_main.svg"}
                  />
      },
      {
        title: "Notification",
        img: config.PUBLIC_URL + "/assets/images/amdital/notification.svg",
        show: true
      },
      {
        title: "Customer Support",
        img: config.PUBLIC_URL + "/assets/images/amdital/customer_support.svg",
        show: true,
        component:<CustomerSupport
                    onClick={() => {
                      dispatch(toggleCustomerSupport());
                    }}
                    title= "Customer Support"
                    img={config.PUBLIC_URL + "/assets/images/amdital/customer_support.svg"}
                  />
      },
    ],
  };

  let icons = nav_details.nav_icons.map((icon, i) => {
      return (
        icon?.show && <li key={i} className="h-fit">
          {   icon?.component  ? (
            icon?.component
          ) : ( 
            <NavIcons
              title={icon.title}
              path={icon.path}
              img={icon.img}
              onClick={icon.onClick}
              wrapperclass={icon.wrapperclass}
              imgclass={icon.imgclass}
              class={icon.class}
              value={icon.value}
            />
          )}
        </li>
      );
  });


useEffect(()=>{
  silentHandler()
  getAttendanceRecords();
},[]);

useEffect(()=>{
 const fetchHandler = async () => {
  if(reduxUser?.companyId){
    await getSettingdetails(reduxUser?.companyId);
  }
 }
 fetchHandler();
  },[reduxUser]);
;

useEffect(() => {
  silentHandler();
}, [location.pathname]);


const silentHandler = async ()=>{
  await getCustomUserRole();
}



  return (
    <nav className={` w-full min-h-14  max-h-14   bg-[#DCD6FF]  flex justify-between items-center  px-6 py-2 `}>
         {/* <div className=" w-full min-h-14  max-h-14 flex  items-center  px-6 py-2 "> */}
            <div className="w-full block overflow-hidden truncate text-[20px] font-medium text-[#260B6A] leading-6  ">{props?.breadCrumb|| "hello guru "}</div>
            <div className=" w-full justify-end   h-full  flex items-center gap-4 ">
                <AttendanceNavbar/>
                {/* <ul className="flex items-center gap-4  ">{icons}</ul> */}
                <div
                  className="group relative flex items-center justify-center gap-[6px]"
                  // onClick={openProfileHandler}
                >
                      <button className="flex items-center justify-center ">
                        {profile_image === "" ? (
                          <div className="flex h-9 border-2 uppercase border-[#FFFFFF] w-9  items-center justify-center rounded-[50%] bg-[#806BFF]  text-white ">
                            {profile_first_letter?.[0]}
                          </div>
                        ) : (
                          <img
                            src={profile_image}
                            alt=""
                            className="h-9 w-9 border-2 border-[#FFFFFF]  rounded-[50%]  nav-bar-img "
                          />
                        )}
                      </button>
                  {/* <img className="cursor-pointer min-w-[20px] min-h-[20px] ml-1 max-[500px]:hidden  group-hover:hidden"    src={config.PUBLIC_URL + "/assets/images/downward_arrow_new.svg"} alt=""  /> */}
                  <img className="cursor-pointer ml-1 w-3 h-3 "   src={config.PUBLIC_URL + "/assets/images/amdital/profile_dropdown.svg"} alt=""  />
                  <ul
                    className={
                      " absolute -right-7 top-[45px] hidden z-[1200] -mt-4  pt-2 group-hover:block max-sm:-right-8  sm:mx-6 "
                    }
                  >
                    <ProfileDropdown
                      name={FirstName + " " + LastName}
                      profile_image={profile_image}
                      email={email}
                    />
                  </ul>

                </div>
            </div>
          {/* </div>      */}
      
    </nav>
  );
};

export default Navbar;
