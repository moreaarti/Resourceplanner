import React, { useState, useCallback, useRef, useEffect } from 'react';
import NavIcons from '../../components/elements/NavIcons';
import config from '../../config/config';
import { useSelector } from 'react-redux';


const CustomerSupport = (props) => {

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, placement: 'top' });

  const toggle_customer_support = useSelector(state=>state?.general?.showCustomerSupport);

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
    if (toggle_customer_support) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
      
      return () => {
        window.removeEventListener('scroll', calculatePosition);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [toggle_customer_support, calculatePosition]);


  const customer_support =[
                            {
                              image:"/assets/images/amdital/customer_support_one.svg",
                              title:"Support",
                              description:"Any questions? Ask away, we’re here to help"
                            },
                            {
                              image:"/assets/images/amdital/customer_support_two.svg",
                              title:"Blog",
                              description:"Get updates with the latest news and tips & tricks."
                            },
                            {
                              image:"/assets/images/amdital/customer_support_three.svg",
                              title:"Report A Bug",
                              description:"Come across something out of place? Report it & we’ll gwt it fixed"
                            },
                            {
                              image:"/assets/images/amdital/customer_support_four.svg",
                              title:"Community",
                              description:"Get connected with other RunCloud users."
                            },
                            {
                              image:"/assets/images/amdital/customer_support_five.svg",
                              title:"Documentation",
                              description:"More advanced and in-depth explanations about our products."
                            },
                            {
                              image:"/assets/images/amdital/customer_support_six.svg",
                              title:"Features Request",
                              description:"Join the conversation & help shape the future of RunCloud."
                            }
                          ]

    const customerData = customer_support?.map((item)=>{
      return <>
                <div className=' min-w-[252px]  max-w-[252px] min-h-[54px] max-h-[54px] flex gap-3'>
                  <div className=' relative flex justify-center items-center min-w-10 min-h-10 max-w-10 max-h-10  rounded-full bg-[#DCD6FF]'>
                    <img src={config.PUBLIC_URL + item?.image} alt='' className=' '/>
                  </div>
                  <div className=' flex flex-col gap-[5px] '>
                    <div className=' text-sm  font-semibold  leading-4 text-[#26212E] whitespace-normal block'>{item?.title}</div>
                    <div className=' text-xs font-normal leading-4 text-[#9F9F9F]   block whitespace-normal '>{item?.description}</div>
                  </div>


                </div>
      
      
      </>
    })


  return (
    <>
  <div className=' relative '>
    <NavIcons
        title={props.title}
        img={props.img}
        onClick={props.onClick}
        wrapperclass={props.wrapperclass}
        imgclass={props.imgclass}
      />
    <div
      ref={containerRef}
      className="relative top-1  "
    >
      <div className="flex items-center h-full  bg-black">
        {/* Tooltip */}
        {toggle_customer_support && (
          <div
            ref={tooltipRef}
            className={`
              fixed bg-white  -ml-16 rounded-lg py-1
              border border-[#E1DCFF]
              z-[9999]
              transition-opacity duration-150 ease-in-out
              text-sm checkout-box-shadow
            `}
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              opacity: toggle_customer_support ? 1 : 0,
            }}
          >
            {/* Tooltip Arrow */}
            <div 
              className={`
                absolute w-4 h-4 bg-white border-t border-l border-[#E1DCFF]
                transform rotate-45
                ${tooltipPosition.placement === 'top' ? 'bottom-[-6px] border-r border-b border-t-0 border-l-0' : 'top-[-8.5px]'}
              `}
              style={{
                left: '94%',
                marginLeft: '-6px',
              }}
            />
            
            {/* Tooltip Content */}
            <div className="relative bg-white rounded z-10 min-w-[560px]  max-w-[560px] min-h-[250px]  max-h-[270px]  px-[21px] py-7  ">
              <div className=' grid grid-cols-2 gap-[21px] '>
                {customerData}
              </div>            
            </div>
          </div>
        )}
      </div>
    </div>

    {toggle_customer_support && <div className=' fixed z-[1000]  inset-0' onClick={()=>{props.onClick()}} ></div>}
    </div>
    </>
  );
};

export default CustomerSupport;

