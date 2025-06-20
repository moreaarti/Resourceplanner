import React, { useEffect, useState } from 'react'
import AddCheckoutNotes from './AddCheckoutNotes';
import config from '../../../config/config';
import AddTimerCheckoutNotes from './AddTimerCheckoutNotes';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import NavbarTask from '../../../features/navbar-task/NavbarTask';
import axios from 'axios';
import Cookies from 'js-cookie';
import he from 'he';
import { useSnackbar } from 'notistack';
import Button from './ButtonNew';
import getAttendanceRecords from '../../../features/hr/attendance/attendence';
import AttendanceWorkTime from '../../../features/hr/attendance/AttendanceWorkTime';
import AttendanceBreakTime from '../../../features/hr/attendance/AttendanceBreakTime';
import { setToggleAttendanceApiCall } from '../../../features/hr/attendance/attendanceSlice';
import { errorMessageHandler } from './toastyMessage';
import { updateAttendanceRestApi } from '../../../features/general/restApicalls';


export default function AttendanceNavbar() {

  const dispatch = useDispatch();

  const integrationRedux = useSelector(store => store?.settings?.setting_Integration_data);

  const slack_filter_data = integrationRedux?.length > 0 ?  integrationRedux?.filter(item => item?.name === "Slack") :[]

  const slack_details = slack_filter_data?.length > 0 ? slack_filter_data?.[0] : {} 

  const { enqueueSnackbar } = useSnackbar();

  const data = Cookies.get('token');

  const user_details = data ?  JSON?.parse(data) : "";

  const slack_id = user_details?.user?.slackUserId
  
  const token = user_details?.authToken;

  const attendance =  useSelector(state=>state?.general);

    const attendance_data = attendance?.attendance_data?.length > 0 ? attendance?.attendance_data?.filter((item,index,arr)=>{
      if(index === arr?.length -1){
        return item
      }
    })?.[0] : {};

    


  const attendance_details = attendance_data;

  const attendance_activity_status = attendance_data?.last_activity_type;

  const attendance_id = attendance_data?.id;

  const break_id =attendance_data?.break_logs?.length > 0 ? attendance_data?.break_logs.filter(item => item?.break_end_time=== null).map(item=>item?.id)?.[0] : null;

  const task_redux = useSelector(state=>state?.task);
  const task_timer = task_redux?.timer?.timer_task;
  const toggle_timer = task_redux?.toggleTimer;


  const [buttonLoader,setButtonLoader]= useState(false);
  const [buttonName,setbuttonName] =useState("")

  const [timerCheckoutNotesPop,setTimerCheckoutNotesPop]=useState(false);

  const [showCheckoutPop,setShowCheckoutPop] = useState(false);

  const [userNotes,setUserNotes] = useState(attendance_details?.user_notes);

  const [checkoutNotes,setCheckoutNotes] = useState(attendance_details?.user_notes)


  useEffect(()=>{
    setUserNotes(attendance_details?.user_notes)
    setCheckoutNotes(attendance_details?.user_notes)
  },[attendance])

// const toggleTimer = () => {
//        dispatch(togglePopupTimer());
//      };

const timerCheckoutNotesPopHandler =()=>{
      setTimerCheckoutNotesPop(!timerCheckoutNotesPop)
    }
const showCheckoutPopButtonHandler =()=>{
      setShowCheckoutPop(!showCheckoutPop)
     }

  const AttandanceModuleAPiCall = ()=>{
    dispatch(setToggleAttendanceApiCall())
  }
  const onChangeUserNotesHandler = (e)=>{
    setUserNotes(e.target.value)
  }
  const onChangeCheckoutNotesHandler = (e)=>{
    setCheckoutNotes(e.target.value)
  }



const checkinHandler = async () =>{
  setbuttonName("checkin");
  setButtonLoader(true);
        try {
          if(slack_details?.is_enabled && slack_details?.api_url  && slack_details?.api_key && slack_id){
              const slack_response = await updateAttendanceRestApi(slack_id, slack_details?.api_url, "checkin");
              setButtonLoader(false);
              const attendance_data = await getAttendanceRecords();
                                           AttandanceModuleAPiCall()
              if(slack_response?.success){
                setButtonLoader(false);
                const message = <div dangerouslySetInnerHTML={{ __html: "Check-in Successfully." }} />
                const finalMessage = (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img
                      src={config.PUBLIC_URL + "/assets/images/amdital/success_icon.svg"}
                      alt="Success"
                      style={{ width: "20px", height: "20px" }}
                    />
                    {message}
                  </div>
                );
                enqueueSnackbar(finalMessage, {
                  autoHideDuration: 1500,
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                  style: {
                    background: "#FFFFFF",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#26212E",
                    borderColor:"#E1DCFF",
                  },
                });
                return false
              }
              if(slack_response?.message){
                const errorMessage = he.decode(slack_response?.message || "Network error occurred");
                const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
                  const finalMessage = (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img
                      src={config.PUBLIC_URL + "/assets/images/amdital/error_cross_icon.svg"}
                      alt="Success"
                      style={{ width: "20px", height: "20px" }}
                    />
                    {message}
                  </div>
                );
                enqueueSnackbar(finalMessage, {
                  autoHideDuration: 1500,
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                  style: {
                    background: "#FFFFFF",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#26212E",
                    borderColor:"#E1DCFF",
                  },
                });

              }
            return false;
          }
          else{
            const graphqlQuery = {
              query: `
              mutation CreateAttendanceAndFetch($input: CreateAttendanceInput!) {
                createAttendance: createAttendance(input: $input) {
                  success
                  message
                  id
                  last_activity_type
                }
  
              }
            `,
            variables: {
              input: {
                check_in_time: true,
              },
            },
          }; 

            const res = await axios.post(config.API_URL,graphqlQuery,{
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            } );
            const attendance_data = await getAttendanceRecords();
  
            if (res.data.errors) {
              setButtonLoader(false);
                  const errorMessage = he.decode(res.data.errors[0]?.message || "Network error occurred");
                  const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
                  const finalMessage = (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img
                      src={config.PUBLIC_URL + "/assets/images/amdital/error_cross_icon.svg"}
                      alt="Success"
                      style={{ width: "20px", height: "20px" }}
                    />
                    {message}
                  </div>
                );
                enqueueSnackbar(finalMessage, {
                  autoHideDuration: 1500,
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                  style: {
                    background: "#FFFFFF",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#26212E",
                    borderColor:"#E1DCFF",
                  },
                });
            } 
          if (res.data.data?.createAttendance?.success === false) {
              setButtonLoader(false);
              const errorMessage = he.decode(res.data.data?.createAttendance?.message || "Network error occurred");
              const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
              const finalMessage = (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <img
                    src={config.PUBLIC_URL + "/assets/images/amdital/error_cross_icon.svg"}
                    alt="Success"
                    style={{ width: "20px", height: "20px" }}
                  />
                  {message}
                </div>
              );
              enqueueSnackbar(finalMessage, {
                autoHideDuration: 1500,
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
                style: {
                  background: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#26212E",
                  borderColor:"#E1DCFF",
                },
              });
            } 
          if (res.data.data?.createAttendance?.success) {
            AttandanceModuleAPiCall()
            setButtonLoader(false);
            const errorMessage = he.decode(res.data.data?.createAttendance?.message || "Network error occurred");
            const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
            const finalMessage = (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img
                  src={config.PUBLIC_URL + "/assets/images/amdital/success_icon.svg"}
                  alt="Success"
                  style={{ width: "20px", height: "20px" }}
                />
                {message}
              </div>
            );
            enqueueSnackbar(finalMessage, {
              autoHideDuration: 1500,
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
              style: {
                background: "#FFFFFF",
                fontSize: "16px",
                fontWeight: "600",
                color: "#26212E",
                borderColor:"#E1DCFF",
              },
            });
  
            } 
          }              
        } catch (error) {
          setButtonLoader(false);
        };                     
}

const startBreakAttendanceHandler = async () =>{

  // const slackId = await getSlackIdApi(user_details?.user?.id);

  // console.log("slackId",slackId);
  // return false
  setbuttonName("startbreak");
  setButtonLoader(true);
  try {
    if(slack_details?.is_enabled && slack_details?.api_url  && slack_details?.api_key && slack_id){
        const slack_response = await updateAttendanceRestApi(slack_id, slack_details?.api_url, "break");
        setButtonLoader(false);
        const attendance_data = await getAttendanceRecords();
                                     AttandanceModuleAPiCall()
        if(slack_response?.success){
          setButtonLoader(false);
          const message = <div dangerouslySetInnerHTML={{ __html: "Break Started, Timer Stopped" }} />
          const finalMessage = (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={config.PUBLIC_URL + "/assets/images/amdital/success_icon.svg"}
                alt="Success"
                style={{ width: "20px", height: "20px" }}
              />
              {message}
            </div>
          );
          enqueueSnackbar(finalMessage, {
            autoHideDuration: 1500,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            style: {
              background: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "600",
              color: "#26212E",
              borderColor:"#E1DCFF",
            },
          });
          return false;
        }
        if(slack_response?.message){
          const errorMessage = he.decode(slack_response?.message || "Network error occurred");
          const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
            const finalMessage = (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={config.PUBLIC_URL + "/assets/images/amdital/error_cross_icon.svg"}
                alt="Success"
                style={{ width: "20px", height: "20px" }}
              />
              {message}
            </div>
          );
          enqueueSnackbar(finalMessage, {
            autoHideDuration: 1500,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            style: {
              background: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "600",
              color: "#26212E",
              borderColor:"#E1DCFF",
            },
          });

        }
      return false;
    }
    else{
      const graphqlQuery = {
        query: `mutation UpdateAttendance($input: UpdateAttendanceInput!) { updateAttendance(input: $input) { success message id last_activity_type }}`,
      variables: {
        input: {
          "attendance_id": attendance_id,
          "break_time_start": true,
        },
      },
    };         
  try{
    const  res =  await axios.post(config.API_URL,graphqlQuery,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    } );
    const attendance_data = await getAttendanceRecords();
   if(res?.data?.data?.updateAttendance?.success){
    const successMessage = he.decode(res?.data?.data?.updateAttendance?.message || "Network error occurred");
    AttandanceModuleAPiCall()
              const message =<div dangerouslySetInnerHTML={{ __html: successMessage }} />
              const finalMessage = (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <img
                    src={config.PUBLIC_URL + "/assets/images/amdital/success_icon.svg"}
                    alt="Success"
                    style={{ width: "20px", height: "20px" }}
                  />
                  {message}
                </div>
              );
              enqueueSnackbar(finalMessage, {
                autoHideDuration: 1500,
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
                style: {
                  background: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#26212E",
                  borderColor:"#E1DCFF",
                },
              });
      setButtonLoader(false);
    }
    if(res?.data?.data?.updateAttendance?.success === false){
      const successMessage = he.decode(res?.data?.data?.updateAttendance?.message || "Network error occurred");
                const message = <div dangerouslySetInnerHTML={{ __html: successMessage }} />
                const finalMessage = (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img
                      src={config.PUBLIC_URL + "/assets/images/amdital/error_cross_icon.svg"}
                      alt="Success"
                      style={{ width: "20px", height: "20px" }}
                    />
                    {message}
                  </div>
                );
                enqueueSnackbar(finalMessage, {
                  autoHideDuration: 1500,
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                  style: {
                    background: "#FFFFFF",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#26212E",
                    borderColor:"#E1DCFF",
                  },
                });
        setButtonLoader(false);
      }
  }
  catch(e){
    setButtonLoader(false);
  } 
    }              
  } catch (error) {
    setButtonLoader(false);
  }; 
    
}
const endBreakAttendanceHandler = async () =>{
  setbuttonName("endbreak");
  setButtonLoader(true);
  try {
    if(slack_details?.is_enabled && slack_details?.api_url  && slack_details?.api_key && slack_id){
        const slack_response = await updateAttendanceRestApi(slack_id, slack_details?.api_url, "back");
        setButtonLoader(false);
        const attendance_data = await getAttendanceRecords();
                                     AttandanceModuleAPiCall()
        if(slack_response?.success){
          setButtonLoader(false);
          const message = <div dangerouslySetInnerHTML={{ __html: "Break Stopped, Timer Resumed." }} />
          const finalMessage = (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={config.PUBLIC_URL + "/assets/images/amdital/success_icon.svg"}
                alt="Success"
                style={{ width: "20px", height: "20px" }}
              />
              {message}
            </div>
          );
          enqueueSnackbar(finalMessage, {
            autoHideDuration: 1500,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            style: {
              background: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "600",
              color: "#26212E",
              borderColor:"#E1DCFF",
            },
          });
          return false;
        }
        if(slack_response?.message){
          const errorMessage = he.decode(slack_response?.message || "Network error occurred");
          const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
            const finalMessage = (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={config.PUBLIC_URL + "/assets/images/amdital/error_cross_icon.svg"}
                alt="Success"
                style={{ width: "20px", height: "20px" }}
              />
              {message}
            </div>
          );
          enqueueSnackbar(finalMessage, {
            autoHideDuration: 1500,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            style: {
              background: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "600",
              color: "#26212E",
              borderColor:"#E1DCFF",
            },
          });

        }
      return false;
    }
    else{
      const graphqlQuery = {
        query: `mutation UpdateAttendance($input: UpdateAttendanceInput!) { updateAttendance(input: $input) { success message id last_activity_type }}`,
      variables: {
        input: {
          "attendance_id": attendance_id,
          "break_id": break_id,
          "break_time_end": true
        },
      },
    };       
try{
const  res =  await axios.post(config.API_URL,graphqlQuery,{
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
} );
const attendance_data = await getAttendanceRecords();  

if(res?.data?.data?.updateAttendance?.success){
  const successMessage = he.decode(res?.data?.data?.updateAttendance?.message || "Network error occurred");
  AttandanceModuleAPiCall()
            const message = <div dangerouslySetInnerHTML={{ __html: successMessage }} />
            const finalMessage = (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img
                  src={config.PUBLIC_URL + "/assets/images/amdital/success_icon.svg"}
                  alt="Success"
                  style={{ width: "20px", height: "20px" }}
                />
                {message}
              </div>
            );
            enqueueSnackbar(finalMessage, {
              autoHideDuration: 1500,
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
              style: {
                background: "#FFFFFF",
                fontSize: "16px",
                fontWeight: "600",
                color: "#26212E",
                borderColor:"#E1DCFF",
              },
            });
  setButtonLoader(false);
}
else{
  const successMessage = he.decode(res?.data?.data?.updateAttendance?.message || "Network error occurred");
            const message = <div dangerouslySetInnerHTML={{ __html: successMessage }} />
            const finalMessage = (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img
                  src={config.PUBLIC_URL + "/assets/images/amdital/error_cross_icon.svg"}
                  alt="Success"
                  style={{ width: "20px", height: "20px" }}
                />
                {message}
              </div>
            );
            enqueueSnackbar(finalMessage, {
              autoHideDuration: 1500,
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
              style: {
                background: "#FFFFFF",
                fontSize: "16px",
                fontWeight: "600",
                color: "#26212E",
                borderColor:"#E1DCFF",
              },
            });
  setButtonLoader(false);
}

}
catch(e){
  setButtonLoader(false);
} 
    }              
  } catch (error) {
    setButtonLoader(false);
  };

}

