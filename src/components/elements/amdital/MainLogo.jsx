import React from 'react'
import config from '../../../config/config'
import { Link } from 'react-router-dom'
import { togglePopupMenuStatus } from '../../../features/general/generalSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function MainLogo() {

  const showPopupMenu = useSelector((state) => state?.general?.showPopupMenu);

     const dispatch = useDispatch();

      const toggleMenu = () => {
        dispatch(togglePopupMenuStatus());
      };
  return (
    <div className="flex gap-3  items-center px-3 py-[15px] ">

            <div className={ `  ${showPopupMenu ? `  ` : ` `} `}>
                <img className="cursor-pointer z-50 nav-bar-img w-full h-full "   onClick={toggleMenu}  
                src={config.PUBLIC_URL + "/assets/images/amdital/hamburg_icon_white.svg"} alt=""  />
            </div>

           { !showPopupMenu && <Link to={`/dashboard`}>
            <img class className={`cursor-pointer nav-bar-img  max-[767px]:hidden  `} src={config.PUBLIC_URL + "/assets/images/amdital/amdital_logo_white.svg"} alt=""/>
            </Link>}
            
                
    </div>
  )
}
