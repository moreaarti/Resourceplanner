import React, { useEffect, useState } from 'react'
import { uploadFile } from './uploadImage';
import config from '../../config/config';
import ImageFilesListView from './ImageFilesListView';

export default function ImageUpload({editProfile,formData,userDocumentsHandler,fileName}) {

  console.log("formData",formData)

    const [attachments,setAttachments]=useState(formData?.documentsImageUrl);
    const [documentsIds,setDocuments]=useState(formData?.userDocumentIds);
    const [newattachments,setNewattachemnts]=useState([])
    const [showaddattachment,setShowAddattachments]=useState(false)
    const [failedattachments,setFailedAttachments]=useState([]);


    useEffect(()=>{
        addattachemtsfiles();
      },[newattachments])


      const addattachemtsfiles= ()=>{  
        newattachments?.map(async(val,i)=>{
            const media = await uploadFile(val);
            if(media.id){
              const value=`${ media?.source_url+"?id="+media?.id}`
              setAttachments(pre=>[...pre,value])
              setDocuments(pre=>[...pre,`${media?.id}`])
              if(i==newattachments.length-1){
                  setShowAddattachments(false);
                  setNewattachemnts([]); 
              }
            }
            else{
              let  failedstatus={filename:val.name,size:val.size,errormessage:media.message}
                setFailedAttachments(prev=>[...prev,failedstatus])
              if(i===newattachments.length-1){
                 setShowAddattachments(false);
                 setNewattachemnts([]); 
                }
              }            
    
            })
      } 


    const attachmentsHandler= async (e)=>{
        setFailedAttachments([])
        setNewattachemnts([...e.target.files])
        setShowAddattachments(true)
      } 
  
    const cancelattachmentHandler=(value)=>{

     const ids= documentsIds?.filter((docIds,index)=>{ 
          if(value !== index){
            return docIds
          }
     });
     const imageUrls = attachments?.filter((imageUrl,index)=>{ 
            if(value !== index){
              return imageUrl
            }
      });
      setAttachments(imageUrls);
      setDocuments(ids)
      
    }


    useEffect(()=>{

      userDocumentsHandler(documentsIds)

    },[documentsIds,attachments])

  


  return (
    <div>
            {   showaddattachment ? <div className="progress_bar mt-4 border border-[#DDDDDD]"></div>: !editProfile && <div className=" cursor-pointer  flex max-[600px]:w-full ">
                     {fileName? 
                     <div className="relative w-[130px] h-9 bg-[#806BFF] hover:bg-[#6048F1] rounded flex justify-center items-center text-[#FFFFFF] text-sm font-semibold leading-4 tracking-[5%] gap-2 ">
                      <img  src={config.PUBLIC_URL + "/assets/images/amdital/attachment_icon.svg"} alt='' className=' invert brightness-0 '/>
                        Attach files
                        <input onChange={attachmentsHandler} type="file" multiple className=" absolute cursor-pointer w-full h-full rounded opacity-0 z-10 "/>
                      </div>
                     
                     : <div className="relative w-[82px] h-8 bg-[#FF845C] hover:bg-[#F36A3D] rounded flex justify-center items-center text-[#FFFFFF] text-sm font-semibold leading-4 tracking-[5%] ">
                        Upload
                        <input onChange={attachmentsHandler} type="file" multiple className=" absolute cursor-pointer w-full h-full rounded opacity-0 z-10 "/>
                      </div>}
                  </div>
             }
              {
                  attachments?.length > 0? <div className="mb-2 mt-4">
                      <div className="flex flex-col  gap-2 flex-wrap px-3">
                            {
                              attachments?.map((val,i,arr)=>{
                                let imageUrl=val?.split('?')
                                const fileName = new URL(imageUrl?.[0]).pathname.split("/").pop();
                              return  (
                                    <ImageFilesListView downloadUrl={val} editProfile={editProfile} index={i} cancelattachmentHandler={cancelattachmentHandler}  filename={fileName} />
                                )
                              })
                            }
                      </div>
                    </div>:null
              }
              { 
                  failedattachments.length>0 && <div className="mt-4"> {failedattachments?.map((val,i,arr)=>{
                          let filename= val?.filename?.split('.')
                      return(
                      <div className=" mx-3 mt-2 flex gap-2 items-center bg-red-50 px-4 py-2   max-w-[334px]   rounded-md" key={i}>
                            <p className="text-red-400 flex  items-center font-medium text-sm  w-[150px] whitespace-nowrap overflow-hidden">
                              <p className=" max-w-[50px] whitespace-nowrap overflow-hidden ">{filename[0]}</p><p className="ml-1 whitespace-nowrap w-[30px]">.{filename[1]}</p>
                            </p>
                            <div className=" text-sm font-normal  flex flex-wrap text-red-400 ">" please re-upload" {val.errormessage}</div>
                      </div>)})
                  }</div>
              }    
    </div>
  )
}