const updateUserNotesHandler = async () =>{

  if(userNotes === attendance_details?.user_notes){
    const message = "Notes: No changes need to be updated."

   const finalMessage = (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <img
                    src={config.PUBLIC_URL + "/assets/images/amdital/error_cross_icon.svg"}
                    alt="Success"
                    style={{ width: "20px", height: "20px" }}
                  />
                  {message}
                </div>
              );
              enqueueSnackbar(finalMessage, {
                autoHideDuration: 1500,
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
                style: {
                  background: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#26212E",
                  borderColor:"#E1DCFF",
                },
              });
    return false;
  }
  setButtonLoader(true);
        const graphqlQuery = {
        query: `mutation UpdateAttendance($input: UpdateAttendanceInput!) { updateAttendance(input: $input) { success message id last_activity_type }}`,
        variables: {
          input: {
            "attendance_id": attendance_id,
            "user_notes":userNotes ,
          },
        },
      };         
    try{
      const  res =  await axios.post(config.API_URL,graphqlQuery,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      } );
      const attendance_data = await getAttendanceRecords();
     if(res?.data?.data?.updateAttendance?.success){
      timerCheckoutNotesPopHandler();
      AttandanceModuleAPiCall()
      const successMessage = he.decode(res?.data?.data?.updateAttendance?.message || "Network error occurred");
                const message =<div dangerouslySetInnerHTML={{ __html: successMessage }} />
                const finalMessage = (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img
                      src={config.PUBLIC_URL + "/assets/images/amdital/success_icon.svg"}
                      alt="Success"
                      style={{ width: "20px", height: "20px" }}
                    />
                    {message}
                  </div>
                );
                enqueueSnackbar(finalMessage, {
                  autoHideDuration: 1500,
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                  style: {
                    background: "#FFFFFF",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#26212E",
                    borderColor:"#E1DCFF",
                  },
                });
        setButtonLoader(false);
       
      }
      if(res?.data?.data?.updateAttendance?.success === false){
        const successMessage = he.decode(res?.data?.data?.updateAttendance?.message || "Network error occurred");
                  const message = <div dangerouslySetInnerHTML={{ __html: successMessage }} />
                  const finalMessage = (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <img
                        src={config.PUBLIC_URL + "/assets/images/amdital/error_cross_icon.svg"}
                        alt="Success"
                        style={{ width: "20px", height: "20px" }}
                      />
                      {message}
                    </div>
                  );
                  enqueueSnackbar(finalMessage, {
                    autoHideDuration: 1500,
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "right",
                    },
                    style: {
                      background: "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#26212E",
                      borderColor:"#E1DCFF",
                    },
                  });
          setButtonLoader(false);
        }
    }
    catch(e){
      setButtonLoader(false);
    }
} 

