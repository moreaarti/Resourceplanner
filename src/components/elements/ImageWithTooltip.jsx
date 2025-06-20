import React, { useRef, useState } from 'react'

export default function ImageWithTooltip(props) {

    const [MouseEffect,setMouseEffect]= useState(false);

    const [dialogBoxcordinates,setDialogBoxCordinates] = useState({x:0,y:0})

    const imageRef = useRef(null);

    const onMouseOverHandler=(e)=>{
        e.stopPropagation();
        const rect = imageRef.current.getBoundingClientRect();
        const newCoordinates = {x: rect.left,y:rect.top + 34}
        setDialogBoxCordinates(newCoordinates)
        setMouseEffect(true)
    }

    const onMouseOutHandler=(e)=>{
        setMouseEffect(false)
    }

  return (
    <div  onMouseOver={onMouseOverHandler} onMouseOut={onMouseOutHandler} ref={imageRef} onClick={()=>{props?.onClick()}} className='  relative flex group flex-col '>
        < img src={props?.imageSrc} alt=''  className={ props?.imageCss }/>
        <div  style={{'top':dialogBoxcordinates.y,"left":dialogBoxcordinates.x}} className={` fixed z-[1100] ${ MouseEffect ? ` block  ` : `  hidden ` } `}>
        <div className={ ` absolute z-50  w-3.5 h-3.5 -mt-[6.5px] -rotate-45  ml-[10px] border-t border-r  border-[#BFECD4]    bg-[#E6F8EF]  ` }> </div>
        <div  className={ `   border-[#BFECD4] border rounded relative  min-w-[71px] h-8 bg-[#E6F8EF] flex px-2 justify-center items-center  ` } > <p className="z-[1000]  text-xs leading-5 font-normal text-[#1C1C1C] "> {props?.tooltipText}</p> </div>
            
        </div>
    </div>
  )
}
