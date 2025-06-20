import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config/config";
import Logo from "../../components/elements/amdital/Logo";
import Input from "../../components/elements/amdital/Input";
import Button from "../../components/elements/amdital/ButtonNew";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import he from 'he';
import { updatAuthCredentials } from "./authSlice";

const ResetPassword = () => {
  const stored_email = useSelector((state) => state?.auth?.data?.email);
  const [email, setEmailAddress] = useState(stored_email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonClicked,setButtonClicked]=useState(false);


  async function handleSubmit(e) {

    setButtonClicked(true);
    e.preventDefault();

    const graphqlQuery  = {
      "query": "mutation SendVerificationOtp($email: String!) { sendVerificationOtp(input: { email: $email }) { success message } }",
      "variables": {
        "email":`"${email}"`,
        "newRegistration": false
      }
    }


    const login_details ={email: email}
    dispatch(updatAuthCredentials({login_details}));

        try {
          const res = await axios.post(config.API_LOGIN_URL,graphqlQuery);
    
          // Check if GraphQL returned errors
          if (res?.data?.data?.sendVerificationOtp?.success === false &&  res?.data?.data?.sendVerificationOtp?.message === "OTP already triggered. Please wait before requesting again.") {
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
            setButtonClicked(false);
            navigate("/set-password");
            return ;
          }
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
            setButtonClicked(false);
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
            navigate("/set-password");
            setButtonClicked(false);

          }
          setButtonClicked(false);
        } catch (error) {
    
          setButtonClicked(false);
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

  return (
    <div className="flex min-h-[100vh] flex-col items-center background_color py-20 max-lg:py-10">
      <div className="mx-auto flex max-w-[85%] flex-col items-center">
      <Logo/>
        <div className=" flex w-full flex-col items-center rounded-lg border border-[#EAEAEA] bg-[#FFFFFF] custom-shadow p-10 max-sm:p-7">
          <div className="mb-10 flex flex-col items-center text-center text-[#1C1C1C]">
            <p className=" mb-1 headline_h1 ">Forgot Password</p>
            <p className="w-full md:w-[312px] subtitle_s4">
              Enter your email for the verification process. We will send a code
              to your email.
            </p>
          </div>
          <form
            className="flex w-full flex-col items-center"
            onSubmit={handleSubmit}
          >
            <Input
              type="email"
              labelName="Email"
              id="email_address"
              name="email"
              value={email}
              onChange={(e) => {
                setEmailAddress(e.target.value);
                // dispatch(updateEmail(e.target.value));
              }}
              required="required"
              autocomplete="autocomplete"
              placeholder="Enter the email ID"
              classInput="w-full h-10 "
              wrapperClass=""
            />
            <div className="mb-4 w-full mt-10">
              <Button
                  type="submit"
                  buttonName= "Continue"
                  buttonClassName = {` ${buttonClicked ? ` bg-[#6048F1] ` : ` bg-[#806BFF] hover:bg-[#6048F1] ` } w-full h-11  outline-none  text-base leading-3 font-semibold text-[#FFFFFF]  `}
                  spanClassName = " border-[#FFFFFF] "
                  isLoading= {buttonClicked}
                />
            </div>
            <p className="text-center subtitle_s4 ">
              Never mind, I remember my password. Back to
              <Link to="/login" className=" link_l1 border-b border-transparent hover:border-[#6048F1]  hover:text-[#6048F1] ml-1">
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

export default ResetPassword;
