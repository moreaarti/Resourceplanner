import React from "react";
import config from "../../../config/config";

const SubmitPopup = ({ onSubmit, onCancel }) => {
  return (
    <div className="w-[500px] rounded-lg bg-white">
      <div className="flex flex-col gap-6 p-8">
        <h3 className="flex items-center justify-between text-lg font-semibold leading-5 text-[#FF845C]">
          Submit
          <button onClick={onCancel}>
            <img
              src={
                config.PUBLIC_URL +
                "/assets/images/amdital/onboarding/close_bold.svg"
              }
              alt=""
              className="size-[14px]"
            />
          </button>
        </h3>
        <p className="text-sm font-normal leading-4 text-[#26212E]">
          Are you sure you want to submit your onboarding information?
        </p>
      </div>
      <div className="flex items-center justify-between rounded-b-lg bg-[#F8F7FC] px-6 py-4">
        <button
          onClick={onCancel}
          className="h-10 rounded border-2 border-[#FF845C] px-6 text-sm font-semibold leading-4 text-[#FF845C]"
        >
          No
        </button>
        <button
          onClick={onSubmit}
          className="h-10 rounded border-2 border-[#FF845C] bg-[#FF845C] px-6 text-sm font-semibold leading-4 text-white"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default SubmitPopup;
