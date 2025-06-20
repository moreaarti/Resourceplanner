import React, { useEffect, useState } from 'react'
import config from '../../config/config'

export default function SelectCheckBox(props) {
  const[dropdownaccess,setDropDownAccess]=useState(false)
  const[imagechange,setImageChange]=useState(false)
  const options_insidedropdown=props?.Options;
  const currentValue=props?.currentvalue;
  const [showcurrentvalue,setShowCurrentValue]=useState(currentValue[0])
  
  const [checkboxselected,setCheckBoxSelected]=useState(props?.features_access?.length > 0 ? props?.features_access :[]);
  const customStyles = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 4px;
    
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: #777777;
    border-radius: 8px
  }
`;

useEffect(()=>{
  props?.collectfeaturesHandler(checkboxselected);
},[checkboxselected])


  const dropdownHandler=()=>{
    setImageChange(!imagechange)
    setDropDownAccess(!dropdownaccess)
  }
  const checkboxHandler = (e, val) => {
    if (e.target.checked) {
      setCheckBoxSelected(prev => [...prev,val]);
    } else {
      const checked_value = checkboxselected.filter(item=>item !== val)
       setCheckBoxSelected(checked_value)
    }
  };

  const uncheckboxHandler=(value)=>{
    const checked_value = checkboxselected.filter(item=>item !== value)
       setCheckBoxSelected(checked_value)
       setShowCurrentValue(props?.Options[0])
  }

  return (
   <>
      <div className={ `  relative  ${dropdownaccess?`z-30`:` z-10`} ` }> 
      
          <div className={`relative ${dropdownaccess?`z-30`:` z-10`} cursor-pointer bg-[#ffffff] mt-2 w-full p-2 lg:p-3 min-h-[40px] flex items-center whitespace-nowrap   border-[#DDDDDD] rounded-lg border  text-sm font-normal text-[#A4A4A4] justify-between px-[14px] py-[10px] `}
                                  
                                  onClick={checkboxselected?.length === 0 ? dropdownHandler : ""}                 
                                  >
                 { checkboxselected?.length ===0 ? <div className=' w-[90%] z-30  text-sm font-normal text-[#A4A4A4] selectdropdown_teams '>
                          {showcurrentvalue}</div> :
                          <div className='w-[90%]  selectdropdown_teams flex flex-wrap gap-2 '>
                                {
                                  checkboxselected?.map((val,i,arr)=>{
                                    return <div className='relative shadow-lg flex flex-row bg-[#FFFFFF] border p-2 border-[#DDDDDD] rounded-lg gap-2'>
                                      <div className=' w-full break-all text-sm font-medium text-black '>{val}</div>
                                      <div onClick={()=>{uncheckboxHandler(val)}}
                                      className=' rounded-full  absolute -top-2  -right-1 bg-[#dddddd] w-[18px] h-[18px]'>
                                        <p className='text-xs font-bold w-full h-full text-center'>x</p>
                                      </div>
                                    </div>

                                  })
                                }
                            
                          </div>
                          }                 
                          {imagechange?
                                    <img src={config.PUBLIC_URL + "/assets/images/chevron_upnew.svg"} alt='' onClick={()=>{dropdownHandler()}}/>:
                                    <img src={config.PUBLIC_URL + "/assets/images/chevron_downnew.svg"} alt='' onClick={()=>{dropdownHandler()}} />}                
                  </div>
                  
                  
                {dropdownaccess && <div className='relative z-30 bg-[#ffffff] w-full border border-[#DDDDDD] rounded-lg p-2 lg:p-3 '>
                                              <div className='cursor-pointer my-1 hover:text-[#494949]  font-normal  
                                              text-[#A4A4A4] hover:font-medium text-sm `' onClick={()=>{dropdownHandler();props?.onChange(currentValue[0]);setCheckBoxSelected([])}}>{currentValue[0]}</div>
                                         
                                          {dropdownaccess && <div className='relative z-30 mt-4 border overflow-y-scroll scrollbar-thin  max-h-[200px]  border-[#DDDDDD] p-2 rounded-lg  '>
                                              <div className='flex flex-col gap-2 '>
                                              <style>{customStyles}</style>
                                                {options_insidedropdown?.map((val,i,arr)=>{
                                                  if(i !== 0)
                                                  return <div className=' w-[98%] overflow-hidden flex flex-row gap-2 items-center '>
                                                              <input
                                                                type="checkbox"
                                                                checked={checkboxselected?.some(item => item === val) || false}

                                                                className='min-w-[8%] max-w-[8%] h-6'
                                                                onChange={(e)=>{checkboxHandler(e,val)}}
                                                              />
                                                              <div className='text-sm font-medium text-[#494949] capitalize'>{val}</div>
                                                        </div>


                                                })}
                                              </div>
                                          </div>

                                          }
                                    
                                    </div>
                  
                 
                  }
          {dropdownaccess && <div className='fixed  inset-0   z-20' onClick={()=>{dropdownHandler()}}></div>}        
   
      </div>
      
   </>
  )
}
