import React from 'react';
import { useSelector} from "react-redux";

const RoundedImg = (props) => {
    
const stored_data =useSelector(state=>state);

const FirstName = stored_data?.general.profile?.first_name || stored_data?.auth.data?.firstName;
const profile_first_letter = FirstName.toUpperCase().split("");



  return (
    <div className='flex justify-center'>
      {props.img?.length===0 ? <div className={props.class + " bg-[#806BFF] border border-[#E1DCFF] flex justify-center items-center text-[#FFFFFF] text-6xl "}>{profile_first_letter[0]}</div>:<img  className={props.class} src={props.img} alt={props.alt} />}
    </div>
  )
}

export default RoundedImg