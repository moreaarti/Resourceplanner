import React, { useEffect, useState, useRef } from 'react';
import config from '../../config/config';

export default function SelectCheckBox2(props) {
  const [dropdownaccess, setDropDownAccess] = useState(false);
  const [imagechange, setImageChange] = useState(false);
  const options_insidedropdown = props?.Options;
  const currentValue = props?.currentvalue;
  const [showcurrentvalue, setShowCurrentValue] = useState(currentValue[0]);
  const [checkboxselected, setCheckBoxSelected] = useState(props?.features_access?.length > 0 ? props?.features_access : []);
  const [openAbove, setOpenAbove] = useState(false); // State to control above/below dropdown
  const dropdownRef = useRef(null);

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
    props?.collectfeaturesHandler(checkboxselected);
  }, [checkboxselected]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownAccess(false);
        setImageChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Inject custom scrollbar styles into the document head
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet); // Clean up on unmount
    };
  }, []);

  const dropdownHandler = () => {
    setImageChange(!imagechange);
    setDropDownAccess(!dropdownaccess);

    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - dropdownRect.bottom;
      const dropdownHeight = 240; // Assume dropdown height or dynamically calculate it

      if (spaceBelow < dropdownHeight) {
        setOpenAbove(true); // Not enough space below, open above
      } else {
        setOpenAbove(false); // Enough space below, open normally
      }
    }
  };

  const checkboxHandler = (e, val) => {
    if (e.target.checked) {
      setCheckBoxSelected((prev) => [...prev, val]);
    } else {
      const checked_value = checkboxselected.filter((item) => item !== val);
      setCheckBoxSelected(checked_value);
    }
  };

  const uncheckboxHandler = (value) => {
    const checked_value = checkboxselected.filter((item) => item !== value);
    setCheckBoxSelected(checked_value);
    setShowCurrentValue(props?.Options[0]);
  };

  return (
    <>
      <div className={`custom-table relative ${dropdownaccess ? `z-30` : ` z-10`}`} ref={dropdownRef}>
        <div className={`relative ${dropdownaccess ? `z-30` : ` z-10`} cursor-pointer bg-[#F7F7F8] mt-2 w-full p-2 min-h-10 flex items-center whitespace-nowrap min-h-10  border-[#EAEAEA] rounded border normal_content_black justify-between px-[14px] py-[10px]`}
          onClick={checkboxselected?.length === 0 ? dropdownHandler : undefined}
        >
          {checkboxselected?.length > 0 && <div className='absolute inset-0 z-10' onClick={() => { dropdownHandler() }}></div>}
          {checkboxselected?.length === 0 ? (
            <div className='w-[90%] z-30  normal_content_black selectdropdown_teams '>
              {showcurrentvalue}
            </div>
          ) : (
            <div className='w-[90%] selectdropdown_teams flex flex-wrap gap-2'>
              {checkboxselected?.map((val, i) => (
                <div key={i} className='relative z-[1000] items-center flex flex-row bg-[#FFFFFF] border px-2 py-1 border-[#EAEAEA] rounded gap-2'>
                  <div className='w-full break-all normal_content_black'>{val}</div>
                  <div onClick={() => { uncheckboxHandler(val) }} className='w-6 h-6'>
                    <img className='w-full h-full' src={config.PUBLIC_URL + "/assets/images/cross_icon_new.svg"} alt='cross-icon' />
                  </div>
                </div>
              ))}
            </div>
          )}
          {imagechange ? (
            <img src={config.PUBLIC_URL + "/assets/images/upward_arrow_new.svg"} alt='' onClick={() => { dropdownHandler() }} />
          ) : (
            <img src={config.PUBLIC_URL + "/assets/images/downward_arrow_new.svg"} alt='' onClick={() => { dropdownHandler() }} />
          )}
        </div>

        {dropdownaccess && (
          <div
            className='absolute z-30 bg-[#ffffff] w-full border border-[#EAEAEA] rounded mt-1 p-2 lg:p-3'
            style={{ top: openAbove ? 'auto' : '100%', bottom: openAbove ? '100%' : 'auto' }} // Dynamic positioning based on window height
          >
            <div className='cursor-pointer my-1 normal_content_black'
              onClick={() => { dropdownHandler(); props?.onChange(currentValue[0]); setCheckBoxSelected([]); }}>
              {currentValue[0]}
            </div>

            <div className='relative z-30 mt-4 border overflow-y-auto scrollbar-thin max-h-[200px] border-[#DDDDDD] p-2 rounded'>
              <div className='flex flex-col gap-0.5'>
                <style>{customStyles}</style>
                {options_insidedropdown?.map((val, i) => {
                  if (i !== 0 && val !== "all")
                    return (
                      <label className='cursor-pointer' >  <div key={i} className={`${checkboxselected?.some(item => item === val) && `bg-[#00B6561A]`} w-full hover:bg-[#00B6561A] p-2 rounded overflow-hidden flex flex-row gap-2 items-center`}>
                        <input
                          type="checkbox"
                          checked={checkboxselected?.some(item => item === val) || false}
                          className='min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] w-5 h-5'
                          onChange={(e) => { checkboxHandler(e, val); }}
                        />
                        <div className='normal_content_black capitalize'>{val}</div>
                      </div></label>
                    )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
