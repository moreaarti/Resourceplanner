import React, { useState } from 'react';
import config from "../../config/config";

export default function LightBox(props) {
    const filename=props?.filename
    const extension=props?.extension
    const [showpopimage,setShowPopImage]=useState(false)
    const [imageurl,setImageurl]=useState("")
    let image_veiw =""
  switch (props?.extension) {
    case "jpg":
        image_veiw += props?.url;
      break;
      case "png":
        image_veiw += props?.url;
      break;
      case "jpeg":
        image_veiw += props?.url;
      break;
      case "gif":
        image_veiw += props?.url;
      break;
    case "pdf":
        image_veiw = config.PUBLIC_URL+ "/assets/images/pdf.svg";
      break;

    case "doc":
        image_veiw = config.PUBLIC_URL+ "/assets/images/doc.svg";
      break;
      
    case "docx":
        image_veiw = config.PUBLIC_URL+ "/assets/images/doc.svg";
      break;
      case "mp4":
        image_veiw = config.PUBLIC_URL+ "/assets/images/video_icon_new.svg";
      break;
      case "avi":
        image_veiw = config.PUBLIC_URL+ "/assets/images/video_icon_new.svg";
      break;
      case ".mov":
        image_veiw = config.PUBLIC_URL+ "/assets/images/video_icon_new.svg";
      break;
      case "mkv":
        image_veiw = config.PUBLIC_URL+ "/assets/images/video_icon_new.svg";
      break;
      case "wmv":
        image_veiw = config.PUBLIC_URL+ "/assets/images/video_icon_new.svg";
      break;
      case "flv":
        image_veiw = config.PUBLIC_URL+ "/assets/images/video_icon_new.svg";
      break;
      case "txt":
        image_veiw = config.PUBLIC_URL+ "/assets/images/txt.svg";
      break; 
      case "xls":
        image_veiw = config.PUBLIC_URL+ "/assets/images/xls.svg";
      break; 
      case "xlsx":
        image_veiw = config.PUBLIC_URL+ "/assets/images/xls.svg";
      break;  

    default:
        image_veiw = config.PUBLIC_URL+ "/assets/images/pdf.svg";
      break;
  } 
  return (
            <div  className=' cursor-pointer group relative  mt-4 flex flex-col border border-[#EAEAEA] bg-[#FFFFFF] rounded 
            w-[214px] h-[142px]'>
                <div className=' left-0 top-0 bottom-0 right-0 absolute w-full h-full rounded '>
                        <img src={image_veiw} alt='' className='w-full h-full rounded  '/>
                </div>
                <div className='absolute w-full h-10 group-hover:h-full bottom-0 left-0  bg-[#FFFFFF] border border-[#EAEAEA] rounded-b  animated-bottom-to-top   '>
                  <div  className=" relative flex flex-wrap px-2 py-2 items-center text-sm font-medium text-[#1C1C1C99] ">
                        <p className=' block text-ellipsis  whitespace-nowrap overflow-hidden p-[2px]  max-w-[140px]  '>{filename}</p>
                        <p className=' block text-ellipsis max-w-[30px] whitespace-nowrap'>.{extension}</p>&nbsp;
                        <div className='hidden group-hover:flex '>{props?.size}&nbsp;kb</div> 
                  </div>
                  <div className='hidden group-hover:flex gap-2  mt-10 px-10 '>

                  <a href={props?.url} download={filename+"."+extension}  target='__blank' className=' w-7 h-7 hover:bg-[#D9D9D9] rounded-[2px] '>  
                  <img src={config.PUBLIC_URL+ "/assets/images/download_icon_new.svg"} alt='' className='w-full h-full' />
                  </a>

                        
                        <img src={config.PUBLIC_URL+ "/assets/images/view_icon_new.svg"} alt='' className=' rounded-[2px] w-7 h-7 hover:bg-[#D9D9D9] ' onClick={()=>{setImageurl(image_veiw);setShowPopImage(!showpopimage)}}/>
                  </div>
                </div>

                {showpopimage?<div  className={` fixed z-[1100] w-full  h-full top-0 right-0    bg-black bg-opacity-70  flex justify-center items-center `}> 
                
                        <div className='relative z-30 w-[300px] h-[400px] min-[1100px]:w-[40%] min-[1100px]:h-[70%] border-[6px] border-[#999999] rounded-lg bg-[#ffffff]'>
                            <img src={imageurl} alt='' className='w-full h-full'/>
                            <div className='mt-3 text-sm font-normal flex items-center  text-[#ffffff]'>{filename}.{extension} ({props?.size}kb) </div>
                          <div className='w-full flex justify-between mt-2 gap-4 '>
                                  <a href={props?.url} download={filename+"."+extension}  target='__blank' className=' w-7 h-7 hover:bg-[#D9D9D9] rounded-[2px] '>  
                          <button type='button' className='w-[150px]  custom-shadow  hover:bg-[#00D967] green_button bg-[#00B656] '>Download</button>
                          </a>
                            <div className=' w-[150px] custom-shadow  bg-[#FFFFFF] hover:border-transparent hover:text-[#FFFFFF] hover:bg-[#00D967] green_button_border ' onClick={()=>{setShowPopImage(!showpopimage)}}>Close</div>
                          </div>
                        </div> 
                      { imageurl? <div className='fixed z-0 inset-0'onClick={()=>{setShowPopImage(!showpopimage)}} ></div>:null}
                </div>:null}
            </div>
  )
}
