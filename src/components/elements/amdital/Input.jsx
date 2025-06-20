import React from 'react'

export default function Input(props) {
  return (
    <div className={` ${ props?.allowWrapperClass ? ` ` : ` w-full `} flex flex-col gap-1  ` + props?.wrapperClass}>
      <label className={` flex flex-row text-sm font-medium text-[#26212E] `}>{props?.labelName}{props?.required && props?.star_icon !== true && <span className='text-[#EA4242]'>*</span>}</label>
      <input id={props?.id}
      //  value={props?.value} 
       value={props?.value ?? ''}
       name={props?.name} 
       className={ ` px-4 py-2 border border-[#E1DCFF] rounded focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal placeholder:text-sm  text-[#26212E] bg-[#F8F7FC] ` +  props?.classInput} 
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
       onBlur={props?.onBlur}
       />
    </div>
  )
}