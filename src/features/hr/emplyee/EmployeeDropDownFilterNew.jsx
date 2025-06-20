import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import config from "../../../config/config";
import { getEmployeeDropdownList } from "./employeeData";


export default function EmployeeDropDownFilterNew({ labelName, wrapperClass, currentValueData,selectPlaceholder,searchPlaceholder, managerHandler, labelRequired = true, required=false }) {

  const employee_data = useSelector((store) => store?.general);
  const employee_dropdown_data_list = employee_data?.employee_dropdown_data_list;

  const pagination = employee_data?.employee_dropdown_data_list_pagination;

  const user_deatils = useSelector(store=>store?.auth?.api_call_company_details);
  const companyID = user_deatils?.companyId;

  const [dropDownShow, setDropDownShow] = useState(false);
  const [currentValue, setCurrentValue] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [loadMore, setLoadMore] = useState(false);
  const [openAbove, setOpenAbove] = useState(false);


  const dropdownRef = useRef(null);
  const dropdownHeight = 270; // Adjust this based on dropdown height

  useEffect(() => {
    if (dropDownShow && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setOpenAbove(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
    }
  }, [dropDownShow]);


  const searchHandler = async (e, nextValue) => {
    const search_value = e.target.value;
    setSearchValue(search_value);
    await getEmployeeDropdownList(companyID,false, false, true, 100, nextValue, search_value);
  };
  const loadMoreHandler = async (endCursor,searchValue)=>{
    setLoadMore(true);
    const res = await getEmployeeDropdownList(companyID,false,true,false ,100,endCursor,searchValue);
    setLoadMore(false);
  }

  return (
    <div ref={dropdownRef} className="relative text-sm leading-6 font-medium text-[#26212E] flex flex-col gap-2  ">
      {labelRequired && <div className="-mt-1">{labelName}{required && <span className='text-[#EA4242]'>*</span>}</div>}

      {/* Dropdown Toggle */}
      <div
        onClick={() => setDropDownShow((prev) => !prev)}
        className={`${
          dropDownShow ? "border-[#806BFF] border-2" : "border-[#DCD6FF]"
        } cursor-pointer relative border bg-[#F8F7FC] -mt-1 min-h-8 w-full rounded flex justify-between px-2 items-center ` + wrapperClass}
      >
       { 
       currentValue?.id === "all" || currentValueData?.id ==="all" ?
       <div  className=" text-sm font-normal leading-[100%] tracking-[0%]  px-2 ">All</div>
       :
        <div>
          {currentValue?.id || currentValueData?.id ? (
            <div className="flex gap-2 items-center w-[80%]">
              {currentValue?.profileImage || currentValueData?.profileImage ? (
                <img src={currentValue?.profileImage || currentValueData?.profileImage} alt="" className="min-h-8 min-w-8 max-h-8 max-w-8 rounded-full" />
              ) : (
                <div className="min-h-8 min-w-8 max-h-8 max-w-8 uppercase flex justify-center items-center rounded-full bg-[#806BFF] text-white text-lg">
                  {currentValue?.name?.[0] || currentValueData?.name?.[0]}
                </div>
              )}
              <div className=" flex  flex-col ">
                <div className="block overflow-hidden truncate capitalize">{currentValue?.name || currentValueData?.name}</div>
                <div className="block overflow-hidden test-xs font-normal leading-[100%] tracking-[0%] truncate capitalize">{currentValue?.userDesignation || currentValueData?.userDesignation || "No Designation"}</div>
              </div>
            </div>
          ) : (
            <div className="whitespace-nowrap flex gap-1 overflow-hidden truncate">
              {selectPlaceholder || "Select " + labelName}
            </div>
          )}
        </div>
        }
        <img
          src={config.PUBLIC_URL + "/assets/images/amdital/arrow_down_arrow.svg"}
          alt=""
          className={`transition-transform duration-200 ${dropDownShow ? "rotate-180" : ""}`}
        />
      </div>
      
      {/* Dropdown List (Position Adjusts Automatically) */}
      {dropDownShow && (
        <div
          className={`absolute ${openAbove ? "bottom-full -mb-4 " : "top-full mt-1"} left-0 w-full bg-[#FFFFFF]  shadow-lg border border-gray-300 rounded z-[1100]`}
          style={{ maxHeight: dropdownHeight }}
        >
          
          {/* Search Input */}
          <div className="w-full p-3">
            <div className="w-full h-8 bg-white cursor-pointer border border-[#E1DCFF] rounded flex items-center">
              <input
                type="text"
                placeholder={searchPlaceholder || "Search " + labelName}
                className="placeholder:text-[#74689280] rounded px-4 py-2 w-full h-full outline-none"
                value={searchValue}
                onChange={searchHandler}
              />
              <img className="w-5 h-5 mr-4" src={config.PUBLIC_URL + "/assets/images/amdital/table_search.svg"} alt="search-icon" />
            </div>
          </div>
          {/* all */}

          <div 
          onClick={()=>{ 
          setCurrentValue({ id: "all", name: "All", profileImage: "",userDesignation:"All" });
          managerHandler({ id: "all", name: "All", profileImage: "",userDesignation:"All" });
          setDropDownShow(false);
        }}
           className={`  ${
            (currentValue?.id === "all" ||  currentValueData?.id === "all"  ) ? "bg-[#E1DCFF]" : ""
          } px-3 py-2 hover:bg-[#E1DCFF] cursor-pointer text-base font-semibold leading-[100%] tracking-[0%] relative `}>All</div>

          {/* Dropdown List Items */}
          <div className=" pt-2 max-h-[180px] overflow-y-auto">
            {employee_dropdown_data_list?.length > 0 ? (
              employee_dropdown_data_list.map((item) => {
                const name = item?.firstName + " " + item?.lastName;
                const designation = item?.userDesignation ? item?.userDesignation : "No Designation";
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCurrentValue({ id: item?.userId, name: name, profileImage: item?.profileImage,userDesignation:designation });
                      managerHandler(item);
                      setDropDownShow(false);
                    }}
                    className={`flex gap-2 items-center px-3 py-2 cursor-pointer ${
                      (currentValue?.id === item?.userId ||  currentValueData?.id === item?.userId  ) ? "bg-[#E1DCFF]" : ""
                    } hover:bg-[#E1DCFF]`}
                  >
                    {item?.profileImage ? (
                      <img src={item.profileImage} alt="" className=" min-h-8 min-w-8 max-h-8 max-w-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 flex justify-center uppercase items-center rounded-full bg-[#806BFF] text-white text-lg">
                        {item?.firstName?.[0]}
                      </div>
                    )}
                    <div className="flex flex-col capitalize">
                      <div className="truncate text-xs font-semibold block leading-4 text-[#26212E]">{name}</div>
                      <div className="truncate block font-normal text-[10px] leading-3 text-[#26212E]">{designation}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-2 text-gray-500">No Employee Found</div>
            )}
            {pagination?.hasNextPage && (
              <div className="w-full flex justify-center">
                {loadMore ? (
                  <div className="flex gap-1 items-center text-[#806BFF] text-sm font-normal leading-4">
                    loading
                    <span className={`button-loader w-3 border-[#806BFF] h-3 border-2 border-r-transparent rounded-full`} />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      loadMoreHandler(pagination?.endCursor, searchValue);
                    }}
                    className="w-fit py-1 text-center text-sm font-normal leading-5 text-[#806BFF] hover:underline cursor-pointer"
                  >
                    Load more
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {dropDownShow && <div className="inset-0 fixed z-[1000]" onClick={() => setDropDownShow(false)}></div>}
    </div>
  );
}
