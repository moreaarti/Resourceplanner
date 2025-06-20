import React from 'react';
import config from "../../config/config";

const DetailsListingBox=(props)=>{
  return (
    <>
        <div className='w-full bg-[#FFFFFF] boder border-[#E5E9E5] rounded'>
            <p className='header_h3 text-center'>{props?.tagsText}{props?.projectText}{props?.inviteText}</p>
            <p className='mt-4 normal_content_black text-center '>{props?.tagsDesText}{props?.projectDesText}{props?.inviteDes}</p>
            <div className='flex justify-center mt-10'>
                <div className='flex justify-center items-center'>
                    <button className=' custom-shadow w-auto px-4 py-[10px]  bg-[#00B656]  gap-2  hover:bg-[#00D967] green_button' onClick={props.submithandler}>
                          <img className='whitespace-nowrap' src={ config.PUBLIC_URL + "/assets/images/plus_symbol_icon_new.svg"} alt=''/>{props?.ListingBoxButtonName}
                      </button>
                </div>
            </div>

        </div>
    
    
    </>
  )
}
export default DetailsListingBox;