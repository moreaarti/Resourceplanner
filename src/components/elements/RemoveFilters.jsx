import React from 'react'
import config from '../../config/config'

export default function  RemoveFilters (props) {


  return (
    <>

        <div className='flex gap-2  items-center group  cursor-pointer w-fit ' onClick={()=>{props?.removeFilterHandler()}}>
            <div className={` w-5 h-5 bg-[#5B5B5B] group-hover:bg-[#00B656] rounded flex items-center justify-center  `}>
                <img src={config.PUBLIC_URL +  "/assets/images/close_cross_icon_white_new.svg" }  alt='remove-filter'/>
            </div>
            <div className=' text-sm  font-medium text-[#5B5B5B] group-hover:text-[#00B656] '>Clear applied filters</div>
        </div>
    
    
    
    
    
    
    </>    
  )
}
