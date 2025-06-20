import { React, useState} from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";



const DashboardTable = (props) => {
  
  const navigate = useNavigate();

  const customStyles = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 4px;
    
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: #00B656;
    border-radius: 8px
  }
`;


const [bgcolor,setBgcolor]=useState(null);

const conditionalRowStyles = [
  {
    when: row => row.key === bgcolor,
    style: {
      backgroundColor: '#E1DCFF',
      cursor: props?.cursor_name ? props?.cursor_name  : 'pointer' ,
    },
  },
  {
    when: row => row.key !== bgcolor,
    style: {
      cursor: props?.cursor_name ? props?.cursor_name  : 'pointer' ,
    },
  },
];

  return (
    <div className={`relative  ${props?.page_name?` employee-table   `:` dashboard-table `}  `}>
      <DataTable
        columns={props?.headerData} 
        data={props?.TablecolumData} 
        selectableRows={props?.tableallselectcheckbox}
        highlightOnHover={props?.tablehighlightOnHover}
        selectableRowsComponentProps={{ className: '  w-4 h-4 ' }}
        progressPending={props?.progressPending}
        onSelectedRowsChange={props?.onSelectedRowsChange}
        selectableRowSelected ={props?.selectableRowSelected}
        conditionalRowStyles={conditionalRowStyles}
        pagination={props?.pagination}
        clearSelectedRows={props?.clearSelectedRows}
        onRowClicked={ props?.entireRowClicked === true ? (data)=>{
         
          if(props?.navigationname==="ProjectsNew"){
            setBgcolor(data?.key)
            navigate(`/projects/overview/project-name`)
          }
          if(props?.navigationname==="employee"){
            setBgcolor(data?.key)
            navigate(`/employees/view-employee/${data?.employee_data?.id}`)
          }
          if(props?.navigationname==="TeamView"){
            setBgcolor(data?.key)
            props?.setEmployeeData(data);
            props?.showPopUp();
          }

        }:null}
        />

{ props?.tablePopUpDisplay ?<div className="fixed inset-0 " onClick={props.tablePopUpHandler}></div>:""}
        {props?.tablePopUpDisplay ? (
          <div className="absolute right-4 top-7 z-30 mt-2.5 rounded-lg border border-[#E5E9E5] bg-[#FFFFFF] w-[180px]  overflow-y-scroll  scrollbar-thin min-h-[100px] max-h-[261px]">
            <style>{customStyles}</style>
            {props.tablePopUpheaderdata?.map((val, i, arr) => {
              if (i < arr.length - 1) {
                if(val?.allowColumn){
                  return (
                    <label className={`px-[15px] cursor-pointer py-[7px] flex items-center space-x-2 pb-2 custom-table ${val?.isChecked && `bg-[#00B6561A]`}`}>
                      <input
                        type="checkbox"
                        checked={val?.isChecked ? "checked" : null}
                        name={val.name}
                        onClick={props?.tablePopUpCheckboxHandler}
                        className="w-5 h-5"
                      />
                      <p className="whitespace-nowrap text-xs font-medium text-[#1C1C1C] ">
                        {val.name}
                      </p>
                    </label>
                  );

                }
               
              }
            })}
          </div>
        ) : null}
    </div>
  );
};
export default DashboardTable;
