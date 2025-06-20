import React from 'react';
import config from '../../config/config';

function HtmlPopup({ srcDoc, isOpen, onClose,cssStyle }) {
 
    if (!isOpen) return null;

    return (
       <>
       <div className=' z-[1200] '>
        {
        cssStyle ? <div className='fixed w-full h-full top-0 left-0 flex justify-center items-center z-[1100]'>
        <div className="mt-20 h-fit rounded-lg z-40 shadow-lg">

        <div  className='bg-[#FFFFFF] min-w-[400px] min-h-[400px] border border-[#EAEAEA] flex justify-center items-center   rounded relative p-4 '>
            <div className=' hidden  lg:block  absolute right-2  top-2 ' >
                <div className=' flex items-center justify-center rounded  hover:bg-[#D8F3E4] w-8 h-8 '>
                    <img
                        src={config.PUBLIC_URL + "/assets/images/close_cross_icon_new.svg"}
                        alt=""
                        onClick={onClose}
                        className='cursor-pointer '
                        />
                </div>
            </div>

            
                <div className=' block break-all max-w-[300px] lg:max-w-[500px] text-sm font-medium '>{srcDoc}</div>

                <div className=' lg:hidden  block  absolute left-30  bottom-2 ' >
                <div onClick={onClose} className='  hover:border-transparent hover:text-[#FFFFFF] hover:bg-[#00D967] green_button_border max-[600px]:w-full w-[150px] custom-shadow '>
                    Cancel
                    {/* <img
                        src={config.PUBLIC_URL + "/assets/images/close_cross_icon_new.svg"}
                        alt=""
                        onClick={onClose}
                        className='cursor-pointer '
                        /> */}
                </div>
            </div>

      
        </div>
        
            
        </div> 
    </div> : <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1200
        }}>
            <div style={{
                width: '80%',
                height: '80%',
                backgroundColor: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <iframe srcDoc={srcDoc} style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                }}></iframe>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    padding: '5px 10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'white',
                    color: 'white',
                    borderRadius: "4px"
                }}>
                    <div className=' flex items-center justify-center rounded  hover:bg-[#D8F3E4] w-8 h-8 '>
                    <img
                        src={config.PUBLIC_URL + "/assets/images/close_cross_icon_new.svg"}
                        alt=""
                        onClick={onClose}
                        className='cursor-pointer '
                        />
                </div>
                </button>
            </div>
        </div>
       }
       </div>
        {isOpen && <div className='fixed inset-0 bg-black opacity-20  z-[1100]' ></div>}
       </>
    
    );
}

export default HtmlPopup;
