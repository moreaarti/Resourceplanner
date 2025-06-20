import React, { useState, useEffect, useRef } from 'react';
import ProfileInformation from './ProfileInformation';
import PersonalInformationView from './PersonalInformationView';
import AddressInformation from './AddressInformation';
import QualificationInformation from './QualificationInformation';
import PreviousEmploymentInformation from './PreviousEmploymentInformation';
import IdentificationInformation from './IdentificationInformation';
import FamilyDetailsInformation from './FamilyDetailsInformation';
import NominationsInformation from './NominationsInformation';
import {getSingalEmployeeData} from './employeeFunction';
import { useLocation, useParams } from 'react-router-dom';
import { getCountryData, getSingleEmployeeAttachmentsData } from '../employeeData';
import { useSelector } from 'react-redux';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Cookies from "js-cookie";

export default function EmployeeViewDetails() {

      const data = Cookies.get("token");
      const user_details = data ? JSON?.parse(data) : "";
      const user_role = user_details?.user?.userRole 
      const store_user_id = user_details?.user?.userId

    const employee_redux_data = useSelector(store=>store?.employee);

    const list_user_id = employee_redux_data?.employee_single_view?.userId

    const [editComponent,setEditComponent] = useState(false);
    const location = useLocation();

      useEffect(() => {
        const path = location.pathname;
        if (path.includes("/employees/view-employee")) {
            setEditComponent(false)
        }
        if(path.includes("/employees/edit-employee")){
            setEditComponent(true)
        }
      }, [location.pathname]);


    const [loader,setLoader] = useState(true);

    const {user_id}= useParams();

    const arrayItems = [
        "Personal Information",
        "Address Information",
        "Qualification Information",
        "Previous Employment",
        "Identification Information",
        "Family Details",
        "Nomination Details"
    ];


    useEffect(()=>{
        fetchHandler(user_id);
         getCountryData();
    },[user_id]);

    const fetchHandler = async(id)=>{
        setLoader(true)
        const response = await getSingalEmployeeData(id);
        if(response?.userId){
            const attachmentData = await getSingleEmployeeAttachmentsData(id);
        }
        setLoader(false);
    }


    return (
        <>  
          { loader ? <div  className=' pl-[26px] pr-[22px] py-6 flex flex-col gap-10 '>
                    <div className=' border border-[#E1DCFF] rounded p-6 '>
                        <h1 className=' mb-6 text-[#26212E]  text-[18px] font-semibold leading-[100%] tracking-[0%] '>Basic Information</h1>
                        <div className=' flex justify-between gap-x-8 gap-y-6 flex-wrap   w-full'>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            
                        </div>

                    </div>
                        
                    <div className=' w-full flex gap-8 '>
                        <div className=' w-fit h-fit flex flex-col gap-4 border border-[#E1DCFF] rounded p-6 '>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                            <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>

                        </div>
                        <div className=' flex flex-col w-full relative gap-8'>
                            <div className=' border border-[#E1DCFF] rounded p-6 '>
                                <h1 className=' mb-6 text-[#26212E]  text-[18px] font-semibold leading-[100%] tracking-[0%] '>1. Personal Information</h1>
                                <div className=' flex justify-between gap-x-8 gap-y-6 flex-wrap   w-full'>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    
                                </div>
                            </div>
                            <div className=' border border-[#E1DCFF] rounded p-6 '>
                                <h1 className=' mb-6 text-[#26212E]  text-[18px] font-semibold leading-[100%] tracking-[0%] '>2. Address</h1>
                                <div className=' flex justify-between gap-x-8 gap-y-6 flex-wrap   w-full'>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    
                                </div>
                            </div>
                            <div className=' border border-[#E1DCFF] rounded p-6 '>
                                <h1 className=' mb-6 text-[#26212E]  text-[18px] font-semibold leading-[100%] tracking-[0%] '>3. Qualifications</h1>
                                <div className=' flex justify-between gap-x-8 gap-y-6 flex-wrap   w-full'>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    
                                </div>
                            </div>
                            <div className=' border border-[#E1DCFF] rounded p-6 '>
                                <h1 className=' mb-6 text-[#26212E]  text-[18px] font-semibold leading-[100%] tracking-[0%] '>4. Previous Employment</h1>
                                <div className=' flex justify-between gap-x-8 gap-y-6 flex-wrap   w-full'>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    
                                </div>
                            </div>
                            <div className=' border border-[#E1DCFF] rounded p-6 '>
                                <h1 className=' mb-6 text-[#26212E]  text-[18px] font-semibold leading-[100%] tracking-[0%] '>5. Identification</h1>
                                <div className=' flex justify-between gap-x-8 gap-y-6 flex-wrap   w-full'>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    
                                </div>
                            </div>
                            <div className=' border border-[#E1DCFF] rounded p-6 '>
                                <h1 className=' mb-6 text-[#26212E]  text-[18px] font-semibold leading-[100%] tracking-[0%] '>6. Family Details</h1>
                                <div className=' flex justify-between gap-x-8 gap-y-6 flex-wrap   w-full'>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    
                                </div>
                            </div>
                            <div className=' border border-[#E1DCFF] rounded p-6 '>
                                <h1 className=' mb-6 text-[#26212E]  text-[18px] font-semibold leading-[100%] tracking-[0%] '>7. Nominations</h1>
                                <div className=' flex justify-between gap-x-8 gap-y-6 flex-wrap   w-full'>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    <Skeleton  baseColor="#E0E0E0" highlightColor="#C8C8C8"  width={200}  height={40}/>
                                    
                                </div>
                            </div>

                            
                           
                            

                        </div>

                    </div>
          </div>: 
          <div className=' pl-[26px] pr-[22px] py-6 flex flex-col gap-10 '>
                <ProfileInformation  
                     employee_data={employee_redux_data?.employee_single_view} 
                     attachments_data ={employee_redux_data?.employee_single_attachments_view}
                     params_id  ={user_id}
                     editComponent={editComponent}
                     user_role={user_role}
                />
                { (list_user_id === store_user_id || user_role?.toLowerCase() === "owner") && <div className=' flex flex-col gap-6'>
                    <h1 className=' text-[#26212E] text-center text-[28px] font-bold leading-[100%] tracking-[0%] '>Information Summary</h1>
                    <div className='relative flex gap-8 '> 
                        <div className=' w-fit h-fit relative  bg-[#F8F7FC] border border-[#E1DCFF] rounded p-8 flex flex-col gap-6 '>
                            {arrayItems.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={`cursor-pointer whitespace-nowrap text-[#26212E] font-medium text-[20px] leading-[100%] tracking-[0%] `}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className=' relative w-full  flex  flex-col gap-8 '>
                            {[
                                PersonalInformationView,
                                AddressInformation,
                                QualificationInformation,
                                PreviousEmploymentInformation,
                                IdentificationInformation,
                                FamilyDetailsInformation,
                                NominationsInformation
                            ].map((Component, index) => (
                                <section 
                                    key={index} 
                                    className=" relative w-full  "
                                >
                                    <Component  
                                        employee_data={employee_redux_data?.employee_single_view} 
                                        attachments_data ={employee_redux_data?.employee_single_attachments_view} 
                                        params_id  ={user_id}
                                        editComponent={editComponent}
                                    />
                                </section>
                            ))}
                        </div>
                    </div>
                </div> }               
            </div>}
        </>
    );
}
