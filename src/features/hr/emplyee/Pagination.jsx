import React, { useEffect, useState } from 'react'
import config from '../../../config/config'

export default function Pagination(props) {

    const [showEntries,setShowEntries] = useState(false);
    const [showEntriesCurrentValue,setShowEntriesCurrentValue] = useState(props?.currentShowEntries)
  return (
    <>
        <div className=" flex  items-center  my-6  justify-between ">
          <div>
            <div className=" flex gap-2 items-center text-[#26212E] font-normal text-sm  leading-4 ">
                <div>Show</div>
                <div className=' relative min-w-[60px] max-w-[60px] '>
                    <div onClick={()=>{setShowEntries(!showEntries)}} className="  cursor-pointer relative min-w-[60px] max-w-[60px] h-8 flex justify-center items-center gap-2 rounded border-[#DCD6FF] border ">
                        <div>{showEntriesCurrentValue}</div>
                        <div className=' flex flex-col justify-center items-center '>
                            <img src={config.PUBLIC_URL + "/assets/images/amdital/dark_arrow_up.svg"} alt=''/>
                            <img src={config.PUBLIC_URL + "/assets/images/amdital/dark_arrow_down.svg"} alt='' />
                        </div>
                    </div>
                    {showEntries && <div className=' z-[1100] mt-1 custom-shadow-dropdown bg-[#FFFFFF] border border-[#E1DCFF] rounded  absolute  w-full flex flex-col justify-center py-2 text-center '>
                        {
                            [10,20,30].map((item)=>{
                               return <div onClick={()=>{setShowEntriesCurrentValue(item);props?.entriesHandler(item);setShowEntries(!showEntries)}} className={` ${item === showEntriesCurrentValue && ` bg-[#E1DcFF] `} cursor-pointer w-full h-8 p-2 hover:bg-[#E1DCFF] text-sm font-normal leading-4 `}>{item}</div>
                            })
                        }
                    </div>}
                    {
                       showEntries && <div className=' fixed inset-0  k z-[1000]' onClick={()=>{setShowEntries(!showEntries)}} ></div>
                    }
                </div>
                <div>entries</div>
            </div>
          </div>
          <div className=" flex gap-4">
          <div  onClick={props?.previousHandler} className={` ${props?.hasPreviousPage ? ` bg-[#E1DCFF]  cursor-pointer hover:text-[#FFFFFF]  hover:bg-[#806BFF] `  : ` pointer-events-none  `} flex justify-center items-center text-sm font-normal leading-4  w-[80px] h-8  border border-[#E1DCFF] rounded  `}>Previous</div>
          <div onClick={props?.nextHandler} className={` ${props?.hasNextPage ? ` bg-[#E1DCFF] cursor-pointer hover:text-[#FFFFFF] hover:bg-[#806BFF]  `  : ` pointer-events-none  `} flex justify-center items-center text-sm font-normal leading-4  w-[54px] h-8  border border-[#E1DCFF] rounded `} >Next</div>
          </div>
        </div>
    </>
  )
}
