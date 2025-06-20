import React from "react";

import Button from "../../components/elements/amdital/ButtonNew";
import { config } from "dotenv";

export default function UpdatePopUp(props) {
  return (
    <>
      <div className=" relative  flex flex-col justify-center rounded-lg bg-[#FFFFFF]  p-6 ">
        <div
          className=" absolute right-6 top-6 cursor-pointer "
          onClick={props?.cancelHandler}
        >
          <img
            src={
              config.PUBLIC_URL +
              "/assets/images/amdital/cross_icon_gray_color.svg"
            }
            alt=""
          />
        </div>

        <div className=" mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#FF0000] ">
          <img
            src={
              config.PUBLIC_URL +
              "/assets/images/amdital/delete_icon_red_color.svg"
            }
            alt=""
          />
        </div>
        <div className=" mx-auto mt-6 text-[18px] font-semibold leading-5 text-[#26212E]  ">
          Are you sure ?
        </div>
        <div className=" mt-2 w-[306px] text-wrap text-center text-base font-normal leading-5 text-[#26212E] ">
          {props?.text
            ? props?.text
            : "Do you really want to delete this record?  This process cannot be undone."}
        </div>
        <div className=" mt-4 flex justify-between border-t border-[#E1DCFF] pt-6  ">
          <Button
            type="button"
            buttonName={props?.buttonCLoseName}
            buttonClassName={` px-6 py-2 h-8 hover:bg-[#FFF2ED]  outline-none border-[#FF845C] tracking-[5%]  text-sm leading-4 font-semibold text-[#FF845C]  `}
            spanClassName=" border-[#FFFFFF] "
            // isLoading= {props?.buttonLoader}
            onClick={props?.cancelHandler}
          />
          <Button
            type="button"
            buttonName={props?.buttonDeleteName}
            buttonClassName={` px-6 py-2 h-8 hover:bg-[#F36A3D]  outline-none bg-[#FF845C] tracking-[5%]  text-sm leading-4 font-semibold text-[#FFFFFF]  `}
            spanClassName=" border-[#FFFFFF] "
            isLoading={props?.buttonLoader}
            onClick={props?.deleteHandler}
          />
        </div>
      </div>
    </>
  );
}
