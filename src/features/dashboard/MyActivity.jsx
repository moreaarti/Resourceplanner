import React, { useState } from 'react'
import config from '../../config/config'

export default function MyActivity() {


    const customStyles = `
    .scrollbar-thin::-webkit-scrollbar {
      width: 4px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background-color: #DCD6FF;
      border-radius: 8px;
    }
  `;


    const [appreciationData,setAppreciationData] = useState([
        {   
            date:"Nov 27",
            last_seen:"Just now",
            time:"02:30 pm",
            profile_image:"/assets/images/amdital/profile_full.svg",
            name:"David RichardsAmit Baloyi",
            description:"Short details about the activity he did",
        },
        {
            date:"Nov 27",
            last_seen:"2h 30m ago",
            time:"11:30 am",
            profile_image:"/assets/images/amdital/profile_full.svg",
            name:"Santosh Ngwenya",
            description:"Short details about the activity he did Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            date:"Nov 27",
            last_seen:"5h ago",
            time:"09:00 am",
            profile_image:"/assets/images/amdital/profile_full.svg",
            name:"Helga OkonYing Zhong",
            description:"Short details about the activity he did",
        },
        {
            date:"Nov 27",
            last_seen:"1 Day ago",
            time:"10:00 am",
            profile_image:"/assets/images/amdital/profile_full.svg",
            name:"Yoshio SaiduRoy Pan",
            description:"Short details about the activity he did",
        },
        {   
            date:"Nov 27",
            last_seen:"Just now",
            time:"02:30 pm",
            profile_image:"/assets/images/amdital/profile_full.svg",
            name:"David RichardsAmit Baloyi",
            description:"Short details about the activity he did",
        },
        {
            date:"Nov 27",
            last_seen:"2h 30m ago",
            time:"11:30 am",
            profile_image:"/assets/images/amdital/profile_full.svg",
            name:"Santosh Ngwenya",
            description:"Short details about the activity he did Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            date:"Nov 27",
            last_seen:"5h ago",
            time:"09:00 am",
            profile_image:"/assets/images/amdital/profile_full.svg",
            name:"Helga OkonYing Zhong",
            description:"Short details about the activity he did",
        },
        {
            date:"Nov 27",
            last_seen:"1 Day ago",
            time:"10:00 am",
            profile_image:"/assets/images/amdital/profile_full.svg",
            name:"Yoshio SaiduRoy Pan",
            description:"Short details about the activity he did",
        },
    ]) 

    const appreciation_details = appreciationData?.map((item,i)=>{
        return <>
                <div className=' flex gap-5 w-full relative pl-5 '>
                    <div className={` absolute w-[11px] h-[11px] bg-[#806BFF] rounded-full -left-[6px] top-0 `}></div>
                    <div className={` flex flex-col relative -top-[2px] `}>
                        <div className={`text-sm font-semibold leading-4  text-[#806BFF] `}>{item?.date}</div>
                        <div className=' flex  gap-[5px] mt-0.5 '>
                            <div className=' text-xs  font-normal leading-3 text-[#26212E] '>{item?.last_seen}</div>
                            <div className=' text-xs  font-normal leading-3 text-[#9F9F9F] ' >{item?.time}</div>
                        </div>
                        <div className=' flex gap-[6px] mt-[10px] '>
                            <div className=' relative w-[20px] h-[20px] rounded-full '>
                                <img  className=' w-full h-full absolute rounded-full ' src={config.PUBLIC_URL + item?.profile_image} alt=''/>
                            </div>
                            <div className=' text-[#26212E] text-sm  font-semibold leading-4  '>{item?.name}</div>
                        </div>
                        <div className=' text-[11px] font-medium leading-4 text-[#26212E] mt-0.5 '>{item?.description}</div>
                    </div>
                </div>
            </>
    })

  return (
    <div className=' w-full border border-[#E1DCFF] bg-[#FFFFFF] rounded-lg h-[515px] '>
        <div className=' flex justify-between px-6 py-4  border-b border-[#E1DCFF] '>
            <div className=' text-base leading-5 font-semibold text-[#26212E] '>My Activity</div>
            <div className=' text-sm leading-4 font-normal text-[#26212E] '>November 2024</div>
        </div>
        <div className=' px-6 pt-6 h-[460px] overflow-y-auto scrollbar-thin'>
            <style>{customStyles}</style>
            <div className=' flex flex-col gap-7   border-l-2 border-[#C4C0DC] border-dashed '>
                { appreciation_details }
            </div>
        </div>
        
    </div>
  )
}
