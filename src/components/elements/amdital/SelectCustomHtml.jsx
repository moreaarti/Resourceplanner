import React, { useState, useRef, useEffect } from "react";
import config from "../../../config/config";

export default function SelectCustomHtml({ labelName, labelClass,required, imageProject,inputClass,
  current_value, current_id, options, dropDownClassName , dropDownHeight,onChangeHandler }) {
  const [dropDownShow, setDropDownShow] = useState(false);
  const [currentValue, setCurrentValue] = useState(current_value);
  const [currentId,setCurrentId]=useState(current_id)
  const [openAbove, setOpenAbove] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (dropDownShow && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setOpenAbove(spaceBelow < dropDownHeight && spaceAbove > spaceBelow);
    }
  }, [dropDownShow]);

  return (
    <div className="flex flex-col gap-2 relative">
       <label className={` flex flex-row text-sm leading-4 font-medium text-[#26212E] ` + labelClass}>{labelName}{required && <span className='text-[#EA4242]'>*</span>}  {imageProject &&<img src={config.PUBLIC_URL+"/assets/images/amdital/performance_checkbox_remainder.svg"} className=' pl-2 ' alt="remainder"/>}</label>
      <div className="relative" ref={dropdownRef}>
        <div
          className={`relative cursor-pointer flex justify-between items-center ${
            dropDownShow ? "border-[#806BFF] border-2" : "border-[#DCD6FF]"
          }  border rounded bg-[#FFFFFF] px-4 py-2 z-[900]`+ inputClass }
          onClick={() => setDropDownShow(!dropDownShow)}
        >
          <div className="w-[80%] overflow-hidden truncate text-[#26212E] text-sm font-normal leading-4">
            {currentValue}
          </div>
          <img
            src={config.PUBLIC_URL + "/assets/images/amdital/arrow_down_arrow.svg"}
            alt=""
            className={dropDownShow ? "rotate-180" : ""}
          />
        </div>
        {dropDownShow && (
          <div
            className={` flex flex-col w-full  overflow-auto absolute ${
              openAbove ? "bottom-full mb-2" : "top-full mt-2"
            } border border-[#E1DCFF] bg-[#FFFFFF] rounded z-[1100] ` + dropDownClassName }
          >
            {options.map((item, index) => (
              <div
                key={index}
                className={` ${item?.id === currentId && ` bg-[#E1DCFF] `} h-8 w-full cursor-pointer hover:bg-[#E1DCFF] px-4 py-2 text-[#26212E] text-sm font-normal leading-4 `}
                onClick={() => {
                  onChangeHandler(labelName,item);
                  setCurrentValue(item?.name);
                  setCurrentId(item?.id)
                  setDropDownShow(false);
                 
                }}
              >
                {item?.name}
              </div>
            ))}
          </div>
        )}
        {dropDownShow && (
          <div
            className="fixed inset-0 z-[1000]"
            onClick={() => setDropDownShow(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
