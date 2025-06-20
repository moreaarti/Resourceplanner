import React, { useState } from "react";
import config from "../../../../config/config";

const EmployeeInputAttachementFile = ({ name, onChange }) => {
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Show file name
      onChange && onChange(e); // Notify parent
    }
    // Reset so same file can be picked again
    e.target.value = null;
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="flex h-14 cursor-pointer items-center justify-center border border-[#E1DCFF] bg-[#F8F7FC]"
      >
        <div className="flex flex-col items-center gap-2">
          <img
            src={
              config.PUBLIC_URL +
              "/assets/images/amdital/onboarding/attachment.svg"
            }
            alt="attachment-icon"
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
        onChange={handleChange}
        className="hidden"
        accept="image/png, image/jpeg, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, application/pdf"
      />

      {/* {fileName && (
        <p className="text-sm text-[#26212E] truncate" title={fileName}>
          Selected: <span className="font-medium">{fileName}</span>
        </p>
      )} */}
    </div>
  );
};

export default EmployeeInputAttachementFile;
