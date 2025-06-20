import { useRouteError } from "react-router-dom";
// import LinkButton from "./LinkButton";
import { NavLink } from "react-router-dom";
function Error() {
  const error = useRouteError();
 
  return (
    <div className=" flex flex-col flex-wrap rounded-lg w-3/4 sm:w-1/4 md:w-1/3  text-center  items-center justify-center mx-auto p-6 ">
      <h1 className="">Something went wrong 😭</h1>
      <p className='text-4xl text-black font-semibold pt-4'>404 ERROR</p>
      <p className='text-[#494949] text-sm font-normal pt-4'>Looks like we lost this page. Please navigate using left menu or <NavLink  className="text-[#53B804] " to="/"> click here </NavLink>to open Dashboard 😊</p>
    </div>
  );
}

export default Error;


 // content: (key) => (
          //   <div
          //     id={key}
          //     className="max-w-[300px] font-medium text-base bg-[#FF0000] rounded text-[#FFFFFF] p-2 flex flex-row gap-1 items-start"
          //     style={{
          //       wordWrap: 'break-word',
          //       whiteSpace: 'normal',
          //       overflowWrap: 'break-word',
          //       flexShrink: 0,
          //       display: 'flex',
          //     }}
          //   >
          //     <img 
          //       src={config.PUBLIC_URL + "/assets/images/amdital/close_circle_icon.svg"} 
          //       className="self-start" 
          //       alt="close"
          //       style={{ flexShrink: 0, marginTop:"3px", marginRight: '8px' }}  // Prevent shrinking of the image
          //     />
          //     <span style={{
          //       wordWrap: 'break-word',
          //       whiteSpace: 'normal',
          //       wordBreak: 'break-word', 
          //       display: 'block',         // Ensures the message text wraps correctly
          //       flexGrow: 1,              // Allow the text to take remaining space
          //     }}>
          //       {message}
          //     </span>
          //   </div>
          // ),
