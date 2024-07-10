/* eslint-disable react/prop-types */
import { Images } from 'lucide-react';
import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

function FileUploader({fieldChange, mediaUrl}) {
    const[fileUrl, setFileUrl] = useState(mediaUrl);
    const[file, setFile] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]));
      }, [file])

      const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept:{
            'image/*': ['.png', '.jpeg', '.jpg', '.svg'],
        }
      })
  return (
    <div {...getRootProps()} className='flex items-center justify-center flex-col bg-[#333d42] rounded-md cursor-pointer'>
    <input {...getInputProps()} className='cursor-pointer'/>
    {
      fileUrl ?
      (
        <>
        <div className='flex flex-1 justify-center w-full p-4'>
            <img src={fileUrl} alt="image" className='file_uploader-img' />
        </div>
        <p className='mb-4 text-gray-400 text-sm'>Click or drag photo to replace</p>
        </>
      ):(
        <div className='file_uploader-box'>
            <Images className='size-16' />
            <p className='text-gray-400 text-sm '>Drag and drop an image or click here</p>
        </div>
      )
        
    }
  </div>
  )
}

export default FileUploader