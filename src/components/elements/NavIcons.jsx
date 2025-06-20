import React from "react";
import { Link } from "react-router-dom";

const NavIcons = (props) => {

  // let wrapperClass = props.wrapperclass || " flex w-5 items-center max-lg:w-5 ";

  return (
    <div className="relative  group">
    <div className={` hover:bg-[#806BFF] rounded-full w-7 h-7 flex flex-col items-center justify-center `+ props.class}>
    <button
      onClick={props.onClick}>
            {props.path ? 
          <Link to={props.path} >
            <img className="nav-bar-img" src={props.img} alt=""  />
          </Link> : <div className="relative">
            <img className="nav-bar-img" src={props.img} alt="" />
                  {props.title === "Announcements" && props.announcement_count !==0 && <div  className=" absolute  normal_content_white -top-3.5 -right-3 bg-[#EA4242]  rounded-full w-6 h-6  " > <div className="mt-[2.5px] -ml-[1px] ">{props.announcement_count}</div></div>}
                  {props.title === "Notifications" && props?.notification_count !==0 && <div  className=" absolute  normal_content_white -top-3.5 -right-3 bg-[#EA4242]  rounded-full w-6 h-6  " > <div className="mt-[2.5px] -ml-[1px] ">{props?.notification_count}</div></div>}
            </div>}
      </button> 
    </div>
    <div>
    <div className={` absolute mt-3 hidden group-hover:block
    
    ${props.title === "Search" ?` -ml-[18px]  `:null}
    ${props.title === "Customer Support"?`-ml-[50px]`:null}
    ${props.title === "Notifications"?`-ml-10`:null} `}
    
    >
                    <div className={ `  w-3.5 h-3.5  z-10 -mt-1.5  border-t border-l border-[#806BFF]  absolute rotate-45  bg-[#806BFF]
                    
                    ${props.title === "Search" ? ` ml-[23px] `:null}
                    ${props.title === "Customer Support"?` ml-14  `:null}
                    ${props.title === "Notification"?` ml-2 `:null}
                    
                    
                    ` }> </div>
                                  <div  className={ ` whitespace-nowrap border-[#806BFF]  border rounded relative text-sm text-[#FFFFFF] font-normal  h-8 px-2 bg-[#806BFF] flex items-center justify-center   ` } > 
                                  {props.title}
                                  </div>
                              </div>
      </div>  



      </div>

  );
};

export default NavIcons;
