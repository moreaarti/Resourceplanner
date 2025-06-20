import React from 'react'
import config from '../../config/config'
import { useSelector } from 'react-redux';

export default function EmployeeData(props) {

    const userDateRedux = useSelector((state) => state?.auth?.data?.user);
      const profile_image =userDateRedux?.profileImage;
      const FirstName = userDateRedux?.firstName;
      const LastName = userDateRedux?.lastName;
      const empName = FirstName + " " + LastName;
      const empId = userDateRedux?.memberID;
      const empRole = userDateRedux?.userRole;
      const profile_name = FirstName + " " + LastName
      const profile_first_letter = profile_name ? profile_name?.split("") : "";
      
  return (
    <div className=' w-full lg:w-[448px] h-[120px] bg-[#FFFFFF] border border-[#E1DCFF] rounded flex '>
        <div className=' flex gap-4  w-[280px] p-3 '>
            <div className=' w-24 h-24  rounded-lg '>
               { profile_image === "" ? <div className=' bg-[#806BFF] w-full h-full uppercase  rounded-lg flex justify-center items-center text-[40px] font-bold text-[#FFFFFF] '>{profile_first_letter[0]}</div> :<img className=' w-full h-full rounded-lg ' src={profile_image} alt=""/>}
            </div>
            <div className=' flex flex-col gap-3 '>
                <div  className=' flex flex-col gap-[2px] '>
                    <div className=' text-base w-[105px] leading-5 font-semibold text-[#FF845C] whitespace-nowrap block truncate  overflow-hidden '>{empName}</div>
                    <div className=' text-sm leading-4 font-normal text-[#9F9F9F] capitalize'>{empRole}</div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className=' text-sm font-semibold leading-4 text-[#26212E] '>Employee ID</div>
                    <div className=' text-sm font-normal leading-4 text-[#26212E] capitalize '>{empId}</div>
                </div>
            </div>
        </div>
        {/* <div className=' w-[168px] hidden p-4 bg-[#EEEBFF] min-[1500px]:flex flex-col gap-[6px] '> */}
         <div className=' w-[168px]  p-4 bg-[#EEEBFF] min-[1500px]:flex flex-col gap-[6px] '>
            <div className=' text-[#806BFF] text-lg  leading-4 font-bold '>{"Welcome :)"}</div>
            <div className=' flex gap-1 flex-wrap items-center  text-xs font-normal  leading-4 text-[#26212E] '>
                <div>Hi,</div>
                <img src={config.PUBLIC_URL + "/assets/images/amdital/waving_hand.svg"} alt=''/>
                <div className='w-[150px] truncate overflow-hidden block capitalize '>{empName}</div>
                <div>Have a good day!</div>
            </div>
        </div>
    </div>
  )
}
