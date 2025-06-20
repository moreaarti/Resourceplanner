import React from 'react'
import { useSelector } from 'react-redux';
import config from '../../../config/config';
import ProfileDropdown from '../ProfileDropdown';

export default function MultiSiteNavbar() {

    const userDateRedux = useSelector((state) => state?.auth?.data?.user);
    const profile_image =userDateRedux?.profileImage;
    const FirstName = userDateRedux?.firstName;
    const LastName = userDateRedux?.lastName;
    const profile_name = FirstName + " " + LastName
    const profile_first_letter = profile_name ? profile_name?.split("") : "";
    const email =  userDateRedux?.email;


  return (
    <>
        <div className=' max-h-[56px] w-full  min-h-[56px] bg-[#DCD6FF] flex justify-between px-7 '>

             <div className={` px-4 relative flex items-center  min-w-[200px] max-w-[200px]  min-[1400px]:min-w-[228px]  min-[1400px]:max-w-[228px]   `}>
                       <img  className={` relative cursor-pointer w-auto min-h-[26px]  max-h-[26px]   `} 
                            src={config.PUBLIC_URL + "/assets/images/amdital/amdital_dark_blue_logo.svg"} alt=""/>
                    </div>


            <div className="group relative flex items-center justify-center gap-[6px]"
                    // onClick={openProfileHandler}
                    >
                        <button className="flex items-center justify-center ">
                            {profile_image === "" ? (
                            <div className="flex h-9 border-2 uppercase border-[#FFFFFF] w-9  items-center justify-center rounded-[50%] bg-[#806BFF]  text-white ">
                                {profile_first_letter?.[0]}
                            </div>
                            ) : (
                            <img
                                src={profile_image}
                                alt=""
                                className="h-9 w-9 border-2 border-[#FFFFFF]  rounded-[50%]  nav-bar-img "
                            />
                            )}
                        </button>
                    {/* <img className="cursor-pointer min-w-[20px] min-h-[20px] ml-1 max-[500px]:hidden  group-hover:hidden"    src={config.PUBLIC_URL + "/assets/images/downward_arrow_new.svg"} alt=""  /> */}
                    <img className="cursor-pointer ml-1 w-3 h-3 "   src={config.PUBLIC_URL + "/assets/images/amdital/profile_dropdown.svg"} alt=""  />
                    <ul
                        className={
                        " absolute -right-[24px] top-[50px] hidden z-[1200] -mt-4  pt-2 group-hover:block max-sm:-right-8  sm:mx-6 "
                        }
                    >
                        <ProfileDropdown
                        hideProfile={true}
                        name={profile_name}
                        profile_image={profile_image}
                        email={email}
                        />
                    </ul>

            </div>

        </div>
    
    
    
    
    
    </>
  )
}
