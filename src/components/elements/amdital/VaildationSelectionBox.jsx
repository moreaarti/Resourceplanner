import React from 'react'

export default function VaildationSelectionBox(props) {
  return (<>
  <div className=' w-fit absolute bg-white z-10  border rounded-md border-gray-500 mt-[8px] shadow-md  '>
    <div className='absolute w-[11px] h-[11px] border border-gray-400 mt-[-3%] ml-[13px] border-r-0 border-b-0 bg-white rotate-45  '></div>
    <div className='w-[201px] flex  items-center p-2 pb-2.5 gap-2'>
      <div className='w-6 h-6 bg-orange-400  rounded-sm text-white  flex justify-center items-center text-lg font-bold'>!</div>
      <div className='text-sm text-gray-900'>{props?.errorMessage || "Please fill out this field."}</div>
    </div>
  </div>
  </>
  )
}
