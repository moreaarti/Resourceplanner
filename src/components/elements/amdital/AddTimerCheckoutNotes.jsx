import React, { useState, useCallback, useRef, useEffect } from 'react';
import config from '../../../config/config';
import { SecondsToHoursNavbar } from './SecondsToHoursNavbar';



const AddTimerCheckoutNotes = (props) => {

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, placement: 'top' });
  // const [showTooltip, setShowTooltip] = useState(true);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  const calculatePosition = useCallback(() => {
    if (containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const spaceAbove = containerRect.top;
      const spaceBelow = window.innerHeight - containerRect.bottom;
      const placement = spaceBelow >= tooltipRect.height || spaceAbove < tooltipRect.height ? 'bottom' : 'top';
      const x = containerRect.left + (containerRect.width / 2) - (tooltipRect.width / 2);
      const y = placement === 'top' 
        ? containerRect.top - tooltipRect.height - 8 
        : containerRect.bottom + 8;

      setTooltipPosition({
        x: Math.max(16, Math.min(x, window.innerWidth - tooltipRect.width - 16)), 
        y,
        placement
      });
    }
  }, []);

  useEffect(() => {
    if (props?.showCheckoutPop) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
      
      return () => {
        window.removeEventListener('scroll', calculatePosition);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [props?.showCheckoutPop, calculatePosition]);


 const [formData,setFormData]= useState({chekoutNotes:""})

  return (
    <>
    <div
      ref={containerRef}
      className="relative -top-1 -right-5 "
    >
      <div className="flex items-center h-full">
        {/* Tooltip */}
        {props?.showCheckoutPop && (
          <div
            ref={tooltipRef}
            className={`
              fixed bg-white shadow-lg rounded-md py-1
              border border-[#E1DCFF] 
              z-[9999]
              transition-opacity duration-150 ease-in-out
              text-sm checkout-box-shadow
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
                absolute w-3 h-3 bg-white border-t border-l border-[#E1DCFF]
                transform rotate-45
                ${tooltipPosition.placement === 'top' ? 'bottom-[-6px] border-r border-b border-t-0 border-l-0' : 'top-[-7px]'}
              `}
              style={{
                left: '50%',
                marginLeft: '-6px',
              }}
            />
            
            {/* Tooltip Content */}
            <div className="relative  bg-white rounded z-10 min-w-[291px] max-w-[291px] min-h-[260px] max-h-[260px]  px-6 py-5  ">
                <div className=' text-sm font-medium flex justify-between'>
                    <div className=' text-lg text-[#26212E]  font-medium leading-5 '>Notes</div>
                    <img
                    src={config.PUBLIC_URL + "/assets/images/close_cross_icon_new.svg"}
                    alt=""
                    onClick={()=>{props?.showCheckoutPopButtonHandler()}}
                    className='cursor-pointer'
                    />
                </div>
                <textarea required  className={` mt-3 p-3 w-full min-h-[120px] max-h-[120px] border border-[#DCD6FF] rounded bg-[#FFFFFF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#74689273] text-sm font-medium leading-[25px] text-[#26212E] resize-none `} 
                        placeholder='Add optional note...' 
                        name='task_name'
                        value={props?.userNotes}
                        onChange={(e)=>{props?.onChange(e)}}
                        
                />
                <div className=' flex gap-4 mt-6 '>
                  <button onClick={()=>{props?.submitHandler()}} className={` ${props?.userNotes?.length > 0 ? ` ${props?.isLoading ? ` bg-[#F36A3D] ` : ` bg-[#FF845C] ` }  text-[#FFFFFF] ` : ` bg-[#FFF2ED] text-[#FFC9B8] pointer-events-none `} ${ props?.isLoading ? ` w-[100px] bg-[#F36A3D] ` : ` w-[82px] ` }  hover:bg-[#F36A3D]  rounded h-9 flex justify-center items-center gap-2 text-sm leading-4 tracking-[0.8px] font-bold  `}>
                    { props?.userNotes?.length>0 ? <img src={config.PUBLIC_URL + "/assets/images/amdital/tick_navbar.svg"} alt=''/>:
                    <img src={config.PUBLIC_URL + "/assets/images/amdital/tick_navbar_orange_color.svg"} alt=''/>}
                    Save
                    { props?.isLoading && <span className={` button-loader w-[18px]  h-[18px] border-2 border-r-transparent rounded-full  ` +  props?.spanClassName } ></span>}
                  </button>  
                  <button onClick={()=>{props?.showCheckoutPopButtonHandler()}} className=' hover:text-[#988FB1]  flex justify-center items-center text-sm leading-4 tracking-[0.8px] font-bold text-[#74689280]  '>
                   Cancel
                  </button> 
                </div>            
            </div>
          </div>
        )}
      </div>
    </div>

    {props?.showCheckoutPop && <div className=' fixed z-[1000]  inset-0' onClick={()=>{props?.showCheckoutPopButtonHandler()}} ></div>}
    </>
  );
};

export default AddTimerCheckoutNotes;
