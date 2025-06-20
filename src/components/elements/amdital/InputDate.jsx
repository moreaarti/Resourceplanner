import React from 'react'
import config from '../../../config/config'

export default function InputDate(props) {
  return (
    <div className={`  w-full flex flex-col   ` + props?.wrapperClass}>
      <label className={` flex flex-row text-sm leading-4 font-medium text-[#26212E] `}>{props?.labelName}{props?.required && <span className='text-[#EA4242]'>*</span>} 
      {props?.questionMarkIcon && <img src={config.PUBLIC_URL + "/assets/images/amdital/question_mark_icon_orange.svg"} alt=''/>}
      </label>
      <input id={props?.id}
       value={props?.value} 
       name={props?.name} 
       className={ ` outline-none custom-date-input ${props?.disabled && `pointer-events-none`}  ` +  props?.classInput} 
       type={props.type} 
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
       onFocus={(e) => e.target.blur()} 
       onClick={(e) => e.target.showPicker()} 
       />
    </div>
  )
}