import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileDropdown = (props) => {

  const profile_name = props?.name?.split("");


  return (
    <div className="relative min-w-[250px]">
      <div 
              className={`
                absolute w-3 h-3 bg-white border-t border-l border-[#E1DCFF]
                transform rotate-45
                ${false ? 'bottom-[-6px] border-r border-b border-t-0 border-l-0' : 'top-[-6.5px]'}
              `}
              style={{
                left: '88%',
                marginLeft: '-6px',
              }}
            />
        <div className="m-2 min-w-xs overflow-hidden rounded border bg-[#FFFFFF] shadow-lg">
        <div className="flex ">
          <div className="m-4 w-10 h-10">
            {props?.profile_image === "" ? (
              <>
                <div
                  className={
                    "flex h-10 w-10 rounded-full items-center justify-center   bg-[#806BFF] text-2xl font-medium text-white"
                  }
                >
                  {profile_name[0]?.toUpperCase()}
                </div>
              </>
            ) : (
              <>
                <img
                  className={" rounded-full w-full h-full  "}
                  src={props?.profile_image}
                  alt={""}
                />
              </>
            )}
          </div>
          <div className="">
            <div className="pt-4 text-sm font-semibold leading-[16.8px] text-[#26212E]  ">
              {props.name}
            </div>
            <div className="pt-1 pb-5 pr-5 flex text-sm font-normal leading-[16.8px] text-[#26212E] whitespace-nowrap ">{props.email}</div>
          </div>
        </div>
        <hr />
        <div>
          { !props?.hideProfile &&<Link
            to="/profile"
            className="block cursor-pointer p-4 pb-2  text-sm font-normal leading-[16.8px] text-[#26212E]] transition duration-150 ease-in-out hover:bg-gray-100"
          >
            Profile
          </Link>}
          {/* <a
            // href="https://www.vmaintain.com/terms-and-conditions"
            target="_blank"
            rel="noreferrer"
            className="block cursor-pointer p-4 pt-2 text-sm font-normal leading-[16.8px] text-[#26212E] transition duration-150 ease-in-out hover:bg-gray-100"
          >
            Terms & Conditions
          </a> */}
          {/* <hr /> */}
          <Link
            to="/logout"
            className=" block cursor-pointer text-sm font-normal leading-[16.8px] text-[#FF0000] p-4 transition duration-150 ease-in-out hover:bg-gray-100"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
