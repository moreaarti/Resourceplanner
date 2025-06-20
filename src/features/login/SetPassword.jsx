import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config/config";
import PasswordBoxNew from "../../components/elements/PasswordBoxNew";
import Logo from "../../components/elements/amdital/Logo";
import Password from "../../components/elements/amdital/Password";
import Button from "../../components/elements/amdital/ButtonNew";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import he from 'he';
import SpinerLoader from "../../components/elements/amdital/SpinerLoader";

const SetPassword = () => {
  const stored_email = useSelector((state) => state?.auth?.data?.email);

  const [email] = useState(stored_email);

  const [buttonClicked,setButtonClicked]=useState(false);

  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [resendLoad,setResendLoad]=useState(false)


  const field_1 = useRef(null);
  const field_2 = useRef(null);
  const field_3 = useRef(null);
  const field_4 = useRef(null);
  const field_5 = useRef(null);
  const field_6 = useRef(null);

  const [otp, setOTP] = useState({
    field_1: "",
    field_2: "",
    field_3: "",
    field_4: "",
    field_5: "",
    field_6: "",
  });


  async function handleSubmit(e) {

    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPassword("");
      return;
    }

    if (
      otp.field_1 === "" ||
      otp.field_2 === "" ||
      otp.field_3 === "" ||
      otp.field_4 === "" ||
      otp.field_5 === "" ||
      otp.field_6 === ""
    ) {
      enqueueSnackbar("Please enter OTP", {
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
      return;
    }

    setButtonClicked(true);

    let new_otp =
      otp.field_1 +
      otp.field_2 +
      otp.field_3 +
      otp.field_4 +
      otp.field_5 +
      otp.field_6;


      const graphqlQuery  = {
        query:`mutation ChangeUserPassword {
                changeUserPassword(
                  input: {
                      email: "${email}",
                      password: "${password}",
                      otp: "${new_otp}",
                  }
                ) {
                  success
                  message
                }
              }`,
      };
  
      try {
        const res = await axios.post(config.API_LOGIN_URL,graphqlQuery);
  
        setButtonClicked(false);
    
        if(res?.data?.data?.changeUserPassword?.success === false){
          const errorMessage = he.decode(res?.data?.data?.changeUserPassword?.message || "Network error occurred");
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
          });
          setMinutes(0);
          setSeconds(0);
          return  ;
        }
        if(res?.data?.data?.changeUserPassword?.success === true){
          const errorMessage = he.decode(res?.data?.data?.changeUserPassword?.message || "Successfully  done");
          const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
          enqueueSnackbar(message, {
            variant: 'success',
            autoHideDuration: 1500,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            style:{
              background:"#00B656",
              size:"16px",
              fontWeight:"500",
              color:"#FFFFFF"
            },
          });
          navigate(`/login`);
        }
        
      } catch (error) {
        setButtonClicked(false);
        // navigate(`/login`);
        const errorMessage = he.decode( "error occurred");
        enqueueSnackbar(errorMessage, {
          variant: 'error', 
          autoHideDuration: 1500, 
          anchorOrigin: {
            vertical: 'top',    
            horizontal: 'right',
          },
        });

        
      
    };
  }


  function setOTPs(field, value) {
    if (field_1.current.value !== "" && field === "field_1") {
      field_2.current.focus();
    } else if (field_2.current.value !== "" && field === "field_2") {
      field_3.current.focus();
    } else if (field_3.current.value !== "" && field === "field_3") {
      field_4.current.focus();
    } else if (field_4.current.value !== "" && field === "field_4") {
      field_5.current.focus();
    } else if (field_5.current.value !== "" && field === "field_5") {
      field_6.current.focus();
    } else if (field_6.current.value !== "" && field === "field_6") {
      field_6.current.focus();
    }

    if (field_1.current.value === "" && field === "field_1") {
      field_1.current.focus();
    } else if (field_2.current.value === "" && field === "field_2") {
      field_1.current.focus();
    } else if (field_3.current.value === "" && field === "field_3") {
      field_2.current.focus();
    } else if (field_4.current.value === "" && field === "field_4") {
      field_3.current.focus();
    } else if (field_5.current.value === "" && field === "field_5") {
      field_4.current.focus();
    } else if (field_6.current.value === "" && field === "field_6") {
      field_5.current.focus();
    }

    setOTP((prev) => {
      return { ...prev, [field]: value };
    });
  }

  const [Minutes,setMinutes] =useState(1);
  const [Seconds,setSeconds] =useState(59);
  useEffect(()=>{

   const interval = setInterval(()=>{

       if(Seconds>0){
         setSeconds(Seconds - 1);
       }
       if(Seconds===0){
        clearInterval(interval);
       }

   },1000)
       
   return ()=>{
     clearInterval(interval)
   }

  },[Seconds] );

  return (
    <div className="flex min-h-[100vh] flex-col items-center background_color py-20 max-lg:py-10">
      <div className="mx-auto flex max-w-[85%] flex-col items-center">
      <Logo/>
        <div className=" flex w-full flex-col items-center rounded-lg border border-[#EAEAEA] bg-[#FFFFFF] p-10 max-sm:p-7">
          <div className="mb-10 flex flex-col items-center text-center">
            <p className="mb-1 headline_h1">Reset Password</p>
            <p className=" max-w-xs subtitle_s4 ">
            Set the new password for your account, so you can sign in and access all the features.
            </p>
          </div>
          <form
            className="flex w-full flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-full ">
              {/* <InputBox
                v2
                type={"number"}
                label="Verification Code *"
                id="verficiation_code"
                value={otp}
                wrapperclass="mb-4 w-full"
                inputclass="w-[22rem] min-w-full"
                onChange={(e) => setOTP(e.target.value)}
                required="required"
              /> */}
              <label className=" text-sm leading-4 font-medium text-[#26212E] ">Verification code <span className='text-[#EA4242]'>*</span></label>
                    <div
                    id="otp"
                    className="mb-4 mt-2 flex flex-wrap gap-1 md:gap-3 items-center"
                  >
                    <input
                      className="form-control h-10  w-10  md:w-[46px] border border-[#DCD6FF] rounded  bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] text-center "
                      type="text"
                      id="first"
                      maxLength="1"
                      ref={field_1}
                      name="field_1"
                      placeholder="9"
                      autoComplete="off"
                      onChange={(e) => setOTPs(e.target.name, e.target.value)}
                      value={otp.field_1}
                      onPaste={(e) => {
                        var types, pastedData;

                        if (
                          e &&
                          e.clipboardData &&
                          e.clipboardData.types &&
                          e.clipboardData.getData
                        ) {
                          types = e.clipboardData.types;

                          if (
                            (types instanceof DOMStringList &&
                              types.contains("text/plain")) ||
                            (types.indexOf && types.indexOf("text/plain") !== -1)
                          ) {
                            pastedData = e.clipboardData.getData("text/plain");

                            if (isNaN(pastedData)) {
                              e.stopPropagation();
                              e.preventDefault();
                              return false;
                            }

                            if (pastedData.length > 1) {
                              pastedData
                                ?.trim()
                                ?.split("")
                                ?.forEach((item, index) => {
                                  setOTPs("field_" + (index + 1), item);
                                  field_6.current.focus();
                                });
                            }
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                          }
                        }
                      }}
                    />
                    
                    <input
                      className="form-control h-10  w-10  md:w-[46px] border border-[#DCD6FF] rounded  bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] text-center "
                      type="text"
                      id="second"
                      maxLength="1"
                      placeholder="9"
                      ref={field_2}
                      name="field_2"
                      onChange={(e) => setOTPs(e.target.name, e.target.value)}
                      value={otp.field_2}
                      autoComplete="off"
                    />
            
                    <input
                      className="form-control h-10  w-10  md:w-[46px] border border-[#DCD6FF] rounded  bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] text-center "
                      type="text"
                      id="third"
                      placeholder="9"
                      maxLength="1"
                      ref={field_3}
                      name="field_3"
                      onChange={(e) => setOTPs(e.target.name, e.target.value)}
                      value={otp.field_3}
                      autoComplete="off"
                    />
                    <span>-</span>
                    <input
                      className="form-control h-10  w-10  md:w-[46px] border border-[#DCD6FF] rounded  bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] text-center "
                      type="text"
                      id="fourth"
                      maxLength="1"
                      placeholder="9"
                      ref={field_4}
                      name="field_4"
                      onChange={(e) => setOTPs(e.target.name, e.target.value)}
                      value={otp.field_4}
                      autoComplete="off"
                    />
                    
                    <input
                      className="form-control h-10  w-10  md:w-[46px] border border-[#DCD6FF] rounded  bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] text-center "
                      type="text"
                      id="fifth"
                      maxLength="1"
                      placeholder="9"
                      ref={field_5}
                      name="field_5"
                      onChange={(e) => setOTPs(e.target.name, e.target.value)}
                      value={otp.field_5}
                      autoComplete="off"
                    />
                    <input
                      className="form-control h-10  w-10  md:w-[46px] border border-[#DCD6FF] rounded  bg-[#F8F7FC] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#7C3AED] placeholder:text-[#9F9F9F] text-sm font-normal leading-[25px] text-[#26212E] text-center "
                      type="text"
                      id="sixth"
                      maxLength="1"
                      placeholder="9"
                      ref={field_6}
                      name="field_6"
                      onChange={(e) => setOTPs(e.target.name, e.target.value)}
                      value={otp.field_6}
                      autoComplete="off"
                    />
                </div>
            </div>
            <Password
              label="Password"
              id="password"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
              classInput=" w-full h-10 "
              wrapperClass=" mb-4 "
              required="required"
              autoComplete="new-password"
              placeholder="Enter new password"
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$"
              title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            />
            <Password
              label="Confirm Password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              classInput=" w-full h-10 "
              wrapperClass ="mb-6"
              required="required"
              autoComplete="new-password"
              placeholder="Enter confirm password"
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$"
              title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            />
            <div className="mb-4 flex w-full ">
              {/* <button
                type="submit"
                className={` w-full green_button  ${ buttonClicked ? `  bg-[#806BFF] pointer-events-none ` : ` bg-[#806BFF] ` }  hover:bg-[#806BFF] `}
              >
                Reset Password
              </button> */}
              <Button
                  type="submit"
                  buttonName= "Reset Password"
                  buttonClassName = {`  ${buttonClicked ? ` bg-[#6048F1] ` : ` bg-[#806BFF] hover:bg-[#6048F1] ` } w-full h-11  outline-none text-base leading-3 font-semibold text-[#FFFFFF]  mt-4 `}
                  spanClassName = " border-[#FFFFFF] "
                  isLoading= {buttonClicked}
                />
            </div>
            
            <div className="text-center subtitle_s4  ">
              <span>You didn't receive our email with verification code?</span>
              <p className="flex items-center justify-center">
                Please check spam or
                {Seconds !== 0 ?<span>
                    <span className={` ml-2  ${Seconds < 30 && Minutes ===0 ? "text-red-400":""} `}>
                      {Minutes<10?`0${Minutes}`:Minutes}:{Seconds<10?`0${Seconds}`:Seconds}
                    </span>
                  </span>:<span
                  className={` cursor-pointer w-fit flex gap-2 items-center h-10 link_l1 hover:text-[#8B5CF6] ml-1 ${resendLoad && ` pointer-events-none `} `}
                  onClick={async () => { 
                    setResendLoad(true);
                    const graphqlQuery  = {
                      "query": "mutation SendVerificationOtp($email: String!) { sendVerificationOtp(input: { email: $email }) { success message } }",
                      "variables": {
                        "email":`"${email}"`
                      }
                    }   
                        try {
                          const res = await axios.post(config.API_LOGIN_URL,graphqlQuery);

                          if (res?.data?.data?.sendVerificationOtp?.success === false) {
                            const errorMessage = he.decode(res?.data?.data?.sendVerificationOtp?.message || "Network error occurred");
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
                            });
                            setMinutes(1);
                            setSeconds(59);
                            setResendLoad(false);
                            return ;
                          }
                          if (res?.data?.data?.sendVerificationOtp?.success === true){
                            
                            const errorMessage = he.decode(res?.data?.data?.sendVerificationOtp?.message);
                            const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
                            enqueueSnackbar(message, {
                              variant: 'success',
                              autoHideDuration: 1500,
                              anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right',
                              },
                              style:{
                                background:"#00B656",
                                size:"16px",
                                fontWeight:"500",
                                color:"#FFFFFF"
                              },
                            });
                            setMinutes(1);
                            setSeconds(59);
                            setResendLoad(false);
                          }
                        } catch (error) {
                          const errorMessage = he.decode( "error occurred");
                          enqueueSnackbar(errorMessage, {
                            variant: 'error', 
                            autoHideDuration: 1500, 
                            anchorOrigin: {
                              vertical: 'top',    
                              horizontal: 'right',
                            },
                          });
                          setResendLoad(false);
                      };
                  }}
                >Resend {resendLoad && <SpinerLoader
                      spanClassName = " border-[#806BFF] "
                />}
                </span>} 
                
              </p>
            </div>

            <p className="text-center subtitle_s4 mt-4">
              Never mind, I remember my password.  Back to
              <Link to="/login" className="ml-1 hover:text-[#6048F1]  border-b border-transparent hover:border-[#6048F1]  link_l1">
              Sign in
              </Link>
            </p>
          </form>
        </div>
        <p className=" mt-[15px] text-[12px] leading-4 font-semibold text-[#FFFFFF] opacity-[70%]">
          © Amdital • Privacy & Terms
        </p>
      </div>
    </div>
  );
};

export default SetPassword;
