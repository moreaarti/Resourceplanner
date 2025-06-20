import { React, useState } from "react";
import config from "../../config/config";


const PasswordBoxNew = (props) => {

  const [showPassword, setShowPassword] = useState( props?.showPassword ? true : false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={props.wrapperclass}>
      <label htmlFor={props.id} className={` flex flex-row ` + props?.labelClass}>
        {props.label}
        {props?.starIcon && <span className='text-[#EA4242]'>*</span>}

      </label>
      <div className="relative flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          id={props.id}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          className={props.passwordclass}
          onChange={props.onChange}
          required={props?.required} 
          readOnly={props?.readOnly} 
          autoComplete={props?.autoComplete} 
          disabled={props?.disabled} 
          pattern={props?.pattern}
          title={props?.title}
        />
        {showPassword ? <img
          src={config.PUBLIC_URL + "/assets/images/eye_icon_new.svg"}
          alt={"Show Password"}
          onClick={togglePasswordVisibility}
          className="absolute right-0 mr-3 cursor-pointer"
        />:<img
        src={config.PUBLIC_URL + "/assets/images/eye_icon_with_cross_new.svg"}
        alt={"Show Password"}
        onClick={togglePasswordVisibility}
        className="absolute right-0 mr-3 cursor-pointer"
      />}
      </div>
    </div>
  ) 
   
};

export default PasswordBoxNew;
