import React from 'react'

export default function InputBoxNew(props) {
  return (
    <div className={props?.className}>
      <label className={` flex flex-row ` + props?.classLabel }>{props?.labelName}{props?.starIcon && <span className='text-[#EA4242]'>*</span>}</label>
      <input id={props?.id}
       value={props?.value} 
       name={props?.name} 
       className={props?.classInput} 
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
       />
    </div>
  )
}
