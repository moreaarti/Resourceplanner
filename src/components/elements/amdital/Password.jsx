import { React, useState } from "react";
import config from "../../../config/config";




const Password = (props) => {

  const [showPassword, setShowPassword] = useState( props?.showPassword ? true : false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={` w-full flex flex-col gap-2  ` + props?.wrapperClass}>
      <label htmlFor={props.id} className={` flex flex-row text-sm  font-medium text-[#26212E] ` + props?.labelClass}>
        {props.label}{props?.required && props?.star_icon !== true && <span className='text-[#EA4242]'>*</span>}
      </label>
      <div className="relative flex items-center w-full ">
        <input
          type={showPassword ? "text" : "password"}
          id={props.id}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          className={` px-4 pr-10 py-2 border border-[#DCD6FF] rounded bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] placeholder:text-sm text-[#26212E] text-sm font-normal  `+ props.classInput}
          onChange={props.onChange}
          required={props?.required} 
          readOnly={props?.readOnly} 
          autoComplete={props?.autoComplete} 
          disabled={props?.disabled} 
          pattern={props?.pattern}
          title={props?.title}
          onBlur={props?.onBlur}
        />
        {showPassword ? <img
          src={config.PUBLIC_URL + "/assets/images/amdital/eye_icon_border_color.svg"}
          alt={"Show Password"}
          onClick={togglePasswordVisibility}
          className="absolute right-0 mr-3 cursor-pointer"
        />:<img
        src={config.PUBLIC_URL + "/assets/images/amdital/cross_eye_icon_border_color.svg"}
        alt={"Show Password"}
        onClick={togglePasswordVisibility}
        className="absolute right-0 mr-3 cursor-pointer"
      />}
      </div>
    </div>
  ) 
   
};

export default Password;
