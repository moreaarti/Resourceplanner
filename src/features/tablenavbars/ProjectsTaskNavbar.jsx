
import React, { useState } from 'react'
import config from '../../config/config'
import { Link, useSearchParams } from 'react-router-dom';


export default function ProjectsTaskNavbar(props) {


  
  return (
  <div className=' flex justify-between items-center flex-wrap gap-4 md:gap-0 md:flex-nowrap h-[66px] w-full  py-4 px-6 border-b border-[#E1DCFF] bg-[#F8F7FC] mb-[15px]'>
                 
                {/* <div className='w-full flex items-center gap-8 text-sm font-semibold  '>
                      <div onClick={()=>{props?.showNavigationPageHandler("list")}} className={`  cursor-pointer pb-2 border-b-2  hover:border-[#806BFF]  hover:text-[#806BFF]  ${props?.showNavigationPage === "list" ? ` border-[#806BFF] border-b-2  text-[#806BFF] ` : ` border-transparent text-[#26212E] `} `}>List</div>
                      <div onClick={()=>{props?.showNavigationPageHandler("board")}} className={` cursor-pointer pb-2 border-b-2  hover:border-[#806BFF]  hover:text-[#806BFF] ${props?.showNavigationPage === "board" ?  ` border-[#806BFF] border-b-2 text-[#806BFF] ` : ` border-transparent text-[#26212E] `} `}>Board</div>
                      <div onClick={()=>{props?.showNavigationPageHandler("activity")}} className={`  cursor-pointer pb-2 border-b-2  hover:border-[#806BFF] hover:text-[#806BFF] ${props?.showNavigationPage === "activity" ? ` border-[#806BFF]  border-b-2 text-[#806BFF] ` : ` border-transparent text-[#26212E] `} `}>Activity</div>
                </div> */}
                <div className=' text-base leading-5 font-semibold text-[#26212E] ' >
                  WCP-25 (Project Code) - Project Name
                </div>
                  

                <div className=' flex gap-[15px] flex-wrap min-[1100px]:flex-nowrap'>

                  {/* search icon */}
                  { props?.search &&
                    <div className=' w-[250px] 2xl:w-[312px] h-8  bg-[#FFFFFF] cursor-pointer rounded border border-[#E1DCFF] flex items-center gap-1 pl-5 pr-2  '>

                      <input type='text'
                        onChange={props.handleSearch}
                        onKeyDown={props?.onKeyDown_search}
                        value={props.search_value}
                        placeholder={props.searchPlaceholder?props.searchPlaceholder:'Search Projects'}  className=' placeholder:text-[#74689280]  w-full h-full outline-none normal_content_black  '/>
                        <img
                        onClick={props?.search_onclickHandler}
                        className='' src={config.PUBLIC_URL + "/assets/images/amdital/table_search.svg"} alt='search-icon'/>

                    </div>
                  }
                  {
                    props?.grid && <div className={` flex bg-[#FFFFFF] h-8 border border-[#DCD6FF] rounded `}>
                      
                                   {/* { (props?.showNavigationPage === "list" || props?.showNavigationPage === "board") && <div className=' w-10 h-8 flex justify-center items-center p-2 border-r border-[#DCD6FF] cursor-pointer '
                                   onClick={()=>{props?.showNavigationPageHandler("activity")}}
                                   >
                                      <img src={config.PUBLIC_URL + "/assets/images/amdital/grid_activity_view.svg"} alt=''/>
                                    </div>} */}
                                    { (props?.showNavigationPage === "list" || props?.showNavigationPage === "activity") && <div className=' w-10 h-8 flex justify-center items-center p-1 border-r border-[#DCD6FF] cursor-pointer '
                                    onClick={()=>{props?.showNavigationPageHandler("board")}}
                                    >
                                      <img src={config.PUBLIC_URL + "/assets/images/amdital/grid_grid_view.svg"} alt=''/>
                                      
                                    </div>}

                                    {(props?.showNavigationPage === "board" || props?.showNavigationPage === "activity") && <div className=' w-10 h-8 flex justify-center items-center p-1 border-r border-[#DCD6FF] cursor-pointer '
                                    onClick={()=>{props?.showNavigationPageHandler("list")}}
                                    >
                                      <img src={config.PUBLIC_URL + "/assets/images/amdital/grid_list_view.svg"} alt=''/>
                                    </div>}
                                  </div>
                  }
                  {/* button */}
                  {props?.button && <Link to={props?.buttonLink}> <div onClick={props?.onClickButton} className={`h-8 w-[141px] px-4 py-2 bg-[#FF845C] flex items-center gap-2 text-sm font-semibold leading-4 tracking-[0.8px] text-[#FFFFFF] rounded hover:bg-[#F36A3D] `}>
                    {<img  className='' src={config.PUBLIC_URL + "/assets/images/amdital/add_plus_white_color.svg"} alt='plus-icon'/>}
                    <p className=' whitespace-nowrap'>Add Section</p>
                  </div></Link>}
                </div>

                   

  </div>
  )
}
