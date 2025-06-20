import React from "react";
import config from "../../../config/config";

const AttachmentCard = ({ name, type, size, onDelete, fileUrl,cardSize }) => {
  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return bytes + " bytes";
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + " kb";
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + " mb";
    }
  };

  return (
    <div className={`flex ${cardSize?'h-14':'h-[100px]'} items-center justify-between rounded border border-[#E1DCFF] bg-[#F8F7FC] px-4`}>
      <div className={`flex items-center ${cardSize ? 'gap-4':'gap-2'}`}>
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
          className={`${cardSize ?'size-10':'size-14'}`}
        />
        <div className={`flex flex-col justify-center ${cardSize?'gap-1':'gap-2'}`}>
          <h3 className={`w-[200px] overflow-hidden text-ellipsis whitespace-nowrap ${cardSize?'text-base':'text-lg'} font-medium leading-5 text-[#26212E]`}>
            {name}
          </h3>
          <h6 className="text-sm font-normal leading-4 text-[#9F9F9F]">
            {formatFileSize(size)}
          </h6>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onDelete}>
          <img
            src={
              config.PUBLIC_URL + "/assets/images/amdital/onboarding/remove.svg"
            }
            alt=""
            className="size-[18px]"
          />
        </button>
        <button 
        onClick={() => window.open(fileUrl, "_blank")}
        >
          <img
            src={
              config.PUBLIC_URL + "/assets/images/amdital/onboarding/view.svg"
            }
            alt=""
            className="h-4 w-[22px]"
          />
        </button>
      </div>
    </div>
  );
};

export default AttachmentCard;
