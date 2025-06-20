import React from 'react'
import config from '../../config/config'

export default function Cards(props) {
  return (
    <div className=' w-full lg:min-w-[316px]  h-[120px] bg-[#FFFFFF] border border-[#E1DCFF] rounded flex '>
        <div className=' w-[120px]  p-3 '>
            <div className=' w-24 h-24  rounded-lg bg-[#806BFF] px-[27px] py-3 flex flex-col gap-1 justify-center items-center '>
                <img src={config.PUBLIC_URL +  props?.card?.image } alt='' className='  '/>
                <div className=' text-center text-base font-semibold leading-5 text-[#FFFFFF] '>{props?.card?.label}</div>
            </div>
        </div>
        <div className=' min-w-[196px] w-full border-l border-[#E1DCFF]  h-full   '>
            <div className=' flex  w-full  px-[27px] pt-[10px] pb-[7px] justify-between  items-center '>
                <div className=' text-base leading-5 font-normal'>{props?.card?.sub_label_one}</div>
                <div className=' text-[36px] leading-[44px] font-semibold text-[#806BFF] '>{props?.card?.sub_value_one}</div>
            </div>
            <div className=' w-full border-t border-[#E1DCFF] flex justify-between  px-[27px] pt-[10px] pb-[7px]   items-center '>
                <div className=' text-base leading-5 font-normal'>{props?.card?.sub_label_two}</div>
                <div className=' text-[36px] leading-[44px] font-semibold text-[#FF845C] '>{props?.card?.sub_value_two}</div>
            </div>
        </div>

    </div>
  )
}
