import React from "react";

const PlanPoints = (props) => {
  return (
    <>
      <div className={` flex py-3 text-sm font-normal leading-5 text-[#1C1C1C]  ${props?.index !== 0 && ` border-t border-[#EAEAEA] ` } `}>
        {/* <img className={"mr-3 h-6 w-6" + props.class} src={props.img} alt={props.alt} /> */}
        <span className={""}>
          {props.title}
        </span>
      </div>
    </>
  );
};

export default PlanPoints;
