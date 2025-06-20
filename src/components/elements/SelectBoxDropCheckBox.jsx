import React, { useEffect, useState, useRef } from 'react';
import config from '../../config/config';
import { Link, useSearchParams } from 'react-router-dom';
import { Label } from 'recharts';

export default function SelectBoxDropCheckBox(props) {
  const [params] = useSearchParams();
  const workspaceId = params.get("workspace_id");
  const [dropdownAccess, setDropdownAccess] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const [showCurrentValue, setShowCurrentValue] = useState(props?.Options[0] || props?.setvalue);
  const [customWebsite, setCustomWebsite] = useState(props?.setvalue === "selected");
  const [checkboxSelected, setCheckboxSelected] = useState(props?.allowed_site_ids?.length > 0 ? props?.allowed_site_ids : []);
  const [filteredOptions, setFilteredOptions] = useState(props?.Options || []);
  const dropdownRef = useRef(null);
  const [openAbove, setOpenAbove] = useState(false);

  const customStyles = `
    .scrollbar-thin::-webkit-scrollbar {
      width: 4px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background-color: #DCD6FF;
      border-radius: 8px;
    }
  `;

  useEffect(() => {
    // Inject the custom scrollbar styles into the document
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);

    return () => {
      // Cleanup the injected style on component unmount
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    props?.collectsitesHandler(checkboxSelected);
  }, [checkboxSelected]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAccess(false);
        setImageChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownHandler = () => {
    setImageChange(!imageChange);
    setDropdownAccess(!dropdownAccess);
    setCustomWebsite(false);

    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - dropdownRect.bottom;
      const dropdownHeight = 200; // Assume dropdown height or dynamically calculate

      if (spaceBelow < dropdownHeight) {
        setOpenAbove(true); // Not enough space below, open above
      } else {
        setOpenAbove(false); // Enough space below, open normally
      }
    }
  };

  const checkboxHandler = (e, val) => {
    if (e.target.checked) {
      const newVal = { ...val, isChecked: true };
      setCheckboxSelected(prev => [...prev, newVal]);
    } else {
      setCheckboxSelected(prev => prev.filter(item => item.site_id !== val.site_id));
    }
  };

  const uncheckboxHandler = (value) => {
    setCheckboxSelected(prev => prev.filter(item => item.site_id !== value.site_id));
    setShowCurrentValue(props?.Options[0] || props?.setvalue);
  };

  const searchHandler = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = props?.Options.filter(option => 
      option.toLowerCase().includes(searchValue)
    );
    setFilteredOptions(filteredData);
  };

  return (
    <>
      <div className='relative z-20 custom-table' ref={dropdownRef}> 
        <div 
          className='relative z-20 min-h-10 cursor-pointer bg-[#F7F7F8] mt-2 max-[350px]:w-[300px] max-[400px]:w-[300px] max-[500px]:w-[350px] max-sm:w-[400px] sm:w-full flex items-center whitespace-nowrap border-[#EAEAEA] rounded border normal_content_black justify-between px-[14px] py-[10px]'
          onClick={checkboxSelected.length === 0 ? dropdownHandler : undefined}
        >
          {checkboxSelected.length > 0 && <div className='absolute inset-0 z-10' onClick={dropdownHandler}></div>}
          {checkboxSelected.length === 0 ? (
            <div className='w-[90%] normal_content_black selectdropdown_teams'>
              {showCurrentValue}
            </div>
          ) : (
            <div className='w-[400px] selectdropdown_teams flex flex-wrap gap-2'>
              {checkboxSelected.map((val, i) => (
                <div key={i} className='relative z-[1000] items-center flex flex-row bg-[#FFFFFF] border px-2 py-1 border-[#EAEAEA] rounded gap-2'>
                  <div className='w-full break-all normal_content_black '>{val?.site_name}</div>
                  <div onClick={() => uncheckboxHandler(val)} className='w-6 h-6'>
                    <img className='w-full h-full' src={config.PUBLIC_URL + "/assets/images/cross_icon_new.svg"} alt='cross-icon'/>
                  </div>
                </div>
              ))}
            </div>
          )}
          {imageChange ? 
            <img src={config.PUBLIC_URL + "/assets/images/upward_arrow_new.svg"} alt='' onClick={dropdownHandler}/> :
            <img src={config.PUBLIC_URL + "/assets/images/downward_arrow_new.svg"} alt='' onClick={dropdownHandler} />
          }
        </div>
        
        {dropdownAccess && (
          <div 
            className={`${props?.popInvitedata ? 'absolute' : ''} ${openAbove ? 'bottom-full mb-2' : 'mt-2'} bg-[#ffffff] w-full border border-[#DDDDDD] rounded-lg p-2 lg:p-3 scrollbar-thin`} 
            style={{ maxHeight: '200px', overflowY: 'auto' }}
          >
            <input
              type="text"
              placeholder="Search..."
              onChange={searchHandler}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <div className='max-h-[200px] overflow-y-auto'>
              {filteredOptions.map((val, i) => (
                <div
                  key={i}
                  className={`cursor-pointer w-full hover:bg-[#00B6561A] p-2 rounded ${
                    showCurrentValue?.toLowerCase() === val?.toLowerCase() && 'bg-[#00B6561A]'
                  } gap-1  normal_content_black`}
                  onClick={() => {
                    if (val !== "Selected") {
                      setShowCurrentValue(val);
                      setImageChange(!imageChange);
                      setDropdownAccess(!dropdownAccess);
                      setCustomWebsite(false);
                      setCheckboxSelected([]);
                      props.onChange(val);
                    }
                    if (val === "Selected") {
                      setShowCurrentValue(val);
                      setCustomWebsite(!customWebsite);
                      if (customWebsite === false) {
                        props.onChange("Selected");
                      }
                    }
                  }}
                >
                  {val}
                </div>
              ))}
            </div>
            {customWebsite && (
              <div>
                {props?.sitesList?.length > 0 ? (
                  <div className='bg-[#ffffff] border overflow-y-auto max-h-[200px] w-full border-[#EAEAEA] p-1 rounded scrollbar-thin'>
                    <div className='flex flex-col gap-0.5'>
                      {props?.sitesList.map((val, i) => (
                         <label ><div
                          key={i}
                          className={`${
                            checkboxSelected?.some(item => item?.site_id === val?.site_id) && 'bg-[#00B6561A]'
                          } hover:bg-[#00B6561A] p-2 rounded w-[98%] overflow-hidden flex flex-row gap-2 items-center cursor-pointer`}
                        >
                         
                          <input
                            type="checkbox"
                            checked={checkboxSelected?.some(item => item?.site_id === val?.site_id) || false}
                            className='min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] w-5 h-6 rounded'
                            onChange={(e) => checkboxHandler(e, val)}
                          />
                          <div className='normal_content_black whitespace-nowrap'>{val?.site_name}</div>
                          
                        </div></label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className=' mt-2 normal_content_black flex justify-between items-center'> 
                    <div>No websites</div>
                    <Link to={`/workspace/${workspaceId}/add-new-site`}>
                      <button type='button' className='cursor-pointer w-[80px] bg-[#00B656] hover:bg-[#00D967] green_button'>
                        Add Sites
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
