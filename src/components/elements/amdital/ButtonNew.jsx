import React from 'react'

export default function ButtonNew(props) {
  return (
      <>
        { props?.isLoading ? 
            <button type={props?.type} onClick={(e)=>{props?.onClick(e)}}   className={` flex justify-center items-center gap-2 border rounded pointer-events-none  ` +  props?.buttonClassName} >
                <p>{props?.buttonName}</p>
                <span className={` button-loader w-[18px]  h-[18px] border-2 border-r-transparent rounded-full  ` +  props?.spanClassName } ></span>
            </button> :
            <button   type={props?.type} onClick={(e)=>{props?.onClick?.(e)}}  className={` ${ props?.disabled && ` opacity-[50%] pointer-events-none `} flex justify-center items-center border  rounded ` + props?.buttonClassName}>{props?.buttonName}</button>
        }      
      </>
  )
}
