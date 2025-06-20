
import React, { useState } from 'react'
import config from '../../config/config'
import { Link, useSearchParams } from 'react-router-dom';


export default function ProjectsNavbar(props) {


  
  return (
  <div className=' flex justify-between items-center flex-wrap gap-4 md:gap-0 md:flex-nowrap h-[66px] w-full bg-[#F8F7FC] py-4 px-10 border-b border-[#E1DCFF]'>
                <div className=' text-base text-[#26212E] font-semibold ' >Projects</div>
                <div className=' flex gap-[15px] flex-wrap min-[1100px]:flex-nowrap'>

                  {/* search icon */}
                  { props?.search &&
                    <div className='w-[312px] h-8  bg-[#FFFFFF] cursor-pointer rounded border border-[#E1DCFF] flex items-center gap-1 pl-5 pr-2  '>

                      <input type='text'
                        onChange={props.handleSearch}
                        onKeyDown={props?.onKeyDown_search}
                        value={props.search_value}
                        placeholder={props.searchPlaceholder?props.searchPlaceholder:'Search related entriese'}  className=' placeholder:text-[#74689280]  w-full h-full outline-none normal_content_black  '/>
                        <img
                        onClick={props?.search_onclickHandler}
                        className='' src={config.PUBLIC_URL + "/assets/images/amdital/table_search.svg"} alt='search-icon'/>

                    </div>
                  }
                  {/* button */}
                  {<Link to={props?.buttonLink}> <div onClick={props?.onClickButton} className={`h-8 w-[204px] px-4 py-2 bg-[#F36A3D] flex items-center gap-2 text-sm font-semibold leading-4 tracking-[0.8px] text-[#FFFFFF] rounded `}>
                    {<img  className='' src={config.PUBLIC_URL + "/assets/images/amdital/add_plus_white_color.svg"} alt='plus-icon'/>}
                    <p className=' whitespace-nowrap'>Create New Project</p>
                  </div></Link>}
                </div>

                   

  </div>
  )
}
