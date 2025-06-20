import React, { useState } from "react";
import config from "../../../config/config";

const CustomDropdown = ({ label, options, onChange, selectedValue, isDisabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <label className="mb-2 mt-4 block text-sm text-[#26212E]">{label}</label>
      <div
        className={`flex text-sm border border-[#DCD6FF] text-[#26212E] ${
          isDisabled ? "cursor-not-allowed" : "cursor-pointer"
        } justify-between rounded-md border bg-white px-4 py-2 shadow-sm`}
        onClick={() => !isDisabled && setIsOpen((prev) => !prev)}
      >
        {selectedValue}
        <img
          src={config.PUBLIC_URL + "/assets/images/amdital/down_arrow.svg"}
          alt=""
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full max-h-[250px] overflow-y-auto rounded-[4px] border bg-white shadow-[box-shadow: 2px_4px_4px_0px_#260B6A1A] text-sm text-[#26212E]">
          {options.map((option, index) => (
            <li
              key={index}
              className={`cursor-pointer text-sm text-[#26212E] px-4 py-2 hover:bg-[#E1DCFF] ${
                option === selectedValue ? "bg-[#E1DCFF]" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 h-full w-full"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default CustomDropdown;