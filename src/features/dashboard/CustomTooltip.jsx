import React from 'react'

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='border border-[#C4C0DC] w-9 h-9 rounded-full bg-[#FFFFFF] flex justify-center items-center text-xs font-normal text-[#260B6A] leading-3'>
          <p >{payload[0].value}%</p>
        </div>
      );
    }
  
    return null;
  };
  
  export default CustomTooltip;

