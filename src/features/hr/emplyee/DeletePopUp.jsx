import React from 'react'
import config from '../../../config/config'
import Button from '../../../components/elements/amdital/ButtonNew';


export default function DeletePopUp(props) {
  return (
    <>  
        <div className=' p-6  relative bg-[#FFFFFF] rounded-lg flex flex-col  justify-center '>
            
            <div className=' absolute right-6 top-6 cursor-pointer ' onClick={props?.cancelHandler}   >
                <img src={config.PUBLIC_URL + "/assets/images/amdital/cross_icon_gray_color.svg"} alt=''/>
            </div>

            <div className=' mx-auto border border-[#FF0000] rounded-full w-[52px] h-[52px] flex justify-center items-center '>
            <img src={config.PUBLIC_URL + "/assets/images/amdital/delete_icon_red_color.svg"} alt=''/>
            </div>
            <div  className=' mt-6 mx-auto text-[#26212E] text-[18px] leading-5 font-semibold  '>Are you sure ?</div>
            <div className=' mt-2 text-base font-normal leading-5 text-[#26212E] w-[306px] text-center text-wrap '>{props?.text ? props?.text :"Do you really want to delete this record?  This process cannot be undone."}</div>
            <div className=' mt-4 border-t border-[#E1DCFF] flex justify-between pt-6  '>
                <Button
                        type="button"
                        buttonName={props?.buttonCLoseName}
                        buttonClassName = {` px-6 py-2 h-8 hover:bg-[#FFF2ED]  outline-none border-[#FF845C] tracking-[5%]  text-sm leading-4 font-semibold text-[#FF845C]  `}
                        spanClassName =" border-[#FFFFFF] "
                        // isLoading= {props?.buttonLoader}
                        onClick={props?.cancelHandler}                
                />
               <Button
                    type="button"
                    buttonName={props?.buttonDeleteName}
                    buttonClassName = {` px-6 py-2 h-8 hover:bg-[#F36A3D]  outline-none bg-[#FF845C] tracking-[5%]  text-sm leading-4 font-semibold text-[#FFFFFF]  `}
                    spanClassName =" border-[#FFFFFF] "
                    isLoading= {props?.buttonLoader}
                    onClick={props?.deleteHandler}
               />
            </div>

        </div>
    
    
    </>
  )
}
