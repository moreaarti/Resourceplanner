import React, { useState } from 'react';
import config from '../../config/config';


export default function ImageFilesListView(props) {
    const filename=props?.filename
    const editProfile = props?.editProfile
    let image_veiw =""
  switch (props?.extension) {
    case "jpg":
        image_veiw = config.PUBLIC_URL+ "/assets/images/amdital/image_fall_back.svg";
      break;
      case "png":
        image_veiw = config.PUBLIC_URL+ "/assets/images/amdital/image_fall_back.svg";
      break;
      case "jpeg":
        image_veiw = config.PUBLIC_URL+ "/assets/images/amdital/image_fall_back.svg";
      break;
      case "gif":
        image_veiw =config.PUBLIC_URL+ "/assets/images/amdital/image_fall_back.svg";
      break;
    case "pdf":
        image_veiw = config.PUBLIC_URL+ "/assets/images/amdital/files_fall_back.svg";
      break;

    case "doc":
        image_veiw =  config.PUBLIC_URL+ "/assets/images/amdital/files_fall_back.svg";
      break;
      
    case "docx":
        image_veiw = config.PUBLIC_URL+ "/assets/images/amdital/files_fall_back.svg";
      break;
      case "mp4":
        image_veiw =  config.PUBLIC_URL+ "/assets/images/amdital/files_fall_back.svg";
      break;
      case "avi":
        image_veiw =  config.PUBLIC_URL+ "/assets/images/amdital/files_fall_back.svg";
      break;
      case ".mov":
        image_veiw =  config.PUBLIC_URL+ "/assets/images/amdital/files_fall_back.svg";
      break;
      case "mkv":
        image_veiw =  config.PUBLIC_URL+ "/assets/images/amdital/files_fall_back.svg";
      break;
      case "wmv":
        image_veiw =  config.PUBLIC_URL+ "/assets/images/amdital/files_fall_back.svg";
      break;
      case "flv":
        image_veiw =  config.PUBLIC_URL+ "/assets/images/amdital/files_fall_back.svg";
      break;
      case "txt":
        image_veiw =  config.PUBLIC_URL+ "/assets/images/amdital/files_fall_back.svg";;
      break; 
      case "xls":
        image_veiw =  config.PUBLIC_URL+ "/assets/images/amdital/files_fall_back.svg";;
      break; 
      case "xlsx":
        image_veiw =  config.PUBLIC_URL+ "/assets/images/amdital/files_fall_back.svg";;
      break;  
    default:
        image_veiw =  config.PUBLIC_URL+ "/assets/images/amdital/files_fall_back.svg";
      break;
  } 
  return (
            <div  className=' relative px-3 py-[5px]  group flex  border border-[#DCD6FF] bg-[#F8F7FC] rounded 
            w-[320px] min-h-[30px] gap-'>
                <div className=' absolute   left-3'>
                    <img src={image_veiw} alt=''/>
                </div>
                
                <div className=' cursor-pointer px-8 flex text-[#260B6A] text-[14px] leading-5 font-normal  ' >
                <a href={props?.downloadUrl} target="__blank"  >  <div className=' break-all '>{filename}</div></a>
                </div>
                <div onClick={()=>{props?.cancelattachmentHandler()}} className={` absolute   right-3 ${ editProfile ? ` pointer-events-none ` : ` cursor-pointer ` } `}>
                    <img src={config.PUBLIC_URL+ "/assets/images/amdital/delete_icon.svg"} alt=''/>
                </div>
            </div>
  )
}