const checkoutNotesUpdateHandler = async()=>{

  const graphqlQuery = {
    query: `mutation UpdateAttendance($input: UpdateAttendanceInput!) { updateAttendance(input: $input) { success message id last_activity_type }}`,
    variables: {
      input: {
        "attendance_id": attendance_id,
        "checkout_notes": checkoutNotes
      },
    },
  };         
  try{
  const  res =  await axios.post(config.API_URL,graphqlQuery,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  } );
  const attendance_data = await getAttendanceRecords();
  AttandanceModuleAPiCall();
  }
  catch(e){
  
  }
}

const checkoutHandler = async () =>{
  setbuttonName("checkout");
  setButtonLoader(true);

  if(checkoutNotes ===""){
    errorMessageHandler(enqueueSnackbar,"Here mandiatory to fill the Checkout Notes")
    setButtonLoader(false);
    return false
  }
  checkoutNotesUpdateHandler();
  try {
    if(slack_details?.is_enabled && slack_details?.api_url  && slack_details?.api_key && slack_id){
        const slack_response = await updateAttendanceRestApi(slack_id, slack_details?.api_url, "checkout");
        setButtonLoader(false);
        const attendance_data = await getAttendanceRecords();
                                     AttandanceModuleAPiCall()
        if(slack_response?.success){
          showCheckoutPopButtonHandler()
          AttandanceModuleAPiCall()
          setButtonLoader(false);
          const message = <div dangerouslySetInnerHTML={{ __html: "Check-out Successfully." }} />
          const finalMessage = (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={config.PUBLIC_URL + "/assets/images/amdital/success_icon.svg"}
                alt="Success"
                style={{ width: "20px", height: "20px" }}
              />
              {message}
            </div>
          );
          enqueueSnackbar(finalMessage, {
            autoHideDuration: 1500,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            style: {
              background: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "600",
              color: "#26212E",
              borderColor:"#E1DCFF",
            },
          });
          return false;
        }
        if(slack_response?.message){
          const errorMessage = he.decode(slack_response?.message || "Network error occurred");
          const message = <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
            const finalMessage = (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={config.PUBLIC_URL + "/assets/images/amdital/error_cross_icon.svg"}
                alt="Success"
                style={{ width: "20px", height: "20px" }}
              />
              {message}
            </div>
          );
          enqueueSnackbar(finalMessage, {
            autoHideDuration: 1500,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            style: {
              background: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "600",
              color: "#26212E",
              borderColor:"#E1DCFF",
            },
          });

        }
      return false;
    }
    else{
      const graphqlQuery = {
        query: `mutation UpdateAttendance($input: UpdateAttendanceInput!) { updateAttendance(input: $input) { success message id last_activity_type }}`,
        variables: {
          input: {
            "attendance_id": attendance_id,
            "check_out_time": true,
            "checkout_notes": checkoutNotes
          },
        },
      };         
    try{
      const  res =  await axios.post(config.API_URL,graphqlQuery,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      } );
      const attendance_data = await getAttendanceRecords();
     if(res?.data?.data?.updateAttendance?.success){
      showCheckoutPopButtonHandler()
      AttandanceModuleAPiCall()
      const successMessage = he.decode(res?.data?.data?.updateAttendance?.message || "Network error occurred");
                const message =<div dangerouslySetInnerHTML={{ __html: successMessage }} />
            const finalMessage = (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={config.PUBLIC_URL + "/assets/images/amdital/success_icon.svg"}
                alt="Success"
                style={{ width: "20px", height: "20px" }}
              />
              {message}
            </div>
          );
          enqueueSnackbar(finalMessage, {
            autoHideDuration: 1500,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            style: {
              background: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "600",
              color: "#26212E",
              borderColor:"#E1DCFF",
            },
          });
        setButtonLoader(false);
      }
      if(res?.data?.data?.updateAttendance?.success === false){
        const successMessage = he.decode(res?.data?.data?.updateAttendance?.message || "Network error occurred");
                  const message = <div dangerouslySetInnerHTML={{ __html: successMessage }} />
                  const finalMessage = (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <img
                        src={config.PUBLIC_URL + "/assets/images/amdital/error_cross_icon.svg"}
                        alt="Success"
                        style={{ width: "20px", height: "20px" }}
                      />
                      {message}
                    </div>
                  );
                  enqueueSnackbar(finalMessage, {
                    autoHideDuration: 1500,
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "right",
                    },
                    style: {
                      background: "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#26212E",
                      borderColor:"#E1DCFF",
                    },
                  });
          setButtonLoader(false);
        }
    }
    catch(e){
      setButtonLoader(false);
    }
    }              
  } catch (error) {
    setButtonLoader(false);
  };


       
}



