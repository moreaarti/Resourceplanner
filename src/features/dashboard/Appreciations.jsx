import React, { useState } from 'react'
import config from '../../config/config'

export default function Appreciations() {


    const [appreciationData,setAppreciationData] = useState([
        {
            image_background_color:"#FFF2ED",
            // image_border_color:"#FF845C",
            image:"/assets/images/amdital/best_employee_appreciation.svg",
            appreciation_name:"Employee Of The Month",
            profile_image:"/assets/images/amdital/profile_full.svg",
            name:"Yoshio SaiduRoy Pan",
            designation:"Designation",
            date:"30 Nov 2024",
            appreciation_text_color:"#FF845C"
        },
        {
            image_background_color:"#E1DCFF",
            // image_border_color:"#806BFF",
            image:"/assets/images/amdital/timer_appreciation.svg",
            appreciation_name:"Fastest Project Delivery",
            profile_image:"/assets/images/amdital/profile_full.svg",
            name:"Santosh Ngwenya",
            designation:"Project Manager",
            date:"30 Nov 2024",
            appreciation_text_color:"#806BFF"
        },
        {
            image_background_color:"#FFF2ED",
            // image_border_color:"#FF845C",
            image:"/assets/images/amdital/best_team_work_appreciation.svg",
            appreciation_name:"Best Team Work",
            profile_image:"/assets/images/amdital/profile_full.svg",
            name:"Helga OkonYing Zhong",
            designation:"Project Manager",
            date:"30 Nov 2024",
            appreciation_text_color:"#FF845C"
        },
    ]) 

    const appreciation_details = appreciationData?.map((item,i)=>{
        return <>
                <div className=' flex gap-5 w-full h-[75px] '>
                    <div  style={{background:item?.image_background_color}} className={` p-[10px] w-[50px] h-[50px] rounded  flex justify-center items-center `}>
                        <img src={config.PUBLIC_URL + item?.image} alt=''/>
                    </div>
                    <div className={` flex flex-col gap-[5px] `}>
                        <div style={{color:item?.appreciation_text_color}}  className={`text-sm font-semibold leading-4 `}>{item?.appreciation_name}</div>
                        <div className=' flex gap-[6px] h-[34px] '>
                            <div className=' relative w-[30px] h-[30px] rounded-full '>
                                <img  className=' w-full h-full absolute rounded-full ' src={config.PUBLIC_URL + item?.profile_image} alt=''/>
                            </div>
                            <div className=' flex flex-col  gap-[3px] '>
                                <div className=' text-[#26212E] text-sm  font-semibold leading-4  '>{item?.name}</div>
                                <div className=' text-[#26212E] font-normal text-sm leading-3 '>{item?.designation}</div>
                            </div>
                        </div>
                        <div className=' text-xs font-medium leading-4 text-[#C4C0DC]  '>{item?.date}</div>
                    </div>
                </div>
            </>
    })

  return (
    <div className=' w-full border border-[#E1DCFF] bg-[#FFFFFF] rounded-lg p-5 '>
        <div className=' flex justify-between '>
            <div className=' text-base leading-5 font-semibold text-[#26212E] '>Appreciations</div>
            <div className=' text-sm leading-4 font-normal text-[#26212E] '>November 2024</div>
        </div>
        <div className=' mt-10 flex flex-col gap-7 '>
            { appreciation_details }
        </div>
    </div>
  )
}
