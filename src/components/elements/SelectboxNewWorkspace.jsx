import React, { useState } from "react";
import config from "../../config/config";
import { Link } from "react-router-dom";

const SelectboxNewWorkspace = (props) => {

  const [value, setValue] = useState(null);
  const [workspaceid,setworkspaceId]=useState(props?.currentvalue)

  

  const [showoption, setShowoption] = useState(true);
  const dropdowndata = props?.options;
  const customStyles = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 4px;
    
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: #777777;
    border-radius: 8px
  }
`;


  return (
    <>
      <div className="relative">
        <div
          className={
            `  max-[800px]:min-w-[230px]  max-[800px]:max-w-[230px] max-[1023px]:min-w-[250px]  max-[1023px]:max-w-[250px]   lg:min-w-[320px] lg:max-w-[320px]   h-10 bg-[#F7F7F8] rounded border border-[#EAEAEA]  normal_content_black capitalize flex items-center px-4 py-3 ${
              showoption ? "  " : " border-[#2dbf41] "
            } `
          }
          onClick={() => {
            setShowoption(!showoption);
          }}
        >
          {
              <p className={" min-w-[180px]  max-w-[180px]  lg:min-w-[265px] lg:max-w-[265px]  block text-ellipsis whitespace-nowrap overflow-hidden "}>{ value !== null ? value?.name: props?.currentvalue?.name }</p>
          }
          {showoption ? (
              <img className="" src={config.PUBLIC_URL +"/assets/images/downward_arrow_new.svg" } alt="" />
          ) : (
            <img
            src={config.PUBLIC_URL +"/assets/images/upward_arrow_new.svg" }
              alt=""
              onClick={() => {
                setShowoption(!showoption);
              }}
            />
          )}
           
        </div>
        {showoption === false ? <div className="fixed inset-0  z-10 " onClick={()=>{setShowoption(!showoption);}}></div> : ""}
        {showoption ? (
          <></>
        ) : (
          <>
            <div
              className={
                "absolute z-40 w-full shadow-lg  bg-[#F7F7F8] rounded border border-[#EAEAEA]  "}
            >
              <div className="overflow-y-scroll scrollbar-thin  max-h-[280px]">
                <style>{customStyles}</style>
              
                {dropdowndata?.map((item,i) => {
                  return (
                    <>
                    <div
                    key={i}
                      onClick={() => {
                        setValue(item);
                        setworkspaceId(item)
                        setShowoption(!showoption);
                        props.onChange(item);
                      }}
                      className={` 
                        ${item?.id === workspaceid?.id ? `bg-[#00B6561A]` : ``} 
                        hover:bg-[#D8F3E4] 
                        rounded   
                        cursor-pointer 
                        text-ellipsis 
                        whitespace-nowrap 
                        overflow-hidden 
                        normal_content_black
                        block
                        p-2 px-4
                      `} 
                    >
                      {item.name}
                    </div>
                    </>
                  );
                })}
              </div>
              <Link to={`/settings/manage-workspaces`} > <div  onClick={() => {
            setShowoption(!showoption);
          }} className=" p-2 border-t border-[#EAEAEA] w-full h-10 flex justify-between hover:bg-[#D8F3E4]   ">
              
              
              <img src={config.PUBLIC_URL + "/assets/images/workspace_04_2024_icon_new.svg"} alt="" className=""/>
              <div className=" text-sm ">Manage Workspace</div>
              
            </div></Link>
              
          </div>
          </>
        )}
      </div>
    </>
  );
};
export default SelectboxNewWorkspace;
