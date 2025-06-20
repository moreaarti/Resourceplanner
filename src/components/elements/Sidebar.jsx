import { React, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLoaderData, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { togglePopupMenuStatus } from "../../features/general/generalSlice";
import "react-loading-skeleton/dist/skeleton.css";
import config from "../../config/config";
import { useSnackbar } from "notistack";


const Sidebar = ({sidebar_data,activeSidebar,insideActiveSidebar,wikiSidebar=false,lmsSidebar=false,projectSidebar=false}) => {


  const user_details = useSelector((state) => state?.auth);

  const  userId = user_details?.data?.user?.userId


  const showPopupMenu = useSelector((state) => state?.general?.showPopupMenu);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    dispatch(togglePopupMenuStatus());
  };


  
   
    
  

   const mainSidebarData = [
       { 
         title: "Dashboard", 
         path: "/dashboard", 
         image: config.PUBLIC_URL + "/assets/images/amdital/sidebaricons/sidebar_dashboard_new_icon.svg", 
         display:true,
       },
       { 
         title: "Work", 
         path: "/resourceplanner", 
         image: config.PUBLIC_URL + "/assets/images/amdital/sidebaricons/sidebar_work_new_icon.svg", 
         display:true, 
       },
     ];



 const sidebarRef = useRef(null);
 const tooltipElementsRef = useRef({});
 const [tooltipPositions, setTooltipPositions] = useState({});
 const updateTooltipRefs = () => {
   tooltipElementsRef.current = {};
 };
 const saveTooltipRef = (item, element) => {
   if (element) {
     tooltipElementsRef.current[item.title] = element;
   }
 };
 


  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
   

  return (
    <>
    <section className={` fixed h-screen overflow-y-auto overflow-x-hidden
        ${showPopupMenu ? ` min-w-[50px] max-w-[50px] ` : `  min-w-[250px] max-w-[250px] 
                min-[1400px]:min-w-[278px] min-[1400px]:max-w-[278px] `} `}
                ref={sidebarRef}>
      {/* logo */}
      <div className={` z-[100] fixed bg-[#1F0E3A]  min-h-[56px] flex items-center   ${showPopupMenu ? ` min-w-[50px] max-w-[50px]  ` : ` min-w-[250px] max-w-[250px] min-[1400px]:min-w-[278px] min-[1400px]:max-w-[278px] `} `}>
        <div onClick={toggleMenu} className={` relative cursor-pointer flex justify-center items-center min-w-[50px] max-w-[50px] min-h-[56px]  `}>
            <img src={config.PUBLIC_URL + "/assets/images/amdital/hamburg_icon_white.svg"} alt=""/>
        </div>
        <div className={` px-4 relative flex items-center  min-w-[200px] max-w-[200px]  min-[1400px]:min-w-[228px]  min-[1400px]:max-w-[228px] min-h-[56px] ${showPopupMenu ? ` hidden  ` : ` `} `}>
           <img  className={` relative cursor-pointer w-auto min-h-[26px]  max-h-[26px]   `} src={config.PUBLIC_URL + "/assets/images/amdital/amdital_logo_white.svg"} alt="Company Logo"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop if fallback also fails
              e.target.src = config.PUBLIC_URL + "/assets/images/amdital/amdital_logo_white.svg";
            }}
           />
        </div>
      </div>

      {/* sidebar content */}
      <div className={` ${showPopupMenu ? ` min-w-[50px] max-w-[50px] ` : `  min-w-[250px] max-w-[250px] min-[1400px]:min-w-[278px] min-[1400px]:max-w-[278px] `} 
           flex  min-h-screen mt-[56px]   `}>
        <ul className={`min-w-[50px] flex flex-col gap-[2px] max-w-[50px] list-none  bg-[#1F0E3A]  relative pb-10  `}>
            {
              mainSidebarData?.map((menu,index)=>{
                if (!menu?.display) return null;
                const top = tooltipPositions[menu?.title];
                  return  <NavLink  key={index+1+1} to={menu?.path} className={` group nav_menu ${activeSidebar === menu?.title && ` bg-[#806BFF] ` } relative  flex justify-center items-center  min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px]`}
                  ref={(el) => saveTooltipRef(menu, el)}
                   >         
                  <div key={index+1+2} className={`  ${ activeSidebar === menu?.title ? ` bg-[#FF845C] ` : `  side_border ` }  w-[4px] h-full bg-[#FF845C] left-0 absolute `}></div>
                            <li key={index+1+3}  className=" relative " >
                              <img src={menu?.image} alt={menu?.title} />
                            </li>
                            {/* tooltip */}
                            <div 
                              className={`hidden group-hover:block custom-shadow z-[1000] fixed left-[58px]`}
                              style={{ top: `${top+10}px` }}
                            >
                              <div className="absolute w-3.5 h-3.5 mt-[9px] -ml-[6.5px] border-b border-l border-[#806BFF] rotate-45 bg-[#806BFF]"></div>
                              <div className="border-[#806BFF] whitespace-nowrap border rounded relative min-w-[71px] h-8 bg-[#806BFF] flex px-2 justify-center items-center">
                                <p className="whitespace-nowrap text-xs leading-5 font-normal text-[#FFFFFF]">{menu?.title}</p>
                              </div>
                            </div>
               

                        </NavLink>
              })
            }
          </ul>
         { sidebar_data?.length > 0  && <ul className={` pb-10 relative min-w-[200px] max-w-[200px] min-[1400px]:min-w-[228px] min-[1400px]:max-w-[228px]   bg-gradient-to-b from-[rgba(31,14,58,0.9)] to-[rgba(38,11,106,0.9)] list-none flex flex-col gap-[2px]   ${showPopupMenu && ` hidden ` } `}>
            {
                sidebar_data?.map((sub_item,index)=>{

                  return  <NavLink to={sub_item?.path} key={index+1+4} className={` ${insideActiveSidebar === sub_item?.title && ` bg-[#806BFF] ` }  hover:bg-[#806BFF] relative  flex   min-h-[50px] max-h-[50px]`}>    
                  <li key={index+1+5} className=" flex px-4 min-[1400px]:px-6 py-2 items-center gap-2 "  >
                    <img src={sub_item?.image} alt={sub_item?.title} className="" />
                    <div className=" text-base font-normal leading-[100%] tracking-[0%] text-[#FFFFFF] block truncate  ">{sub_item?.title}</div>
                  </li>
              </NavLink>
                })
            }
          </ul>}
     

      </div>
    </section>
    
  </>
  );
};

export default Sidebar;







