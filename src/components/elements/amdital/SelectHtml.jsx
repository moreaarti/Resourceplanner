import React from 'react'
import config from '../../../config/config';

export default function SelectHtml(props) {
  

    const optionsValues = props?.optionData?.map((o, i) => {
        return (
          <option value={o.id} key={i}>
            {o.name}
          </option>
        );
      });

  return (
    <div className={`  ${props?.allowWrapperClass ? ` ` : ` w-full `} flex flex-col gap-2  ` + props?.wrapperClass}>
         <label className={` flex flex-row text-sm leading-4 font-medium text-[#26212E] ` + props?.labelClass}>{props?.labelName}{props?.required && <span className='text-[#EA4242]'>*</span>}  {props?.imageProject &&<img src={config.PUBLIC_URL+"/assets/images/amdital/performance_checkbox_remainder.svg"} className=' pl-2 ' alt="remainder"/>}</label>
        <select
            id={props?.id}
            className={ ` custom-select px-4 py-2 border border-[#DCD6FF] rounded bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E]  ` +  props?.classInput} 
            name={props?.name}
            onChange={props?.onChange}
            value={props?.value}
            required={props?.required}
            disabled={props?.disabled}
            readOnly={props?.readOnly} 
            autoComplete={props?.autoComplete}
            pattern={props?.pattern}
            title={props?.title}   
        >
            <option value="" >{props?.placeholder}</option>
                {optionsValues}
        </select>
    </div>
  )
}
