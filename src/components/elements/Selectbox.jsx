import React, { useState, useEffect, useRef } from "react";
import config from "../../config/config";

const Selectbox = (props) => {
  const [value, setValue] = useState(props.currentvalue);
  const [showoption, setShowoption] = useState(false);
  const [dropdowndata, setDropdowndata] = useState(props?.Options);
  const [openAbove, setOpenAbove] = useState(false); // New state to handle above or below dropdown
  const dropdownRef = useRef(null);

  const customStyles = `
    .scrollbar-thin::-webkit-scrollbar {
      width: 4px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background-color: #DCD6FF;
      border-radius: 8px;
    }
  `;

  useEffect(() => {
    // Inject custom scrollbar styles into the document head
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet); // Clean up on unmount
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowoption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowoption(!showoption);

    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - dropdownRect.bottom;
      const dropdownHeight = 240; // Assume dropdown height or dynamically calculate it

      if (spaceBelow < dropdownHeight) {
        setOpenAbove(true); // Not enough space below, open above
      } else {
        setOpenAbove(false); // Enough space below, open normally
      }
    }
  };

  const searchHandler = (e) => {
    const searchvalue = e.target.value?.toLowerCase();

    if (props.name_of_dropdown === "country_and_states_dropdown" && searchvalue.length > 0) {
      const searchdata = props?.Options?.filter((val) =>
        val?.props?.children.toLowerCase().toString()?.includes(searchvalue)
      );
      setDropdowndata(searchdata);
    }
    if (searchvalue?.length === 0) {
      setDropdowndata(props?.Options);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`flex w-full justify-between rounded border p-2 lg:p-3 ${
          showoption ? "border-[#2dbf41]" : ""
        } ${props?.className}`}
        onClick={toggleDropdown}
      >
        <div className={`flex ${props.insideclass}`}>
          {props.beforevalue}
          <p className={props.nestedclass}>{value}</p>
        </div>
        <img
          src={config.PUBLIC_URL + (showoption ? props.chevronup : props.chevrondown)}
          alt=""
        />
      </div>

      {showoption && (
        <div 
          className={`absolute z-20 w-full rounded border bg-white ${props?.classdrop}`} 
          style={{ top: openAbove ? "auto" : "100%", bottom: openAbove ? "100%" : "auto" }} // Open above or below based on the state
        >
          {props?.name_of_dropdown !== "Normal_dropdown" && (
            <div className="flex border-b pl-2">
              <input
                type="search"
                className="searchimageselecbox w-full cursor-pointer py-2 pl-6 outline-none"
                placeholder="Search.."
                onChange={searchHandler}
              />
            </div>
          )}
          <div className="max-h-60 overflow-y-auto scrollbar-thin">
            {dropdowndata?.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setValue(item);
                  setShowoption(false);
                  props.onChange(item);
                }}
                className={`cursor-pointer py-2 px-3 hover:bg-gray-100 ${
                  value?.toLowerCase() === item?.toLowerCase() ? 'bg-[#00B6561A]' : ''
                } ${props.insidedropclass}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Selectbox;
