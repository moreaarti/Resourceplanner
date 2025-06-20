import React from 'react';

export default function InputTextArea(props) {
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const value_html = props?.value ? stripHtml(props.value) : '';

  return (
    <div className={`w-full flex flex-col gap-2 ${props?.wrapperClass || ''}`}>
      <label className="flex flex-row text-sm leading-4 font-medium text-[#26212E]">
        {props?.labelName}
        {props?.required && <span className="text-[#EA4242]">*</span>}
      </label>
      <textarea
        id={props?.id}
        value={value_html}
        name={props?.name}
        className={`px-4 py-2 border border-[#DCD6FF] rounded bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] resize-none ${props?.classInput || ''}`}
        required={props?.required}
        placeholder={props?.placeholder}
        readOnly={props?.readOnly}
        autoComplete={props?.autoComplete}
        disabled={props?.disabled}
        onChange={props?.onChange}
        minLength={props?.minLength}
        maxLength={props?.maxLength}
        title={props?.title}
        min={props?.min}
        pattern={props?.pattern}
        onPaste={props?.onPaste}
        onBlur={props?.onBlur}
      />
    </div>
  );
}
