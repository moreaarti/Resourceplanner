import React from 'react'

const BreadCrumb = (props) => {
  return (

          <div className="w-full bg-[#F8F7FC] py-4 px-10 header_title_h1_black border-b border-[#E1DCFF] ">
              <p>{props?.head_name}</p>
          </div>
  
  )
}

export default BreadCrumb