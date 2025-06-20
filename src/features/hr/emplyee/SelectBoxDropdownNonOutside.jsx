import React, { useState, useRef, useEffect } from "react";
import config from "../../../config/config";

export default function SelectBoxDropdownNonOutside({
  labelName,
  labelClassName,
  current_value,
  current_id,
  options,
  dropDownClassName,
  dropDownHeight,
  onChangeHandler,
  searchPlaceholder,
  wrapperClass,
  required,
  selectPlaceholder,
  bgClassName,
  mainWrapperClass,
}) {



  const [dropDownShow, setDropDownShow] = useState(false);
  const [currentValue, setCurrentValue] = useState(current_value);
  const [currentId, setCurrentId] = useState(current_id);
  const [openAbove, setOpenAbove] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [optionsList, setOptionList] = useState(options || []);

  const dropdownRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  // Handle dropdown positioning
  useEffect(() => {
    if (dropDownShow && dropdownRef.current) {
      const handlePositioning = () => {
        const triggerRect = dropdownRef.current.getBoundingClientRect();
        const menuHeight = dropDownHeight || 300;
        const spaceBelow = window.innerHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;

        const shouldOpenAbove = spaceBelow < menuHeight && spaceAbove > spaceBelow;
        setOpenAbove(shouldOpenAbove);
      };

      setTimeout(handlePositioning, 0);
      window.addEventListener("resize", handlePositioning);
      return () => {
        window.removeEventListener("resize", handlePositioning);
      };
    }
  }, [dropDownShow, dropDownHeight]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target)
      ) {
        setDropDownShow(false);
        setSearchValue("");
        setOptionList(options);
      }
    };

    if (dropDownShow) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownShow]);

  const searchHandler = (e) => {
    const search_value = e.target.value;
    setSearchValue(search_value);
    if (search_value?.length > 0) {
      const searchData = options.filter((option) =>
        option.name.toLowerCase().includes(search_value.toLowerCase())
      );
      setOptionList(searchData);
    } else {
      setOptionList(options);
    }
  };

  const display = currentValue ? currentValue :current_value

  return (
    <div className={`flex flex-col relative ${mainWrapperClass || "gap-2"}`}>
      <div className={`text-sm text-[#26212E] ${labelClassName || "font-normal"}`}>
        {labelName}
        {required && <span className="text-[#EA4242]">*</span>}
      </div>
      <div className="relative" ref={dropdownRef}>
        <div
          className={`relative cursor-pointer flex justify-between items-center ${
            dropDownShow ? "border-[#806BFF] border-2" : "border-[#DCD6FF]"
          } w-full min-h-8 border rounded px-4 py-2 ${wrapperClass || ""} ${bgClassName || "bg-[#FFFFFF]"}`}
          onClick={() => setDropDownShow(!dropDownShow)}
        >
          {display ? (
            <div className="w-[80%] overflow-hidden truncate capitalize text-[#26212E] text-sm font-normal leading-4">
              {display}
            </div>
          ) : (
            <div className="whitespace-nowrap flex gap-1 overflow-hidden truncate text-sm font-normal text-[#9F9F9F]">
              {selectPlaceholder || "Select " + labelName}
            </div>
          )}
          <img
            src={config.PUBLIC_URL + "/assets/images/amdital/arrow_down_arrow.svg"}
            alt=""
            className={dropDownShow ? "rotate-180" : ""}
          />
        </div>

        {dropDownShow && (
          <div
            ref={dropdownMenuRef}
            className={`absolute w-full flex flex-col overflow-auto border border-[#E1DCFF] bg-[#FFFFFF] rounded shadow-lg z-[9999] ${dropDownClassName || ""}`}
            style={{
              top: openAbove ? "auto" : "100%",
              bottom: openAbove ? "100%" : "auto",
              maxHeight: dropDownHeight || 300,
            }}
          >
            <div className="w-full p-3 sticky top-0 bg-white z-10">
              <div className="w-full text-sm font-normal h-8 bg-white cursor-pointer border border-[#E1DCFF] rounded flex items-center">
                <input
                  type="text"
                  placeholder={searchPlaceholder || `Search ${labelName}`}
                  className="placeholder:text-[#74689280] rounded px-4 py-2 w-full h-full outline-none"
                  value={searchValue}
                  onChange={searchHandler}
                  onClick={(e) => e.stopPropagation()}
                />
                <img
                  className="w-5 h-5 mr-4"
                  src={config.PUBLIC_URL + "/assets/images/amdital/table_search.svg"}
                  alt="search-icon"
                />
              </div>
            </div>

            <div className="overflow-y-auto flex-1">
              {optionsList && optionsList.length > 0 ? (
                optionsList.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                     ( item?.id === currentId || item?.id === current_id) ? "bg-[#E1DCFF]" : ""
                    } h-8 w-full cursor-pointer hover:bg-[#E1DCFF] px-4 py-2 text-[#26212E] text-sm font-normal leading-4`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChangeHandler(labelName, item);
                      setCurrentValue(item?.name);
                      setCurrentId(item?.id);
                      setDropDownShow(false);
                      setSearchValue("");
                      setOptionList(options);
                    }}
                  >
                    {item?.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">No options available</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
