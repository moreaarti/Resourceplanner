import { formatDistance } from 'date-fns'
import React from 'react'
import SanitizedContent from './SanitizedContent'

const NotificationBox = (props) => {
  const notification = props.notification

  return (
  
    notification?.map((val,index)=>{

      const date =  formatDistance(new Date(val?.date), new Date(), {
        addSuffix: true,
      })
      return  <div onClick={val?.is_unread ? ()=>{props?.onClickHandler(val?.id)} :undefined} key={index} className={` ${val?.is_unread ? `cursor-pointer`:`cursor-default`} relative px-6 py-5 ${index !== 0 ? ` border-t  `: ``} `}>
       {val?.is_unread && <div className=' absolute right-2 top-1 bg-[#00B656] w-3 h-3 rounded-full '></div>}
      <div className='  flex m-1 justify-between'>
         <div className='normal_content_black'>{val?.title?.rendered}</div>
         <div className='normal_content_black'>{date}</div>
     </div>
     <div className='  m-1 mt-2 '>
     <SanitizedContent textCssClass={` normal_content_black  `} htmlContent={val?.content?.rendered} />
     {/* <div className=" text-left break-all  "><div className=" reactquillcss " dangerouslySetInnerHTML={{ __html: val?.content?.rendered?.replace(/(\s+)(?![^<>]*>)/g, (match) => '&nbsp;'.repeat(match.length))?.replace(/<p><\/p>/g, '')}} /></div> */}
      </div>
     {/* <div className='text-xs sm:text-sm font-normal text-[#666666]  m-1 '>Event Description (5 sites update / site deleted etc)</div>
     <div className='text-xs sm:text-sm  text-[#2DBF41] font-semibold  mx-1 mt-3'>Navigates to update page (if updated)</div> */}
    </div>
    })

  )
}

export default NotificationBox
