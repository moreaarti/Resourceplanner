import React, { useRef, useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import PasswordBoxNew from "../../components/elements/PasswordBoxNew";
import Cookies from 'js-cookie';
import Password from "../../components/elements/amdital/Password";
import Button from "../../components/elements/amdital/ButtonNew";
import axios from 'axios';
import { useSnackbar } from 'notistack';
import he from 'he';
import config from "../../config/config";
import { useNavigate } from "react-router-dom";

const ChangePassword = (props) => {

      const navigate = useNavigate();
      const { enqueueSnackbar } = useSnackbar();
      const data = Cookies.get('token');
      const user_details = data ?  JSON?.parse(data) : "";
      const token = user_details?.authToken;
      const userId = props?.formData?.dataBaseUserId;
  
  const [fields, setFields] = useState({
    old_password: "",
    password: "",
    confirm_password: "",
  });

    const [buttonClicked,setButtonClicked]= useState(false)

  const handleChange = (e) =>{
    const {name , value} = e.target;
    setFields({...fields,[name]:value})
  }

const updatePassword = async (e)=>{
  e.preventDefault();
  if( fields?.confirm_password !== fields?.password){
         setFields({...fields,confirm_password:""});
        enqueueSnackbar("Confirm password does not match the new password.", {
          variant: 'error',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          style:{
            background:"#FF0000",
            size:"16px",
            fontWeight:"500",
            color:"#FFFFFF"
          },
        });
        return false
  }  
    setButtonClicked(true);

  const { old_password, password}= fields

  const graphqlQuery = {
    query: `
        mutation UpdateUser($input: UpdateUserInput!) {
          updateUser(input: $input) {
            user {
              id
            }
          }
        }
      `,
        variables: {
          input: {
          "id": userId,
           "oldPassword": old_password,
           "password": password
          },
        },
      };     

      try {
        const res = await axios.post(config.API_URL,graphqlQuery,{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        } );
        
          if (res.data.errors) {
                const errorMessage = he.decode(res.data.errors[0]?.message || "Network error occurred");
                const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
                enqueueSnackbar(message, {
                  variant: 'error',
                  autoHideDuration: 1500,
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                  },
                  style:{
                    background:"#FF0000",
                    size:"16px",
                    fontWeight:"500",
                    color:"#FFFFFF"
                  },
                }); setButtonClicked(false);
          } 
        if (res.data.data?.updateUser?.user) {
          const errorMessage = he.decode("Successfully Updated");
          const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
          enqueueSnackbar(message, {
            variant: 'error',
            autoHideDuration: 1500,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            style:{
              background:"#FFFFFF",
              size:"16px",
              fontWeight:"600",
              lineHeight:"20px",
              color:"#26212E"
            },
          });
          setTimeout(()=>{
            navigate('/logout')
          },[1500])
          
          setButtonClicked(false);
          } 
                            
      } catch (error) {    
        setButtonClicked(false);    
      };







}

  return (
    <div className={` ${buttonClicked && `pointer-events-none`} w-full  sm:w-[531px] h-fit rounded border border-[#EAEAEA] custom-shadow bg-[#FFFFFF] p-6 `}>
      <div className=' mb-4 text-[#26212E] text-lg font-semibold leading-6  '>Change Password</div>
      <form onSubmit={updatePassword}  className=" w-full  ">
            <Password
              label="Old Password"
              id="password"
              name="old_password"
              value={fields?.old_password}
              onChange={handleChange}
              placeholder={"Enter the password"}
              classInput=" w-full  h-10 "
              wrapperClass=" mb-4"
              required="required"
              autoComplete="autoComplete"
              // pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$"
              title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            />
            <Password
              label="Create New Password"
              id="password"
              name="password"
              value={fields?.password}
              onChange={handleChange}
              placeholder={"Enter the password"}
              classInput=" w-full  h-10 "
              wrapperClass="mt-4 mb-4"
              required="required"
              autoComplete="autoComplete"
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$"
              title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            />

            <Password
              label="Confirm New Password"
              id="password"
              name="confirm_password"
              value={fields?.confirm_password}
              onChange={handleChange}
              placeholder={"Enter the password"}
              classInput=" w-full  h-10 "
              wrapperClass="mt-4 mb-4"
              required="required"
              autoComplete="autoComplete"
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$"
              title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            />    

        <div className="flex items-center gap-4 mt-6 text-[16px] leading-4 font-bold ">
          <Button
              type="submit"
              buttonName= "Update Now"
              buttonClassName = {` ${ buttonClicked ? ` w-[140px]  bg-[#6048F1] ` : ` w-[130px] bg-[#806BFF] hover:bg-[#6048F1] ` }  h-10 cursor-pointer  rounded  text-sm leading-3 font-semibold text-[#FFFFFF]  `}
              spanClassName = " border-[#FFFFFF] "
              isLoading= {buttonClicked}
          />
          <button onClick={()=>{props?.closeHandler()}} type="button" className="  text-[#74689280] hover:text-[#988FB1] h-fit w-fit  ">Cancel </button>
        </div>
        

      </form>
    </div>
  );
};
export default ChangePassword;
