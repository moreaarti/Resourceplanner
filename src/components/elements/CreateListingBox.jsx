import React from 'react';
import InputBox from "../../components/elements/InputBox";
import { Link } from 'react-router-dom';

const CreateListingBox=(props)=>{

 
  return (
    <>
        <div className='m-4 mt-0 sm:m-0 sm:w-[450px] shadow-xl 2xl:w-[536px] border border-[#E5E9E5] bg-[#FFFFFF] rounded-lg p-8 2xl:p-12'>
            <p className='text-center max-[400px]:text-[24px] text-[32px] font-semibold text-[#1C1C1C] whitespace-nowrap'>{props?.heading}</p>
            <p className='text-center mt-4 2xl:mt-6 text-base  font-normal text-[#494949]'>{props?.description}</p>
            <form className='mt-8 2xl:mt-12' onSubmit={props.submithandle}>
                <label className='text-sm font-medium text-[#494949] flex'>{props?.label} <p className='text-[#494949]'>*</p> </label>
                <InputBox 
                type="text"
                required="required"
                value={props?.Value_name}
                placeholder={props?.placeholder}
                onChange={props.onchangehandler}
                />

                <div className='mt-4 2xl:mt-6 flex justify-between items-center'>
                <Link to={props?.cancel}><button className='w-[80px] h-[40px] bg-[#DDDDDD] rounded-lg text-sm font-bold text-[#777777] '>{"Cancel"}</button></Link>
                <button onClick={props?.createProject} className={`${props.width} h-[40px] bg-[#53B804]  rounded-lg text-sm font-bold text-[#FFFFFF]`}>{props?.button}</button>
                </div>
            </form>

        </div>
    </>
  )
}

export default CreateListingBox;
