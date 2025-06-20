import React, { } from 'react'
import { useSelector } from 'react-redux';


const OnboardingNavbar = (props) => {
    const onboarding_redux = useSelector(store=>store?.onboarding)
    const  token_details =onboarding_redux?.onboarding_employee_authentication_data;
    const token =token_details?.authToken;
    const graphqlId = token_details?.user?.id;
    const user_id = token_details?.user?.userId;
  
    const employee_data_redux = onboarding_redux?.onboarding_employee_data;

  return (
    <nav className={` min-h-14  fixed w-full  max-h-14  bg-[#DCD6FF] z-[1000] top-0  `}>
        <div className={` w-full h-full flex  justify-between  `}>
          <div className=" w-full min-h-14  max-h-14 flex items-center  justify-between px-6 py-2 ">
            <div className=" w-[200px] block overflow-hidden truncate text-[20px] font-medium text-[#260B6A] leading-6 ">{props?.breadCrumb}</div>
            <div className="  h-full w-full flex items-center gap-4 justify-end  ">
                <div
                  className="group relative flex items-center justify-center gap-[6px]"
                >
                      <button className="flex items-center justify-center ">
                        {employee_data_redux?.profileImage ? 
                          <img
                            src={employee_data_redux?.profileImage}
                            alt=""
                            className="h-11 w-11 border-2 border-[#FFFFFF] min-w-11 rounded-[50%]  nav-bar-img "
                          />
                          :
                          <div className="flex h-11 border-2 border-[#FFFFFF] w-11  text-2xl font-semibold items-center justify-center rounded-[50%] bg-[#806BFF]  text-white ">
                          {employee_data_redux?.firstName?.[0]}
                        </div>
                        }
                      </button>  
                </div>
            </div>
          </div>
        </div>     
      
    </nav>
  );
};

export default OnboardingNavbar;