return (
    <>
      <div className=" flex h-8  ">
        {/* <input type='file' onChange={(e)=>{uploadFileHandler(e.target.file)}}/> */}
      {
        (attendance_activity_status !== null && attendance_activity_status !== undefined) &&  attendance_activity_status !== "check_out"   ? <div className="flex gap-4 relative items-center ">
          <div className="bg-[#F8F7FC] w-[217px]   h-8 rounded  flex items-center text-sm font-bold leading-4 tracking-[0.8px] text-[#260B6A]  ">
            <div className="flex w-1/2 gap-[10px] justify-center items-center px-4 py-2  border-[#DCD6FF] border-r ">
              <img className=" w-4 h-4 " src={config.PUBLIC_URL + "/assets/images/amdital/timer_navbar.svg"} alt=""/>
              <AttendanceWorkTime/>
            </div>
            <div className=' relative w-[43px]  h-full  ' >
                <div className=' relative w-full h-full flex justify-center items-center     cursor-pointer ' onClick={()=>{timerCheckoutNotesPopHandler()}}>
                  <img src={config.PUBLIC_URL + "/assets/images/amdital/checkout_notes.svg"} alt='' />
                </div>
                <div className="absolute">
                  <AddTimerCheckoutNotes
                    showCheckoutPop={timerCheckoutNotesPop} 
                    showCheckoutPopButtonHandler={timerCheckoutNotesPopHandler}
                    onChange={onChangeUserNotesHandler}
                    userNotes={userNotes}
                    submitHandler={updateUserNotesHandler}
                    isLoading= {buttonLoader}
                  />
              </div>
            </div>
            <div className="flex w-1/2  gap-[10px] border-l px-4 py-2  border-[#DCD6FF] justify-center items-center ">
              <img className="w-4 h-4" src={config.PUBLIC_URL + "/assets/images/amdital/break_navbar.svg"} alt=""/>
              <AttendanceBreakTime/>
            </div>
          </div>
          <div className="flex gap-4 relative ">
            {
              attendance_activity_status !== "break_start" ? <Button
              type="button"
              buttonName= "Start Break"
              buttonClassName = {` ${buttonLoader && buttonName === "startbreak" ? ` w-[130px] bg-[#F36A3D] ` :` w-[112px] bg-[#FF845C] `}  hover:bg-[#F36A3D] h-8  cursor-pointer outline-none text-sm font-semibold leading-4 tracking-[0.8px] border-[#FF845C]  text-[#FFFFFF]  `}
              spanClassName = " border-[#FFFFFF] "
              isLoading= {buttonLoader && buttonName === "startbreak"}
              onClick={()=>{startBreakAttendanceHandler();}}
            />
              :   <Button
              type="button"
              buttonName= "End Break"
              buttonClassName = {` ${buttonLoader && buttonName === "endbreak" ? ` w-[130px] bg-[#F36A3D] ` :` w-[112px] bg-[#FF845C] `}  hover:bg-[#F36A3D] h-8  cursor-pointer outline-none text-sm font-semibold leading-4 tracking-[0.8px] border-[#FF845C]  text-[#FFFFFF]  `}
              spanClassName = " border-[#FFFFFF] "
              isLoading= {buttonLoader && buttonName === "endbreak"}
              onClick={()=>{endBreakAttendanceHandler();}}
            />
            
            // <div onClick={endBreakAttendanceHandler} className=" cursor-pointer w-[112px] h-8 rounded flex justify-center items-center text-sm font-semibold leading-4 tracking-[0.8px] bg-[#F36A3D] text-[#FFFFFF] ">End Break</div>

            }
            <div className="relative">
                <div onClick={()=>{showCheckoutPopButtonHandler()}}  className={` ${ showCheckoutPop ? `bg-[#6048F1] ` : ` bg-[#806BFF] hover:bg-[#6048F1] ` } cursor-pointer w-[108px] h-8 rounded flex justify-center items-center text-sm font-semibold leading-4 tracking-[0.8px]  text-[#FFFFFF] `}>Check Out</div>
            </div>

            <div className="absolute">
                      <AddCheckoutNotes
                       showCheckoutPop={showCheckoutPop} 
                       attendance={attendance_details}
                       showCheckoutPopButtonHandler={showCheckoutPopButtonHandler}
                       checkoutHandler={checkoutHandler}
                       checkout_notes={checkoutNotes}
                       onChange={onChangeCheckoutNotesHandler}
                       isLoading={buttonLoader}
                      />
          </div>
            
          </div>
          {/* <div className={` cursor-pointer min-w-[22px] max-w-[22px] min-h-[22px] max-h-[22px] bg-[#FF0000] rounded-full flex items-center justify-center  ${toggle_timer ? ` z-[1200]` :``} `}
          onClick={toggleTimer}
          >
              {
                 task_timer ? <img src={config.PUBLIC_URL + "/assets/images/amdital/pause _icon.svg" } alt='' /> :
                 <img src={config.PUBLIC_URL + "/assets/images/amdital/play_icon.svg" } alt='' className='flex justify-center items-center ' />
              }

          </div> */}
          
        </div> : <Button
                          type="button"
                          buttonName= "Check In"
                          buttonClassName = {` ${buttonLoader ? ` w-[110px] bg-[#F36A3D] ` :` w-[95px] bg-[#FF845C] `} hover:bg-[#F36A3D]  h-8  cursor-pointer outline-none text-sm font-semibold leading-4 tracking-[0.8px] border-[#FF845C]  text-[#FFFFFF]  `}
                          spanClassName = " border-[#FFFFFF] "
                          isLoading= {buttonLoader}
                          onClick={()=>{checkinHandler();}}
                        />
      }
    </div>

    { 
        toggle_timer && <div className='fixed w-full h-full top-0 left-0 flex justify-end z-[1100] '>
                                  <div className=" mt-[62px] z-[1100] ">
                                    < NavbarTask  />
                                  </div>
              {toggle_timer && <div className='bg-[#150C2CB2] inset-0 fixed z-[1000] cursor-pointer '   ></div>}
          </div>
        }
  </>
  )
}
