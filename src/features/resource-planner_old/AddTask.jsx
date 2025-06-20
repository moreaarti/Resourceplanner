import React, { useEffect, useState } from 'react'
import config from '../../config/config'
import ButtonNew from '../../components/elements/amdital/ButtonNew'
import Input from '../../components/elements/amdital/Input';
import CustomDateInput from '../../components/elements/amdital/CustomDate/CustomDateInput';
import TaskStatusDropdown from './TaskStatusDropdown';
import { addTaskHandler } from './projectTaskFunction';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { errorMessageHandler } from '../../components/elements/amdital/toastyMessage';
import { getTaskListViewApi } from './myTaskApi';
import ProjectDropDownNew from '../projects_new/ProjectDropDownNew';
import InputTextArea from '../../components/elements/amdital/InputTextArea';
import { useSelector } from 'react-redux';
import { getProjectDropdownList } from '../projects_new/projectApi';

export default function AddTask({onCloseHandler}) {

    const { enqueueSnackbar } = useSnackbar();

    const userDetails = useSelector(store=>store?.auth?.data?.user);

    const [buttonClicked,setButtonClicked] = useState(false);

    const [fields,setFields] = useState({
        clientMutationId:"CreateProjectTask",
        title:"",
        startDate:"",
        dueDate:"",
        status:"PUBLISH",
        estimate:0,
        taskStatues: {nodes:[]},
        assignedTo:userDetails?.userId,
        relatedProject:null,
        content:""
    });
    const [inputValue, setInputValue] = useState("")
    const [isValid, setIsValid] = useState(true);
    const [isFocused, setIsFocused] = useState(false)

    const onChangeHandler = (e)=>{
        const { name , value} = e.target;
        setFields({...fields,[name]:value})
    }

          const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

        const getBorderColor = () => {
        if (isFocused && inputValue) {
            return isValid ? "  border-2 border-green-500 shadow-sm shadow-green-200" : " border-2 border-red-500 shadow-sm shadow-red-200"
        }
        return "border-[#E1DCFF]  border"
    }

const parseTimeInput = (input) => {
    if (!input || input.trim() === "") {
        return { isValid: true, minutes: 0, error: "" }
    }

    const normalizedInput = input.toLowerCase().trim()

    const patterns = [
        { regex: /^(\d+)$/, type: 'hours_only' },
        { regex: /^(\d+)h$/, type: 'hours' },
        { regex: /^(\d+)hour$/, type: 'hours' },
        { regex: /^(\d+)hours$/, type: 'hours' },
        { regex: /^(\d+)m$/, type: 'minutes' },
        { regex: /^(\d+)min$/, type: 'minutes' },
        { regex: /^(\d+)mins$/, type: 'minutes' },
        { regex: /^(\d+)minute$/, type: 'minutes' },
        { regex: /^(\d+)minutes$/, type: 'minutes' },
        { regex: /^(\d+)h\s+(\d+)m$/, type: 'combined' },
        { regex: /^(\d+)h\s*(\d+)m$/, type: 'combined' },
        { regex: /^(\d+)h\s*(\d+)min$/, type: 'combined' },
        { regex: /^(\d+)h\s*(\d+)mins$/, type: 'combined' },
        { regex: /^(\d+)hour\s+(\d+)minute$/, type: 'combined' },
        { regex: /^(\d+)hour\s+(\d+)min$/, type: 'combined' },
        { regex: /^(\d+)hour\s+(\d+)mins$/, type: 'combined' },
        { regex: /^(\d+)hours\s+(\d+)minutes$/, type: 'combined' },
        { regex: /^(\d+)h\s+(\d+)minute$/, type: 'combined' },
        { regex: /^(\d+)h\s+(\d+)minutes$/, type: 'combined' },
        { regex: /^(\d+)hour\s+(\d+)m$/, type: 'combined' },
        { regex: /^(\d+)hours\s+(\d+)m$/, type: 'combined' },
        { regex: /^(\d+)hour\s*(\d+)m$/, type: 'combined' },
        { regex: /^(\d+)hours\s*(\d+)m$/, type: 'combined' },
        { regex: /^(\d+)h\s*(\d+)minute$/, type: 'combined' },
        { regex: /^(\d+)h\s*(\d+)minutes$/, type: 'combined' },
        { regex: /^(\d+)hour\s*(\d+)minute$/, type: 'combined' },
        { regex: /^(\d+)hours\s*(\d+)minutes$/, type: 'combined' },
        { regex: /^(\d+)hour\s*(\d+)minutes$/, type: 'combined' },
        { regex: /^(\d+)hours\s*(\d+)minute$/, type: 'combined' }
    ]

    for (const pattern of patterns) {
        const match = normalizedInput.match(pattern.regex)
        if (match) {
            let totalMinutes = 0

            if (pattern.type === 'hours_only' || pattern.type === 'hours') {
                const hours = parseInt(match[1])
                if (hours < 1 || hours > 24) {
                    return { isValid: false, minutes: 0, error: "Hours must be between 1-24" }
                }
                totalMinutes = hours * 60
            } else if (pattern.type === 'minutes') {
                const minutes = parseInt(match[1])
                if (minutes < 1) {
                    return { isValid: false, minutes: 0, error: "Minutes must be at least 1" }
                }
                totalMinutes = minutes
            } else if (pattern.type === 'combined') {
                const hours = parseInt(match[1])
                const minutes = parseInt(match[2])
                if (hours < 1 || hours > 24) {
                    return { isValid: false, minutes: 0, error: "Hours must be between 1-24" }
                }
                if (minutes < 1 || minutes > 59) {
                    return { isValid: false, minutes: 0, error: "Minutes must be between 1-59" }
                }
                totalMinutes = (hours * 60) + minutes
            }

            return { isValid: true, minutes: totalMinutes, error: "" }
        }
    }

    return {
        isValid: false,
        minutes: 0,
        error: "Invalid format. Examples: 9 (9h), 200min, 1h 30m, 2hours 15minutes"
    }
}


        const handleInputChange = (e) => {
        const value = e.target.value
        setInputValue(value)
        
        const result = parseTimeInput(value)
        setIsValid(result.isValid)
        
        if (result.isValid) {
            setFields({...fields,estimate:result.minutes})
        }
    }


    const onSubmitAddTaskHandler = async (e)=>{
        e.preventDefault();
        if(fields?.startDate === ""){
            errorMessageHandler(enqueueSnackbar, "Please select a start date.");
            return false
        }
         if(fields?.dueDate === ""){
            errorMessageHandler(enqueueSnackbar, "Please select a due date.");
            return false
        }
          if(fields?.relatedProject === null){
            errorMessageHandler(enqueueSnackbar, "Please select a project.");
            return false
        }
        //   if(fields?.taskStatues?.nodes?.length === 0){
        //     errorMessageHandler(enqueueSnackbar, "Please select a task status.");
        //     return false
        // }
        setButtonClicked(true);
        const apiResponse = await addTaskHandler(fields,enqueueSnackbar,"Successfully added!");
        setButtonClicked(false)
        if(apiResponse?.data?.data){
            const apiResponse  = await getTaskListViewApi(userDetails?.userId);
            onCloseHandler();
        }
    }
    
    const fetchHandler = async ()=>{
       await  getProjectDropdownList();
    }
    useEffect(()=>{
        fetchHandler()
    },[])
  return (
    <>
    <form className=' relative' onSubmit={onSubmitAddTaskHandler} >
        <div className=' w-[350px]  min-h-screen border border-[#E1DCFF] bg-white '>

                <div className=' px-4 py-2 '>

                    <div className=' h-14 w-full flex justify-between items-center   '>
                        <div className=' text-lg text-[#FF845C] font-semibold leading-[100%] tracking-[0%] '>Add Task</div>
                        <img onClick={onCloseHandler} className=' cursor-pointer' src={config.PUBLIC_URL + "/assets/images/amdital/cross_icon_blue.svg"} alt=''/>
                    </div>
                    <div  className=' mt-4 flex flex-col gap-4 '>
                        <Input
                            id="title"
                            type="text"
                            name="title"
                            autoComplete="autoComplete"
                            placeholder="Enter title"
                            classInput=" w-full h-10 bg-white"
                            labelName={"Title"}
                            value={fields.title}
                            onChange={onChangeHandler}
                            required={"required"}
                        />
                        <div className=' flex  flex-col gap-4'>
                             <div className=' relative w-full  '>
                            <CustomDateInput
                                  label="Start Date"
                                  inputWidth="100%"
                                  inputHeight="40px"
                                  labelWidth="120px"
                                  value={fields.startDate}
                                   onChange={(e) => {
                                          setFields((prev) => ({
                                            ...prev,
                                            startDate: e.target.value,
                                          }));
                                         
                                        }}
                                  required={true}
                                  placeholder="YYYY/MM/DD"
                                  inputClass="w-full h-10 !bg-white"
                                /> 
                        
                              </div>
                            <div className=' relative w-full  '>
                                        <CustomDateInput
                                            label="Due Date"
                                            inputWidth="100%"
                                            inputHeight="40px"
                                            labelWidth="120px"
                                            value={fields.dueDate}
                                            onChange={(e) => {
                                                    setFields((prev) => ({
                                                        ...prev,
                                                        dueDate: e.target.value,
                                                    }));
                                                    }}
                                            required={true}
                                            placeholder="YYYY/MM/DD"
                                            inputClass="w-full h-10 !bg-white"
                                            /> 
                                   
                            </div>
                        </div>

                        <div   className=" w-full flex flex-col gap-2  ">
                            <label className=' text-sm font-medium leading-[100%] tracking-[0%] '>Estimate Time</label>
                                <div className={`text-sm  py-2 min-h-10 max-h-10 rounded  ${getBorderColor()} transition-all duration-200`}>
                                  <input
                                   value={inputValue} 
                                    onChange={handleInputChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    className='w-full h-full outline-none px-4  ' 
                                    placeholder='1h 30m'
                                    />                     
                                </div>
                        </div> 
                        <div   className=" w-full flex flex-col gap-2  ">
                            <label className=' text-sm font-medium leading-[100%] tracking-[0%] '>Task Status </label>
                                <div className={` relative `}>
                                  <TaskStatusDropdown
                                  bgWrapper={" bg-[#FFFFFF] "}
                                  onChangeHandler={(e)=>{ setFields({...fields, taskStatues: {nodes:[{id:e?.id}]}})}}
                                  
                                  />                    
                                </div>
                        </div>   
                        <div>
                            <ProjectDropDownNew
                                labelName="Projects"
                                wrapperClass=" bg-[#FFFFFF] "
                                required
                                managerHandler={(item)=>{setFields({...fields,relatedProject:item?.projectId})}}
                            
                            />
                        </div>  
                        <div className=' flex flex-col'>
                             <InputTextArea
                                id="address" 
                                type="text" 
                                name="address"
                                value={fields?.content} 
                                onChange={(e)=>{setFields({...fields,content:e.target.value})}}
                                autoComplete="autoComplete"
                                placeholder="Enter description"
                                classInput=" w-full h-[145px] bg-[#FFFFFF] "
                                required
                                labelName="Description"
                            />                                                     
                        </div>                    


                    </div>
                </div>



             <div className=' relative mt-10 w-full bottom-0'>
               <div className=" flex gap-6 items-center px-4 py-4 ">          
                    <ButtonNew
                        type="submit"
                        buttonName= "Add Task"
                        buttonClassName = {` ${ buttonClicked ? ` w-[100px] ` : ` w-[100px] ` }  cursor-pointer  h-10 hover:bg-[#F36A3D]  outline-none bg-[#FF845C] text-sm leading-3 font-semibold text-[#FFFFFF]  `}
                        spanClassName = " border-[#FFFFFF] "
                        isLoading= {buttonClicked}
                    />
                     <button
                        onClick={onCloseHandler}
                        className=" h-10 border-2 border-[#FF845C] text-[#FF845C] px-6 rounded font-semibold text-sm leading-4 tracking-wider hover:bg-[#FFF2ED]"
                    >
                        Close
                    </button>
                                        
                                        
                </div>             
            </div>

        </div>
    </form>
    
    </>
  )
}
