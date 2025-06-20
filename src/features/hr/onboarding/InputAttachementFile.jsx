import React from "react";
import config from "../../../config/config";

const InputAttachementFile = ({ name, onChange }) => {
  return (
    <>
      <label
        htmlFor={name}
        className="flex h-[100px] cursor-pointer items-center justify-center border border-[#E1DCFF] bg-[#F8F7FC]"
      >
        <div className="flex flex-col items-center gap-2">
          <img
            src={
              config.PUBLIC_URL +
              "/assets/images/amdital/onboarding/attachment.svg"
            }
            alt=""
            className="size-[18px]"
          />
          <p className="text-sm font-normal leading-4 text-[#9F9F9F]">
            Add Attachments
          </p>
        </div>
      </label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={onChange}
        className="hidden"
        accept="image/png, image/jpeg, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, application/pdf"
      />
    </>
  );
};

export default InputAttachementFile;
