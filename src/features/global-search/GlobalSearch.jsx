import React, { useState, useCallback, useRef, useEffect } from 'react';
import NavIcons from '../../components/elements/NavIcons';
import config from '../../config/config';
import { useSelector } from 'react-redux';



const GlobalSearch = (props) => {

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, placement: 'top' });

  const toggle_global_search = useSelector(state=>state?.general?.showGlobalSearch);

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
    if (toggle_global_search) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
      
      return () => {
        window.removeEventListener('scroll', calculatePosition);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [toggle_global_search, calculatePosition]);


  const [showPopUp,setShowPopUp] = useState(false);

  const [currentValue,setCurrentValue] = useState("Project");

  const dropDownArray = ["All","Project","Task","Member","Client","Team","Tags","Document","Chat","Overview"];

  const [dropDownData,setDownData]=useState(dropDownArray);

  

  const dropDownValue =  dropDownData?.map((item)=>{
    return <div className=' cursor-pointer' onClick={()=>{setCurrentValue(item);showPopUpHandler()}}>{item}</div>
  })

  // functions

  const showPopUpHandler = ()=>{
      setShowPopUp(!showPopUp);
      setDownData(dropDownArray);
  }


  const onChangeInputHandler = (e) =>{
    const inputValue = e?.target?.value?.toLowerCase();
    if(inputValue?.length > 0){
      const searchData = dropDownArray?.filter(item=>item.toLowerCase()?.includes(inputValue));
      setDownData(searchData)
    }
    else{
      setDownData(dropDownArray)
    }
  }



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
        {toggle_global_search && (
          <div
            ref={tooltipRef}
            className={`
              fixed bg-white  -ml-10 rounded-lg py-1
              border border-[#E1DCFF]
              z-[9999]
              transition-opacity duration-150 ease-in-out
              text-sm checkout-box-shadow
            `}
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              opacity: toggle_global_search ? 1 : 0,
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
                left: '85.5%',
                marginLeft: '-6px',
              }}
            />
            
            {/* Tooltip Content */}
            <div className="relative bg-white rounded z-10 min-w-[750px]  max-w-[750px] min-h-[232px]  max-h-[232px] ">

                <div className=' w-full px-[29px] pt-6 '>
                                <div className=' text-sm font-medium flex justify-between'>
                                    <div className=' text-lg  font-semibold text-[#FF845C] leading-5 '>Search</div>
                                    <img
                                    src={config.PUBLIC_URL + "/assets/images/close_cross_icon_new.svg"}
                                    alt=""
                                    onClick={()=>{props.onClick()}}
                                    className='cursor-pointer'
                                    />
                                </div>         
                </div>
                <div className=' px-[30px] pt-6 pb-[30px]'>
                    <div className=' h-[50px] flex gap-[18px] '>
                      <div className=' relative '>
                          <div className=' cursor-pointer w-[200px] h-full flex items-center justify-between  relative border border-[#E1DCFF] rounded-lg bg-[#FFFFFF] px-4 py-[10px] ' onClick={showPopUpHandler}>
                              <div className=' text-sm font-normal leading-4 text-[#26212E]  w-[80%]  relative'>{currentValue}</div>
                              {
                                showPopUp ? <img className=" w-4 h-4 rotate-180 " src={config.PUBLIC_URL + "/assets/images/amdital/left_arrow.svg"} alt=''/> : 
                                <img className=" w-4 h-4 " src={config.PUBLIC_URL + "/assets/images/amdital/left_arrow.svg"} alt=''/>
                              }
                          </div>
                          { showPopUp && <div className=' absolute z-40  mt-0.5 bg-[#FFFFFF] border border-[#E1DCFF] rounded-lg  w-full p-5 '>
                            <input className=' h-[28px] w-full border border-[#E1DCFF] bg-[#FFFFFF] outline-none rounded
                             px-[10px] py-[7px] placeholder:text-[#74689280] text-xs leading-3 font-normal ' placeholder='Search'
                             onChange={onChangeInputHandler}
                             />
                            <div className=' mt-[15px] flex flex-col gap-[15px] text-sm font-normal leading-4 text-[#26212E] '>
                              {dropDownValue}
                            </div>
                          </div>}
                          { showPopUp && <div className='fixed inset-0 z-10 ' onClick={showPopUpHandler} ></div>}
                      </div>
                      <div className=' relative'>
                        <div  className=' w-[470px] h-full relative border border-[#E1DCFF] rounded-lg bg-[#FFFFFF] flex justify-between '>
                          <input type='text' className=' rounded-l-lg outline-none w-full h-full  placeholder:text-[#74689280] text-sm font-normal leading-4  pl-[10px] py-4 ' placeholder='Search Project, Task, Member, Client' />
                          <img className=' p-4  ' src={config.PUBLIC_URL +"/assets/images/amdital/search_gray_color.svg"} alt=''/>
                        </div>
                      </div>
                    </div>

                </div>
                <div className=' w-full mt-[3.7px] h-[80.5px] bg-[#F8F7FC] rounded-b-lg flex items-center px-[30px] py-4 gap-4'>
                    <button  onClick={()=>{props?.checkoutHandler()}} className={` ${true ? ` bg-[#FF845C] hover:bg-[#F36A3D] text-[#FFFFFF] ` : ` bg-[#FFF2ED]  text-[#FFC9B8] pointer-events-none `}  min-w-[128px] max-[128px] rounded h-[48px] flex justify-center items-center gap-2 text-base leading-4  font-bold  `}>Search</button>  
                    <button onClick={()=>{props.onClick()}} className='  flex justify-center items-center text-base leading-4 font-bold text-[#B9B4C8] hover:text-[#988FB1]  '>
                                                   Cancel
                    </button> 
                </div> 
            </div>
          </div>
        )}
      </div>
    </div>

    {toggle_global_search && <div className=' fixed opacity-25 z-[1000]  bg-black  inset-0' onClick={()=>{props.onClick()}} ></div>}
    </div>
    </>
  );
};

export default GlobalSearch;

