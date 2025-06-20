import { useNavigate, useRouteError } from "react-router-dom";
import { NavLink } from "react-router-dom";



function ErrorNonAuth() {
  const error = useRouteError();
  const Navigator = useNavigate()

  const onclick = ()=>{
    Navigator(-1)
  }
 
  return (
    <div className=" flex flex-col flex-wrap rounded-lg w-3/4 sm:w-1/4 md:w-1/3  text-center  items-center justify-center mx-auto p-6 mt-10 ">
      <h1 className="">Something went wrong 😭</h1>
      <p className='text-4xl text-black font-semibold pt-4'>404 ERROR</p>
      <p className='text-[#494949] text-sm font-normal pt-4'>Looks like we lost this page. Please navigate to back <div onClick={onclick} className="text-[#53B804] cursor-pointer  "> click here </div></p>
    </div>
  );
}


export default ErrorNonAuth;
