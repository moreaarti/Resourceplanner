import React, { useState } from 'react'
import DashboardTable from '../tables/DashboardTable';
import { Cell } from 'recharts';
import { useSelector } from 'react-redux';




export default function DashBoardProject() {

  const showPopupMenu = useSelector((state) => state.general.showPopupMenu);

    const [selectDropDownValue,setSelectDropDownValue] = useState("");

    const onChangeSelectHandler = () =>{

    }

    const columns = [
        {
          name: "Project",
          selector: (row) => row.project_name,
          minWidth:"120px"
        },
        {
           name:"Progress",
          selector: (row) => row?.id,
          cell:(row)=>{
            return <div className=' relative w-[100px] h-[20px] border border-[#E1DCFF] bg-[#FFFFFF] rounded'>
                 <div style={{width:`${row?.project_progress}%`}} className={` text-xs font-semibold leading-3 text-[#FFFFFF] absolute h-[20px] flex items-center justify-center  ${row?.project_progress === 100 ? ` bg-[#7BEEB1] rounded ` : 
                    row?.project_progress >= 50 ? ` bg-[#F7E060] rounded-l-[4px] ` : ` bg-[#FF8181] rounded-l-[4px]  ` } `}>{row?.project_progress}%</div>
            </div>
          }
        },
        { 
          name:"Status", 
          selector: (row) => row.project_status,
          cell:(row)=>{
            return <div className=' flex gap-1 items-center '>
                <div className={` w-[7px] h-[7px] rounded-full ${row.project_status === "On hold" ? ` bg-[#F7E060] ` : row.project_status === "Finished" ? ` bg-[#7BEEB1] ` : ` bg-[#2051F9] `} `}></div>
                {row.project_status}
            </div>

          }
        },
        { 
          name:"Due Date", 
          selector: (row) => row.project_due_date,
        },
      ];
    
      const data = [
        {
          id:1,
          project_name:"Project Name",
          project_progress:35,
          project_status:"On hold",
          project_due_date:"22-Dec",
        },
        {
          id:2,
          project_name:"Project Name",
          project_progress:100,
          project_status:"Finished",
          project_due_date:"31-Jan",
        },
        {
          id:3,
          project_name:"Project Name",
          project_progress:57,
          project_status:"Inprogress",
          project_due_date:"27-Jan",
        },
        {
          id:4,
          project_name:"Project Name",
          project_progress:35,
          project_status:"Inprogress",
          project_due_date:"20-Nov",
        },
        {
          id:5,
          project_name:"Project Name",
          project_progress:45,
          project_status:"Inprogress",
          project_due_date:"13-Dec",
        }
      ];


const customStyles = `
    .scrollbar-thin::-webkit-scrollbar {
      width: 4px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background-color: #DCD6FF;
      border-radius: 8px;
    }
  `;


  return (
    <div className={` bg-[#FFFFFF] border border-[#E1DCFF] rounded-lg  ${showPopupMenu ? ` w-[50%]  ` : `  min-w-[448px] max-2xl:max-w-[448px]   min-[1600px]:w-[50%]  `} min-h-[342px] `}>
        <div className=' flex justify-between items-center p-4 h-[50px] '>
            <div className=' text-base font-semibold leading-5 text-[#26212E] '>My Project</div>
        </div>
        <div className='  '>
        {/* <style>{customStyles}</style> */}
            <DashboardTable
                TablecolumData={data}
                headerData={columns}
                entireRowClicked={true}
                // tableallselectcheckbox={"selectableRows"}
                // pagination
            />

        </div>
    </div>
  )
}
