import React from 'react'
import config from '../../../config/config'

export default function RemoveFilterCompontent({searchParameter,filterParameter,removeSearchHandler,removeFilterHandler}) {
  return (
    <>
        <div className=' mt-4 flex items-center px-4'>
            {searchParameter?.length > 0 && <div className=' flex  items-center gap-1 bg-[#DCD6FF]  text-sm leading-5 tracking-[4%] font-medium p-1  rounded '>Remove Search
                <img onClick={removeSearchHandler} src={config.PUBLIC_URL + "/assets/images/amdital/cross_close_icon.svg"} alt='' className=' w-4 h-4 cursor-pointer'/>
                </div>}
            {filterParameter && <div className=' flex  items-center gap-1 bg-[#DCD6FF]  text-sm leading-5 tracking-[4%] font-medium p-1  rounded '>Remove Applied Filters
                <img onClick={removeFilterHandler} src={config.PUBLIC_URL + "/assets/images/amdital/cross_close_icon.svg"} alt='' className=' w-4 h-4 cursor-pointer'/>
                </div>}
        </div>
    </>
  )
}
