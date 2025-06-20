import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../components/elements/amdital/Logo";
import Input from "../../components/elements/amdital/Input";
import Password from "../../components/elements/amdital/Password";
import Button from "../../components/elements/amdital/ButtonNew";
import { updateRegisterData } from "./registerSlice";
import config from "../../config/config";
import he from 'he';
import { enqueueSnackbar } from "notistack";
import { errorMessageHandler } from "../../components/elements/amdital/toastyMessage";

const Register = () => {

  const navigate = useNavigate();
  const register_data = useSelector((state) => state.register.data);
  const [fields, setFeilds] = useState(register_data);
  const dispatch = useDispatch();

  const [buttonClickedApiCall,setButtonClickedApiCall]=useState(false);

  async function handleSubmit(e) {

    setButtonClickedApiCall(true);
    e.preventDefault();

    if (fields.password !== fields.confirmPassword) {
      setFeilds({ ...fields, confirmPassword: "" });
      setButtonClickedApiCall(false);
      errorMessageHandler(enqueueSnackbar, "The Confirm Password must match the password.")
      return;
    }

    const graphqlQuery  = {
      "query": `
        mutation SendVerificationOtp($email: String!, $newRegistration: Boolean!) { 
          sendVerificationOtp(input: { email: $email, newRegistration: $newRegistration }) { 
            success 
            message 
          } 
        }
      `,
      "variables": {
        "email": fields?.email,
        "newRegistration": true
      }
    };
    

        try {
          const res = await axios.post(config.API_LOGIN_URL,graphqlQuery);
    
          // Check if GraphQL returned errors
          if (res?.data?.data?.sendVerificationOtp?.success === false &&  res?.data?.data?.sendVerificationOtp?.message === "OTP already triggered. Please wait before requesting again.") {
            setFeilds((prev) => {
              return { ...prev, isVerificationScreen: true };
            });
            dispatch(updateRegisterData({ ...fields, isVerificationScreen: true }));
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
            setButtonClickedApiCall(false);
            navigate("/verify");
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
            setButtonClickedApiCall(false);
            return ;
          }
          if (res?.data?.data?.sendVerificationOtp?.success === true){
            setFeilds((prev) => {
              return { ...prev, isVerificationScreen: true };
            });
            dispatch(updateRegisterData({ ...fields, isVerificationScreen: true }));
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
            navigate("/verify");
            setButtonClickedApiCall(false);

          }
          // else{
          //   const errorMessage = he.decode(res?.data?.data?.sendVerificationOtp?.message);
          //   const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
          //   enqueueSnackbar(message, {
          //     variant: 'warning',
          //     autoHideDuration: 1500,
          //     anchorOrigin: {
          //       vertical: 'top',
          //       horizontal: 'right',
          //     },
          //     style:{
          //       background:"#00B656",
          //       size:"16px",
          //       fontWeight:"500",
          //       color:"#FFFFFF"
          //     },
          //   });
          //   setButtonClickedApiCall(false);
          // }
          setButtonClickedApiCall(false);
        } catch (error) {
    
          setButtonClickedApiCall(false);
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
    <div className="flex my-auto mx-auto min-h-screen flex-col items-center pt-[66px] background_color ">
      <div className="mx-auto flex max-w-[85%] flex-col items-center">
        <Logo/>
        <div className=" flex w-full flex-col items-center rounded border border-[#EAEAEA] bg-[#FFFFFF] p-10 max-sm:p-7 custom-shadow ">
          <div className="mb-10 flex flex-col items-center text-center">
            <p className="mb-1 headline_h1">Create your account</p>
            <p className=" subtitle_s4 ">Enter your details.</p>
          </div>
          <form
            className="flex w-full flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-full md:flex  md:gap-4 mb-4">
                <Input
                required="required"
                classInput="w-full  h-10 "
                labelName={"First Name"}
                type="text"
                id="first_name"
                maxLength={50}
                placeholder="Enter your first name"
                name="firstName"
                value={fields.firstName}
                onChange={(e) => {

                    if (
                      /^[a-zA-Z]+$/.test(e.target.value) ||
                      e.target.value === ""
                    ) {
                      if(e.target.value?.length > 50){
                        errorMessageHandler(enqueueSnackbar,"The maximum limit is 50 characters.")
                      }
                      setFeilds((prev) => {
                        return { ...prev, firstName: e.target.value };
                      });
                    }
                  }}
                  autoComplete="off"
              />
              <Input
                  required="required"
                  classInput="w-full h-10 "
                  labelName={"Last Name"}
                  type="text"
                  placeholder="Enter your last name"
                  id="last_name"
                  name="lastName"
                  value={fields.lastName}
                  autoComplete="off"
                  maxLength={50}
                  onChange={(e) => {
                    if (
                      /^[a-zA-Z]+$/.test(e.target.value) ||
                      e.target.value === ""
                    ) {
                      if(e.target.value?.length > 50){
                        errorMessageHandler(enqueueSnackbar,"The maximum limit is 50 characters.")
                      }
                      setFeilds((prev) => {
                        return { ...prev, lastName: e.target.value };
                      });
                    }
                  }}
              />
            </div>
            <div className="w-full md:flex  md:gap-4 mb-4">
            <Input
              // wrapperClass="mb-4"
              type="email"
              classInput="w-full h-10 "
              labelName="Email"
              id="email_address"
              placeholder="Enter your email"
              name="email"
              value={fields.email}
              onChange={(e) => {
                setFeilds((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
              required="required"
              autoComplete="off"
            />
            <Input
              // wrapperClass="mb-4"
              type="tel"
              classInput="w-full h-10 "
              labelName="Contact Number"
              id="contact_number"
              placeholder="Enter your contact number"
              name="phone"
              value={fields.phone}
              autoComplete="off"
              onChange={(e) => {
                if (
                  /^[0-9]+$/.test(e.target.value) ||
                  e.target.value === ""
                ) {
                  setFeilds((prev) => {
                    return {
                      ...prev,
                      phone: e.target.value.replace(/^0/, ""),
                    };
                  });
                }
              }}
              minLength={10}
              maxLength={10}
              required="required"
              title={"Valid mobile number is required and must be 10 digits long."}
            />
          </div>
          <div className="w-full md:flex  md:gap-4 mb-4">
            <Password
              // wrapperClass="mb-4"
              label="Password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={fields.password}
              onChange={(e) => {
                setFeilds((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
              classInput="w-full h-10"
              autoComplete="new-password"
              passwordclass="w-full h-10"
              required="required"
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$"
              title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            />
            <Password
              // wrapperClass="mb-4"
              label="Confirm Password"
              id="confirm_password"
              name={"confirmPassword"}
              placeholder="Confirm your password"
              value={fields.confirmPassword}
              onChange={(e) => {
                setFeilds((prev) => {
                  return { ...prev, confirmPassword: e.target.value };
                });
              }}
              classInput="w-full h-10 "
              required="required"
              autoComplete="new-password"
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$"
              title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            />
            </div>
            <Input
                required="required"
                 wrapperClass="mb-4"
                classInput="w-full  h-10 "
                labelName={"Company Name"}
                type="text"
                id="companyName"
                maxLength={50}
                placeholder="Enter your company name"
                name="companyName"
                value={fields.companyName}
                onChange={(e) => {
                      setFeilds((prev) => {
                        return { ...prev, companyName: e.target.value };
                      });
                  }}
                  autoComplete="off"
              />
            <div className="mb-10 max-w-xs place-self-start custom-table ">
              <label
                htmlFor="checkbox"
                className="flex items-center  cursor-pointer text-xs font-medium"
              >
                <div className="relative h-5">
                  <input
                    type="checkbox"
                    id="checkbox"
                    required
                    className=" mr-3 h-4 w-4 flex-none cursor-pointer  border border-[#DDDDDD] "
                  />
                 
                </div>
                <span className=" flex gap-1 content_c3 ">
                I agree to Amdital's 
                  <a
                    // href="https://www.vmaintain.com/terms-and-conditions/"
                    target="_blank"
                    rel="noreferrer"
                    className=" link_l1  border-b border-transparent hover:border-[#6048F1] hover:text-[#6048F1] "
                  >
                    {" "}
                    Terms of Service.
                    {/* <hr className=" border-[#806BFF] hover:border-[#806BFF] "/>  */}
                  </a>
                </span>
              </label>
            </div>
            <div className="mb-4 flex w-full max-sm:justify-center ">
              <Button
                  type="submit"
                  buttonName= "Sign Up"
                  buttonClassName = {` w-full h-11  ${buttonClickedApiCall ? ` bg-[#6048F1] ` : ` bg-[#806BFF] hover:bg-[#6048F1] ` } outline-none text-base leading-3 font-semibold text-[#FFFFFF]  `}
                  spanClassName = " border-[#FFFFFF] "
                  isLoading= {buttonClickedApiCall}
                
                />
            </div>
            <p className="text-center tracking-tight subtitle_s4">
                Already have a Amdital account?
              <Link to="/login" className=" link_l1 ml-1 border-b border-transparent hover:border-[#6048F1]  hover:text-[#6048F1]">
                Sign In
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

export default Register;
