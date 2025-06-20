
import React, { useState } from 'react'
import config from '../../config/config'
import SelectboxShowEntries from '../support/SelectboxShowEntries';
import { Link, useSearchParams } from 'react-router-dom';


export default function MySubscriptionsNavbar(props) {

  const [params] = useSearchParams();
  const order_value = params.get("order");
  const order_by_value = params.get("order_by");
  const orderby_value = params.get("orderby");

  const [sortBy,setSortBy]=useState(false);
  const [sortByValue,setSortByValue]=useState( props?.sortBy ? props?.sortBy : order_value || order_by_value || orderby_value || "descending" );


  
  return (
  <div className=' flex justify-between items-center flex-wrap gap-4 md:gap-0 md:flex-nowrap'>
                {/* show entries */}
                { props?.ShowEntries ? <div className={` flex  w-full  gap-3 items-center normal_content_black  `}  >
                      Show <SelectboxShowEntries  className=" cursor-pointer items-center bg-[#FFFFFF] custom-shadow min-w-[76px] max-w-[72px] h-[36px]   border-[1px] border-[#EAEAEA] normal_content_black   gap-2 pl-3 py-[10px] custom-shadow "
                        chevrondown ="/assets/images/downward_arrow_new.svg" 
                        chevronup = "/assets/images/upward_arrow_new.svg"
                        Options={[10,20,25,30]}
                        currentvalue={props?.Per_page}
                        classdrop =" bg-[#FFFFFF] border-[#EAEAEA] custom-shadow mt-1"  
                        insidedropclass= " hover:bg-[#00B6561A] px-3 pb-2 normal_content_black  " 
                        name_of_dropdown="Normal_dropdown"
                        onChange={props?.perpageHandler}
                      /> <p className={` normal_content_black  `}>entries</p>
                  </div> : <div className='w-28 h-9'></div>}
                <div className=' flex gap-2 flex-wrap min-[1100px]:flex-nowrap'>
                  {/* sort by */}
                { props?.sorting && <div className='relative normal_content_black  '>
                        <div onClick={()=>{setSortBy(!sortBy)}} className='bg-[#FFFFFF] cursor-pointer rounded border border-[#EAEAEA] flex items-center gap-2 pl-4 pr-[6px] w-[114px] h-9   custom-shadow'>
                          <img className='' src={config.PUBLIC_URL + "/assets/images/sort_by_icon_new.svg"} alt='search-icon'/>
                          <p className=''>Sort by</p>
                        </div>
                        {
                          sortBy && <div className=' custom-shadow cursor-pointer z-20 mt-1 absolute w-[128px] max-md:-right-200 md:-left-[120px] bg-[#FFFFFF] border border-[#EAEAEA] rounded  text-sm leading-5 font-normal' >

                                  <div onClick={()=>{setSortByValue("ascending");props?.sortingHandler("ascending")}} className={` p-2 flex gap-2 hover:bg-[#00B6561A]  ${sortByValue === "ascending" || sortByValue === "asc" ?` bg-[#00B6561A] `:``}`}>{(sortByValue === "ascending" || sortByValue === "asc") && <img src={config.PUBLIC_URL + "/assets/images/dot_icon_new.svg"} alt='dot-icon'/>} Ascending</div>

                                  <div onClick={()=>{setSortByValue("descending");props?.sortingHandler("descending")}} className={` p-2 flex gap-2 hover:bg-[#00B6561A]  ${sortByValue === "descending" || sortByValue === "desc" ?` bg-[#00B6561A] `:``}`}>{(sortByValue === "descending" || sortByValue === "desc") && <img src={config.PUBLIC_URL + "/assets/images/dot_icon_new.svg"} alt='dot-icon'/>} Descending</div>

                                <div  className={` relative group border-t border-[#EAEAEA] p-2 `}>
                                  <div className='flex gap-4 ' >Group by
                                       <img className='  rotate-90 group-hover:rotate-0 ' src={config.PUBLIC_URL + "/assets/images/right_arrow_icon_new.svg"} alt='dot-icon'/>                                  
                                  </div>
                                  <div className='z-20 custom-shadow absolute hidden group-hover:block max-md:top-10 md:top-0 max-md:right-0 md:-left-32   bg-[#FFFFFF] border-[#EAEAEA] border rounded w-[128px] '>
                                    
                                    <div onClick={()=>{setSortByValue("last_updated");props?.sortingHandler("last_updated")}} className={` whitespace-nowrap p-2 flex gap-2 hover:bg-[#00B6561A]  ${sortByValue === "last_updated" || sortByValue === "updated_at"  || sortByValue === "modified" ?` bg-[#00B6561A] `:``}`}>{(sortByValue === "last_updated" || sortByValue === "modified") && <img src={config.PUBLIC_URL + "/assets/images/dot_icon_new.svg"} alt='dot-icon'/>} Last Updated</div>

                                    {/* <div onClick={()=>{setSortByValue("first_updated")}} className={` whitespace-nowrap p-2 flex gap-2 hover:bg-[#00B6561A]  ${sortByValue === "first_updated" ?` bg-[#00B6561A] `:``}`}>{sortByValue === "first_updated" && <img src={config.PUBLIC_URL + "/assets/images/dot_icon_new.svg"} alt='dot-icon'/>} First Updated</div> */}

                                    <div onClick={()=>{setSortByValue("by_name");props?.sortingHandler("by_name")}} className={` whitespace-nowrap p-2 flex gap-2 hover:bg-[#00B6561A]  ${sortByValue === "by_name" || sortByValue === "name" || sortByValue === "display_name" || sortByValue === "line_item_name" || sortByValue === "site_name" ?` bg-[#00B6561A] `:``}`}>{(sortByValue === "by_name" || sortByValue === "name" || sortByValue === "display_name" || sortByValue === "line_item_name" || sortByValue === "site_name")&& <img src={config.PUBLIC_URL + "/assets/images/dot_icon_new.svg"} alt='dot-icon'/>} By Name</div>

                                    <div onClick={()=>{setSortByValue("by_date");props?.sortingHandler("by_date")}} className={` whitespace-nowrap p-2 flex gap-2 hover:bg-[#00B6561A]  ${sortByValue === "by_date" || sortByValue === "date" ?` bg-[#00B6561A] `:``}`}>{(sortByValue === "by_date" || sortByValue === "date") && <img src={config.PUBLIC_URL + "/assets/images/dot_icon_new.svg"} alt='dot-icon'/>} By Date</div>

                                    {/* <div onClick={()=>{setSortByValue("title")}} className={` whitespace-nowrap p-2 flex gap-2 hover:bg-[#00B6561A]  ${sortByValue === "title" ?` bg-[#00B6561A] `:``}`}>{sortByValue === "title" && <img src={config.PUBLIC_URL + "/assets/images/dot_icon_new.svg"} alt='dot-icon'/>} Title</div> */}
                                      
                                      
                                    </div>
                                </div>
                                  
                                  
                          </div>
                        }
                    { sortBy &&  <div onClick={()=>{setSortBy(!sortBy)}} className='z-10 fixed inset-0 '></div> }   
                  </div>}
                  {/* search icon */}
                  { props?.search &&
                    <div className='w-[212px] h-9  bg-[#FFFFFF] cursor-pointer rounded border border-[#EAEAEA] flex items-center gap-1 pl-4 pr-[6px]  custom-shadow'>

                      <input type='text'
                        onChange={props.handleSearch}
                        onKeyDown={props?.onKeyDown_search}
                        value={props.search_value}
                        placeholder={props.searchPlaceholder?props.searchPlaceholder:'Search related entriese'}  className=' placeholder:text-[#000000] placeholder:opacity-[40%] w-full h-full outline-none normal_content_black  '/>
                        <img
                        onClick={props?.search_onclickHandler}
                        className='' src={config.PUBLIC_URL + "/assets/images/search_filter_icon_new.svg"} alt='search-icon'/>

                    </div>
                  }
                  {/* button */}
                  {props?.buttonRequired &&<Link to={props?.buttonLink}> <div onClick={props?.onClickButton} className={props?.buttonClass}>
                    {props.plusIconRequired && <img  className='' src={config.PUBLIC_URL + "/assets/images/plus_symbol_icon_new.svg"} alt='plus-icon'/>}
                    <p className='flex justify-center items-center'>{props?.buttonName}</p>
                  </div></Link>}
                  {/* grid */}
                  {
                    props?.grid && 
                    <div onClick={props?.onClickGrid} className='w-9 h-9 bg-[#FFFFFF] border border-[#EAEAEA] rounded flex justify-center items-center cursor-pointer ' >
                        {
                          props?.type ? <img src={config.PUBLIC_URL + "/assets/images/list_view_icon_new.svg"} alt='list_icon'/> : 
                          <img src={config.PUBLIC_URL + "/assets/images/grid_icon_new.svg"} alt='grid_icon'/>
                        }

                    </div>
                  }

                </div>

                   

  </div>
  )
}
