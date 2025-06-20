import React, { useState, useCallback, useRef, useEffect } from "react";
import config from "../../../config/config";
import { SecondsToHoursNavbar } from "./SecondsToHoursNavbar";
import InputTextArea from "./InputTextArea";
import CheckoutWorkTime from "../../../features/hr/attendance/CheckoutWorkTime";
import CheckoutBreakTime from "../../../features/hr/attendance/CheckoutBreakTime";
import convertTo12HourFormat from "../../../features/hr/attendance/convertTo12HourFormat";

const AddCheckoutNotes = (props) => {
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0,
    placement: "top",
  });
  // const [showTooltip, setShowTooltip] = useState(true);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  const calculatePosition = useCallback(() => {
    if (containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const spaceAbove = containerRect.top;
      const spaceBelow = window.innerHeight - containerRect.bottom;
      const placement =
        spaceBelow >= tooltipRect.height || spaceAbove < tooltipRect.height
          ? "bottom"
          : "top";
      const x =
        containerRect.left + containerRect.width / 2 - tooltipRect.width / 2;
      const y =
        placement === "top"
          ? containerRect.top - tooltipRect.height - 8
          : containerRect.bottom + 8;

      setTooltipPosition({
        x: Math.max(
          16,
          Math.min(x, window.innerWidth - tooltipRect.width - 16),
        ),
        y,
        placement,
      });
    }
  }, []);

  useEffect(() => {
    if (props?.showCheckoutPop) {
      calculatePosition();
      window.addEventListener("scroll", calculatePosition);
      window.addEventListener("resize", calculatePosition);

      return () => {
        window.removeEventListener("scroll", calculatePosition);
        window.removeEventListener("resize", calculatePosition);
      };
    }
  }, [props?.showCheckoutPop, calculatePosition]);

  const check_in_time = convertTo12HourFormat(props?.attendance?.check_in_time);

  return (
    <>
      <div ref={containerRef} className="relative right-10 top-[38.5px]  ">
        <div className="flex h-full items-center">
          {/* Tooltip */}
          {props?.showCheckoutPop && (
            <div
              ref={tooltipRef}
              className={`
              checkout-box-shadow fixed  z-[9999] rounded-lg
              border border-[#E1DCFF]
              bg-white
              py-1 text-sm transition-opacity
              duration-150 ease-in-out
            `}
              style={{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y}px`,
                opacity: props?.showCheckoutPop ? 1 : 0,
              }}
            >
              {/* Tooltip Arrow */}
              <div
                className={`
                absolute h-4 w-4 rotate-45 transform border-l border-t
                border-[#E1DCFF] bg-white
                ${
                  tooltipPosition.placement === "top"
                    ? "bottom-[-6px] border-b border-l-0 border-r border-t-0"
                    : "top-[-8.5px]"
                }
              `}
                style={{
                  left: "85%",
                  marginLeft: "-6px",
                }}
              />

              {/* Tooltip Content */}
              <div className="relative z-10 max-h-[442.5px] min-h-[440px] min-w-[560px]  max-w-[560px] rounded  bg-white   ">
                <div className="h-[366px] w-full px-[30px] pt-6 ">
                  <div className=" flex justify-between text-sm font-medium">
                    <div className=" text-lg  font-semibold leading-5 text-[#FF845C] ">
                      Check Out
                    </div>
                    <img
                      src={
                        config.PUBLIC_URL +
                        "/assets/images/amdital/cross_icon_gray_color.svg"
                      }
                      alt=""
                      onClick={() => {
                        props?.showCheckoutPopButtonHandler();
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className=" mt-5 flex w-full items-center gap-2">
                    <div className="flex h-[70px]  w-full justify-between gap-[54px] rounded  border border-[#E1DCFF] bg-[#EEEBFF] px-[34px] py-[15px] uppercase ">
                      <div className="  flex flex-col gap-[7px] text-center ">
                        <div className=" whitespace-nowrap text-sm font-semibold leading-4 text-[#260B6A]">
                          Check In
                        </div>
                        <div className=" whitespace-nowrap text-sm  font-semibold leading-4  text-[#26212E] ">
                          {" "}
                          {check_in_time}
                        </div>
                      </div>
                      {/* <div className='  flex flex-col gap-[7px] text-center '>
                            <div className=' text-sm font-semibold leading-4 text-[#260B6A]  whitespace-nowrap'>CHECKOUT</div>
                            <div className='  text-sm font-semibold  leading-4 text-[#26212E]  whitespace-nowrap '>{check_out_time}</div>
                        </div> */}

                      <div className="  flex flex-col gap-[7px] text-center ">
                        <div className=" whitespace-nowrap text-sm font-semibold leading-4  text-[#260B6A] ">
                          Breaks
                        </div>
                        <div className="  whitespace-nowrap text-sm  font-semibold leading-4  text-[#26212E] ">
                          <CheckoutBreakTime />
                        </div>
                      </div>
                      <div className="  flex flex-col gap-[7px] text-center ">
                        <div className=" whitespace-nowrap text-sm font-semibold leading-4  text-[#260B6A] ">
                          worked
                        </div>
                        <div className="  whitespace-nowrap text-sm  font-semibold leading-4  text-[#26212E]  ">
                          <CheckoutWorkTime />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" mt-5 ">
                    <label className="  text-sm font-semibold leading-[16px] text-[#26212E] ">
                      Check Out Note <span className="text-[#EA4242]">*</span>
                    </label>
                    <InputTextArea
                      id="task_name"
                      value={props?.checkout_notes}
                      onChange={(e) => {
                        props?.onChange(e);
                      }}
                      autoComplete="autoComplete"
                      placeholder="Type here"
                      name="task_name"
                      classInput=" w-full h-[150px] "
                      // labelName={"Check Out Note"}
                      // required
                      wrapperClass={"  "}
                    />
                  </div>
                </div>
                <div className=" flex h-[80.5px] w-full items-center gap-4 rounded-b-lg bg-[#F8F7FC] px-[30px] py-4">
                  {/* <button onClick={()=>{props?.checkoutHandler()}} className=' bg-[#F36A3D] w-full mt-4 rounded h-9 flex justify-center items-center gap-2 text-sm leading-4 tracking-[0.8px] font-bold text-[#FFFFFF]  '>
                  <img src={config.PUBLIC_URL + "/assets/images/amdital/tick_navbar.svg"} alt='kkkkk'/>
                  Check out
                </button>  */}
                  <button
                    onClick={() => {
                      props?.checkoutHandler();
                    }}
                    className={` ${
                      props?.isLoading ? ` bg-[#F36A3D]  ` : ` bg-[#FF845C] `
                    } max-[160px] flex  h-[48px] min-w-[160px] items-center justify-center gap-2 rounded text-sm font-bold leading-4 tracking-[0.8px] text-[#FFFFFF] hover:bg-[#F36A3D]  `}
                  >
                    <img
                      src={
                        config.PUBLIC_URL +
                        "/assets/images/amdital/tick_navbar.svg"
                      }
                      alt=""
                    />
                    Check out
                    {props?.isLoading && (
                      <span
                        className={
                          ` button-loader h-[18px]  w-[18px] rounded-full border-2 border-r-transparent  ` +
                          props?.spanClassName
                        }
                      ></span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      props?.showCheckoutPopButtonHandler();
                    }}
                    className=" flex  items-center justify-center text-sm font-bold leading-4 tracking-[0.8px] text-[#74689280] hover:text-[#988FB1]  "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {props?.showCheckoutPop && (
        <div
          className=" fixed inset-0  z-[1000]"
          onClick={() => {
            props?.showCheckoutPopButtonHandler();
          }}
        ></div>
      )}
    </>
  );
};

export default AddCheckoutNotes;
