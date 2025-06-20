import React from "react";
import { Link } from "react-router-dom";

const Cards = (props) => {

  return (
    <>
  
  <Link to={props?.link}><div className={"rounded relative p-6 bg-[#FFFFFF] border  custom-shadow cursor-pointer " + props?.wrapperclass}>
      <div className="flex w-full items-center gap-4  ">
        <div className=" min-w-[48px] h-12 bg-[#F3F3F3] rounded-full flex justify-center items-center">
            <img className=" " src={props?.img1} alt={props?.alt1}  />
        </div>
        <div className=" w-full flex flex-col gap-1 ">
            <h2 className={" header_h2 -ml-[1px] "}>{props?.number}</h2>
            <h4 className={"whitespace-nowrap normal_content_black "}>{props?.label}</h4>
        </div>
      </div>
      { props?.page_name === "Dashboard" && props?.label !== "Site Health" && <div className={` absolute top-6 right-6 `}><div className="flex gap-1 items-center">
                {props?.percentage !== "0.00" ? <img src={props?.img2} alt={props?.alt1} className="w-4 h-4"/>: <img src={props?.img3} alt={props?.alt1} className="w-4 h-4"/>}
                <p className={` font-medium leading-4 text-sm ${props?.percentage !== "0.00" ? props?.sucessText : props?.failureText } `} >{props?.percentage}%</p>
              </div></div>}
    </div></Link>
  </>  
   
  );
};

export default Cards;
