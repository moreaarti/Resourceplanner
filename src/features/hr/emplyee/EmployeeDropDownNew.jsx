import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import config from "../../../config/config";
import { getEmployeeDropdownList } from "./employeeData";
import VaildationSelectionBox from "../../../components/elements/amdital/VaildationSelectionBox";

export default function EmployeeDropDownNew({
  labelName,
  wrapperClass,
  currentValueData,
  selectPlaceholder,
  searchPlaceholder,
  managerHandler,
  labelRequired = true,
  required = false,
}) {
  console.log("currentValueData", currentValueData);
  const employee_data = useSelector((store) => store?.general);
  const employee_dropdown_data_list =
    employee_data?.employee_dropdown_data_list;
  const pagination = employee_data?.employee_dropdown_data_list_pagination;

  const user_deatils = useSelector(
    (store) => store?.auth?.api_call_company_details,
  );
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
    await getEmployeeDropdownList(
      companyID,
      false,
      false,
      true,
      10,
      nextValue,
      search_value,
    );
  };
  const loadMoreHandler = async (endCursor, searchValue) => {
    setLoadMore(true);
    const res = await getEmployeeDropdownList(
      companyID,
      false,
      true,
      false,
      10,
      endCursor,
      searchValue,
    );
    setLoadMore(false);
  };

  const displayValue = currentValue?.id ? currentValue : currentValueData;

  //    useEffect(() => {
  //   if (currentValueData && currentValueData.id && !currentValue.id) {
  //     setCurrentValue({
  //       id: currentValueData.id,
  //       name: currentValueData.name,
  //       profileImage: currentValueData.profileImage,
  //       userDesignation: currentValueData.userDesignation
  //     });
  //   }
  // }, [currentValueData]);

  return (
    <div
      ref={dropdownRef}
      className="relative flex flex-col gap-2 text-sm font-medium leading-6 text-[#26212E]  "
    >
      {labelRequired && (
        <div className="-mt-1">
          {labelName}
          {required && <span className="text-[#EA4242]">*</span>}
        </div>
      )}

      {/* Dropdown Toggle */}
      <div
        onClick={() => setDropDownShow((prev) => !prev)}
        className={`${
          dropDownShow ? "border-2 border-[#806BFF]" : "border-[#DCD6FF]"
        } relative -mt-1 flex h-10 w-full cursor-pointer items-center justify-between rounded border bg-[#F8F7FC] px-2 ${
          wrapperClass || ""
        }`}
      >
        {displayValue?.id ? (
          <div className="flex w-[80%] items-center gap-2">
            {displayValue?.profileImage ? (
              <img
                src={displayValue.profileImage}
                alt=""
                className="max-h-8 min-h-8 min-w-8 max-w-8 rounded-full"
              />
            ) : (
              <div className="flex max-h-8 min-h-8 min-w-8 max-w-8 items-center justify-center rounded-full bg-[#806BFF] text-lg uppercase text-white">
                {displayValue?.name?.[0]}
              </div>
            )}
            <div className="flex flex-col">
              <div className="block overflow-hidden truncate capitalize">
                {displayValue?.name}
              </div>
              <div className="block overflow-hidden truncate text-xs font-normal capitalize leading-[100%] tracking-[0%]">
                {displayValue?.userDesignation || "No Designation"}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-1 overflow-hidden truncate whitespace-nowrap text-[#9F9F9F]">
            {selectPlaceholder || "Select " + labelName}
          </div>
        )}
        <img
          src={
            config.PUBLIC_URL + "/assets/images/amdital/arrow_down_arrow.svg"
          }
          alt=""
          className={`transition-transform duration-200 ${
            dropDownShow ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown List (Position Adjusts Automatically) */}
      {dropDownShow && (
        <div
          className={`absolute ${
            openAbove ? "bottom-full -mb-4 " : "top-full mt-1"
          } left-0 z-[1100] w-full rounded border border-gray-300 bg-[#FFFFFF] shadow-lg`}
          style={{ maxHeight: dropdownHeight }}
        >
          {/* Search Input */}
          <div className="w-full p-3">
            <div className="flex h-8 w-full cursor-pointer items-center rounded border border-[#E1DCFF] bg-white">
              <input
                type="text"
                placeholder={searchPlaceholder || "Search " + labelName}
                className="h-full w-full rounded px-4 py-2 outline-none placeholder:text-[#74689280]"
                value={searchValue}
                onChange={searchHandler}
              />
              <img
                className="mr-4 h-5 w-5"
                src={
                  config.PUBLIC_URL + "/assets/images/amdital/table_search.svg"
                }
                alt="search-icon"
              />
            </div>
          </div>

          {/* Dropdown List Items */}
          <div className="max-h-[200px] overflow-y-auto">
            {employee_dropdown_data_list?.length > 0 ? (
              employee_dropdown_data_list.map((item) => {
                const name = item?.firstName + " " + item?.lastName;
                const designation = item?.userDesignation
                  ? item?.userDesignation
                  : "No Designation";
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCurrentValue({
                        id: item?.userId,
                        name: name,
                        profileImage: item?.profileImage,
                        userDesignation: designation,
                      });
                      managerHandler(item);
                      setDropDownShow(false);
                    }}
                    className={`flex cursor-pointer items-center gap-2 px-3 py-2 ${
                      currentValue?.id === item?.userId ||
                      currentValueData?.id === item?.userId
                        ? "bg-[#E1DCFF]"
                        : ""
                    } hover:bg-[#E1DCFF]`}
                  >
                    {item?.profileImage ? (
                      <img
                        src={item.profileImage}
                        alt=""
                        className=" max-h-8 min-h-8 min-w-8 max-w-8 rounded-full"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#806BFF] text-lg uppercase text-white">
                        {item?.firstName?.[0]}
                      </div>
                    )}
                    <div className="flex flex-col capitalize">
                      <div className="block truncate text-xs font-semibold leading-4 text-[#26212E]">
                        {name}
                      </div>
                      <div className="block truncate text-[10px] font-normal leading-3 text-[#26212E]">
                        {designation}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-2 text-gray-500">No Employee Found</div>
            )}
            {pagination?.hasNextPage && (
              <div className="flex w-full justify-center">
                {loadMore ? (
                  <div className="flex items-center gap-1 text-sm font-normal leading-4 text-[#806BFF]">
                    loading
                    <span
                      className={`button-loader h-3 w-3 rounded-full border-2 border-[#806BFF] border-r-transparent`}
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      loadMoreHandler(pagination?.endCursor, searchValue);
                    }}
                    className="w-fit cursor-pointer py-1 text-center text-sm font-normal leading-5 text-[#806BFF] hover:underline"
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
      {dropDownShow && (
        <div
          className="fixed inset-0 z-[1000]"
          onClick={() => setDropDownShow(false)}
        ></div>
      )}
    </div>
  );
}
