import config from "../../config/config";
import { Link } from 'react-router-dom';
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from 'react-redux';

const ListingBox=(props)=>{

  const user_role = useSelector(state => state.auth.user_role);


  let userRoleDisplay ="";

  let threeDotsDisplay ="";

  switch (user_role?.workspace_role) {
    case "owner":
      userRoleDisplay = true;
      threeDotsDisplay = true;
      break;
    case "administrator":
        userRoleDisplay = true;
        threeDotsDisplay = true;
        break;
    case "manager":
      userRoleDisplay = false;
      threeDotsDisplay = true
      break;
    case "team_member":
      userRoleDisplay = false;
      threeDotsDisplay = true;
      break;
    case "client":
      userRoleDisplay = false;
      threeDotsDisplay = false;
      break;
    default:
      userRoleDisplay = true;
      threeDotsDisplay = true;
      break;
  }


  return (
    <>
   <div className=' relative flex flex-col justify-between w-[276px] h-[96px]  border border-[#EAEAEA] bg-[#FFFFFF] custom-shadow rounded p-4'>
        <div className='relative flex flex-row items-center justify-between w-[100%]'>
           <Link to={`${props?.Linkbutton}`}> <p className=' h-5 w-[180px] normal_content_black  whitespace-nowrap block text-ellipsis overflow-hidden '>{props?.name}</p> </Link>
          { threeDotsDisplay && <div>
             <img  src={ config.PUBLIC_URL + "/assets/images/three_dots_icon_new.svg"} alt='' className={`p-[1px] rotate-90 w-[25px] hover:bg-[#E5E9E5] rounded cursor-pointer  ${props.showpop === props.id ? `bg-[#E5E9E5]`:``}`} onClick={props?.onClick} />
           </div>}
           {props?.showpop === props?.id ? <div className='fixed inset-0' onClick={props?.onClick}></div>:null}
        </div>
            {
            threeDotsDisplay && props.showpop === props.id?<div className='flex justify-end relative '><div className='absolute z-10 w-[127px] max-h-[68px] border border-[#EAEAEA] bg-[#FFFFFF] rounded px-4 py-2 cursor-default  '>
            <div className='flex flex-col gap-2 cursor-pointer'>
          <Link to={`${props?.editLink}/${props?.id}`}><p className='normal_content_black whitespace-nowrap hover:font-medium w-fit'>Edit {props?.standed}</p></Link>
            {userRoleDisplay && <p className=' whitespace-nowrap  w-fit normal_content_red  hover:font-medium '
            onClick={()=>{props?.gridDeleteHandler(props?.id)}}
            
            >Delete {props?.standed}</p>}
            </div>
            </div></div>:null
            }
       <Link to={`${props?.Linkbutton}`}> <p className=' normal_content_black flex items-center gap-1  '>{ props?.sites} <span className='font-normal'>{ parseInt(props?.sites) === 1 ? 'Site' : 'Sites' }</span></p></Link>
    </div>
    </>
    
  )
}
export default ListingBox
