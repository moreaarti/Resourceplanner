import React from "react";
import config from "../../../../config/config";




const EmployeeImagePreview = ({ name, type, size, fileUrl,cardSize }) => {

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return bytes + " bytes";
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + " kb";
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + " mb";
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
        case "image/png":
            return "png";
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return "docx";
        case "application/msword":
            return "doc";
        case "image/jpeg":
            return "jpg";
        case "application/pdf":
            return "pdf";
        default:
            return "";
    }
};

  return (
    <div className={`flex gap-4 min-h-14 w-full items-center justify-between rounded border border-[#E1DCFF] bg-[#F8F7FC] px-4 py-1 `}>
      <div className={`flex items-center gap-4`}>
        <img
          src={
            config.PUBLIC_URL +
            `${
              type === "image/png"
                ? "/assets/images/amdital/onboarding/png.svg"
                : type ===
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ? "/assets/images/amdital/onboarding/docx.svg"
                : type === "application/msword"
                ? "/assets/images/amdital/onboarding/doc.svg"
                : type === "image/jpeg"
                ? "/assets/images/amdital/onboarding/jpg.svg"
                : type === "application/pdf"
                ? "/assets/images/amdital/onboarding/pdf.svg"
                : ""
            }`
          }
          alt=""
          className={` w-10 h-10 `}
        />
        <div className={`flex flex-col justify-center gap-1 `}>
          <h3 className={` min-w-[90%] break-all block  text-base  font-medium leading-5 text-[#26212E]`}>
            {name}.{getFileIcon(type)}
          </h3>
          <h6 className="text-sm font-normal leading-4 text-[#9F9F9F]">
            {formatFileSize(size)}
          </h6>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
        onClick={() => window.open(fileUrl, "_blank")}
        >
          <img
            src={
              config.PUBLIC_URL + "/assets/images/amdital/onboarding/view.svg"
            }
            alt=""
            className="h-4 min-w-[22px] max-w-[22px]"
          />
        </button>
      </div>
    </div>
  );
};

export default EmployeeImagePreview;
